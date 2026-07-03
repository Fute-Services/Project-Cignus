import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { usePathname, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const navItems = [
  { path: '/circulation', label: 'Circulation' },
  { path: '/mobility', label: 'Mobility' },
  { path: '/vertical-transport', label: 'vertical transport' },
  { path: '/overview', label: 'overview' },
];

export default function ProjectBottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { bottom: 24 + insets.bottom }]}>
      <View style={styles.capsule}>
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <TouchableOpacity
              key={item.path}
              activeOpacity={0.8}
              onPress={() => router.push(item.path as any)}
              accessibilityRole="button"
              accessibilityLabel={item.label}
              accessibilityState={{ selected: isActive }}
              style={[styles.btn, isActive ? styles.activeBtn : styles.inactiveBtn]}
            >
              <Text style={[styles.btnText, isActive ? styles.activeBtnText : styles.inactiveBtnText]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 90,
  },
  capsule: {
    flexDirection: 'row',
    backgroundColor: 'rgba(26, 26, 26, 0.85)',
    borderRadius: 30,
    padding: 4,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  btn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1,
  },
  activeBtn: {
    backgroundColor: '#FFCF77',
    borderColor: '#FFCF77',
  },
  inactiveBtn: {
    backgroundColor: '#1a1a1a',
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  btnText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  activeBtnText: {
    color: '#000000',
  },
  inactiveBtnText: {
    color: '#9CA3AF',
  },
});
