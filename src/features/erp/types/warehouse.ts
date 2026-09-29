/**
 * Canonical ERP Warehouse & Storage Types
 * Ownership: Team ERP
 */

import type { Address } from '@shared/types';

export interface Warehouse {
  id: string;
  code: string;
  name: string;
  address: Address;
  contactPerson?: string;
  phone?: string;
  totalCapacitySquareFeet?: number;
  isMainWarehouse: boolean;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
}

export interface WarehouseZone {
  id: string;
  warehouseId: string;
  zoneCode: string;
  name: string;
  zoneType: 'STORAGE' | 'PICKING' | 'PACKING' | 'RECEIVING' | 'SHIPPING' | 'QUARANTINE';
}

export interface BinLocation {
  id: string;
  zoneId: string;
  binCode: string;
  aisle: string;
  rack: string;
  shelf: string;
  bin: string;
  maxWeightCapacityKg?: number;
  isOccupied: boolean;
}
