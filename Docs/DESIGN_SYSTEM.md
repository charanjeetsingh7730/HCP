# HCP Design System — Premium Gold Brand System & Design Direction (2027)

## 1. Brand Creative Direction
Haryana Chemical and Pharmaceuticals (HCP) is designed as a **premium B2B chemical and pharmaceutical raw material procurement brand**.
The identity combines the visual authority of a luxury corporate brand with the clarity, rigor, and reliability of a professional chemical supplier.

* **Style:** Premium industrial editorial.
* **Hero & Primary Anchors:** Midnight navy backgrounds (`#101722`, `#0B111B`).
* **Visual Accent:** Metallic champagne-gold accents (`#C99A45`, `#E8CC88`, `#F4E7C7`).
* **Content Surfaces:** Warm ivory (`#F7F4EC`) and pure white (`#FFFFFF`).
* **Typography:** Sophisticated serif display typography (*Cormorant Garamond*) paired with modern sans-serif interface typography (*Inter*).
* **Composition:** Precise grids, subtle borders, clean packaging imagery, restrained motion, technical clarity over decorative complexity.

---

## 2. Color System & Semantic Tokens

### Core Brand Palette
| Token Name | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Midnight Navy** | `#101722` | Hero background, main header, key editorial anchors |
| **Deep Navy** | `#0B111B` | Footer, announcement strip, high-contrast modal backdrops |
| **Secondary Navy** | `#182231` | Dark card surfaces, command palette backgrounds, elevated dark zones |
| **Slate Blue** | `#263448` | Muted dark containers, icon wrappers, subtle dark accents |
| **Champagne Gold** | `#C99A45` | Primary brand accent, primary CTA buttons, focus rings, fine rules |
| **Light Gold** | `#E8CC88` | Button hover states, text highlights on dark navy |
| **Pale Gold** | `#F4E7C7` | Warm badge backgrounds, icon container fills, subtle glows |
| **Warm Ivory** | `#F7F4EC` | Primary content surface, readable body backdrop, spec table background |
| **Pure White** | `#FFFFFF` | Product cards, elevated directory containers, input backgrounds |
| **Primary Light Text** | `#F7F4EC` | Main text on midnight and deep navy surfaces |
| **Secondary Light Text** | `#A7B0BD` | Metadata, subtitles, and labels on dark navy |
| **Primary Dark Text** | `#17202C` | Headings and high-contrast body text on light/ivory |
| **Secondary Dark Text** | `#5E6876` | Supporting descriptions, catalog metadata on ivory |
| **Border on Dark** | `#344154` | Thin, restrained borders on dark navy |
| **Border on Light** | `#E4DFD3` | Warm, subtle card and table borders on ivory |
| **Success Green** | `#4E9B79` | Verified supplier badges, RFQ item added status |
| **Error Red** | `#B84C4C` | Form validation error alerts and messages |

### Semantic Tokens (CSS Variables)
```css
:root {
  --background: #F7F4EC;
  --background-elevated: #FFFFFF;
  --surface: #FFFFFF;
  --surface-muted: #F0ECE1;
  --foreground: #17202C;
  --foreground-muted: #5E6876;
  --brand-primary: #101722;
  --brand-accent: #C99A45;
  --brand-accent-hover: #E8CC88;
  --brand-accent-pale: #F4E7C7;
  --border: #E4DFD3;
  --border-dark: #344154;
  --focus-ring: #C99A45;
  --success: #4E9B79;
  --error: #B84C4C;
  --warning: #C99A45;
}
```

---

## 3. Color Proportions
* **50% Warm Ivory & White:** Primary content discovery surfaces, product catalog, specification tables, and enterprise quotation forms.
* **30% Midnight Navy & Deep Navy:** Hero section, navigation bar, footer, and selected trust & procurement highlights.
* **15% Neutral Slate & Muted Tones:** Spec borders, input backgrounds, search drawers.
* **5% Champagne Gold Accent Details:** CTAs, selected active indicators, fine rules, catalog badges, and restrained highlights.

---

## 4. Typography System

### Display & Headlines (*Cormorant Garamond*)
Used for selected hero headlines, short editorial statements, and brand moments:
```css
font-family: 'Cormorant Garamond', Georgia, serif;
```
* **Hero Display:** `clamp(2.5rem, 5vw, 4.5rem)` / line-height: 1.12 / font-weight: 600
* **Section Headings:** `clamp(1.75rem, 3vw, 2.5rem)` / line-height: 1.2 / font-weight: 700

### Interface Typography (*Inter*)
Used for navigation, buttons, product titles, specifications, metadata, forms, and body copy:
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```
* **Body Regular:** `1rem` (16px) / line-height: 1.6
* **Specifications & Metadata:** `0.875rem` (14px) / `0.75rem` (12px)
* **Mono Reference Code:** `ui-monospace`, font-weight: 700, letter-spacing: 0.05em

---

## 5. Logo Usage
* **Primary Mark:** The authentic, high-resolution **Intertwined Metallic Gold HCP Monogram** (`Intertwined Metallic Gold HCP Monogram.png`).
* **Letterforms:** Preserved exactly without distortion or artificial redrawing.
* **Contrast:** Rendered against midnight navy (`#101722`), deep navy (`#0B111B`), and clean ivory surfaces with adequate clear space.
* **Wordmark Pair:** Paired with "Haryana Chemical & Pharmaceuticals" (*Trading • Procurement • Supply*).

---

## 6. Component Design System

### Buttons (`components/ui/Button.tsx`)
* **Primary:** Champagne Gold (`#C99A45`) with Dark Navy text (`#0B111B`), hover to Light Gold (`#E8CC88`).
* **Secondary:** Navy surface with subtle champagne gold border (`border border-hcp-gold/60 text-hcp-gold-light`).
* **Tertiary:** Understated text action with animated chevron arrow.
* **Destructive:** Semantic error red (`#B84C4C`).

### Cards (`components/products/ProductCard.tsx`)
* White surfaces on warm ivory backdrops.
* Thin `#E4DFD3` borders with hover gold emphasis (`hover:border-hcp-gold/60`).
* Authentic extracted container image specimen.
* Catalog number badge with `#0B111B` background and `#E8CC88` text.

### Navigation (`components/layout/Navbar.tsx`)
* Midnight navy backdrop with subtle `#344154` border.
* Metallic Gold Monogram logo.
* Active pill indicator in champagne gold.
* Quick search trigger and primary quote CTA.

### Forms (`components/quotation/QuotationForm.tsx`)
* Accessible champagne gold focus rings (`focus:ring-2 focus:ring-hcp-gold/30 focus:border-hcp-gold`).
* Neutral ivory surfaces.
* Clear validation error text in `#B84C4C`.

---

## 7. Motion & Accessibility Standards
* **WCAG 2.2 AA Contrast:** Dark navy text on champagne gold buttons yields ~6.8:1 contrast; dark text on warm ivory yields ~13.5:1.
* **Separation of Concerns:**
  * **Motion for React (`motion/react`):** Component-level microinteractions, drawer slide-overs, tab switching, hover physics.
  * **GSAP + ScrollTrigger:** Coordinated hero entrance timeline and scroll-linked reveals.
* **Reduced Motion:** Full `prefers-reduced-motion` suppression of transforms and continuous animations.
