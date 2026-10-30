# HCP Routes & Feature Architecture

This document specifies the multi-page route structure, parameters, interactive features, and server components for the Haryana Chemical and Pharmaceuticals website.

---

## 1. Complete Route Specification

| Route | Page Name | Primary Objective & Features | Interactive Components |
| :--- | :--- | :--- | :--- |
| `/` | **Homepage** | Industrial credibility, procurement positioning, quick search bar, category cards, featured verified products, process timeline, North India service region map, FAQ preview, consolidated quote CTA. | GSAP Hero Timeline, beUI Search Bar, Animated Category Cards, Floating Quote Tray. |
| `/products` | **Product Directory** | Complete 39-product verified catalog. Search by name & chemical alias, filter by Category, Grade (IP, BP, USP, Technical), Manufacturer, view toggle (Grid / List), sorting (Name A-Z, Grade, ID), pagination/infinite scroll, URL query state sync (`?category=...&grade=...&q=...`). | beUI Animated Tabs, Filter Drawer (Mobile), Instant Search Input, Multi-select Chips, Clear All Filters. |
| `/products/[slug]` | **Product Details** | Comprehensive individual product profile for every 39 items. Breadcrumb, verified packaging photo / neutral editorial graphic, grade/strength badges, documented preferred make, stated uses, pharmacopoeial supply notes, COA request module, related products in same category, direct quote trigger. | High-res Photo Gallery / Fallback, COA Modal Trigger, Add to Quotation Tray Action, Related Product Carousel. |
| `/categories` | **Category Directory** | Editorial landing page highlighting the 6 primary industry raw material clusters. Product counts per category, typical applications, and direct category explorer links. | Hover Card Shimmers, Staggered Grid Reveal. |
| `/categories/[slug]` | **Category Detail** | Filtered product listing for specific raw material family (e.g. Surfactants, Pharmacopoeial Salts, Paraffins, Starches, Industrial Chemicals). | Category Summary, Filtered Product Cards, Category-specific RFQ Form. |
| `/manufacturers` | **Manufacturer Directory** | Transparent directory of verified partner chemical manufacturers: Indo Borex, Proto Chemical, Savita, Gandhar, Asian, Godrej, Upper India, Rubamin, Supreme, Manali Petrochemicals, Sukhjit Starch, Shree Shyam Group, Neelkanth Jodhpur, Bluecraft Agro. Displays only verified associations. | Manufacturer Filter Cards, Product Association Count. |
| `/manufacturers/[slug]` | **Manufacturer Profile**| Dedicated page for each verified supplier displaying associated catalog products, grades, and specific enquiry trigger. Clearly denotes non-exclusive procurement relationship. | Associated Product Grid, Sourcing Inquiry Action. |
| `/industries` | **Industry Discovery** | Discovery matrix for target industrial sectors: Pharmaceuticals & APIs, Personal Care & Cosmetics, Detergents & Cleaning, Industrial Coatings & Rubber, Food & Agriculture. | Industry Requirement Selector, Sector Product Recommendations. |
| `/about` | **About HCP** | Official trading, procurement, and supply background from DOCX profile. Mission, regional logistics coverage across Panchkula, Chandigarh, Derabassi, Baddi, quality standards, and supplier network. | Visual Timeline, Full Infographic Viewer, Monogram Accent Section. |
| `/request-quote` | **Multi-Product RFQ** | Dedicated enterprise quotation page supporting multiple chemical selections in a single submission. Fields: Company, Buyer Type, City/Country, Phone, Email, Products list with individual Grade, Quantity, Unit, Intended Application, Delivery Location, COA requirement, Specification File Upload. | React Hook Form + Zod, Dynamic Add/Remove Product Rows, Server Action Validation, Submission Reference Generator. |
| `/contact` | **Contact & Coordinates**| Registered office address in Panchkula, direct click-to-call phone lines, direct email links, regional service map, and concise contact form. | Interactive Map Embed, Direct Tel/Mailto buttons, Contact Form. |
| `/faq` | **Frequently Asked Questions** | Procurement procedures, batch COA requests, minimum commercial order quantities, grade verification, packaging formats, and delivery timelines. | beUI Bouncy Animated Accordion, Search Filter within FAQs. |
| `/privacy` | **Privacy Policy** | B2B commercial enquiry data privacy, contact data handling, non-disclosure of buyer formulations, and inquiry retention notice. | Clean Editorial Typography. |
| `/terms` | **Terms & Conditions** | B2B quotation terms, specification reconfirmation clause, pharmacopoeial compliance verification notice, commercial pricing validity. | Structured Legal Provisions. |
| `/thank-you` | **Quotation Confirmation**| Submission acknowledgment displaying unique generated Reference Code (e.g., `HCP-2026-XXXX`), summary of requested chemicals, and follow-up timeline guide. | Reference Code Copy Button, Print Summary, Back to Directory. |

---

## 2. Global Persistent Features

1. **Floating Quotation Tray (beUI Action Bar):**
   * Accessible across all product pages.
   * Allows industrial buyers to click "Add to RFQ" on multiple chemicals while browsing and launch the consolidated quotation form with pre-filled items.
2. **Global Command Palette (`Cmd+K` / `Ctrl+K`):**
   * Modal search palette enabling instant lookup of any chemical by name, alias, grade, or manufacturer.
3. **Announcement Banner:**
   * Restrained top bar communicating regional supply updates (serving Panchkula, Chandigarh, Derabassi, Baddi and North India) with quick COA request link.
4. **Header Navigation:**
   * Full HCP corporate logo, navigation dropdowns, mobile sliding drawer with focus-trapped keyboard navigation.
5. **Toast Notification System (beUI Stack):**
   * Non-intrusive feedback when products are added to inquiry or when actions succeed/fail.

