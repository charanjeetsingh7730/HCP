export interface CompanyInfo {
  name: string;
  legalName: string;
  tagline: string;
  pillars: string[];
  description: string;
  address: {
    plot: string;
    industrialArea: string;
    locality: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    formatted: string;
  };
  contact: {
    email: string;
    phoneNumbers: string[];
    phoneDisplay: string[];
  };
  serviceRegions: {
    primaryHubs: string[];
    description: string;
  };
  disclaimer: string;
}

export const HCP_COMPANY: CompanyInfo = {
  name: 'HCP',
  legalName: 'Haryana Chemical and Pharmaceuticals',
  tagline: 'Quality Chemicals for a Better Tomorrow',
  pillars: ['Trading', 'Procurement', 'Supply'],
  description:
    'Haryana Chemical and Pharmaceuticals (HCP) is a trading and procurement firm supplying chemical and pharmaceutical raw materials from established manufacturers to industrial, pharmaceutical, personal-care and commercial buyers.',
  address: {
    plot: 'Plot No. 260',
    industrialArea: 'HSIIDC',
    locality: 'Alipur Barwala',
    city: 'Panchkula',
    state: 'Haryana',
    postalCode: '134118',
    country: 'India',
    formatted: 'Plot No. 260, HSIIDC, Alipur Barwala, Panchkula, Haryana 134118',
  },
  contact: {
    email: 'haryana.260cp@gmail.com',
    phoneNumbers: ['9805556667', '8360081008'],
    phoneDisplay: ['+91 98055-56667', '+91 83600-81008'],
  },
  serviceRegions: {
    primaryHubs: ['Panchkula', 'Chandigarh', 'Derabassi', 'Baddi'],
    description:
      'Serving industrial formulators and commercial buyers across Panchkula, Chandigarh, Derabassi, Baddi and surrounding North India industrial corridors.',
  },
  disclaimer:
    'Uses shown are general application examples, not a guarantee of suitability for every formulation. Product availability, manufacturer association, grade and specifications should be reconfirmed at the time of enquiry.',
};

