

export type ERPOrderStatus ='PENDING'
  | 'APPROVED'
  | 'PROCESSING'
  | 'RECEIVED'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED';

export type ERPAlertSeverity = 'critical' | 'warning' | 'info';

export type ERPActivityType =
  | 'purchase_order'
  | 'stock_movement'
  | 'shipment'
  | 'delivery'
  | 'sales_order';

export interface ERPDashboardKpis {
  totalOpenPOs: number;
  openPOChange: number;
  lowStockSkus: number;
  criticalStockItems: number;
  pendingDeliveries: number;
  delayedDeliveries: number;
  fulfillmentRate: number;
  fulfillmentChange: number;
}

export interface ERPSupplyChainTrend {
  day: string;
  fulfillmentRate: number;
  onTimeDeliveryRate: number;
}

export interface ERPInventoryOverview {
  totalInventoryValue: number;
  availableValue: number;
  reservedValue: number;
  trend: number[];
}

export interface ERPWarehouseCapacity {
  id: string;
  name: string;
  usedCapacity: number;
  totalCapacity: number;
  utilizationPercentage: number;
}

export interface ERPRecentOrder {
  id: string;
  orderNumber: string;
  type: 'PURCHASE' | 'SALES';
  partyName: string;
  warehouse: string;
  amount: number;
  status: ERPOrderStatus;
  date: string;
}

export interface ERPAlert {
  id: string;
  severity: ERPAlertSeverity;
  title: string;
  description: string;
  module: string;
  count: number;
}

export interface ERPActivity {
  id: string;
  type: ERPActivityType;
  title: string;
  description: string;
  timestamp: string;
}

export interface ERPDashboardData {
  kpis: ERPDashboardKpis;
  supplyChainTrends: ERPSupplyChainTrend[];
  inventory: ERPInventoryOverview;
  warehouses: ERPWarehouseCapacity[];
  recentOrders: ERPRecentOrder[];
  alerts: ERPAlert[];
  activities: ERPActivity[];
}
