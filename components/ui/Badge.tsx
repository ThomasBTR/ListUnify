import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';

type BadgeVariant = 'default' | 'allergen' | 'source' | 'frequency';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
}

export default function Badge({ label, variant = 'default' }: BadgeProps) {
  return (
    <View style={[styles.badge, variantStyles[variant].container]}>
      <Text style={[styles.label, variantStyles[variant].text]}>
        {label}
      </Text>
    </View>
  );
}

const variantStyles: Record<
  BadgeVariant,
  { container: object; text: object }
> = {
  default: {
    container: { backgroundColor: Colors['surface-container-highest'] },
    text: { color: Colors['on-surface-variant'] },
  },
  allergen: {
    container: { backgroundColor: `${Colors.error}1A` },
    text: { color: Colors.error },
  },
  source: {
    container: { backgroundColor: `${Colors['tertiary-container']}33` },
    text: { color: Colors.tertiary },
  },
  frequency: {
    container: { backgroundColor: `${Colors['primary-container']}66` },
    text: { color: Colors.primary },
  },
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: 9999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  label: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
});
