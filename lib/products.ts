import { PRODUCTS, ProductRecord } from '@/data/products';
import { PRODUCT_CATEGORIES, ProductCategory } from '@/data/categories';
import { MANUFACTURERS, Manufacturer } from '@/data/manufacturers';
import { INDUSTRY_SECTORS, IndustrySector } from '@/data/industries';

import { PRODUCT_FORMULAS } from '@/data/formulas';

const PENDING = /to be confirmed/i;

/** Buyer-facing grade label; catalog placeholders become a clear call to enquire. */
export function displayGrade(product: ProductRecord): string {
  return PENDING.test(product.grade) ? 'Grade on enquiry' : product.grade;
}

/** Buyer-facing manufacturer label. */
export function displayMakes(product: ProductRecord): string {
  const makes = product.preferredMakes.filter((m) => !PENDING.test(m));
  return makes.length ? makes.join(' / ') : 'Confirmed on enquiry';
}

export function getFormula(product: ProductRecord): string | undefined {
  return PRODUCT_FORMULAS[product.slug];
}

export function isPharmaGrade(product: ProductRecord): boolean {
  return /\b(IP|BP|USP)\b/.test(product.grade);
}

export function getAllProducts(): ProductRecord[] {
  return PRODUCTS;
}

export function getProductBySlug(slug: string): ProductRecord | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductById(id: string): ProductRecord | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getProductsByCategory(categoryId: string): ProductRecord[] {
  return PRODUCTS.filter((p) => p.categoryIds.includes(categoryId));
}

export function getProductsByManufacturer(manufacturerSlug: string): ProductRecord[] {
  const m = getManufacturerBySlug(manufacturerSlug);
  if (!m) return [];
  return PRODUCTS.filter((p) => m.associatedProductSlugs.includes(p.slug));
}

export function getRelatedProducts(product: ProductRecord, limit: number = 3): ProductRecord[] {
  const sameCategory = PRODUCTS.filter(
    (p) => p.id !== product.id && p.categoryIds.some((c) => product.categoryIds.includes(c))
  );
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }
  const remaining = PRODUCTS.filter((p) => p.id !== product.id && !sameCategory.includes(p));
  return [...sameCategory, ...remaining].slice(0, limit);
}

export function searchProducts(
  query: string = '',
  categoryFilter?: string,
  gradeFilter?: string,
  manufacturerFilter?: string,
  sortBy: 'name-asc' | 'name-desc' | 'catalog' = 'catalog'
): ProductRecord[] {
  let list = [...PRODUCTS];

  if (query.trim()) {
    const q = query.toLowerCase().trim();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.catalogNumber.includes(q) ||
        p.grade.toLowerCase().includes(q) ||
        p.aliases.some((a) => a.toLowerCase().includes(q)) ||
        p.preferredMakes.some((m) => m.toLowerCase().includes(q)) ||
        p.commonUses.some((u) => u.toLowerCase().includes(q))
    );
  }

  if (categoryFilter && categoryFilter !== 'all') {
    list = list.filter((p) => p.categoryIds.includes(categoryFilter));
  }

  if (gradeFilter && gradeFilter !== 'all') {
    const gf = gradeFilter.toLowerCase();
    if (gf === 'ip') {
      list = list.filter((p) => p.grade.toLowerCase().includes('ip'));
    } else if (gf === 'bp') {
      list = list.filter((p) => p.grade.toLowerCase().includes('bp'));
    } else if (gf === 'usp') {
      list = list.filter((p) => p.grade.toLowerCase().includes('usp'));
    } else if (gf === 'technical') {
      list = list.filter((p) => p.grade.toLowerCase().includes('technical'));
    }
  }

  if (manufacturerFilter && manufacturerFilter !== 'all') {
    list = list.filter((p) =>
      p.preferredMakes.some((m) => m.toLowerCase().includes(manufacturerFilter.toLowerCase()))
    );
  }

  if (sortBy === 'name-asc') {
    list.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'name-desc') {
    list.sort((a, b) => b.name.localeCompare(a.name));
  } else {
    list.sort((a, b) => parseInt(a.catalogNumber, 10) - parseInt(b.catalogNumber, 10));
  }

  return list;
}

export function getAllCategories(): ProductCategory[] {
  return PRODUCT_CATEGORIES;
}

export function getCategoryBySlug(slug: string): ProductCategory | undefined {
  return PRODUCT_CATEGORIES.find((c) => c.slug === slug || c.id === slug);
}

export function getAllManufacturers(): Manufacturer[] {
  return MANUFACTURERS;
}

export function getManufacturerBySlug(slug: string): Manufacturer | undefined {
  return MANUFACTURERS.find((m) => m.slug === slug || m.id === slug);
}

export function getAllIndustries(): IndustrySector[] {
  return INDUSTRY_SECTORS;
}

export function getIndustryBySlug(slug: string): IndustrySector | undefined {
  return INDUSTRY_SECTORS.find((i) => i.slug === slug);
}

