import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Colors } from '@/constants/colors';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const topBarHeight = insets.top + 56;

  return (
    <View style={styles.container}>
      {/* Glassmorphism TopAppBar */}
      <View
        style={[
          styles.topBar,
          {
            paddingTop: insets.top + 12,
            backgroundColor:
              Platform.OS === 'ios' ? `${Colors.surface}CC` : Colors.surface,
          },
        ]}
      >
        <View style={styles.topBarLeft}>
          <MaterialIcons name="menu" size={24} color={Colors.primary} />
          <Text style={styles.logo}>ListUnify</Text>
        </View>
        <View style={styles.avatar}>
          <MaterialIcons
            name="person"
            size={22}
            color={Colors['on-primary-fixed']}
          />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: topBarHeight + 48 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Greeting */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Bonjour Marie</Text>
          <Text style={styles.heroSubtitle}>
            Semaine du 7 au 13 avril — 23 articles
          </Text>
        </View>

        {/* Bento Grid */}
        <View style={styles.bentoGrid}>
          {/* Recettes Card */}
          <TouchableOpacity
            style={styles.bentoCard}
            onPress={() => router.push('/(tabs)/recettes')}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={[Colors.primary, Colors['secondary-fixed']]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFillObject}
            />
            <View
              style={[
                StyleSheet.absoluteFillObject,
                { backgroundColor: Colors['surface-container-lowest'], opacity: 0.9 },
              ]}
            />
            {/* Decorative blur circle */}
            <View style={styles.decorCircleGreen} />

            <View style={styles.bentoCardContent}>
              <View style={[styles.iconCircle, { backgroundColor: Colors['primary-container'] }]}>
                <MaterialIcons
                  name="restaurant-menu"
                  size={26}
                  color={Colors.primary}
                />
              </View>
              <Text style={styles.bentoCardTitle}>Recettes</Text>
              <View style={[styles.bentoChip, { backgroundColor: `${Colors['secondary-container']}80` }]}>
                <Text style={[styles.bentoChipText, { color: Colors['on-secondary-container'] }]}>
                  3 recettes · 18 ingrédients
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Essentiels Card */}
          <TouchableOpacity
            style={styles.bentoCard}
            onPress={() => router.push('/(tabs)/essentiels')}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={[Colors.tertiary, Colors['primary-container']]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFillObject}
            />
            <View
              style={[
                StyleSheet.absoluteFillObject,
                { backgroundColor: Colors['surface-container-lowest'], opacity: 0.9 },
              ]}
            />
            {/* Decorative blur circle */}
            <View style={styles.decorCircleOrange} />

            <View style={styles.bentoCardContent}>
              <View style={[styles.iconCircle, { backgroundColor: `${Colors['tertiary-container']}4D` }]}>
                <MaterialIcons
                  name="cleaning-services"
                  size={26}
                  color={Colors.tertiary}
                />
              </View>
              <Text style={styles.bentoCardTitle}>Essentiels{'\n'}Maison</Text>
              <View style={[styles.bentoChip, { backgroundColor: `${Colors['tertiary-container']}33` }]}>
                <Text style={[styles.bentoChipText, { color: Colors.tertiary }]}>
                  5 articles
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* CTA Buttons */}
        <View style={styles.ctaSection}>
          {/* Primary CTA */}
          <TouchableOpacity
            style={styles.primaryCTA}
            onPress={() => router.push('/(tabs)/liste')}
            activeOpacity={0.9}
          >
            <MaterialIcons name="checklist" size={24} color={Colors['on-primary']} />
            <Text style={styles.primaryCTAText}>
              Voir ma liste complète (23)
            </Text>
          </TouchableOpacity>

          {/* Secondary CTA */}
          <TouchableOpacity
            style={styles.secondaryCTA}
            activeOpacity={0.8}
          >
            <MaterialIcons
              name="playlist-add-check"
              size={24}
              color={Colors.primary}
            />
            <Text style={styles.secondaryCTAText}>
              Exporter vers Rappels
            </Text>
          </TouchableOpacity>
        </View>

        {/* Editorial Footer */}
        <View style={styles.editorial}>
          <Text style={styles.editorialQuote}>
            "Une cuisine organisée est le secret d'une maison sereine."
          </Text>
          <Text style={styles.editorialLabel}>L'ATELIER LISTUNIFY</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  // Top bar
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 16,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },
  topBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 22,
    color: Colors.primary,
    letterSpacing: -0.5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors['primary-fixed'],
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  // Scroll content
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 160,
  },

  // Hero
  heroSection: {
    marginBottom: 40,
    marginLeft: 8,
  },
  heroTitle: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 40,
    color: Colors['on-background'],
    letterSpacing: -1,
    marginBottom: 8,
    lineHeight: 48,
  },
  heroSubtitle: {
    fontFamily: 'Inter_500Medium',
    fontSize: 17,
    color: Colors['on-surface-variant'],
  },

  // Bento grid
  bentoGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 40,
  },
  bentoCard: {
    flex: 1,
    borderRadius: 32,
    overflow: 'hidden',
    minHeight: 200,
  },
  bentoCardContent: {
    padding: 28,
    justifyContent: 'flex-end',
    minHeight: 200,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  bentoCardTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 18,
    color: Colors['on-surface'],
    marginBottom: 12,
    lineHeight: 24,
  },
  bentoChip: {
    borderRadius: 9999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  bentoChipText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
  },
  decorCircleGreen: {
    position: 'absolute',
    right: -16,
    bottom: -16,
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: Colors['primary-container'],
    opacity: 0.2,
  },
  decorCircleOrange: {
    position: 'absolute',
    right: -16,
    bottom: -16,
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: Colors['tertiary-container'],
    opacity: 0.2,
  },

  // CTAs
  ctaSection: {
    gap: 16,
  },
  primaryCTA: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: Colors.primary,
    paddingVertical: 20,
    borderRadius: 9999,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 32,
    elevation: 8,
  },
  primaryCTAText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 17,
    color: Colors['on-primary'],
  },
  secondaryCTA: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: `${Colors.primary}1A`,
  },
  secondaryCTAText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 17,
    color: Colors.primary,
  },

  // Editorial
  editorial: {
    marginTop: 64,
    opacity: 0.6,
    paddingHorizontal: 8,
  },
  editorialQuote: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    fontStyle: 'italic',
    lineHeight: 22,
    color: Colors['on-surface'],
  },
  editorialLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    marginTop: 6,
    letterSpacing: 4,
    color: Colors['on-surface'],
  },
});
