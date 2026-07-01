import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { WebView } from 'react-native-webview';
import Svg, { Path } from 'react-native-svg';
import { Asset } from 'expo-asset';

// Shared Components
import LeftNavbar from '../components/LeftNavbar';

const bgImg = require('../../assets/Project_Details/Amenities cover page updated image (1).png');
const logo = require('../../assets/Home/cignus updated logo.png');

// Resolve the panorama assets dynamically
const dropoffUri = Asset.fromModule(require('../../assets/vr/dropoff.webp')).uri;
const dropoffLeftUri = Asset.fromModule(require('../../assets/vr/dropoff_left.webp')).uri;
const dropoffRightUri = Asset.fromModule(require('../../assets/vr/dropoff_right.webp')).uri;
const receptionUri = Asset.fromModule(require('../../assets/vr/reception.webp')).uri;
const cafeteriaUri = Asset.fromModule(require('../../assets/vr/cafeteria.webp')).uri;
const liftlobbyUri = Asset.fromModule(require('../../assets/vr/liftlobby.webp')).uri;
const topUri = Asset.fromModule(require('../../assets/vr/top.webp')).uri;

const getHtmlContent = (firstScene: string) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cignus VR Offline Tour</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css">
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js"></script>
    <style>
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

<script>
    var viewer = pannellum.viewer('panorama', {
        "default": {
            "firstScene": "${firstScene || 'dropoff'}",
            "autoLoad": true,
            "sceneFadeDuration": 500,
            "showControls": false,
            "mouseZoom": true,
            "autoRotate": 2,
            "autoRotateInactivityDelay": 5000
        },
        "scenes": {
            "dropoff": {
                "panorama": "${dropoffUri}",
                "yaw": -140
            },
            "dropoff_left": {
                "panorama": "${dropoffLeftUri}",
                "yaw": 60
            },
            "dropoff_right": {
                "panorama": "${dropoffRightUri}",
                "yaw": -90
            },
            "reception": {
                "panorama": "${receptionUri}",
                "pitch": -10
            },
            "cafeteria": {
                "panorama": "${cafeteriaUri}",
                "pitch": -25
            },
            "liftlobby": {
                "panorama": "${liftlobbyUri}",
                "pitch": 0
            },
            "top": {
                "panorama": "${topUri}",
                "pitch": -10
            }
        }
    });

    // Handle messages from React Native to switch scenes
    window.addEventListener('message', function(event) {
        var sceneId = event.data;
        if (sceneId && typeof sceneId === 'string') {
            viewer.loadScene(sceneId);
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
  const [currentScene, setCurrentScene] = useState<string>('dropoff');
  const [initialScene, setInitialScene] = useState<string>('dropoff');
  const [is360Active, setIs360Active] = useState<boolean>(true);
  const webViewRef = useRef<WebView>(null);

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

  return (
    <View style={styles.container}>
      {/* 1. Static Cover Image Background (Fades or hides when 360 is active) */}
      {!is360Active && (
        <Image source={bgImg} style={styles.backgroundImage} contentFit="cover" />
      )}

      {/* 2. Pannellum Offline VR WebView Layer */}
      <View style={[StyleSheet.absoluteFill, { zIndex: is360Active ? 10 : -1, opacity: is360Active ? 1 : 0 }]}>
        <WebView
          ref={webViewRef}
          originWhitelist={['*']}
          source={{ html: getHtmlContent(initialScene) }}
          style={styles.webView}
          allowFileAccess={true}
          allowFileAccessFromFileURLs={true}
          allowUniversalAccessFromFileURLs={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
      </View>

      {/* 3. Left Navbar Sidebar (Hidden when 360 is active to make space) */}
      {!is360Active && <LeftNavbar />}

      {/* 4. Brand Logo (Top Left, hidden when 360 is active) */}
      {!is360Active && (
        <View style={styles.logoWrapper}>
          <Image source={logo} style={styles.logoImg} contentFit="contain" />
        </View>
      )}

      {/* 4b. Back-to-home button on cover screen */}
      {!is360Active && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push('/home')}
          style={styles.homeButton}
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
          style={styles.backButton}
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
      <View style={styles.bottomNavContainer}>
        <View style={styles.bottomNavCapsule}>
          {navItems.map((item) => {
            const isActive = currentScene === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => handleSceneChange(item.id)}
                activeOpacity={0.8}
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
