# EPIC-04 — Planification des Repas

> **Priorité :** Phase 4  
> **Dépendances :** EPIC-01, EPIC-02, EPIC-03, EPIC-05  
> **Maquette de référence :** [`stitch/home_dashboard/code.html`](../../stitch/home_dashboard/code.html) (bannière semaine)

## Objectif

Permettre à l'utilisateur de planifier les repas de la semaine (déjeuners et dîners) et de générer automatiquement la liste de courses complète à partir de ce plan. La planification est la glue entre les recettes et la liste.

---

## Features

### F4.1 — Vue semaine avec slots repas

**Description :** Calendrier horizontal de la semaine courante avec slots de repas assignables.

**Layout proposé :** Accessible depuis le dashboard (section "Cette semaine") ou via un écran dédié.

**Structure de la vue :**
```
< Semaine du 7 au 13 avril >

Lun 7   Mar 8   Mer 9   Jeu 10  Ven 11  Sam 12  Dim 13
┌─────┐  ┌─────┐  ┌─────┐  ...
│  🍗  │  │  +  │  │  🍝  │
│Poulet│  │Ajout│  │ Pâtes│
│ rôti │  │     │  │carbo.│
└─────┘  └─────┘  └─────┘

        Dîner
┌─────┐  ┌─────┐  ...
│  +  │  │  🥗  │
│     │  │Salade│
│     │  │César │
└─────┘  └─────┘
```

**Comportement :**
- Scroll horizontal pour naviguer entre les jours
- Tap slot vide → ouvre le sélecteur de recette
- Tap slot rempli → affiche le détail de la recette assignée + option de suppression
- Navigation semaine précédente/suivante (< >)

**Critères d'acceptation :**
- [ ] Les 7 jours de la semaine sont affichés
- [ ] Deux slots par jour (Déjeuner, Dîner)
- [ ] Les recettes assignées affichent l'icône/emoji et le titre tronqué
- [ ] La semaine affichée correspond à la semaine calendaire courante

---

### F4.2 — Assigner une recette à un slot

**Description :** Sélecteur de recette pour remplir un slot vide du plan semaine.

**Flux :**
1. Tap slot vide "+" → bottom sheet "Choisir une recette"
2. Bottom sheet : search + liste des recettes disponibles
3. Tap recette → assignée au slot + sheet se ferme
4. La recette apparaît dans le slot du planning

**Bottom sheet "Choisir une recette" :**
- Champ de recherche
- Liste des recettes de la bibliothèque (non encore assignées en priorité)
- Badge vert "Déjà planifié" sur les recettes déjà dans la semaine

**Critères d'acceptation :**
- [ ] Le sélecteur s'ouvre en bottom sheet
- [ ] La recherche filtre les recettes en temps réel
- [ ] Une recette peut être assignée à plusieurs jours
- [ ] Supprimer une recette du slot la retire du plan (mais pas de la bibliothèque)

---

### F4.3 — Génération automatique de la liste de courses

**Description :** A partir du plan semaine, générer la liste de courses complète avec fusion des doublons.

**Déclenchement :**
- Automatique à chaque modification du plan semaine (recette ajoutée/supprimée)
- Manuel via bouton "Mettre à jour la liste" (si l'automatique est désactivé)

**Algorithme :**
1. Collecter tous les ingrédients de toutes les recettes planifiées
2. Ajuster les quantités selon les portions configurées par slot
3. Fusionner les doublons (même nom + même unité) — cf. EPIC-02 F2.4
4. Ajouter les essentiels maison récurrents de la semaine (cf. EPIC-06)
5. Categoriser chaque item et trier par catégorie

**Gestion des recettes supprimées du plan :**
- Si une recette est retirée du plan → ses ingrédients sont retirés de la liste
- Si l'ingrédient était coché comme acheté → demander confirmation avant suppression

**Critères d'acceptation :**
- [ ] La liste se met à jour dès qu'une recette est ajoutée/retirée du plan
- [ ] Les doublons sont correctement fusionnés
- [ ] Les essentiels de la semaine sont inclus
- [ ] Retirer une recette du plan propose une confirmation si des items sont déjà cochés

---

### F4.4 — Bannière "Semaine du X au Y" sur le dashboard

**Description :** Le dashboard principal affiche un résumé de la semaine en cours.

**Dashboard — sections à afficher :**
```
Bonjour Marie 👋
Semaine du 7 au 13 avril — 23 articles

[Card: Recettes]     [Card: Essentiels]
3 recettes           5 articles
18 ingrédients

[Btn: Voir ma liste complète (23)]
[Btn: Exporter vers Rappels]

─── Cette semaine ───
[Miniature du plan semaine scrollable]

─── Famille ───
[Avatars: Marie ♛, Thomas, Léa, Hugo]
```

**Cards bento :**
- Recettes : nb recettes planifiées + nb ingrédients total
- Essentiels : nb essentiels ajoutés automatiquement cette semaine

**Critères d'acceptation :**
- [ ] Le dashboard reflète l'état réel du plan semaine
- [ ] Le bouton "Voir ma liste complète" navigue vers l'onglet Liste
- [ ] Les cards bento sont cliquables et naviguent vers l'écran correspondant
- [ ] Les avatars famille sont affichés (cf. EPIC-05)

---

### F4.5 — Recalcul des portions selon la composition famille

**Description :** Quand une recette est assignée à un slot, les portions sont automatiquement ajustées selon la composition de la famille configurée.

**Règle de calcul :**
- Portions slot = composition famille (adultes + enfants)
- Enfants comptent comme 0.5 portion
- Ex : 2 adultes + 2 enfants = 3 portions (arrondi à l'entier supérieur)
- L'utilisateur peut override par slot

**Exemple :**
- Recette "Poulet rôti" base : 4 portions pour 4 pièces de poulet
- Famille : 2 adultes + 2 enfants = 3 portions
- → Quantités recalculées : poulet = 3 pièces (arrondi), légumes proportionnels

**Critères d'acceptation :**
- [ ] Les quantités de la liste reflètent la composition famille
- [ ] Un override de portions sur un slot s'applique uniquement à ce slot
- [ ] L'arrondi est au minimum 1 (jamais 0)

---

## Modèle de données — `MealPlan`

```ts
interface MealPlan {
  semaineDu: Date                    // Lundi de la semaine
  slots: MealSlot[]
}

interface MealSlot {
  id: string
  jour: 0 | 1 | 2 | 3 | 4 | 5 | 6  // 0 = Lundi
  moment: 'déjeuner' | 'dîner'
  recetteId: string | null
  portionsOverride?: number          // Si différent de la composition famille
}
```

## Store Zustand — `useMealPlanStore`

```ts
interface MealPlanStore {
  plan: MealPlan
  // Actions
  assignRecipe: (slotId: string, recetteId: string) => void
  removeRecipe: (slotId: string) => void
  setPortionsOverride: (slotId: string, portions: number) => void
  navigateWeek: (direction: 'prev' | 'next') => void
  generateShoppingList: () => void   // Déclenche la mise à jour du shoppingListStore
}
```

---

## Fichiers à créer

```
app/
├── planning/
│   └── index.tsx               # Vue semaine (accessible depuis dashboard)
├── index.tsx                   # Dashboard (à modifier avec F4.4)
components/
├── planning/
│   ├── WeekCalendar.tsx         # Calendrier 7 jours × 2 slots
│   ├── MealSlot.tsx             # Un slot individuel (vide ou rempli)
│   ├── RecipePickerSheet.tsx    # Bottom sheet sélection recette
│   └── WeekSummaryCards.tsx    # Cards bento du dashboard
stores/
└── mealPlanStore.ts
utils/
└── portionsCalculator.ts        # Calcul portions famille
```

---

## Vérification

1. Dashboard → section "Cette semaine" visible avec les slots de la semaine
2. Tap slot vide → sélecteur de recette → assigner "Poulet rôti"
3. La liste de courses se met à jour automatiquement avec les ingrédients du poulet
4. Assigner une deuxième recette avec "Oignons" → l'oignon est fusionné dans la liste
5. Retirer une recette du plan → ses ingrédients disparaissent de la liste
6. Vérifier que les quantités correspondent à la composition famille configurée
