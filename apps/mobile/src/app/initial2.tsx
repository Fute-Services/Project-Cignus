import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import Animated, { FadeInUp, FadeIn, FadeOut } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useVideoStatus } from '../hooks/useVideoStatus';

const rightLogo = require('../../assets/home/k-raheja-corp-1.png');
const cignusLogo = require('../../assets/home/cignus-updated-logo.png');
const exploreBtn = require('../../assets/initial/primary-button.png');
const linesImg = require('../../assets/project-details/lines.png');
const lakePlaceholder = require('../../assets/home/lake-placeholder.webp');

// Local video asset
const bgVideoAsset = require('../../assets/home/masterplan-page-video.mp4');

export default function Initial2() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Initialize expo-video player
  const player = useVideoPlayer(bgVideoAsset, (playerInstance) => {
    playerInstance.loop = true;
    playerInstance.muted = true;
    playerInstance.play();
  });

  // Fade out the placeholder once the video is actually ready to play,
  // rather than guessing with a fixed timer.
  const { isReady } = useVideoStatus(player);
  useEffect(() => {
    if (isReady) setVideoLoaded(true);
  }, [isReady]);

  const handleExplore = () => {
    router.replace('/home');
  };

  return (
    <View style={styles.container}>
      {/* 1. Background Video Layer */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        {/* Native video player looping locally */}
        <VideoView
          player={player}
          style={styles.backgroundVideo}
          contentFit="cover"
          nativeControls={false}
        />

        {/* Static Placeholder Thumbnail (fades out when video plays) */}
        {!videoLoaded && (
          <Animated.View exiting={FadeOut.duration(800)} style={StyleSheet.absoluteFill}>
            <Image source={lakePlaceholder} style={styles.placeholderImg} contentFit="cover" />
          </Animated.View>
        )}
        
        {/* Dark opacity overlay for readability */}
        <View style={styles.videoOverlay} />
      </View>

      {/* 2. Top Decorative Lines */}
      <View style={styles.topLinesContainer} pointerEvents="none">
        <Image source={linesImg} style={styles.topLines} contentFit="cover" />
      </View>

      {/* 3. Top Right K Raheja Corp Logo */}
      <Animated.View entering={FadeInUp.delay(200).duration(800)} style={[styles.topRightLogo, { top: 24 + insets.top, right: 32 + insets.right }]}>
        <Image source={rightLogo} style={styles.brandLogo} contentFit="contain" />
      </Animated.View>

      {/* 4. Main Content Center Layer */}
      <View style={styles.content}>
        
        {/* Title Line 1 */}
        <Animated.Text entering={FadeInUp.delay(400).duration(800)} style={styles.titleLine1}>
          Where The Lake Meets
        </Animated.Text>

        {/* Title Line 2 */}
        <Animated.Text entering={FadeInUp.delay(600).duration(800)} style={styles.titleLine2}>
          The Boardroom
        </Animated.Text>

        {/* Cignus Gold Logo */}
        <Animated.View entering={FadeIn.delay(800).duration(1000)} style={styles.cignusLogoWrapper}>
          <Image source={cignusLogo} style={styles.cignusLogoImg} contentFit="contain" />
        </Animated.View>

        {/* Explore Pill Capsule Button */}
        <Animated.View entering={FadeInUp.delay(1000).duration(800)} style={styles.explorePill}>
          <View style={styles.pillBadge}>
            <Image source={rightLogo} style={styles.pillBadgeLogo} contentFit="contain" />
          </View>
          <TouchableOpacity
            onPress={handleExplore}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="Explore"
            style={styles.exploreBtnWrapper}
          >
            <Image source={exploreBtn} style={styles.exploreBtnImg} contentFit="contain" />
          </TouchableOpacity>
        </Animated.View>

      </View>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    overflow: 'hidden',
  },
  backgroundVideo: {
    ...StyleSheet.absoluteFillObject,
  },
  placeholderImg: {
    ...StyleSheet.absoluteFillObject,
  },
  videoOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
  },
  topLinesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    opacity: 0.45,
    transform: [{ rotate: '180deg' }],
  },
  topLines: {
    width: '100%',
    height: '100%',
  },
  topRightLogo: {
    position: 'absolute',
    top: 24,
    right: 32,
    zIndex: 20,
  },
  brandLogo: {
    height: 48,
    width: 110,
  },
  content: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    paddingHorizontal: 24,
  },
  titleLine1: {
    fontSize: 36,
    color: '#3990dc',
    textAlign: 'center',
    letterSpacing: 2,
    fontFamily: 'Outfit_300Light',
  },
  titleLine2: {
    fontSize: 48,
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 4,
    letterSpacing: 2,
    fontFamily: 'Outfit_300Light',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  cignusLogoWrapper: {
    marginVertical: 32,
    width: 140,
    height: 52,
  },
  cignusLogoImg: {
    width: '100%',
    height: '100%',
  },
  explorePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(117, 191, 255, 0.25)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderRadius: 30,
    paddingRight: 6,
    height: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  pillBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
  },
  pillBadgeLogo: {
    width: 24,
    height: 24,
  },
  exploreBtnWrapper: {
    height: '100%',
    justifyContent: 'center',
  },
  exploreBtnImg: {
    height: 38,
    width: 100,
  },
});
