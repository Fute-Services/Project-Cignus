import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Image } from 'expo-image';
import { usePathname, useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../theme';

const infoIcon = require('../../assets/Home/icons/project_inco_icon.svg');
const progressIcon = require('../../assets/Home/icons/construction_icon.svg');
const videoIcon = require('../../assets/Home/icons/walkthrogh.svg');
const galleryIcon = require('../../assets/Home/icons/gallery.svg');
const circulationIcon = require('../../assets/Home/icons/Circulation.svg');
const droneviewIcon = require('../../assets/Home/icons/Droneview.png');

const navItems = [
  { path: '/circulation', label: 'Circulation', icon: circulationIcon },
  { path: '/project-info', label: 'Project Info', icon: infoIcon },
  { path: '/construction', label: 'Construction\nProgress', icon: progressIcon },
  { path: '/walkthrough', label: 'Walkthrough', icon: videoIcon },
  { path: '/gallery', label: 'Gallery', icon: galleryIcon },
  { path: '/droneview', label: 'Drone View', icon: droneviewIcon },
];

export default function RightNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  return (
    <Animated.View entering={FadeInRight.duration(800).delay(300).springify()} style={[styles.container, { right: 16 + insets.right }]}>
      <BlurView intensity={20} tint="dark" style={styles.blurContainer}>
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <TouchableOpacity
              key={item.path}
              activeOpacity={0.7}
              onPress={() => router.push(item.path as any)}
              accessibilityRole="button"
              accessibilityLabel={item.label.replace('\n', ' ')}
              accessibilityState={{ selected: isActive }}
              style={styles.navLink}
            >
              <View style={[styles.circle, isActive ? styles.goldenCircle : styles.darkCircle]}>
                <Image
                  source={item.icon}
                  style={styles.icon}
                  contentFit="contain"
                  tintColor={isActive ? '#000000' : '#ffffff'}
                />
              </View>
              <Text style={styles.label}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </BlurView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 16,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    width: 68,
    zIndex: 100,
  },
  blurWrapper: {
    borderRadius: 44,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.glassBorder,
  },
  blurContainer: {
    width: '100%',
    paddingVertical: 14,
    alignItems: 'center',
    gap: 8,
    backgroundColor: theme.colors.glassmorphism,
  },
  navLink: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 4,
  },
  circle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  darkCircle: {
    backgroundColor: 'rgba(30, 32, 24, 0.8)',
  },
  goldenCircle: {
    backgroundColor: theme.colors.gold.DEFAULT,
    shadowColor: theme.colors.gold.DEFAULT,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  icon: {
    width: 20,
    height: 20,
  },
  label: {
    fontFamily: theme.fonts.outfit.medium,
    fontSize: 8,
    color: '#ffffff',
    marginTop: 3,
    textAlign: 'center',
    lineHeight: 11,
  },
});
