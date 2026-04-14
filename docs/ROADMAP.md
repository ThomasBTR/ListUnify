# Roadmap de développement — ListUnify

> **Version :** 1.0 MVP  
> **Workflow :** Pour chaque epic, Claude présente un plan détaillé → validation → développement  
> **Référence stack :** React Native + Expo + NativeWind + Expo Router + Zustand

---

## Vue d'ensemble

```
Phase 1  ████░░░░░░░░  EPIC-01 — Infrastructure & Navigation
Phase 2  ░░░░████████░  EPIC-03 → EPIC-02 — Recettes + Liste
Phase 3  ░░░░░░░░████░  EPIC-05 — Famille & Profils
Phase 4  ░░░░░░░░░░██░  EPIC-04 — Planification Repas
Phase 5  ░░░░░░░░░░░█░  EPIC-06 — Essentiels Maison
Phase 6  ░░░░░░░░░░░░█  EPIC-07 — Export & Partage
```

---

## Phase 1 — Fondations

### EPIC-01 : Infrastructure & Navigation
**Objectif :** App Expo fonctionnelle avec design system et navigation de base  
**Dépendances :** Aucune  
**Livrable :** App avec 5 écrans stubs + bottom nav + top bar + composants UI  

**Features :**
- F1.1 Init projet Expo + Expo Router + TypeScript
- F1.2 NativeWind + tokens couleur "L'Épicerie Douce"
- F1.3 Bottom Navigation Bar (5 onglets)
- F1.4 Top App Bar réutilisable
- F1.5 Composants de base (Pill, Card, Checkbox, Badge, FAB…)

**Critère de sortie :** `npx expo start` → navigation fluide entre les 5 onglets, design system visible

---

## Phase 2 — Core Loop

### EPIC-03 : Gestion des Recettes *(en premier)*
**Objectif :** Bibliothèque de recettes fonctionnelle avec ajout manuel et import Jow  
**Dépendances :** EPIC-01  
**Livrable :** CRUD recettes complet + détail avec ajusteur de portions  

**Features :**
- F3.1 Écran bibliothèque (liste, search, filtres)
- F3.2 Filtres "Cette semaine / Favoris / Toutes"
- F3.3 Recherche locale en temps réel
- F3.4 Import depuis Jow (URL)
- F3.5 Ajout manuel (formulaire)
- F3.6 Détail recette (hero, portions, ingrédients)
- F3.7 "Ajouter à ma liste" (CTA)
- F3.8 Note d'agrégation sur les ingrédients

**Critère de sortie :** Créer/importer une recette → la voir en détail → l'ajouter à la liste

---

### EPIC-02 : Liste de Courses Unifiée *(après EPIC-03)*
**Objectif :** Liste agrégée et interactive, principale interface de courses  
**Dépendances :** EPIC-01, EPIC-03  
**Livrable :** Liste avec catégories, fusion doublons, checkboxes, partage texte  

**Features :**
- F2.1 Écran liste avec bannière récapitulative
- F2.2 Sections catégorie collapsibles
- F2.3 Items avec checkbox, quantité, tag source
- F2.4 Fusion automatique des doublons inter-recettes
- F2.5 Marquage article acheté (persisté)
- F2.6 Partage en texte brut

**Critère de sortie :** Ajouter 2 recettes avec un ingrédient commun → une seule ligne dans la liste

---

## Phase 3 — Profils & Personnalisation

### EPIC-05 : Famille & Profils
**Objectif :** Configurer la composition famille, allergènes, et préférences  
**Dépendances :** EPIC-01  
**Livrable :** Gestion complète des membres famille + signalement allergènes sur recettes  

**Features :**
- F5.1 Écran Ma Famille avec sélecteur de profil
- F5.2 Fiche profil membre (type, icône, badge)
- F5.3 Allergènes par profil
- F5.4 Préférences alimentaires
- F5.5 Badge compatibilité sur les recettes (⚠/✓)
- F5.6 Configuration portions par défaut
- F5.7 Rôle organisateur (badge ♛)

**Critère de sortie :** Déclarer un allergène sur Léa → badge ⚠ sur la recette "Pâtes carbonara"

---

## Phase 4 — Planification

### EPIC-04 : Planification des Repas
**Objectif :** Vue semaine + génération automatique de la liste depuis le plan  
**Dépendances :** EPIC-01, EPIC-02, EPIC-03, EPIC-05  
**Livrable :** Calendrier semaine interactif + mise à jour auto de la liste  

**Features :**
- F4.1 Vue semaine (7j × 2 slots)
- F4.2 Assigner une recette à un slot (bottom sheet)
- F4.3 Génération auto de la liste depuis le plan
- F4.4 Bannière semaine sur le dashboard
- F4.5 Recalcul portions selon composition famille

**Critère de sortie :** Assigner 3 recettes à la semaine → la liste se génère automatiquement avec tous les ingrédients fusionnés

---

## Phase 5 — Essentiels

### EPIC-06 : Essentiels Maison
**Objectif :** Gérer les articles récurrents et les intégrer automatiquement dans la liste  
**Dépendances :** EPIC-01, EPIC-02  
**Livrable :** CRUD essentiels + ajout auto dans la liste selon fréquence  

**Features :**
- F6.1 Écran Essentiels avec filtres catégorie
- F6.2 Section "À racheter cette semaine"
- F6.3 Liste complète par sous-catégorie
- F6.4 Modèle de données essentiel + logique fréquence
- F6.5 FAB pour ajouter un essentiel
- F6.6 Intégration automatique dans la liste de courses

**Critère de sortie :** Un essentiel "Hebdo" apparaît dans la liste chaque semaine, et disparaît après avoir été acheté

---

## Phase 6 — Intégrations

### EPIC-07 : Export & Partage
**Objectif :** Exporter vers Apple Reminders et partager en texte  
**Dépendances :** EPIC-01, EPIC-02  
**Livrable :** Export complet vers Reminders + share sheet texte  

**Features :**
- F7.1 Bottom sheet d'export
- F7.2 Options Remplacer / Ajouter
- F7.3 Sélection liste destination
- F7.4 Toggle partage avec membre
- F7.5 Récapitulatif avant export
- F7.6 Écran succès post-export
- F7.7 Partage en texte brut (Share.share)

**Critère de sortie :** Exporter 23 articles → ils apparaissent dans l'app Apple Reminders

---

## Tableau récapitulatif

| Epic | Phase | Features | Dépendances |
|------|-------|----------|-------------|
| EPIC-01 Infrastructure | 1 | F1.1–F1.5 | — |
| EPIC-03 Recettes | 2a | F3.1–F3.8 | EPIC-01 |
| EPIC-02 Liste Unifiée | 2b | F2.1–F2.6 | EPIC-01, EPIC-03 |
| EPIC-05 Famille | 3 | F5.1–F5.7 | EPIC-01 |
| EPIC-04 Planification | 4 | F4.1–F4.5 | EPIC-01, 02, 03, 05 |
| EPIC-06 Essentiels | 5 | F6.1–F6.6 | EPIC-01, EPIC-02 |
| EPIC-07 Export | 6 | F7.1–F7.7 | EPIC-01, EPIC-02 |

---

## Workflow de développement

Pour chaque epic, suivre ce processus :

```
1. Claude lit le fichier EPIC-0X-*.md correspondant
2. Claude présente un plan d'implémentation détaillé
3. L'utilisateur valide (ou demande des ajustements)
4. Claude développe les features dans l'ordre listé
5. Claude teste les critères d'acceptation
6. Review et passage à l'epic suivant
```

---

## Références

- **PRD complet :** [`/PRD.md`](../PRD.md)
- **Design system :** [`/stitch/l_epicerie_douce/DESIGN.md`](../stitch/l_epicerie_douce/DESIGN.md)
- **Maquettes UI :** [`/stitch/`](../stitch/)
