import { View, TouchableOpacity, StyleSheet } from 'react-native';
import type { ReactNode } from 'react';
import { Colors } from '@/constants/colors';

interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'tonal' | 'elevated';
  onPress?: () => void;
  style?: object;
}

export default function Card({
  children,
  variant = 'default',
  onPress,
  style,
}: CardProps) {
  const bgColor =
    variant === 'tonal'
      ? Colors['surface-container-low']
      : variant === 'elevated'
      ? Colors['surface-container-lowest']
      : Colors['surface-container-lowest'];

  const containerStyle = [
    styles.card,
    { backgroundColor: bgColor },
    variant === 'elevated' && styles.elevated,
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.9}
        style={containerStyle}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={containerStyle}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 32,
    overflow: 'hidden',
  },
  elevated: {
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.06,
    shadowRadius: 32,
    elevation: 4,
  },
});
