export interface IndustrySector {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  keyProcurementNeeds: string[];
  recommendedProductSlugs: string[];
  complianceNotes: string;
  image: string;
}

export const INDUSTRY_SECTORS: IndustrySector[] = [
  {
    id: 'pharma-formulations',
    image: '/assets/photos/pharma-tablets.jpg',
    slug: 'pharmaceuticals-apis',
    title: 'Pharmaceutical Formulations & Life Sciences',
    shortTitle: 'Pharmaceuticals',
    description:
      'Supplying active pharmaceutical ingredients, excipients, antiseptics, and monograph-certified minerals to regulated pharma manufacturers.',
    keyProcurementNeeds: [
      'Monograph compliance with IP / BP / USP',
      'Batch-specific Certificate of Analysis (COA)',
      'High assay and low heavy-metal impurity thresholds',
      'Tamper-evident pharmaceutical packaging',
    ],
    recommendedProductSlugs: [
      'potassium-iodide-ip',
      'iodine-ip',
      'povidone-iodine-ip',
      'potassium-iodate-ip',
      'glycerin-ip-usp-godrej',
      'magnesium-sulphate-ip-supreme',
      'propylene-glycol-ip-usp-manali',
      'starch-ip-sukhjit',
      'zinc-oxide-ip-rubamin',
      'sorbitol-ip-sukhjit',
    ],
    complianceNotes:
      'Every pharmaceutical consignment must be accompanied by batch COA and matched against target formulation specifications.',
  },
  {
    id: 'personal-care-cosmetics',
    image: '/assets/photos/serum-botanical.jpg',
    slug: 'personal-care-cosmetics',
    title: 'Personal Care, Haircare & Cosmeceuticals',
    shortTitle: 'Personal Care & Cosmetics',
    description:
      'Raw materials for shampoos, body washes, skin lotions, ointments, oral care, and dusting powders.',
    keyProcurementNeeds: [
      'Skin-compatible purity and dermatological safety',
      'Consistent active matter in surfactants (28% to 70%)',
      'Clear, odourless emollients and humectants',
      'Micronized mineral powders with smooth sensory profile',
    ],
    recommendedProductSlugs: [
      'light-liquid-paraffin-ip-bp',
      'petroleum-jelly-ip-bp-usp',
      'glycerin-ip-usp-godrej',
      'sles-liquid-28-godrej',
      'sles-paste-70-godrej',
      'aos-38-shree-shyam',
      'talcum-powder-ip-98-neelkanth',
      'zinc-oxide-ip-neelkanth',
    ],
    complianceNotes:
      'Grades selected ensure optimal foaming, emolliency, and stability across cosmetic emulsions.',
  },
  {
    id: 'detergents-cleaning',
    image: '/assets/photos/cleaning.jpg',
    slug: 'detergents-cleaning-sanitation',
    title: 'Detergents, Soaps & Cleaning Solutions',
    shortTitle: 'Detergents & Cleaning',
    description:
      'Bulk surfactant concentrates, sulfonic acid intermediates, and foaming agents for household and institutional cleaning.',
    keyProcurementNeeds: [
      'High-active matter anionic surfactants',
      'Reliable supply of LABSA (90% & 96%)',
      'Effective emulsification and grease-cutting capability',
      'Bulk industrial container supply (250 kg drums)',
    ],
    recommendedProductSlugs: [
      'labsa-90-shree-shyam',
      'labsa-96-shree-shyam',
      'sles-28-shree-shyam',
      'sles-70-shree-shyam',
      'aos-38-shree-shyam',
      'sls-shree-shyam',
      'sls-liquid-28-godrej',
      'caustic-soda',
      'soda-ash',
    ],
    complianceNotes:
      'Active matter and pH parameters are documented for reliable soap and detergent saponification.',
  },
  {
    id: 'industrial-coatings-rubber',
    image: '/assets/photos/process-plant.jpg',
    slug: 'industrial-coatings-rubber',
    title: 'Industrial Manufacturing, Rubber & Coatings',
    shortTitle: 'Industrial & Coatings',
    description:
      'Heavy technical chemicals, vulcanizing activators, resin binders, and solvent thinners.',
    keyProcurementNeeds: [
      'Specific particle size for zinc oxide activation',
      'Pure solvent consistency and controlled evaporation',
      'Natural rosin adhesion and tackifying performance',
      'Consistent technical grade assay for batch stability',
    ],
    recommendedProductSlugs: [
      'zinc-oxide-technical-upper-india',
      'boric-acid',
      'turpentine-oil',
      'rosin-colophony',
      'linseed-oil',
      'castor-oil',
      'potassium-permanganate',
    ],
    complianceNotes:
      'Designated strictly for industrial applications. Clearly segregated from pharmacopoeial grades.',
  },
  {
    id: 'water-agriculture',
    image: '/assets/photos/water.jpg',
    slug: 'water-treatment-agriculture',
    title: 'Water Treatment, Agriculture & Sanitation',
    shortTitle: 'Water & Agriculture',
    description:
      'Oxidizing agents, disinfectants, micronutrient salts, and sanitation bleaching powders.',
    keyProcurementNeeds: [
      'Strong oxidative power for effluent and municipal treatment',
      'Available chlorine potency in bleaching agents',
      'Micronutrient availability (copper, zinc, magnesium)',
      'Safe industrial handling documentation and SDS',
    ],
    recommendedProductSlugs: [
      'potassium-permanganate',
      'copper-sulphate',
      'zinc-sulphate',
      'bleaching-powder',
      'magnesium-sulphate-ip-supreme',
    ],
    complianceNotes:
      'Storage precautions and oxidizer compatibility guidelines must be adhered to.',
  },
];

