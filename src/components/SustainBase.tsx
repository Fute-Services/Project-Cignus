import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const bgVideo = require('../../assets/Project_Details/animated_Video.mp4');
const linesImg = require('../../assets/Project_Details/lines.png');
const buildingImg = require('../../assets/Project_Details/animated.png');
const logo = require('../../assets/Home/cignus updated logo.png');

interface SustainBaseProps {
  initialMode: 'sustainability' | 'concept';
}

export default function SustainBase({ initialMode }: SustainBaseProps) {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [mode, setMode] = useState<'sustainability' | 'concept'>(initialMode);

  // Initialize loop player
  const player = useVideoPlayer(bgVideo, (playerInstance) => {
    playerInstance.loop = true;
    playerInstance.muted = true;
    playerInstance.play();
  });

  // Reanimated shared values for building shifts
  const buildingX = useSharedValue(mode === 'concept' ? width * 0.35 : -width * 0.12);
  const buildingY = useSharedValue(mode === 'concept' ? height * 0.12 : height * 0.05);
  const buildingScale = useSharedValue(mode === 'concept' ? 1.2 : 1.05);

  // Shared values for opacity of left and right panels
  const sustainabilityOpacity = useSharedValue(mode === 'sustainability' ? 1 : 0);
  const conceptOpacity = useSharedValue(mode === 'concept' ? 1 : 0);

  // Logo opacity fade
  const logoOpacity = useSharedValue(mode === 'sustainability' ? 1 : 0);

  useEffect(() => {
    if (mode === 'concept') {
      // Shifting building to right/bottom & upscale
      buildingX.value = withTiming(width * 0.35, { duration: 1800, easing: Easing.bezier(0.25, 1, 0.5, 1) });
      buildingY.value = withTiming(height * 0.12, { duration: 1800, easing: Easing.bezier(0.25, 1, 0.5, 1) });
      buildingScale.value = withTiming(1.2, { duration: 1800, easing: Easing.bezier(0.25, 1, 0.5, 1) });

      // Crossfade panels
      sustainabilityOpacity.value = withTiming(0, { duration: 600 });
      conceptOpacity.value = withDelay(400, withTiming(1, { duration: 800 }));
      logoOpacity.value = withTiming(0, { duration: 800 });
    } else {
      // Shifting building to left/top & downscale
      buildingX.value = withTiming(-width * 0.12, { duration: 1800, easing: Easing.bezier(0.25, 1, 0.5, 1) });
      buildingY.value = withTiming(height * 0.05, { duration: 1800, easing: Easing.bezier(0.25, 1, 0.5, 1) });
      buildingScale.value = withTiming(1.05, { duration: 1800, easing: Easing.bezier(0.25, 1, 0.5, 1) });

      // Crossfade panels
      conceptOpacity.value = withTiming(0, { duration: 600 });
      sustainabilityOpacity.value = withDelay(400, withTiming(1, { duration: 800 }));
      logoOpacity.value = withTiming(1, { duration: 800 });
    }
  }, [mode, width, height]);

  // Animated styles
  const buildingAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: buildingX.value },
      { translateY: buildingY.value },
      { scale: buildingScale.value }
    ],
  }));

  const sustainAnimatedStyle = useAnimatedStyle(() => ({
    opacity: sustainabilityOpacity.value,
  }));

  const conceptAnimatedStyle = useAnimatedStyle(() => ({
    opacity: conceptOpacity.value,
  }));

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
  }));

  return (
    <View style={styles.container}>
      {/* ── 1. Looping video background ── */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <VideoView
          player={player}
          style={styles.videoView}
          contentFit="cover"
          nativeControls={false}
        />
        <View style={styles.videoOverlay} />
      </View>

      {/* ── 2. Horizontal Lines Layer ── */}
      <View style={styles.linesWrapper} pointerEvents="none">
        <Image source={linesImg} style={styles.linesImg} contentFit="cover" />
      </View>

      {/* ── 3. Back Button ── */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => router.push('/overview')}
        style={[styles.backButton, { bottom: 32 + insets.bottom, left: 32 + insets.left }]}
      >
        <Svg width="14" height="24" viewBox="0 0 17 28" fill="none">
          <Path d="M15.4143 27V14C15.4143 10.6863 12.728 8 9.41431 8H1.41431M7.41431 14L1.41431 8L8.41431 1" stroke="#483E2D" strokeWidth="2.5" strokeLinecap="round" />
        </Svg>
      </TouchableOpacity>

      {/* ── 4. Floating Logo ── */}
      <Animated.View style={[styles.brandLogo, { top: 32 + insets.top, left: 32 + insets.left }, logoAnimatedStyle]} pointerEvents="none">
        <Image source={logo} style={styles.brandLogoImg} contentFit="contain" />
      </Animated.View>

      {/* ── 5. The Shifting/Animated Building ── */}
      <Animated.View style={[styles.buildingContainer, { width: width * 0.48, height: height * 0.9 }, buildingAnimatedStyle]} pointerEvents="none">
        <Image source={buildingImg} style={styles.buildingImg} contentFit="contain" />
      </Animated.View>

      {/* ── 6. Sustainability content panel (Right side) ── */}
      <Animated.View style={[styles.rightContentPanel, { width: width * 0.42 }, sustainAnimatedStyle]} pointerEvents={mode === 'sustainability' ? 'auto' : 'none'}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.panelTitle}>Sustainability Initiatives</Text>

          <View style={styles.initiativesWrapper}>
            {/* Dashed vertical connector line */}
            <View style={styles.dashedLine} />

            {/* Initiative 1 */}
            <View style={styles.initiativeRow}>
              <View style={styles.bulletPoint} />
              <View style={styles.initiativeText}>
                <Text style={styles.initiativeTitle}>Water Conservation</Text>
                <Text style={styles.initiativeDesc}>
                  Recycling & Reuse of water.{'\n'}
                  Storage, Recharge & Use of Rainwater.{'\n'}
                  Low Flow water efficient fixtures.
                </Text>
              </View>
            </View>

            {/* Initiative 2 */}
            <View style={styles.initiativeRow}>
              <View style={styles.bulletPoint} />
              <View style={styles.initiativeText}>
                <Text style={styles.initiativeTitle}>Energy Conservation</Text>
                <Text style={styles.initiativeDesc}>
                  LED High efficiency light fixtures in common areas.{'\n'}
                  Energy efficient motors for mechanical equipment.{'\n'}
                  High COP chillers.{'\n'}
                  Use of Low Global Warming Potential (LGWP) refrigerant.{'\n'}
                  Variable Frequency Drive on motors.
                </Text>
              </View>
            </View>

            {/* Initiative 3 */}
            <View style={styles.initiativeRow}>
              <View style={styles.bulletPoint} />
              <View style={styles.initiativeText}>
                <Text style={styles.initiativeTitle}>Other Initiatives</Text>
                <Text style={styles.initiativeDesc}>
                  High efficiency double glazed envelope.{'\n'}
                  Installation of Energy recovery systems.{'\n'}
                  Below grade parking with Co sensors.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </Animated.View>

      {/* ── 7. Concept/Superstructure content panel (Left side) ── */}
      <Animated.View style={[styles.leftContentPanel, { width: width * 0.38 }, conceptAnimatedStyle]} pointerEvents={mode === 'concept' ? 'auto' : 'none'}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.panelTitle}>Superstructure</Text>

          <View style={styles.conceptWrapper}>
            <View style={styles.conceptBlock}>
              <Text style={styles.conceptGold}>Superstructure</Text>
              <Text style={styles.conceptDesc}>
                The building is designed on graded land with roughly 8m gradient west to east. It houses 8 levels of parking, an amenity floor and 1st to 17th floors of offices with terrace above having mechanical areas, elevator access for roof top recreational areas.
              </Text>
            </View>

            <View style={styles.conceptBlock}>
              <Text style={styles.conceptGold}>Tenant Office</Text>
              <Text style={styles.conceptDesc}>
                Tenant offices are located in 1st to 17th floor in both the towers T1 as well as T2.
              </Text>
            </View>

            <View style={styles.conceptBlock}>
              <Text style={styles.conceptGold}>Refuge Area</Text>
              <Text style={styles.conceptDesc}>
                Refuge areas are designed on 1st, 5th, 9th and 13th level, in compliance with Indian national code. Refuge areas are accessible from the road on South side.
              </Text>
            </View>

            <View style={styles.conceptBlock}>
              <Text style={styles.conceptGold}>Office Lobbies</Text>
              <Text style={styles.conceptDesc}>
                A public entrance hall is designed on Lower Ground level for T1 and Upper Ground floor for T2 accessible through drop off designed on South side of the site. Each tower has its own separate lobby.
              </Text>
            </View>
          </View>
        </ScrollView>
      </Animated.View>

      {/* ── 8. Mode Toggle Switch (Bottom Center) ── */}
      <View style={[styles.toggleNavbar, { bottom: 24 + insets.bottom }]}>
        <View style={styles.toggleCapsule}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setMode('sustainability')}
            style={[styles.toggleBtn, mode === 'sustainability' ? styles.activeToggle : styles.inactiveToggle]}
          >
            <Text style={[styles.toggleBtnText, mode === 'sustainability' ? styles.activeToggleText : styles.inactiveToggleText]}>
              Sustainability
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setMode('concept')}
            style={[styles.toggleBtn, mode === 'concept' ? styles.activeToggle : styles.inactiveToggle]}
          >
            <Text style={[styles.toggleBtnText, mode === 'concept' ? styles.activeToggleText : styles.inactiveToggleText]}>
              Concept Summary
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  videoView: {
    ...StyleSheet.absoluteFill,
  },
  videoOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  linesWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    zIndex: 10,
  },
  linesImg: {
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
    backgroundColor: '#FFEFA8',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
    zIndex: 100,
  },
  brandLogo: {
    position: 'absolute',
    top: 32,
    left: 32,
    width: 120,
    height: 50,
    zIndex: 100,
  },
  brandLogoImg: {
    width: '100%',
    height: '100%',
  },
  buildingContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 20,
  },
  buildingImg: {
    width: '100%',
    height: '100%',
  },
  rightContentPanel: {
    position: 'absolute',
    top: '12%',
    right: '6%',
    height: '70%',
    zIndex: 30,
  },
  leftContentPanel: {
    position: 'absolute',
    top: '12%',
    left: '6%',
    height: '70%',
    zIndex: 30,
  },
  scrollContent: {
    paddingVertical: 12,
  },
  panelTitle: {
    fontSize: 26,
    fontWeight: '300',
    color: '#ffffff',
    marginBottom: 20,
    letterSpacing: 1.5,
  },
  initiativesWrapper: {
    position: 'relative',
    gap: 20,
    paddingLeft: 12,
  },
  dashedLine: {
    position: 'absolute',
    left: 20,
    top: 10,
    bottom: 10,
    width: 1,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    borderStyle: 'dashed',
  },
  initiativeRow: {
    flexDirection: 'row',
    gap: 16,
  },
  bulletPoint: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFEFA8',
    marginTop: 6,
    zIndex: 10,
  },
  initiativeText: {
    flex: 1,
  },
  initiativeTitle: {
    fontSize: 14.5,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 6,
  },
  initiativeDesc: {
    fontSize: 11.5,
    color: '#D1D5DB',
    lineHeight: 16,
    fontWeight: '300',
  },
  conceptWrapper: {
    gap: 16,
  },
  conceptBlock: {
    gap: 4,
  },
  conceptGold: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFEFA8',
    textTransform: 'uppercase',
  },
  conceptDesc: {
    fontSize: 11.5,
    color: '#E5E7EB',
    lineHeight: 16,
    fontWeight: '300',
  },
  toggleNavbar: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 90,
  },
  toggleCapsule: {
    flexDirection: 'row',
    backgroundColor: 'rgba(26, 26, 26, 0.85)',
    borderRadius: 30,
    padding: 4,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  toggleBtn: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1,
  },
  activeToggle: {
    backgroundColor: '#FFEFA8',
    borderColor: '#FFEFA8',
  },
  inactiveToggle: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  toggleBtnText: {
    fontSize: 12,
  },
  activeToggleText: {
    color: '#000000',
    fontWeight: 'bold',
  },
  inactiveToggleText: {
    color: '#9CA3AF',
  },
});
