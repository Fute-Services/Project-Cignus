import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Image } from 'expo-image';
import { usePathname, useRouter } from 'expo-router';
import Svg, { Path } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const homeIcon = require('../../assets/Home/icons/home.icon.svg');
const amenitiesIcon = require('../../assets/Home/icons/amenities_icon.svg');
const detailsIcon = require('../../assets/Home/icons/Project_dteails_icon.png');
const vrIcon = require('../../assets/Home/icons/Vr_icon.svg');
const brochureIcon = require('../../assets/Home/icons/Brocher_icon1 (2).png');

// Custom MapPin SVG component
const MapPinIcon = ({ color }: { color: string }) => (
  <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <Path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
  </Svg>
);

type NavItem = {
  key: string;
  path: string;
  label: string;
  icon: any;
  isCustom: boolean;
  iconSize?: { width: number; height: number };
};

const navItems: NavItem[] = [
  { key: 'home', path: '/home', label: 'Master\nPlan', icon: homeIcon, isCustom: true, iconSize: { width: 18, height: 18 } },
  { key: 'location', path: '/location', label: 'Location', icon: MapPinIcon, isCustom: false },
  { key: 'amenities', path: '/amenities', label: 'Amenities', icon: amenitiesIcon, isCustom: true, iconSize: { width: 22, height: 22 } },
  { key: 'project-details', path: '/project-details', label: 'Project\nDetails', icon: detailsIcon, isCustom: true, iconSize: { width: 18, height: 18 } },
  { key: 'vr', path: '/vr', label: 'VR', icon: vrIcon, isCustom: true, iconSize: { width: 18, height: 18 } },
];

const brochureItem: NavItem = { key: 'brochure', path: '/brochure', label: 'Brochure', icon: brochureIcon, isCustom: true, iconSize: { width: 17, height: 23 } };

export default function LeftNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const renderLink = (item: NavItem, isBrochure = false) => {
    const isActive = pathname === item.path;
    const isThemeActive = isActive; // In RN, no touch hover usually, active only.

    const activeText = '#5D4037';
    const inactiveText = '#ffffff';

    return (
      <TouchableOpacity
        key={item.key || item.path}
        activeOpacity={0.7}
        onPress={() => router.push(item.path as any)}
        accessibilityRole="button"
        accessibilityLabel={item.label.replace('\n', ' ')}
        accessibilityState={{ selected: isThemeActive }}
        style={[
          styles.navLink,
          isBrochure ? styles.brochureLink : styles.standardLink,
          isThemeActive ? styles.activeBg : styles.inactiveBg
        ]}
      >
        <View style={[styles.iconWrapper, isThemeActive ? styles.activeIconWrapper : styles.inactiveIconWrapper]}>
          {item.isCustom ? (
            <Image
              source={item.icon}
              style={[
                item.iconSize || { width: 18, height: 18 },
                {
                  tintColor: isThemeActive
                    ? '#5D4037'
                    : isBrochure
                      ? undefined // keep brochure icon's original colors
                      : '#ffffff'
                }
              ]}
              contentFit="contain"
            />
          ) : (
            React.createElement(item.icon, { color: isThemeActive ? activeText : inactiveText })
          )}
        </View>
        <Text style={[styles.label, { color: isThemeActive ? activeText : inactiveText }]}>
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { left: 16 + insets.left }]}>
      <View style={styles.navContainer}>
        {navItems.map((item) => renderLink(item))}
      </View>
      {renderLink(brochureItem, true)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 16,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: 68,
    zIndex: 100,
  },
  navContainer: {
    backgroundColor: 'rgba(42, 45, 30, 0.75)',
    borderRadius: 80,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 10,
    paddingHorizontal: 5,
    width: '100%',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  navLink: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 80,
    width: '100%',
    paddingVertical: 8,
  },
  standardLink: {
    height: 64,
  },
  brochureLink: {
    height: 80,
    backgroundColor: 'rgba(42, 45, 30, 0.75)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 80,
  },
  activeBg: {
    backgroundColor: '#FFCF77',
    borderColor: 'transparent',
    shadowColor: '#FFCF77',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  inactiveBg: {
    backgroundColor: 'transparent',
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
  },
  activeIconWrapper: {
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
    borderColor: 'transparent',
  },
  inactiveIconWrapper: {
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  label: {
    fontSize: 8.5,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 3,
    lineHeight: 10,
  },
});
