# ERP Team Developer Guide — Team 1 (Supply Chain & Operations)

> **AUTHORITATIVE DIRECTIVE FOR ERP-DEV-01 THROUGH ERP-DEV-07:**
> This guide outlines the operational boundaries, canonical contracts, developer allocations, and implementation rules for Team 1.

---

## 1. ERP Purpose

The **ERP / Supply Chain** feature domain powers core enterprise resource management: sourcing materials, managing vendor partnerships, overseeing multi-facility warehouses, maintaining real-time inventory balances, and fulfilling outbound customer sales orders with carrier logistics.

---

## 2. ERP Feature Structure

All ERP development is isolated inside `src/features/erp/`:

```
src/features/erp/
├── pages/                 # Top-level routed pages for the 7 ERP capabilities
│   ├── ERPDashboardPage.tsx      # ERP-DEV-01
│   ├── ProcurementPage.tsx       # ERP-DEV-02
│   ├── VendorManagementPage.tsx  # ERP-DEV-03
│   ├── InventoryPage.tsx         # ERP-DEV-04
│   ├── WarehousePage.tsx         # ERP-DEV-05
│   ├── FulfillmentPage.tsx       # ERP-DEV-06
│   └── ERPReportsPage.tsx        # ERP-DEV-07
├── components/            # Domain components partitioned by capability
│   ├── dashboard/
│   ├── procurement/
│   ├── vendors/
│   ├── inventory/
│   ├── warehouse/
│   └── fulfillment/
├── hooks/                 # Custom React hooks (e.g. useStockLevel, useReorderAlerts)
├── services/              # Domain service clients consuming apiClient
├── types/                 # Canonical ERP TypeScript types (55 types)
└── utils/                 # Unit conversions, tax calculations, SKU formatters
```

---

## 3. ERP Canonical Types (55 Types)

ERP developers must import all domain types directly from `@features/erp/types`:

```typescript
import type {
  Product, ProductCategory, ProductUnit, ProductDimensions, ProductPrice, ProductReference,
  Vendor, VendorContact, VendorEvaluation, VendorContract, VendorReference,
  PurchaseRequest, PurchaseRequestItem, RFQ, RFQItem, VendorQuote, VendorQuoteItem,
  PurchaseOrder, PurchaseOrderItem, PurchaseOrderStatus,
  InventoryItem, StockRecord, Batch, SerialNumber, StockMovement, StockTransfer, StockTransferItem,
  StockAdjustment, StockAdjustmentItem, StockCount, InventoryReconciliation, ReorderRule,
  Warehouse, WarehouseZone, BinLocation,
  SalesOrder, SalesOrderItem, FulfillmentOrder, Delivery, Shipment, Return, ReturnItem
} from '@features/erp/types';
```

---

## 4. ERP Domain Ownership

Team 1 (ERP) is the **exclusive canonical owner** of:
- **Products & Items:** Product SKU, category hierarchy, unit of measure, brand, cost price, selling price, dimensions.
- **Vendors & Suppliers:** Vendor master profile, contact directory, evaluations, contracts.
- **Procurement:** Purchase requests, RFQs, vendor quotes, purchase orders, receiving logs.
- **Inventory:** Real-time stock levels, batch/lot tracking, serialized inventory, stock movements, adjustments, physical counts.
- **Warehouses:** Physical facilities, zones, bin locations, inter-warehouse transfers.
- **Fulfillment:** Sales orders, pick-pack fulfillment tickets, deliveries, outbound carrier shipments, RMA returns.

---

## 5. ERP Cross-Domain Dependencies

### Entities Consumed by ERP (Owned by other teams):
- **Customer** (Owned by CRM): Used in `SalesOrder` (`customerId: string`) and `Return` (`customerId: string`).
- **Employee** (Owned by HRMS): Used as requisition requester (`requestedBy`), PO approver (`approvedBy`), and warehouse staff.
- **Department** (Owned by HRMS): Used in `PurchaseRequest` (`departmentId: string`) to track requesting cost centers.

### ERP Entities Consumed by Other Teams:
- **Product**: Consumed by CRM for sales quotations (`QuotationItem.productId`).
- **Vendor**: Consumed by Finance for accounts payable vendor bills (`VendorBill.vendorId`).
- **PurchaseOrder**: Consumed by Finance for 3-way matching in vendor bills (`VendorBill.purchaseOrderId`).
- **SalesOrder**: Consumed by Finance for accounts receivable invoicing (`CustomerInvoice.salesOrderId`).

---

## 6. ERP Navigation

All 7 ERP capabilities are accessible from the navigation sidebar under the **ERP Domain Accordion**:
- `/erp` (or `/erp/dashboard`) — Executive Supply Chain Dashboard
- `/erp/procurement` — Purchase Requests, RFQs & Purchase Orders
- `/erp/vendors` — Vendor Management & Supplier Scorecards
- `/erp/inventory` — Stock Balances, Movements & Adjustments
- `/erp/warehouse` — Multi-Warehouse Layouts & Inter-Facility Transfers
- `/erp/fulfillment` — Order Fulfillment, Shipments & Returns
- `/erp/reports` — Supply Chain & Inventory Analytics

---

## 7. Developer Allocations & Detailed Responsibilities

### ERP-DEV-01: ERP Dashboard & Overview
- **Route:** `/erp` (and `/erp/dashboard`)
- **Primary Page:** `ERPDashboardPage.tsx`
- **Canonical Types:** `Product`, `Vendor`, `PurchaseOrder`, `SalesOrder`, `InventoryItem`, `Warehouse`, `Delivery`, `Shipment`, `FulfillmentOrder`
- **What You Own:** Executive supply chain KPI cards (Total Open POs, Low Stock SKU Alerts, Pending Deliveries, Order Fulfillment Rate), recent purchase orders table, warehouse capacity gauges.
- **What You Must NOT Modify:** Procurement forms, vendor directories, or warehouse setup pages.

### ERP-DEV-02: Procurement
- **Route:** `/erp/procurement`
- **Primary Page:** `ProcurementPage.tsx`
- **Canonical Types:** `PurchaseRequest`, `PurchaseRequestItem`, `RFQ`, `RFQItem`, `VendorQuote`, `VendorQuoteItem`, `PurchaseOrder`, `PurchaseOrderItem`, `Vendor`, `Product`, `Department`, `Employee`
- **What You Own:** Internal requisition creation and approval, RFQ generation and vendor bidding comparison, purchase order authoring and lifecycle tracking (`DRAFT` → `SENT` → `RECEIVED`).
- **What You Must NOT Modify:** Vendor master directory or warehouse bin assignments.

### ERP-DEV-03: Vendor Management
- **Route:** `/erp/vendors`
- **Primary Page:** `VendorManagementPage.tsx`
- **Canonical Types:** `Vendor`, `VendorContact`, `VendorAddress`, `VendorEvaluation`, `VendorContract`, `VendorReference`
- **What You Own:** Supplier directory grid, vendor onboarding form with GSTIN/PAN validation, supplier evaluation scorecard (quality, delivery, pricing ratings), procurement supply contracts.
- **What You Must NOT Modify:** Purchase order generation or inventory balance tables.

### ERP-DEV-04: Inventory
- **Route:** `/erp/inventory`
- **Primary Page:** `InventoryPage.tsx`
- **Canonical Types:** `Product`, `ProductCategory`, `InventoryItem`, `StockRecord`, `Batch`, `SerialNumber`, `StockMovement`, `StockAdjustment`, `StockAdjustmentItem`, `StockCount`, `InventoryReconciliation`, `ReorderRule`
- **What You Own:** Real-time SKU inventory grid, batch/lot expiration alerts, serial number lookup, manual stock write-offs/adjustments, physical cycle count sheets, inventory reconciliation.
- **What You Must NOT Modify:** Warehouse building layout or outbound carrier shipping dispatch.

### ERP-DEV-05: Warehouse
- **Route:** `/erp/warehouse`
- **Primary Page:** `WarehousePage.tsx`
- **Canonical Types:** `Warehouse`, `WarehouseZone`, `BinLocation`, `StockRecord`, `InventoryItem`, `StockTransfer`, `StockTransferItem`
- **What You Own:** Warehouse facility configuration, storage zones (Picking, Bulk, Quarantine), rack/shelf/bin coordinate visualization, inter-facility stock transfer requests and shipping tracking.
- **What You Must NOT Modify:** Inbound procurement quotes or supplier contracts.

### ERP-DEV-06: Sales Fulfillment / Returns
- **Route:** `/erp/fulfillment`
- **Primary Page:** `FulfillmentPage.tsx`
- **Canonical Types:** `SalesOrder`, `SalesOrderItem`, `FulfillmentOrder`, `Delivery`, `Shipment`, `Return`, `ReturnItem`, `Customer`, `Product`
- **What You Own:** Sales order fulfillment queue, warehouse pick-pack ticket workflow, carrier delivery dispatch with tracking number, customer return authorization (RMA) with condition inspection.
- **What You Must NOT Modify:** CRM quotation authoring or customer billing invoice generation.

### ERP-DEV-07: ERP Reports
- **Route:** `/erp/reports`
- **Primary Page:** `ERPReportsPage.tsx`
- **Canonical Types:** `InventoryItem`, `PurchaseOrder`, `SalesOrder`, `StockMovement`, `VendorEvaluation`
- **What You Own:** Supply chain report filter panel, inventory valuation report, vendor delivery performance audit, carrier turnaround time analytics, export preview tables.
- **What You Must NOT Modify:** Core transaction forms (PO, SO, Inventory Adjustments).

---

## 8. Intra-Team Dependencies (Between ERP Developers)

- **ERP-DEV-02 (Procurement) & ERP-DEV-03 (Vendors):** Procurement PO forms select approved vendors created by ERP-DEV-03.
- **ERP-DEV-02 (Procurement) & ERP-DEV-04 (Inventory):** Goods received from purchase orders increment inventory item balances.
- **ERP-DEV-04 (Inventory) & ERP-DEV-05 (Warehouse):** Inventory balances are partitioned by warehouse ID and bin coordinates.
- **ERP-DEV-06 (Fulfillment) & ERP-DEV-04 (Inventory):** Outbound sales order shipments decrement available inventory balances.
- **ERP-DEV-01 (Dashboard) & ERP-DEV-07 (Reports):** Aggregate and present summary information across all capabilities.

---

## 9. Integration Points with CRM and Finance

1. **CRM Quotation to ERP Sales Order:** When a CRM quotation is accepted, an ERP `SalesOrder` is created referencing `quotationId` and `customerId`.
2. **ERP Purchase Order to Finance Vendor Bill:** When goods are received in ERP, Finance creates a `VendorBill` matching against `purchaseOrderId` and `vendorId`.
3. **ERP Sales Order to Finance Customer Invoice:** When an order is fulfilled and shipped, Finance issues a `CustomerInvoice` referencing `salesOrderId`.

---

## 10. ERP-Specific UI Expectations

- **Dense Enterprise Grids:** Use compact, readable table padding suitable for heavy stock and order lists.
- **Status Badges:**
  - `APPROVED` / `RECEIVED` / `ACTIVE` → Success (Green)
  - `PENDING_APPROVAL` / `IN_TRANSIT` / `PROCESSING` → Warning (Amber)
  - `REJECTED` / `CANCELLED` / `DISCONTINUED` → Error (Red)
  - `DRAFT` → Neutral (Gray)
- **Numeric Alignment:** Align unit costs, stock quantities, and total order amounts to the right.
- **Batch & Serial Pickers:** Present batch numbers and serials in dedicated expandable modal drawers.

---

## 11. ERP Completion Checklist

- [ ] Assigned page component renders without errors.
- [ ] Canonical ERP types imported from `@features/erp/types`.
- [ ] Zero duplicate interfaces created.
- [ ] Loading skeleton, empty state, and error handling implemented.
- [ ] Search by SKU, order number, or vendor name functional.
- [ ] Category and status filtering functional.
- [ ] `npm.cmd run typecheck` passes with 0 errors.
- [ ] `npm.cmd run build` passes with 0 errors.
- [ ] Feature branch `feature/erp-<module>` created with conventional commits.