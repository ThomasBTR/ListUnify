# Design System Strategy: The Culinary Atelier

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Digital Atelier."** 

Moving away from the sterile, transactional nature of standard utility apps, this system treats grocery management as a curated, editorial experience. It draws inspiration from high-end French lifestyle publications and the warmth of a sun-drenched family kitchen. We break the "template" look by utilizing **intentional asymmetry**, where headers might be off-center and white space is treated as a premium design element rather than "empty" space. By leveraging a high-contrast typography scale—mixing the geometric friendliness of Plus Jakarta Sans with the functional clarity of Inter—we create a rhythmic flow that feels organic and bespoke.

---

## 2. Colors & Surface Philosophy
The palette is rooted in nature, utilizing a muted sage and warm, creamy neutrals to evoke a sense of calm and domesticity.

### The "No-Line" Rule
To maintain a premium, high-end feel, **1px solid borders are strictly prohibited** for sectioning or containment. Boundaries must be defined through background color shifts. For example, a recipe card or list section should be defined by placing a `surface-container-lowest` element against a `surface-container-low` background. 

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of fine stationery. 
*   **Base:** `surface` (#fbf9f5) serves as the canvas.
*   **Sub-sections:** Use `surface-container-low` to define distinct areas of the page.
*   **Interactive Cards:** Use `surface-container-lowest` (pure white) to create a subtle "pop" that feels natural and light.
*   **Nesting:** When nesting elements (e.g., a quantity selector inside a product card), move one step "up" or "down" the container scale to create depth without visual noise.

### The "Glass & Gradient" Rule
Standard flat colors can feel "app-like." To achieve an "Editorial" feel:
*   **Glassmorphism:** Use for floating navigation bars or top headers. Apply `surface` at 80% opacity with a 20px backdrop blur to allow the warm background colors to bleed through.
*   **Signature Textures:** For primary CTAs or empty-state illustrations, use a soft radial gradient transitioning from `primary` (#51644f) to `primary_container` (#d3e8ce). This adds "soul" and a sense of light.

---

## 3. Typography
Typography is our primary tool for expressing the "French Family" warmth.

*   **Display & Headlines (Plus Jakarta Sans):** Used for "Editorial Moments"—welcoming the user, category headers, or recipe titles. The larger scale (`display-lg` at 3.5rem) should be used with generous leading to feel like a magazine cover.
*   **Titles & Body (Inter):** Used for functional clarity. `title-md` is the workhorse for product names, while `body-md` handles descriptions.
*   **Labels (Inter):** Reserved for metadata like "Weight" or "Aisle number." Use `label-md` in `on_surface_variant` to keep the hierarchy clear.

---

## 4. Elevation & Depth
We eschew traditional drop shadows in favor of **Tonal Layering**.

*   **The Layering Principle:** Depth is achieved by "stacking." A `surface-container-lowest` card sitting on a `surface-container-low` background creates a soft, natural lift.
*   **Ambient Shadows:** If a floating element (like a FAB or Tooltip) is required, use an extra-diffused shadow: `box-shadow: 0 12px 32px rgba(81, 100, 79, 0.06);`. Note the use of a tinted shadow (using the `primary` hue) rather than grey, mimicking natural light.
*   **The "Ghost Border" Fallback:** If a container requires definition against a similar background, use a "Ghost Border": `outline-variant` (#b2b2ad) at 15% opacity. Never use 100% opaque lines.

---

## 5. Components

### Buttons
*   **Primary:** Pill-shaped (`full` rounding). Background uses the `primary` color. Text is `on_primary`. Apply a subtle inner-glow (white at 10% opacity) on the top edge to simulate a premium tactile feel.
*   **Secondary:** `primary_container` background with `on_primary_container` text. No border.
*   **Tertiary:** Ghost style. `on_surface` text with no background.

### Cards & Lists
*   **Product Cards:** Use `md` (1.5rem) or `lg` (2rem) corner radii. **Forbid dividers.** Separate list items using the spacing scale (e.g., 1.5rem vertical gap) or alternating between `surface` and `surface-container-low`.
*   **Interactive Chips:** Pill-shaped (`full`). Use `secondary_container` for unselected and `primary` for selected states.

### Input Fields
*   **Text Inputs:** Soft backgrounds (`surface-container-highest`) with `xl` (3rem) rounding. Placeholder text should be `on_surface_variant`. On focus, the background remains, but a 2px "Ghost Border" of `primary` at 40% opacity appears.

### Tooltips & Modals
*   **Modals:** Large `xl` (3rem) top-corner rounding. Use the Glassmorphism rule for the backdrop (a blurred `surface_dim` at 50% opacity) to keep the app feeling "airy" even when a modal is open.

---

## 6. Do's and Don'ts

### Do
*   **Do** use asymmetrical margins. For example, give a header a 32px left margin but a 48px top margin to create a bespoke, editorial rhythm.
*   **Do** use "Sage" as an accent for success states and meaningful highlights, not just for every icon.
*   **Do** prioritize "Breathing Room." If in doubt, add more vertical space between sections.

### Don't
*   **Don't** use pure black (#000000). Always use `on_surface` (#31332f) for text to maintain the "warm" vibe.
*   **Don't** use standard Material Design dividers. They create "visual cages" that break the airy, premium feel.
*   **Don't** use sharp corners. Every element, from images to inputs, must use at least the `sm` (0.5rem) rounding scale to feel approachable and safe for a family context.