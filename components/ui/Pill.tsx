import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';

interface PillProps {
  label: string;
  active?: boolean;
  onPress?: () => void;
}

export default function Pill({ label, active = false, onPress }: PillProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.pill, active ? styles.active : styles.inactive]}
    >
      <Text style={[styles.label, active ? styles.labelActive : styles.labelInactive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  pill: {
    borderRadius: 9999,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  active: {
    backgroundColor: Colors.primary,
  },
  inactive: {
    backgroundColor: Colors['surface-container-high'],
  },
  label: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
  },
  labelActive: {
    color: Colors['on-primary'],
  },
  labelInactive: {
    color: Colors['on-surface-variant'],
  },
});
