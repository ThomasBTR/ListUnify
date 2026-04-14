import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import type { ReactNode } from 'react';
import { Colors } from '@/constants/colors';

interface TopBarProps {
  title: string;
  showBack?: boolean;
  rightAction?: ReactNode;
  variant?: 'default' | 'transparent';
}

export default function TopBar({
  title,
  showBack = false,
  rightAction,
  variant = 'default',
}: TopBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + 8,
          backgroundColor:
            variant === 'transparent' ? 'transparent' : `${Colors.surface}CC`,
        },
      ]}
    >
      {/* Back button or spacer */}
      <View style={styles.side}>
        {showBack && (
          <TouchableOpacity
            onPress={() => router.back()}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            style={styles.iconButton}
          >
            <MaterialIcons
              name="arrow-back"
              size={24}
              color={Colors['on-surface']}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Centered title */}
      <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
        {title}
      </Text>

      {/* Right action or spacer */}
      <View style={styles.side}>
        {rightAction ?? null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    height: 56 + 44, // 56dp bar + approx safe area (overridden via paddingTop)
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    zIndex: 50,
  },
  side: {
    width: 40,
    alignItems: 'center',
  },
  iconButton: {
    padding: 4,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 17,
    color: Colors['on-surface'],
    marginHorizontal: 8,
  },
});
