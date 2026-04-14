import { TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useRef } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';

interface FABProps {
  onPress: () => void;
  icon?: React.ComponentProps<typeof MaterialIcons>['name'];
}

export default function FAB({ onPress, icon = 'add' }: FABProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.92,
      useNativeDriver: true,
      tension: 300,
      friction: 10,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 300,
      friction: 10,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ scale: scaleAnim }] },
      ]}
    >
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        style={styles.button}
      >
        <MaterialIcons name={icon} size={28} color={Colors['on-primary']} />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 96,
    right: 24,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 8,
  },
  button: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
