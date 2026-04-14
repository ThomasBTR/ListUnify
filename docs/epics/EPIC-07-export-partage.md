# EPIC-07 — Export & Partage

> **Priorité :** Phase 6 (Intégrations)  
> **Dépendances :** EPIC-01, EPIC-02 (liste de courses)  
> **Maquettes de référence :**  
> - [`stitch/export_confirmation/code.html`](../../stitch/export_confirmation/code.html)  
> - [`stitch/export_success/code.html`](../../stitch/export_success/code.html)

## Objectif

Permettre à l'utilisateur d'exporter sa liste de courses vers Apple Reminders (iOS) et de la partager en texte via le share sheet natif. C'est la porte de sortie de l'app vers les outils existants.

---

## Features

### F7.1 — Bottom Sheet "Exporter vers Rappels"

**Description :** Feuille modale qui s'ouvre depuis le bouton "Exporter vers Rappels" (dashboard et liste).

**Déclenchement :**
- Bouton "Exporter vers Rappels (23)" sur le dashboard
- Bouton "Exporter vers Rappels (23)" en bas de la vue Liste

**Layout de la bottom sheet :**
```
━━━━━━━━━━  ← Drag handle

[🔔] Exporter vers Rappels
     Apple Reminders

○ Remplacer la liste existante  ← sélectionné par défaut
  La liste 'Courses' actuelle sera écrasée.

○ Ajouter à la liste existante

Destination ▾
┌──────────────────────┐
│ Courses              │
└──────────────────────┘

[ ] Partager avec Thomas
    Envoie une invitation de collaboration.

23 articles dans 5 catégories

[Exporter maintenant]
[Annuler]
```

**Critères d'acceptation :**
- [ ] La bottom sheet s'ouvre avec animation slide-up
- [ ] Le drag handle permet de la fermer par glissement
- [ ] Le récapitulatif (N articles, N catégories) est exact
- [ ] "Annuler" ferme la sheet sans action

---

### F7.2 — Options d'export : Remplacer / Ajouter

**Description :** Choix de la stratégie d'export dans Apple Reminders.

**Option 1 — Remplacer la liste existante (défaut) :**
- Description : "La liste 'Courses' actuelle sera écrasée."
- Comportement : Vider la liste Reminders de destination → importer tous les articles

**Option 2 — Ajouter à la liste existante :**
- Description : "Les articles seront ajoutés à la liste existante."
- Comportement : Ajouter les articles sans supprimer ceux existants

**Critères d'acceptation :**
- [ ] Un seul choix sélectionnable à la fois (radio)
- [ ] La description change dynamiquement avec le choix
- [ ] La sélection est mémorisée pour la prochaine ouverture

---

### F7.3 — Sélection de la liste de destination

**Description :** Choisir quelle liste Apple Reminders recevra les articles.

**UI :** Selector dropdown (Picker natif iOS) avec les listes Reminders disponibles.

**Listes disponibles :** Récupérées via l'API EventKit (iOS) lors de l'ouverture de la sheet.

**Listes par défaut (si EventKit indisponible ou refus permission) :**
- Courses
- Maison
- Travail

**Permission iOS :** `NSRemindersUsageDescription` — demandée au premier export.

**Critères d'acceptation :**
- [ ] Les listes Reminders de l'utilisateur sont listées (si permission accordée)
- [ ] Si permission refusée → fallback sur les listes par défaut + bouton "Autoriser l'accès"
- [ ] La dernière liste utilisée est mémorisée

---

### F7.4 — Toggle "Partager avec [membre]"

**Description :** Option pour inviter un membre de la famille à collaborer sur la liste Reminders.

**UI :**
```
[Toggle] Partager avec Thomas
         Envoie une invitation de collaboration.
```

**Comportement :**
- Activé → lors de l'export, une invitation de partage Apple Reminders est envoyée au contact
- Le nom "Thomas" est le premier conjoint (adulte, non-organisateur) de la liste famille
- Si aucun membre approprié → toggle masqué

**Note technique :** La collaboration Apple Reminders utilise `EKCalendar.shareURL` ou le partage via `EventKit`. Si non supporté, ce toggle déclenche simplement un partage iMessage/Mail avec la liste en texte.

**Critères d'acceptation :**
- [ ] Le nom du membre affiché correspond au conjoint configuré dans EPIC-05
- [ ] Le toggle est désactivé par défaut
- [ ] Si aucun adulte non-organisateur → section masquée

---

### F7.5 — Récapitulatif avant export

**Description :** Afficher un résumé clair de ce qui va être exporté avant confirmation.

**Format :**
```
23 articles dans 5 catégories
```

**Détail optionnel (expand) :**
```
· Viande & Poisson : 2 articles
· Fruits & Légumes : 5 articles
· Épicerie : 3 articles
· DPH & Hygiène : 3 articles
· Bébé : 2 articles
```

**Critères d'acceptation :**
- [ ] Le compte d'articles est exact (exclut les articles déjà cochés comme achetés)
- [ ] Le nombre de catégories est exact

---

### F7.6 — Écran de succès post-export

**Description :** Confirmation visuelle après un export réussi.

**Layout :**

```
     ✅

  Exporté avec succès !

  23 articles ont été ajoutés
  à votre liste "Courses"
  dans Apple Reminders.

[Ouvrir Rappels]  [Retour à ma liste]
```

**Comportement :**
- L'écran s'affiche après la fermeture de la sheet d'export
- "Ouvrir Rappels" → deep link vers l'app Apple Reminders (`x-apple-reminder://`)
- "Retour à ma liste" → retour à l'écran liste

**Design :**
- Icône de succès animée (animation Lottie ou SVG simple)
- Fond `surface` avec centrage vertical
- Couleur accent : `primary`

**Critères d'acceptation :**
- [ ] L'écran s'affiche uniquement après un export réussi
- [ ] "Ouvrir Rappels" ouvre l'app Reminders sur iOS
- [ ] "Retour à ma liste" navigue vers l'onglet Liste

---

### F7.7 — Partage en texte brut

**Description :** Partager la liste sous forme de texte simple via le share sheet natif iOS/Android.

**Format du texte partagé :**
```
🛒 Ma liste du 7-13 avril (23 articles)

Viande & Poisson
• Poulet entier — 1,2 kg
• Saumon — 400g

Fruits & Légumes
• Pommes de terre — 500g
• Carottes — 300g
• Oignons — 4 pièces
• Courgettes — 2 pièces
• Ail — 1 tête

...

Via ListUnify 🌿
```

**Déclenchement :** Bouton "Partager en texte" sous le CTA export principal (liste et dashboard).

**Comportement :**
- Appel `Share.share()` de React Native avec le texte formaté
- Les articles déjà achetés sont exclus du partage
- Option dans les réglages : inclure ou exclure les articles achetés

**Critères d'acceptation :**
- [ ] Le share sheet iOS/Android s'ouvre avec le texte pré-formaté
- [ ] Les catégories vides ne s'affichent pas dans le texte
- [ ] Le formatage est lisible et structuré
- [ ] Les articles achetés sont exclus par défaut

---

## Intégration EventKit (iOS)

```ts
// Permissions
import * as Reminders from 'expo-reminders'  // ou API EventKit native

async function exportToReminders(
  items: ShoppingItem[],
  listName: string,
  strategy: 'replace' | 'append'
): Promise<void> {
  const { status } = await Reminders.requestPermissionsAsync()
  if (status !== 'granted') throw new Error('Permission refusée')

  if (strategy === 'replace') {
    await Reminders.clearListAsync(listName)
  }

  for (const item of items) {
    await Reminders.createReminderAsync({
      title: `${item.nom} — ${item.quantité} ${item.unité}`,
      listName,
      notes: item.sources.map(s => s.nom).join(', '),
    })
  }
}
```

**Note :** `expo-reminders` n'est pas un package officiel Expo. L'intégration se fera via un module natif custom ou la bibliothèque `react-native-reminders` si disponible. Fallback : export via iCal/vCard si indisponible.

---

## Fichiers à créer

```
app/
└── export-success.tsx            # Écran succès post-export
components/
├── export/
│   ├── ExportSheet.tsx           # Bottom sheet principale
│   ├── ExportStrategyPicker.tsx  # Radio Remplacer / Ajouter
│   ├── ReminderListPicker.tsx    # Selector liste destination
│   ├── ShareToggle.tsx           # Toggle partage membre
│   └── ExportSummary.tsx         # Récapitulatif N articles / N catégories
utils/
├── exportToReminders.ts          # Intégration EventKit
├── formatShareText.ts            # Formatage texte partage
└── deepLinks.ts                  # Deep links vers Reminders
```

---

## Vérification

1. Depuis la liste → tap "Exporter vers Rappels" → bottom sheet s'ouvre
2. Vérifier le compte : "23 articles dans 5 catégories"
3. Sélectionner "Ajouter à la liste existante" → description mise à jour
4. Tap "Exporter maintenant" → permission demandée → export → écran succès
5. Tap "Ouvrir Rappels" → Apple Reminders s'ouvre sur la liste "Courses"
6. Retour dans l'app → tap "Partager en texte" → share sheet avec texte formaté
