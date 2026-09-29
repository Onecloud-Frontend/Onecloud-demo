/**
 * Developer Implementation Workspace Definitions
 * Authoritative registry of ownership, scope, canonical types, and implementation checklists
 * for all 24 frontend developers across Teams 1 through 4.
 */

export interface ScopeItem {
  id: string;
  title: string;
  description: string;
}

export interface CanonicalTypeReference {
  name: string;
  description: string;
}

export interface CrossDomainDependency {
  entity: string;
  ownerDomain: string;
  purpose?: string;
}

export interface DeveloperWorkspaceDefinition {
  developerId: string;
  team: string;
  teamNumber: number;
  domain: 'ERP' | 'CRM' | 'HRMS' | 'Finance';
  domainCategory: 'ERP / Supply Chain' | 'CRM' | 'HRMS' | 'Finance';
  teamBadgeVariant: 'team-a' | 'team-b' | 'team-c' | 'team-d';
  title: string;
  area: string;
  route: string;
  expectedPage: string;
  featureLocation: string;
  description: string;
  responsibility: string;
  responsibilityBullets: string[];
  scope: ScopeItem[];
  canonicalTypes: CanonicalTypeReference[];
  checklist: string[];
  dependencies: CrossDomainDependency[];
  notes: string[];
}

export const WORKSPACE_DEFINITIONS: Record<string, DeveloperWorkspaceDefinition> = {
  "ERP-DEV-01": {
    "developerId": "ERP-DEV-01",
    "team": "Team 1 — ERP",
    "teamNumber": 1,
    "domain": "ERP",
    "domainCategory": "ERP / Supply Chain",
    "teamBadgeVariant": "team-a",
    "title": "ERP Dashboard & Overview",
    "area": "Executive ERP Dashboard & Supply Chain KPIs",
    "route": "/erp",
    "expectedPage": "ERPDashboardPage.tsx",
    "featureLocation": "src/features/erp/",
    "description": "High-level operational overview, supply chain KPI aggregations, cross-module activity status, and critical alerts.",
    "responsibility": "Build the executive supply chain dashboard, operational KPI summary cards, high-level procurement/inventory widgets, and pending alert badges.",
    "responsibilityBullets": [
      "Executive supply chain operational dashboard",
      "Operational KPI summary cards (Total Open POs, Low Stock SKU Alerts, Pending Deliveries, Order Fulfillment Rate)",
      "Recent purchase orders and sales orders overview widget",
      "Warehouse capacity and inventory utilization gauges",
      "Pending alert badges and cross-module activity status stream"
    ],
    "scope": [
      {
        "id": "01",
        "title": "Executive Overview",
        "description": "Top-level supply chain health score, active orders, and fulfillment velocity."
      },
      {
        "id": "02",
        "title": "Operational KPI Aggregation",
        "description": "Live KPI cards for procurement volume, inventory valuation, and pending shipments."
      },
      {
        "id": "03",
        "title": "Cross-Module Activity Stream",
        "description": "Chronological feed of purchase orders, stock movements, and delivery milestones."
      },
      {
        "id": "04",
        "title": "Alerts & Exception Summary",
        "description": "Visual exception indicators for low-stock thresholds, delayed shipments, and unapproved POs."
      }
    ],
    "canonicalTypes": [
      {
        "name": "Product",
        "description": "Canonical item/SKU master record with pricing and reorder levels"
      },
      {
        "name": "Vendor",
        "description": "Supplier/vendor business profile and contact details"
      },
      {
        "name": "PurchaseOrder",
        "description": "Official purchase order issued to an approved supplier"
      },
      {
        "name": "SalesOrder",
        "description": "Confirmed customer sales order ready for warehouse fulfillment"
      },
      {
        "name": "InventoryItem",
        "description": "Real-time stock balance, reserved qty, and cost for SKU at a warehouse"
      },
      {
        "name": "Warehouse",
        "description": "Physical warehouse storage facility master record and capacity"
      },
      {
        "name": "Delivery",
        "description": "Customer shipment delivery dispatch note and courier tracking"
      },
      {
        "name": "Shipment",
        "description": "Outbound logistics cargo consignment tracking details"
      },
      {
        "name": "FulfillmentOrder",
        "description": "Warehouse pick-pack-ship fulfillment progress order"
      }
    ],
    "checklist": [
      "Page layout and responsive grid structure",
      "Primary page header with quick filter actions",
      "Supply chain KPI metric summary cards",
      "Recent purchase orders & sales orders overview table",
      "Warehouse capacity utilization gauges",
      "Alerts & exception notification tray",
      "Loading state (LoadingState)",
      "Empty state (EmptyState)",
      "Error state (ErrorState)",
      "Responsive behavior across desktop & mobile breakpoints",
      "Accessibility & keyboard navigation",
      "Integration with canonical ERP types",
      "Integration with existing mock layer (@mock/erp)"
    ],
    "dependencies": [
      {
        "entity": "Customer",
        "ownerDomain": "CRM",
        "purpose": "Sales order buyer reference"
      },
      {
        "entity": "Employee",
        "ownerDomain": "HRMS",
        "purpose": "Purchasing agent reference"
      }
    ],
    "notes": [
      "Use canonical ERP types from @features/erp/types.",
      "Use existing shared components from @shared/components.",
      "Use the existing mock infrastructure (@mock/erp) for frontend development.",
      "Keep business logic within the ERP feature boundary.",
      "Do not create duplicate shared entities or competing type definitions.",
      "Keep backend integration separate from UI implementation.",
      "Follow the common developer guide and ERP team guide.",
      "Do not create duplicate shared entities or modify warehouse/vendor setup screens."
    ]
  },
  "ERP-DEV-02": {
    "developerId": "ERP-DEV-02",
    "team": "Team 1 — ERP",
    "teamNumber": 1,
    "domain": "ERP",
    "domainCategory": "ERP / Supply Chain",
    "teamBadgeVariant": "team-a",
    "title": "Procurement",
    "area": "Purchase Requests, RFQs & Bidding Comparison",
    "route": "/erp/procurement",
    "expectedPage": "ProcurementPage.tsx",
    "featureLocation": "src/features/erp/",
    "description": "Departmental purchase requisitions, Request for Quotation (RFQ) tenders, vendor quote comparisons, and purchase orders.",
    "responsibility": "Build internal purchase requisitions, RFQ tenders, supplier quote bidding comparison, and managerial procurement approvals.",
    "responsibilityBullets": [
      "Departmental purchase requisition creation and approval workflow",
      "Request for Quotation (RFQ) authoring and dispatch to multiple vendors",
      "Vendor bid quote intake and side-by-side pricing comparison matrix",
      "Purchase order authoring and lifecycle tracking (DRAFT → SENT → RECEIVED)"
    ],
    "scope": [
      {
        "id": "01",
        "title": "Purchase Requisitions",
        "description": "Internal requisition creation, line item entry, and multi-tier approval workflow."
      },
      {
        "id": "02",
        "title": "RFQ Tenders",
        "description": "Request for Quotation authoring, item specifications, bid submission deadlines, and vendor selection."
      },
      {
        "id": "03",
        "title": "Vendor Quote Comparison",
        "description": "Side-by-side bidding comparison matrix evaluating unit price, delivery lead time, and warranty."
      },
      {
        "id": "04",
        "title": "Purchase Order Lifecycle",
        "description": "Formal PO generation from awarded bids with delivery schedule tracking."
      }
    ],
    "canonicalTypes": [
      {
        "name": "PurchaseRequest",
        "description": "Departmental purchase requisition submitted for procurement approval"
      },
      {
        "name": "PurchaseRequestItem",
        "description": "Line item inside an internal material purchase request"
      },
      {
        "name": "RFQ",
        "description": "Request for Quotation issued to multiple prospective vendors"
      },
      {
        "name": "RFQItem",
        "description": "Product specification line item included in an RFQ tender"
      },
      {
        "name": "VendorQuote",
        "description": "Vendor formal bid quotation received in response to an RFQ"
      },
      {
        "name": "VendorQuoteItem",
        "description": "Priced quotation item submitted by a bidder in response to an RFQ"
      },
      {
        "name": "PurchaseOrder",
        "description": "Official purchase order issued to an approved supplier"
      },
      {
        "name": "PurchaseOrderItem",
        "description": "Line item on a purchase order tracking quantity, cost, and tax"
      }
    ],
    "checklist": [
      "Page layout and responsive structure",
      "Primary page header with New Requisition action",
      "Purchase requisitions tab & status filter",
      "RFQ management table and bid status badges",
      "Side-by-side vendor quote comparison modal/view",
      "Purchase order authoring drawer and line item calculator",
      "Form validation on requisition and PO forms",
      "Loading, empty, and error states",
      "Integration with canonical ERP types",
      "Integration with existing mock layer (@mock/erp)"
    ],
    "dependencies": [
      {
        "entity": "Department",
        "ownerDomain": "HRMS",
        "purpose": "Requisition requesting department"
      },
      {
        "entity": "Employee",
        "ownerDomain": "HRMS",
        "purpose": "Requester and procurement approver"
      },
      {
        "entity": "Vendor",
        "ownerDomain": "ERP",
        "purpose": "Supplier profile"
      }
    ],
    "notes": [
      "Use canonical ERP types from @features/erp/types.",
      "Use existing shared components from @shared/components.",
      "Use the existing mock infrastructure (@mock/erp) for frontend development.",
      "Keep business logic within the ERP feature boundary.",
      "Do not create duplicate shared entities or competing type definitions.",
      "Keep backend integration separate from UI implementation.",
      "Follow the common developer guide and ERP team guide.",
      "Consume Department and Employee from @shared/types / HRMS canonical types.",
      "Do not modify the vendor master directory or warehouse bin setups."
    ]
  },
  "ERP-DEV-03": {
    "developerId": "ERP-DEV-03",
    "team": "Team 1 — ERP",
    "teamNumber": 1,
    "domain": "ERP",
    "domainCategory": "ERP / Supply Chain",
    "teamBadgeVariant": "team-a",
    "title": "Vendor Management",
    "area": "Supplier Master Directory, Evaluations & Contracts",
    "route": "/erp/vendors",
    "expectedPage": "VendorManagementPage.tsx",
    "featureLocation": "src/features/erp/",
    "description": "Supplier directory grid, vendor onboarding, performance scorecards, and procurement supply contracts.",
    "responsibility": "Build the supplier master directory, vendor contact profiles, supplier performance scorecards, and procurement supply agreements.",
    "responsibilityBullets": [
      "Supplier master directory grid with search, filtering, and categorization",
      "Vendor onboarding wizard with GSTIN/PAN and compliance verification",
      "Supplier periodic evaluation scorecard (quality, delivery punctuality, pricing competitiveness)",
      "Procurement supply contracts repository with duration and SLA tracking"
    ],
    "scope": [
      {
        "id": "01",
        "title": "Supplier Master Directory",
        "description": "Paginated list of active vendors with category, status, and spend badges."
      },
      {
        "id": "02",
        "title": "Vendor Onboarding & Profile",
        "description": "Multi-step onboarding form with tax identifier validation and contact management."
      },
      {
        "id": "03",
        "title": "Performance Evaluation Scorecards",
        "description": "Periodic audit ratings measuring defect rate, on-time delivery, and responsiveness."
      },
      {
        "id": "04",
        "title": "Procurement Contracts",
        "description": "Supply agreement repository tracking validity dates, minimum order quantities, and penalty clauses."
      }
    ],
    "canonicalTypes": [
      {
        "name": "Vendor",
        "description": "Canonical supplier/vendor business profile and master record"
      },
      {
        "name": "VendorContact",
        "description": "Supplier primary and secondary contact person details"
      },
      {
        "name": "VendorAddress",
        "description": "Supplier registered office or dispatch address alias"
      },
      {
        "name": "VendorEvaluation",
        "description": "Supplier periodic scorecard assessment (quality, delivery, pricing)"
      },
      {
        "name": "VendorContract",
        "description": "Legal procurement supply agreement contract with duration and value"
      },
      {
        "name": "VendorReference",
        "description": "Lightweight vendor display snapshot for cross-domain usage"
      }
    ],
    "checklist": [
      "Page layout and responsive table view",
      "Primary page header with Add Vendor action",
      "Search bar and category filter (Raw Materials, Services, Logistics)",
      "Vendor detail drawer / 360 profile view",
      "Onboarding modal with GSTIN/PAN form validation",
      "Evaluation scorecard rating widget",
      "Active contracts tab with expiration badges",
      "Loading, empty, and error states",
      "Integration with canonical ERP types",
      "Integration with existing mock layer (@mock/erp)"
    ],
    "dependencies": [
      {
        "entity": "Address",
        "ownerDomain": "Shared",
        "purpose": "Supplier registered and billing addresses"
      }
    ],
    "notes": [
      "Use canonical ERP types from @features/erp/types.",
      "Use existing shared components from @shared/components.",
      "Use the existing mock infrastructure (@mock/erp) for frontend development.",
      "Keep business logic within the ERP feature boundary.",
      "Do not create duplicate shared entities or competing type definitions.",
      "Keep backend integration separate from UI implementation.",
      "Follow the common developer guide and ERP team guide.",
      "Ensure GSTIN and PAN validation rules adhere to Indian enterprise tax formats.",
      "Do not author POs directly; provide VendorReference for procurement use."
    ]
  },
  "ERP-DEV-04": {
    "developerId": "ERP-DEV-04",
    "team": "Team 1 — ERP",
    "teamNumber": 1,
    "domain": "ERP",
    "domainCategory": "ERP / Supply Chain",
    "teamBadgeVariant": "team-a",
    "title": "Inventory",
    "area": "Stock Balances, Batch Tracking & Adjustments",
    "route": "/erp/inventory",
    "expectedPage": "InventoryPage.tsx",
    "featureLocation": "src/features/erp/",
    "description": "Real-time warehouse SKU stock levels, lot/batch tracking, serialized items, manual inventory adjustments, and physical counting.",
    "responsibility": "Build real-time warehouse SKU stock levels, lot/batch tracking, serialized items, manual inventory adjustments, and periodic physical counting.",
    "responsibilityBullets": [
      "Real-time SKU inventory grid with available, reserved, and on-order quantities",
      "Production batch and lot expiration tracking with shelf-life alerts",
      "Individual serialized unit tracking for warranty and trace",
      "Manual stock adjustments (write-offs, damage, gains) with audit justification",
      "Physical stock counting and post-count reconciliation worksheets"
    ],
    "scope": [
      {
        "id": "01",
        "title": "SKU Stock Balance Grid",
        "description": "Multi-warehouse inventory balance viewer with low-stock badges and unit costs."
      },
      {
        "id": "02",
        "title": "Batch & Lot Management",
        "description": "Manufacturing batch tracker with expiration countdown and quarantine flags."
      },
      {
        "id": "03",
        "title": "Serial Number Tracking",
        "description": "Serialized unit lookup with warranty status and movement history."
      },
      {
        "id": "04",
        "title": "Stock Adjustments & Write-Offs",
        "description": "Form for manual quantity adjustments with reason classification and cost impact."
      },
      {
        "id": "05",
        "title": "Stock Counting & Reconciliation",
        "description": "Physical cycle count entry and variance reconciliation worksheet."
      }
    ],
    "canonicalTypes": [
      {
        "name": "Product",
        "description": "Canonical item/SKU master record with pricing and reorder policies"
      },
      {
        "name": "InventoryItem",
        "description": "Real-time stock balance, reserved qty, and cost for SKU at a warehouse"
      },
      {
        "name": "StockRecord",
        "description": "Historical stock balance snapshot for audit reconciliation"
      },
      {
        "name": "Batch",
        "description": "Production batch/lot tracker with manufacturing and expiration dates"
      },
      {
        "name": "SerialNumber",
        "description": "Individual serialized unit tracking for warranty and trace"
      },
      {
        "name": "StockMovement",
        "description": "Detailed inventory transaction audit log recording stock mutations"
      },
      {
        "name": "StockAdjustment",
        "description": "Formal inventory write-off or write-in adjustment record"
      },
      {
        "name": "StockCount",
        "description": "Physical stock counting audit event (full, cycle, or spot count)"
      },
      {
        "name": "InventoryReconciliation",
        "description": "Post-count reconciliation matching book stock against counted stock"
      }
    ],
    "checklist": [
      "Page layout with inventory summary KPI bar",
      "Filterable SKU balance data table (Warehouse, Category, Stock Status)",
      "Batch & serial number inspection drawer",
      "Stock adjustment authoring modal with reason selector",
      "Physical stock count worksheet",
      "Form validation on adjustments and counts",
      "Loading, empty, and error states",
      "Integration with canonical ERP types",
      "Integration with existing mock layer (@mock/erp)"
    ],
    "dependencies": [
      {
        "entity": "Warehouse",
        "ownerDomain": "ERP",
        "purpose": "Physical facility reference"
      }
    ],
    "notes": [
      "Use canonical ERP types from @features/erp/types.",
      "Use existing shared components from @shared/components.",
      "Use the existing mock infrastructure (@mock/erp) for frontend development.",
      "Keep business logic within the ERP feature boundary.",
      "Do not create duplicate shared entities or competing type definitions.",
      "Keep backend integration separate from UI implementation.",
      "Follow the common developer guide and ERP team guide.",
      "Do not modify warehouse building layout or outbound carrier shipping dispatch."
    ]
  },
  "ERP-DEV-05": {
    "developerId": "ERP-DEV-05",
    "team": "Team 1 — ERP",
    "teamNumber": 1,
    "domain": "ERP",
    "domainCategory": "ERP / Supply Chain",
    "teamBadgeVariant": "team-a",
    "title": "Warehouse",
    "area": "Facility Configuration, Storage Zones & Inter-Facility Transfers",
    "route": "/erp/warehouse",
    "expectedPage": "WarehousePage.tsx",
    "featureLocation": "src/features/erp/",
    "description": "Multi-facility warehouse topology, storage zone definitions, rack/bin coordinate management, and inter-facility stock transfers.",
    "responsibility": "Build warehouse facility configuration, storage zones (Picking, Bulk, Quarantine), rack/shelf/bin coordinate visualization, and inter-facility stock transfer requests.",
    "responsibilityBullets": [
      "Multi-facility warehouse master configuration and operational capacity",
      "Functional storage zone definitions (Bulk, Picking, Quarantine, Staging)",
      "Rack/shelf/bin coordinate management and storage visualization",
      "Inter-facility stock transfer requests, shipment dispatch, and receiving logs"
    ],
    "scope": [
      {
        "id": "01",
        "title": "Warehouse Facility Topology",
        "description": "Master directory of warehouses, physical addresses, and utilization rates."
      },
      {
        "id": "02",
        "title": "Storage Zones & Bin Coordinates",
        "description": "Hierarchical zone mapping (Aisle-Rack-Shelf-Bin) with capacity metrics."
      },
      {
        "id": "03",
        "title": "Stock Transfer Requisitions",
        "description": "Internal transfer order creation between origin and destination warehouses."
      },
      {
        "id": "04",
        "title": "Transfer Dispatch & Receiving",
        "description": "Transfer shipment dispatch note, in-transit status, and receiving verification."
      }
    ],
    "canonicalTypes": [
      {
        "name": "Warehouse",
        "description": "Physical warehouse storage facility master record and capacity"
      },
      {
        "name": "WarehouseZone",
        "description": "Designated functional operational area within a warehouse"
      },
      {
        "name": "BinLocation",
        "description": "Specific storage rack/shelf/bin coordinate inside a warehouse zone"
      },
      {
        "name": "StockTransfer",
        "description": "Inter-warehouse inventory relocation shipment order"
      },
      {
        "name": "StockTransferItem",
        "description": "Item quantity shipped and received in an inter-warehouse transfer"
      },
      {
        "name": "InventoryItem",
        "description": "SKU inventory balance at warehouse level"
      }
    ],
    "checklist": [
      "Page layout with warehouse selector switcher",
      "Warehouse facility topology overview cards",
      "Storage zone and bin coordinate tree/table view",
      "Inter-facility transfer request drawer",
      "In-transit transfer tracker table with receiving action",
      "Capacity utilization indicators",
      "Loading, empty, and error states",
      "Integration with canonical ERP types",
      "Integration with existing mock layer (@mock/erp)"
    ],
    "dependencies": [
      {
        "entity": "Address",
        "ownerDomain": "Shared",
        "purpose": "Facility physical address"
      },
      {
        "entity": "Product",
        "ownerDomain": "ERP",
        "purpose": "Transferred item reference"
      }
    ],
    "notes": [
      "Use canonical ERP types from @features/erp/types.",
      "Use existing shared components from @shared/components.",
      "Use the existing mock infrastructure (@mock/erp) for frontend development.",
      "Keep business logic within the ERP feature boundary.",
      "Do not create duplicate shared entities or competing type definitions.",
      "Keep backend integration separate from UI implementation.",
      "Follow the common developer guide and ERP team guide.",
      "Do not modify inbound procurement quotes or supplier contracts."
    ]
  },
  "ERP-DEV-06": {
    "developerId": "ERP-DEV-06",
    "team": "Team 1 — ERP",
    "teamNumber": 1,
    "domain": "ERP",
    "domainCategory": "ERP / Supply Chain",
    "teamBadgeVariant": "team-a",
    "title": "Sales Fulfillment & Returns",
    "area": "Pick-Pack-Ship Lifecycle, Dispatch & RMA Returns",
    "route": "/erp/fulfillment",
    "expectedPage": "FulfillmentPage.tsx",
    "featureLocation": "src/features/erp/",
    "description": "Sales order warehouse fulfillment, pick-pack-ship lifecycle, carrier dispatch tracking, and return merchandise authorization (RMA) inspections.",
    "responsibility": "Build the sales order fulfillment queue, warehouse pick-pack ticket workflow, carrier delivery dispatch with tracking number, and customer return authorization (RMA) with condition inspection.",
    "responsibilityBullets": [
      "Sales order fulfillment queue prioritized by shipping SLA",
      "Warehouse pick-list generation and packing verification ticket",
      "Carrier delivery dispatch note with tracking URL and consignment details",
      "Return Merchandise Authorization (RMA) workflow and item condition check"
    ],
    "scope": [
      {
        "id": "01",
        "title": "Order Fulfillment Queue",
        "description": "Confirmed sales orders ready for picking with stock reservation checks."
      },
      {
        "id": "02",
        "title": "Pick-Pack Workflow",
        "description": "Digital pick-list verification, item barcode check, and box packaging confirmation."
      },
      {
        "id": "03",
        "title": "Carrier Dispatch & Tracking",
        "description": "Courier assignment, bill of lading generation, and tracking status updates."
      },
      {
        "id": "04",
        "title": "RMA Returns Inspection",
        "description": "Customer return request intake, physical condition triage, and restocking authorization."
      }
    ],
    "canonicalTypes": [
      {
        "name": "SalesOrder",
        "description": "Confirmed customer sales order ready for warehouse fulfillment"
      },
      {
        "name": "SalesOrderItem",
        "description": "Line item on a sales order tracking ordered vs fulfilled quantities"
      },
      {
        "name": "FulfillmentOrder",
        "description": "Internal warehouse fulfillment ticket instructing item packing"
      },
      {
        "name": "Delivery",
        "description": "Customer shipment delivery dispatch note and courier tracking"
      },
      {
        "name": "Shipment",
        "description": "Outbound logistics cargo consignment tracking details"
      },
      {
        "name": "Return",
        "description": "Formal customer sales return authorization and refund request"
      },
      {
        "name": "ReturnItem",
        "description": "Item received in an RMA return with condition check and refund value"
      }
    ],
    "checklist": [
      "Page layout with Fulfillment and Returns tabs",
      "Unfulfilled sales order queue with priority sorting",
      "Pick-pack ticket modal with quantity verification",
      "Dispatch shipment drawer with carrier tracking fields",
      "RMA returns management table and inspection condition triage",
      "Form validation on dispatch and return inspection",
      "Loading, empty, and error states",
      "Integration with canonical ERP types",
      "Integration with existing mock layer (@mock/erp)"
    ],
    "dependencies": [
      {
        "entity": "Customer",
        "ownerDomain": "CRM",
        "purpose": "Sales order buyer and RMA requester"
      },
      {
        "entity": "Product",
        "ownerDomain": "ERP",
        "purpose": "Fulfilled SKU"
      }
    ],
    "notes": [
      "Use canonical ERP types from @features/erp/types.",
      "Use existing shared components from @shared/components.",
      "Use the existing mock infrastructure (@mock/erp) for frontend development.",
      "Keep business logic within the ERP feature boundary.",
      "Do not create duplicate shared entities or competing type definitions.",
      "Keep backend integration separate from UI implementation.",
      "Follow the common developer guide and ERP team guide.",
      "Do not author CRM quotations or generate Finance billing invoices directly."
    ]
  },
  "ERP-DEV-07": {
    "developerId": "ERP-DEV-07",
    "team": "Team 1 — ERP",
    "teamNumber": 1,
    "domain": "ERP",
    "domainCategory": "ERP / Supply Chain",
    "teamBadgeVariant": "team-a",
    "title": "ERP Reports",
    "area": "Supply Chain Reporting, Valuation & Vendor Performance",
    "route": "/erp/reports",
    "expectedPage": "ERPReportsPage.tsx",
    "featureLocation": "src/features/erp/",
    "description": "Supply chain reporting filters, inventory valuation matrices, procurement spend analysis, and carrier delivery performance reports.",
    "responsibility": "Build supply chain report filter panels, inventory valuation reports, vendor delivery performance audits, carrier turnaround time analytics, and export preview tables.",
    "responsibilityBullets": [
      "Supply chain reporting parameter filter panel (Date range, Warehouse, Vendor, Product Category)",
      "Inventory valuation and stock aging summary report",
      "Procurement spend analysis grouped by vendor category",
      "Vendor on-time delivery scorecards and carrier turnaround time analytics"
    ],
    "scope": [
      {
        "id": "01",
        "title": "Report Configuration Filter",
        "description": "Multi-parameter filter bar with preset date ranges and domain dimensions."
      },
      {
        "id": "02",
        "title": "Inventory Valuation Matrix",
        "description": "Total stock value breakdown by warehouse, category, and turnover velocity."
      },
      {
        "id": "03",
        "title": "Procurement Spend Analysis",
        "description": "Spend aggregates by vendor, purchase order volume, and category distribution."
      },
      {
        "id": "04",
        "title": "Carrier & Delivery Performance",
        "description": "Dispatch-to-delivery turnaround times, SLA breach rates, and courier scorecards."
      }
    ],
    "canonicalTypes": [
      {
        "name": "InventoryItem",
        "description": "Stock balance and valuation snapshot"
      },
      {
        "name": "PurchaseOrder",
        "description": "Procurement spend and volume aggregates"
      },
      {
        "name": "SalesOrder",
        "description": "Sales fulfillment volume and fulfillment velocity"
      },
      {
        "name": "StockMovement",
        "description": "Inventory transaction audit log for throughput analysis"
      },
      {
        "name": "VendorEvaluation",
        "description": "Supplier performance assessment data"
      }
    ],
    "checklist": [
      "Page layout with report type selector and filter bar",
      "Report metric summary banner (Total Spend, Inventory Value, Fulfillment Rate)",
      "Data table view with sorting and column toggle",
      "Export data preview (CSV / Excel format indicator)",
      "Chart / visual representation placeholder",
      "Loading, empty, and error states",
      "Integration with canonical ERP types",
      "Integration with existing mock layer (@mock/erp)"
    ],
    "dependencies": [
      {
        "entity": "Vendor",
        "ownerDomain": "ERP",
        "purpose": "Spend breakdown dimension"
      },
      {
        "entity": "Warehouse",
        "ownerDomain": "ERP",
        "purpose": "Stock valuation dimension"
      }
    ],
    "notes": [
      "Use canonical ERP types from @features/erp/types.",
      "Use existing shared components from @shared/components.",
      "Use the existing mock infrastructure (@mock/erp) for frontend development.",
      "Keep business logic within the ERP feature boundary.",
      "Do not create duplicate shared entities or competing type definitions.",
      "Keep backend integration separate from UI implementation.",
      "Follow the common developer guide and ERP team guide.",
      "Do not create core transaction forms (PO, SO, Adjustments) inside reporting screens."
    ]
  },
  "CRM-DEV-01": {
    "developerId": "CRM-DEV-01",
    "team": "Team 2 — CRM",
    "teamNumber": 2,
    "domain": "CRM",
    "domainCategory": "CRM",
    "teamBadgeVariant": "team-b",
    "title": "CRM Dashboard & Overview",
    "area": "Sales Pipeline Overview, Funnel & Customer Indicators",
    "route": "/crm",
    "expectedPage": "CRMDashboardPage.tsx",
    "featureLocation": "src/features/crm/",
    "description": "Executive CRM operational dashboard, sales pipeline stage funnel, lead conversion rate cards, and customer satisfaction indicators.",
    "responsibility": "Build executive pipeline overview widgets (Total Pipeline Value, Weighted Forecast, Win Rate %, Active Deals), stage funnel breakdown bar, recent won deals, and open support SLA summary.",
    "responsibilityBullets": [
      "Executive pipeline overview widgets (Pipeline Value, Weighted Forecast, Win Rate %, Active Deals)",
      "Visual sales pipeline stage funnel breakdown",
      "Lead intake velocity and conversion rate indicators",
      "Recent won deals stream and key customer activity feed",
      "Customer support ticket SLA health summary"
    ],
    "scope": [
      {
        "id": "01",
        "title": "Pipeline Health Indicators",
        "description": "High-level KPI cards for sales volume, pipeline velocity, and conversion percentage."
      },
      {
        "id": "02",
        "title": "Stage Funnel Breakdown",
        "description": "Interactive visual representation of deal stages from Lead to Closed-Won."
      },
      {
        "id": "03",
        "title": "Top Deals & Recent Wins",
        "description": "High-value opportunity tracker with owner, value, and expected close dates."
      },
      {
        "id": "04",
        "title": "Support & CSAT Summary",
        "description": "Critical customer support ticket alerts and SLA resolution performance."
      }
    ],
    "canonicalTypes": [
      {
        "name": "CrmDashboardMetrics",
        "description": "Executive CRM pipeline metrics snapshot"
      },
      {
        "name": "PipelineStageMetric",
        "description": "Value and count distribution per sales stage"
      },
      {
        "name": "Lead",
        "description": "Inbound sales prospect with qualification status"
      },
      {
        "name": "Opportunity",
        "description": "Multi-stage sales deal with probability weighting"
      },
      {
        "name": "Customer",
        "description": "Enterprise customer account master record"
      },
      {
        "name": "SupportTicket",
        "description": "Customer support ticket and issue tracker"
      }
    ],
    "checklist": [
      "Page layout with executive KPI metric card grid",
      "Visual pipeline stage funnel component",
      "Recent high-value opportunities list",
      "Lead conversion velocity widget",
      "Support ticket SLA compliance summary card",
      "Loading, empty, and error states",
      "Responsive layout across viewport sizes",
      "Integration with canonical CRM types",
      "Integration with existing mock layer (@mock/crm)"
    ],
    "dependencies": [
      {
        "entity": "Employee",
        "ownerDomain": "HRMS",
        "purpose": "Sales representative owner reference"
      }
    ],
    "notes": [
      "Use canonical CRM types from @features/crm/types.",
      "Use existing shared components from @shared/components.",
      "Use the existing mock infrastructure (@mock/crm) for frontend development.",
      "Keep business logic within the CRM feature boundary.",
      "Do not create duplicate shared entities or competing type definitions.",
      "Keep backend integration separate from UI implementation.",
      "Follow the common developer guide and CRM team guide.",
      "Do not modify lead qualification forms, quotation authoring, or customer contact directories."
    ]
  },
  "CRM-DEV-02": {
    "developerId": "CRM-DEV-02",
    "team": "Team 2 — CRM",
    "teamNumber": 2,
    "domain": "CRM",
    "domainCategory": "CRM",
    "teamBadgeVariant": "team-b",
    "title": "Lead Management",
    "area": "Inbound Prospects, Touchpoint Logs & Opportunity Conversion",
    "route": "/crm/leads",
    "expectedPage": "LeadManagementPage.tsx",
    "featureLocation": "src/features/crm/",
    "description": "Inbound sales prospect intake, lead qualification workflow, sales touchpoint activity logs, and lead conversion into customer/opportunity.",
    "responsibility": "Build lead capture intake form, status progression workflow (NEW → CONTACTED → QUALIFIED → CONVERTED), activity logging panel, and one-click lead-to-opportunity conversion drawer.",
    "responsibilityBullets": [
      "Lead capture intake form with source tracking (Website, Referral, Trade Show)",
      "Lead qualification workflow (NEW → CONTACTED → QUALIFIED → UNQUALIFIED → CONVERTED)",
      "Sales touchpoint activity logging panel (Calls, Emails, Meetings, Notes)",
      "One-click lead conversion drawer generating Customer, Contact, and Opportunity"
    ],
    "scope": [
      {
        "id": "01",
        "title": "Lead Capture & Intake",
        "description": "New lead registration modal with contact info, company name, and lead source."
      },
      {
        "id": "02",
        "title": "Status Progression Bar",
        "description": "Visual stage stepper advancing lead from initial contact to qualified prospect."
      },
      {
        "id": "03",
        "title": "Activity Timeline & Notes",
        "description": "Chronological log of communications, follow-up tasks, and rep notes."
      },
      {
        "id": "04",
        "title": "Conversion Wizard",
        "description": "Seamless conversion into active Customer account and linked Sales Opportunity."
      }
    ],
    "canonicalTypes": [
      {
        "name": "Lead",
        "description": "Inbound sales prospect with contact details, status, and score"
      },
      {
        "name": "LeadSource",
        "description": "Acquisition source union (WEBSITE, REFERRAL, EVENT, COLD_CALL, etc.)"
      },
      {
        "name": "LeadStatus",
        "description": "Lifecycle progression status union (NEW, CONTACTED, QUALIFIED, CONVERTED, etc.)"
      },
      {
        "name": "LeadActivity",
        "description": "Sales touchpoint activity record (CALL, EMAIL, MEETING, NOTE)"
      }
    ],
    "checklist": [
      "Page layout with filterable leads data table",
      "Primary page header with Add Lead action",
      "Lead status stepper badge component",
      "Lead detail side-panel with activity history feed",
      "Activity logging form (Call, Email, Note)",
      "Convert Lead drawer with Customer and Opportunity inputs",
      "Form validation on phone, email, and required fields",
      "Loading, empty, and error states",
      "Integration with canonical CRM types",
      "Integration with existing mock layer (@mock/crm)"
    ],
    "dependencies": [
      {
        "entity": "Employee",
        "ownerDomain": "HRMS",
        "purpose": "Lead owner / sales rep"
      }
    ],
    "notes": [
      "Use canonical CRM types from @features/crm/types.",
      "Use existing shared components from @shared/components.",
      "Use the existing mock infrastructure (@mock/crm) for frontend development.",
      "Keep business logic within the CRM feature boundary.",
      "Do not create duplicate shared entities or competing type definitions.",
      "Keep backend integration separate from UI implementation.",
      "Follow the common developer guide and CRM team guide.",
      "Do not directly modify existing customer master profiles; use the conversion workflow."
    ]
  },
  "CRM-DEV-03": {
    "developerId": "CRM-DEV-03",
    "team": "Team 2 — CRM",
    "teamNumber": 2,
    "domain": "CRM",
    "domainCategory": "CRM",
    "teamBadgeVariant": "team-b",
    "title": "Opportunities",
    "area": "Deal Progression, Kanban Pipeline & Probability Forecasting",
    "route": "/crm/opportunities",
    "expectedPage": "OpportunityPage.tsx",
    "featureLocation": "src/features/crm/",
    "description": "Multi-stage deal progression, weighted probability forecasting, expected close date scheduling, and win/loss post-mortem tracking.",
    "responsibility": "Build opportunity list and kanban views, stage drag/drop progression, expected close date scheduling, weighted value computation, and win/loss reason modal with competitor details.",
    "responsibilityBullets": [
      "Opportunity list and interactive Kanban pipeline board view",
      "Stage progression from Discovery to Closed-Won / Closed-Lost",
      "Weighted revenue forecasting based on stage probability percentages",
      "Expected close date scheduler with overdue alert indicators",
      "Win/Loss reason capture modal with competitor comparison"
    ],
    "scope": [
      {
        "id": "01",
        "title": "Interactive Kanban Board",
        "description": "Multi-column board displaying deals organized by sales stage."
      },
      {
        "id": "02",
        "title": "Opportunity List & Filters",
        "description": "Tabular view with filtering by owner, stage, close date, and deal size."
      },
      {
        "id": "03",
        "title": "Weighted Revenue Forecaster",
        "description": "Real-time computation of stage-weighted pipeline value."
      },
      {
        "id": "04",
        "title": "Win/Loss Post-Mortem",
        "description": "Detailed dialog capturing outcome rationale and competitor insights on deal closure."
      }
    ],
    "canonicalTypes": [
      {
        "name": "Opportunity",
        "description": "Multi-stage sales deal with monetary value, close date, and probability"
      },
      {
        "name": "OpportunityStage",
        "description": "Sales stage union (PROSPECTING, QUALIFICATION, PROPOSAL, NEGOTIATION, etc.)"
      },
      {
        "name": "OpportunityStatus",
        "description": "Deal outcome status union (OPEN, WON, LOST, ABANDONED)"
      },
      {
        "name": "OpportunityActivity",
        "description": "Deal interaction log and next step tracker"
      },
      {
        "name": "SalesPipeline",
        "description": "Sales pipeline process configuration"
      },
      {
        "name": "PipelineStage",
        "description": "Individual stage definition within a pipeline with probability weight"
      }
    ],
    "checklist": [
      "View toggle between Kanban board and Table view",
      "Kanban stage columns with deal summary cards",
      "Opportunity creation and edit modal",
      "Weighted pipeline total summary bar",
      "Win / Loss modal with reason and competitor selection",
      "Loading, empty, and error states",
      "Responsive board scrolling and layout",
      "Integration with canonical CRM types",
      "Integration with existing mock layer (@mock/crm)"
    ],
    "dependencies": [
      {
        "entity": "Customer",
        "ownerDomain": "CRM",
        "purpose": "Account linked to deal"
      },
      {
        "entity": "Contact",
        "ownerDomain": "CRM",
        "purpose": "Key stakeholder contact"
      },
      {
        "entity": "Employee",
        "ownerDomain": "HRMS",
        "purpose": "Opportunity owner"
      }
    ],
    "notes": [
      "Use canonical CRM types from @features/crm/types.",
      "Use existing shared components from @shared/components.",
      "Use the existing mock infrastructure (@mock/crm) for frontend development.",
      "Keep business logic within the CRM feature boundary.",
      "Do not create duplicate shared entities or competing type definitions.",
      "Keep backend integration separate from UI implementation.",
      "Follow the common developer guide and CRM team guide.",
      "Do not modify customer billing addresses or support ticket queues."
    ]
  },
  "CRM-DEV-04": {
    "developerId": "CRM-DEV-04",
    "team": "Team 2 — CRM",
    "teamNumber": 2,
    "domain": "CRM",
    "domainCategory": "CRM",
    "teamBadgeVariant": "team-b",
    "title": "Customer & Contact Management",
    "area": "Customer 360 Profiles, Stakeholders & Address Directory",
    "route": "/crm/customers",
    "expectedPage": "CustomerContactPage.tsx",
    "featureLocation": "src/features/crm/",
    "description": "Customer 360 account profile, multiple stakeholder contact directory, billing/shipping address management, and credit limit status.",
    "responsibility": "Build customer 360 directory, enterprise/business account profile editor, multi-contact management table, GSTIN/PAN validation, and billing & shipping address management.",
    "responsibilityBullets": [
      "Customer 360 master account directory with search and industry filtering",
      "Account profile editor with legal entity name, GSTIN, PAN, and credit limit",
      "Multi-contact stakeholder directory with Primary Contact toggle and role tags",
      "Multiple billing and shipping address management per customer"
    ],
    "scope": [
      {
        "id": "01",
        "title": "Customer Master Directory",
        "description": "Filterable enterprise account list with status, tier, and assigned sales rep."
      },
      {
        "id": "02",
        "title": "Customer 360 Profile View",
        "description": "Comprehensive view of account details, credit limit, and active deals."
      },
      {
        "id": "03",
        "title": "Stakeholder Contact Directory",
        "description": "Associated contact cards with designation, email, phone, and primary flag."
      },
      {
        "id": "04",
        "title": "Address Management",
        "description": "Multiple dispatch, billing, and site addresses with postal validation."
      }
    ],
    "canonicalTypes": [
      {
        "name": "Customer",
        "description": "Enterprise customer account master record with tax and credit terms"
      },
      {
        "name": "CustomerAddress",
        "description": "Registered, billing, or shipping address associated with a customer"
      },
      {
        "name": "CustomerReference",
        "description": "Lightweight customer display snapshot used across domains"
      },
      {
        "name": "Contact",
        "description": "Individual stakeholder contact person profile linked to a customer"
      },
      {
        "name": "CustomerType",
        "description": "Account classification union (ENTERPRISE, SMB, INDIVIDUAL, PARTNER)"
      },
      {
        "name": "CustomerStatus",
        "description": "Account status union (ACTIVE, INACTIVE, PROSPECT, SUSPENDED)"
      }
    ],
    "checklist": [
      "Page layout with customer table and search filter bar",
      "Primary page header with Add Customer action",
      "Customer 360 detail drawer with overview and contact tabs",
      "Stakeholder contacts sub-table with Set as Primary action",
      "Address management cards with type badges (Billing / Shipping)",
      "Form validation on GSTIN, PAN, and contact details",
      "Loading, empty, and error states",
      "Integration with canonical CRM types",
      "Integration with existing mock layer (@mock/crm)"
    ],
    "dependencies": [
      {
        "entity": "Address",
        "ownerDomain": "Shared",
        "purpose": "Address schema"
      },
      {
        "entity": "Employee",
        "ownerDomain": "HRMS",
        "purpose": "Account manager"
      }
    ],
    "notes": [
      "Use canonical CRM types from @features/crm/types.",
      "Use existing shared components from @shared/components.",
      "Use the existing mock infrastructure (@mock/crm) for frontend development.",
      "Keep business logic within the CRM feature boundary.",
      "Do not create duplicate shared entities or competing type definitions.",
      "Keep backend integration separate from UI implementation.",
      "Follow the common developer guide and CRM team guide.",
      "Provide CustomerReference for ERP sales orders and Finance customer invoices.",
      "Do not modify sales quotations or opportunity stage configurations."
    ]
  },
  "CRM-DEV-05": {
    "developerId": "CRM-DEV-05",
    "team": "Team 2 — CRM",
    "teamNumber": 2,
    "domain": "CRM",
    "domainCategory": "CRM",
    "teamBadgeVariant": "team-b",
    "title": "Quotations & Sales",
    "area": "Sales Quotation Drafting, GST Calculation & Approval Workflow",
    "route": "/crm/quotations",
    "expectedPage": "QuotationSalesPage.tsx",
    "featureLocation": "src/features/crm/",
    "description": "Formal sales quote drafting, multi-line pricing calculation with Indian GST, tiered discount policy rules, and quote approval workflow.",
    "responsibility": "Build quotation creation wizard, dynamic product line items with auto-calculated discounts and GST, pricing rule evaluator, quote approval workflow, and quote PDF preview.",
    "responsibilityBullets": [
      "Quotation creation wizard with customer selection and expiration dates",
      "Dynamic product line items with auto-calculated line totals, discounts, and Indian GST",
      "Tiered pricing and discount approval rule threshold evaluation",
      "Quote approval workflow (DRAFT → PENDING_APPROVAL → APPROVED → SENT → ACCEPTED)",
      "Quotation summary preview ready for PDF generation or ERP sales order handover"
    ],
    "scope": [
      {
        "id": "01",
        "title": "Quotation Drafting Wizard",
        "description": "Header information, client reference, validity period, and currency selector."
      },
      {
        "id": "02",
        "title": "Line Item & Tax Calculator",
        "description": "Interactive item rows computing subtotal, discount %, CGST/SGST/IGST, and grand total."
      },
      {
        "id": "03",
        "title": "Discount Approval Gates",
        "description": "Automatic detection of discount thresholds requiring managerial sign-off."
      },
      {
        "id": "04",
        "title": "Quote Approval Queue",
        "description": "Managerial review queue with Approve / Reject action notes and audit log."
      }
    ],
    "canonicalTypes": [
      {
        "name": "Quotation",
        "description": "Official sales price quotation document"
      },
      {
        "name": "QuotationItem",
        "description": "Detailed line item inside a sales quote with quantity, price, discount, and tax"
      },
      {
        "name": "QuoteStatus",
        "description": "Workflow lifecycle status union (DRAFT, PENDING_APPROVAL, APPROVED, SENT, ACCEPTED, EXPIRED)"
      },
      {
        "name": "PricingRule",
        "description": "Automated pricing tier calculation rule based on customer type or quantity"
      },
      {
        "name": "DiscountRule",
        "description": "Policy defining maximum allowable discounts and approval thresholds"
      },
      {
        "name": "QuoteApproval",
        "description": "Managerial approval decision logged on a quotation"
      }
    ],
    "checklist": [
      "Page layout with quotations table and status filters",
      "Primary page header with Create Quote action",
      "Multi-line quotation authoring drawer with dynamic calculation",
      "Tax calculation breakdown display (Subtotal, GST, Total)",
      "Approval status workflow timeline component",
      "Printable quote preview modal",
      "Loading, empty, and error states",
      "Integration with canonical CRM types",
      "Integration with existing mock layer (@mock/crm)"
    ],
    "dependencies": [
      {
        "entity": "Product",
        "ownerDomain": "ERP",
        "purpose": "Line item product SKU selection"
      },
      {
        "entity": "Customer",
        "ownerDomain": "CRM",
        "purpose": "Quote recipient"
      },
      {
        "entity": "SalesOrder",
        "ownerDomain": "ERP",
        "purpose": "Converted target on quote acceptance"
      }
    ],
    "notes": [
      "Use canonical CRM types from @features/crm/types.",
      "Use existing shared components from @shared/components.",
      "Use the existing mock infrastructure (@mock/crm) for frontend development.",
      "Keep business logic within the CRM feature boundary.",
      "Do not create duplicate shared entities or competing type definitions.",
      "Keep backend integration separate from UI implementation.",
      "Follow the common developer guide and CRM team guide.",
      "Do not manage ERP warehouse fulfillment orders; quote handover creates SalesOrder."
    ]
  },
  "CRM-DEV-06": {
    "developerId": "CRM-DEV-06",
    "team": "Team 2 — CRM",
    "teamNumber": 2,
    "domain": "CRM",
    "domainCategory": "CRM",
    "teamBadgeVariant": "team-b",
    "title": "Support & Customer Portal",
    "area": "Customer Ticketing, SLA Timers & Discussion Threads",
    "route": "/crm/support",
    "expectedPage": "SupportPortalPage.tsx",
    "featureLocation": "src/features/crm/",
    "description": "Customer support ticketing system, SLA countdown timers, multi-user threaded comments, and attachment evidence viewer.",
    "responsibility": "Build customer support ticket queue, SLA countdown badge, category/priority filter, conversation comment thread (public vs internal notes), and attachment preview modal.",
    "responsibilityBullets": [
      "Customer support ticket queue with priority badges and status filtering",
      "SLA resolution countdown badges with overdue warnings",
      "Multi-user conversation comment thread (public customer replies vs internal private notes)",
      "Ticket assignment to support agents with category routing",
      "Attachment and screenshot preview drawer"
    ],
    "scope": [
      {
        "id": "01",
        "title": "Support Ticket Queue",
        "description": "Master ticketing grid with search, priority (LOW to CRITICAL), and status filters."
      },
      {
        "id": "02",
        "title": "SLA Countdown Monitor",
        "description": "Visual SLA breach risk indicators based on creation timestamp and priority."
      },
      {
        "id": "03",
        "title": "Conversation Thread",
        "description": "Chronological discussion view supporting public replies and private internal team notes."
      },
      {
        "id": "04",
        "title": "Ticket Resolution Workflow",
        "description": "Status transitions (OPEN → IN_PROGRESS → PENDING_CUSTOMER → RESOLVED → CLOSED)."
      }
    ],
    "canonicalTypes": [
      {
        "name": "SupportTicket",
        "description": "Customer support ticket and issue tracker with SLA deadline"
      },
      {
        "name": "SupportComment",
        "description": "Internal or public discussion note on a support ticket"
      },
      {
        "name": "SupportAttachment",
        "description": "File or screenshot attached to a support ticket"
      },
      {
        "name": "SupportCategory",
        "description": "Ticket category union (BILLING, TECHNICAL, PRODUCT, GENERAL)"
      },
      {
        "name": "TicketPriority",
        "description": "Severity priority union (LOW, MEDIUM, HIGH, URGENT)"
      },
      {
        "name": "TicketStatus",
        "description": "Resolution lifecycle status union (OPEN, IN_PROGRESS, RESOLVED, CLOSED)"
      }
    ],
    "checklist": [
      "Page layout with ticket list and detail view pane",
      "Primary page header with New Ticket action",
      "SLA countdown timer badge component",
      "Threaded conversation component with public/private toggle",
      "Quick status change and assignee dropdowns",
      "Attachment thumbnail viewer",
      "Loading, empty, and error states",
      "Integration with canonical CRM types",
      "Integration with existing mock layer (@mock/crm)"
    ],
    "dependencies": [
      {
        "entity": "Customer",
        "ownerDomain": "CRM",
        "purpose": "Affected customer account"
      },
      {
        "entity": "Contact",
        "ownerDomain": "CRM",
        "purpose": "Ticket submitter"
      },
      {
        "entity": "Employee",
        "ownerDomain": "HRMS",
        "purpose": "Support agent assignee"
      }
    ],
    "notes": [
      "Use canonical CRM types from @features/crm/types.",
      "Use existing shared components from @shared/components.",
      "Use the existing mock infrastructure (@mock/crm) for frontend development.",
      "Keep business logic within the CRM feature boundary.",
      "Do not create duplicate shared entities or competing type definitions.",
      "Keep backend integration separate from UI implementation.",
      "Follow the common developer guide and CRM team guide.",
      "Do not modify sales opportunities or lead qualification pipelines."
    ]
  },
  "CRM-DEV-07": {
    "developerId": "CRM-DEV-07",
    "team": "Team 2 — CRM",
    "teamNumber": 2,
    "domain": "CRM",
    "domainCategory": "CRM",
    "teamBadgeVariant": "team-b",
    "title": "CRM Reports",
    "area": "Sales Rep Leaderboards, Pipeline Velocity & Churn Analysis",
    "route": "/crm/reports",
    "expectedPage": "CRMReportsPage.tsx",
    "featureLocation": "src/features/crm/",
    "description": "Sales rep performance leaderboards, pipeline velocity analytics, customer retention analysis, and ticket resolution SLA reports.",
    "responsibility": "Build sales rep conversion leaderboards, pipeline velocity metrics, customer churn risk analysis, and support ticket resolution time compliance reports.",
    "responsibilityBullets": [
      "Sales representative performance and quota attainment leaderboard",
      "Sales pipeline velocity analytics measuring stage duration",
      "Customer retention and churn risk indicator tables",
      "Customer support SLA compliance and first-response time metrics"
    ],
    "scope": [
      {
        "id": "01",
        "title": "Sales Rep Leaderboard",
        "description": "Quota vs closed-won revenue ranking table per sales representative."
      },
      {
        "id": "02",
        "title": "Pipeline Velocity Analytics",
        "description": "Average days spent in each pipeline stage and bottleneck identification."
      },
      {
        "id": "03",
        "title": "Customer Retention & Churn",
        "description": "Account activity monitor highlighting accounts with declining interactions."
      },
      {
        "id": "04",
        "title": "Support SLA Compliance",
        "description": "First-response and resolution time percentages against contractual SLAs."
      }
    ],
    "canonicalTypes": [
      {
        "name": "Lead",
        "description": "Inbound lead source and conversion rates"
      },
      {
        "name": "Opportunity",
        "description": "Deal volume, win rate, and stage velocity metrics"
      },
      {
        "name": "Customer",
        "description": "Customer account retention metrics"
      },
      {
        "name": "SupportTicket",
        "description": "Support ticket SLA compliance and resolution metrics"
      },
      {
        "name": "Quotation",
        "description": "Quote-to-deal conversion ratios"
      }
    ],
    "checklist": [
      "Page layout with report tab switcher and date range filter",
      "Sales team performance ranking table",
      "Pipeline stage velocity breakdown component",
      "SLA compliance rate progress bars",
      "Export data preview table",
      "Loading, empty, and error states",
      "Integration with canonical CRM types",
      "Integration with existing mock layer (@mock/crm)"
    ],
    "dependencies": [
      {
        "entity": "Employee",
        "ownerDomain": "HRMS",
        "purpose": "Sales representative ranking dimension"
      }
    ],
    "notes": [
      "Use canonical CRM types from @features/crm/types.",
      "Use existing shared components from @shared/components.",
      "Use the existing mock infrastructure (@mock/crm) for frontend development.",
      "Keep business logic within the CRM feature boundary.",
      "Do not create duplicate shared entities or competing type definitions.",
      "Keep backend integration separate from UI implementation.",
      "Follow the common developer guide and CRM team guide.",
      "Do not create customer records or sales transaction documents inside report screens."
    ]
  },
  "HRMS-DEV-01": {
    "developerId": "HRMS-DEV-01",
    "team": "Team 3 — HRMS",
    "teamNumber": 3,
    "domain": "HRMS",
    "domainCategory": "HRMS",
    "teamBadgeVariant": "team-c",
    "title": "Employee Management",
    "area": "Employee Master Directory, Profiles & Document Verification",
    "route": "/hrms/employees",
    "expectedPage": "EmployeeManagementPage.tsx",
    "featureLocation": "src/features/hrms/",
    "description": "Employee master directory, personal/organizational profile forms, compliance document uploads, emergency contacts, and skills.",
    "responsibility": "Build master employee directory, employee profile view/edit wizard (personal details, department, manager, employment status), document verification badge, and emergency contact management.",
    "responsibilityBullets": [
      "Master employee directory with search, department filtering, and status badges",
      "Comprehensive employee profile view and edit wizard",
      "Compliance document upload and verification badge status",
      "Emergency contact details and professional skills management"
    ],
    "scope": [
      {
        "id": "01",
        "title": "Employee Master Directory",
        "description": "Paginated list of active/inactive staff with designation, department, and work email."
      },
      {
        "id": "02",
        "title": "Profile Management Wizard",
        "description": "Multi-tab editor covering Personal, Job, Compensation, and Documents."
      },
      {
        "id": "03",
        "title": "Document Verification Hub",
        "description": "Aadhaar/PAN identity documents with verification status badges."
      },
      {
        "id": "04",
        "title": "Skills & Emergency Contacts",
        "description": "Emergency contact directory and certified skills tagging."
      }
    ],
    "canonicalTypes": [
      {
        "name": "Employee",
        "description": "Canonical employee master record (personal info, job title, department, status)"
      },
      {
        "name": "EmployeeReference",
        "description": "Lightweight employee snapshot used enterprise-wide"
      },
      {
        "name": "Department",
        "description": "Organizational department unit master"
      },
      {
        "name": "Skill",
        "description": "Professional competency and skill tag"
      },
      {
        "name": "Certification",
        "description": "Professional certification credential record"
      },
      {
        "name": "EmergencyContact",
        "description": "Next-of-kin emergency contact information"
      },
      {
        "name": "EmployeeDocument",
        "description": "Uploaded compliance and identification document record"
      }
    ],
    "checklist": [
      "Page layout with employee cards and table view toggle",
      "Primary page header with Add Employee action",
      "Search bar and multi-filter (Department, Role, Status)",
      "Employee 360 profile drawer with tabs",
      "Document upload and verification status component",
      "Form validation on employee onboarding fields",
      "Loading, empty, and error states",
      "Integration with canonical HRMS types",
      "Integration with existing mock layer (@mock/hrms)"
    ],
    "dependencies": [
      {
        "entity": "Address",
        "ownerDomain": "Shared",
        "purpose": "Employee home address"
      }
    ],
    "notes": [
      "Use canonical HRMS types from @features/hrms/types.",
      "Use existing shared components from @shared/components.",
      "Use the existing mock infrastructure (@mock/hrms) for frontend development.",
      "Keep business logic within the HRMS feature boundary.",
      "Do not create duplicate shared entities or competing type definitions.",
      "Keep backend integration separate from UI implementation.",
      "Follow the common developer guide and HRMS team guide.",
      "Employee is the primary enterprise person entity consumed by ERP, CRM, and Finance.",
      "Do not modify payroll runs or leave approval queues directly."
    ]
  },
  "HRMS-DEV-02": {
    "developerId": "HRMS-DEV-02",
    "team": "Team 3 — HRMS",
    "teamNumber": 3,
    "domain": "HRMS",
    "domainCategory": "HRMS",
    "teamBadgeVariant": "team-c",
    "title": "Attendance",
    "area": "Daily Clock-In Logs, Shifts & Regularization Requests",
    "route": "/hrms/attendance",
    "expectedPage": "AttendancePage.tsx",
    "featureLocation": "src/features/hrms/",
    "description": "Daily clock-in/out attendance logs, shift rotation schedules, overtime recording, and employee attendance regularization requests.",
    "responsibility": "Build daily attendance punch table, monthly attendance summary calendar, shift schedule assignments, overtime approval log, and attendance regularization request review.",
    "responsibilityBullets": [
      "Daily attendance punch table with in/out timestamps and work hour calculations",
      "Monthly attendance summary view with present, absent, on-leave, and late counts",
      "Shift schedule configuration (Morning, General, Night shifts)",
      "Overtime hours tracking and manager approval workflow",
      "Attendance regularization request workflow for missed biometric punches"
    ],
    "scope": [
      {
        "id": "01",
        "title": "Daily Punch Table",
        "description": "Real-time clock-in/clock-out log with shift matching and late arrival flags."
      },
      {
        "id": "02",
        "title": "Monthly Summary Grid",
        "description": "Calendar/matrix view displaying monthly attendance distribution per employee."
      },
      {
        "id": "03",
        "title": "Shift Rotation Scheduler",
        "description": "Shift definition and weekly/monthly assignment drawer."
      },
      {
        "id": "04",
        "title": "Overtime & Regularization Log",
        "description": "Managerial queue to review missed punch explanations and overtime claims."
      }
    ],
    "canonicalTypes": [
      {
        "name": "AttendanceRecord",
        "description": "Daily attendance punch entry with clock-in/out and computed hours"
      },
      {
        "name": "AttendanceSummary",
        "description": "Monthly attendance aggregation (days worked, leaves, overtime)"
      },
      {
        "name": "Shift",
        "description": "Work shift definition with start/end times and break allowances"
      },
      {
        "name": "OvertimeRecord",
        "description": "Overtime hours claim with rate multiplier and approval status"
      },
      {
        "name": "AttendanceCorrection",
        "description": "Regularization request for missed punch or time adjustment"
      }
    ],
    "checklist": [
      "Page layout with date picker and department attendance filter",
      "Daily attendance punch log table with status badges",
      "Monthly attendance summary statistics cards",
      "Shift schedule assignment drawer",
      "Attendance regularization review modal with manager actions",
      "Loading, empty, and error states",
      "Integration with canonical HRMS types",
      "Integration with existing mock layer (@mock/hrms)"
    ],
    "dependencies": [
      {
        "entity": "Employee",
        "ownerDomain": "HRMS",
        "purpose": "Staff attendance subject"
      }
    ],
    "notes": [
      "Use canonical HRMS types from @features/hrms/types.",
      "Use existing shared components from @shared/components.",
      "Use the existing mock infrastructure (@mock/hrms) for frontend development.",
      "Keep business logic within the HRMS feature boundary.",
      "Do not create duplicate shared entities or competing type definitions.",
      "Keep backend integration separate from UI implementation.",
      "Follow the common developer guide and HRMS team guide.",
      "Attendance summaries feed into HRMS-DEV-04 monthly payroll runs.",
      "Do not modify annual leave quota allocations."
    ]
  },
  "HRMS-DEV-03": {
    "developerId": "HRMS-DEV-03",
    "team": "Team 3 — HRMS",
    "teamNumber": 3,
    "domain": "HRMS",
    "domainCategory": "HRMS",
    "teamBadgeVariant": "team-c",
    "title": "Leave Management",
    "area": "Leave Balances, Applications & Manager Approvals",
    "route": "/hrms/leave",
    "expectedPage": "LeaveManagementPage.tsx",
    "featureLocation": "src/features/hrms/",
    "description": "Annual leave entitlement balances, leave application form with duration validation, and manager approval/rejection timeline.",
    "responsibility": "Build annual leave balance cards (Casual, Sick, Earned), leave application form with date range duration calculator, and pending leave approval queue with manager decision actions.",
    "responsibilityBullets": [
      "Annual leave quota balance cards (Casual Leave, Sick Leave, Earned Leave)",
      "Leave application form with automatic duration calculation (excluding holidays/weekends)",
      "Team leave calendar preview to identify overlapping team absences",
      "Managerial leave approval queue with Approve / Reject actions and comment log"
    ],
    "scope": [
      {
        "id": "01",
        "title": "Leave Balance Overview",
        "description": "Employee entitlement cards showing Total, Used, and Remaining days."
      },
      {
        "id": "02",
        "title": "Leave Application Form",
        "description": "Date range picker with half-day toggle, reason input, and balance check."
      },
      {
        "id": "03",
        "title": "Team Absence Calendar",
        "description": "Visual calendar preview displaying scheduled departmental leaves."
      },
      {
        "id": "04",
        "title": "Approval Action Queue",
        "description": "Manager queue for reviewing pending requests with decision history."
      }
    ],
    "canonicalTypes": [
      {
        "name": "LeaveType",
        "description": "Leave category definition (CASUAL, SICK, EARNED, MATERNITY, PATERNITY, UNPAID)"
      },
      {
        "name": "LeaveBalance",
        "description": "Employee leave entitlement and quota tracking record"
      },
      {
        "name": "LeaveRequest",
        "description": "Formal leave application with start/end dates and duration"
      },
      {
        "name": "LeaveApproval",
        "description": "Approval decision record logged by manager with timestamp"
      }
    ],
    "checklist": [
      "Page layout with balance cards and request history table",
      "Primary page header with Apply for Leave action",
      "Leave application drawer with duration calculator",
      "Team absence calendar preview component",
      "Manager approval queue with one-click decision actions",
      "Loading, empty, and error states",
      "Integration with canonical HRMS types",
      "Integration with existing mock layer (@mock/hrms)"
    ],
    "dependencies": [
      {
        "entity": "Employee",
        "ownerDomain": "HRMS",
        "purpose": "Applicant and approver references"
      }
    ],
    "notes": [
      "Use canonical HRMS types from @features/hrms/types.",
      "Use existing shared components from @shared/components.",
      "Use the existing mock infrastructure (@mock/hrms) for frontend development.",
      "Keep business logic within the HRMS feature boundary.",
      "Do not create duplicate shared entities or competing type definitions.",
      "Keep backend integration separate from UI implementation.",
      "Follow the common developer guide and HRMS team guide.",
      "Approved leaves reflect as ON_LEAVE in attendance logs (HRMS-DEV-02).",
      "Do not modify salary compensation structures or employee profile master records."
    ]
  },
  "HRMS-DEV-04": {
    "developerId": "HRMS-DEV-04",
    "team": "Team 3 — HRMS",
    "teamNumber": 3,
    "domain": "HRMS",
    "domainCategory": "HRMS",
    "teamBadgeVariant": "team-c",
    "title": "Payroll",
    "area": "Salary Structures, Batch Payroll Runs & Payslips",
    "route": "/hrms/payroll",
    "expectedPage": "PayrollPage.tsx",
    "featureLocation": "src/features/hrms/",
    "description": "Salary compensation components, structured pay templates, monthly organization-wide payroll runs, and individual payslip generation.",
    "responsibility": "Build salary component setup (Basic, HRA, PF, Tax), salary structure assignment, monthly payroll batch execution drawer, and employee payslip generator with printable view.",
    "responsibilityBullets": [
      "Salary compensation component setup (Basic, HRA, Conveyance, PF, Professional Tax)",
      "Employee salary structure assignment and CTC breakdown view",
      "Monthly organization-wide payroll batch execution (DRAFT → PROCESSING → COMPLETED)",
      "Individual employee payslip generator with printable and downloadable view"
    ],
    "scope": [
      {
        "id": "01",
        "title": "Salary Component Master",
        "description": "Earnings and deductions setup with calculation formulas and taxability flags."
      },
      {
        "id": "02",
        "title": "Salary Structure Assignment",
        "description": "Template builder allocating earnings and deductions to job designations."
      },
      {
        "id": "03",
        "title": "Monthly Payroll Execution",
        "description": "Batch run wizard computing gross pay, deductions, and net salary for all active staff."
      },
      {
        "id": "04",
        "title": "Payslip Generation & Preview",
        "description": "Printable employee payslip with Indian statutory deduction breakdown."
      }
    ],
    "canonicalTypes": [
      {
        "name": "SalaryComponent",
        "description": "Individual earnings or deduction definition"
      },
      {
        "name": "SalaryStructure",
        "description": "Consolidated pay structure template with CTC breakdown"
      },
      {
        "name": "PayrollRun",
        "description": "Monthly payroll batch processing record"
      },
      {
        "name": "PayrollRecord",
        "description": "Individual employee computed payroll entry for a specific pay period"
      },
      {
        "name": "Payslip",
        "description": "Printable payslip document container"
      },
      {
        "name": "PayslipComponent",
        "description": "Specific line item inside a generated payslip"
      }
    ],
    "checklist": [
      "Page layout with payroll batch history table and action bar",
      "Primary page header with Execute Payroll Run action",
      "Payroll summary statistics cards (Total Gross, Net Disbursed, Total Deductions)",
      "Batch processing progress stepper (Draft → Processing → Finalized)",
      "Employee payslip view and printable modal",
      "Loading, empty, and error states",
      "Integration with canonical HRMS types",
      "Integration with existing mock layer (@mock/hrms)"
    ],
    "dependencies": [
      {
        "entity": "Employee",
        "ownerDomain": "HRMS",
        "purpose": "Beneficiary employee"
      },
      {
        "entity": "AttendanceSummary",
        "ownerDomain": "HRMS",
        "purpose": "Unpaid leave and overtime inputs"
      }
    ],
    "notes": [
      "Use canonical HRMS types from @features/hrms/types.",
      "Use existing shared components from @shared/components.",
      "Use the existing mock infrastructure (@mock/hrms) for frontend development.",
      "Keep business logic within the HRMS feature boundary.",
      "Do not create duplicate shared entities or competing type definitions.",
      "Keep backend integration separate from UI implementation.",
      "Follow the common developer guide and HRMS team guide.",
      "Do not create Finance GL journal entries or bank transactions directly."
    ]
  },
  "HRMS-DEV-05": {
    "developerId": "HRMS-DEV-05",
    "team": "Team 3 — HRMS",
    "teamNumber": 3,
    "domain": "HRMS",
    "domainCategory": "HRMS",
    "teamBadgeVariant": "team-c",
    "title": "Recruitment",
    "area": "Job Requisitions, Applicant Tracking & Interview Scorecards",
    "route": "/hrms/recruitment",
    "expectedPage": "RecruitmentPage.tsx",
    "featureLocation": "src/features/hrms/",
    "description": "Departmental manpower requisitions, external job postings, candidate applicant tracking, and structured interview scorecards.",
    "responsibility": "Build departmental job requisition approval flow, public job posting manager, applicant tracking pipeline (NEW → SCREENING → INTERVIEWING → OFFERED), and interview scorecard evaluator.",
    "responsibilityBullets": [
      "Departmental job requisition creation and headcount approval workflow",
      "Job posting management with requirements, CTC budget, and application deadlines",
      "Applicant Tracking System (ATS) pipeline (NEW → SCREENING → INTERVIEWING → OFFERED → HIRED)",
      "Structured interview evaluation scorecard with interviewer feedback and hiring recommendations"
    ],
    "scope": [
      {
        "id": "01",
        "title": "Job Requisitions",
        "description": "Departmental hiring request creation, required headcount, and budget validation."
      },
      {
        "id": "02",
        "title": "Job Postings",
        "description": "Published job vacancies with description, requirements, and portal visibility."
      },
      {
        "id": "03",
        "title": "Applicant Tracking Pipeline",
        "description": "Visual candidate stage board tracking applicant progression."
      },
      {
        "id": "04",
        "title": "Interview Scorecards",
        "description": "Interview scheduling and structured rating rubrics for interviewers."
      }
    ],
    "canonicalTypes": [
      {
        "name": "JobRequisition",
        "description": "Internal departmental manpower hiring requisition"
      },
      {
        "name": "JobPosting",
        "description": "Public or internal job opening announcement"
      },
      {
        "name": "Candidate",
        "description": "Job applicant profile with resume and contact details"
      },
      {
        "name": "Interview",
        "description": "Scheduled interview round with interviewers and meeting link"
      },
      {
        "name": "CandidateEvaluation",
        "description": "Structured scorecard evaluation and hiring decision recommendation"
      }
    ],
    "checklist": [
      "Page layout with Job Openings and Candidate Pipeline views",
      "Primary page header with Create Requisition action",
      "Candidate ATS pipeline board with drag/drop stage columns",
      "Candidate profile drawer with resume preview and notes",
      "Interview scorecard rating modal with recommendation buttons",
      "Loading, empty, and error states",
      "Integration with canonical HRMS types",
      "Integration with existing mock layer (@mock/hrms)"
    ],
    "dependencies": [
      {
        "entity": "Department",
        "ownerDomain": "HRMS",
        "purpose": "Hiring department"
      },
      {
        "entity": "Employee",
        "ownerDomain": "HRMS",
        "purpose": "Hiring manager and interviewers"
      }
    ],
    "notes": [
      "Use canonical HRMS types from @features/hrms/types.",
      "Use existing shared components from @shared/components.",
      "Use the existing mock infrastructure (@mock/hrms) for frontend development.",
      "Keep business logic within the HRMS feature boundary.",
      "Do not create duplicate shared entities or competing type definitions.",
      "Keep backend integration separate from UI implementation.",
      "Follow the common developer guide and HRMS team guide.",
      "Hired candidates convert into active Employee records in HRMS-DEV-01.",
      "Do not modify existing active employee master files directly."
    ]
  },
  "HRMS-DEV-06": {
    "developerId": "HRMS-DEV-06",
    "team": "Team 3 — HRMS",
    "teamNumber": 3,
    "domain": "HRMS",
    "domainCategory": "HRMS",
    "teamBadgeVariant": "team-c",
    "title": "Performance & Learning",
    "area": "KPI Goal Tracking, 360 Appraisals & Corporate Training",
    "route": "/hrms/performance",
    "expectedPage": "PerformanceLearningPage.tsx",
    "featureLocation": "src/features/hrms/",
    "description": "Annual KPI goal management, 360-degree performance reviews, corporate training course catalog, and employee learning progress roadmaps.",
    "responsibility": "Build goal setting and KPI progress tracker, annual appraisal review form, peer feedback collector, corporate training course catalog, and employee course completion progress.",
    "responsibilityBullets": [
      "Employee goal setting and measurable KPI target progress tracker",
      "Annual and quarterly performance appraisal review wizard (Self vs Manager ratings)",
      "360-degree peer feedback request and collection panel",
      "Corporate training course catalog with learning path assignments",
      "Employee course enrollment and completion progress tracker"
    ],
    "scope": [
      {
        "id": "01",
        "title": "KPI Goal Management",
        "description": "Individual and team objective setting with target metrics and milestone percentages."
      },
      {
        "id": "02",
        "title": "Appraisal Review Wizard",
        "description": "Multi-stage evaluation comparing self-assessment against manager review."
      },
      {
        "id": "03",
        "title": "360 Peer Feedback",
        "description": "Confidential feedback request workflow and synthesized competency ratings."
      },
      {
        "id": "04",
        "title": "Learning Catalog & Progress",
        "description": "Internal training courses with modules, quizzes, and certification tracking."
      }
    ],
    "canonicalTypes": [
      {
        "name": "PerformanceGoal",
        "description": "Employee annual or quarterly performance goal"
      },
      {
        "name": "KPI",
        "description": "Key Performance Indicator with target value and measured actual"
      },
      {
        "name": "PerformanceReview",
        "description": "Comprehensive appraisal review record"
      },
      {
        "name": "PerformanceFeedback",
        "description": "Peer or manager review comments and competency score"
      },
      {
        "name": "Course",
        "description": "Corporate training course module"
      },
      {
        "name": "LearningPlan",
        "description": "Structured training path assigned to an employee or role"
      },
      {
        "name": "LearningProgress",
        "description": "Employee module completion and quiz score tracker"
      }
    ],
    "checklist": [
      "Page layout with Performance and Learning tabs",
      "Primary page header with Set New Goal action",
      "KPI goal progress list with percentage progress bars",
      "Performance appraisal review form with rating rubrics",
      "Training course cards with Enroll action",
      "Learning progress roadmap component",
      "Loading, empty, and error states",
      "Integration with canonical HRMS types",
      "Integration with existing mock layer (@mock/hrms)"
    ],
    "dependencies": [
      {
        "entity": "Employee",
        "ownerDomain": "HRMS",
        "purpose": "Appraised employee and manager"
      }
    ],
    "notes": [
      "Use canonical HRMS types from @features/hrms/types.",
      "Use existing shared components from @shared/components.",
      "Use the existing mock infrastructure (@mock/hrms) for frontend development.",
      "Keep business logic within the HRMS feature boundary.",
      "Do not create duplicate shared entities or competing type definitions.",
      "Keep backend integration separate from UI implementation.",
      "Follow the common developer guide and HRMS team guide.",
      "Do not modify physical asset maintenance or attendance punch logs."
    ]
  },
  "HRMS-DEV-07": {
    "developerId": "HRMS-DEV-07",
    "team": "Team 3 — HRMS",
    "teamNumber": 3,
    "domain": "HRMS",
    "domainCategory": "HRMS",
    "teamBadgeVariant": "team-c",
    "title": "ESS + Assets",
    "area": "Employee Self-Service Profile & IT Hardware Asset Inventory",
    "route": "/hrms/ess-assets",
    "expectedPage": "ESSEmployeeAssetsPage.tsx",
    "featureLocation": "src/features/hrms/",
    "description": "Employee Self-Service profile management, personal information updates, and company hardware/laptop asset issuance and returns.",
    "responsibility": "Build employee self-service dashboard, personal information update forms, company IT asset directory, asset issuance and return tracking, and repair/maintenance logs.",
    "responsibilityBullets": [
      "Employee Self-Service (ESS) profile dashboard (My Details, My Requests, My Documents)",
      "Personal information update request workflow with HR verification",
      "Company IT asset directory (Laptops, Monitors, Mobile Devices, Peripherals)",
      "Asset allocation, issuance receipts, and return handover workflow",
      "Equipment maintenance and repair ticket logging"
    ],
    "scope": [
      {
        "id": "01",
        "title": "Employee Self-Service Profile",
        "description": "Personal profile view, contact details, emergency contacts, and active requests."
      },
      {
        "id": "02",
        "title": "Personal Information Updates",
        "description": "Self-service form to submit changes in address, phone, or bank details."
      },
      {
        "id": "03",
        "title": "Company Asset Inventory",
        "description": "Searchable catalog of hardware assets with serial numbers and condition status."
      },
      {
        "id": "04",
        "title": "Asset Allocation & Issuance",
        "description": "Assignment records linking assets to specific employees with handover dates."
      },
      {
        "id": "05",
        "title": "Asset Requests & Returns",
        "description": "Workflows for requesting hardware upgrades or returning equipment upon exit."
      }
    ],
    "canonicalTypes": [
      {
        "name": "Employee",
        "description": "Logged-in employee master record"
      },
      {
        "name": "EmployeeRequest",
        "description": "Generic employee self-service request (letter, update, query)"
      },
      {
        "name": "EmployeeDocument",
        "description": "Self-service uploaded documents"
      },
      {
        "name": "Asset",
        "description": "Company physical or IT asset master record (model, serial, purchase date)"
      },
      {
        "name": "AssetAssignment",
        "description": "Historical and active asset allocation to an employee"
      },
      {
        "name": "AssetMaintenance",
        "description": "Maintenance, servicing, and repair history of an asset"
      }
    ],
    "checklist": [
      "Page layout with ESS Profile and Company Assets tabs",
      "Employee self-service overview card with personal details",
      "Profile update request modal",
      "Assigned assets table with serial numbers and condition badges",
      "New asset request drawer with hardware catalog selection",
      "Asset return handover form",
      "Loading, empty, and error states",
      "Integration with canonical HRMS types",
      "Integration with existing mock layer (@mock/hrms)"
    ],
    "dependencies": [
      {
        "entity": "Employee",
        "ownerDomain": "HRMS",
        "purpose": "Beneficiary employee"
      },
      {
        "entity": "Department",
        "ownerDomain": "HRMS",
        "purpose": "Employee department"
      }
    ],
    "notes": [
      "Use canonical HRMS types from @features/hrms/types.",
      "Use existing shared components from @shared/components.",
      "Use the existing mock infrastructure (@mock/hrms) for frontend development.",
      "Keep business logic within the HRMS feature boundary.",
      "Do not create duplicate shared entities or competing type definitions.",
      "Keep backend integration separate from UI implementation.",
      "Follow the common developer guide and HRMS team guide.",
      "Do not modify payroll salary components or recruitment candidate stages."
    ]
  },
  "FIN-DEV-01": {
    "developerId": "FIN-DEV-01",
    "team": "Team 4 — Finance",
    "teamNumber": 4,
    "domain": "Finance",
    "domainCategory": "Finance",
    "teamBadgeVariant": "team-d",
    "title": "General Ledger & Reporting",
    "area": "Chart of Accounts, Double-Entry Journals & Audit Ledgers",
    "route": "/finance/general-ledger",
    "expectedPage": "GLReportingPage.tsx",
    "featureLocation": "src/features/finance/",
    "description": "Master chart of accounts, balanced double-entry journal vouchers, financial accounting periods, and general ledger audit ledgers.",
    "responsibility": "Build master chart of accounts hierarchical tree, double-entry journal entry voucher authoring drawer, fiscal period closing status, and running general ledger view.",
    "responsibilityBullets": [
      "Master chart of accounts (COA) hierarchical tree and classification (Assets, Liabilities, Equity, Revenue, Expenses)",
      "Double-entry journal voucher creation drawer with real-time total debit == total credit validation",
      "Fiscal financial period management with open/closed status controls",
      "General ledger running balance audit trail with drill-down to source vouchers"
    ],
    "scope": [
      {
        "id": "01",
        "title": "Chart of Accounts Hierarchy",
        "description": "Structured account tree with codes, account categories, and normal balances."
      },
      {
        "id": "02",
        "title": "Journal Voucher Entry Drawer",
        "description": "Multi-line debit and credit voucher authoring with balance verification."
      },
      {
        "id": "03",
        "title": "General Ledger Running Trail",
        "description": "Filterable ledger transactions by account code and date range."
      },
      {
        "id": "04",
        "title": "Financial Period Management",
        "description": "Period opening, closing, and fiscal year rollover status monitor."
      }
    ],
    "canonicalTypes": [
      {
        "name": "ChartOfAccount",
        "description": "Master financial account definition with classification and code"
      },
      {
        "name": "AccountCategory",
        "description": "Category classification union (ASSET, LIABILITY, EQUITY, REVENUE, EXPENSE)"
      },
      {
        "name": "FinancialPeriod",
        "description": "Fiscal month/quarter accounting period definition and status"
      },
      {
        "name": "JournalEntry",
        "description": "Double-entry journal voucher header"
      },
      {
        "name": "JournalEntryLine",
        "description": "Line item inside a journal voucher with debit or credit amount"
      },
      {
        "name": "LedgerEntry",
        "description": "Permanent posted ledger transaction with running balance"
      }
    ],
    "checklist": [
      "Page layout with COA Tree and Journal Vouchers tabs",
      "Primary page header with New Journal Entry action",
      "Hierarchical Chart of Accounts browser with search",
      "Double-entry journal authoring drawer with debit/credit balance validator",
      "Running General Ledger audit table with filter by account",
      "Fiscal period status indicator banner",
      "Loading, empty, and error states",
      "Integration with canonical Finance types",
      "Integration with existing mock layer (@mock/finance)"
    ],
    "dependencies": [
      {
        "entity": "Currency",
        "ownerDomain": "Shared",
        "purpose": "Base reporting and transaction currency"
      }
    ],
    "notes": [
      "Use canonical Finance types from @features/finance/types.",
      "Use existing shared components from @shared/components.",
      "Use the existing mock infrastructure (@mock/finance) for frontend development.",
      "Keep business logic within the Finance feature boundary.",
      "Do not create duplicate shared entities or competing type definitions.",
      "Keep backend integration separate from UI implementation.",
      "Follow the common developer guide and Finance team guide.",
      "Ensure double-entry rule (Debit == Credit) is enforced in all voucher authoring forms.",
      "Do not create customer invoices or vendor bills directly."
    ]
  },
  "FIN-DEV-02": {
    "developerId": "FIN-DEV-02",
    "team": "Team 4 — Finance",
    "teamNumber": 4,
    "domain": "Finance",
    "domainCategory": "Finance",
    "teamBadgeVariant": "team-d",
    "title": "AP + AR + Banking",
    "area": "Customer Invoicing, Vendor Bills, Aging & Bank Reconciliation",
    "route": "/finance/ap-ar-banking",
    "expectedPage": "APARBankingPage.tsx",
    "featureLocation": "src/features/finance/",
    "description": "Accounts receivable customer invoicing & collections, accounts payable vendor bills & disbursements, and bank statement reconciliations.",
    "responsibility": "Build customer invoice grid with GST breakdown, accounts receivable aging bracket table, vendor bill matching against POs, payment disbursement vouchers, and bank statement reconciliation matcher.",
    "responsibilityBullets": [
      "Customer invoice generation and collections grid with CGST, SGST, IGST breakdown",
      "Accounts receivable (AR) aging bracket table (Current, 1-30, 31-60, 61-90, 90+ days)",
      "Accounts payable (AP) vendor bill matching against ERP purchase orders",
      "Payment disbursement vouchers and payment allocation tracking",
      "Bank account management and two-way bank statement reconciliation matcher"
    ],
    "scope": [
      {
        "id": "01",
        "title": "Customer Invoicing (AR)",
        "description": "Billing invoices with Indian GST line items, payment terms, and status badges."
      },
      {
        "id": "02",
        "title": "Vendor Bills (AP)",
        "description": "Inbound supplier invoices matched against ERP purchase orders with payment scheduling."
      },
      {
        "id": "03",
        "title": "Aging Analysis Brackets",
        "description": "Aging breakdown of outstanding receivables and payables across time buckets."
      },
      {
        "id": "04",
        "title": "Bank Account & Reconciliation",
        "description": "Bank transaction feed matched against book ledger entries with difference clearance."
      }
    ],
    "canonicalTypes": [
      {
        "name": "CustomerInvoice",
        "description": "Formal sales invoice issued to a customer with tax breakdown"
      },
      {
        "name": "CustomerInvoiceLine",
        "description": "Detailed line item on a customer invoice"
      },
      {
        "name": "Receipt",
        "description": "Payment received from a customer"
      },
      {
        "name": "Collection",
        "description": "Accounts receivable collection tracking entry"
      },
      {
        "name": "ReceivableAging",
        "description": "AR aging bracket summary"
      },
      {
        "name": "VendorBill",
        "description": "Inbound supplier bill matching a purchase order"
      },
      {
        "name": "VendorBillLine",
        "description": "Line item on a vendor bill"
      },
      {
        "name": "PayableAging",
        "description": "AP aging bracket summary"
      },
      {
        "name": "Payment",
        "description": "Payment disbursement voucher issued to a vendor"
      },
      {
        "name": "PaymentAllocation",
        "description": "Allocation of payment amount against specific invoices"
      },
      {
        "name": "BankAccount",
        "description": "Corporate bank account master record"
      },
      {
        "name": "BankTransaction",
        "description": "Imported bank statement line item"
      },
      {
        "name": "BankReconciliation",
        "description": "Reconciliation session matching bank statement to book ledger"
      }
    ],
    "checklist": [
      "Page layout with AR Invoices, AP Bills, and Banking tabs",
      "Primary page header with New Invoice and New Bill actions",
      "AR and AP aging summary bracket cards",
      "Customer invoice authoring drawer with GST tax calculation",
      "Vendor bill matching drawer linking to PurchaseOrder",
      "Two-column bank reconciliation workspace with match buttons",
      "Loading, empty, and error states",
      "Integration with canonical Finance types",
      "Integration with existing mock layer (@mock/finance)"
    ],
    "dependencies": [
      {
        "entity": "Customer",
        "ownerDomain": "CRM",
        "purpose": "Invoice recipient"
      },
      {
        "entity": "Vendor",
        "ownerDomain": "ERP",
        "purpose": "Bill payee"
      },
      {
        "entity": "PurchaseOrder",
        "ownerDomain": "ERP",
        "purpose": "Purchase order matched to vendor bill"
      }
    ],
    "notes": [
      "Use canonical Finance types from @features/finance/types.",
      "Use existing shared components from @shared/components.",
      "Use the existing mock infrastructure (@mock/finance) for frontend development.",
      "Keep business logic within the Finance feature boundary.",
      "Do not create duplicate shared entities or competing type definitions.",
      "Keep backend integration separate from UI implementation.",
      "Follow the common developer guide and Finance team guide.",
      "Consume canonical Vendor and Customer from ERP and CRM.",
      "Do not modify expense claim policies or employee master records."
    ]
  },
  "FIN-DEV-03": {
    "developerId": "FIN-DEV-03",
    "team": "Team 4 — Finance",
    "teamNumber": 4,
    "domain": "Finance",
    "domainCategory": "Finance",
    "teamBadgeVariant": "team-d",
    "title": "Expenses + Budgets + Tax",
    "area": "Employee Expense Claims, Department Budgets & Statutory GST",
    "route": "/finance/expenses-budgets-tax",
    "expectedPage": "ExpensesBudgetsTaxPage.tsx",
    "featureLocation": "src/features/finance/",
    "description": "Employee business expense claims, departmental budget allocations & variance calculations, and Indian statutory GST tax rule configurations.",
    "responsibility": "Build employee business expense reimbursement submission and approval queue, departmental budget allocation matrix with variance indicator, and Indian statutory GST tax configuration.",
    "responsibilityBullets": [
      "Employee business expense claim submission and receipt attachment queue",
      "Departmental budget allocation matrix with real-time spend variance indicator",
      "Indian statutory GST tax configuration (CGST, SGST, IGST rates by HSN/SAC code)",
      "Monthly tax period filing monitor and statutory return preparation summary"
    ],
    "scope": [
      {
        "id": "01",
        "title": "Expense Claims & Reimbursements",
        "description": "Multi-item expense report filing with receipt attachments and manager approval."
      },
      {
        "id": "02",
        "title": "Departmental Budget Allocations",
        "description": "Annual/quarterly departmental budget allocation and actual vs budget variance tracking."
      },
      {
        "id": "03",
        "title": "Statutory Tax Configuration",
        "description": "GST tax rules, tax rate slabs (5%, 12%, 18%, 28%), and HSN/SAC code mapping."
      },
      {
        "id": "04",
        "title": "Tax Period Monitor",
        "description": "Periodic filing readiness dashboard tracking collected output GST vs input tax credit (ITC)."
      }
    ],
    "canonicalTypes": [
      {
        "name": "ExpenseClaim",
        "description": "Employee expense claim report header"
      },
      {
        "name": "ExpenseItem",
        "description": "Itemized expenditure entry with receipt attachment and tax"
      },
      {
        "name": "Reimbursement",
        "description": "Approved disbursement voucher paying back the claimant"
      },
      {
        "name": "Budget",
        "description": "Departmental fiscal budget record"
      },
      {
        "name": "BudgetAllocation",
        "description": "Allocation of budget across specific account codes"
      },
      {
        "name": "BudgetVariance",
        "description": "Variance calculation tracking budgeted vs actual spend"
      },
      {
        "name": "TaxConfiguration",
        "description": "Global tax configuration parameters"
      },
      {
        "name": "TaxRule",
        "description": "Statutory tax calculation rule based on product or service type"
      },
      {
        "name": "TaxCalculation",
        "description": "Computed tax breakdown container"
      },
      {
        "name": "TaxPeriod",
        "description": "Monthly or quarterly tax filing period"
      }
    ],
    "checklist": [
      "Page layout with Expenses, Budgets, and Tax Rules tabs",
      "Primary page header with Submit Expense action",
      "Expense claim queue with receipt preview and approval actions",
      "Departmental budget variance matrix (Budgeted vs Actual with variance badges)",
      "Indian GST rate configuration table (CGST, SGST, IGST by HSN/SAC)",
      "Tax period filing summary card",
      "Loading, empty, and error states",
      "Integration with canonical Finance types",
      "Integration with existing mock layer (@mock/finance)"
    ],
    "dependencies": [
      {
        "entity": "Employee",
        "ownerDomain": "HRMS",
        "purpose": "Expense claimant"
      },
      {
        "entity": "Department",
        "ownerDomain": "HRMS",
        "purpose": "Budgeted department"
      }
    ],
    "notes": [
      "Use canonical Finance types from @features/finance/types.",
      "Use existing shared components from @shared/components.",
      "Use the existing mock infrastructure (@mock/finance) for frontend development.",
      "Keep business logic within the Finance feature boundary.",
      "Do not create duplicate shared entities or competing type definitions.",
      "Keep backend integration separate from UI implementation.",
      "Follow the common developer guide and Finance team guide.",
      "Do not modify Chart of Accounts master codes or bank account balances."
    ]
  }
};

/**
 * Lookup helper to retrieve workspace definition by developerId or canonical route
 */
export function getWorkspaceDefinition(key?: string): DeveloperWorkspaceDefinition | undefined {
  if (!key) return undefined;
  if (WORKSPACE_DEFINITIONS[key]) {
    return WORKSPACE_DEFINITIONS[key];
  }
  const normalizedKey = key.toLowerCase().replace(/\/$/, '');
  return Object.values(WORKSPACE_DEFINITIONS).find(
    def => def.route.toLowerCase() === normalizedKey ||
      (def.route === '/erp' && normalizedKey === '/erp/dashboard') ||
      (def.route === '/crm' && normalizedKey === '/crm/dashboard') ||
      (def.route === '/hrms/employees' && normalizedKey === '/hrms') ||
      (def.route === '/finance/general-ledger' && normalizedKey === '/finance')
  );
}
