# HCP Open Questions & Commercial Verification Items

This document records genuine commercial ambiguities and missing external configurations identified during the documentation audit.

---

## 1. Unconfirmed Product Manufacturers & Specifications

The following items are officially cataloged in `Docs/HCP_Product_Catalog-2.pdf` as `(To be confirmed)` for manufacturer associations or grades:

1. **Product 18 (Copper Sulphate):**
   * Grade in catalog: `Technical / AR (as required)`.
   * Preferred Make: `(To be confirmed)`.
   * *Action:* Website displays "Manufacturer options confirmed upon enquiry."
2. **Product 19 (Zinc Sulphate):**
   * Grade in catalog: `Technical / AR (as required)`.
   * Preferred Make: `(To be confirmed)`.
   * *Action:* Website displays "Manufacturer options confirmed upon enquiry."
3. **Product 20 (Turpentine Oil):**
   * Grade in catalog: `Technical`.
   * Preferred Make: `(To be confirmed)`.
4. **Product 21 (Rosin / Colophony):**
   * Grade in catalog: `Technical`.
   * Preferred Make: `(To be confirmed)`.
5. **Product 26 (SLS - Shree Shyam Group):**
   * Grade in catalog: `(To be confirmed)` (Powder vs Needle vs Liquid).
6. **Products 34 to 39 (Commodity Raw Materials):**
   * Castor Oil, Linseed Oil, Bleaching Powder, Caustic Soda, Sodium Bicarbonate, Soda Ash.
   * Both preferred make and specific concentration/grade are marked `(To be confirmed)`.
   * *Action:* Detail pages offer grade options (e.g., Flakes vs Lye for Caustic Soda; Light vs Dense for Soda Ash) and prompt buyers to specify target parameters in the quotation form.

---

## 2. External Integration Credentials

The enquiry system supports server-side email dispatch, lead recording, and persistence adapters. The following environment variables must be provisioned for live production deployment:

| Variable | Description | Default / Fallback Behavior |
| :--- | :--- | :--- |
| `ENQUIRY_RECIPIENT_EMAIL` | Destination mailbox for submitted quotation requests. | Defaulted to documented address: `haryana.260cp@gmail.com`. |
| `ENQUIRY_FROM_EMAIL` | Verified sending domain email (e.g. `quotes@hcpchem.com`). | In dev/test mode, simulated logging mode is active. |
| `RESEND_API_KEY` | API Key for Resend transactional email service. | When omitted, enquiries persist to local mock/file store and return reference ID. |
| `NEXT_PUBLIC_SITE_URL` | Canonical production domain URL. | Defaulted to `https://www.hcpchem.com` (configurable). |

---

## 3. Commercial & Regulatory Disclaimers

1. **Non-Exclusivity:** HCP provides procurement and supply support from multiple leading manufacturers (Indo Borex, Godrej, Savita, Proto Chemical, Shree Shyam Group, Manali, Sukhjit, Upper India, Neelkanth, Bluecraft, Rubamin). Unless formally documented, HCP is positioned as a trusted sourcing and procurement specialist rather than an exclusive global distributor.
2. **Monograph Compliance:** Pharmaceutical buyers must verify current IP/BP/USP pharmacopoeial monographs and obtain lot-specific Certificates of Analysis (COA) prior to formulating medicinal products.

