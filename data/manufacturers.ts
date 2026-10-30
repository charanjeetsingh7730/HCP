import { PRODUCTS } from './products';

export interface Manufacturer {
  id: string;
  slug: string;
  name: string;
  formalName?: string;
  associationStatus: 'Confirmed Catalog Partner' | 'Documented Brand Source';
  associatedProductSlugs: string[];
  productCount: number;
  overview: string;
  disclaimer: string;
}

export const MANUFACTURERS: Manufacturer[] = [
  {
    id: 'indo-borex',
    slug: 'indo-borex',
    name: 'Indo Borex',
    formalName: 'Indo Borax & Chemicals Ltd.',
    associationStatus: 'Confirmed Catalog Partner',
    associatedProductSlugs: ['boric-acid'],
    productCount: 1,
    overview:
      'Premier Indian manufacturer of boron chemicals, boric acid, and specialized mineral derivatives.',
    disclaimer:
      'HCP procures and supplies authentic Indo Borex products subject to batch availability and specifications.',
  },
  {
    id: 'proto-chemical',
    slug: 'proto-chemical',
    name: 'Proto Chemical',
    formalName: 'Proto Chemical Industries',
    associationStatus: 'Confirmed Catalog Partner',
    associatedProductSlugs: [
      'potassium-iodide-ip',
      'iodine-ip',
      'povidone-iodine-ip',
      'potassium-iodate-ip',
    ],
    productCount: 4,
    overview:
      'Specialized producer of pharmaceutical iodine derivatives, iodates, and antiseptic raw materials.',
    disclaimer:
      'All Proto Chemical supplies are accompanied by manufacturer COA and monograph compliance certificates.',
  },
  {
    id: 'savita',
    slug: 'savita',
    name: 'Savita',
    formalName: 'Savita Oil Technologies Ltd.',
    associationStatus: 'Confirmed Catalog Partner',
    associatedProductSlugs: [
      'light-liquid-paraffin-ip-bp',
      'heavy-liquid-paraffin-ip-bp',
      'petroleum-jelly-ip-bp-usp',
    ],
    productCount: 3,
    overview:
      'Leading manufacturer of high-purity liquid paraffins, pharmaceutical white oils, and petroleum jellies.',
    disclaimer:
      'Grade compliance (IP, BP, USP) confirmed per manufacturing batch and customer specification.',
  },
  {
    id: 'gandhar',
    slug: 'gandhar',
    name: 'Gandhar',
    formalName: 'Gandhar Oil Refinery (India) Ltd.',
    associationStatus: 'Confirmed Catalog Partner',
    associatedProductSlugs: [
      'light-liquid-paraffin-ip-bp',
      'heavy-liquid-paraffin-ip-bp',
      'petroleum-jelly-ip-bp-usp',
    ],
    productCount: 3,
    overview:
      'Global supplier of specialty oils, liquid paraffins, and refined pharmaceutical white oils.',
    disclaimer:
      'Sourced based on buyer viscosity, pharmacopoeial monograph, and volume requirements.',
  },
  {
    id: 'asian',
    slug: 'asian',
    name: 'Asian',
    formalName: 'Asian Oil Company',
    associationStatus: 'Confirmed Catalog Partner',
    associatedProductSlugs: [
      'light-liquid-paraffin-ip-bp',
      'heavy-liquid-paraffin-ip-bp',
      'petroleum-jelly-ip-bp-usp',
    ],
    productCount: 3,
    overview:
      'Established refiner of technical and cosmetic grade mineral oils and petroleum derivatives.',
    disclaimer:
      'Associated in catalog for liquid paraffin and petroleum jelly supply options.',
  },
  {
    id: 'godrej',
    slug: 'godrej',
    name: 'Godrej',
    formalName: 'Godrej Industries Limited (Chemicals)',
    associationStatus: 'Confirmed Catalog Partner',
    associatedProductSlugs: [
      'glycerin-ip-usp-godrej',
      'sls-liquid-28-godrej',
      'sles-liquid-28-godrej',
      'sles-paste-70-godrej',
    ],
    productCount: 4,
    overview:
      'World-class oleochemicals manufacturer producing pure refined glycerin, surfactants (SLS, SLES), and specialty fatty alcohols.',
    disclaimer:
      'Supplied in original manufacturer sealed packaging with batch-specific technical documentation.',
  },
  {
    id: 'upper-india',
    slug: 'upper-india',
    name: 'Upper India',
    formalName: 'Upper India Specialities',
    associationStatus: 'Confirmed Catalog Partner',
    associatedProductSlugs: ['zinc-oxide-technical-upper-india'],
    productCount: 1,
    overview:
      'Specialist manufacturer of technical grade zinc oxide for rubber, ceramic, and industrial coating formulations.',
    disclaimer:
      'Designated for technical applications; not interchangeable with pharmaceutical grade.',
  },
  {
    id: 'rubamin',
    slug: 'rubamin',
    name: 'Rubamin',
    formalName: 'Rubamin Limited',
    associationStatus: 'Confirmed Catalog Partner',
    associatedProductSlugs: ['zinc-oxide-ip-rubamin'],
    productCount: 1,
    overview:
      'Prominent producer of high-purity pharmaceutical grade Zinc Oxide IP meeting strict monograph assays.',
    disclaimer:
      'Sourced for pharmaceutical formulations, topical dermatologicals, and calamine manufacturing.',
  },
  {
    id: 'supreme',
    slug: 'supreme',
    name: 'Supreme',
    formalName: 'Supreme Chemical Industries',
    associationStatus: 'Confirmed Catalog Partner',
    associatedProductSlugs: ['magnesium-sulphate-ip-supreme'],
    productCount: 1,
    overview:
      'Producer of high-purity magnesium salts and pharmaceutical Magnesium Sulphate IP heptahydrate crystals.',
    disclaimer:
      'Batch COA supplied for each delivery confirming pharmacopoeial compliance.',
  },
  {
    id: 'manali',
    slug: 'manali',
    name: 'Manali',
    formalName: 'Manali Petrochemicals Limited',
    associationStatus: 'Confirmed Catalog Partner',
    associatedProductSlugs: ['propylene-glycol-ip-usp-manali'],
    productCount: 1,
    overview:
      'Pioneering Indian petrochemical company and manufacturer of high-purity Propylene Glycol IP/USP.',
    disclaimer:
      'Available in factory sealed 210 kg drums with genuine manufacturer seal and batch test report.',
  },
  {
    id: 'sukhjit',
    slug: 'sukhjit',
    name: 'Sukhjit',
    formalName: 'The Sukhjit Starch & Chemicals Ltd.',
    associationStatus: 'Confirmed Catalog Partner',
    associatedProductSlugs: ['starch-ip-sukhjit', 'sorbitol-ip-sukhjit'],
    productCount: 2,
    overview:
      'One of India’s premier starch and derivative producers, manufacturing pharmaceutical Starch IP and Sorbitol 70% IP.',
    disclaimer:
      'Full pharmacopoeial certification and monograph testing verified per consignment.',
  },
  {
    id: 'shree-shyam-group',
    slug: 'shree-shyam-group',
    name: 'Shree Shyam Group',
    formalName: 'Shreeshyam Surfactant Pvt Ltd / Shreeshyam Glycerine(I.P) Pvt Ltd',
    associationStatus: 'Confirmed Catalog Partner',
    associatedProductSlugs: [
      'sles-28-shree-shyam',
      'sles-70-shree-shyam',
      'sls-shree-shyam',
      'aos-38-shree-shyam',
      'labsa-90-shree-shyam',
      'labsa-96-shree-shyam',
      'glycerin-ip-shree-shyam',
    ],
    productCount: 7,
    overview:
      'Major manufacturer of detergent raw materials, linear alkyl benzene sulfonic acids, concentrated surfactants, and refined glycerin.',
    disclaimer:
      'Procured in industrial drums with manufacturer batch inspection reports.',
  },
  {
    id: 'neelkanth-jodhpur',
    slug: 'neelkanth-jodhpur',
    name: 'Neelkanth Jodhpur',
    formalName: 'Neelkanth Minechem / Neelkanth Chemical Industries',
    associationStatus: 'Confirmed Catalog Partner',
    associatedProductSlugs: [
      'talcum-powder-ip-98-neelkanth',
      'zinc-oxide-ip-neelkanth',
    ],
    productCount: 2,
    overview:
      'Specialized producer of micronized Talcum Powder IP 98% and pharmacopoeial mineral oxides.',
    disclaimer:
      'Strictly verified for cosmetic, pharmaceutical, and baby powder applications.',
  },
  {
    id: 'bluecraft',
    slug: 'bluecraft',
    name: 'Bluecraft',
    formalName: 'Bluecraft Agro Private Limited',
    associationStatus: 'Confirmed Catalog Partner',
    associatedProductSlugs: ['maize-starch-ip-bluecraft'],
    productCount: 1,
    overview:
      'Manufacturer of pure maize starch and agricultural derivatives for pharmaceutical excipients and industrial starching.',
    disclaimer:
      'Sourced in accordance with current Indian Pharmacopoeia monographs.',
  },
  {
    id: 'organic-industry',
    slug: 'organic-industry',
    name: 'Organic Industry / Black Diamonds',
    formalName: 'Organic Industries / Black Diamonds',
    associationStatus: 'Confirmed Catalog Partner',
    associatedProductSlugs: ['potassium-permanganate'],
    productCount: 1,
    overview:
      'Documented suppliers in catalog for industrial and water-treatment potassium permanganate.',
    disclaimer:
      'Strong oxidizer handled according to strict safety protocols and SDS.',
  },
];

// Count only products that exist in the product master.
MANUFACTURERS.forEach((m) => {
  m.productCount = PRODUCTS.filter((p) => m.associatedProductSlugs.includes(p.slug)).length;
});
