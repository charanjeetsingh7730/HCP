# Haryana Chemical and Pharmaceuticals (HCP)
### Premium B2B Chemical Procurement & Product Inquiry Platform
**Tagline:** *Quality Chemicals for a Better Tomorrow*  
**Pillars:** Trading | Procurement | Supply  
**Corporate Desk:** Plot No. 260, HSIIDC, Alipur Barwala, Panchkula, Haryana 134118  

---

## 1. Platform Overview

This website is a production-quality, multi-page B2B chemical and pharmaceutical raw material discovery and quotation portal for **Haryana Chemical and Pharmaceuticals (HCP)**.

**Core Operating Model:**
* **B2B Inquiry-Based:** Sourcing, specification matching, lot-specific Certificate of Analysis (COA) requests, and scheduled freight dispatch.
* **Non-Retail:** There is NO shopping cart, fake pricing, payment gateway, or instant retail checkout.
* **Strict Grade Segregation:** Indian Pharmacopoeia (IP), British Pharmacopoeia (BP), United States Pharmacopeia (USP), and Technical/Industrial grades are strictly segregated with clear warnings that technical grades are never interchangeable with pharmaceutical grades.
* **Verified Inventory:** Houses the complete 39-product reconciled master inventory sourced directly from `Docs/HCP_Product_Catalog-2.pdf` and `Docs/HCP_Product_Profile-1.docx`.

---

## 2. Technology Stack

* **Framework:** Next.js 15 (App Router, Server Components by default, Client Components where interaction requires).
* **Runtimes:** React 19, TypeScript with strict type checking.
* **Styling & Tokens:** Tailwind CSS with centralized industrial design tokens (`#123B65` navy, `#2F9B68` green, `#D4AF37` gold, slate neutrals).
* **Component Motion:** Motion for React (`motion/react`) for UI states, tabs, modals, and toasts.
* **Timeline Animation:** GSAP 3 with ScrollTrigger for coordinated hero entrances and editorial reveals.
* **Form & Validation:** React Hook Form + Zod schema validation.
* **Icons:** Lucide React icons.
* **Persistence & Email Adapter:** Server-side API endpoint (`/api/enquiry`) with local JSON ledger fallback and Resend email integration support.

---

## 3. beUI Component Suite

The platform genuinely incorporates animated UI components following the **beUI** registry architecture (`https://beui.dev`):
1. **beUI Animated Button / Stateful Button:** (`components/ui/Button.tsx`)
   * Spring physics tap and hover scaling, loading spinner transitions, and variant states.
2. **beUI Animated Tabs:** (`components/ui/Tabs.tsx`)
   * Spring-based `layoutId` pill transitions for product category and grade filtering.
3. **beUI Morphing Modal & Dialog:** (`components/ui/Modal.tsx`)
   * Physics-based modal dialogs with backdrop blur, focus trapping, and keyboard `Escape` support.
4. **beUI Bouncy Accordion:** (`components/ui/Accordion.tsx`)
   * Smooth height-animating accordions for technical grade disclosures and FAQs.
5. **beUI Animated Toast Stack:** (`components/ui/Toast.tsx`)
   * Non-intrusive stacking notifications upon RFQ additions and form submissions.
6. **beUI Command Palette:** (`components/ui/CommandPalette.tsx`)
   * `Cmd+K` / `Ctrl+K` global chemical discovery palette with real-time fuzzy matching across 39 products.
7. **beUI Expandable Action Bar / Quotation Tray:** (`components/quotation/QuotationTray.tsx`)
   * Floating bottom action bar allowing industrial buyers to compile multiple chemicals and trigger a consolidated quotation with pre-filled items.

---

## 4. Multi-Page Routes Implemented (78 Static & Dynamic Pages)

1. `/` — **Homepage** (GSAP hero timeline, quick chemical search, category grid, 6 featured products, trust section, procurement process, regional service coverage, FAQ preview, and primary CTA).
2. `/products` — **Product Directory** (Full 39-product catalog, search by name/alias, category filter, grade filter, manufacturer filter, grid/list view toggle, and sorting).
3. `/products/[slug]` — **Product Details** (39 individual SEO-optimized pages with verified packaging photos, documented grades, preferred makes, stated uses, monograph supply notes, COA request module, and related products).
4. `/categories` — **Category Directory** (Landing page covering the 6 core application clusters).
5. `/categories/[slug]` — **Category Detail** (6 dedicated category pages with filtered product grids).
6. `/manufacturers` — **Manufacturer Directory** (Verified producers: Indo Borex, Proto Chemical, Savita, Gandhar, Asian, Godrej, Upper India, Rubamin, Supreme, Manali Petrochemicals, Sukhjit Starch, Shree Shyam Group, Neelkanth Jodhpur, Bluecraft Agro).
7. `/manufacturers/[slug]` — **Manufacturer Profile** (15 individual supplier pages with associated catalog products and non-exclusive procurement disclaimers).
8. `/industries` — **Industry Discovery** (Target sector matrix for Pharma, Cosmetics, Detergents, Industrial Coatings, and Water/Agri).
9. `/about` — **About HCP** (Overview based on DOCX, regional service coverage, and full high-resolution infographic viewer).
10. `/request-quote` — **Dedicated Multi-Item RFQ** (Enterprise quotation form supporting adding and removing multiple chemicals in a single request).
11. `/contact` — **Contact & Coordinates** (Registered Panchkula address, direct phone hotlines, official email, and contact form).
12. `/faq` — **Frequently Asked Questions** (Interactive accordion answering quotation, grades, COA, packaging, and regional delivery).
13. `/privacy` — **Commercial Privacy Policy** (B2B enquiry confidentiality and data handling).
14. `/terms` — **Terms of Quotation** (B2B quotation terms, pricing validity, and specification reconfirmation clause).
15. `/thank-you` — **Confirmation Screen** (Displays generated reference code e.g. `HCP-2026-XXXX`, summary of requested items, and next steps).
16. `/sitemap.xml` & `/robots.txt` — **Automated SEO Engine** (All 78 canonical URLs mapped with priorities).

---

## 5. Development & Build Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run TypeScript strict typecheck
npm run typecheck

# Run production build (compiles all 78 static/dynamic routes)
npm run build

# Start production server
npm start
```

---

## 6. Environment Configuration

To configure live email delivery or production deployment, set the following environment variables in `.env.local`:

```env
# Port & Canonical Site URL
NEXT_PUBLIC_SITE_URL=https://www.hcpchem.com

# Destination email for incoming commercial RFQs (defaulted to catalog address)
ENQUIRY_RECIPIENT_EMAIL=haryana.260cp@gmail.com

# Verified sender email domain
ENQUIRY_FROM_EMAIL=procurement@hcpchem.com

# Resend API Key (Optional: when omitted, enquiries are stored locally in data/submissions.json)
RESEND_API_KEY=
```

---

## 7. Quality Gates & Verification Results

* **TypeScript Strict Check:** `npm run typecheck` passes with **0 errors**.
* **Next.js Production Build:** `npm run build` succeeds and compiles **78 static/dynamic pages**.
* **Automated Schema Validation:** Client and server validation verified for single and multi-item requests.
* **Accessibility Standard:** Target WCAG 2.2 AA (semantic structure, keyboard navigation, visible focus indicators, skip-to-content link, `prefers-reduced-motion` compliance).
* **Responsive Layouts:** Tested across Small mobile (320px), Standard mobile (390px), Tablet (768px), Laptop (1280px), and Wide Desktop (1600px).

