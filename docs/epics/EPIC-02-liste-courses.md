# EPIC-02 — Liste de Courses Unifiée

> **Priorité :** Phase 2 (Core loop)  
> **Dépendances :** EPIC-01 (Infrastructure), EPIC-03 (Recettes — pour les sources)  
> **Maquette de référence :** [`stitch/ma_liste_unifi_e/code.html`](../../stitch/ma_liste_unifi_e/code.html)

## Objectif

Afficher et gérer la liste de courses unifiée qui agrège automatiquement les ingrédients de toutes les recettes de la semaine et les essentiels maison récurrents. C'est l'écran central de l'app — celui que l'utilisateur consulte en faisant ses courses.

---

## Features

### F2.1 — Écran "Ma Liste" avec bannière récapitulative

**Description :** Écran principal de la liste avec une bannière synthétique en haut résumant le contexte.

**Bannière (`<SummaryBanner />`) :**
```
Semaine du 7-13 avril  |  Famille (4 pers.)  |  3 recettes · 5 essentiels · 23 articles total
```

**Structure de l'écran :**
- `<TopBar title="Ma Liste (23)" rightAction={<MoreMenu />} />`
- `<SummaryBanner>` — contexte semaine + famille + stats
- `<ScrollView>` — sections par catégorie
- Zone basse fixe avec CTA Export + Partager

**Critères d'acceptation :**
- [ ] Le compteur d'articles dans le titre se met à jour dynamiquement
- [ ] La bannière affiche le bon contexte (semaine courante, nb personnes, stats)
- [ ] L'écran est scrollable verticalement

**Données :** Issues du store Zustand `useShoppingListStore`

---

### F2.2 — Sections par catégorie collapsibles

**Description :** Les articles sont groupés par catégorie alimentaire. Chaque section est repliable/dépliable.

**Catégories (dans cet ordre) :**
1. Viande & Poisson
2. Fruits & Légumes
3. Épicerie (produits secs)
4. Produits Frais & Laitiers
5. DPH & Hygiène
6. Bébé
7. Animaux
8. Entretien

**Comportement :**
- Par défaut : toutes les sections sont dépliées
- Tap sur le header → replie/déplie avec animation
- Le header affiche : nom de catégorie + nombre d'articles restants à acheter
- Les catégories vides sont masquées

**Design du header de section :**
- Fond légèrement plus sombre que le fond de liste (`surface` vs `surface-variant`)
- Texte en Inter Medium, uppercase, 12sp
- Chevron animé (↓ / ↑)

**Critères d'acceptation :**
- [ ] Les articles sont correctement groupés par catégorie
- [ ] Replier/déplier fonctionne avec animation fluide
- [ ] Les catégories vides ne s'affichent pas
- [ ] Le compteur par section est exact

---

### F2.3 — Items de liste avec checkbox, quantité et tag source

**Description :** Chaque article affiché avec toutes ses informations contextuelles.

**Anatomie d'un item :**
```
[☐]  Poulet entier          1,2 kg    [Poulet rôti]
[☑]  Pommes de terre        500g      [Poulet rôti]  ← acheté (grisé)
[☐]  Oignons                4 pièces  [Poulet rôti + Quiche Lorraine]
```

**Composant `<ShoppingItem />` :**
```tsx
interface ShoppingItemProps {
  nom: string
  quantité: number
  unité: string
  sources: Array<{ type: 'recette' | 'essentiel'; nom: string }>
  estAcheté: boolean
  estAgrégé: boolean  // Provient de plusieurs sources
  onToggle: () => void
}
```

**Design :**
- Checkbox couleur `primary` avec animation de coche
- Sources affichées en Badge pill (fond `primary-container`, texte `on-primary-container`)
- Item agrégé : bordure gauche couleur `tertiary` (accent chaud)
- Quantité en Inter Medium

**Critères d'acceptation :**
- [ ] Chaque item affiche nom, quantité+unité, et tags sources
- [ ] Le tag source est cliquable (navigue vers la recette concernée)
- [ ] Les items agrégés ont un indicateur visuel distinct

---

### F2.4 — Fusion automatique des doublons inter-recettes

**Description :** Logique de déduplication des ingrédients présents dans plusieurs recettes.

**Algorithme de fusion :**
1. Normaliser le nom de l'ingrédient (minuscules, sans accent, trim)
2. Regrouper par `(nom_normalisé, unité)`
3. Sommer les quantités
4. Conserver toutes les sources (pour les tags)
5. Catégorie = celle du premier ingrédient trouvé

**Exemple :**
- Recette 1 : Oignons 2 pièces
- Recette 2 : Oignons 2 pièces
- → Résultat : Oignons **4 pièces** [Poulet rôti + Quiche Lorraine]

**Gestion des unités incompatibles :**
- Même ingrédient avec unités différentes (ex: 500g vs 2 pièces) → ne pas fusionner, afficher les deux lignes séparément

**Critères d'acceptation :**
- [ ] Les doublons (même nom + même unité) sont fusionnés avec quantité sommée
- [ ] Les sources des deux recettes apparaissent sur l'item fusionné
- [ ] Les unités incompatibles ne sont pas fusionnées

---

### F2.5 — Marquage article acheté

**Description :** L'utilisateur peut cocher chaque article au fur et à mesure de ses courses.

**Comportement :**
- Tap checkbox → marque comme acheté
- Article acheté : texte barré (`line-through`) + opacité 50%
- Les articles achetés restent dans leur section (ne disparaissent pas)
- Option "Tout décocher" dans le menu `⋮` (MoreMenu)
- Persistance locale via AsyncStorage (résiste à la fermeture de l'app)

**Critères d'acceptation :**
- [ ] Cocher/décocher fonctionne avec feedback visuel immédiat
- [ ] L'état est persisté localement
- [ ] "Tout décocher" remet tous les items à non-acheté
- [ ] Le compteur de la bannière exclut les articles achetés

---

### F2.6 — Partage en texte brut

**Description :** Partager la liste en texte simple via le share sheet natif iOS/Android.

**Format de partage :**
```
🛒 Ma liste du 7-13 avril (23 articles)

Viande & Poisson
- Poulet entier — 1,2 kg
- Saumon — 400g

Fruits & Légumes
- Pommes de terre — 500g
- Carottes — 300g
...

Via ListUnify
```

**Déclenchement :** Bouton "Partager en texte" sous le CTA export principal.

**Critères d'acceptation :**
- [ ] Le share sheet natif s'ouvre avec le texte pré-formaté
- [ ] Seuls les articles non-achetés sont inclus (ou tous si option configurée)
- [ ] Le format est lisible et structuré par catégorie

---

## Store Zustand — `useShoppingListStore`

```ts
interface ShoppingListStore {
  items: ShoppingItem[]
  weekContext: { start: Date; end: Date }
  // Actions
  toggleItem: (id: string) => void
  clearAllChecked: () => void
  refreshFromSources: () => void  // Recalcule depuis recettes + essentiels
}
```

---

## Fichiers à créer/modifier

```
app/liste.tsx                        # Écran principal liste
components/
├── liste/
│   ├── ShoppingItem.tsx
│   ├── CategorySection.tsx          # (déjà dans UI, peut étendre)
│   ├── SummaryBanner.tsx
│   └── ShareTextButton.tsx
stores/
└── shoppingListStore.ts
utils/
└── mergeIngredients.ts              # Algorithme de fusion
```

---

## Vérification

1. Lancer l'app → onglet "Liste" → la liste s'affiche avec les données de test
2. Cocher 3 articles → les articles sont grisés, le compteur diminue
3. Vérifier un ingrédient présent dans 2 recettes → une seule ligne avec quantité sommée
4. Tap "Partager en texte" → le share sheet iOS s'ouvre avec le bon texte
5. Fermer et rouvrir l'app → les articles cochés sont toujours cochés
