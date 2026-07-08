import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, PanResponder } from 'react-native';
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
const logo1 = require('../../assets/overview/logo.png');
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

  const [isPlaying, setIsPlaying] = React.useState(true);
  React.useEffect(() => {
    const subscription = player.addListener('playingChange', ({ isPlaying: playing }) => {
      setIsPlaying(playing);
    });
    return () => subscription.remove();
  }, [player]);

  const togglePlayback = () => {
    if (player.playing) {
      player.pause();
    } else {
      player.play();
    }
  };

  const skipBy = (seconds: number) => {
    player.seekBy(seconds);
  };

  // Seek bar: currentTime/duration polled via timeUpdate (expo-video has no
  // "duration became known" event, and it's 0 until the source loads) so the
  // bar can render as soon as metadata is available. While the user is
  // dragging, the bar shows the drag position instead of the live time so
  // the thumb doesn't jump back and fight their finger/mouse.
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [dragFraction, setDragFraction] = React.useState<number | null>(null);
  const barRef = React.useRef<View>(null);
  const barWidthRef = React.useRef(0);
  const barPageXRef = React.useRef(0);

  // pageX (used below) is page-absolute, so the bar's own page-absolute left
  // edge is needed to turn a touch/mouse position into a 0..1 fraction.
  // Re-measured on every layout and at gesture start (covers resize/scroll).
  const measureBar = () => {
    barRef.current?.measureInWindow((x) => {
      barPageXRef.current = x;
    });
  };

  React.useEffect(() => {
    player.timeUpdateEventInterval = 0.25;
    const subscription = player.addListener('timeUpdate', ({ currentTime: t }) => {
      setCurrentTime(t);
      setDuration(player.duration || 0);
    });
    return () => subscription.remove();
  }, [player]);

  const seekToFraction = (fraction: number) => {
    const clamped = Math.max(0, Math.min(1, fraction));
    if (duration > 0) {
      player.currentTime = clamped * duration;
    }
  };

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (evt) => {
          measureBar();
          if (barWidthRef.current > 0) {
            const fraction = (evt.nativeEvent.pageX - barPageXRef.current) / barWidthRef.current;
            setDragFraction(Math.max(0, Math.min(1, fraction)));
          }
        },
        onPanResponderMove: (evt) => {
          if (barWidthRef.current <= 0) return;
          const fraction = (evt.nativeEvent.pageX - barPageXRef.current) / barWidthRef.current;
          setDragFraction(Math.max(0, Math.min(1, fraction)));
        },
        onPanResponderRelease: (evt) => {
          if (barWidthRef.current > 0) {
            seekToFraction((evt.nativeEvent.pageX - barPageXRef.current) / barWidthRef.current);
          }
          setDragFraction(null);
        },
        onPanResponderTerminate: () => setDragFraction(null),
      }),
    [duration],
  );

  const displayFraction = dragFraction ?? (duration > 0 ? currentTime / duration : 0);

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

  // Draggable scrub bar: tap or drag anywhere on the track to jump straight
  // to that point instead of repeatedly tapping the 10s skip buttons.
  const renderSeekBar = () => (
    <View
      ref={barRef}
      onLayout={(e) => {
        barWidthRef.current = e.nativeEvent.layout.width;
        measureBar();
      }}
      style={styles.seekBarTrack}
      {...panResponder.panHandlers}
    >
      <View style={styles.seekBarBase} />
      <View style={[styles.seekBarFill, { width: `${displayFraction * 100}%` }]} />
      <View style={[styles.seekBarThumb, { left: `${displayFraction * 100}%` }]} />
    </View>
  );

  // Shared rewind / play-pause / forward bar — rendered once in the card
  // view and again over the fullscreen overlay.
  const renderPlaybackControls = () => (
    <View style={styles.playbackControlsWrapper} pointerEvents="box-none">
      {renderSeekBar()}
      <View style={styles.playbackControls} pointerEvents="box-none">
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => skipBy(-10)}
        accessibilityRole="button"
        accessibilityLabel="Rewind 10 seconds"
        style={styles.playbackBtn}
      >
        <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <Path d="M11 17L6 12l5-5" />
          <Path d="M18 17l-5-5 5-5" />
        </Svg>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={togglePlayback}
        accessibilityRole="button"
        accessibilityLabel={isPlaying ? 'Pause video' : 'Play video'}
        style={[styles.playbackBtn, styles.playPauseBtn]}
      >
        {isPlaying ? (
          <Svg width="18" height="18" viewBox="0 0 24 24" fill="#111827">
            <Path d="M7 5h3v14H7zM14 5h3v14h-3z" />
          </Svg>
        ) : (
          <Svg width="18" height="18" viewBox="0 0 24 24" fill="#111827">
            <Path d="M7 5l12 7-12 7V5z" />
          </Svg>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => skipBy(10)}
        accessibilityRole="button"
        accessibilityLabel="Forward 10 seconds"
        style={styles.playbackBtn}
      >
        <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <Path d="M13 17l5-5-5-5" />
          <Path d="M6 17l5-5-5-5" />
        </Svg>
      </TouchableOpacity>
      </View>
    </View>
  );

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

      {/* 3. The video block — a SINGLE, always-mounted VideoView whose wrapper
           style toggles between the centered card and a fullscreen overlay.
           Keeping one <video> element mounted (rather than swapping a card
           view out for a separate fullscreen view) means entering/exiting
           fullscreen just resizes it via CSS, so playback continues seamlessly
           instead of the element remounting and the video stopping. */}
      <View style={isFullscreen ? styles.videoBlockFullscreen : styles.contentWrapper}>
        {!isFullscreen && <Text style={styles.pageTitle}>{title}</Text>}

        <View style={isFullscreen ? styles.videoCardFullscreen : styles.videoCard}>
          <VideoView
            player={player}
            style={styles.videoView}
            contentFit="cover"
            nativeControls={false}
            allowsFullscreen={false}
          />
          <VideoStatusOverlay isReady={isReady} hasError={hasError} />
          {renderPlaybackControls()}

          {/* Mute/Unmute — bottom-right in the card, floated top-right under
              the safe-area inset in fullscreen. */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={toggleMute}
            accessibilityRole="button"
            accessibilityLabel={isMuted ? 'Unmute video' : 'Mute video'}
            style={
              isFullscreen
                ? [styles.muteButton, { top: 24 + insets.top, right: 24 + insets.right, bottom: undefined }]
                : styles.muteButton
            }
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

          {/* Fullscreen toggle — collapse (top-left) in fullscreen, expand
              (top-right) in the card. */}
          {isFullscreen ? (
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
          ) : (
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
          )}
        </View>
      </View>

      {/* 4. Navbars overlays */}
      {!isFullscreen && (
        <>
          {showLeftNavbar && <LeftNavbar />}
          <RightNavbar />
        </>
      )}

      {/* 5. Left Back Button (Bottom Left) — must render after the navbars:
          LeftNavbar's outer container is full-height and same zIndex, so on
          web/Electron (equal-zIndex ties break by DOM order) it would paint
          over and swallow clicks on this button if rendered first. */}
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
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
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
  // Fullscreen: the same mounted video block covers the whole screen as an
  // absolute overlay (above the background layer), and the card chrome —
  // rounded border, 16/9 aspect ratio, drop shadow — is dropped so the
  // <video> fills edge to edge. Only the styles change; the element stays
  // mounted, so playback never stops on the transition.
  videoBlockFullscreen: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 500,
  },
  videoCardFullscreen: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
  },
  playbackControlsWrapper: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    alignItems: 'center',
    gap: 10,
    zIndex: 100,
  },
  seekBarTrack: {
    width: '80%',
    height: 14,
    justifyContent: 'center',
  },
  seekBarBase: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    marginTop: -2,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  seekBarFill: {
    position: 'absolute',
    left: 0,
    top: '50%',
    marginTop: -2,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FFCF77',
  },
  seekBarThumb: {
    position: 'absolute',
    top: '50%',
    width: 12,
    height: 12,
    marginTop: -6,
    marginLeft: -6,
    borderRadius: 6,
    backgroundColor: '#FFCF77',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.9)',
  },
  playbackControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
  },
  playbackBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playPauseBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFCF77',
    borderColor: 'rgba(255, 255, 255, 0.3)',
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
