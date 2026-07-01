import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Svg, { Polygon, Path } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
  FadeIn,
  FadeOut
} from 'react-native-reanimated';

// Data & Assets
import { floors } from '../../data/FloorData';
import LeftNavbar from '../../components/LeftNavbar';

const { width, height } = Dimensions.get('window');

const bgImage = require('../../../assets/intial/bg_img.png');
const logoImg = require('../../../assets/Home/cignus updated logo.png');
const unitPlan2D = require('../../../assets/Project_info/ProjectInfoimage.png');
const floorGround = require('../../../assets/Project_Details/bg-image.png');

// Fallback image mapping
const floorImageMap: Record<string, any> = {
  'ground': floorGround,
  '1': floorGround,
  '2': floorGround,
};

export default function UnitPlanPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  // Find the selected floor
  const selectedFloor = floors.find(
    (floor: any) => floor.id === Number(id) || floor.floorname === id
  );

  const [showLogo, setShowLogo] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);
  const [activeAreaId, setActiveAreaId] = useState<number | null>(null);

  // Reanimated shared values for zoom & slide transition
  const centerScale = useSharedValue(0.75);
  const mainContentY = useSharedValue(height);
  const leftNavX = useSharedValue(-100);
  const leftNavOpacity = useSharedValue(0);

  // Logo animation timing
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(false);
      
      // Main content slides up, navbars fade in
      mainContentY.value = withTiming(0, { duration: 1000, easing: Easing.bezier(0.25, 1, 0.5, 1) });
      leftNavX.value = withDelay(400, withTiming(0, { duration: 800, easing: Easing.out(Easing.ease) }));
      leftNavOpacity.value = withDelay(400, withTiming(1, { duration: 800 }));
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Update scale when zoom changes
  useEffect(() => {
    centerScale.value = withTiming(isZoomed ? 0.9 : 0.75, { duration: 400 });
  }, [isZoomed]);

  // Reset active area when floor changes
  useEffect(() => {
    setActiveAreaId(null);
  }, [id]);

  if (!selectedFloor) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Floor blueprint not found</Text>
        <TouchableOpacity onPress={() => router.push('/project-details')} style={styles.closeBtn}>
          <Text style={styles.closeBtnText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const currentFloorNum = selectedFloor.name;
  const isGround = currentFloorNum.toLowerCase().includes('ground');
  const numericFloorValue = parseInt(typeof id === 'string' ? id : '1', 10);
  const ordinal = (isGround || isNaN(numericFloorValue)) ? '' : getOrdinal(numericFloorValue);

  // Blueprint resources
  const currentFloor3DImage = selectedFloor.unitplan?.image_3d || floorImageMap[String(id)] || floorGround;
  const layoutAreas = selectedFloor.unitplan?.sideContent || [];
  const selectedAreaObj = layoutAreas.find((area: any) => area.id === activeAreaId);

  // Animated styles
  const centerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: centerScale.value }],
  }));

  const mainContentAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: mainContentY.value }],
  }));

  const leftNavAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: leftNavX.value }],
    opacity: leftNavOpacity.value,
  }));

  return (
    <View style={styles.container}>
      {/* Background Graphic */}
      <Image source={bgImage} style={styles.backgroundImage} contentFit="cover" pointerEvents="none" />

      {/* INITIAL LOGO TRANSITION */}
      {showLogo && (
        <Animated.View exiting={FadeOut.duration(800)} style={styles.initialLogoWrapper}>
          <Image source={logoImg} style={styles.initialLogo} contentFit="contain" />
        </Animated.View>
      )}

      {/* MAIN LAYOUT CONTENT */}
      {!showLogo && (
        <Animated.View style={[StyleSheet.absoluteFill, mainContentAnimatedStyle]}>
          {/* Top Left logo badge */}
          <View style={styles.topLeftLogo}>
            <Image source={logoImg} style={styles.logoImg} contentFit="contain" />
          </View>

          {/* Left Navbar Overlay */}
          <Animated.View style={[styles.leftNavOverlay, leftNavAnimatedStyle]}>
            <LeftNavbar />
          </Animated.View>

          {/* ── 3D Blueprint Interactive Canvas ── */}
          <Animated.View style={[styles.blueprintContainer, centerAnimatedStyle]}>
            {/* Ghost layout helper image */}
            <Image source={unitPlan2D} style={styles.ghostImage} contentFit="contain" pointerEvents="none" />

            <View style={styles.blueprintWrapper}>
              <Image source={currentFloor3DImage} style={styles.floorBlueprint} contentFit="contain" />

              {/* Svg polygon highlight overlay */}
              <Svg
                viewBox="0 0 1484 1050"
                style={StyleSheet.absoluteFill}
                pointerEvents="none"
              >
                {selectedAreaObj && (
                  Array.isArray(selectedAreaObj.polygons) ? (
                    selectedAreaObj.polygons.map((polyItem: any, idx: number) => (
                      <Polygon
                        key={polyItem.id ? `${polyItem.id}_${idx}` : idx}
                        points={polyItem.polygon}
                        fill="rgba(212, 175, 55, 0.35)"
                        stroke="#d4af37"
                        strokeWidth="2.5"
                      />
                    ))
                  ) : (
                    (selectedAreaObj as any).polygon && (
                      <Polygon
                        points={(selectedAreaObj as any).polygon}
                        fill="rgba(212, 175, 55, 0.35)"
                        stroke="#d4af37"
                        strokeWidth="2.5"
                      />
                    )
                  )
                )}
              </Svg>
            </View>
          </Animated.View>

          {/* ── Right layout selection panel ── */}
          <View style={styles.rightPanel}>
            <View style={styles.floorHeader}>
              <Text style={styles.floorHeaderText}>
                <Text style={styles.goldText}>{currentFloorNum}</Text>
                {ordinal && <Text style={styles.ordinalText}>{ordinal}</Text>}{' '}
                Floor
              </Text>
            </View>

            <ScrollView contentContainerStyle={styles.areaList} showsVerticalScrollIndicator={true}>
              {layoutAreas.map((area: any) => {
                const isActive = activeAreaId === area.id;
                return (
                  <TouchableOpacity
                    key={area.id}
                    activeOpacity={0.8}
                    onPress={() => setActiveAreaId(isActive ? null : area.id)}
                    style={[styles.areaBtn, isActive && styles.activeAreaBtn]}
                  >
                    <Text style={[styles.areaBtnText, isActive && styles.activeAreaBtnText]}>
                      {area.title}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* ── Zoom Controls (Bottom Right) ── */}
          <View style={styles.zoomControls}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setIsZoomed(false)}
              style={styles.zoomBtn}
            >
              <Text style={styles.zoomText}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setIsZoomed(true)}
              style={styles.zoomBtn}
            >
              <Text style={styles.zoomText}>+</Text>
            </TouchableOpacity>
          </View>

          {/* ── Back Button (Bottom Left) ── */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push('/project-details')}
            style={styles.backButton}
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

// Suffix function (1st, 2nd, 3rd...)
function getOrdinal(n: number) {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFill,
  },
  initialLogoWrapper: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  initialLogo: {
    width: 260,
    height: 100,
  },
  topLeftLogo: {
    position: 'absolute',
    top: 24,
    left: 24,
    width: 120,
    height: 50,
    zIndex: 90,
  },
  logoImg: {
    width: '100%',
    height: '100%',
  },
  leftNavOverlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 100,
    justifyContent: 'center',
    zIndex: 80,
  },
  blueprintContainer: {
    position: 'absolute',
    left: 120,
    top: 60,
    width: width - 380,
    height: height - 120,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  ghostImage: {
    width: '100%',
    height: '100%',
    opacity: 0,
  },
  blueprintWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  floorBlueprint: {
    width: '100%',
    height: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  rightPanel: {
    position: 'absolute',
    right: '4%',
    top: '12%',
    width: 220,
    backgroundColor: 'rgba(10, 10, 12, 0.45)',
    borderLeftWidth: 4,
    borderColor: '#d4af37',
    paddingVertical: 12,
    zIndex: 80,
  },
  floorHeader: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  floorHeaderText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 1,
  },
  goldText: {
    color: '#d4af37',
    fontWeight: '700',
  },
  ordinalText: {
    fontSize: 10,
    color: '#d4af37',
  },
  areaList: {
    paddingTop: 8,
    gap: 4,
  },
  areaBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  activeAreaBtn: {
    backgroundColor: 'rgba(186, 155, 102, 0.35)',
  },
  areaBtnText: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.65)',
    fontWeight: '400',
  },
  activeAreaBtnText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  zoomControls: {
    position: 'absolute',
    right: '6%',
    bottom: '10%',
    flexDirection: 'row',
    gap: 16,
    zIndex: 80,
  },
  zoomBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  zoomText: {
    fontSize: 22,
    color: '#FFCF77',
    fontWeight: 'bold',
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
  errorContainer: {
    flex: 1,
    backgroundColor: '#0c0f12',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  errorText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeBtn: {
    backgroundColor: '#FFCF77',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  closeBtnText: {
    color: '#5D4037',
    fontWeight: 'bold',
  },
});
