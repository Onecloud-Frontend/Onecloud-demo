/**
 * Canonical ERP Sales Order & Fulfillment Types
 * Ownership: Team ERP
 */

import type { Address, CurrencyCode } from '@shared/types';

export type SalesOrderStatus =
  | 'DRAFT'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'PARTIALLY_FULFILLED'
  | 'FULFILLED'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED';

export interface SalesOrderItem {
  id: string;
  productId: string;
  description: string;
  quantity: number;
  fulfilledQuantity: number;
  unitPrice: number;
  discountAmount: number;
  taxRate: number;
  taxAmount: number;
  totalAmount: number;
}

export interface SalesOrder {
  id: string;
  orderNumber: string;
  customerId: string;
  quotationId: string | null;
  orderDate: string;
  deliveryDueDate: string;
  status: SalesOrderStatus;
  currency: CurrencyCode;
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;
  shippingAddress: Address;
  billingAddress: Address;
  paymentStatus: 'UNPAID' | 'PARTIALLY_PAID' | 'PAID';
  items: SalesOrderItem[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export type FulfillmentStatus =
  | 'ALLOCATED'
  | 'PICKING'
  | 'PACKED'
  | 'READY_FOR_SHIPMENT'
  | 'SHIPPED'
  | 'CANCELLED';

export interface FulfillmentOrder {
  id: string;
  fulfillmentNumber: string;
  salesOrderId: string;
  warehouseId: string;
  status: FulfillmentStatus;
  assignedTo: string | null;
  packedAt: string | null;
  createdAt: string;
}

export interface Delivery {
  id: string;
  deliveryNumber: string;
  fulfillmentOrderId: string;
  carrierName: string;
  trackingNumber?: string;
  scheduledDate: string;
  deliveredDate: string | null;
  recipientName?: string;
  status: 'SCHEDULED' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'FAILED' | 'RETURNED';
}

export interface Shipment {
  id: string;
  shipmentNumber: string;
  carrier: string;
  trackingNumber: string;
  shippingMethod: 'ROAD' | 'AIR' | 'SEA' | 'EXPRESS';
  shippingCost: number;
  estimatedDeliveryDate: string;
  actualDeliveryDate: string | null;
  status: 'CREATED' | 'DISPATCHED' | 'IN_TRANSIT' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'EXCEPTION';
}

export type ReturnReason =
  | 'DEFECTIVE'
  | 'WRONG_ITEM'
  | 'NOT_NEEDED'
  | 'DAMAGED_IN_TRANSIT'
  | 'OTHER';

export type ReturnStatus =
  | 'REQUESTED'
  | 'AUTHORIZED'
  | 'RECEIVED'
  | 'INSPECTED'
  | 'REFUNDED'
  | 'REJECTED';

export interface ReturnItem {
  id: string;
  productId: string;
  quantityReturned: number;
  condition: 'RESALEABLE' | 'DAMAGED' | 'DEFECTIVE';
  refundAmount: number;
}

export interface Return {
  id: string;
  returnNumber: string;
  salesOrderId: string;
  customerId: string;
  reason: ReturnReason;
  status: ReturnStatus;
  items: ReturnItem[];
  createdAt: string;
  updatedAt: string;
}
