import { Tabs } from 'expo-router';
import { Platform, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Colors } from '@/constants/colors';

const TABS = [
  { name: 'index', label: 'Accueil', icon: 'home' },
  { name: 'liste', label: 'Liste', icon: 'format-list-bulleted' },
  { name: 'recettes', label: 'Recettes', icon: 'menu-book' },
  { name: 'essentiels', label: 'Essentiels', icon: 'shopping-basket' },
  { name: 'famille', label: 'Famille', icon: 'family-restroom' },
] as const;

function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.tabBar,
        {
          paddingBottom: insets.bottom + 8,
          backgroundColor: Platform.OS === 'ios'
            ? `${Colors.surface}CC`
            : Colors.surface,
        },
      ]}
    >
      <View style={styles.tabRow}>
        {state.routes.map((route, index) => {
          const isActive = state.index === index;
          const tab = TABS[index];

          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => navigation.navigate(route.name)}
              activeOpacity={0.8}
              style={[
                styles.tabItem,
                isActive && styles.tabItemActive,
              ]}
            >
              <MaterialIcons
                name={tab.icon as React.ComponentProps<typeof MaterialIcons>['name']}
                size={24}
                color={isActive ? Colors.primary : Colors.outline}
              />
              <Text
                style={[
                  styles.tabLabel,
                  { color: isActive ? Colors.primary : Colors.outline },
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 48,
    borderTopRightRadius: 48,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: -12 },
    shadowOpacity: 0.06,
    shadowRadius: 32,
    elevation: 12,
    paddingTop: 12,
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingBottom: 4,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
    minWidth: 56,
  },
  tabItemActive: {
    backgroundColor: Colors['primary-container'],
  },
  tabLabel: {
    fontFamily: 'Inter_500Medium',
    fontSize: 11,
    marginTop: 4,
  },
});

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="liste" />
      <Tabs.Screen name="recettes" />
      <Tabs.Screen name="essentiels" />
      <Tabs.Screen name="famille" />
    </Tabs>
  );
}
