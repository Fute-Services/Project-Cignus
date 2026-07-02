import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import * as ScreenOrientation from 'expo-screen-orientation';
import { StatusBar } from 'expo-status-bar';
import { Asset } from 'expo-asset';
import ErrorBoundary from '../components/ErrorBoundary';
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

// Pre-cache critical offline images to prevent visual flashes
const criticalImages = [
  require('../../assets/intial/bg_img.png'),
  require('../../assets/Home/cignus updated logo.png'),
  require('../../assets/Home/K_Raheja_Corp 1.png'),
  require('../../assets/Project_Details/Amenities cover page updated image (1).png'),
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
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }
    lockOrientation();

    // 2. Pre-cache offline visual assets on boot
    async function preloadAssets() {
      try {
        const cacheImages = criticalImages.map(image => Asset.fromModule(image).downloadAsync());
        await Promise.all(cacheImages);
      } catch (e) {
        console.warn("Asset preloading failed:", e);
      } finally {
        setAssetsPreloaded(true);
      }
    }
    preloadAssets();
  }, []);

  useEffect(() => {
    // Hide native splash screen once fonts and critical assets mount
    if ((fontsLoaded && assetsPreloaded) || error) {
      SplashScreen.hideAsync();
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
