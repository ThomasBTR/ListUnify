# EPIC-03 — Gestion des Recettes

> **Priorité :** Phase 2 (Core loop — à développer avant EPIC-02)  
> **Dépendances :** EPIC-01 (Infrastructure)  
> **Maquettes de référence :**  
> - [`stitch/mes_recettes/code.html`](../../stitch/mes_recettes/code.html)  
> - [`stitch/d_tails_de_la_recette/code.html`](../../stitch/d_tails_de_la_recette/code.html)  
> - [`stitch/d_tails_de_la_recette_avec_pr_paration/code.html`](../../stitch/d_tails_de_la_recette_avec_pr_paration/code.html)

## Objectif

Permettre à l'utilisateur de constituer et gérer sa bibliothèque de recettes, en ajoutant des recettes manuellement ou en les important depuis Jow. Les recettes sont la source principale d'ingrédients pour la liste de courses.

---

## Features

### F3.1 — Écran "Mes Recettes" (bibliothèque)

**Description :** Liste de toutes les recettes sauvegardées, avec filtres et accès rapide à l'ajout.

**Layout :**
- `<TopBar title="Mes Recettes" rightAction={<AddButton />} />`
- Barre de recherche locale : "Chercher une recette…"
- Filtres horizontaux scrollables (Pills)
- Grille de cards recettes
- Card "Ajouter une recette" avec bordure pointillée en bas de liste

**Données d'une card recette :**
```
[Image]
Poulet rôti aux légumes
4 portions  ·  6 ingrédients
[Sans gluten]  [Jow]
```

**Critères d'acceptation :**
- [ ] Les recettes sont affichées en liste (une colonne, cards full-width)
- [ ] La recherche filtre en temps réel sur le titre
- [ ] Les badges allergènes et source sont visibles
- [ ] L'écran de détail s'ouvre au tap sur une card

---

### F3.2 — Filtres de la bibliothèque

**Description :** Filtres horizontaux permettant de trier/filtrer les recettes.

**Filtres disponibles :**
| Filtre | Comportement |
|--------|-------------|
| Cette semaine | Recettes assignées au plan semaine actuel |
| Favoris | Recettes marquées comme favoris (★) |
| Toutes | Toutes les recettes (vue par défaut) |

**Design :** Pills horizontaux scrollables, style identique aux filtres Essentiels (`<Pill />`)

**Critères d'acceptation :**
- [ ] Un seul filtre actif à la fois
- [ ] La liste se filtre dynamiquement
- [ ] "Toutes" est actif par défaut

---

### F3.3 — Recherche de recettes

**Description :** Champ de recherche qui filtre la bibliothèque locale en temps réel.

**Comportement :**
- Placeholder : "Chercher une recette…"
- Recherche sur : titre de la recette
- Résultats en temps réel (debounce 200ms)
- État vide si aucun résultat : illustration + "Aucune recette trouvée" + CTA ajout

**Critères d'acceptation :**
- [ ] La recherche fonctionne sans appel réseau (bibliothèque locale)
- [ ] L'état vide est affiché proprement
- [ ] Effacer la recherche restaure la liste complète

---

### F3.4 — Import depuis Jow

**Description :** Importer une recette depuis la plateforme Jow via URL ou recherche.

**Flux d'import :**
1. Tap "Depuis Jow" → bottom sheet d'import
2. Deux onglets : "Par URL" / "Rechercher"
3. **Par URL :** Coller l'URL Jow → tap "Importer" → parsing des données
4. **Rechercher :** Champ de recherche → résultats API Jow → sélection → import

**Données importées depuis Jow :**
- Titre de la recette
- Image
- Ingrédients (nom, quantité, unité)
- Nombre de portions de base
- Tags allergènes (si disponibles via l'API)

**Badge :** Les recettes Jow ont le badge `[Jow]` en orange (`tertiary`)

**Note v1 :** Si l'API Jow n'est pas disponible publiquement, l'import par URL utilise un web scraping simple ou un parsing HTML. L'import sera indiqué comme "bêta".

**Critères d'acceptation :**
- [ ] Une URL Jow valide produit une recette importée avec tous ses ingrédients
- [ ] Les erreurs d'import sont gérées gracieusement (URL invalide, hors ligne…)
- [ ] La recette importée a le badge "Jow"

---

### F3.5 — Ajout manuel de recette

**Description :** Formulaire de création manuelle d'une recette.

**Champs du formulaire :**
- Titre (requis)
- Photo (optionnelle — galerie ou caméra)
- Nombre de portions de base (stepper numérique, défaut : composition famille)
- Ingrédients (liste dynamique) :
  - Chaque ligne : nom + quantité + unité (selector : g, kg, ml, L, pièces, c.à.s, c.à.c…)
  - Bouton "+" pour ajouter une ligne
  - Glisser pour réordonner / swipe pour supprimer
- Tags allergènes (multi-select) : Gluten, Lactose, Arachides, Fruits à coque, Œufs, Poisson, Soja, Mollusques

**Navigation :** Stack modal au-dessus de la bibliothèque

**Critères d'acceptation :**
- [ ] La validation empêche la sauvegarde sans titre ni ingrédient
- [ ] L'unité par défaut est "pièces"
- [ ] La recette sauvegardée apparaît dans la bibliothèque
- [ ] Le badge "Manuel" (gris neutre) est affiché

---

### F3.6 — Écran détail recette

**Description :** Vue complète d'une recette avec hero image, ingrédients, et ajustement de portions.

**Layout :**
```
[Hero Image 4:3]
  Badge: "Importé depuis Jow" (si applicable)
  Badge: "Compatible avec vos profils" ✓ (ou ⚠ si allergène)

Ajusteur de portions :
  [–]  4  [+]
  Basé sur votre famille (2 adultes, 2 enfants)

─── Ingrédients ───
[☐] Poulet entier          1,2 kg
[☐] Pommes de terre        500g
[☐] Oignons                2 pièces  ← Note d'agrégation si présent ailleurs

[Tout désélectionner]

[CTA bas]  🛒  Ajouter à ma liste
```

**Comportement de l'ajusteur de portions :**
- La valeur par défaut est le nombre de portions de la recette OU la composition famille (si configurée)
- Changer les portions recalcule toutes les quantités en temps réel
- Min : 1 portion, Max : 20 portions

**Critères d'acceptation :**
- [ ] L'image hero s'affiche (placeholder si absente)
- [ ] Le badge profils indique la compatibilité allergènes (vert ✓ ou orange ⚠ avec détail)
- [ ] L'ajusteur de portions recalcule les quantités
- [ ] Les cases peuvent être décochées individuellement (pour exclure un ingrédient)

---

### F3.7 — "Ajouter à ma liste" depuis la recette

**Description :** CTA principal du détail recette qui ajoute les ingrédients cochés à la liste de courses.

**Comportement :**
- Tap "Ajouter à ma liste" → les ingrédients sélectionnés sont ajoutés au store `shoppingListStore`
- Si la recette est déjà dans la liste → afficher confirmation "Cette recette est déjà dans votre liste. Remplacer ?"
- Animation de succès : snackbar "3 ingrédients ajoutés à votre liste"
- La recette est marquée "Cette semaine" dans la bibliothèque

**Critères d'acceptation :**
- [ ] Les ingrédients non-cochés ne sont pas ajoutés
- [ ] Le doublon existant déclenche la confirmation
- [ ] Le feedback de succès est visible
- [ ] L'état "Cette semaine" est mis à jour dans la bibliothèque

---

### F3.8 — Note d'agrégation sur les ingrédients

**Description :** Indiquer visuellement qu'un ingrédient sera fusionné avec d'autres recettes dans la liste.

**Affichage :** Sous l'ingrédient concerné, une note discrète :
> "Les oignons seront agrégés avec les autres recettes qui en contiennent."

**Conditions d'affichage :** Uniquement si l'ingrédient (même nom + même unité) est déjà présent dans une autre recette active de la semaine.

**Design :** Texte en Inter Regular 12sp, couleur `outline`, bordure gauche couleur `tertiary`

**Critères d'acceptation :**
- [ ] La note apparaît uniquement si l'agrégation aura lieu
- [ ] La note est discrète et ne gêne pas la lecture des ingrédients

---

## Modèle de données — `Recipe`

```ts
interface Recipe {
  id: string
  titre: string
  imageUrl?: string
  portionsBase: number
  source: 'jow' | 'manuel'
  sourceUrl?: string          // URL Jow originale
  ingrédients: Ingredient[]
  tagsAllergènes: string[]
  estFavori: boolean
  estDansSemaine: boolean     // Assigné au plan semaine courant
  créeAt: Date
}

interface Ingredient {
  id: string
  nom: string
  quantité: number
  unité: string               // 'g' | 'kg' | 'ml' | 'L' | 'pièces' | 'c.à.s' | 'c.à.c'
  catégorie: CategoryKey      // Pour groupement dans la liste
}
```

## Store Zustand — `useRecipesStore`

```ts
interface RecipesStore {
  recipes: Recipe[]
  filter: 'semaine' | 'favoris' | 'toutes'
  searchQuery: string
  // Actions
  addRecipe: (recipe: Omit<Recipe, 'id' | 'créeAt'>) => void
  importFromJow: (url: string) => Promise<Recipe>
  toggleFavori: (id: string) => void
  toggleSemaine: (id: string) => void
  setFilter: (filter: RecipesStore['filter']) => void
  setSearch: (query: string) => void
}
```

---

## Fichiers à créer

```
app/
├── recettes/
│   ├── index.tsx              # Liste des recettes
│   ├── [id].tsx               # Détail recette
│   └── nouvelle.tsx           # Formulaire ajout manuel
components/
├── recettes/
│   ├── RecipeCard.tsx
│   ├── RecipeFilters.tsx
│   ├── PortionsAdjuster.tsx
│   ├── IngredientRow.tsx
│   ├── AggregationNote.tsx
│   └── ImportJowSheet.tsx
stores/
└── recipesStore.ts
utils/
└── jowImporter.ts             # Parsing URL / API Jow
```

---

## Vérification

1. Ouvrir l'onglet "Recettes" → cards affichées
2. Tap filtre "Favoris" → seules les recettes favorites
3. Ajouter une recette manuellement (formulaire complet) → apparaît dans la liste
4. Importer une URL Jow valide → recette créée avec badge Jow
5. Ouvrir le détail d'une recette → ajuster les portions → les quantités se recalculent
6. Tap "Ajouter à ma liste" → onglet Liste contient les nouveaux articles
