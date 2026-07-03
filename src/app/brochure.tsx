import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { WebView } from 'react-native-webview';
import Svg, { Path } from 'react-native-svg';
import { Asset } from 'expo-asset';
import * as Sharing from 'expo-sharing';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getLocalPdfJsUris } from '../utils/localPdfJs';
import { escapeHtmlAttribute } from '../utils/htmlEscape';
import { safeNavigate } from '../utils/safeNavigate';

const brochurePdf = require('../../assets/brochure/cignus-tower-2-1.pdf');

const getPdfHtml = (pdfPath: string, pdfJsUri: string, pdfWorkerUri: string) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <style>
          body {
            margin: 0;
            padding: 0;
            background-color: #1a1a1a;
            display: flex;
            flex-direction: column;
            align-items: center;
            overflow-x: hidden;
          }
          #container {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 10px 0;
            gap: 12px;
          }
          canvas {
            box-shadow: 0 4px 10px rgba(0,0,0,0.6);
            max-width: 95%;
            height: auto !important;
            margin-bottom: 8px;
            border-radius: 8px;
            background-color: white;
          }
        </style>
        <script src="${escapeHtmlAttribute(pdfJsUri)}"></script>
        <script>
          pdfjsLib.GlobalWorkerOptions.workerSrc = ${JSON.stringify(pdfWorkerUri)};
        </script>
      </head>
      <body>
        <div id="container"></div>
        <script>
          const RENDER_SCALE = 1.5;

          function renderPage(page, canvas) {
            const context = canvas.getContext('2d');
            const viewport = page.getViewport({ scale: RENDER_SCALE });
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            page.render({ canvasContext: context, viewport: viewport });
          }

          try {
            pdfjsLib.getDocument(${JSON.stringify(pdfPath)}).promise.then(function(pdf) {
              const container = document.getElementById('container');
              const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                  if (!entry.isIntersecting) return;
                  const canvas = entry.target;
                  observer.unobserve(canvas);
                  pdf.getPage(Number(canvas.dataset.pageNum)).then(function(page) {
                    renderPage(page, canvas);
                  });
                });
              }, { rootMargin: '600px 0px' });

              // First page renders immediately so the view isn't blank; the rest
              // render lazily as they scroll into view to keep initial load fast.
              pdf.getPage(1).then(function(firstPage) {
                const viewport = firstPage.getViewport({ scale: RENDER_SCALE });
                const canvas = document.createElement('canvas');
                canvas.dataset.pageNum = '1';
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                container.appendChild(canvas);
                renderPage(firstPage, canvas);

                for (let pageNum = 2; pageNum <= pdf.numPages; pageNum++) {
                  const placeholderCanvas = document.createElement('canvas');
                  placeholderCanvas.dataset.pageNum = String(pageNum);
                  placeholderCanvas.width = viewport.width;
                  placeholderCanvas.height = viewport.height;
                  container.appendChild(placeholderCanvas);
                  observer.observe(placeholderCanvas);
                }
              });
            }).catch(function(err) {
              console.error('PDF load error:', err.message);
            });
          } catch(e) {
            console.error('PDF loading error:', e.message);
          }
        </script>
      </body>
    </html>
  `;
};

export default function Brochure() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [pdfUri, setPdfUri] = useState<string | null>(null);
  const [webViewError, setWebViewError] = useState(false);
  const [{ pdfJsUri, pdfWorkerUri }] = useState(() => getLocalPdfJsUris());

  useEffect(() => {
    const asset = Asset.fromModule(brochurePdf);
    if (asset.localUri) {
      // One-time sync from the bundled asset's cached uri into state on mount.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPdfUri(asset.localUri);
    } else {
      asset.downloadAsync()
        .then(() => {
          setPdfUri(asset.localUri || asset.uri);
        })
        .catch((err) => {
          console.error("Failed to load Brochure asset:", err);
          if (Platform.OS === 'android') {
            setPdfUri('file:///android_asset/Broucher/Cignus Tower 2 1.pdf');
          } else {
            setPdfUri(asset.uri);
          }
        });
    }
  }, []);

  return (
    <View style={styles.container}>
      {/* 1. Header Title Overlay */}
      <View style={[styles.header, { top: 0 + insets.top }]}>
        <Text style={styles.headerText}>Project Brochure</Text>
      </View>

      {/* 2. Offline Webview PDF Viewer Layer with Android Fallback */}
      <View style={styles.webviewContainer}>
        {pdfUri ? (
          Platform.OS === 'android' ? (
            <WebView
              originWhitelist={['file://*']}
              source={{
                html: getPdfHtml(pdfUri, pdfJsUri, pdfWorkerUri),
                baseUrl: 'file:///'
              }}
              style={styles.webView}
              allowFileAccess={true}
              allowFileAccessFromFileURLs={true}
              allowUniversalAccessFromFileURLs={true}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              onError={() => setWebViewError(true)}
              onHttpError={() => setWebViewError(true)}
            />
          ) : (
            <WebView
              originWhitelist={['file://*']}
              source={{
                uri: pdfUri
              }}
              style={styles.webView}
              allowFileAccess={true}
              allowFileAccessFromFileURLs={true}
              allowUniversalAccessFromFileURLs={true}
              onError={() => setWebViewError(true)}
              onHttpError={() => setWebViewError(true)}
            />
          )
        ) : (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FFCF77" />
          </View>
        )}
        {webViewError && (
          <View style={styles.webViewErrorOverlay} pointerEvents="none">
            <Text style={styles.webViewErrorText}>The brochure couldn't be loaded</Text>
          </View>
        )}
      </View>

      {/* 3. Back Button (Bottom Left) */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => safeNavigate(router, '/home')}
        accessibilityRole="button"
        accessibilityLabel="Back"
        style={[styles.backButton, { bottom: 32 + insets.bottom, left: 32 + insets.left }]}
      >
        <Svg width="14" height="24" viewBox="0 0 17 28" fill="none">
          <Path d="M15.4143 27V14C15.4143 10.6863 12.728 8 9.41431 8H1.41431M7.41431 14L1.41431 8L8.41431 1" stroke="#483E2D" strokeWidth="2.5" strokeLinecap="round" />
        </Svg>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a1118',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  headerText: {
    fontSize: 22,
    fontWeight: '300',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  webviewContainer: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 80,
  },
  webView: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0c1219',
    borderRadius: 16,
  },
  webViewErrorOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0c1219',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    zIndex: 5,
  },
  webViewErrorText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0c1219',
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  fallbackText: {
    fontSize: 18,
    color: '#A0AEC0',
    textAlign: 'center',
    marginBottom: 24,
    letterSpacing: 0.5,
  },
  openButton: {
    backgroundColor: '#FFCF77',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  openButtonText: {
    color: '#483E2D',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  backButton: {
    position: 'absolute',
    bottom: 32,
    left: 32,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFCF77',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
    zIndex: 100,
  },
});
