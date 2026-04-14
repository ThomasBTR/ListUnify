import { View, TouchableOpacity, Text, Animated, StyleSheet } from 'react-native';
import { useRef, useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';

interface CheckboxProps {
  checked: boolean;
  onToggle: () => void;
  label?: string;
}

export default function Checkbox({ checked, onToggle, label }: CheckboxProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1.2,
        useNativeDriver: true,
        tension: 300,
        friction: 10,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 300,
        friction: 10,
      }),
    ]).start();
  }, [checked]);

  return (
    <TouchableOpacity
      onPress={onToggle}
      activeOpacity={0.8}
      style={styles.row}
    >
      <Animated.View
        style={[
          styles.box,
          checked ? styles.boxChecked : styles.boxUnchecked,
          { transform: [{ scale: scaleAnim }] },
        ]}
      >
        {checked && (
          <MaterialIcons name="check" size={16} color={Colors['on-primary']} />
        )}
      </Animated.View>
      {label && (
        <Text
          style={[
            styles.label,
            checked && styles.labelChecked,
          ]}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  box: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxUnchecked: {
    borderWidth: 2,
    borderColor: `${Colors.primary}33`,
    backgroundColor: 'transparent',
  },
  boxChecked: {
    backgroundColor: Colors.primary,
    borderWidth: 0,
  },
  label: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: Colors['on-surface'],
    flex: 1,
  },
  labelChecked: {
    color: Colors['on-surface-variant'],
    textDecorationLine: 'line-through',
  },
});
