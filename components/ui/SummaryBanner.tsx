import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';

interface SummaryBannerProps {
  weekLabel: string;
  familyLabel: string;
  totalCount: number;
  recipeCount: number;
  essentialCount: number;
}

export default function SummaryBanner({
  weekLabel,
  familyLabel,
  totalCount,
  recipeCount,
  essentialCount,
}: SummaryBannerProps) {
  return (
    <View style={styles.container}>
      {/* Chips row */}
      <View style={styles.chipsRow}>
        <View style={styles.chip}>
          <Text style={styles.chipText}>{weekLabel}</Text>
        </View>
        <View style={styles.chip}>
          <Text style={styles.chipText}>{familyLabel}</Text>
        </View>
      </View>

      {/* Stats row */}
      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statCount}>{totalCount}</Text>
          <Text style={styles.statLabel}>articles</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.stat}>
          <Text style={styles.statCount}>{recipeCount}</Text>
          <Text style={styles.statLabel}>recettes</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.stat}>
          <Text style={styles.statCount}>{essentialCount}</Text>
          <Text style={styles.statLabel}>essentiels</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: `${Colors['primary-container']}66`,
    borderRadius: 24,
    padding: 24,
    gap: 16,
  },
  chipsRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  chip: {
    backgroundColor: Colors['surface-container-lowest'],
    borderRadius: 9999,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  chipText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 13,
    color: Colors['on-surface-variant'],
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  stat: {
    alignItems: 'center',
  },
  statCount: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 28,
    color: Colors['on-surface'],
    lineHeight: 32,
  },
  statLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: Colors['on-surface-variant'],
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 32,
    backgroundColor: `${Colors['outline-variant']}40`,
  },
});
