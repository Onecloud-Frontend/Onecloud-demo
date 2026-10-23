/**
 * Mock Data — ERP Inventory (ERP-DEV-04)
 * Simulates the backend response shape until the real `/erp/inventory/*` endpoints exist.
 * Replace with live API calls in `inventoryService.ts` once the backend is ready.
 */
import type {
  InventoryItem,
  Batch,
  SerialNumber,
  StockMovement,
  StockAdjustment,
  ReorderRule,
} from '@features/erp/types';

export const mockProductLookup: Record<string, { sku: string; name: string; unit: string }> = {
  'prod-001': { sku: 'ELX-1001', name: 'Wireless Mouse — Model X', unit: 'PIECES' },
  'prod-002': { sku: 'ELX-1002', name: '27" LED Monitor', unit: 'PIECES' },
  'prod-003': { sku: 'FRM-2003', name: 'Paracetamol 500mg (Strip of 10)', unit: 'PACKS' },
  'prod-004': { sku: 'FRM-2004', name: 'Surgical Gloves (Box of 100)', unit: 'BOXES' },
  'prod-005': { sku: 'ELX-1005', name: 'USB-C Charging Cable 1m', unit: 'PIECES' },
};

export const mockWarehouseLookup: Record<string, { code: string; name: string }> = {
  'wh-001': { code: 'WH-BLR-01', name: 'Bangalore Main Warehouse' },
  'wh-002': { code: 'WH-HYD-01', name: 'Hyderabad Regional Hub' },
};

export const mockInventoryItems: InventoryItem[] = [
  { id: 'inv-001', productId: 'prod-001', warehouseId: 'wh-001', quantityOnHand: 420, quantityReserved: 60, quantityAvailable: 360, quantityInTransit: 0, averageUnitCost: 285.5, lastStockTakeDate: '2026-09-15T00:00:00Z', reorderPoint: 100 },
  { id: 'inv-002', productId: 'prod-002', warehouseId: 'wh-001', quantityOnHand: 38, quantityReserved: 10, quantityAvailable: 28, quantityInTransit: 25, averageUnitCost: 9800, lastStockTakeDate: '2026-09-15T00:00:00Z', reorderPoint: 40 },
  { id: 'inv-003', productId: 'prod-003', warehouseId: 'wh-002', quantityOnHand: 1500, quantityReserved: 200, quantityAvailable: 1300, quantityInTransit: 0, averageUnitCost: 18.75, lastStockTakeDate: '2026-09-28T00:00:00Z', reorderPoint: 500 },
  { id: 'inv-004', productId: 'prod-004', warehouseId: 'wh-002', quantityOnHand: 22, quantityReserved: 0, quantityAvailable: 22, quantityInTransit: 0, averageUnitCost: 410, lastStockTakeDate: '2026-09-28T00:00:00Z', reorderPoint: 30 },
  { id: 'inv-005', productId: 'prod-005', warehouseId: 'wh-001', quantityOnHand: 980, quantityReserved: 120, quantityAvailable: 860, quantityInTransit: 0, averageUnitCost: 65, lastStockTakeDate: '2026-09-15T00:00:00Z', reorderPoint: 300 },
];

export const mockBatches: Batch[] = [
  { id: 'batch-001', batchNumber: 'B-FRM2003-0926', productId: 'prod-003', manufactureDate: '2026-06-01T00:00:00Z', expiryDate: '2027-06-01T00:00:00Z', quantity: 2000, remainingQuantity: 1500, status: 'AVAILABLE' },
  { id: 'batch-002', batchNumber: 'B-FRM2004-0812', productId: 'prod-004', manufactureDate: '2025-08-12T00:00:00Z', expiryDate: '2026-11-01T00:00:00Z', quantity: 50, remainingQuantity: 22, status: 'AVAILABLE' },
  { id: 'batch-003', batchNumber: 'B-FRM2003-0225', productId: 'prod-003', manufactureDate: '2025-02-01T00:00:00Z', expiryDate: '2026-10-20T00:00:00Z', quantity: 800, remainingQuantity: 0, status: 'DEPLETED' },
];

export const mockSerialNumbers: SerialNumber[] = [
  { id: 'ser-001', serialCode: 'SN-MON-88291', productId: 'prod-002', batchId: null, status: 'IN_STOCK' },
  { id: 'ser-002', serialCode: 'SN-MON-88292', productId: 'prod-002', batchId: null, status: 'ALLOCATED' },
  { id: 'ser-003', serialCode: 'SN-MON-88293', productId: 'prod-002', batchId: null, status: 'SOLD' },
  { id: 'ser-004', serialCode: 'SN-MON-88294', productId: 'prod-002', batchId: null, status: 'DEFECTIVE' },
];

export const mockStockMovements: StockMovement[] = [
  { id: 'mov-001', movementCode: 'MOV-00981', productId: 'prod-001', movementType: 'RECEIPT', quantity: 200, fromWarehouseId: null, toWarehouseId: 'wh-001', referenceType: 'PURCHASE_ORDER', referenceId: 'po-1042', movementDate: '2026-09-29T10:15:00Z', performedBy: 'ERP-DEV-04', remarks: 'Received against PO-1042' },
  { id: 'mov-002', movementCode: 'MOV-00982', productId: 'prod-003', movementType: 'ADJUSTMENT_OUT', quantity: 800, fromWarehouseId: 'wh-002', toWarehouseId: null, referenceType: 'ADJUSTMENT', referenceId: 'adj-204', movementDate: '2026-10-01T09:00:00Z', performedBy: 'ERP-DEV-04', remarks: 'Batch B-FRM2003-0225 expired — written off' },
  { id: 'mov-003', movementCode: 'MOV-00983', productId: 'prod-005', movementType: 'SHIPMENT', quantity: 150, fromWarehouseId: 'wh-001', toWarehouseId: null, referenceType: 'SALES_ORDER', referenceId: 'so-5521', movementDate: '2026-10-03T14:40:00Z', performedBy: 'system' },
];

export const mockStockAdjustments: StockAdjustment[] = [
  {
    id: 'adj-204',
    adjustmentNumber: 'ADJ-0204',
    warehouseId: 'wh-002',
    reason: 'EXPIRED',
    adjustmentDate: '2026-10-01T09:00:00Z',
    items: [
      { id: 'adj-item-204-1', productId: 'prod-003', currentQuantity: 800, adjustedQuantity: 0, difference: -800, unitCost: 18.75, totalCostImpact: -15000 },
    ],
    status: 'POSTED',
    approvedBy: 'ERP-DEV-04',
    createdAt: '2026-10-01T08:45:00Z',
  },
  {
    id: 'adj-205',
    adjustmentNumber: 'ADJ-0205',
    warehouseId: 'wh-001',
    reason: 'CYCLE_COUNT',
    adjustmentDate: '2026-10-05T11:30:00Z',
    items: [
      { id: 'adj-item-205-1', productId: 'prod-001', currentQuantity: 425, adjustedQuantity: 420, difference: -5, unitCost: 285.5, totalCostImpact: -1427.5 },
    ],
    status: 'DRAFT',
    approvedBy: null,
    createdAt: '2026-10-05T11:30:00Z',
  },
];

export const mockReorderRules: ReorderRule[] = [
  { id: 'reorder-001', productId: 'prod-002', warehouseId: 'wh-001', minQuantity: 20, maxQuantity: 100, reorderPoint: 40, autoReorder: true, preferredVendorId: 'vendor-009' },
  { id: 'reorder-002', productId: 'prod-004', warehouseId: 'wh-002', minQuantity: 10, maxQuantity: 60, reorderPoint: 30, autoReorder: false, preferredVendorId: null },
];