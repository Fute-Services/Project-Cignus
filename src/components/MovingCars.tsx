import React, { useMemo } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
  withSequence,
  interpolate,
  Easing,
} from 'react-native-reanimated';

// The home background image (night-aerial-view1.jpeg) is rendered with
// contentFit="cover", so car paths are defined in normalized image space
// (0..1 of the 16:9 image) and projected to screen space with the same
// cover-crop math to stay glued to the roads on any screen size.
const IMG_ASPECT = 5120 / 2880;

// Waypoints traced along the lit roads in the render (normalized x, y).
// MAIN_ROAD follows the streetlight chain winding down from the top-right
// corner to the campus entrance beside the right building cluster.
const MAIN_ROAD: [number, number][] = [
  [0.8450, 0.020],
  [0.8000, 0.084],
  [0.7600, 0.138],
  [0.7380, 0.182],
  [0.7220, 0.227],
  [0.7100, 0.271],
  [0.7000, 0.318],
  [0.6810, 0.364],
  [0.6660, 0.409],
  [0.6550, 0.443],
];

// LEFT_ROAD follows the lit road along the left edge of the campus
const LEFT_ROAD: [number, number][] = [
  [0.0075, 0.265],
  [0.0600, 0.269],
  [0.1200, 0.267],
  [0.1700, 0.256],
  [0.2100, 0.242],
];

type CarProps = {
  points: { x: number; y: number }[];
  duration: number;
  delay: number;
  reverse?: boolean;
  size?: number;
};

function Car({ points, duration, delay, reverse = false, size = 5 }: CarProps) {
  const progress = useSharedValue(0);

  const path = useMemo(() => {
    const pts = reverse ? [...points].reverse() : points;
    // Cumulative arc length so the car moves at constant speed
    const dists = [0];
    for (let i = 1; i < pts.length; i++) {
      const dx = pts[i].x - pts[i - 1].x;
      const dy = pts[i].y - pts[i - 1].y;
      dists.push(dists[i - 1] + Math.hypot(dx, dy));
    }
    const total = dists[dists.length - 1] || 1;
    return {
      stops: dists.map((d) => d / total),
      xs: pts.map((p) => p.x),
      ys: pts.map((p) => p.y),
    };
  }, [points, reverse]);

  React.useEffect(() => {
    progress.value = 0;
    progress.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration, easing: Easing.linear }),
          withTiming(0, { duration: 0 })
        ),
        -1
      )
    );
  }, [duration, delay, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    // Offset by half the glow size so the light sits centred on the road
    transform: [
      { translateX: interpolate(progress.value, path.stops, path.xs) - size * 1.5 },
      { translateY: interpolate(progress.value, path.stops, path.ys) - size * 1.5 },
    ],
    opacity: interpolate(progress.value, [0, 0.06, 0.94, 1], [0, 1, 1, 0]),
  }));

  return (
    <Animated.View style={[styles.car, animatedStyle]} pointerEvents="none">
      {/* Outer headlight glow */}
      <View
        style={[
          styles.glow,
          { width: size * 3, height: size * 3, borderRadius: size * 1.5 },
        ]}
      />
      {/* Bright core */}
      <View
        style={[
          styles.core,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            top: size,
            left: size,
          },
        ]}
      />
    </Animated.View>
  );
}

export default function MovingCars() {
  const { width, height } = useWindowDimensions();

  // Replicate contentFit="cover" for the 16:9 background image
  const { toScreen } = useMemo(() => {
    const screenAspect = width / height;
    const dispW = screenAspect > IMG_ASPECT ? width : height * IMG_ASPECT;
    const dispH = screenAspect > IMG_ASPECT ? width / IMG_ASPECT : height;
    const offX = (width - dispW) / 2;
    const offY = (height - dispH) / 2;
    return {
      toScreen: (pts: [number, number][]) =>
        pts.map(([nx, ny]) => ({ x: offX + nx * dispW, y: offY + ny * dispH })),
    };
  }, [width, height]);

  const mainRoad = useMemo(() => toScreen(MAIN_ROAD), [toScreen]);
  const leftRoad = useMemo(() => toScreen(LEFT_ROAD), [toScreen]);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {/* Main winding road (top-center to mid-right) */}
      <Car points={mainRoad} duration={22000} delay={0} />
      <Car points={mainRoad} duration={26000} delay={9000} />
      <Car points={mainRoad} duration={24000} delay={4000} reverse />
      {/* Left lakeside road */}
      <Car points={leftRoad} duration={16000} delay={2000} size={4} />
      <Car points={leftRoad} duration={18000} delay={10000} reverse size={4} />
    </View>
  );
}

const styles = StyleSheet.create({
  car: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  glow: {
    backgroundColor: 'rgba(255, 214, 120, 0.30)',
  },
  core: {
    position: 'absolute',
    backgroundColor: '#FFF3C4',
  },
});
