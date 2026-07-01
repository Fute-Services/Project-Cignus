import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';

const leftLogo = require('../../assets/Home/cignus updated logo.png');
const rightLogo = require('../../assets/Home/K_Raheja_Corp 1.png');

export default function Header() {
  return (
    <View style={styles.header} pointerEvents="box-none">
      {/* Left Logo (Cignus) */}
      <Animated.View entering={FadeInDown.duration(800).delay(100).springify()} style={styles.logoWrapper}>
        <Image
          source={leftLogo}
          style={styles.leftLogoImg}
          contentFit="contain"
        />
      </Animated.View>

      {/* Right Logo (K Raheja) */}
      <Animated.View entering={FadeIn.duration(800).delay(200)} style={styles.rightLogoWrapper}>
        <Image
          source={rightLogo}
          style={styles.rightLogoImg}
          contentFit="contain"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 40,
    paddingTop: 24,
    zIndex: 90,
  },
  logoWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftLogoImg: {
    height: 60,
    width: 160,
  },
  rightLogoWrapper: {
    marginRight: 10,
    marginTop: 5,
  },
  rightLogoImg: {
    height: 90,
    width: 175,
  },
});
