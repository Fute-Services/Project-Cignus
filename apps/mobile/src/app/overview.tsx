import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, useWindowDimensions, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import { BlurView } from 'expo-blur';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  FadeIn,
  FadeOut,
  Easing,
  cancelAnimation
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Shared Components
import LeftNavbar from '../components/LeftNavbar';
import ProjectBottomNav from '../components/ProjectBottomNav';
import VideoStatusOverlay from '../components/VideoStatusOverlay';
import { useVideoStatus } from '../hooks/useVideoStatus';
import { theme } from '../theme';
import { safeNavigate } from '../utils/safeNavigate';

const bgVideo = require('../../assets/overview/overview.mp4');
const overviewImg = require('../../assets/overview/overview.webp');
const logo = require('../../assets/home/cignus-updated-logo.png');
const logoBadge = require('../../assets/project-details/logo_new.png');
const logo2 = require('../../assets/home/k-raheja-corp-1.png');

const sections = [
  {
    title: "Westin Hotel",
    description: "When your counterpart flies in, you host them properly. Dinner, a room, and breakfast the next morning, all without a single car journey. The hotel is across the courtyard."
  },
  {
    title: "Convention Centre",
    description: "All hands meetings, investor days, large conferences. The venue is steps from your office, so there is no booking a hotel ballroom months in advance and no shuttling people across the city."
  },
  {
    title: "Marriott Residences",
    description: "Your team across the globe lands and stays on campus. Your extended project team doesn't need a flat finding exercise. The accommodation is already here."
  },
  {
    title: "Cignus Tower I",
    description: "Tower I has been here long enough to build its own gravity. The companies, the people, and the everyday rhythm of the campus. Tower II inherits all of that from day one."
  }
];

export default function Overview() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const drawerWidth = width * 0.42;
  const [showLogo, setShowLogo] = useState(true);
  const [showContent, setShowContent] = useState(true);
  const [viewMode, setViewMode] = useState<'map' | 'cinematic'>('map');

  // Reanimated values
  const overlayOpacity = useSharedValue(0);
  const drawerX = useSharedValue(1000);

  // Initialize loop player
  const player = useVideoPlayer(bgVideo, (playerInstance) => {
    playerInstance.loop = true;
    playerInstance.muted = true;
    playerInstance.play();
  });

  const { isReady, hasError } = useVideoStatus(player);

  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (player) {
      if (!isFocused) {
        player.pause();
      } else {
        player.play();
      }
    }
  }, [isFocused, player]);

  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    const timer = setTimeout(() => {
      if (isMounted.current) {
        setShowLogo(false);
        // Fade in the overview static image overlay after logo transition
        overlayOpacity.value = withTiming(1, { duration: 800 });
      }
    }, 2000);

    return () => {
      isMounted.current = false;
      clearTimeout(timer);
      cancelAnimation(overlayOpacity);
      cancelAnimation(drawerX);
    };
  }, []);

  // Animate drawer in/out when state toggles
  useEffect(() => {
    // Reanimated shared-value mutation; React Compiler immutability check doesn't
    // model shared values, so suppress the false positive.
    // eslint-disable-next-line react-hooks/immutability
    drawerX.value = withTiming(showContent ? 0 : drawerWidth + 80, {
      duration: 600,
      easing: Easing.bezier(0.25, 1, 0.5, 1)
    });
  }, [showContent, drawerWidth]);

  const handleViewModeChange = (mode: 'map' | 'cinematic') => {
    if (mode === viewMode) return;
    // Animate color/background changes
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setViewMode(mode);
    // eslint-disable-next-line react-hooks/immutability
    overlayOpacity.value = withTiming(mode === 'map' ? 1 : 0, { duration: 500 });
  };

  const overlayAnimatedStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }));

  const drawerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: drawerX.value }],
  }));

  return (
    <View style={styles.container}>
      {/* ── 1. Looping video background ── */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <VideoView
          player={player}
          style={styles.videoView}
          contentFit="cover"
          nativeControls={false}
        />
        <VideoStatusOverlay isReady={isReady} hasError={hasError} />
        <View style={styles.videoOverlay} />
      </View>

      {/* ── 2. Static overview background crossfade overlay ── */}
      <Animated.View style={[StyleSheet.absoluteFill, overlayAnimatedStyle]} pointerEvents="none">
        <Image source={overviewImg} style={styles.overviewImage} contentFit="cover" cachePolicy="memory-disk" />
      </Animated.View>

      {/* INITIAL LOGO TRANSITION */}
      {showLogo && (
        <Animated.View exiting={FadeOut.duration(800)} style={styles.initialLogoWrapper} pointerEvents="none">
          <Image source={logo} style={styles.initialLogo} contentFit="contain" />
        </Animated.View>
      )}

      {/* MAIN SCREEN INTERFACES */}
      {!showLogo && (
        <Animated.View style={StyleSheet.absoluteFill} entering={FadeIn.duration(800)}>
          {/* Side Navbar overlay */}
          <LeftNavbar />

          {/* Top Branding Badge */}
          <View style={[styles.topLeftLogo, { top: 32 + insets.top, left: 32 + insets.left }]}>
            <Image source={logoBadge} style={styles.logoImg} contentFit="contain" />
          </View>
          <View style={[styles.topRightLogo, { top: 32 + insets.top, right: 32 + insets.right }]}>
            <Image source={logo2} style={styles.logo2Img} contentFit="contain" />
          </View>

          {/* ── Toggle Button (Right Side) ── */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setShowContent(!showContent)}
            accessibilityRole="button"
            accessibilityLabel={showContent ? 'Collapse panel' : 'Expand panel'}
            style={[styles.toggleBtn, { right: 0 + insets.right }, showContent && styles.toggleBtnActive]}
          >
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              {showContent ? (
                <Path d="M9 5l7 7-7 7" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <Path d="M15 19l-7-7 7-7" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              )}
            </Svg>
          </TouchableOpacity>

          {/* ── Expandable Side Content Drawer ── */}
          <Animated.View style={[styles.drawer, { top: 24 + insets.top, bottom: 96 + insets.bottom, right: 56 + insets.right }, drawerAnimatedStyle, { width: drawerWidth }]}>
            <BlurView
              intensity={50}
              tint="dark"
              experimentalBlurMethod="dimezisBlurView"
              style={StyleSheet.absoluteFill}
            />
            <ScrollView contentContainerStyle={styles.drawerScroll} showsVerticalScrollIndicator={false}>
              
              {/* View Mode Switcher inside Drawer */}
              <View style={styles.modeToggleContainer}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handleViewModeChange('map')}
                  accessibilityRole="button"
                  accessibilityLabel="Map plan view"
                  accessibilityState={{ selected: viewMode === 'map' }}
                  style={[styles.modeToggleBtn, viewMode === 'map' && styles.activeModeToggleBtn]}
                >
                  <Text style={[styles.modeToggleText, viewMode === 'map' && styles.activeModeToggleText]}>
                    MAP PLAN
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handleViewModeChange('cinematic')}
                  accessibilityRole="button"
                  accessibilityLabel="Cinematic view"
                  accessibilityState={{ selected: viewMode === 'cinematic' }}
                  style={[styles.modeToggleBtn, viewMode === 'cinematic' && styles.activeModeToggleBtn]}
                >
                  <Text style={[styles.modeToggleText, viewMode === 'cinematic' && styles.activeModeToggleText]}>
                    CINEMATIC
                  </Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.drawerTitle}>Work. Stay. Entertain.{'\n'}All without leaving.</Text>
              
              <Text style={styles.drawerDesc}>
                Most offices ask you to leave for everything else. A dinner with clients. A room for the visiting team. A venue for three hundred people. Here, none of that requires leaving the campus.
              </Text>

              {sections.map((item, idx) => (
                <View key={idx} style={styles.sectionCard}>
                  <Text style={styles.sectionTitle}>{item.title}</Text>
                  <Text style={styles.sectionDesc}>{item.description}</Text>
                </View>
              ))}
            </ScrollView>
          </Animated.View>

          {/* ── Back Button (Bottom Left) ── */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => safeNavigate(router, '/project-details')}
            accessibilityRole="button"
            accessibilityLabel="Back"
            style={[styles.backButton, { bottom: 32 + insets.bottom, left: 32 + insets.left }]}
          >
            <Svg width="14" height="24" viewBox="0 0 17 28" fill="none">
              <Path d="M15.4143 27V14C15.4143 10.6863 12.728 8 9.41431 8H1.41431M7.41431 14L1.41431 8L8.41431 1" stroke="#483E2D" strokeWidth="2.5" strokeLinecap="round" />
            </Svg>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  videoView: {
    ...StyleSheet.absoluteFillObject,
    // <video> is a replaced element: with only inset (no explicit
    // width/height), browsers size it to native content resolution instead
    // of stretching to fill — hence the explicit 100%/100% here.
    width: '100%',
    height: '100%',
  },
  videoOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.17)',
  },
  overviewImage: {
    ...StyleSheet.absoluteFillObject,
  },
  initialLogoWrapper: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  initialLogo: {
    width: 200,
    height: 80,
  },
  topLeftLogo: {
    position: 'absolute',
    top: 32,
    left: 32,
    width: 120,
    height: 50,
    zIndex: 90,
  },
  topRightLogo: {
    position: 'absolute',
    top: 32,
    right: 32,
    width: 90,
    height: 50,
    zIndex: 90,
  },
  logoImg: {
    width: '100%',
    height: '100%',
    filter: [{ brightness: 1.4 }],
  },
  logo2Img: {
    width: '100%',
    height: '100%',
  },
  toggleBtn: {
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: [{ translateY: -72 }],
    width: 44,
    height: 144,
    backgroundColor: 'rgba(26, 26, 26, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    borderTopLeftRadius: 22,
    borderBottomLeftRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 120,
    shadowColor: '#000',
    shadowOffset: { width: -4, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  toggleBtnActive: {
    backgroundColor: '#FFCF77',
    borderColor: '#FFCF77',
  },
  drawer: {
    position: 'absolute',
    top: 24,
    bottom: 96,
    right: 56,
    backgroundColor: 'rgba(20, 24, 28, 0.25)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.28)',
    borderRadius: 16,
    zIndex: 110,
    overflow: 'hidden',
  },
  drawerScroll: {
    padding: 24,
    gap: 16,
  },
  modeToggleContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 20,
    padding: 2,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 8,
  },
  modeToggleBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeModeToggleBtn: {
    backgroundColor: '#FFCF77',
  },
  modeToggleText: {
    fontFamily: theme.fonts.outfit.semibold,
    fontSize: 9.5,
    color: '#ffffff',
    letterSpacing: 1,
  },
  activeModeToggleText: {
    color: '#0c0f12',
  },
  drawerTitle: {
    fontFamily: theme.fonts.outfit.bold,
    fontSize: 22,
    color: '#ffffff',
    lineHeight: 30,
    letterSpacing: 0.5,
  },
  drawerDesc: {
    fontFamily: theme.fonts.inter.regular,
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    lineHeight: 18,
    marginBottom: 4,
  },
  sectionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.16)',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionTitle: {
    fontFamily: theme.fonts.outfit.bold,
    fontSize: 14,
    color: '#FFCF77',
    letterSpacing: 0.5,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  sectionDesc: {
    fontFamily: theme.fonts.inter.regular,
    fontSize: 11.5,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 17,
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
