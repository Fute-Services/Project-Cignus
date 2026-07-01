import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import Animated, { FadeInLeft, FadeInRight, FadeInUp, FadeOut } from 'react-native-reanimated';
import Svg, { Path, Circle } from 'react-native-svg';

// Shared Components
import LeftNavbar from '../components/LeftNavbar';
import RightNavbar from '../components/RightNavbar';

const bgImage = require('../../assets/Project_info/project_info_bg_img.png');
const leftImage = require('../../assets/Project_info/ProjectInfoimage.png');
const img1 = require('../../assets/Project_info/Projectinfo_left.png');
const img2 = require('../../assets/Project_info/Projectinfo_right.png');
const logo = require('../../assets/Home/cignus updated logo.png');
const logo2 = require('../../assets/Home/K_Raheja_Corp 1.png');

const specifications = [
  { label: "BUILDING SIZE:", value: "building, on this site, by this lake." },
  { label: "EFFICIENCY:", value: "Curved full-glass curtain wall" },
  { label: "USAGE:", value: "Green-terraced podium" },
  { label: "NUMBER OF ELEVATORS:", value: "Dedicated arrival court" },
  { label: "STRUCTURE:", value: "IGBC Platinum & WELL Gold target100% DG backup" },
];

export default function ProjectInfo() {
  const router = useRouter();
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
          <View style={styles.topLeftLogo}>
            <Image source={logo} style={styles.logoImg} contentFit="contain" />
          </View>
          <View style={styles.topRightLogo}>
            <Image source={logo2} style={styles.logo2Img} contentFit="contain" />
          </View>

          {/* Header Title */}
          <View style={styles.headerContainer}>
            <Text style={styles.pageTitle}>Design Philosophy</Text>
            <View style={styles.subheaderRow}>
              <Image source={img1} style={styles.subLogoImg} contentFit="contain" />
              <Text style={styles.subheaderText}>THE ARCHITECTURE</Text>
              <Image source={img2} style={styles.subLogoImg} contentFit="contain" />
            </View>
          </View>

          {/* Main content grid */}
          <View style={styles.contentWrapper}>
            {/* Left Column: Image Card */}
            <Animated.View entering={FadeInLeft.delay(200).duration(800)} style={styles.leftColumn}>
              <View style={styles.imageCard}>
                <Image source={leftImage} style={styles.towerImg} contentFit="cover" />
              </View>
            </Animated.View>

            {/* Right Column: Details & Specs */}
            <Animated.View entering={FadeInRight.delay(200).duration(800)} style={styles.rightColumn}>
              <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Subtext description rows */}
                <View style={styles.descBlock}>
                  <Text style={styles.descText}>Designed to disappear into its surroundings...</Text>
                  <Text style={styles.descText}>...and stand apart from everything else</Text>
                  <Text style={styles.descText}>
                    The curved glass façade wasn't a stylistic choice. It was a response to the site — to the way light moves off the lake, and the way the building needed to sit in its setting without competing with it. At different hours and from different angles, it looks like a completely different building.
                  </Text>
                  <Text style={[styles.descText, { fontWeight: '500', color: '#FFCF77' }]}>That's the point.</Text>
                  <Text style={styles.descText}>A tower that belongs here. Not transplanted from a business district. Just this</Text>
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
              </ScrollView>
            </Animated.View>
          </View>

          {/* Bottom Left Back Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.replace('/home')}
            style={styles.backButton}
          >
            <Svg width="14" height="24" viewBox="0 0 17 28" fill="none">
              <Path d="M15.4143 27V14C15.4143 10.6863 12.728 8 9.41431 8H1.41431M7.41431 14L1.41431 8L8.41431 1" stroke="#483E2D" strokeWidth="2.5" strokeLinecap="round" />
            </Svg>
          </TouchableOpacity>

          {/* Bottom Right Specification Redirect Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push('/specification')}
            style={styles.specBtn}
          >
            <Text style={styles.specBtnText}>Specifications</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
}

const { width, height } = Dimensions.get('window');

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
    top: 140, // Below header
    left: 120, // Clear LeftNavbar
    right: 100, // Clear RightNavbar
    bottom: 100, // Space for bottom buttons
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftColumn: {
    width: '45%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageCard: {
    width: '100%',
    height: '85%',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  towerImg: {
    width: '100%',
    height: '100%',
  },
  rightColumn: {
    width: '52%',
    height: '100%',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingVertical: 12,
    gap: 12,
  },
  descBlock: {
    gap: 8,
    marginBottom: 8,
  },
  descText: {
    fontSize: 12.5,
    color: 'rgba(255, 255, 255, 0.75)',
    fontWeight: '300',
    lineHeight: 18,
  },
  specsBlock: {
    gap: 10,
    borderTopWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    paddingTop: 14,
  },
  specRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  bulletPoint: {
    marginTop: 2,
  },
  specTexts: {
    flex: 1,
  },
  specLabel: {
    fontSize: 9.5,
    fontWeight: '700',
    color: '#FFCF77',
    letterSpacing: 0.5,
  },
  specVal: {
    fontSize: 12,
    color: '#ffffff',
    marginTop: 1,
    lineHeight: 16,
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
  specBtn: {
    position: 'absolute',
    bottom: 32,
    right: 100, // Clear RightNavbar
    backgroundColor: '#FFEFA8',
    borderRadius: 22,
    paddingHorizontal: 24,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
    zIndex: 100,
  },
  specBtnText: {
    fontSize: 12.5,
    fontWeight: 'bold',
    color: '#000000',
    letterSpacing: 0.5,
  },
});
