/**
 * Canonical ERP Product & Item Master Types
 * Ownership: Team ERP
 */

import type { CurrencyCode } from '@shared/types';

export type ProductStatus = 'ACTIVE' | 'DISCONTINUED' | 'OUT_OF_STOCK' | 'DRAFT';

export type ProductUnit =
  | 'PIECES'
  | 'BOXES'
  | 'KG'
  | 'GRAMS'
  | 'METERS'
  | 'LITERS'
  | 'PACKS'
  | 'UNITS';

export interface ProductDimensions {
  length: number;
  width: number;
  height: number;
  unit: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  categoryId: string;
  unit: ProductUnit;
  brand?: string;
  barcode?: string;
  hsnCode?: string;
  costPrice: number;
  sellingPrice: number;
  reorderLevel: number;
  reorderQuantity: number;
  taxRate: number;
  status: ProductStatus;
  weight?: number;
  dimensions?: ProductDimensions;
  createdAt: string;
  updatedAt: string;
}

export interface ProductCategory {
  id: string;
  code: string;
  name: string;
  description?: string;
  parentCategoryId: string | null;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface ProductPrice {
  id: string;
  productId: string;
  priceListCode: string;
  currency: CurrencyCode;
  price: number;
  effectiveFrom: string;
  effectiveTo: string | null;
}

export interface ProductReference {
  id: string;
  sku: string;
  name: string;
  sellingPrice: number;
  unit: ProductUnit;
}
