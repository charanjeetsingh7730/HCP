# HCP Business & Content Audit

**Organization:** Haryana Chemical and Pharmaceuticals (HCP)  
**Business Classification:** B2B Chemical & Pharmaceutical Raw Material Discovery, Procurement & Supply  
**Audit Date:** 2026-10-29  
**Auditor:** Principal UX/UI Architect & Lead Systems Engineer  

---

## 1. Files Inspected

| File Path | Type | Size | Purpose & Content | Status |
| :--- | :--- | :--- | :--- | :--- |
| `Docs/HCP_Product_Catalog.pdf` | PDF Document | 1,020,503 bytes (1.02 MB) | 38-page initial product catalog covering 33 distinct chemical & pharmaceutical raw materials. | Audited & Extracted |
| `Docs/HCP_Product_Catalog-1.pdf` | PDF Document | 19,996,127 bytes (19.99 MB) | 38-page product catalog with embedded raster product imagery covering 33 products. Identical textual content to `HCP_Product_Catalog.pdf`. | Audited & Extracted |
| `Docs/HCP_Product_Catalog-2.pdf` | PDF Document | 20,017,017 bytes (20.01 MB) | 45-page expanded master product catalog covering 39 distinct products (including 6 newly added products: Castor Oil, Linseed Oil, Bleaching Powder, Caustic Soda, Sodium Bicarbonate, Soda Ash). Contains 38 embedded raster image objects. | Authoritative Master Inventory |
| `Docs/HCP_Product_Profile-1.docx` | DOCX Document | 1,914,480 bytes (1.91 MB) | Company overview, supply positioning, service region coverage, contact details, "Why Choose HCP" value propositions, and 15 in-depth product profiles with pharmacopoeial supply notes. Includes high-resolution infographic (`image1.png`). | Audited & Extracted |
| `Docs/Intertwined Metallic Gold HCP Monogram.png` | PNG Raster Image | 1,029,905 bytes (1.02 MB) | 1334x1179 high-resolution transparent PNG showing the intertwined metallic gold "HCP" monogram. | Audited & Extracted |

---

## 2. Company Information & Brand Positioning

### Core Business Identity
* **Official Legal/Trade Name:** Haryana Chemical and Pharmaceuticals (HCP)
* **Tagline:** *Quality Chemicals for a Better Tomorrow*
* **Core Business Pillars:** Trading | Procurement | Supply
* **Business Nature:** B2B chemical and pharmaceutical raw material supplier, connecting industrial manufacturers, pharmaceutical formulators, personal-care brands, and commercial buyers with established chemical manufacturers.
* **Service Model:** Inquiry-based procurement, grade verification, batch-specific Certificate of Analysis (COA) support, and scheduled bulk delivery. Not an e-commerce retail store.

### Documented Contact Coordinates
* **Registered Commercial Address:**  
  Plot No. 260, HSIIDC, Alipur Barwala, Panchkula, Haryana 134118, India
* **Primary Enquiry Email:** `haryana.260cp@gmail.com`
* **Direct Commercial Telephone Numbers:**  
  * `+91 9805556667` (9805556667)
  * `+91 8360081008` (8360081008)

### Documented Regional Service Coverage
* **Primary Industrial Hubs:**
  * Panchkula (Haryana)
  * Chandigarh (UT)
  * Derabassi (Punjab)
  * Baddi (Himachal Pradesh)
  * Surrounding North India industrial belts and commercial corridors

### Documented Value Propositions ("Why Choose HCP?")
1. **Trusted Quality from Established Manufacturers:** Sourcing directly from reputable chemical synthesizers and distillers.
2. **Competitive Pricing & Reliable Supply:** Commercial procurement efficiency and regular volume availability.
3. **Timely Delivery Across North India:** Strategic logistics proximity to key pharmaceutical clusters (Baddi, Derabassi, Panchkula).
4. **Comprehensive Grade Range:** Supplying Technical, Industrial, and Pharmacopoeial grades (IP, BP, USP).
5. **Specification & Documentation Support:** Lot-specific COA verification, pharmacopoeial monograph compliance, and technical data sheets.

---

## 3. Catalog Version Reconciliation (33 vs. 39 Products)

### Document Comparison
* **Catalogs 0 and 1 (`HCP_Product_Catalog.pdf` & `-1.pdf`):**
  * 38 pages total.
  * 33 numbered products (Product 01 to 33).
  * Concluded with Product 33: Maize Starch IP (Bluecraft).
* **Catalog 2 (`HCP_Product_Catalog-2.pdf`):**
  * 45 pages total.
  * 39 numbered products (Product 01 to 39).
  * Contains all 33 original products plus 6 additional industrial commodities (Products 34 through 39).

### The 6 Additional Products in Catalog 2:
1. **Product 34:** Castor Oil *(Make: To be confirmed, Grade: To be confirmed)*
2. **Product 35:** Linseed Oil *(Make: To be confirmed, Grade: To be confirmed)*
3. **Product 36:** Bleaching Powder *(Make: To be confirmed, Grade: To be confirmed)*
4. **Product 37:** Caustic Soda *(Make: To be confirmed, Grade: To be confirmed)*
5. **Product 38:** Sodium Bicarbonate *(Make: To be confirmed, Grade: To be confirmed)*
6. **Product 39:** Soda Ash *(Make: To be confirmed, Grade: To be confirmed)*

### Master Inventory Decision
In accordance with instructions, **`HCP_Product_Catalog-2.pdf` serves as the authoritative initial master inventory of 39 verified product records**, while preserving the documented confirmation status (`To be confirmed`) for manufacturers and grades where commercial confirmation is explicitly required.

---

## 4. Key Brand Assets Discovered

1. **Primary HCP Logo:**
   * Found in `HCP_Product_Profile-1.docx` (`image1.png`).
   * Colorway: Deep Industrial Navy (`#123B65` / `#0A2442`) paired with Vibrant Eco-Green (`#2F9B68` / `#45B878`).
   * Structure: Geometric sans-serif "HCP" monogram with fluid leaf/wave dynamic accent across the bottom curve, alongside stacked business name "HARYANA CHEMICAL AND PHARMACEUTICALS" and descriptor "TRADING | PROCUREMENT | SUPPLY".
2. **Metallic Gold Monogram:**
   * Discovered as `Docs/Intertwined Metallic Gold HCP Monogram.png`.
   * Dimensions: 1334x1179 px transparent PNG.
   * Utilization Rule: Reserved strictly for subtle luxury accents, loading watermarks, and security badges; secondary to primary blue/green corporate identity.
3. **Product Profile Infographic:**
   * Discovered inside `HCP_Product_Profile-1.docx` as 1024x1536 px composite.
   * Features genuine product photography for 14 core chemical raw materials, verified brand logos for 8 primary manufacturing partners, and commercial contact layout.
4. **Extracted Packaging Photography:**
   * 38 embedded image XObjects successfully extracted from `HCP_Product_Catalog-2.pdf`.
   * Includes high-resolution photographic evidence of actual industrial packaging:
     * Indo Borax 50kg Technical Boric Acid bags.
     * Shree Shyam Surfactant 250kg industrial drums (SLES 28%, SLES 70%, AOS 38%, Glycerin IP).
     * Manali Petrochemicals 210kg blue drums (Propylene Glycol IP/USP).
     * Proto Chemical pharmaceutical iodine containers.
     * Crystalline and powder laboratory dishes (Magnesium Sulphate, Potassium Permanganate, Zinc Oxide).

---

## 5. Unresolved Document Questions & Boundary Rules

1. **Unconfirmed Manufacturers:** Products 18 (Copper Sulphate), 19 (Zinc Sulphate), 20 (Turpentine Oil), 21 (Rosin Colophony), and Products 34–39 are explicitly marked in the source catalog as `(To be confirmed)`. The website must NOT invent or assume manufacturer partnerships for these items.
2. **Grade Distinction Integrity:** Technical grade products (e.g., Boric Acid Technical, Zinc Oxide Technical) must remain strictly segregated from pharmacopoeial grades (Boric Acid IP, Zinc Oxide IP). The UI must emphasize that technical grades are never interchangeable with pharmaceutical grades.
3. **No Fabricated Data:** Strictly avoid creating artificial pricing, fake stock counters, fabricated customer reviews, or unverified regulatory ISO/GMP certificates not attested in the source documents.

