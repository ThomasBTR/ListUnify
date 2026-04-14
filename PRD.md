# PRD — ListUnify

> **Version :** 1.0 — MVP  
> **Dernière mise à jour :** Avril 2026  
> **Auteur :** Thomas Berthomier  
> **Statut :** Approuvé

---

## 1. Vision

**"Une seule liste, toute la famille."**

ListUnify centralise la gestion des courses familiales en unifiant recettes de la semaine, essentiels du foyer, et planification des repas dans une seule application mobile. L'expérience est pensée pour les familles françaises qui souhaitent gagner du temps, réduire le gaspillage alimentaire, et simplifier l'organisation des repas.

---

## 2. Problème résolu

Les familles gèrent leurs courses de façon fragmentée :

- **Listes dispersées** entre notes téléphone, apps séparées, et mémos papier
- **Doublons non gérés** — le même ingrédient apparaît dans 3 recettes et est acheté 3 fois
- **Portions inadaptées** — les recettes ne tiennent pas compte de la composition réelle de la famille
- **Allergènes ignorés** — aucun signalement automatique en cas d'incompatibilité avec un membre de la famille
- **Collaboration difficile** — la liste n'est pas partagée en temps réel avec le conjoint

---

## 3. Personas

### Marie — L'organisatrice familiale (persona principal)
- **Âge :** 32 ans
- **Situation :** Mère de 2 enfants (Léa 4 ans, Hugo 18 mois), conjoint Thomas
- **Contexte :** Gère les courses de 4 personnes chaque semaine
- **Frustrations :** Perd du temps à compiler les ingrédients de plusieurs recettes, oublie les essentiels maison, doit rappeler Thomas de ce qu'il manque
- **Besoins :** Une liste unique et auto-générée, filtrage par allergènes, partage facile avec Thomas

### Thomas — Le contributeur occasionnel
- **Âge :** 35 ans
- **Situation :** Conjoint de Marie, fait les courses de temps en temps
- **Contexte :** Consulte et coche la liste depuis l'app
- **Besoins :** Accès simple à la liste en cours, pouvoir marquer les articles comme achetés

---

## 4. Stack technique

| Couche | Technologie |
|--------|-------------|
| Framework mobile | React Native + Expo (SDK 51+) |
| Navigation | Expo Router (navigation par fichiers) |
| Styling | NativeWind (Tailwind CSS pour React Native) |
| État global | Zustand |
| Persistance locale | AsyncStorage |
| Persistance cloud (v2) | Supabase ou Firebase |
| Tests | Jest + React Native Testing Library |

**Design system :** `stitch/l_epicerie_douce/DESIGN.md`  
Palette "L'Épicerie Douce" — sage green (#51644f), crèmes neutres, accents chauds.

---

## 5. Périmètre MVP (v1.0)

### Inclus

| # | Fonctionnalité | Epic |
|---|----------------|------|
| ✅ | Infrastructure & navigation | EPIC-01 |
| ✅ | Liste de courses unifiée avec agrégation | EPIC-02 |
| ✅ | Bibliothèque de recettes (Jow + manuel) | EPIC-03 |
| ✅ | Planification des repas (vue semaine) | EPIC-04 |
| ✅ | Profils famille + allergènes | EPIC-05 |
| ✅ | Essentiels maison récurrents | EPIC-06 |
| ✅ | Export Apple Reminders + partage texte | EPIC-07 |

### Hors périmètre v1

- Génération de recettes par IA
- Scan de codes-barres
- Intégration livraison (Instacart, Picnic…)
- Gestion d'inventaire / garde-manger
- Application Android (v1 iOS uniquement, Android v2)
- Synchronisation multi-appareils en temps réel (v2)

---

## 6. Expérience utilisateur

### Navigation principale

Bottom navigation bar à 5 onglets :

| Icône | Label | Écran |
|-------|-------|-------|
| `home` | Accueil | Dashboard de la semaine |
| `format_list_bulleted` | Liste | Ma liste unifiée |
| `menu_book` | Recettes | Bibliothèque de recettes |
| `shopping_basket` | Essentiels | Essentiels maison |
| `family_restroom` | Famille | Profils famille |

### Flux principal (happy path)

```
Accueil
  → Planifier les repas de la semaine
      → Choisir/importer des recettes
          → Générer automatiquement la liste
              → Cocher les articles en faisant les courses
                  → Exporter vers Apple Reminders (optionnel)
```

### Principes UX

- **Français uniquement** — toute l'interface est en français
- **Mobile-first** — optimisé pour usage en magasin (une main)
- **Glassomorphisme** — éléments flottants avec flou et opacité (cf. DESIGN.md)
- **Tonal layering** — profondeur par hiérarchie de couleurs, pas d'ombres
- **Typographie éditoriale** — Plus Jakarta Sans (titres), Inter (corps de texte)

---

## 7. Modèle de données (simplifié)

### Recipe
```
id, titre, portions_base, source (jow|manuel), image_url,
ingrédients: [{ nom, quantité, unité, catégorie }],
tags_allergènes: string[],
semaine_active: boolean
```

### FamilyMember
```
id, prénom, type (adulte|enfant|bébé|animal), avatar,
allergènes: string[], préférences: string[], est_organisateur: boolean
```

### ShoppingItem
```
id, nom, quantité, unité, catégorie, statut_acheté,
sources: [{ type: 'recette'|'essentiel', nom: string }]
```

### HouseholdEssential
```
id, nom, marque, quantité, unité, catégorie,
fréquence: 'hebdo'|'mensuel'|'trimestriel'
```

### MealPlan
```
semaine_du: date,
slots: [{ jour, moment: 'déjeuner'|'dîner', recette_id }]
```

---

## 8. Critères de succès (MVP)

- [ ] Un utilisateur peut créer son profil famille en < 3 minutes
- [ ] La liste de courses est auto-générée depuis le plan semaine en 1 tap
- [ ] Les doublons inter-recettes sont fusionnés automatiquement
- [ ] Un article allergène est signalé sur la recette concernée
- [ ] La liste peut être exportée vers Apple Reminders en < 30 secondes
- [ ] L'app fonctionne hors ligne (mode local uniquement pour v1)

---

## 9. Références

- **Design system :** [`stitch/l_epicerie_douce/DESIGN.md`](stitch/l_epicerie_douce/DESIGN.md)
- **Maquettes UI :** Dossier [`stitch/`](stitch/)
- **Roadmap de développement :** [`docs/ROADMAP.md`](docs/ROADMAP.md)
- **Epics détaillés :** [`docs/epics/`](docs/epics/)
