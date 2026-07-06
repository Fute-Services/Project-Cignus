import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Shared Components
import Header from '../components/Header';
import LeftNavbar from '../components/LeftNavbar';
import RightNavbar from '../components/RightNavbar';
import MovingCars from '../components/MovingCars';

const bgImage = require('../../assets/gallery/night-aerial-view1.jpeg'); // JPEG 1.1MB — avoids OOM crash from 13MB PNG
const bottomLogoBtn = require('../../assets/home/k-raheja-corp-1.png');

export default function Home() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleBottomLogoPress = () => {
    // Navigate back to the initial dashboard splash page
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      {/* 1. Background Image Layer */}
      <Animated.View entering={FadeIn.duration(1000)} style={StyleSheet.absoluteFill} pointerEvents="none">
        <Image
          source={bgImage}
          style={styles.backgroundImage}
          contentFit="cover"
        />
        {/* Dark overlay for contrast */}
        <View style={styles.overlay} />
        {/* Animated car headlights moving along the lit roads */}
        <MovingCars />
      </Animated.View>

      {/* 2. Top Header Branding Logos */}
      <Header />

      {/* 3. Left Navigation Menu overlay */}
      <LeftNavbar />

      {/* 4. Right Navigation Menu overlay */}
      <RightNavbar />

      {/* 5. Bottom Left K Raheja logo button to reset/home */}
      <Animated.View entering={FadeInUp.duration(800).delay(400).springify()} style={[styles.bottomLogoContainer, { bottom: 40 + insets.bottom, left: 64 + insets.left }]} pointerEvents="box-none">
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleBottomLogoPress}
          accessibilityRole="button"
          accessibilityLabel="Restart from home"
          style={styles.bottomLogoBtn}
        >
          <Image
            source={bottomLogoBtn}
            style={styles.bottomLogoImg}
            contentFit="contain"
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c0f12',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
  },
  bottomLogoContainer: {
    position: 'absolute',
    bottom: 40,
    left: 100,
    zIndex: 90,
  },
  bottomLogoBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  bottomLogoImg: {
    width: '100%',
    height: '100%',
  },
});
