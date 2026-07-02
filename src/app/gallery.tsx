import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const leftLogo = require('../../assets/Home/cignus updated logo.png');
const rightLogo = require('../../assets/Home/K_Raheja_Corp 1.png');

// ── Gallery Images ──
// Use JPEG versions wherever available to avoid OOM crashes on device
// (PNG alternatives like Night Aerial View.png are 13MB+ and will crash)
const ElevationView  = require('../../assets/Gallery/Elevation With LakeView.jpeg');
const AerialView     = require('../../assets/Gallery/Aerial View.jpeg');
const NightAerial    = require('../../assets/Gallery/Night Aerial View1.jpeg');   // JPEG 1.1MB ✓
const FacadeView     = require('../../assets/Gallery/Facade View.jpeg');
const Amenity1       = require('../../assets/Gallery/Amenities View.jpeg');
const Amenity2       = require('../../assets/Gallery/Amenties View 2.jpeg');
const Amenity3       = require('../../assets/Gallery/Amenities View 31.jpeg');   // JPEG 939KB ✓

const Reception2     = require('../../assets/Gallery/Reception (2).jpeg');
const Reception1     = require('../../assets/Gallery/Reception (3).jpeg');
const SeatingArea    = require('../../assets/Gallery/Seating Area.jpeg');
const Cafetaria      = require('../../assets/Gallery/Cafeteria (2).jpeg');
const LiftLobby      = require('../../assets/Gallery/Lift Lobby.jpeg');

type GalleryImage = { image: number; title: string };

const EXTERIOR_IMAGES: GalleryImage[] = [
  { image: ElevationView, title: 'Elevation With Lake View' },
  { image: AerialView,    title: 'Aerial View' },
  { image: NightAerial,   title: 'Aerial View (Night)' },
  { image: FacadeView,    title: 'Facade View' },
  { image: Amenity1,      title: 'Amenities View' },
  { image: Amenity2,      title: 'Amenities View 2' },
  { image: Amenity3,      title: 'Amenities View 3' },
];

const INTERIOR_IMAGES: GalleryImage[] = [
  { image: Reception2,  title: 'Reception' },
  { image: Reception1,  title: 'Reception Entrance' },
  { image: SeatingArea, title: 'Seating Area' },
  { image: Cafetaria,   title: 'Cafeteria' },
  { image: LiftLobby,   title: 'Lift Lobby' },
];

export default function Gallery() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [viewMode, setViewMode] = useState<'exterior' | 'interior'>('exterior');
  const [activeIndex, setActiveIndex] = useState(0);

  const activeImages = viewMode === 'exterior' ? EXTERIOR_IMAGES : INTERIOR_IMAGES;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? activeImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === activeImages.length - 1 ? 0 : prev + 1));
  };

  const changeCategory = (mode: 'exterior' | 'interior') => {
    if (mode === viewMode) return;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setViewMode(mode);
    setActiveIndex(0);
  };

  const currentImage = activeImages[activeIndex]?.image;
  const currentTitle = activeImages[activeIndex]?.title;

  return (
    <View style={styles.container}>
      {/* Background Image with Cross-fade Transition */}
      <View style={StyleSheet.absoluteFill}>
        {currentImage != null && (
          <Image
            source={currentImage}
            style={styles.backgroundImage}
            contentFit="contain"
            transition={{ duration: 300, effect: 'cross-dissolve' }}
          />
        )}
        {/* Dark overlay for readability */}
        <View style={styles.overlay} />
      </View>

      {/* Top Branding Logos */}
      <View style={[styles.logosContainer, { top: 24 + insets.top, left: 24 + insets.left, right: 24 + insets.right }]}>
        <Image source={leftLogo} style={styles.leftLogoImg} contentFit="contain" />
        <Image source={rightLogo} style={styles.rightLogoImg} contentFit="contain" />
      </View>

      {/* Back Button (Bottom Left) */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => router.push('/home')}
        style={[styles.backButton, { bottom: 32 + insets.bottom, left: 32 + insets.left }]}
      >
        <Svg width="14" height="24" viewBox="0 0 17 28" fill="none">
          <Path d="M15.4143 27V14C15.4143 10.6863 12.728 8 9.41431 8H1.41431M7.41431 14L1.41431 8L8.41431 1" stroke="#483E2D" strokeWidth="2.5" strokeLinecap="round" />
        </Svg>
      </TouchableOpacity>

      {/* Image Title Overlay */}
      <View style={[styles.titleContainer, { bottom: 100 + insets.bottom }]} pointerEvents="none">
        <Text style={styles.titleText}>{currentTitle}</Text>
        <Text style={styles.counterText}>{activeIndex + 1} / {activeImages.length}</Text>
      </View>

      {/* Bottom Controls Capsule */}
      <View style={[styles.controlsCapsule, { bottom: 32 + insets.bottom }]}>
        {/* Prev Button */}
        <TouchableOpacity onPress={handlePrev} activeOpacity={0.7} style={styles.arrowButton}>
          <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M15 18l-6-6 6-6" />
          </Svg>
        </TouchableOpacity>

        {/* Toggle Group */}
        <View style={styles.toggleGroup}>
          <TouchableOpacity
            onPress={() => changeCategory('interior')}
            activeOpacity={0.8}
            style={[styles.toggleBtn, viewMode === 'interior' && styles.activeToggleBtn]}
          >
            <Text style={[styles.toggleText, viewMode === 'interior' && styles.activeToggleText]}>Interior</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => changeCategory('exterior')}
            activeOpacity={0.8}
            style={[styles.toggleBtn, viewMode === 'exterior' && styles.activeToggleBtn]}
          >
            <Text style={[styles.toggleText, viewMode === 'exterior' && styles.activeToggleText]}>Exterior</Text>
          </TouchableOpacity>
        </View>

        {/* Next Button */}
        <TouchableOpacity onPress={handleNext} activeOpacity={0.7} style={styles.arrowButton}>
          <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M9 18l6-6-6-6" />
          </Svg>
        </TouchableOpacity>
      </View>
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
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  logosContainer: {
    position: 'absolute',
    top: 24,
    left: 24,
    right: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 50,
  },
  leftLogoImg: {
    height: 60,
    width: 140,
  },
  rightLogoImg: {
    height: 52,
    width: 120,
    marginRight: 10,
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
  titleContainer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 50,
    gap: 4,
  },
  titleText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '300',
    letterSpacing: 2,
    textTransform: 'uppercase',
    textShadowColor: 'rgba(0, 0, 0, 0.95)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  counterText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 11,
    letterSpacing: 1,
  },
  controlsCapsule: {
    position: 'absolute',
    bottom: 32,
    left: '50%',
    transform: [{ translateX: -175 }],
    width: 350,
    height: 52,
    backgroundColor: 'rgba(30, 32, 24, 0.90)',
    borderRadius: 26,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
    zIndex: 90,
  },
  arrowButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleGroup: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: 20,
    padding: 2,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  toggleBtn: {
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeToggleBtn: {
    backgroundColor: '#FFCF77',
  },
  toggleText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 0.8)',
    letterSpacing: 1,
  },
  activeToggleText: {
    color: '#483E2D',
  },
});
