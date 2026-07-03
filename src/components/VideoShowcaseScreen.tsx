import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useVideoPlayer, VideoView, type VideoSource } from 'expo-video';
import Svg, { Path } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';

import LeftNavbar from './LeftNavbar';
import RightNavbar from './RightNavbar';
import VideoStatusOverlay from './VideoStatusOverlay';
import { useVideoStatus } from '../hooks/useVideoStatus';
import { safeNavigate } from '../utils/safeNavigate';

const bgImage = require('../../assets/initial/bg-img.png');
const logo1 = require('../../assets/home/cignus-updated-logo.png');
const logo2 = require('../../assets/home/k-raheja-corp-1.png');

interface VideoShowcaseScreenProps {
  title: string;
  videoSource: VideoSource;
  /** Whether the video starts muted (default true). Walkthrough starts with sound on. */
  initialMuted?: boolean;
  /** Whether to render the left sidebar navbar alongside the right one. */
  showLeftNavbar?: boolean;
}

// Shared full-screen "video card" viewer used by droneview, construction, and
// walkthrough — same chrome (branding, mute/fullscreen toggles, back button),
// differing only in title, video source, initial mute state, and navbars.
export default function VideoShowcaseScreen({
  title,
  videoSource,
  initialMuted = true,
  showLeftNavbar = false,
}: VideoShowcaseScreenProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [isMuted, setIsMuted] = React.useState(initialMuted);
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  const player = useVideoPlayer(videoSource, (playerInstance) => {
    playerInstance.loop = true;
    playerInstance.muted = initialMuted;
    playerInstance.volume = initialMuted ? 0 : 1;
    playerInstance.play();
  });

  const toggleMute = () => {
    const nextMuted = !player.muted;
    player.muted = nextMuted;
    player.volume = nextMuted ? 0 : 1;
    setIsMuted(nextMuted);
  };

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

  React.useEffect(() => {
    if (player) {
      player.muted = isMuted;
      player.volume = isMuted ? 0 : 1;
    }
  }, [player, isMuted]);

  return (
    <View style={styles.container}>
      {/* 1. Full-screen background image layer */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <Image source={bgImage} style={styles.backgroundImage} contentFit="cover" />
        <View style={styles.overlay} />
      </View>

      {/* 2. Top Branding Badges */}
      {!isFullscreen && (
        <>
          <View style={[styles.topLeftLogo, { top: 24 + insets.top, left: 24 + insets.left }]}>
            <Image source={logo1} style={styles.logoImg} contentFit="contain" />
          </View>
          <View style={[styles.topRightLogo, { top: 24 + insets.top, right: 24 + insets.right }]}>
            <Image source={logo2} style={styles.logo2Img} contentFit="contain" />
          </View>
        </>
      )}

      {/* 3. Center Content stack */}
      {!isFullscreen && (
        <View style={styles.contentWrapper}>
          <Text style={styles.pageTitle}>{title}</Text>

          <View style={styles.videoCard}>
            <VideoView
              player={player}
              style={styles.videoView}
              contentFit="cover"
              nativeControls={true}
              allowsFullscreen={false}
            />
            <VideoStatusOverlay isReady={isReady} hasError={hasError} />
            {/* Custom Mute/Unmute Overlay Button */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={toggleMute}
              accessibilityRole="button"
              accessibilityLabel={isMuted ? 'Unmute video' : 'Mute video'}
              style={styles.muteButton}
            >
              {isMuted ? (
                <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFCF77" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M11 5L6 9H2v6h4l5 4V5z" />
                  <Path d="M23 9l-6 6M17 9l6 6" />
                </Svg>
              ) : (
                <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M11 5L6 9H2v6h4l5 4V5z" />
                  <Path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <Path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </Svg>
              )}
            </TouchableOpacity>

            {/* Custom Fullscreen Expand Button */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setIsFullscreen(true)}
              accessibilityRole="button"
              accessibilityLabel="Enter fullscreen"
              style={styles.fullscreenToggleBtn}
            >
              <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <Path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </Svg>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* 4. Left Back Button (Bottom Left) */}
      {!isFullscreen && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => safeNavigate(router, '/home')}
          accessibilityRole="button"
          accessibilityLabel="Back"
          style={[styles.backButton, { bottom: 32 + insets.bottom, left: 32 + insets.left }]}
        >
          <Svg width="14" height="24" viewBox="0 0 17 28" fill="none">
            <Path d="M15.4143 27V14C15.4143 10.6863 12.728 8 9.41431 8H1.41431M7.41431 14L1.41431 8L8.41431 1" stroke="#483E2D" strokeWidth="2.5" strokeLinecap="round" />
          </Svg>
        </TouchableOpacity>
      )}

      {/* 5. Navbars overlays */}
      {!isFullscreen && (
        <>
          {showLeftNavbar && <LeftNavbar />}
          <RightNavbar />
        </>
      )}

      {/* ── 6. Fullscreen Video View Overlay (Absolute Root Level) ── */}
      {isFullscreen && (
        <View style={StyleSheet.absoluteFill}>
          <VideoView
            player={player}
            style={StyleSheet.absoluteFill}
            contentFit="contain"
            nativeControls={true}
            allowsFullscreen={false}
          />
          <VideoStatusOverlay isReady={isReady} hasError={hasError} />
          {/* Floating sound toggle in fullscreen */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={toggleMute}
            accessibilityRole="button"
            accessibilityLabel={isMuted ? 'Unmute video' : 'Mute video'}
            style={[styles.muteButton, { top: 24 + insets.top, right: 24 + insets.right, bottom: undefined }]}
          >
            {isMuted ? (
              <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFCF77" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <Path d="M11 5L6 9H2v6h4l5 4V5z" />
                <Path d="M23 9l-6 6M17 9l6 6" />
              </Svg>
            ) : (
              <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <Path d="M11 5L6 9H2v6h4l5 4V5z" />
                <Path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <Path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </Svg>
            )}
          </TouchableOpacity>

          {/* Custom Fullscreen Collapse Back Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setIsFullscreen(false)}
            accessibilityRole="button"
            accessibilityLabel="Exit fullscreen"
            style={[styles.fullscreenBackBtn, { top: 24 + insets.top, left: 24 + insets.left }]}
          >
            <Svg width="14" height="24" viewBox="0 0 17 28" fill="none">
              <Path d="M15.4143 27V14C15.4143 10.6863 12.728 8 9.41431 8H1.41431M7.41431 14L1.41431 8L8.41431 1" stroke="#483E2D" strokeWidth="2.5" strokeLinecap="round" />
            </Svg>
          </TouchableOpacity>
        </View>
      )}
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
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  topLeftLogo: {
    position: 'absolute',
    top: 24,
    left: 24,
    width: 120,
    height: 50,
    zIndex: 90,
  },
  topRightLogo: {
    position: 'absolute',
    top: 24,
    right: 24,
    width: 90,
    height: 56,
    zIndex: 90,
  },
  logoImg: {
    width: '100%',
    height: '100%',
  },
  logo2Img: {
    width: '100%',
    height: '100%',
  },
  contentWrapper: {
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    transform: [{ translateY: -10 }],
  },
  pageTitle: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.65)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  videoCard: {
    width: '100%',
    aspectRatio: 16 / 9,
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
  muteButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  fullscreenToggleBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  fullscreenBackBtn: {
    position: 'absolute',
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
    zIndex: 10000,
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
