import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
  useFonts as usePlusJakartaSans,
} from '@expo-google-fonts/plus-jakarta-sans';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  useFonts as useInter,
} from '@expo-google-fonts/inter';
import { Slot, SplashScreen } from 'expo-router';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import '../global.css';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [jakartaLoaded] = usePlusJakartaSans({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
  });

  const [interLoaded] = useInter({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  const loaded = jakartaLoaded && interLoaded;

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="dark" backgroundColor="#fbf9f5" />
      <Slot />
    </>
  );
}
