import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import * as ScreenOrientation from 'expo-screen-orientation';
import { StatusBar } from 'expo-status-bar';
import { Asset } from 'expo-asset';
import ErrorBoundary from '../components/ErrorBoundary';
import { reportError } from '../utils/crashReporting';
import { 
  useFonts,
  Outfit_300Light,
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_600SemiBold,
  Outfit_700Bold
} from '@expo-google-fonts/outfit';
import { 
  Inter_400Regular,
  Inter_500Medium
} from '@expo-google-fonts/inter';

SplashScreen.preventAutoHideAsync();

// Pre-cache critical offline images to prevent visual flashes. Kept small and
// fast so first paint isn't held up — anything only needed deeper in the app
// (like the Amenities cover image) is warmed separately, in the background.
const criticalImages = [
  require('../../assets/initial/bg-img.png'),
  require('../../assets/home/cignus-updated-logo.png'),
  require('../../assets/home/k-raheja-corp-1.png'),
];

// Not on the startup-blocking critical path: this image isn't shown until
// the Amenities screen is opened, so it's cached in the background after
// first paint instead of delaying app startup for every launch.
const backgroundImages = [
  require('../../assets/project-details/amenities-cover-page-updated-image-1.jpg'),
];

export default function RootLayout() {
  const [assetsPreloaded, setAssetsPreloaded] = useState(false);
  const [fontsLoaded, error] = useFonts({
    Outfit_300Light,
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_600SemiBold,
    Outfit_700Bold,
    Inter_400Regular,
    Inter_500Medium,
  });

  useEffect(() => {
    // 1. Lock screen orientation to landscape for tablet-first experience
    async function lockOrientation() {
      try {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      } catch (e) {
        console.warn("Orientation lock failed:", e);
      }
    }
    lockOrientation();

    // 2. Pre-cache offline visual assets on boot
    async function preloadAssets() {
      try {
        const cacheImages = criticalImages.map(image => Asset.fromModule(image).downloadAsync());
        await Promise.all(cacheImages);
      } catch (e) {
        console.warn("Asset preloading failed:", e);
        reportError(e instanceof Error ? e : new Error(String(e)), { stage: 'criticalAssetPreload' });
      } finally {
        setAssetsPreloaded(true);
      }
    }
    preloadAssets();

    // 3. Warm non-critical images in the background, without blocking startup
    backgroundImages.forEach(image => {
      Asset.fromModule(image).downloadAsync().catch((e) => {
        console.warn("Background asset preloading failed:", e);
        reportError(e instanceof Error ? e : new Error(String(e)), { stage: 'backgroundAssetPreload' });
      });
    });
  }, []);

  useEffect(() => {
    // Hide native splash screen once fonts and critical assets mount
    if ((fontsLoaded && assetsPreloaded) || error) {
      SplashScreen.hideAsync().catch((e) => {
        console.warn("Failed to hide splash screen:", e);
      });
    }
  }, [fontsLoaded, assetsPreloaded, error]);

  if (!fontsLoaded && !assetsPreloaded && !error) {
    return null; // Or a custom loading fallback
  }

  return (
    <ErrorBoundary>
      <StatusBar style="light" hidden={true} />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="initial2" />
        <Stack.Screen name="home" />
        <Stack.Screen name="location" />
        <Stack.Screen name="gallery" />
        <Stack.Screen name="amenities" />
        <Stack.Screen name="project-details" />
        <Stack.Screen name="unitplan/[id]" />
        <Stack.Screen name="circulation" />
        <Stack.Screen name="mobility" />
        <Stack.Screen name="vertical-transport" />
        <Stack.Screen name="project-info" />
        <Stack.Screen name="construction" />
        <Stack.Screen name="walkthrough" />
        <Stack.Screen name="droneview" />
        <Stack.Screen name="brochure" />
        <Stack.Screen name="overview" />
        <Stack.Screen name="sustainability" />
        <Stack.Screen name="concept-summary" />
        <Stack.Screen name="specification" />
        <Stack.Screen name="vr" />
      </Stack>
    </ErrorBoundary>
  );
}
