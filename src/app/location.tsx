import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import Animated, { FadeInUp, FadeIn } from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

const logo = require('../../assets/Home/cignus updated logo.png');
const siteLocation = require('../../assets/Location/NEW FINAL SITE LOCATION IMG.jpeg');
const neighborhood = require('../../assets/Location/img location.png');

// Videos
const jvlrVideo = require('../../assets/Location/Towards eastern & western expressway final (2) (2).mp4');
const rambaughVideo = require('../../assets/Location/RAMBAUG METRO (3).mp4');
const sakinakaVideo = require('../../assets/Location/SAKINAKA METRO (2).mp4');
const aareyVideo = require('../../assets/Location/AAREY METRO (2).mp4');
const transportVideo = require('../../assets/Location/Transport.mp4');

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
  const [activeTab, setActiveTab] = useState('site');
  const [activeNetworkVideo, setActiveNetworkVideo] = useState('jvlr');

  // Video players
  const currentVideoAsset = activeTab === 'transport'
    ? transportVideo
    : connectivityVideos.find(v => v.id === activeNetworkVideo)?.src || jvlrVideo;

  const player = useVideoPlayer(currentVideoAsset, (playerInstance) => {
    playerInstance.loop = true;
    playerInstance.muted = true;
    playerInstance.play();
  });

  // Re-play video whenever tab/video changes
  useEffect(() => {
    player.replace(currentVideoAsset);
    player.play();
  }, [activeTab, activeNetworkVideo, currentVideoAsset]);

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
        entering={FadeIn.delay(idx * 150).duration(500)}
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
        {activeTab === 'site' || activeTab === 'neighbourhood' ? (
          <Image
            source={activeTab === 'site' ? siteLocation : neighborhood}
            style={styles.backgroundImage}
            contentFit="contain"
          />
        ) : (
          <VideoView
            player={player}
            style={styles.backgroundImage}
            contentFit="contain"
            nativeControls={false}
          />
        )}

        {/* 2. OVERLAY INTERACTIVE MARKERS */}
        {renderMarkers()}
      </View>

      {/* 3. BACK BUTTON (Top Left) */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => router.push('/home')}
        style={styles.backButton}
      >
        <Svg width="14" height="24" viewBox="0 0 17 28" fill="none">
          <Path d="M15.4143 27V14C15.4143 10.6863 12.728 8 9.41431 8H1.41431M7.41431 14L1.41431 8L8.41431 1" stroke="#483E2D" strokeWidth="2.5" strokeLinecap="round" />
        </Svg>
      </TouchableOpacity>

      {/* 4. TOP NAVIGATION BAR OVERLAY */}
      <View style={styles.bottomTabContainer}>
        <View style={styles.tabsCapsule}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <TouchableOpacity
                key={tab.id}
                onPress={() => setActiveTab(tab.id)}
                activeOpacity={0.8}
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
        <Animated.View entering={FadeIn.duration(300)} style={styles.rightMenuContainer}>
          {connectivityVideos.map((vid) => {
            const isActiveVid = activeNetworkVideo === vid.id;
            return (
              <TouchableOpacity
                key={vid.id}
                onPress={() => setActiveNetworkVideo(vid.id)}
                activeOpacity={0.7}
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
