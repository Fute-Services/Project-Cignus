import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import * as ScreenOrientation from 'expo-screen-orientation';
import { StatusBar } from 'expo-status-bar';
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

export default function RootLayout() {
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

    // 2. Hide Expo's native splash screen once app and fonts mount
    if (fontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null; // Or a custom loading fallback
  }

  return (
    <>
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
    </>
  );
}
