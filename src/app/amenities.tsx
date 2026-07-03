import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { WebView } from 'react-native-webview';
import Svg, { Path } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Offline Pannellum assets
import { pannellumCss, pannellumJs } from '../data/pannellum_assets';

// Shared Components
import LeftNavbar from '../components/LeftNavbar';
import { safeNavigate } from '../utils/safeNavigate';

const bgImg = require('../../assets/project-details/amenities-cover-page-updated-image-1.jpg');
const logo = require('../../assets/home/cignus-updated-logo.png');

import { loadVrUris, getCachedVrUris } from '../utils/vrAssets';

// Extract origin for WebView baseUrl to prevent CORS/WebKit local file errors
const getOrigin = (uri: string) => {
  if (!uri) return '';
  if (uri.startsWith('http://') || uri.startsWith('https://')) {
    const parts = uri.split('/');
    return `${parts[0]}//${parts[2]}/`;
  }
  if (uri.startsWith('file://')) {
    return 'file:///';
  }
  return '';
};

const getHtmlContent = (firstScene: string, uris: Record<string, string>) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cignus VR Offline Tour</title>
    <style>
        ${pannellumCss}
        html, body, #panorama {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            overflow: hidden;
            background-color: #000;
        }
        .pnlm-load-box, .pnlm-lbox, .pnlm-loading-indicator {
            display: none !important;
        }
    </style>
</head>
<body>

<div id="panorama"></div>

<script type="text/javascript">
    ${pannellumJs}
</script>
<script>
    var viewer = pannellum.viewer('panorama', {
        "default": {
            "firstScene": ${JSON.stringify(firstScene || 'dropoff')},
            "autoLoad": true,
            "sceneFadeDuration": 500,
            "showControls": false,
            "mouseZoom": true,
            "autoRotate": 2,
            "autoRotateInactivityDelay": 5000
        },
        "scenes": {
            "dropoff": {
                "panorama": ${JSON.stringify(uris.dropoff)},
                "yaw": -140
            },
            "dropoff_left": {
                "panorama": ${JSON.stringify(uris.dropoff_left)},
                "yaw": 60
            },
            "dropoff_right": {
                "panorama": ${JSON.stringify(uris.dropoff_right)},
                "yaw": -90
            },
            "reception": {
                "panorama": ${JSON.stringify(uris.reception)},
                "pitch": -10
            },
            "cafeteria": {
                "panorama": ${JSON.stringify(uris.cafeteria)},
                "pitch": -25
            },
            "liftlobby": {
                "panorama": ${JSON.stringify(uris.liftlobby)},
                "pitch": 0
            },
            "top": {
                "panorama": ${JSON.stringify(uris.top)},
                "pitch": -10
            }
        }
    });

    // Handle messages from React Native to switch scenes (listening on both window and document for cross-platform Android/iOS support)
    function handleSceneMessage(event) {
        var sceneId = event.data;
        if (sceneId && typeof sceneId === 'string') {
            viewer.loadScene(sceneId);
        }
    }
    window.addEventListener('message', handleSceneMessage);
    document.addEventListener('message', handleSceneMessage);

    // Tell React Native once the first panorama has actually rendered,
    // so the native side can swap away from the static cover image
    // without a black flash while the panorama texture decodes.
    viewer.on('load', function () {
        if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage('vr_ready');
        }
    });
</script>

</body>
</html>
`;

const navItems = [
  { id: 'dropoff', label: 'Drop Off' },
  { id: 'dropoff_left', label: 'Outdoor Seating 1' },
  { id: 'dropoff_right', label: 'Outdoor Seating 2' },
  { id: 'reception', label: 'Reception' },
  { id: 'cafeteria', label: 'Fine Dining' },
  { id: 'liftlobby', label: 'Lift Lobby' },
  { id: 'top', label: 'Breakout Zone' },
];

export default function Amenities() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [currentScene, setCurrentScene] = useState<string>('dropoff');
  const [initialScene, setInitialScene] = useState<string>('dropoff');
  const [is360Active, setIs360Active] = useState<boolean>(true);
  const [panoUris, setPanoUris] = useState<Record<string, string> | null>(getCachedVrUris());
  const [loadingAssets, setLoadingAssets] = useState(!getCachedVrUris());
  const [webViewError, setWebViewError] = useState(false);
  const [vrReady, setVrReady] = useState(false);
  const webViewRef = useRef<WebView>(null);

  useEffect(() => {
    if (panoUris) return;

    let cancelled = false;
    loadVrUris()
      .then((uris) => {
        if (!cancelled) setPanoUris(uris);
      })
      .catch((e) => {
        console.warn('Failed to preload VR assets:', e);
      })
      .finally(() => {
        if (!cancelled) setLoadingAssets(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSceneChange = (sceneId: string) => {
    setCurrentScene(sceneId);
    if (!is360Active) {
      setInitialScene(sceneId);
      setIs360Active(true);
    } else {
      if (webViewRef.current) {
        webViewRef.current.postMessage(sceneId);
      }
    }
  };

  const handleResetScene = () => {
    setIs360Active(false);
    setCurrentScene('');
  };

  if (loadingAssets) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#FFCF77" />
        <Text style={{ color: '#ffffff', marginTop: 12, fontSize: 13, fontWeight: '500', letterSpacing: 0.5 }}>
          Loading 360 VR Tour...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* 1. Static Cover Image Background. Stays visible while not in 360 mode,
          and also while the 360 view is still loading its first panorama, so
          there's never a black gap before the VR texture is ready. */}
      {(!is360Active || !vrReady) && (
        <Image source={bgImg} style={styles.backgroundImage} contentFit="cover" />
      )}

      {/* 2. Pannellum Offline VR WebView Layer */}
      <View style={[StyleSheet.absoluteFill, { zIndex: is360Active ? 10 : -1, opacity: is360Active && vrReady ? 1 : 0 }]}>
        {panoUris && (
        <WebView
          ref={webViewRef}
          originWhitelist={['file://*']}
          source={{
            html: getHtmlContent(initialScene, panoUris),
            baseUrl: getOrigin(panoUris.dropoff)
          }}
          style={styles.webView}
          allowFileAccess={true}
          allowFileAccessFromFileURLs={true}
          allowUniversalAccessFromFileURLs={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          cacheEnabled={true}
          mixedContentMode="always"
          onMessage={(event) => {
            if (event.nativeEvent.data === 'vr_ready') {
              setVrReady(true);
            }
          }}
          onError={() => setWebViewError(true)}
          onHttpError={() => setWebViewError(true)}
        />
        )}
        {webViewError && (
          <View style={styles.webViewErrorOverlay} pointerEvents="none">
            <Text style={styles.webViewErrorText}>The VR tour couldn't be loaded</Text>
          </View>
        )}
      </View>

      {/* 3. Left Navbar Sidebar (Hidden when 360 is active to make space) */}
      {!is360Active && <LeftNavbar />}

      {/* 4. Brand Logo (Top Left, hidden when 360 is active) */}
      {!is360Active && (
        <View style={[styles.logoWrapper, { top: 24 + insets.top, left: 24 + insets.left }]}>
          <Image source={logo} style={styles.logoImg} contentFit="contain" />
        </View>
      )}

      {/* 4b. Back-to-home button on cover screen */}
      {!is360Active && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => safeNavigate(router, '/home')}
          accessibilityRole="button"
          accessibilityLabel="Back to home"
          style={[styles.homeButton, { bottom: 32 + insets.bottom, left: 100 + insets.left }]}
        >
          <Svg width="14" height="24" viewBox="0 0 17 28" fill="none">
            <Path d="M15.4143 27V14C15.4143 10.6863 12.728 8 9.41431 8H1.41431M7.41431 14L1.41431 8L8.41431 1" stroke="#483E2D" strokeWidth="2.5" strokeLinecap="round" />
          </Svg>
        </TouchableOpacity>
      )}

      {/* 5. Back Button to exit 360 view (Shown only if 360 is active) */}
      {is360Active && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleResetScene}
          accessibilityRole="button"
          accessibilityLabel="Exit VR tour"
          style={[styles.backButton, { top: 24 + insets.top, left: 24 + insets.left }]}
        >
          <Svg width="14" height="24" viewBox="0 0 17 28" fill="none">
            <Path d="M15.4143 27V14C15.4143 10.6863 12.728 8 9.41431 8H1.41431M7.41431 14L1.41431 8L8.41431 1" stroke="#483E2D" strokeWidth="2.5" strokeLinecap="round" />
          </Svg>
        </TouchableOpacity>
      )}

      {/* 6. Title overlay (Hidden when 360 is active) */}
      {!is360Active && (
        <View style={styles.titleContainer} pointerEvents="none">
          <Text style={styles.titleText}>Amenities</Text>
        </View>
      )}

      {/* 7. Bottom Navigation Capsule */}
      {is360Active && (
        <View style={[styles.bottomNavContainer, { bottom: 32 + insets.bottom }]}>
          <View style={styles.bottomNavCapsule}>
            {navItems.map((item) => {
              const isActive = currentScene === item.id;
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => handleSceneChange(item.id)}
                  activeOpacity={0.8}
                  accessibilityRole="button"
                  accessibilityLabel={item.label}
                  accessibilityState={{ selected: isActive }}
                  style={[styles.bottomNavBtn, isActive && styles.activeBottomNavBtn]}
                >
                  <Text style={[styles.bottomNavBtnText, isActive && styles.activeBottomNavBtnText]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c0f12',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFill,
  },
  webView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  webViewErrorOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  webViewErrorText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  logoWrapper: {
    position: 'absolute',
    top: 24,
    left: 24,
    width: 150,
    height: 60,
    zIndex: 100,
  },
  logoImg: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 24,
    left: 24,
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
  homeButton: {
    position: 'absolute',
    bottom: 32,
    left: 100,
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
  titleContainer: {
    position: 'absolute',
    top: '20%',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 50,
  },
  titleText: {
    fontSize: 54,
    fontWeight: '300',
    color: '#FFCF77',
    textTransform: 'uppercase',
    letterSpacing: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 10,
  },
  bottomNavContainer: {
    position: 'absolute',
    bottom: 32,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 100,
  },
  bottomNavCapsule: {
    flexDirection: 'row',
    backgroundColor: '#142035',
    borderWidth: 1,
    borderColor: '#6F8BB7',
    borderRadius: 30,
    padding: 4,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 8,
  },
  bottomNavBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeBottomNavBtn: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(111, 139, 183, 0.3)',
  },
  bottomNavBtnText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 1,
  },
  activeBottomNavBtnText: {
    color: '#FFCF77',
    fontWeight: '600',
  },
});
