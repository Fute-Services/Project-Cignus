/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function useTheme() {
  const scheme = useColorScheme();
  // useColorScheme() can return null/undefined before the OS value resolves;
  // guard so we never index Colors[null] (which would crash ThemedView/ThemedText).
  return Colors[scheme === 'dark' ? 'dark' : 'light'];
}
