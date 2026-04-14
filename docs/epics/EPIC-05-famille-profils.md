# EPIC-05 — Famille & Profils

> **Priorité :** Phase 3  
> **Dépendances :** EPIC-01 (Infrastructure)  
> **Maquette de référence :** [`stitch/ma_famille/code.html`](../../stitch/ma_famille/code.html)

## Objectif

Permettre à l'utilisateur de configurer les membres de sa famille avec leurs profils alimentaires (allergènes, préférences), et d'utiliser cette configuration pour personnaliser les portions et signaler les incompatibilités sur les recettes.

---

## Features

### F5.1 — Écran "Ma Famille" avec sélecteur de profil

**Description :** Écran principal de gestion de la famille avec navigation entre les profils membres.

**Layout :**
- `<TopBar title="Ma Famille" rightAction={<AddMemberButton />} />`
- Sélecteur horizontal scrollable d'avatars membres
- Fiche de profil du membre sélectionné
- Section "Portions par défaut" en bas de l'écran

**Sélecteur de membres :**
```
[ Marie ♛ ]  [ Thomas ]  [ Léa ]  [ Hugo ]  [ Milo 🐱 ]  [ + ]
```

- Membre actif : encadrement circulaire couleur `primary`, nom sous l'avatar
- Badge rôle sous le nom (cf. F5.2)

**Critères d'acceptation :**
- [ ] Le scroll horizontal affiche tous les membres de la famille
- [ ] Tap sur un avatar → affiche la fiche de ce membre
- [ ] Le "+" ouvre le formulaire d'ajout de membre
- [ ] L'organisateur a une couronne (♛) visible

---

### F5.2 — Fiche profil d'un membre

**Description :** Carte de profil détaillée pour le membre sélectionné.

**Contenu de la fiche :**
- Prénom (éditable inline, bouton crayon ✎)
- Badge de type (pastille colorée) :
  - `Adulte` — bleu neutre
  - `Enfant` — vert doux
  - `Bébé` — rose pâle
  - `Animal` — orange doux
- Icône de rôle selon le type :
  - Organisateur → `workspace_premium` (couronne)
  - Adulte → `person`
  - Enfant → `child_care`
  - Bébé → `baby_changing_station`
  - Animal → `pets`

**Critères d'acceptation :**
- [ ] Le prénom est éditable directement (tap → champ texte inline)
- [ ] Le badge de type est affiché avec la bonne couleur
- [ ] Changer le type met à jour l'icône et le badge

---

### F5.3 — Gestion des allergènes par profil

**Description :** Ajouter et supprimer des allergènes déclarés pour chaque membre.

**Allergènes supportés (14 allergènes réglementaires EU) :**
Gluten, Crustacés, Œufs, Poisson, Arachides, Soja, Lait/Lactose, Fruits à coque, Céleri, Moutarde, Graines de sésame, Anhydride sulfureux, Lupin, Mollusques

**UI :**
- Section "Allergènes" avec pills des allergènes actifs + bouton "+"
- Tap "+" → sélecteur multi-choix des allergènes (bottom sheet)
- Tap sur une pill allergène → supprime avec confirmation
- Note informative : "Les recettes contenant ces allergènes seront signalées dans votre liste."

**Critères d'acceptation :**
- [ ] Les allergènes déclarés apparaissent en pills
- [ ] Le sélecteur propose tous les allergènes (cochés = actifs)
- [ ] Supprimer un allergène retire la pill
- [ ] La note d'information est toujours visible si ≥1 allergène

---

### F5.4 — Préférences alimentaires

**Description :** Déclarer des restrictions alimentaires non-allergènes (régimes, convictions).

**Préférences supportées (v1) :**
- Sans porc
- Végétarien
- Végétalien / Vegan
- Sans alcool
- Sans fruits de mer
- Halal
- Casher

**UI :**
- Section "Préférences alimentaires" avec pills actives + bouton "+"
- Même pattern UX que les allergènes

**Critères d'acceptation :**
- [ ] Les préférences actives s'affichent en pills
- [ ] Le sélecteur propose toutes les préférences disponibles
- [ ] Une préférence peut être supprimée d'un profil

---

### F5.5 — Avertissement automatique sur les recettes incompatibles

**Description :** Signaler visuellement les recettes qui contiennent des allergènes ou violent les préférences d'un membre de la famille.

**Règle de déclenchement :** Une recette est "incompatible" si au moins un de ses allergènes déclarés correspond à un allergène d'un membre famille actif.

**Emplacements du badge :**
1. **Card recette (bibliothèque) :** Badge `⚠ Allergène` en orange (`tertiary`) à la place de `✓ Compatible`
2. **Détail recette :** Badge en haut + tooltip indiquant le(s) membre(s) concerné(s) et l'allergène
3. **Item de liste :** Indicateur discret si l'item provient d'une recette incompatible

**Exemple de tooltip :**
> "⚠ Contient : Lactose — Léa est allergique"

**Critères d'acceptation :**
- [ ] Le badge s'affiche sur les recettes incompatibles dans la bibliothèque
- [ ] Le détail recette indique le membre et l'allergène en cause
- [ ] Les recettes compatibles ont le badge vert `✓ Compatible avec vos profils`
- [ ] Si aucun profil allergène n'est configuré → pas de badge (neutre)

---

### F5.6 — Configuration des portions par défaut

**Description :** Définir la composition du foyer pour le calcul automatique des portions.

**UI (en bas de l'écran "Ma Famille") :**
```
─── Portions par défaut ───
[Toggle] Utiliser la composition de la famille

2 adultes + 2 enfants = 4 portions
                               [Modifier]
```

**Règle de calcul des portions :**
- Adultes comptent pour 1 portion chacun
- Enfants (3–12 ans) comptent pour 0.5 portion
- Bébés (< 3 ans) comptent pour 0 portion
- Animaux comptent pour 0 portion

**Calcul :** `ceil(nb_adultes × 1 + nb_enfants × 0.5)`

**Critères d'acceptation :**
- [ ] Le résumé "X adultes + Y enfants = Z portions" est correct
- [ ] Le toggle désactive le calcul auto (l'utilisateur entre les portions manuellement par recette)
- [ ] La modification de la composition met à jour le calcul en temps réel

---

### F5.7 — Organisateur de famille

**Description :** Le premier membre créé est l'organisateur. Il a des droits étendus.

**Badge organisateur :** Couronne `♛` affichée sur l'avatar + under le sélecteur horizontal

**Droits de l'organisateur (v1) :**
- Modifier le profil de tous les membres
- Supprimer un membre
- Modifier les portions par défaut

**Droits des membres (v1) :** Accès lecture-seule (prévu pour la synchronisation multi-utilisateurs v2)

**Critères d'acceptation :**
- [ ] L'organisateur est distingué par la couronne sur l'avatar
- [ ] Lui seul peut supprimer un membre (swipe-to-delete)
- [ ] L'organisateur est le premier compte créé au onboarding

---

## Modèle de données — `FamilyMember`

```ts
interface FamilyMember {
  id: string
  prénom: string
  type: 'adulte' | 'enfant' | 'bébé' | 'animal'
  avatarEmoji?: string              // Ex: "🐱" pour un animal
  estOrganisateur: boolean
  allergènes: AllergeneKey[]
  préférences: PreferenceKey[]
}

type AllergeneKey =
  | 'gluten' | 'crustacés' | 'œufs' | 'poisson' | 'arachides'
  | 'soja' | 'lactose' | 'fruits_à_coque' | 'céleri' | 'moutarde'
  | 'sésame' | 'sulfites' | 'lupin' | 'mollusques'

type PreferenceKey =
  | 'sans_porc' | 'végétarien' | 'végétalien' | 'sans_alcool'
  | 'sans_fruits_de_mer' | 'halal' | 'casher'
```

## Store Zustand — `useFamilyStore`

```ts
interface FamilyStore {
  membres: FamilyMember[]
  portionsAutoEnabled: boolean
  // Computed
  portionsParDéfaut: number         // Calculé depuis la composition
  // Actions
  addMembre: (membre: Omit<FamilyMember, 'id'>) => void
  updateMembre: (id: string, updates: Partial<FamilyMember>) => void
  removeMembre: (id: string) => void
  togglePortionsAuto: () => void
  isRecipeCompatible: (recipe: Recipe) => { ok: boolean; issues: string[] }
}
```

---

## Fichiers à créer

```
app/
└── famille/
    ├── index.tsx              # Écran principal Ma Famille
    └── nouveau-membre.tsx     # Formulaire ajout membre
components/
├── famille/
│   ├── MemberSelector.tsx     # Sélecteur horizontal d'avatars
│   ├── MemberCard.tsx         # Fiche profil du membre
│   ├── AllergenePicker.tsx    # Sélecteur multi-choix allergènes
│   ├── PreferencePicker.tsx   # Sélecteur multi-choix préférences
│   └── PortionsConfig.tsx     # Section portions par défaut
stores/
└── familyStore.ts
utils/
└── compatibilityChecker.ts    # Vérifie la compatibilité recette/profils
```

---

## Vérification

1. Onglet "Famille" → sélecteur horizontal avec les membres (données de test)
2. Tap sur "Léa" → fiche avec badge "Enfant"
3. Ajouter l'allergène "Lactose" à Léa → pill apparaît
4. Aller dans Recettes → "Pâtes carbonara" (contient lactose) → badge ⚠
5. Vérifier le calcul : 2 adultes + 2 enfants = 4 portions (ceil(2×1 + 2×0.5) = 3 → afficher 3)
6. Modifier la composition (retirer 1 enfant) → le calcul se met à jour
