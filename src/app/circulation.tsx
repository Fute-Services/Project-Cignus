import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import Svg, { Path } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';

// Shared Components
import RightNavbar from '../components/RightNavbar';
import ProjectBottomNav from '../components/ProjectBottomNav';
import VideoStatusOverlay from '../components/VideoStatusOverlay';
import { useVideoStatus } from '../hooks/useVideoStatus';

const bgImage = require('../../assets/initial/bg-img.png');
const circulationVideo = require('../../assets/circulation/powai-site-plan-circulation.mp4');

export default function Circulation() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Initialize loop play
  const player = useVideoPlayer(circulationVideo, (playerInstance) => {
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
      <View style={[styles.titleContainer, { top: 40 + insets.top }]}>
        <Text style={styles.titleText}>Circulation</Text>
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
          <VideoStatusOverlay isReady={isReady} hasError={hasError} />
        </View>
      </View>

      {/* 4. Left Back Button (Bottom Left) */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => router.push('/project-details')}
        accessibilityRole="button"
        accessibilityLabel="Back"
        style={[styles.backButton, { bottom: 32 + insets.bottom, left: 32 + insets.left }]}
      >
        <Svg width="14" height="24" viewBox="0 0 17 28" fill="none">
          <Path d="M15.4143 27V14C15.4143 10.6863 12.728 8 9.41431 8H1.41431M7.41431 14L1.41431 8L8.41431 1" stroke="#483E2D" strokeWidth="2.5" strokeLinecap="round" />
        </Svg>
      </TouchableOpacity>

      {/* 5. Right Sidebar navbar menu */}
      <RightNavbar />

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
    opacity: 0.75,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  titleContainer: {
    position: 'absolute',
    top: 40,
    zIndex: 20,
  },
  titleText: {
    fontSize: 24,
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 4,
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.65)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  videoWrapper: {
    width: '65%',
    aspectRatio: 16 / 9,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    transform: [{ translateY: -20 }],
  },
  videoCard: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    backgroundColor: '#1a1a1a',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.45,
    shadowRadius: 20,
    elevation: 8,
    overflow: 'hidden',
  },
  videoView: {
    width: '100%',
    height: '100%',
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
