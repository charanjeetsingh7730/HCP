import { PRODUCTS } from './products';

export interface ProductCategory {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  longDescription: string;
  iconName: string;
  catalogCount: number;
  highlightProducts: string[];
  image: string;
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: 'pharma-iodine',
    slug: 'pharmaceutical-iodine',
    name: 'Pharmaceutical & Iodine-Related Raw Materials',
    shortName: 'Pharma & Iodine',
    description:
      'High-purity pharmacopoeial raw materials, iodine compounds, and topical antiseptic active ingredients.',
    longDescription:
      'Explore active pharmaceutical ingredients, iodine derivatives, and monograph-compliant excipients meeting Indian Pharmacopoeia (IP) standards for formulation and clinical applications.',
    iconName: 'ShieldCheck',
    catalogCount: 6,
    highlightProducts: ['potassium-iodide-ip', 'iodine-ip', 'povidone-iodine-ip'],
    image: '/assets/photos/pharma-vials.jpg',
  },
  {
    id: 'industrial-salts',
    slug: 'industrial-chemicals-salts',
    name: 'Industrial Chemicals & Inorganic Salts',
    shortName: 'Industrial Salts',
    description:
      'Heavy industrial chemicals, oxidizing agents, metallic sulphates, and zinc compounds for processing and manufacturing.',
    longDescription:
      'Reliable procurement for technical and analytical reagent (AR) grade inorganic salts, oxidizers, and technical minerals supporting rubber, ceramics, water treatment, and metallurgy.',
    iconName: 'FlaskConical',
    catalogCount: 11,
    highlightProducts: ['boric-acid', 'potassium-permanganate', 'zinc-oxide-technical-upper-india'],
    image: '/assets/photos/chemistry-flasks.jpg',
  },
  {
    id: 'surfactants',
    slug: 'surfactants-detergents',
    name: 'Surfactants & Detergent Raw Materials',
    shortName: 'Surfactants & Detergents',
    description:
      'Anionic surfactants, foaming agents, active pastes, and sulfonic acid intermediates for cleaning and formulation.',
    longDescription:
      'Discover high-performance surface-active agents including SLS, SLES (28% liquid & 70% paste), AOS 38%, and LABSA (90% & 96%) sourced from leading producers like Godrej and Shree Shyam Group.',
    iconName: 'Sparkles',
    catalogCount: 9,
    highlightProducts: ['sles-liquid-28-godrej', 'sles-paste-70-godrej', 'labsa-90-shree-shyam'],
    image: '/assets/photos/soap-bars.jpg',
  },
  {
    id: 'personal-care',
    slug: 'personal-care-cosmetics',
    name: 'Personal-Care & Cosmetic Ingredients',
    shortName: 'Personal Care & Cosmetics',
    description:
      'Emollients, humectants, ointment bases, and cosmetic grades for skincare, haircare, and topical formulations.',
    longDescription:
      'Refined petroleum jellies, high-purity glycerin IP/USP, cosmetic talcs, and gentle conditioning components for personal hygiene, cosmeceuticals, and dermatological applications.',
    iconName: 'HeartHandshake',
    catalogCount: 8,
    highlightProducts: ['petroleum-jelly-ip-bp-usp', 'glycerin-ip-usp-godrej', 'talcum-powder-ip-98-neelkanth'],
    image: '/assets/photos/personal-care.jpg',
  },
  {
    id: 'oils-paraffins',
    slug: 'oils-paraffins-lubricants',
    name: 'Oils, Paraffins & Petroleum-Derived Materials',
    shortName: 'Oils & Paraffins',
    description:
      'Mineral oils, liquid paraffins (light & heavy), industrial bio-oils, and hydrocarbon solvents.',
    longDescription:
      'White oils, light and heavy liquid paraffins conforming to IP/BP standards, castor and linseed oils, and specialized solvent media for blending, lubrication, and coatings.',
    iconName: 'Droplets',
    catalogCount: 6,
    highlightProducts: ['light-liquid-paraffin-ip-bp', 'heavy-liquid-paraffin-ip-bp', 'propylene-glycol-ip-usp-manali'],
    image: '/assets/photos/oils.jpg',
  },
  {
    id: 'starches-polymers',
    slug: 'starches-industrial-materials',
    name: 'Starches & Industrial Raw Materials',
    shortName: 'Starches & Binders',
    description:
      'Pharmaceutical binders, disintegrants, natural starches, pine rosins, and bulk alkalis.',
    longDescription:
      'Pharmacopoeial maize starch, tablet disintegrating agents, natural colophony resins, and bulk industrial commodities including caustic soda, soda ash, and bleaching powder.',
    iconName: 'Layers',
    catalogCount: 7,
    highlightProducts: ['starch-ip-sukhjit', 'maize-starch-ip-bluecraft', 'rosin-colophony'],
    image: '/assets/photos/tablet-blister.jpg',
  },
];

// Keep counts in sync with the product master instead of hand-maintained numbers.
PRODUCT_CATEGORIES.forEach((c) => {
  c.catalogCount = PRODUCTS.filter((p) => p.categoryIds.includes(c.id)).length;
});
