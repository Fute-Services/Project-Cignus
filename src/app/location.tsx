import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import Animated, { FadeInUp, FadeIn, useSharedValue, useAnimatedStyle, withTiming, ZoomIn, ZoomOut } from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';

const logo = require('../../assets/home/cignus-updated-logo.png');
const siteLocation = require('../../assets/location/new-final-site-location-img.jpeg');
const neighborhood = require('../../assets/location/img-location.png');

// Videos
const jvlrVideo = require('../../assets/location/towards-eastern-and-western-expressway-final-2-2.mp4');
const rambaughVideo = require('../../assets/location/rambaug-metro-3.mp4');
const sakinakaVideo = require('../../assets/location/sakinaka-metro-2.mp4');
const aareyVideo = require('../../assets/location/aarey-metro-2.mp4');
const transportVideo = require('../../assets/location/transport.mp4');

const tabs = [
  { id: 'site', label: 'Site Location', type: 'image', src: siteLocation },
  { id: 'neighbourhood', label: 'Neighbourhood', type: 'image', src: neighborhood },
  { id: 'road', label: 'Connectivity', type: 'multi-video' },
  { id: 'transport', label: 'Airport Connectivity', type: 'video' }
];

const connectivityVideos = [
  { id: 'jvlr', label: 'JVLR', src: jvlrVideo },
  { id: 'rambaug', label: 'Rambaugh Metro', src: rambaughVideo },
  { id: 'sakanaka', label: 'Saki-Naka Metro', src: sakinakaVideo },
  { id: 'lt', label: 'Aarey Metro Station', src: aareyVideo }
];

export default function LocationScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('site');
  const [activeNetworkVideo, setActiveNetworkVideo] = useState('jvlr');

  // Instantiate video players for smooth cross-fading. Playback is NOT started
  // here — only the active tab's player is started, by the effect below, so at
  // most one of these five decoders is ever running at a time (starting all
  // five simultaneously on mount previously stressed the hardware decoder).
  const jvlrPlayer = useVideoPlayer(jvlrVideo, p => { p.loop = true; p.muted = true; });
  const rambaugPlayer = useVideoPlayer(rambaughVideo, p => { p.loop = true; p.muted = true; });
  const sakinakaPlayer = useVideoPlayer(sakinakaVideo, p => { p.loop = true; p.muted = true; });
  const aareyPlayer = useVideoPlayer(aareyVideo, p => { p.loop = true; p.muted = true; });
  const transportPlayer = useVideoPlayer(transportVideo, p => { p.loop = true; p.muted = true; });

  // Shared values for cross-fade opacities
  const opacitySite = useSharedValue(1);
  const opacityNeighbourhood = useSharedValue(0);
  const opacityJvlr = useSharedValue(0);
  const opacityRambaug = useSharedValue(0);
  const opacitySakanaka = useSharedValue(0);
  const opacityLt = useSharedValue(0);
  const opacityTransport = useSharedValue(0);

  const isFocused = useIsFocused();

  // Transition opacities and playback state smoothly
  useEffect(() => {
    opacitySite.value = withTiming(activeTab === 'site' ? 1 : 0, { duration: 400 });
    opacityNeighbourhood.value = withTiming(activeTab === 'neighbourhood' ? 1 : 0, { duration: 400 });
    
    const isJvlr = activeTab === 'road' && activeNetworkVideo === 'jvlr';
    opacityJvlr.value = withTiming(isJvlr ? 1 : 0, { duration: 400 });
    if (isJvlr && isFocused) {
      jvlrPlayer.currentTime = 0;
      jvlrPlayer.play();
    } else {
      jvlrPlayer.pause();
    }

    const isRambaug = activeTab === 'road' && activeNetworkVideo === 'rambaug';
    opacityRambaug.value = withTiming(isRambaug ? 1 : 0, { duration: 400 });
    if (isRambaug && isFocused) {
      rambaugPlayer.currentTime = 0;
      rambaugPlayer.play();
    } else {
      rambaugPlayer.pause();
    }

    const isSakanaka = activeTab === 'road' && activeNetworkVideo === 'sakanaka';
    opacitySakanaka.value = withTiming(isSakanaka ? 1 : 0, { duration: 400 });
    if (isSakanaka && isFocused) {
      sakinakaPlayer.currentTime = 0;
      sakinakaPlayer.play();
    } else {
      sakinakaPlayer.pause();
    }

    const isLt = activeTab === 'road' && activeNetworkVideo === 'lt';
    opacityLt.value = withTiming(isLt ? 1 : 0, { duration: 400 });
    if (isLt && isFocused) {
      aareyPlayer.currentTime = 0;
      aareyPlayer.play();
    } else {
      aareyPlayer.pause();
    }

    const isTransport = activeTab === 'transport';
    opacityTransport.value = withTiming(isTransport ? 1 : 0, { duration: 400 });
    if (isTransport && isFocused) {
      transportPlayer.currentTime = 0;
      transportPlayer.play();
    } else {
      transportPlayer.pause();
    }
  }, [activeTab, activeNetworkVideo, isFocused]);

  const styleSite = useAnimatedStyle(() => ({ opacity: opacitySite.value }));
  const styleNeighbourhood = useAnimatedStyle(() => ({ opacity: opacityNeighbourhood.value }));
  const styleJvlr = useAnimatedStyle(() => ({ opacity: opacityJvlr.value }));
  const styleRambaug = useAnimatedStyle(() => ({ opacity: opacityRambaug.value }));
  const styleSakanaka = useAnimatedStyle(() => ({ opacity: opacitySakanaka.value }));
  const styleLt = useAnimatedStyle(() => ({ opacity: opacityLt.value }));
  const styleTransport = useAnimatedStyle(() => ({ opacity: opacityTransport.value }));

  const renderMarkers = () => {
    let markersList: any[] = [];

    if (activeTab === 'site') {
      markersList = [
        { id: 1, top: '25%', left: '49%', label: 'CIGNUS 1' },
        { id: 2, top: '67%', left: '44%', label: 'Proposed Development' },
        { id: 3, top: '65%', left: '60%', label: '', logo: true },
        { id: 4, top: '35%', left: '59%', label: 'THE WESTIN' },
        { id: 5, top: '65%', left: '85%', label: 'POWAI LAKE' },
      ];
    } else if (activeTab === 'neighbourhood') {
      markersList = [
        { id: 1, top: '18%', left: '8%', label: 'JVLR Metro Station' },
        { id: 2, top: '64%', left: '38%', label: 'Rambaug Metro Station' },
        { id: 3, top: '62%', left: '76%', label: 'Hiranandani Hospital' },
        { id: 4, top: '77%', left: '67%', label: 'Hiranandani Gardens' },
        { id: 5, top: '20%', left: '80%', label: 'IIT Bombay' },
        { id: 6, top: '40%', left: '50%', label: 'POWAI LAKE' },
        { id: 7, top: '19%', left: '45%', label: '', logo: true },
      ];
    } else if (activeTab === 'road') {
      if (activeNetworkVideo === 'jvlr') {
        markersList = [{ id: 'jvlr-m1', top: '19%', left: '45%', label: '', logo: true }];
      } else if (activeNetworkVideo === 'rambaug') {
        markersList = [
          { id: 'jvlr-m1', top: '20%', left: '45%', label: '', logo: true },
          { id: 'ram-m2', top: '63%', left: '36%', label: 'Rambaug Metro Station' }
        ];
      } else if (activeNetworkVideo === 'sakanaka') {
        markersList = [
          { id: 'jvlr-m1', top: '22%', left: '45%', label: '', logo: true },
          { id: 'saki-m2', top: '95%', left: '8%', label: 'Saki-Naka Metro Station' }
        ];
      } else if (activeNetworkVideo === 'lt') {
        markersList = [
          { id: 'jvlr-m1', top: '20%', left: '45%', label: '', logo: true },
          { id: 'aarey-m2', top: '20%', left: '5.5%', label: 'Aarey Metro Station' }
        ];
      }
    } else if (activeTab === 'transport') {
      markersList = [
        { id: 'air-m1', top: '15%', left: '58.7%', label: '', logo: true },
        { id: 'air-m3', top: '59%', left: '49.5%', label: 'Towards Saki-Naka Metro Station' },
        { id: 'air-m2', top: '70%', left: '25.5%', label: 'Chhatrapati Shivaji Maharaj Airport' },
      ];
    }

    return markersList.map((m, idx) => (
      <Animated.View
        key={m.id}
        entering={ZoomIn.duration(350).delay(idx * 80)}
        exiting={ZoomOut.duration(200)}
        style={[styles.markerContainer, { top: m.top, left: m.left }]}
      >
        <View style={styles.markerContent}>
          <View style={styles.markerBadge}>
            {m.logo ? (
              <Image source={logo} style={styles.markerLogo} contentFit="contain" />
            ) : (
              <Text style={styles.markerText}>{m.label}</Text>
            )}
          </View>
          <View style={styles.markerArrow} />
        </View>
      </Animated.View>
    ));
  };

  return (
    <View style={styles.container}>
      {/* 1. MAP BACKGROUND / VIDEO LAYER */}
      <View style={StyleSheet.absoluteFill}>
        {/* Site Location Image */}
        <Animated.View style={[StyleSheet.absoluteFill, styleSite]}>
          <Image source={siteLocation} style={styles.backgroundImage} contentFit="contain" />
        </Animated.View>

        {/* Neighbourhood Image */}
        <Animated.View style={[StyleSheet.absoluteFill, styleNeighbourhood]}>
          <Image source={neighborhood} style={styles.backgroundImage} contentFit="contain" />
        </Animated.View>

        {/*
          Only the active video's VideoView is mounted. Tablets allow a limited
          number of simultaneous hardware video decoders, so mounting all five
          VideoViews at once made the later panels (Connectivity + Airport) fail
          to render. The opacity fade-in on mount is preserved via the shared values.
        */}
        {/* JVLR Video */}
        {activeTab === 'road' && activeNetworkVideo === 'jvlr' && (
          <Animated.View style={[StyleSheet.absoluteFill, styleJvlr]}>
            <VideoView player={jvlrPlayer} style={styles.backgroundImage} contentFit="contain" nativeControls={false} />
          </Animated.View>
        )}

        {/* Rambaug Video */}
        {activeTab === 'road' && activeNetworkVideo === 'rambaug' && (
          <Animated.View style={[StyleSheet.absoluteFill, styleRambaug]}>
            <VideoView player={rambaugPlayer} style={styles.backgroundImage} contentFit="contain" nativeControls={false} />
          </Animated.View>
        )}

        {/* Saki-Naka Video */}
        {activeTab === 'road' && activeNetworkVideo === 'sakanaka' && (
          <Animated.View style={[StyleSheet.absoluteFill, styleSakanaka]}>
            <VideoView player={sakinakaPlayer} style={styles.backgroundImage} contentFit="contain" nativeControls={false} />
          </Animated.View>
        )}

        {/* Aarey Video */}
        {activeTab === 'road' && activeNetworkVideo === 'lt' && (
          <Animated.View style={[StyleSheet.absoluteFill, styleLt]}>
            <VideoView player={aareyPlayer} style={styles.backgroundImage} contentFit="contain" nativeControls={false} />
          </Animated.View>
        )}

        {/* Airport Connectivity Video */}
        {activeTab === 'transport' && (
          <Animated.View style={[StyleSheet.absoluteFill, styleTransport]}>
            <VideoView player={transportPlayer} style={styles.backgroundImage} contentFit="contain" nativeControls={false} />
          </Animated.View>
        )}

        {/* 2. OVERLAY INTERACTIVE MARKERS */}
        {renderMarkers()}
      </View>

      {/* 3. BACK BUTTON (Top Left) */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => router.push('/home')}
        accessibilityRole="button"
        accessibilityLabel="Back"
        style={[styles.backButton, { top: 24 + insets.top, left: 24 + insets.left }]}
      >
        <Svg width="14" height="24" viewBox="0 0 17 28" fill="none">
          <Path d="M15.4143 27V14C15.4143 10.6863 12.728 8 9.41431 8H1.41431M7.41431 14L1.41431 8L8.41431 1" stroke="#483E2D" strokeWidth="2.5" strokeLinecap="round" />
        </Svg>
      </TouchableOpacity>

      {/* 4. TOP NAVIGATION BAR OVERLAY */}
      <View style={[styles.bottomTabContainer, { bottom: 24 + insets.bottom }]}>
        <View style={styles.tabsCapsule}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <TouchableOpacity
                key={tab.id}
                onPress={() => setActiveTab(tab.id)}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel={tab.label}
                accessibilityState={{ selected: isActive }}
                style={[styles.tabButton, isActive && styles.activeTabButton]}
              >
                <Text style={[styles.tabButtonText, isActive && styles.activeTabButtonText]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* 5. RIGHT SIDE MULTI-VIDEO NAVIGATION OVERLAY (Connectivity only) */}
      {activeTab === 'road' && (
        <Animated.View entering={FadeIn.duration(300)} style={[styles.rightMenuContainer, { right: 0 + insets.right }]}>
          {connectivityVideos.map((vid) => {
            const isActiveVid = activeNetworkVideo === vid.id;
            return (
              <TouchableOpacity
                key={vid.id}
                onPress={() => setActiveNetworkVideo(vid.id)}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel={vid.label}
                accessibilityState={{ selected: isActiveVid }}
                style={[styles.rightMenuBtn, isActiveVid && styles.activeRightMenuBtn]}
              >
                <Text style={[styles.rightMenuText, isActiveVid && styles.activeRightMenuText]}>
                  {vid.label}
                </Text>
              </TouchableOpacity>
            );
          })}
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
  backgroundImage: {
    ...StyleSheet.absoluteFill,
  },
  markerContainer: {
    position: 'absolute',
    transform: [{ translateX: -70 }, { translateY: -40 }],
    zIndex: 40,
  },
  markerContent: {
    alignItems: 'center',
  },
  markerBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  markerLogo: {
    width: 60,
    height: 18,
    backgroundColor: '#ffffff',
    borderRadius: 4,
    paddingHorizontal: 4,
  },
  markerText: {
    color: '#ffffff',
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  markerArrow: {
    width: 10,
    height: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    transform: [{ rotate: '45deg' }],
    marginTop: -5,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
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
  bottomTabContainer: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 50,
  },
  tabsCapsule: {
    flexDirection: 'row',
    backgroundColor: 'rgba(106, 106, 106, 0.9)',
    borderRadius: 30,
    padding: 4,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 5,
  },
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
  },
  activeTabButton: {
    backgroundColor: '#ffce75',
  },
  tabButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
  },
  activeTabButtonText: {
    color: '#111827',
    fontWeight: '600',
  },
  rightMenuContainer: {
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: [{ translateY: -120 }],
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
    paddingVertical: 20,
    paddingHorizontal: 24,
    width: 220,
    gap: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRightWidth: 0,
    zIndex: 50,
    shadowColor: '#000',
    shadowOffset: { width: -4, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  rightMenuBtn: {
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  activeRightMenuBtn: {
    borderColor: '#ffcd72',
  },
  rightMenuText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    fontWeight: '400',
  },
  activeRightMenuText: {
    color: '#ffcd72',
    fontWeight: '600',
  },
});
