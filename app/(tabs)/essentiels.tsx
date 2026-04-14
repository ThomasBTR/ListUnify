import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TopBar } from '@/components/ui';
import { Colors } from '@/constants/colors';

export default function EssentielsScreen() {
  return (
    <View style={styles.container}>
      <TopBar title="Essentiels Maison" />
      <SafeAreaView style={styles.content} edges={['bottom']}>
        <View style={styles.placeholder}>
          <Text style={styles.emoji}>🧹</Text>
          <Text style={styles.title}>Essentiels Maison</Text>
          <Text style={styles.subtitle}>À venir — EPIC-06</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  title: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 22,
    color: Colors['on-surface'],
  },
  subtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    color: Colors['on-surface-variant'],
  },
});
