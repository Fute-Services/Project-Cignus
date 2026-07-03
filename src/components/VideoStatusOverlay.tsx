import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

interface Props {
  isReady: boolean;
  hasError: boolean;
}

// Absolute-fill overlay for a video card: shows a spinner while the video is
// loading, a branded error message if it fails, and renders nothing once the
// video is ready to play (so it never sits on top of visible playback).
export default function VideoStatusOverlay({ isReady, hasError }: Props) {
  if (isReady) return null;

  return (
    <View style={styles.container} pointerEvents="none">
      {hasError ? (
        <Text style={styles.errorText}>This video couldn't be loaded</Text>
      ) : (
        <ActivityIndicator size="large" color="#FFCF77" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  errorText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    paddingHorizontal: 24,
  },
});
