# EPIC-01 — Infrastructure & Navigation

> **Priorité :** Phase 1 (Fondations)  
> **Dépendances :** Aucune  
> **Maquette de référence :** [`stitch/home_dashboard/code.html`](../../stitch/home_dashboard/code.html)

## Objectif

Mettre en place le scaffolding complet de l'application React Native/Expo avec le design system "L'Épicerie Douce", la navigation, et les composants de base réutilisables. Tout le reste du développement s'appuie sur cet epic.

---

## Features

### F1.1 — Init projet Expo avec Expo Router

**Description :** Initialiser le projet React Native avec Expo et configurer Expo Router pour la navigation par fichiers.

**Tâches :**
- `npx create-expo-app listunify --template` avec TypeScript
- Configurer Expo Router (v3+) avec le layout de navigation
- Structurer les dossiers : `app/`, `components/`, `stores/`, `constants/`, `hooks/`
- Configurer `tsconfig.json` avec paths aliases (`@/components`, `@/stores`…)
- Ajouter `.env` et `.env.example`

**Critères d'acceptation :**
- [ ] `npx expo start` lance l'app sans erreur
- [ ] La structure de dossiers est en place
- [ ] TypeScript strict activé

---

### F1.2 — Intégration NativeWind + tokens de couleur

**Description :** Configurer NativeWind (Tailwind pour React Native) avec la palette "L'Épicerie Douce".

**Palette à configurer (`tailwind.config.js`) :**
```js
colors: {
  primary: '#51644f',         // Sage green
  'primary-container': '#d3e8ce',
  secondary: '#6a5e46',       // Warm neutral
  tertiary: '#8f4f14',        // Warm orange
  surface: '#fbf9f5',         // Cream
  'on-surface': '#1a1c19',
  outline: '#71796e',
  'outline-variant': '#c1c9be',
}
```

**Typographie :**
- Plus Jakarta Sans — titres et moments éditoriaux (charger via expo-font)
- Inter — corps de texte et contenu fonctionnel

**Critères d'acceptation :**
- [ ] NativeWind fonctionne avec les classes Tailwind en React Native
- [ ] Les couleurs custom sont disponibles via `className="bg-primary"`
- [ ] Les deux polices sont chargées et appliquées

**Référence :** [`stitch/l_epicerie_douce/DESIGN.md`](../../stitch/l_epicerie_douce/DESIGN.md)

---

### F1.3 — Bottom Navigation Bar

**Description :** Barre de navigation basse persistante avec 5 onglets, active sur toutes les pages principales.

**Onglets :**
| Index | Icône Material | Label | Route |
|-------|----------------|-------|-------|
| 0 | `home` | Accueil | `/` |
| 1 | `format_list_bulleted` | Liste | `/liste` |
| 2 | `menu_book` | Recettes | `/recettes` |
| 3 | `shopping_basket` | Essentiels | `/essentiels` |
| 4 | `family_restroom` | Famille | `/famille` |

**Design :**
- Fond : `surface` avec légère transparence (glassmorphisme)
- Icône active : remplie + couleur `primary`, label visible
- Icône inactive : outline, couleur `outline`
- Pas de badge de notification (v1)

**Critères d'acceptation :**
- [ ] Navigation fonctionnelle entre les 5 onglets
- [ ] Onglet actif visuellement distinct
- [ ] Icônes Material Symbols chargées (expo-font ou @expo/vector-icons)
- [ ] La barre est absente sur les écrans de détail (modal / stack)

---

### F1.4 — Top App Bar réutilisable

**Description :** Composant `<TopBar />` configurable utilisé sur toutes les pages.

**Props :**
```tsx
interface TopBarProps {
  title: string
  showBack?: boolean       // Affiche bouton retour (←)
  rightAction?: ReactNode  // Ex: bouton "+" ou "⋮"
  variant?: 'default' | 'transparent'
}
```

**Design :**
- Fond : `surface` (ou transparent pour les vues avec hero image)
- Titre centré en Plus Jakarta Sans, Medium
- Bouton retour : icône `arrow_back`
- Hauteur : 56dp (standard Material 3)

**Critères d'acceptation :**
- [ ] Le composant s'affiche correctement sur toutes les pages
- [ ] Le bouton retour appelle `router.back()`
- [ ] Le titre est tronqué proprement si trop long

---

### F1.5 — Composants de base (Design System)

**Description :** Bibliothèque de composants primitifs réutilisables alignés avec le design system.

**Composants à créer :**

| Composant | Description |
|-----------|-------------|
| `<Pill />` | Filtre/tag horizontal, variantes : active/inactive |
| `<Card />` | Conteneur avec fond tonal, coins 16dp min, sans bordure 1px |
| `<Checkbox />` | Case à cocher avec animation, couleur `primary` |
| `<Badge />` | Petit tag coloré (ex: "Sans gluten", "Jow") |
| `<FAB />` | Bouton action flottant, position bottom-right |
| `<SummaryBanner />` | Bannière récap (semaine, famille, total) |
| `<CategorySection />` | Section collapsible avec header et items |

**Règles du design system à respecter :**
- Coins minimum : `rounded-lg` (8dp), préférer `rounded-2xl` (16dp)
- Jamais de bordure `border-1px` — utiliser des décalages de couleur de fond
- Glassmorphisme : `bg-white/60 backdrop-blur-md` pour les éléments flottants

**Critères d'acceptation :**
- [ ] Chaque composant a un fichier dédié dans `components/ui/`
- [ ] Les composants sont exportés depuis `components/ui/index.ts`
- [ ] Visuellement cohérents avec les maquettes Stitch

---

## Fichiers à créer

```
app/
├── _layout.tsx              # Layout racine avec bottom nav
├── index.tsx                # Route Accueil
├── liste.tsx                # Route Liste
├── recettes.tsx             # Route Recettes
├── essentiels.tsx           # Route Essentiels
└── famille.tsx              # Route Famille
components/
├── ui/
│   ├── TopBar.tsx
│   ├── Pill.tsx
│   ├── Card.tsx
│   ├── Checkbox.tsx
│   ├── Badge.tsx
│   ├── FAB.tsx
│   ├── SummaryBanner.tsx
│   ├── CategorySection.tsx
│   └── index.ts
constants/
└── colors.ts               # Tokens de couleur exportés
tailwind.config.js
babel.config.js             # Avec NativeWind plugin
```

---

## Vérification

1. `npx expo start` → app se lance sur simulateur iOS
2. La bottom nav permet de naviguer entre les 5 écrans (stubs vides OK)
3. Le `<TopBar />` s'affiche correctement sur chaque écran
4. Les composants UI correspondent visuellement aux maquettes Stitch
