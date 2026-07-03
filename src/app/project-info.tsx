import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import Animated, { FadeInLeft, FadeInRight, FadeInUp, FadeOut } from 'react-native-reanimated';
import Svg, { Path, Circle } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Shared Components
import LeftNavbar from '../components/LeftNavbar';
import RightNavbar from '../components/RightNavbar';
import { safeNavigate } from '../utils/safeNavigate';

const bgImage = require('../../assets/project-info/project-info-bg-img.png');
const leftImage = require('../../assets/overview/overview-projectinfo.jpg');
const img1 = require('../../assets/project-info/projectinfo-left.png');
const img2 = require('../../assets/project-info/projectinfo-right.png');
const logo = require('../../assets/home/cignus-updated-logo.png');
const logo2 = require('../../assets/home/k-raheja-corp-1.png');

const specifications = [
  { label: "SITE & ARCHITECTURE", value: "Landmark building located directly by the lake" },
  { label: "FACADE DESIGN", value: "Curved full-glass curtain wall" },
  { label: "PODIUM SPACE", value: "Lush green-terraced podium levels" },
  { label: "ARRIVAL EXPERIENCE", value: "Dedicated arrival court and grand entry" },
  { label: "CERTIFICATIONS & POWER", value: "IGBC Platinum & WELL Gold target • 100% DG backup" },
];

export default function ProjectInfo() {
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

          {/* Top Branding Badges */}
          <View style={[styles.topLeftLogo, { top: 24 + insets.top, left: 24 + insets.left }]}>
            <Image source={logo} style={styles.logoImg} contentFit="contain" />
          </View>
          <View style={[styles.topRightLogo, { top: 24 + insets.top, right: 24 + insets.right }]}>
            <Image source={logo2} style={styles.logo2Img} contentFit="contain" />
          </View>

          {/* Header Title */}
          <View style={[styles.headerContainer, { top: 36 + insets.top, left: 120 + insets.left, right: 100 + insets.right }]}>
            <Text style={styles.pageTitle}>Design Philosophy</Text>
            <View style={styles.subheaderRow}>
              <Image source={img1} style={styles.subLogoImg} contentFit="contain" />
              <Text style={styles.subheaderText}>THE ARCHITECTURE</Text>
              <Image source={img2} style={styles.subLogoImg} contentFit="contain" />
            </View>
          </View>

          {/* Main content grid */}
          <View style={[styles.contentWrapper, { left: 125 + insets.left, right: 105 + insets.right, bottom: 100 + insets.bottom }]}>
            {/* Left Column: Image Card */}
            <Animated.View entering={FadeInLeft.delay(200).duration(800)} style={styles.leftColumn}>
              <View style={styles.imageCard}>
                {/* Blurred cover fill so the tall card has no empty space... */}
                <Image source={leftImage} style={StyleSheet.absoluteFill} contentFit="cover" blurRadius={18} />
                <View style={styles.imageCardScrim} />
                {/* ...while the full building render is shown sharp and un-cropped on top */}
                <Image source={leftImage} style={styles.towerImg} contentFit="contain" />
              </View>
            </Animated.View>

            {/* Right Column: Details & Specs */}
            <Animated.View entering={FadeInRight.delay(200).duration(800)} style={styles.rightColumn}>
              <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Subtext description rows */}
                <View style={styles.descBlock}>
                  <Text style={styles.descQuote}>
                    &quot;Designed to disappear into its surroundings... and stand apart from everything else.&quot;
                  </Text>
                  <Text style={styles.descText}>
                    The curved glass façade wasn&apos;t a stylistic choice. It was a response to the site, to the way light moves off the lake, and the way the building needed to sit in its setting without competing with it. At different hours and from different angles, it looks like a completely different building.
                  </Text>
                  <Text style={styles.descTextEmphasis}>
                    That&apos;s the point. A tower that belongs here, not transplanted from a business district.
                  </Text>
                </View>

                {/* Specifications item checklist */}
                <View style={styles.specsBlock}>
                  {specifications.map((item, idx) => (
                    <View key={idx} style={styles.specRow}>
                      <View style={styles.bulletPoint}>
                        <Svg width="18" height="18" viewBox="0 0 30 30" fill="none">
                          <Circle cx="15" cy="15" r="14" stroke="#FFCF77" strokeWidth="1.5" />
                          <Path d="M10 15l4 4 8-8" stroke="#FFCF77" strokeWidth="2.5" strokeLinecap="round" />
                        </Svg>
                      </View>
                      <View style={styles.specTexts}>
                        <Text style={styles.specLabel}>{item.label}</Text>
                        <Text style={styles.specVal}>{item.value}</Text>
                      </View>
                    </View>
                  ))}
                </View>

                {/* Redirect Button */}
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => safeNavigate(router, '/specification')}
                  accessibilityRole="button"
                  accessibilityLabel="View specifications"
                  style={styles.specBtnInline}
                >
                  <Text style={styles.specBtnTextInline}>Specifications</Text>
                </TouchableOpacity>
              </ScrollView>
            </Animated.View>
          </View>

          {/* Bottom Left Back Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.replace('/home')}
            accessibilityRole="button"
            accessibilityLabel="Back to home"
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
  logoImg: {
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
  subheaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 6,
  },
  subLogoImg: {
    width: 24,
    height: 24,
  },
  subheaderText: {
    fontSize: 12,
    fontWeight: '300',
    color: 'rgba(255, 255, 255, 0.7)',
    letterSpacing: 2,
  },
  contentWrapper: {
    position: 'absolute',
    top: 130, // Below header
    left: 125, // Clear LeftNavbar
    right: 105, // Clear RightNavbar
    bottom: 100, // Space for bottom buttons
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    gap: 32,
  },
  leftColumn: {
    flex: 1,
    justifyContent: 'center',
  },
  imageCard: {
    width: '100%',
    height: '92%',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    backgroundColor: '#16191c',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  imageCardScrim: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(12, 15, 18, 0.35)',
  },
  towerImg: {
    width: '100%',
    height: '100%',
  },
  rightColumn: {
    flex: 1.25,
    justifyContent: 'center',
  },
  scrollContent: {
    paddingVertical: 8,
  },
  descBlock: {
    gap: 10,
    marginBottom: 16,
  },
  descQuote: {
    fontSize: 14.5,
    fontWeight: '300',
    color: '#FFCF77',
    fontStyle: 'italic',
    lineHeight: 20,
    letterSpacing: 0.5,
  },
  descText: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '300',
    lineHeight: 19,
  },
  descTextEmphasis: {
    fontSize: 13,
    color: '#FFCF77',
    fontWeight: '500',
    lineHeight: 19,
  },
  specsBlock: {
    gap: 0,
    borderTopWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    paddingTop: 14,
  },
  specRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 8,
    gap: 12,
  },
  bulletPoint: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  specTexts: {
    flex: 1,
    gap: 2,
  },
  specLabel: {
    fontSize: 9.5,
    fontWeight: '700',
    color: '#FFCF77',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  specVal: {
    fontSize: 12.5,
    color: '#ffffff',
    fontWeight: '400',
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
  specBtnInline: {
    backgroundColor: '#FFEFA8',
    borderRadius: 26,
    paddingHorizontal: 40,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
    alignSelf: 'center',
  },
  specBtnTextInline: {
    fontSize: 13.5,
    fontWeight: 'bold',
    color: '#000000',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
