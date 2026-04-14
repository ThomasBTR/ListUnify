# EPIC-06 — Essentiels Maison

> **Priorité :** Phase 5  
> **Dépendances :** EPIC-01, EPIC-02 (intégration dans la liste)  
> **Maquette de référence :** [`stitch/essentiels_maison/code.html`](../../stitch/essentiels_maison/code.html)

## Objectif

Gérer les articles récurrents du foyer (hygiène, bébé, animaux, entretien) qui doivent être réapprovisionnés régulièrement. Ces essentiels s'ajoutent automatiquement à la liste de courses selon leur fréquence.

---

## Features

### F6.1 — Écran "Essentiels Maison" avec filtres par catégorie

**Description :** Écran de gestion des articles essentiels du foyer, organisé par catégorie.

**Layout :**
- `<TopBar title="Essentiels Maison" rightAction={<AddButton />} />`
- Filtres catégorie horizontaux scrollables
- Section "À racheter cette semaine"
- Section "Tous les essentiels" organisée par sous-catégorie

**Filtres de catégorie :**
| Pill | Catégorie |
|------|-----------|
| Tous | Toutes les catégories (défaut) |
| DPH | Droguerie, Parfumerie, Hygiène |
| Bébé | Produits pour bébé |
| Animaux | Alimentation et soin animaux |
| Entretien | Produits ménagers |

**Critères d'acceptation :**
- [ ] Les filtres fonctionnent et filtrent la liste
- [ ] "Tous" est actif par défaut
- [ ] Les catégories vides masquent leur section

---

### F6.2 — Section "À racheter cette semaine"

**Description :** Section en haut de l'écran listant les essentiels qui doivent être achetés cette semaine selon leur fréquence.

**Logique de déclenchement :**
- `Hebdo` (toutes les semaines) : apparaît chaque semaine
- `Mensuel` : apparaît la première semaine du mois
- `Trimestriel` : apparaît la première semaine du trimestre
- Si déjà acheté cette semaine → masqué de cette section

**Affichage d'un item "à racheter" :**
```
[Icône catégorie]  Papier toilette · Lotus               ×2 paquets
                   [Hebdo]                                         [+]
```

- Badge fréquence : pill colorée (`primary-container`) : "Hebdo" / "Mensuel" / "Trimestriel"
- Bouton "+" → ajouter directement à la liste de courses

**Critères d'acceptation :**
- [ ] Seuls les essentiels à racheter cette semaine apparaissent dans la section
- [ ] Le badge de fréquence est correct
- [ ] Tap "+" → l'item est ajouté à la liste de courses avec le bon badge source "Essentiel"

---

### F6.3 — Liste complète par sous-catégorie

**Description :** Section "Tous les essentiels" qui affiche l'inventaire complet du foyer, organisé par sous-catégorie.

**Organisation par sous-catégorie (exemples) :**

**DPH :**
- Déodorant — Nivea ×2 (Hebdo)
- Dentifrice — Signal ×1 (Mensuel)

**Bébé :**
- Couches T4 — Pampers ×1 paquet (Hebdo)
- Lingettes — Waterwipes ×1 paquet (Mensuel)

**Animaux :**
- Croquettes chat — Purina ×1 sac 2kg (Mensuel)

**Design des items :**
- Nom du produit en gras + marque en gris
- Quantité + unité
- Badge fréquence
- Swipe gauche → supprimer
- Tap → ouvre l'édition

**Critères d'acceptation :**
- [ ] Les items sont groupés par sous-catégorie avec headers
- [ ] Swipe-to-delete fonctionne avec confirmation
- [ ] Tap sur un item → édition inline ou modale

---

### F6.4 — Modèle d'un essentiel maison

**Description :** Données structurées d'un article essentiel.

**Champs :**
```ts
interface HouseholdEssential {
  id: string
  nom: string
  marque?: string
  quantité: number
  unité: string
  catégorie: 'dph' | 'bébé' | 'animaux' | 'entretien'
  fréquence: 'hebdo' | 'mensuel' | 'trimestriel'
  dernierAchatDate?: Date
  estActif: boolean               // Désactiver sans supprimer
}
```

**Règle de calcul "à racheter" :**
```ts
function devraitRacheter(essentiel: HouseholdEssential, aujourd'hui: Date): boolean {
  if (!essentiel.dernierAchatDate) return true  // Jamais acheté → toujours à racheter
  
  const diff = differenceInDays(aujourd'hui, essentiel.dernierAchatDate)
  switch (essentiel.fréquence) {
    case 'hebdo': return diff >= 7
    case 'mensuel': return diff >= 30
    case 'trimestriel': return diff >= 90
  }
}
```

---

### F6.5 — FAB pour ajouter un nouvel essentiel

**Description :** Bouton action flottant en bas à droite pour ajouter un nouvel essentiel.

**Formulaire d'ajout (bottom sheet ou modale plein écran) :**
- Nom du produit (requis)
- Marque (optionnel)
- Quantité + unité (selector)
- Catégorie (selector : DPH, Bébé, Animaux, Entretien)
- Fréquence (selector : Hebdo, Mensuel, Trimestriel)

**Critères d'acceptation :**
- [ ] Le FAB est visible sur l'écran Essentiels (bottom-right)
- [ ] Le formulaire valide les champs requis
- [ ] L'essentiel créé apparaît dans la bonne catégorie

---

### F6.6 — Intégration automatique dans la liste de courses

**Description :** Les essentiels "à racheter cette semaine" s'ajoutent automatiquement à la liste de courses avec une source identifiable.

**Comportement :**
- Lors du calcul de la liste (cf. EPIC-04 F4.3), les essentiels à racheter sont inclus
- Ils apparaissent dans la catégorie correspondante avec le badge `[Essentiel]`
- Marquer un essentiel comme acheté dans la liste → met à jour `dernierAchatDate`

**Exemple dans la liste :**
```
DPH & Hygiène
[☐] Papier toilette · Lotus  2 paquets  [Essentiel · Hebdo]
[☐] Couches T4 · Pampers     1 paquet   [Essentiel · Hebdo]
```

**Critères d'acceptation :**
- [ ] Les essentiels à racheter apparaissent dans la liste avec badge "Essentiel"
- [ ] Cocher l'article → la date de dernier achat est mise à jour automatiquement
- [ ] Les essentiels récents (achetés < 7j) ne réapparaissent pas la semaine suivante

---

## Store Zustand — `useEssentialsStore`

```ts
interface EssentialsStore {
  essentiels: HouseholdEssential[]
  filterCatégorie: 'tous' | 'dph' | 'bébé' | 'animaux' | 'entretien'
  // Computed
  àRacheterCetteSemaine: HouseholdEssential[]
  // Actions
  addEssentiel: (essentiel: Omit<HouseholdEssential, 'id'>) => void
  updateEssentiel: (id: string, updates: Partial<HouseholdEssential>) => void
  removeEssentiel: (id: string) => void
  markAsAcheté: (id: string) => void   // Met à jour dernierAchatDate
  setFilter: (cat: EssentialsStore['filterCatégorie']) => void
}
```

---

## Données de démo (seed)

```ts
const ESSENTIELS_DEMO: HouseholdEssential[] = [
  { nom: 'Papier toilette', marque: 'Lotus', quantité: 2, unité: 'paquets', catégorie: 'dph', fréquence: 'hebdo' },
  { nom: 'Lessive', marque: 'Skip', quantité: 1, unité: 'bidon', catégorie: 'entretien', fréquence: 'mensuel' },
  { nom: 'Couches T4', marque: 'Pampers', quantité: 1, unité: 'paquet', catégorie: 'bébé', fréquence: 'hebdo' },
  { nom: 'Lingettes', marque: 'Waterwipes', quantité: 1, unité: 'paquet', catégorie: 'bébé', fréquence: 'mensuel' },
  { nom: 'Déodorant', marque: 'Nivea', quantité: 2, unité: 'unités', catégorie: 'dph', fréquence: 'mensuel' },
  { nom: 'Dentifrice', marque: 'Signal', quantité: 1, unité: 'tube', catégorie: 'dph', fréquence: 'mensuel' },
  { nom: 'Croquettes chat', marque: 'Purina', quantité: 1, unité: 'sac 2kg', catégorie: 'animaux', fréquence: 'mensuel' },
]
```

---

## Fichiers à créer

```
app/
└── essentiels/
    └── index.tsx              # Écran Essentiels Maison
components/
├── essentiels/
│   ├── EssentielItem.tsx      # Un item avec swipe-to-delete
│   ├── EssentielsFilters.tsx  # Pills de catégorie
│   ├── RacheterSection.tsx    # Section "À racheter cette semaine"
│   └── AddEssentielSheet.tsx  # Formulaire ajout
stores/
└── essentialsStore.ts
utils/
└── rechercheEssentiels.ts     # Logique "à racheter cette semaine"
```

---

## Vérification

1. Onglet "Essentiels" → section "À racheter" visible avec items hebdo
2. Filtre "Bébé" → seuls les produits bébé sont affichés
3. Tap FAB → formulaire d'ajout → créer "Shampoing · Head&Shoulders · DPH · Mensuel"
4. Aller dans la liste → l'essentiel ajouté y apparaît avec badge "Essentiel"
5. Cocher l'essentiel dans la liste → il ne réapparaît pas dans "À racheter" les 7 prochains jours
