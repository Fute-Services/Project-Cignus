import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { WebView } from 'react-native-webview';
import Svg, { Path } from 'react-native-svg';
import { Asset } from 'expo-asset';
import * as Sharing from 'expo-sharing';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const brochurePdf = require('../../assets/Broucher/Cignus Tower 2 1.pdf');

export default function Brochure() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [pdfUri, setPdfUri] = useState<string | null>(null);

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
            <View style={styles.fallbackContainer}>
              <Text style={styles.fallbackText}>Android does not support inline PDF viewing offline.</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={async () => {
                  const isAvailable = await Sharing.isAvailableAsync();
                  if (isAvailable) {
                    await Sharing.shareAsync(pdfUri);
                  } else {
                    alert("No PDF viewer application found on this device.");
                  }
                }}
                style={styles.openButton}
              >
                <Text style={styles.openButtonText}>Open Brochure</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <WebView
              originWhitelist={['*']}
              source={{
                uri: pdfUri
              }}
              style={styles.webView}
              allowFileAccess={true}
              allowFileAccessFromFileURLs={true}
              allowUniversalAccessFromFileURLs={true}
            />
          )
        ) : null}
      </View>

      {/* 3. Back Button (Bottom Left) */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => router.push('/home')}
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
