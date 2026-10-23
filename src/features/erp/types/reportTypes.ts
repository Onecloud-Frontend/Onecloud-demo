import type {
  Delivery,
  FulfillmentOrder,
  InventoryItem,
  Product,
  PurchaseOrder,
  PurchaseRequest,
  Shipment,
  StockMovement,
  Vendor,
  VendorEvaluation,
  Warehouse,
} from './index';

export type ErpReportType =
  | 'inventory-valuation'
  | 'vendor-delivery'
  | 'carrier-turnaround'
  | 'stock-movement'
  | 'profit-loss';

export interface ErpReportFilters {
  from: string;
  to: string;
  warehouseId: string;
  status: string;
  search: string;
}

export interface ErpReportSourceData {
  products: Product[];
  inventory: InventoryItem[];
  warehouses: Warehouse[];
  vendors: Vendor[];
  vendorEvaluations: VendorEvaluation[];
  purchaseOrders: PurchaseOrder[];
  purchaseRequests: PurchaseRequest[];
  fulfillmentOrders: FulfillmentOrder[];
  deliveries: Delivery[];
  shipments: Shipment[];
  stockMovements: StockMovement[];
  profitLoss: ProfitLossData;
}

export interface ErpLayeredChartSeries {
  label: string;
  points: number[];
  color: string;
}

export type ErpLayeredChartData = Record<ErpReportType, ErpLayeredChartSeries[]>;

export interface ErpReportMetric {
  id: string;
  label: string;
  value: string;
  context: string;
  tone: 'green' | 'blue' | 'amber' | 'rose';
}

export interface ErpReportPoint {
  label: string;
  value: number;
}

export interface ErpReportRow {
  id: string;
  date: string;
  primary: string;
  secondary: string;
  warehouse: string;
  quantity: number;
  value: number;
  status: string;
  detail: string;
}

export interface ErpReportResult {
  type: ErpReportType;
  title: string;
  description: string;
  generatedAt: string;
  metrics: ErpReportMetric[];
  chartTitle: string;
  chartPoints: ErpReportPoint[];
  exceptions: string[];
  rows: ErpReportRow[];
  profitLoss?: ProfitLossData;
}

export interface ErpReportRequest {
  type: ErpReportType;
  filters: ErpReportFilters;
}

export interface ProfitLossMonth {
  month: string;
  revenue: number;
  cogs: number;
  net: number;
}

export interface ProfitLossSummary {
  grossSales: number;
  cogs: number;
  grossProfit: number;
  netOperatingProfit: number;
}

export interface ProfitLossData {
  summary: ProfitLossSummary;
  chartData: ProfitLossMonth[];
}