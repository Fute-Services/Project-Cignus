import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import Animated, { FadeInLeft, FadeInRight, FadeInUp, FadeOut } from 'react-native-reanimated';
import Svg, { Path, Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Shared Components
import LeftNavbar from '../components/LeftNavbar';
import RightNavbar from '../components/RightNavbar';

const bgImage = require('../../assets/Home/Project-Info.png');
const logo = require('../../assets/Home/cignus updated logo.png');
const logo2 = require('../../assets/Home/K_Raheja_Corp 1.png');
const imgTop = require('../../assets/Home/Project-Info-Img1.png');
const imgBottom = require('../../assets/Home/Project-Info-Img2.png');

const specifications = [
  { label: "BUILDING SIZE:", value: "1.11 Mn sq ft GFA" },
  { label: "EFFICIENCY:", value: "65 %" },
  { label: "USAGE:", value: "Grade A Commercial Office" },
  { label: "NUMBER OF ELEVATORS:", value: "16 Passenger • 2 Service • 4 Jump" },
  { label: "STRUCTURE:", value: "2 Basements + Ground + 6 Parking + 19 Office Floors" },
  { label: "HANDOVER CONDITION:", value: "Warm Shell • 100% DG backup • HVAC Type" },
  { label: "CAR PARK RATIO:", value: "1 per 1000 sq ft" },
  { label: "AMENITIES:", value: "Westin • Convention Centre • Marriott • Green terraces • EV charging" },
  { label: "TYPICAL FLOOR PLATE:", value: "~ 40,000 sq ft carpet area" },
  { label: "FLOOR TO CEILING:", value: "~ 4.2 m" },
  { label: "FACADE GLAZING:", value: "Double Glazing Units (DGU)" },
];

export default function Specification() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* 1. Background image layer */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <Image source={bgImage} style={styles.backgroundImage} contentFit="cover" />
        <View style={styles.overlay} />
      </View>

      {/* INITIAL LOGO TRANSITION */}
      {showLogo && (
        <Animated.View exiting={FadeOut.duration(800)} style={styles.initialLogoWrapper}>
          <Image source={logo} style={styles.initialLogo} contentFit="contain" />
        </Animated.View>
      )}

      {/* MAIN LAYOUT CONTENT */}
      {!showLogo && (
        <Animated.View style={StyleSheet.absoluteFill} entering={FadeInUp.duration(1000)}>
          {/* Side Navbars overlays */}
          <LeftNavbar />
          <RightNavbar />

          {/* Top Branding Logos */}
          <View style={[styles.topLeftLogo, { top: 24 + insets.top, left: 24 + insets.left }]}>
            <Image source={logo} style={styles.logo1Img} contentFit="contain" />
          </View>
          <View style={[styles.topRightLogo, { top: 24 + insets.top, right: 24 + insets.right }]}>
            <Image source={logo2} style={styles.logo2Img} contentFit="contain" />
          </View>

          {/* Header titles */}
          <View style={[styles.headerContainer, { top: 36 + insets.top, left: 120 + insets.left, right: 100 + insets.right }]}>
            <Text style={styles.pageTitle}>Building Specifications</Text>

            {/* Decorative gold lines with subtitle */}
            <View style={styles.subtitleRow}>
              <Svg width="140" height="8" viewBox="0 0 731 7" fill="none" style={styles.decorativeLine}>
                <Path d="M730 6C693.555 6 693.555 1 657.109 1C620.663 1 620.663 6 584.205 6C547.747 6 547.759 1 511.314 1C474.868 1 474.868 6 438.41 6C401.952 6 401.964 1 365.506 1C329.048 1 329.061 6 292.615 6C256.169 6 256.169 1 219.711 1C183.253 1 183.266 6 146.807 6C110.349 6 110.349 1 73.9039 1C37.4579 1 37.4453 6 1 6" stroke="url(#paint0_linear)" strokeWidth="3" strokeLinecap="round" />
                <Defs>
                  <LinearGradient id="paint0_linear" x1="730" y1="3.5" x2="451.5" y2="4.8" gradientUnits="userSpaceOnUse">
                    <Stop stopColor="#FFEFA8" />
                    <Stop offset="1" stopColor="#998F65" stopOpacity="0" />
                  </LinearGradient>
                </Defs>
              </Svg>
              
              <Text style={styles.subtitleText}>Every number that matters</Text>

              <Svg width="140" height="8" viewBox="0 0 731 7" fill="none" style={styles.decorativeLine}>
                <Path d="M1 1C37.4453 1 37.4453 6 73.8913 6C110.337 6 110.337 1 146.795 1C183.253 1 183.241 6 219.686 6C256.132 6 256.132 1 292.59 1C329.048 1 329.036 6 365.494 6C401.952 6 401.939 1 438.385 1C474.831 1 474.831 6 511.289 6C547.747 6 547.734 1 584.193 1C620.651 1 620.651 6 657.096 6C693.542 6 693.555 1 730 1" stroke="url(#paint1_linear)" strokeWidth="3" strokeLinecap="round" />
                <Defs>
                  <LinearGradient id="paint1_linear" x1="1" y1="3.5" x2="279.5" y2="2.1" gradientUnits="userSpaceOnUse">
                    <Stop stopColor="#FFEFA8" />
                    <Stop offset="1" stopColor="#998F65" stopOpacity="0" />
                  </LinearGradient>
                </Defs>
              </Svg>
            </View>
          </View>

          {/* Main content grid */}
          <View style={[styles.contentWrapper, { left: 120 + insets.left, right: 100 + insets.right, bottom: 100 + insets.bottom }]}>
            {/* Left Column: Round and capsule images */}
            <Animated.View entering={FadeInLeft.delay(200).duration(800)} style={styles.leftColumn}>
              <View style={styles.imageCardRound}>
                <Image source={imgTop} style={styles.imgFull} contentFit="cover" />
              </View>
              <View style={styles.imageCardCapsule}>
                <Image source={imgBottom} style={styles.imgFull} contentFit="cover" />
              </View>
            </Animated.View>

            {/* Right Column: Spec list */}
            <Animated.View entering={FadeInRight.delay(200).duration(800)} style={styles.rightColumn}>
              <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Bullet list of specs */}
                <View style={styles.specsBlock}>
                  {specifications.map((item, idx) => (
                    <View key={idx} style={styles.specRow}>
                      <View style={styles.bulletPoint}>
                        <Svg width="16" height="16" viewBox="0 0 30 30" fill="none">
                          <Circle cx="15" cy="15" r="14" stroke="#FFCF77" strokeWidth="1.5" />
                          <Path d="M10 15l4 4 8-8" stroke="#FFCF77" strokeWidth="2.5" strokeLinecap="round" />
                        </Svg>
                      </View>
                      <Text style={styles.specContent}>
                        <Text style={styles.specLabel}>{item.label} </Text>
                        <Text style={styles.specVal}>{item.value}</Text>
                      </Text>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </Animated.View>
          </View>

          {/* Bottom Left Back Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.replace('/project-info')}
            accessibilityRole="button"
            accessibilityLabel="Back"
            style={[styles.backButton, { bottom: 32 + insets.bottom, left: 120 + insets.left }]}
          >
            <Svg width="14" height="24" viewBox="0 0 17 28" fill="none">
              <Path d="M15.4143 27V14C15.4143 10.6863 12.728 8 9.41431 8H1.41431M7.41431 14L1.41431 8L8.41431 1" stroke="#483E2D" strokeWidth="2.5" strokeLinecap="round" />
            </Svg>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c0f12',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFill,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  initialLogoWrapper: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  initialLogo: {
    width: 200,
    height: 80,
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
    height: 50,
    zIndex: 90,
  },
  logo1Img: {
    width: '100%',
    height: '100%',
  },
  logo2Img: {
    width: '100%',
    height: '100%',
  },
  headerContainer: {
    position: 'absolute',
    top: 36,
    left: 120,
    right: 100,
    alignItems: 'center',
    zIndex: 90,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: '300',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 4,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    textAlign: 'center',
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 6,
  },
  decorativeLine: {
    opacity: 0.8,
  },
  subtitleText: {
    fontSize: 12,
    fontStyle: 'italic',
    fontWeight: '300',
    color: 'rgba(255, 255, 255, 0.7)',
    letterSpacing: 1,
  },
  contentWrapper: {
    position: 'absolute',
    top: 140, // Below header
    left: 120, // Clear LeftNavbar
    right: 100, // Clear RightNavbar
    bottom: 100, // Space for back button
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftColumn: {
    width: '32%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  imageCardRound: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  imageCardCapsule: {
    width: 150,
    height: 220,
    borderRadius: 75,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  imgFull: {
    width: '100%',
    height: '100%',
  },
  rightColumn: {
    width: '64%',
    height: '100%',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingVertical: 12,
    gap: 12,
  },
  specsBlock: {
    gap: 10,
  },
  specRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  bulletPoint: {
    marginTop: 1,
  },
  specContent: {
    flex: 1,
    lineHeight: 18,
  },
  specLabel: {
    fontSize: 10.5,
    color: '#FFCF77',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  specVal: {
    fontSize: 12.5,
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  backButton: {
    position: 'absolute',
    bottom: 32,
    left: 120, // Clear LeftNavbar
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
