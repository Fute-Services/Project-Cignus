import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import Svg, { Path } from 'react-native-svg';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Shared Components
import ProjectBottomNav from '../components/ProjectBottomNav';

const bgImage = require('../../assets/Project_Details/bg-image.png');
const bgVideo = require('../../assets/Project_Details/bg_video.mp4');

const sections = [
  { id: '1', label: 'VT STRATEGY SECTION 01', video: bgVideo },
  { id: '2', label: 'VT STRATEGY SECTION 02', video: bgVideo },
  { id: '3', label: 'T1 & T2 VT STRATEGY', video: bgVideo },
  { id: '4', label: 'T2 – VT STRATEGY', video: bgVideo },
];

export default function VerticalTransport() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState(sections[0]);

  // Video view controllers
  const player = useVideoPlayer(activeSection.video, (playerInstance) => {
    playerInstance.loop = true;
    playerInstance.muted = true;
    playerInstance.play();
  });

  const handleSelect = (section: typeof sections[0]) => {
    if (section.id === activeSection.id) return;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveSection(section);
    player.replace(section.video);
    player.play();
  };

  return (
    <View style={styles.container}>
      {/* 1. Blurred background image layer */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <Image
          source={bgImage}
          style={styles.backgroundImage}
          contentFit="cover"
        />
        <View style={styles.overlay} />
      </View>

      {/* 2. Top Title Section */}
      <View style={styles.titleContainer}>
        <View style={styles.titleLine} />
        <Text style={styles.titleText}>{activeSection.label}</Text>
        <View style={styles.titleLine} />
      </View>

      {/* 3. Center Video Container */}
      <View style={styles.videoWrapper}>
        <View style={styles.videoCard}>
          <VideoView
            player={player}
            style={styles.videoView}
            contentFit="cover"
            nativeControls={false}
          />
        </View>
      </View>

      {/* 4. Floating Right Selection Menu */}
      <View style={styles.rightMenu}>
        <View style={styles.menuContainer}>
          {sections.map((section) => {
            const isActive = section.id === activeSection.id;
            return (
              <TouchableOpacity
                key={section.id}
                activeOpacity={0.8}
                onPress={() => handleSelect(section)}
                style={[styles.menuBtn, isActive ? styles.activeMenuBtn : styles.inactiveMenuBtn]}
              >
                <Text style={[styles.menuBtnText, isActive ? styles.activeMenuBtnText : styles.inactiveMenuBtnText]}>
                  {section.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* 5. Left Back Button (Bottom Left) */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => router.push('/project-details')}
        style={styles.backButton}
      >
        <Svg width="14" height="24" viewBox="0 0 17 28" fill="none">
          <Path d="M15.4143 27V14C15.4143 10.6863 12.728 8 9.41431 8H1.41431M7.41431 14L1.41431 8L8.41431 1" stroke="#483E2D" strokeWidth="2.5" strokeLinecap="round" />
        </Svg>
      </TouchableOpacity>

      {/* 6. Subpages bottom layout navigation */}
      <ProjectBottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFill,
    opacity: 0.7,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  titleContainer: {
    position: 'absolute',
    top: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    zIndex: 20,
  },
  titleLine: {
    height: 2,
    width: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  titleText: {
    fontSize: 18,
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 4,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.65)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    maxWidth: 400,
    textAlign: 'center',
  },
  videoWrapper: {
    width: '55%',
    aspectRatio: 16 / 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    transform: [{ translateY: -20 }, { translateX: -40 }],
  },
  videoCard: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.45,
    shadowRadius: 20,
    elevation: 8,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  videoView: {
    width: '100%',
    height: '100%',
  },
  rightMenu: {
    position: 'absolute',
    right: '4%',
    top: '50%',
    transform: [{ translateY: -140 }],
    zIndex: 50,
  },
  menuContainer: {
    backgroundColor: 'rgba(26, 26, 26, 0.85)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
    width: 250,
  },
  menuBtn: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 30,
    borderWidth: 1,
    alignItems: 'center',
  },
  activeMenuBtn: {
    backgroundColor: '#FFCF77',
    borderColor: '#FFCF77',
  },
  inactiveMenuBtn: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  menuBtnText: {
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  activeMenuBtnText: {
    color: '#000000',
  },
  inactiveMenuBtnText: {
    color: '#ffffff',
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
