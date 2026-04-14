import { View, Text, TouchableOpacity, LayoutAnimation, StyleSheet } from 'react-native';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';

interface CategorySectionProps {
  title: string;
  icon: React.ComponentProps<typeof MaterialIcons>['name'];
  count: number;
  children: ReactNode;
  defaultExpanded?: boolean;
}

export default function CategorySection({
  title,
  icon,
  count,
  children,
  defaultExpanded = true,
}: CategorySectionProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <TouchableOpacity
        onPress={toggle}
        activeOpacity={0.8}
        style={styles.header}
      >
        <View style={styles.headerLeft}>
          <MaterialIcons
            name={icon}
            size={20}
            color={`${Colors.primary}B3`}
          />
          <Text style={styles.title}>{title}</Text>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{count}</Text>
          </View>
        </View>
        <MaterialIcons
          name={expanded ? 'expand-less' : 'expand-more'}
          size={24}
          color={Colors['on-surface-variant']}
        />
      </TouchableOpacity>

      {/* Content */}
      {expanded && (
        <View style={styles.content}>{children}</View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 16,
    color: Colors['on-surface'],
  },
  countBadge: {
    backgroundColor: Colors['surface-container-high'],
    borderRadius: 9999,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  countText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    color: Colors['on-surface-variant'],
  },
  content: {
    paddingTop: 4,
  },
});
