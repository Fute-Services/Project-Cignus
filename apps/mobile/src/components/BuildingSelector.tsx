import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Polygon, Defs, LinearGradient, Stop } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedProps,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

import { VIEWBOX_W, VIEWBOX_H, type FloorData } from '../data/FloorData';
import { safeNavigate } from '../utils/safeNavigate';

const buildingImage = require('../../assets/project-details/project-details.webp');

const AnimatedPolygon = Animated.createAnimatedComponent(Polygon);

interface FloorPolygonProps {
  floor: FloorData;
  isActive: boolean;
  onPress: () => void;
}

function FloorPolygon({ floor, isActive, onPress }: FloorPolygonProps) {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(isActive ? 1 : 0, { duration: 300 });
  }, [isActive]);

  const animatedProps = useAnimatedProps(() => ({
    opacity: opacity.value,
  }));

  return (
    <>
      {/* Invisible polygon for instant & reliable touch detection */}
      <Polygon
        points={floor.points}
        fill="transparent"
        onPress={onPress}
      />
      {/* Smoothly animated visual highlight overlay */}
      <AnimatedPolygon
        points={floor.points}
        fill={`url(#${floor.gradientId})`}
        stroke="#F5A623"
        strokeWidth={1.5}
        animatedProps={animatedProps}
        pointerEvents="none"
      />
    </>
  );
}

interface BuildingSelectorProps {
  floors: FloorData[];
  hoveredFloor: FloorData | null;
  setHoveredFloor: React.Dispatch<React.SetStateAction<FloorData | null>>;
}

export default function BuildingSelector({
  floors,
  hoveredFloor,
  setHoveredFloor,
}: BuildingSelectorProps) {
  const router = useRouter();

  // Deduplicate gradient IDs to prevent duplicate React key warnings and SVG ID collisions
  const uniqueGradientIds = React.useMemo(() => {
    return Array.from(new Set(floors.map((f) => f.gradientId)));
  }, [floors]);

  // Keep track of the active floor for the tooltip content separately so it doesn't instantly vanish on fade-out
  const [activeTooltipFloor, setActiveTooltipFloor] = useState<FloorData | null>(null);

  // Animated values for the tooltip position and opacity
  const tooltipOpacity = useSharedValue(0);
  const tooltipX = useSharedValue(0);
  const tooltipY = useSharedValue(0);

  // Convert SVG coordinate points to absolute percentage values for placing the tooltip
  const getPercentCoords = useCallback((svgX: number, svgY: number) => {
    return {
      x: (svgX / VIEWBOX_W) * 100,
      y: (svgY / VIEWBOX_H) * 100,
    };
  }, []);

  useEffect(() => {
    if (hoveredFloor) {
      // Persist the hovered floor as tooltip content so it stays visible through
      // the fade-out animation below (cleared via runOnJS once fade completes).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveTooltipFloor(hoveredFloor);
      const { x, y } = getPercentCoords(hoveredFloor.anchorX, hoveredFloor.anchorY);
      
      // Slide and fade in the tooltip smoothly
      tooltipX.value = withTiming(x, { duration: 300 });
      tooltipY.value = withTiming(y, { duration: 300 });
      tooltipOpacity.value = withTiming(1, { duration: 250 });
    } else {
      // Fade out the tooltip smoothly
      tooltipOpacity.value = withTiming(0, { duration: 200 }, () => {
        runOnJS(setActiveTooltipFloor)(null);
      });
    }
  }, [hoveredFloor, getPercentCoords]);

  const handleFloorPress = (floor: FloorData) => {
    if (hoveredFloor?.id === floor.id) {
      safeNavigate(router, `/unitplan/${floor.id}`);
    } else {
      setHoveredFloor(floor);
    }
  };

  const tooltipAnimatedStyle = useAnimatedStyle(() => ({
    opacity: tooltipOpacity.value,
    left: `${tooltipX.value}%`,
    top: `${tooltipY.value}%`,
  }));

  return (
    <View style={styles.container}>
      {/* ── Building Image Background ── */}
      <ImageBackground
        source={buildingImage}
        style={styles.imageBg}
        resizeMode="contain"
      >
        {/* ── Interactive SVG layer ── */}
        <Svg
          viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
          style={StyleSheet.absoluteFill}
        >
          <Defs>
            {uniqueGradientIds.map((gradientId) => (
              <LinearGradient
                key={gradientId}
                id={gradientId}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <Stop offset="0%" stopColor="#D4830A" stopOpacity="0.15" />
                <Stop offset="45%" stopColor="#F5A623" stopOpacity="0.30" />
                <Stop offset="50%" stopColor="#F5A623" stopOpacity="0.45" />
                <Stop offset="68%" stopColor="#E8941A" stopOpacity="0.55" />
                <Stop offset="100%" stopColor="#C47A10" stopOpacity="0.75" />
              </LinearGradient>
            ))}
          </Defs>

          {floors.map((floor) => (
            <FloorPolygon
              key={floor.id}
              floor={floor}
              isActive={hoveredFloor?.id === floor.id}
              onPress={() => handleFloorPress(floor)}
            />
          ))}
        </Svg>

        {/* ── Tooltip Card Overlay ── */}
        {activeTooltipFloor && (
          <Animated.View style={[styles.tooltipContainer, tooltipAnimatedStyle]}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => safeNavigate(router, `/unitplan/${activeTooltipFloor.id}`)}
              accessibilityRole="button"
              accessibilityLabel={`View floor ${activeTooltipFloor.name} unit plan, ${activeTooltipFloor.area}`}
              style={styles.tooltipTouchable}
            >
              {/* Left-pointing Arrow Pointer */}
              <View style={styles.arrowPointer} />

              {/* Glassmorphism Card Container */}
              <View style={styles.tooltipCard}>
                <Text style={styles.tooltipName}>
                  {activeTooltipFloor.name}
                </Text>
                <Text style={styles.tooltipArea}>
                  {activeTooltipFloor.area}
                </Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        )}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
    backgroundColor: '#000000',
    aspectRatio: VIEWBOX_W / VIEWBOX_H,
  },
  imageBg: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  tooltipContainer: {
    position: 'absolute',
    zIndex: 90,
  },
  tooltipTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    transform: [{ translateY: -28 }], // Offset tooltip center
  },
  arrowPointer: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 8,
    borderBottomWidth: 8,
    borderRightWidth: 12,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: 'rgba(245, 195, 105, 0.75)',
    marginRight: -1,
  },
  tooltipCard: {
    backgroundColor: 'rgba(10, 10, 12, 0.85)',
    borderColor: 'rgba(245, 166, 35, 0.5)',
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    minWidth: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  tooltipName: {
    fontSize: 9,
    fontWeight: '500',
    color: '#ffffff',
    opacity: 0.8,
  },
  tooltipArea: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 1,
  },
});
