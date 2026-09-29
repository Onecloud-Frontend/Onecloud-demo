/**
 * Canonical ERP Inventory & Stock Management Types
 * Ownership: Team ERP
 */

export interface InventoryItem {
  id: string;
  productId: string;
  warehouseId: string;
  quantityOnHand: number;
  quantityReserved: number;
  quantityAvailable: number;
  quantityInTransit: number;
  averageUnitCost: number;
  lastStockTakeDate: string | null;
  reorderPoint: number;
}

export interface StockRecord {
  id: string;
  productId: string;
  warehouseId: string;
  currentBalance: number;
  updatedDate: string;
}

export interface Batch {
  id: string;
  batchNumber: string;
  productId: string;
  manufactureDate: string;
  expiryDate: string | null;
  quantity: number;
  remainingQuantity: number;
  status: 'AVAILABLE' | 'QUARANTINE' | 'EXPIRED' | 'DEPLETED';
}

export interface SerialNumber {
  id: string;
  serialCode: string;
  productId: string;
  batchId: string | null;
  status: 'IN_STOCK' | 'ALLOCATED' | 'SOLD' | 'RETURNED' | 'DEFECTIVE';
}

export type StockMovementType =
  | 'RECEIPT'
  | 'SHIPMENT'
  | 'TRANSFER_IN'
  | 'TRANSFER_OUT'
  | 'ADJUSTMENT_IN'
  | 'ADJUSTMENT_OUT'
  | 'RETURN';

export interface StockMovement {
  id: string;
  movementCode: string;
  productId: string;
  movementType: StockMovementType;
  quantity: number;
  fromWarehouseId: string | null;
  toWarehouseId: string | null;
  referenceType: 'PURCHASE_ORDER' | 'SALES_ORDER' | 'TRANSFER' | 'ADJUSTMENT';
  referenceId: string;
  movementDate: string;
  performedBy: string;
  remarks?: string;
}

export type StockTransferStatus =
  | 'DRAFT'
  | 'PENDING'
  | 'IN_TRANSIT'
  | 'COMPLETED'
  | 'CANCELLED';

export interface StockTransferItem {
  id: string;
  productId: string;
  quantityRequested: number;
  quantityShipped: number;
  quantityReceived: number;
}

export interface StockTransfer {
  id: string;
  transferNumber: string;
  fromWarehouseId: string;
  toWarehouseId: string;
  requestedDate: string;
  transferDate: string | null;
  status: StockTransferStatus;
  items: StockTransferItem[];
  initiatedBy: string;
  receivedBy: string | null;
}

export type StockAdjustmentReason =
  | 'CYCLE_COUNT'
  | 'DAMAGE'
  | 'THEFT'
  | 'DATA_CORRECTION'
  | 'EXPIRED';

export interface StockAdjustmentItem {
  id: string;
  productId: string;
  currentQuantity: number;
  adjustedQuantity: number;
  difference: number;
  unitCost: number;
  totalCostImpact: number;
}

export interface StockAdjustment {
  id: string;
  adjustmentNumber: string;
  warehouseId: string;
  reason: StockAdjustmentReason;
  adjustmentDate: string;
  items: StockAdjustmentItem[];
  status: 'DRAFT' | 'APPROVED' | 'POSTED' | 'REJECTED';
  approvedBy: string | null;
  createdAt: string;
}

export interface StockCount {
  id: string;
  countCode: string;
  warehouseId: string;
  scheduledDate: string;
  countType: 'FULL' | 'CYCLE' | 'SPOT';
  status: 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED' | 'RECONCILED';
  countedBy: string;
  completedAt: string | null;
}

export interface InventoryReconciliation {
  id: string;
  stockCountId: string;
  totalItemsCounted: number;
  discrepanciesCount: number;
  netVarianceValue: number;
  status: 'PENDING_REVIEW' | 'APPROVED' | 'ADJUSTED';
  reconciledBy: string;
  reconciledAt: string | null;
}

export interface ReorderRule {
  id: string;
  productId: string;
  warehouseId: string;
  minQuantity: number;
  maxQuantity: number;
  reorderPoint: number;
  autoReorder: boolean;
  preferredVendorId: string | null;
}
