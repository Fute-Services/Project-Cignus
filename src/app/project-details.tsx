import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import Animated, { FadeInLeft, FadeInRight } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Shared Components
import LeftNavbar from '../components/LeftNavbar';
import BuildingSelector from '../components/BuildingSelector';
import RightTable from '../components/RightTable';

// Data & Assets
import { type FloorData, floors } from '../data/FloorData';
const leftLogo = require('../../assets/home/cignus-updated-logo.png');

export default function ProjectDetails() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [hoveredFloor, setHoveredFloor] = useState<FloorData | null>(null);

  const handleLogoPress = () => {
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      {/* 1. Base Map Canvas (Interactive SVG Building Floor picker) */}
      <View style={styles.mapContainer}>
        <BuildingSelector
          floors={floors}
          hoveredFloor={hoveredFloor}
          setHoveredFloor={setHoveredFloor}
        />
      </View>

      {/* 2. Left Navbar sidebar (Fades in slowly) */}
      <Animated.View entering={FadeInLeft.delay(500).duration(1000)} style={[styles.leftNavWrapper, { left: 0 + insets.left, top: 0 + insets.top, bottom: 0 + insets.bottom }]}>
        <LeftNavbar />
      </Animated.View>

      {/* 3. Top Left Cignus logo button */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleLogoPress}
        accessibilityRole="button"
        accessibilityLabel="Back to home"
        style={[styles.logoBtn, { top: 24 + insets.top, left: 24 + insets.left }]}
      >
        <Image source={leftLogo} style={styles.logoImg} contentFit="contain" />
      </TouchableOpacity>

      {/* 4. Interactive right sidebar table panel */}
      <Animated.View entering={FadeInRight.delay(500).duration(1000)} style={[styles.rightTableWrapper, { right: 24 + insets.right, top: 0 + insets.top, bottom: 0 + insets.bottom }]}>
        <RightTable
          floors={floors}
          hoveredFloor={hoveredFloor}
          setHoveredFloor={setHoveredFloor}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  mapContainer: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  leftNavWrapper: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 100,
    justifyContent: 'center',
    zIndex: 100,
  },
  logoBtn: {
    position: 'absolute',
    top: 24,
    left: 24,
    width: 150,
    height: 60,
    zIndex: 90,
  },
  logoImg: {
    width: '100%',
    height: '100%',
  },
  rightTableWrapper: {
    position: 'absolute',
    right: 24,
    top: 0,
    bottom: 0,
    width: '28%',
    justifyContent: 'center',
    zIndex: 90,
  },
});
