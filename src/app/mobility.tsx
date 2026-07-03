import React, { useState, useCallback, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS, cancelAnimation } from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Components & Assets
import ProjectBottomNav from '../components/ProjectBottomNav';
import { theme } from '../theme';

const bgImage = require('../../assets/Project_Details/bg-image.png');
const lowerImg = require('../../assets/Project_Details/building-image.png');
const midImg = require('../../assets/Project_Details/buiding-image.png');
const upperImg = require('../../assets/Project_Details/project_details.png');

const staticData = [
  { title: 'Lower Zone', url: lowerImg },
  { title: 'Mid Zone', url: midImg },
  { title: 'Upper Zone', url: upperImg },
];

export default function Mobility() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Transition values
  const contentOpacity = useSharedValue(1);
  const [displayIndex, setDisplayIndex] = useState(0);

  const selectedItem = staticData[displayIndex];

  // Safety ref to track mount status
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
      cancelAnimation(contentOpacity);
    };
  }, []);

  // Safe wrapper for React State Setter inside Worklet Callback
  const applyNewIndex = useCallback((idx: number) => {
    if (isMounted.current) {
      setDisplayIndex(idx);
    }
  }, []);

  const triggerTransition = (newIdx: number) => {
    // Reanimated shared values are designed to be mutated via `.value`; the React
    // Compiler's immutability check doesn't model this, so suppress the false positive.
    // eslint-disable-next-line react-hooks/immutability
    contentOpacity.value = withTiming(0, { duration: 250 }, (finished) => {
      if (finished && isMounted.current) {
        runOnJS(applyNewIndex)(newIdx);
        contentOpacity.value = withTiming(1, { duration: 250 });
      }
    });
  };

  const handleSelect = (idx: number) => {
    if (idx === selectedIndex) return;
    // Makes the border/opacity change on the thumbnail smooth
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedIndex(idx);
    triggerTransition(idx);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
  }));

  return (
    <View style={styles.container}>
      {/* 1. Heavily blurred sky background */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <Image
          source={bgImage}
          style={styles.backgroundImage}
          contentFit="cover"
        />
        <View style={styles.overlay} />
      </View>

      {/* 2. Top Title Header */}
      <View style={[styles.titleContainer, { top: 40 + insets.top }]}>
        <View style={styles.titleLine} />
        <Text style={styles.titleText}>{selectedItem?.title}</Text>
        <View style={styles.titleLine} />
      </View>

      {/* 3. Center Media Container */}
      <View style={styles.mediaWrapper}>
        <Animated.View style={[styles.mediaCard, animatedStyle]}>
          <Image
            source={selectedItem?.url}
            style={styles.mediaImg}
            contentFit="cover"
          />
        </Animated.View>
      </View>

      {/* 4. Right Side Floating Thumbnails */}
      <View style={styles.rightThumbnails}>
        <View style={styles.thumbnailsContainer}>
          {staticData.map((item, idx) => {
            const isActive = idx === selectedIndex;
            return (
              <TouchableOpacity
                key={idx}
                activeOpacity={0.8}
                onPress={() => handleSelect(idx)}
                style={[
                  styles.thumbnailCard,
                  isActive ? styles.activeThumbnailCard : styles.inactiveThumbnailCard
                ]}
              >
                <Image source={item.url} style={styles.thumbnailImg} contentFit="cover" />
                <View style={styles.thumbnailLabel}>
                  <Text style={styles.thumbnailLabelText}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* 5. Left Back Button (Bottom Left) */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => router.push('/project-details')}
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
    fontFamily: theme.fonts.outfit.bold,
    fontSize: 22,
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.65)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  mediaWrapper: {
    width: '55%',
    aspectRatio: 16 / 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    transform: [{ translateY: -20 }, { translateX: -30 }],
  },
  mediaCard: {
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
  mediaImg: {
    width: '100%',
    height: '100%',
  },
  rightThumbnails: {
    position: 'absolute',
    right: '6%',
    top: '50%',
    transform: [{ translateY: -170 }], // Shifted slightly higher to center 3 cards
    zIndex: 50,
  },
  thumbnailsContainer: {
    backgroundColor: 'rgba(26, 26, 26, 0.85)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    padding: 12,
    gap: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  thumbnailCard: {
    width: 140,
    height: 90,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    position: 'relative',
  },
  activeThumbnailCard: {
    borderColor: '#FFCF77',
    opacity: 1,
  },
  inactiveThumbnailCard: {
    borderColor: 'rgba(255, 255, 255, 0.15)',
    opacity: 0.5,
  },
  thumbnailImg: {
    width: '100%',
    height: '100%',
  },
  thumbnailLabel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    paddingVertical: 4,
    alignItems: 'center',
  },
  thumbnailLabelText: {
    fontFamily: theme.fonts.outfit.bold,
    color: '#ffffff',
    fontSize: 8.5,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
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
