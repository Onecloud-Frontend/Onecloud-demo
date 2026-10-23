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
} from '@features/erp/types';
import type { ErpReportSourceData, ProfitLossData } from '@features/erp/types/reportTypes';
import { ErpWorkspaceStatus } from '@features/erp/types';

export const mockErpWorkspaceStatus: ErpWorkspaceStatus = {
  domainCode: 'ERP',
  domainName: 'Enterprise Resource Planning',
  status: 'READY_FOR_DEVELOPMENT',
  pendingRequirementsNote: 'TBD — Requirement/Backend Contract Required',
  lastUpdated: '2026-09-29T12:00:00Z',
};

const reportAddress = {
  street: '12 HITEC City Road',
  city: 'Hyderabad',
  state: 'Telangana',
  postalCode: '500081',
  country: 'IN',
};

const products: Product[] = [
  { id: 'prd-001', sku: 'GRC-RICE-25KG', name: 'Sona Masoori Rice', description: '25 kg bag of premium everyday rice', categoryId: 'groceries', unit: 'BOXES', brand: 'Annapurna', costPrice: 1125, sellingPrice: 1399, reorderLevel: 18, reorderQuantity: 40, taxRate: 5, status: 'ACTIVE', createdAt: '2025-01-12T09:00:00Z', updatedAt: '2026-09-30T09:00:00Z' },
  { id: 'prd-002', sku: 'GRC-OIL-SF5L', name: 'Sunflower Oil', description: '5 litre cooking oil tin', categoryId: 'groceries', unit: 'LITERS', brand: 'Fortune', costPrice: 620, sellingPrice: 745, reorderLevel: 8, reorderQuantity: 20, taxRate: 5, status: 'ACTIVE', createdAt: '2025-02-02T09:00:00Z', updatedAt: '2026-09-25T09:00:00Z' },
  { id: 'prd-003', sku: 'ELC-MOB-128', name: 'Android Smartphone 128GB', description: '5G smartphone with 128GB storage', categoryId: 'electronics', unit: 'UNITS', brand: 'OnePlus', costPrice: 18999, sellingPrice: 21999, reorderLevel: 5, reorderQuantity: 12, taxRate: 18, status: 'ACTIVE', createdAt: '2025-03-11T09:00:00Z', updatedAt: '2026-09-20T09:00:00Z' },
  { id: 'prd-004', sku: 'ELC-LAP-I5-16', name: 'Business Laptop 16GB', description: 'Intel Core i5 laptop with 16GB RAM', categoryId: 'electronics', unit: 'UNITS', brand: 'Lenovo', costPrice: 48999, sellingPrice: 55999, reorderLevel: 8, reorderQuantity: 20, taxRate: 18, status: 'ACTIVE', createdAt: '2025-04-18T09:00:00Z', updatedAt: '2026-10-01T09:00:00Z' },
  { id: 'prd-005', sku: 'GRC-DAL-TOOR1', name: 'Toor Dal', description: '1 kg pack of cleaned split pigeon peas', categoryId: 'groceries', unit: 'PACKS', brand: 'Tata Sampann', costPrice: 142, sellingPrice: 179, reorderLevel: 10, reorderQuantity: 24, taxRate: 5, status: 'ACTIVE', createdAt: '2025-05-08T09:00:00Z', updatedAt: '2026-09-28T09:00:00Z' },
  { id: 'prd-006', sku: 'GRC-SUGAR-1KG', name: 'Refined Sugar', description: '1 kg pack of fine granulated sugar', categoryId: 'groceries', unit: 'KG', brand: 'Madhur', costPrice: 42, sellingPrice: 52, reorderLevel: 40, reorderQuantity: 100, taxRate: 5, status: 'ACTIVE', createdAt: '2025-06-01T09:00:00Z', updatedAt: '2026-10-02T09:00:00Z' },
  { id: 'prd-007', sku: 'ELC-TV-43-4K', name: '43-inch 4K Smart TV', description: 'LED smart television with 4K resolution', categoryId: 'electronics', unit: 'UNITS', brand: 'Samsung', costPrice: 27999, sellingPrice: 32999, reorderLevel: 12, reorderQuantity: 18, taxRate: 18, status: 'ACTIVE', createdAt: '2025-07-09T09:00:00Z', updatedAt: '2026-10-03T09:00:00Z' },
  { id: 'prd-008', sku: 'GRC-TEA-500G', name: 'Assam Tea Leaves', description: '500 g pack of strong Assam tea', categoryId: 'groceries', unit: 'PACKS', brand: 'Tata Tea', costPrice: 185, sellingPrice: 235, reorderLevel: 14, reorderQuantity: 26, taxRate: 5, status: 'ACTIVE', createdAt: '2025-08-13T09:00:00Z', updatedAt: '2026-10-04T09:00:00Z' },
  { id: 'prd-009', sku: 'ELC-MIX-750W', name: '750W Mixer Grinder', description: 'Three-jar mixer grinder for everyday cooking', categoryId: 'electronics', unit: 'UNITS', brand: 'Preethi', costPrice: 2899, sellingPrice: 3599, reorderLevel: 8, reorderQuantity: 16, taxRate: 18, status: 'ACTIVE', createdAt: '2025-09-05T09:00:00Z', updatedAt: '2026-10-03T09:00:00Z' },
  { id: 'prd-010', sku: 'GRC-RICE-BAS-5KG', name: 'Premium Basmati Rice', description: 'Aromatic long-grain basmati rice, 5 kg bag', categoryId: 'groceries', unit: 'BOXES', brand: 'India Gate', costPrice: 510, sellingPrice: 649, reorderLevel: 16, reorderQuantity: 36, taxRate: 5, status: 'ACTIVE', createdAt: '2025-10-10T09:00:00Z', updatedAt: '2026-10-05T09:00:00Z' },
  { id: 'prd-011', sku: 'GRC-MILK-UHT1L', name: 'UHT Toned Milk', description: 'Long-life toned milk, 1 litre carton', categoryId: 'groceries', unit: 'LITERS', brand: 'Amul', costPrice: 68, sellingPrice: 78, reorderLevel: 30, reorderQuantity: 80, taxRate: 0, status: 'ACTIVE', createdAt: '2025-10-12T09:00:00Z', updatedAt: '2026-10-06T09:00:00Z' },
  { id: 'prd-012', sku: 'ELC-EAR-TWS-BLK', name: 'Wireless Bluetooth Earbuds', description: 'True wireless earbuds with charging case', categoryId: 'electronics', unit: 'PIECES', brand: 'boAt', costPrice: 1199, sellingPrice: 1699, reorderLevel: 15, reorderQuantity: 30, taxRate: 18, status: 'ACTIVE', createdAt: '2025-10-14T09:00:00Z', updatedAt: '2026-10-07T09:00:00Z' },
  { id: 'prd-013', sku: 'GRC-SPICE-GM200', name: 'Garam Masala', description: '200 g aromatic ground spice blend', categoryId: 'groceries', unit: 'PACKS', brand: 'Everest', costPrice: 78, sellingPrice: 105, reorderLevel: 20, reorderQuantity: 50, taxRate: 5, status: 'ACTIVE', createdAt: '2025-10-16T09:00:00Z', updatedAt: '2026-10-08T09:00:00Z' },
  { id: 'prd-014', sku: 'ELC-FRIDGE-260L', name: '260L Frost-Free Refrigerator', description: 'Double-door inverter refrigerator', categoryId: 'electronics', unit: 'UNITS', brand: 'Whirlpool', costPrice: 24999, sellingPrice: 29990, reorderLevel: 4, reorderQuantity: 8, taxRate: 18, status: 'ACTIVE', createdAt: '2025-10-18T09:00:00Z', updatedAt: '2026-10-09T09:00:00Z' },
  { id: 'prd-015', sku: 'GRC-CHANA-1KG', name: 'Kabuli Chana', description: '1 kg pack of premium chickpeas', categoryId: 'groceries', unit: 'PACKS', brand: 'Tata Sampann', costPrice: 96, sellingPrice: 125, reorderLevel: 18, reorderQuantity: 40, taxRate: 5, status: 'ACTIVE', createdAt: '2025-10-20T09:00:00Z', updatedAt: '2026-10-10T09:00:00Z' },
];

const warehouses: Warehouse[] = [
  { id: 'wh-001', code: 'HYD-01', name: 'Hyderabad Central', address: reportAddress, contactPerson: 'Arjun Reddy', phone: '+91-98490-12041', totalCapacitySquareFeet: 42000, isMainWarehouse: true, status: 'ACTIVE', createdAt: '2024-01-01T09:00:00Z', updatedAt: '2026-09-01T09:00:00Z' },
  { id: 'wh-002', code: 'BLR-02', name: 'Bengaluru North', address: { ...reportAddress, street: '48 Peenya Industrial Area', city: 'Bengaluru', state: 'Karnataka', postalCode: '560058' }, contactPerson: 'Kavya Nair', phone: '+91-98450-12072', totalCapacitySquareFeet: 28000, isMainWarehouse: false, status: 'ACTIVE', createdAt: '2024-03-12T09:00:00Z', updatedAt: '2026-09-01T09:00:00Z' },
  { id: 'wh-003', code: 'CHE-03', name: 'Chennai Port', address: { ...reportAddress, street: '17 Ambattur Industrial Estate', city: 'Chennai', state: 'Tamil Nadu', postalCode: '600058' }, contactPerson: 'Sanjay Kumar', phone: '+91-98400-12018', totalCapacitySquareFeet: 31000, isMainWarehouse: false, status: 'ACTIVE', createdAt: '2024-05-22T09:00:00Z', updatedAt: '2026-09-01T09:00:00Z' },
  { id: 'wh-004', code: 'MUM-04', name: 'Mumbai West', address: { ...reportAddress, street: '22 Andheri MIDC', city: 'Mumbai', state: 'Maharashtra', postalCode: '400093' }, contactPerson: 'Isha Patel', phone: '+91-98200-12031', totalCapacitySquareFeet: 24000, isMainWarehouse: false, status: 'ACTIVE', createdAt: '2024-07-18T09:00:00Z', updatedAt: '2026-09-02T09:00:00Z' },
  { id: 'wh-005', code: 'PUN-05', name: 'Pune South', address: { ...reportAddress, street: '6 Hadapsar Industrial Estate', city: 'Pune', state: 'Maharashtra', postalCode: '411013' }, contactPerson: 'Rahul Deshmukh', phone: '+91-98220-12097', totalCapacitySquareFeet: 26000, isMainWarehouse: false, status: 'ACTIVE', createdAt: '2024-08-29T09:00:00Z', updatedAt: '2026-09-05T09:00:00Z' },
  { id: 'wh-006', code: 'DEL-06', name: 'Delhi NCR Hub', address: { ...reportAddress, street: '31 Okhla Industrial Estate', city: 'New Delhi', state: 'Delhi', postalCode: '110020' }, contactPerson: 'Neha Sharma', phone: '+91-98110-12066', totalCapacitySquareFeet: 36000, isMainWarehouse: false, status: 'ACTIVE', createdAt: '2024-10-14T09:00:00Z', updatedAt: '2026-09-08T09:00:00Z' },
  { id: 'wh-007', code: 'KOL-07', name: 'Kolkata East', address: { ...reportAddress, street: '14 Kasba Industrial Estate', city: 'Kolkata', state: 'West Bengal', postalCode: '700107' }, contactPerson: 'Ananya Das', phone: '+91-98310-12077', totalCapacitySquareFeet: 22000, isMainWarehouse: false, status: 'ACTIVE', createdAt: '2024-11-20T09:00:00Z', updatedAt: '2026-09-10T09:00:00Z' },
];

const inventory: InventoryItem[] = [
  { id: 'inv-001', productId: 'prd-001', warehouseId: 'wh-001', quantityOnHand: 42, quantityReserved: 8, quantityAvailable: 34, quantityInTransit: 12, averageUnitCost: 1125, lastStockTakeDate: '2026-10-01', reorderPoint: 18 },
  { id: 'inv-002', productId: 'prd-002', warehouseId: 'wh-001', quantityOnHand: 7, quantityReserved: 2, quantityAvailable: 5, quantityInTransit: 10, averageUnitCost: 620, lastStockTakeDate: '2026-09-28', reorderPoint: 8 },
  { id: 'inv-003', productId: 'prd-003', warehouseId: 'wh-002', quantityOnHand: 13, quantityReserved: 4, quantityAvailable: 9, quantityInTransit: 0, averageUnitCost: 18999, lastStockTakeDate: '2026-09-24', reorderPoint: 5 },
  { id: 'inv-004', productId: 'prd-004', warehouseId: 'wh-002', quantityOnHand: 19, quantityReserved: 6, quantityAvailable: 13, quantityInTransit: 30, averageUnitCost: 48999, lastStockTakeDate: '2026-10-02', reorderPoint: 8 },
  { id: 'inv-005', productId: 'prd-005', warehouseId: 'wh-003', quantityOnHand: 28, quantityReserved: 3, quantityAvailable: 25, quantityInTransit: 8, averageUnitCost: 142, lastStockTakeDate: '2026-09-21', reorderPoint: 10 },
  { id: 'inv-006', productId: 'prd-006', warehouseId: 'wh-003', quantityOnHand: 36, quantityReserved: 12, quantityAvailable: 24, quantityInTransit: 50, averageUnitCost: 42, lastStockTakeDate: '2026-09-29', reorderPoint: 40 },
  { id: 'inv-007', productId: 'prd-001', warehouseId: 'wh-002', quantityOnHand: 21, quantityReserved: 2, quantityAvailable: 19, quantityInTransit: 0, averageUnitCost: 1125, lastStockTakeDate: '2026-09-18', reorderPoint: 18 },
  { id: 'inv-008', productId: 'prd-007', warehouseId: 'wh-001', quantityOnHand: 9, quantityReserved: 3, quantityAvailable: 6, quantityInTransit: 14, averageUnitCost: 27999, lastStockTakeDate: '2026-09-30', reorderPoint: 12 },
  { id: 'inv-009', productId: 'prd-008', warehouseId: 'wh-004', quantityOnHand: 17, quantityReserved: 5, quantityAvailable: 12, quantityInTransit: 8, averageUnitCost: 185, lastStockTakeDate: '2026-09-27', reorderPoint: 14 },
  { id: 'inv-010', productId: 'prd-009', warehouseId: 'wh-005', quantityOnHand: 11, quantityReserved: 2, quantityAvailable: 9, quantityInTransit: 3, averageUnitCost: 2899, lastStockTakeDate: '2026-10-04', reorderPoint: 8 },
  { id: 'inv-011', productId: 'prd-005', warehouseId: 'wh-005', quantityOnHand: 14, quantityReserved: 6, quantityAvailable: 8, quantityInTransit: 0, averageUnitCost: 142, lastStockTakeDate: '2026-10-01', reorderPoint: 10 },
  { id: 'inv-012', productId: 'prd-006', warehouseId: 'wh-004', quantityOnHand: 44, quantityReserved: 8, quantityAvailable: 36, quantityInTransit: 12, averageUnitCost: 42, lastStockTakeDate: '2026-09-29', reorderPoint: 40 },
  { id: 'inv-013', productId: 'prd-010', warehouseId: 'wh-006', quantityOnHand: 32, quantityReserved: 6, quantityAvailable: 26, quantityInTransit: 18, averageUnitCost: 510, lastStockTakeDate: '2026-10-08', reorderPoint: 16 },
  { id: 'inv-014', productId: 'prd-011', warehouseId: 'wh-007', quantityOnHand: 48, quantityReserved: 12, quantityAvailable: 36, quantityInTransit: 24, averageUnitCost: 68, lastStockTakeDate: '2026-10-09', reorderPoint: 30 },
  { id: 'inv-015', productId: 'prd-012', warehouseId: 'wh-006', quantityOnHand: 22, quantityReserved: 4, quantityAvailable: 18, quantityInTransit: 10, averageUnitCost: 1199, lastStockTakeDate: '2026-10-09', reorderPoint: 15 },
  { id: 'inv-016', productId: 'prd-013', warehouseId: 'wh-003', quantityOnHand: 55, quantityReserved: 8, quantityAvailable: 47, quantityInTransit: 20, averageUnitCost: 78, lastStockTakeDate: '2026-10-10', reorderPoint: 20 },
  { id: 'inv-017', productId: 'prd-014', warehouseId: 'wh-007', quantityOnHand: 6, quantityReserved: 1, quantityAvailable: 5, quantityInTransit: 3, averageUnitCost: 24999, lastStockTakeDate: '2026-10-10', reorderPoint: 4 },
  { id: 'inv-018', productId: 'prd-015', warehouseId: 'wh-005', quantityOnHand: 38, quantityReserved: 7, quantityAvailable: 31, quantityInTransit: 16, averageUnitCost: 96, lastStockTakeDate: '2026-10-11', reorderPoint: 18 },
];

const vendors: Vendor[] = [
  { id: 'ven-001', vendorCode: 'VEN-1042', name: 'Northstar Components', category: 'RAW_MATERIALS', email: 'orders@northstar.example', phone: '+1-512-555-0104', paymentTermsDays: 30, currency: 'USD', status: 'ACTIVE', rating: 4.7, billingAddress: reportAddress, shippingAddress: reportAddress, primaryContact: { name: 'Jamie Park', email: 'jamie@northstar.example', phone: '+1-512-555-0105', designation: 'Account lead' }, createdAt: '2024-02-12T09:00:00Z', updatedAt: '2026-10-01T09:00:00Z' },
  { id: 'ven-002', vendorCode: 'VEN-1088', name: 'VoltEdge Supply', category: 'EQUIPMENT', email: 'sales@voltedge.example', phone: '+1-214-555-0155', paymentTermsDays: 45, currency: 'USD', status: 'ACTIVE', rating: 4.1, billingAddress: { ...reportAddress, city: 'Dallas' }, shippingAddress: reportAddress, primaryContact: { name: 'Sam Rivera', email: 'sam@voltedge.example', phone: '+1-214-555-0156' }, createdAt: '2024-05-10T09:00:00Z', updatedAt: '2026-09-29T09:00:00Z' },
  { id: 'ven-003', vendorCode: 'VEN-1120', name: 'FrameWorks Logistics', category: 'LOGISTICS', email: 'dispatch@frameworks.example', phone: '+1-713-555-0161', paymentTermsDays: 30, currency: 'USD', status: 'UNDER_REVIEW', rating: 3.6, billingAddress: { ...reportAddress, city: 'Houston' }, shippingAddress: reportAddress, primaryContact: { name: 'Taylor Reed', email: 'taylor@frameworks.example', phone: '+1-713-555-0162' }, createdAt: '2024-07-08T09:00:00Z', updatedAt: '2026-09-27T09:00:00Z' },
  { id: 'ven-004', vendorCode: 'VEN-1175', name: 'Lone Star Industrial', category: 'GENERAL', email: 'team@lonestar.example', phone: '+1-512-555-0183', paymentTermsDays: 60, currency: 'USD', status: 'ACTIVE', rating: 4.4, billingAddress: reportAddress, shippingAddress: reportAddress, primaryContact: { name: 'Alex Kim', email: 'alex@lonestar.example', phone: '+1-512-555-0184' }, createdAt: '2025-01-17T09:00:00Z', updatedAt: '2026-10-03T09:00:00Z' },
  { id: 'ven-005', vendorCode: 'VEN-1208', name: 'Beacon IT Services', category: 'SERVICES', email: 'support@beaconit.example', phone: '+1-512-555-0191', paymentTermsDays: 35, currency: 'USD', status: 'ACTIVE', rating: 4.8, billingAddress: reportAddress, shippingAddress: { ...reportAddress, city: 'Austin' }, primaryContact: { name: 'Drew Bell', email: 'drew@beaconit.example', phone: '+1-512-555-0192', designation: 'Solutions manager' }, createdAt: '2025-03-14T09:00:00Z', updatedAt: '2026-10-04T09:00:00Z' },
  { id: 'ven-006', vendorCode: 'VEN-1224', name: 'Summit Logistics Group', category: 'LOGISTICS', email: 'ops@summitlogistics.example', phone: '+1-214-555-0204', paymentTermsDays: 20, currency: 'USD', status: 'ACTIVE', rating: 4.3, billingAddress: { ...reportAddress, city: 'Dallas' }, shippingAddress: { ...reportAddress, city: 'Dallas' }, primaryContact: { name: 'Morgan Chan', email: 'morgan@summitlogistics.example', phone: '+1-214-555-0205', designation: 'Dispatch lead' }, createdAt: '2025-04-01T09:00:00Z', updatedAt: '2026-10-02T09:00:00Z' },
  { id: 'ven-007', vendorCode: 'VEN-2041', name: 'Deccan Fresh Foods', category: 'RAW_MATERIALS', email: 'orders@deccanfresh.example', phone: '+91-404-555-2041', paymentTermsDays: 15, currency: 'INR', status: 'ACTIVE', rating: 4.6, gstin: '36AABCD1234E1Z5', billingAddress: reportAddress, shippingAddress: reportAddress, primaryContact: { name: 'Priya Reddy', email: 'priya@deccanfresh.example', phone: '+91-98490-22041', designation: 'Sales manager' }, createdAt: '2025-06-15T09:00:00Z', updatedAt: '2026-10-08T09:00:00Z' },
  { id: 'ven-008', vendorCode: 'VEN-2088', name: 'Bengaluru Digital Mart', category: 'EQUIPMENT', email: 'sales@bdmart.example', phone: '+91-804-555-2088', paymentTermsDays: 30, currency: 'INR', status: 'ACTIVE', rating: 4.5, gstin: '29AABCD5678F1Z2', billingAddress: { ...reportAddress, street: '21 Electronics City Phase 1', city: 'Bengaluru', state: 'Karnataka', postalCode: '560100' }, shippingAddress: reportAddress, primaryContact: { name: 'Vikram Shetty', email: 'vikram@bdmart.example', phone: '+91-98450-22088', designation: 'Key accounts' }, createdAt: '2025-07-20T09:00:00Z', updatedAt: '2026-10-09T09:00:00Z' },
  { id: 'ven-009', vendorCode: 'VEN-2126', name: 'Eastern Harvest Trading', category: 'GENERAL', email: 'supply@easternharvest.example', phone: '+91-334-555-2126', paymentTermsDays: 20, currency: 'INR', status: 'ACTIVE', rating: 4.2, gstin: '19AABCD9012G1Z8', billingAddress: { ...reportAddress, street: '8 Kasba Industrial Estate', city: 'Kolkata', state: 'West Bengal', postalCode: '700107' }, shippingAddress: reportAddress, primaryContact: { name: 'Ananya Das', email: 'ananya@easternharvest.example', phone: '+91-98310-22126', designation: 'Procurement liaison' }, createdAt: '2025-08-02T09:00:00Z', updatedAt: '2026-10-10T09:00:00Z' },
];

const vendorEvaluations: VendorEvaluation[] = [
  { id: 'eval-001', vendorId: 'ven-001', evaluationDate: '2026-10-01', evaluatorId: 'usr-104', qualityRating: 4.8, deliveryRating: 4.6, pricingRating: 4.2, overallScore: 4.5, remarks: 'Consistent lead times.' },
  { id: 'eval-002', vendorId: 'ven-002', evaluationDate: '2026-09-29', evaluatorId: 'usr-104', qualityRating: 4.2, deliveryRating: 3.8, pricingRating: 4.1, overallScore: 4.0 },
  { id: 'eval-003', vendorId: 'ven-003', evaluationDate: '2026-09-27', evaluatorId: 'usr-104', qualityRating: 3.9, deliveryRating: 3.4, pricingRating: 4.0, overallScore: 3.8, remarks: 'Review recent late arrivals.' },
  { id: 'eval-004', vendorId: 'ven-004', evaluationDate: '2026-10-03', evaluatorId: 'usr-108', qualityRating: 4.5, deliveryRating: 4.7, pricingRating: 4.0, overallScore: 4.4 },
  { id: 'eval-005', vendorId: 'ven-005', evaluationDate: '2026-10-04', evaluatorId: 'usr-108', qualityRating: 4.9, deliveryRating: 4.8, pricingRating: 4.6, overallScore: 4.8, remarks: 'Excellent support continuity.' },
  { id: 'eval-006', vendorId: 'ven-006', evaluationDate: '2026-10-02', evaluatorId: 'usr-107', qualityRating: 4.1, deliveryRating: 4.4, pricingRating: 3.8, overallScore: 4.1 },
  { id: 'eval-007', vendorId: 'ven-007', evaluationDate: '2026-10-08', evaluatorId: 'usr-104', qualityRating: 4.7, deliveryRating: 4.5, pricingRating: 4.6, overallScore: 4.6, remarks: 'Fresh stock and dependable dispatch.' },
  { id: 'eval-008', vendorId: 'ven-008', evaluationDate: '2026-10-09', evaluatorId: 'usr-108', qualityRating: 4.6, deliveryRating: 4.3, pricingRating: 4.4, overallScore: 4.4, remarks: 'Good availability of consumer electronics.' },
  { id: 'eval-009', vendorId: 'ven-009', evaluationDate: '2026-10-10', evaluatorId: 'usr-107', qualityRating: 4.2, deliveryRating: 4.1, pricingRating: 4.3, overallScore: 4.2 },
];

const purchaseOrders: PurchaseOrder[] = [
  { id: 'po-001', poNumber: 'PO-26091', vendorId: 'ven-001', requestId: 'req-041', orderDate: '2026-09-11', expectedDeliveryDate: '2026-09-20', status: 'RECEIVED', currency: 'USD', subtotal: 7560, taxAmount: 623.7, discountAmount: 0, totalAmount: 8183.7, shippingAddress: reportAddress, items: [], createdBy: 'usr-104', approvedBy: 'usr-102', createdAt: '2026-09-11T09:00:00Z', updatedAt: '2026-09-20T09:00:00Z' },
  { id: 'po-002', poNumber: 'PO-26102', vendorId: 'ven-002', requestId: 'req-046', orderDate: '2026-09-16', expectedDeliveryDate: '2026-10-04', status: 'PARTIALLY_RECEIVED', currency: 'USD', subtotal: 4960, taxAmount: 409.2, discountAmount: 100, totalAmount: 5269.2, shippingAddress: reportAddress, items: [], createdBy: 'usr-107', approvedBy: 'usr-102', createdAt: '2026-09-16T09:00:00Z', updatedAt: '2026-10-02T09:00:00Z' },
  { id: 'po-003', poNumber: 'PO-26124', vendorId: 'ven-003', requestId: 'req-051', orderDate: '2026-09-23', expectedDeliveryDate: '2026-10-08', status: 'SENT', currency: 'USD', subtotal: 3180, taxAmount: 262.35, discountAmount: 0, totalAmount: 3442.35, shippingAddress: reportAddress, items: [], createdBy: 'usr-107', approvedBy: 'usr-102', createdAt: '2026-09-23T09:00:00Z', updatedAt: '2026-09-24T09:00:00Z' },
  { id: 'po-004', poNumber: 'PO-26131', vendorId: 'ven-001', requestId: null, orderDate: '2026-09-28', expectedDeliveryDate: '2026-10-10', status: 'APPROVED', currency: 'USD', subtotal: 3420, taxAmount: 282.15, discountAmount: 0, totalAmount: 3702.15, shippingAddress: reportAddress, items: [], createdBy: 'usr-104', approvedBy: 'usr-102', createdAt: '2026-09-28T09:00:00Z', updatedAt: '2026-09-29T09:00:00Z' },
  { id: 'po-005', poNumber: 'PO-26139', vendorId: 'ven-004', requestId: 'req-060', orderDate: '2026-10-01', expectedDeliveryDate: '2026-10-11', status: 'SENT', currency: 'USD', subtotal: 2860, taxAmount: 235.95, discountAmount: 0, totalAmount: 3095.95, shippingAddress: reportAddress, items: [], createdBy: 'usr-104', approvedBy: 'usr-102', createdAt: '2026-10-01T09:00:00Z', updatedAt: '2026-10-02T09:00:00Z' },
  { id: 'po-006', poNumber: 'PO-26148', vendorId: 'ven-006', requestId: 'req-071', orderDate: '2026-10-03', expectedDeliveryDate: '2026-10-12', status: 'SENT', currency: 'USD', subtotal: 2250, taxAmount: 185.63, discountAmount: 0, totalAmount: 2435.63, shippingAddress: { ...reportAddress, city: 'Dallas' }, items: [], createdBy: 'usr-107', approvedBy: 'usr-102', createdAt: '2026-10-03T09:00:00Z', updatedAt: '2026-10-04T09:00:00Z' },
  { id: 'po-007', poNumber: 'PO-26152', vendorId: 'ven-005', requestId: 'req-074', orderDate: '2026-10-05', expectedDeliveryDate: '2026-10-20', status: 'APPROVED', currency: 'USD', subtotal: 11800, taxAmount: 973.5, discountAmount: 200, totalAmount: 12573.5, shippingAddress: reportAddress, items: [], createdBy: 'usr-108', approvedBy: 'usr-102', createdAt: '2026-10-05T09:00:00Z', updatedAt: '2026-10-06T09:00:00Z' },
  { id: 'po-008', poNumber: 'PO-IN-26160', vendorId: 'ven-007', requestId: 'req-078', orderDate: '2026-10-08', expectedDeliveryDate: '2026-10-15', status: 'SENT', currency: 'INR', subtotal: 14100, taxAmount: 705, discountAmount: 0, totalAmount: 14805, shippingAddress: reportAddress, items: [{ id: 'poi-008-1', productId: 'prd-010', description: 'Premium Basmati Rice', quantity: 20, receivedQuantity: 0, unitPrice: 510, taxRate: 5, taxAmount: 510, totalAmount: 10710 }, { id: 'poi-008-2', productId: 'prd-013', description: 'Garam Masala', quantity: 50, receivedQuantity: 0, unitPrice: 78, taxRate: 5, taxAmount: 195, totalAmount: 4095 }], createdBy: 'usr-104', approvedBy: 'usr-102', createdAt: '2026-10-08T09:00:00Z', updatedAt: '2026-10-08T09:00:00Z' },
  { id: 'po-009', poNumber: 'PO-IN-26168', vendorId: 'ven-008', requestId: 'req-079', orderDate: '2026-10-09', expectedDeliveryDate: '2026-10-18', status: 'APPROVED', currency: 'INR', subtotal: 139995, taxAmount: 25199.1, discountAmount: 0, totalAmount: 165194.1, shippingAddress: { ...reportAddress, street: '21 Electronics City Phase 1', city: 'Bengaluru', state: 'Karnataka', postalCode: '560100' }, items: [{ id: 'poi-009-1', productId: 'prd-007', description: '43-inch 4K Smart TV', quantity: 5, receivedQuantity: 0, unitPrice: 27999, taxRate: 18, taxAmount: 25199.1, totalAmount: 165194.1 }], createdBy: 'usr-108', approvedBy: 'usr-102', createdAt: '2026-10-09T09:00:00Z', updatedAt: '2026-10-09T09:00:00Z' },
];

const purchaseRequests: PurchaseRequest[] = [
  { id: 'req-041', requestNumber: 'PR-26041', requestedBy: 'usr-104', departmentId: 'operations', date: '2026-09-08', requiredDate: '2026-09-20', priority: 'HIGH', status: 'ORDERED', justification: 'Restock network cable.', items: [], createdAt: '2026-09-08T09:00:00Z', updatedAt: '2026-09-11T09:00:00Z' },
  { id: 'req-046', requestNumber: 'PR-26046', requestedBy: 'usr-107', departmentId: 'infrastructure', date: '2026-09-13', requiredDate: '2026-10-04', priority: 'MEDIUM', status: 'ORDERED', justification: 'Replace aging UPS units.', items: [], createdAt: '2026-09-13T09:00:00Z', updatedAt: '2026-09-16T09:00:00Z' },
  { id: 'req-051', requestNumber: 'PR-26051', requestedBy: 'usr-107', departmentId: 'operations', date: '2026-09-20', requiredDate: '2026-10-08', priority: 'LOW', status: 'ORDERED', justification: 'Rack expansion.', items: [], createdAt: '2026-09-20T09:00:00Z', updatedAt: '2026-09-23T09:00:00Z' },
  { id: 'req-060', requestNumber: 'PR-26060', requestedBy: 'usr-104', departmentId: 'operations', date: '2026-09-28', requiredDate: '2026-10-11', priority: 'MEDIUM', status: 'SUBMITTED', justification: 'Power distribution maintenance.', items: [], createdAt: '2026-09-28T09:00:00Z', updatedAt: '2026-09-28T09:00:00Z' },
  { id: 'req-063', requestNumber: 'PR-26063', requestedBy: 'usr-108', departmentId: 'infrastructure', date: '2026-10-02', requiredDate: '2026-10-14', priority: 'HIGH', status: 'APPROVED', justification: 'Fiber refresh project.', items: [], createdAt: '2026-10-02T09:00:00Z', updatedAt: '2026-10-03T09:00:00Z' },
  { id: 'req-071', requestNumber: 'PR-26071', requestedBy: 'usr-107', departmentId: 'operations', date: '2026-10-03', requiredDate: '2026-10-12', priority: 'MEDIUM', status: 'APPROVED', justification: 'Warehouse logistics support.', items: [], createdAt: '2026-10-03T09:00:00Z', updatedAt: '2026-10-03T09:00:00Z' },
  { id: 'req-074', requestNumber: 'PR-26074', requestedBy: 'usr-108', departmentId: 'security', date: '2026-10-05', requiredDate: '2026-10-20', priority: 'HIGH', status: 'SUBMITTED', justification: 'Network and storage hardening project.', items: [], createdAt: '2026-10-05T09:00:00Z', updatedAt: '2026-10-05T09:00:00Z' },
  { id: 'req-078', requestNumber: 'PR-IN-26078', requestedBy: 'usr-104', departmentId: 'retail', date: '2026-10-07', requiredDate: '2026-10-15', priority: 'HIGH', status: 'ORDERED', justification: 'Restock basmati rice and spices for the Hyderabad and Chennai stores.', items: [{ id: 'pri-078-1', productId: 'prd-010', description: 'Premium Basmati Rice', quantity: 20, estimatedUnitPrice: 510, estimatedTotal: 10200 }, { id: 'pri-078-2', productId: 'prd-013', description: 'Garam Masala', quantity: 50, estimatedUnitPrice: 78, estimatedTotal: 3900 }], createdAt: '2026-10-07T09:00:00Z', updatedAt: '2026-10-08T09:00:00Z' },
  { id: 'req-079', requestNumber: 'PR-IN-26079', requestedBy: 'usr-108', departmentId: 'electronics', date: '2026-10-08', requiredDate: '2026-10-18', priority: 'MEDIUM', status: 'APPROVED', justification: 'Replenish smart televisions for the Bengaluru electronics section.', items: [{ id: 'pri-079-1', productId: 'prd-007', description: '43-inch 4K Smart TV', quantity: 5, estimatedUnitPrice: 27999, estimatedTotal: 139995 }], createdAt: '2026-10-08T09:00:00Z', updatedAt: '2026-10-09T09:00:00Z' },
  { id: 'req-080', requestNumber: 'PR-IN-26080', requestedBy: 'usr-107', departmentId: 'grocery', date: '2026-10-10', requiredDate: '2026-10-17', priority: 'MEDIUM', status: 'SUBMITTED', justification: 'Maintain chilled grocery stock and add a buffer for weekend demand.', items: [{ id: 'pri-080-1', productId: 'prd-011', description: 'UHT Toned Milk', quantity: 60, estimatedUnitPrice: 68, estimatedTotal: 4080 }, { id: 'pri-080-2', productId: 'prd-015', description: 'Kabuli Chana', quantity: 40, estimatedUnitPrice: 96, estimatedTotal: 3840 }], createdAt: '2026-10-10T09:00:00Z', updatedAt: '2026-10-10T09:00:00Z' },
];

const fulfillmentOrders: FulfillmentOrder[] = [
  { id: 'ful-001', fulfillmentNumber: 'FUL-7112', salesOrderId: 'so-7112', warehouseId: 'wh-001', status: 'SHIPPED', assignedTo: 'usr-201', packedAt: '2026-09-22T14:20:00Z', createdAt: '2026-09-22T09:00:00Z' },
  { id: 'ful-002', fulfillmentNumber: 'FUL-7138', salesOrderId: 'so-7138', warehouseId: 'wh-002', status: 'SHIPPED', assignedTo: 'usr-204', packedAt: '2026-09-27T11:05:00Z', createdAt: '2026-09-27T09:00:00Z' },
  { id: 'ful-003', fulfillmentNumber: 'FUL-7151', salesOrderId: 'so-7151', warehouseId: 'wh-003', status: 'READY_FOR_SHIPMENT', assignedTo: 'usr-207', packedAt: '2026-10-01T16:30:00Z', createdAt: '2026-10-01T09:00:00Z' },
  { id: 'ful-004', fulfillmentNumber: 'FUL-7162', salesOrderId: 'so-7162', warehouseId: 'wh-004', status: 'PACKED', assignedTo: 'usr-209', packedAt: '2026-10-02T13:10:00Z', createdAt: '2026-10-02T09:00:00Z' },
  { id: 'ful-005', fulfillmentNumber: 'FUL-7174', salesOrderId: 'so-7174', warehouseId: 'wh-005', status: 'ALLOCATED', assignedTo: 'usr-211', packedAt: null, createdAt: '2026-10-04T08:20:00Z' },
  { id: 'ful-006', fulfillmentNumber: 'FUL-7181', salesOrderId: 'so-7181', warehouseId: 'wh-001', status: 'PICKING', assignedTo: 'usr-201', packedAt: null, createdAt: '2026-10-05T11:45:00Z' },
  { id: 'ful-007', fulfillmentNumber: 'FUL-IN-7190', salesOrderId: 'so-7190', warehouseId: 'wh-006', status: 'READY_FOR_SHIPMENT', assignedTo: 'usr-214', packedAt: '2026-10-10T13:30:00Z', createdAt: '2026-10-10T09:00:00Z' },
  { id: 'ful-008', fulfillmentNumber: 'FUL-IN-7196', salesOrderId: 'so-7196', warehouseId: 'wh-007', status: 'PACKED', assignedTo: 'usr-218', packedAt: '2026-10-11T15:10:00Z', createdAt: '2026-10-11T09:00:00Z' },
  { id: 'ful-009', fulfillmentNumber: 'FUL-IN-7203', salesOrderId: 'so-7203', warehouseId: 'wh-003', status: 'ALLOCATED', assignedTo: 'usr-207', packedAt: null, createdAt: '2026-10-12T09:00:00Z' },
];

const deliveries: Delivery[] = [
  { id: 'del-001', deliveryNumber: 'DEL-9211', fulfillmentOrderId: 'ful-001', carrierName: 'BlueRoute Freight', trackingNumber: 'BR-082941', scheduledDate: '2026-09-25', deliveredDate: '2026-09-25', recipientName: 'Jordan Wells', status: 'DELIVERED' },
  { id: 'del-002', deliveryNumber: 'DEL-9238', fulfillmentOrderId: 'ful-002', carrierName: 'SwiftLine Parcel', trackingNumber: 'SL-661204', scheduledDate: '2026-09-30', deliveredDate: '2026-10-02', recipientName: 'Casey Taylor', status: 'DELIVERED' },
  { id: 'del-003', deliveryNumber: 'DEL-9251', fulfillmentOrderId: 'ful-003', carrierName: 'BlueRoute Freight', trackingNumber: 'BR-083105', scheduledDate: '2026-10-05', deliveredDate: null, status: 'OUT_FOR_DELIVERY' },
  { id: 'del-004', deliveryNumber: 'DEL-9262', fulfillmentOrderId: 'ful-004', carrierName: 'AeroLink Cargo', trackingNumber: 'AL-190621', scheduledDate: '2026-10-06', deliveredDate: null, status: 'SCHEDULED' },
  { id: 'del-005', deliveryNumber: 'DEL-9274', fulfillmentOrderId: 'ful-005', carrierName: 'SwiftLine Parcel', trackingNumber: 'SL-661882', scheduledDate: '2026-10-07', deliveredDate: null, status: 'OUT_FOR_DELIVERY' },
  { id: 'del-006', deliveryNumber: 'DEL-9281', fulfillmentOrderId: 'ful-006', carrierName: 'BlueRoute Freight', trackingNumber: 'BR-083210', scheduledDate: '2026-10-09', deliveredDate: null, status: 'SCHEDULED' },
  { id: 'del-007', deliveryNumber: 'DEL-IN-9290', fulfillmentOrderId: 'ful-007', carrierName: 'Delhivery', trackingNumber: 'DLV-IND-742190', scheduledDate: '2026-10-12', deliveredDate: null, recipientName: 'Meera Khanna', status: 'OUT_FOR_DELIVERY' },
  { id: 'del-008', deliveryNumber: 'DEL-IN-9296', fulfillmentOrderId: 'ful-008', carrierName: 'Blue Dart Express', trackingNumber: 'BD-IND-518296', scheduledDate: '2026-10-13', deliveredDate: null, recipientName: 'Ritwik Sen', status: 'SCHEDULED' },
  { id: 'del-009', deliveryNumber: 'DEL-IN-9303', fulfillmentOrderId: 'ful-009', carrierName: 'DTDC Express', trackingNumber: 'DT-IND-661303', scheduledDate: '2026-10-14', deliveredDate: null, status: 'SCHEDULED' },
];

const shipments: Shipment[] = [
  { id: 'shp-001', shipmentNumber: 'SHP-48021', carrier: 'BlueRoute Freight', trackingNumber: 'BR-082941', shippingMethod: 'ROAD', shippingCost: 184, estimatedDeliveryDate: '2026-09-25', actualDeliveryDate: '2026-09-25', status: 'DELIVERED' },
  { id: 'shp-002', shipmentNumber: 'SHP-48038', carrier: 'SwiftLine Parcel', trackingNumber: 'SL-661204', shippingMethod: 'EXPRESS', shippingCost: 92, estimatedDeliveryDate: '2026-09-30', actualDeliveryDate: '2026-10-02', status: 'DELIVERED' },
  { id: 'shp-003', shipmentNumber: 'SHP-48051', carrier: 'BlueRoute Freight', trackingNumber: 'BR-083105', shippingMethod: 'ROAD', shippingCost: 211, estimatedDeliveryDate: '2026-10-05', actualDeliveryDate: null, status: 'OUT_FOR_DELIVERY' },
  { id: 'shp-004', shipmentNumber: 'SHP-47988', carrier: 'AeroLink Cargo', trackingNumber: 'AL-190482', shippingMethod: 'AIR', shippingCost: 327, estimatedDeliveryDate: '2026-09-18', actualDeliveryDate: '2026-09-17', status: 'DELIVERED' },
  { id: 'shp-005', shipmentNumber: 'SHP-48063', carrier: 'SwiftLine Parcel', trackingNumber: 'SL-661398', shippingMethod: 'SEA', shippingCost: 146, estimatedDeliveryDate: '2026-10-03', actualDeliveryDate: null, status: 'EXCEPTION' },
  { id: 'shp-006', shipmentNumber: 'SHP-48074', carrier: 'BlueRoute Freight', trackingNumber: 'BR-083217', shippingMethod: 'ROAD', shippingCost: 176, estimatedDeliveryDate: '2026-10-06', actualDeliveryDate: null, status: 'DISPATCHED' },
  { id: 'shp-007', shipmentNumber: 'SHP-48082', carrier: 'AeroLink Cargo', trackingNumber: 'AL-190741', shippingMethod: 'AIR', shippingCost: 412, estimatedDeliveryDate: '2026-10-08', actualDeliveryDate: null, status: 'IN_TRANSIT' },
  { id: 'shp-008', shipmentNumber: 'SHP-IN-48090', carrier: 'Delhivery', trackingNumber: 'DLV-IND-742190', shippingMethod: 'ROAD', shippingCost: 640, estimatedDeliveryDate: '2026-10-12', actualDeliveryDate: null, status: 'OUT_FOR_DELIVERY' },
  { id: 'shp-009', shipmentNumber: 'SHP-IN-48096', carrier: 'Blue Dart Express', trackingNumber: 'BD-IND-518296', shippingMethod: 'EXPRESS', shippingCost: 890, estimatedDeliveryDate: '2026-10-13', actualDeliveryDate: null, status: 'IN_TRANSIT' },
  { id: 'shp-010', shipmentNumber: 'SHP-IN-48103', carrier: 'DTDC Express', trackingNumber: 'DT-IND-661303', shippingMethod: 'ROAD', shippingCost: 420, estimatedDeliveryDate: '2026-10-14', actualDeliveryDate: null, status: 'DISPATCHED' },
];

const stockMovements: StockMovement[] = [
  { id: 'mov-001', movementCode: 'MOV-88142', productId: 'prd-001', movementType: 'RECEIPT', quantity: 24, fromWarehouseId: null, toWarehouseId: 'wh-001', referenceType: 'PURCHASE_ORDER', referenceId: 'PO-26091', movementDate: '2026-09-12', performedBy: 'usr-104' },
  { id: 'mov-002', movementCode: 'MOV-88186', productId: 'prd-002', movementType: 'SHIPMENT', quantity: 3, fromWarehouseId: 'wh-001', toWarehouseId: null, referenceType: 'SALES_ORDER', referenceId: 'SO-7112', movementDate: '2026-09-16', performedBy: 'usr-201' },
  { id: 'mov-003', movementCode: 'MOV-88221', productId: 'prd-004', movementType: 'TRANSFER_OUT', quantity: 12, fromWarehouseId: 'wh-002', toWarehouseId: null, referenceType: 'TRANSFER', referenceId: 'TR-2091', movementDate: '2026-09-21', performedBy: 'usr-204' },
  { id: 'mov-004', movementCode: 'MOV-88224', productId: 'prd-004', movementType: 'TRANSFER_IN', quantity: 12, fromWarehouseId: null, toWarehouseId: 'wh-003', referenceType: 'TRANSFER', referenceId: 'TR-2091', movementDate: '2026-09-22', performedBy: 'usr-207' },
  { id: 'mov-005', movementCode: 'MOV-88293', productId: 'prd-003', movementType: 'RECEIPT', quantity: 8, fromWarehouseId: null, toWarehouseId: 'wh-002', referenceType: 'PURCHASE_ORDER', referenceId: 'PO-26102', movementDate: '2026-09-28', performedBy: 'usr-204' },
  { id: 'mov-006', movementCode: 'MOV-88331', productId: 'prd-006', movementType: 'ADJUSTMENT_OUT', quantity: 4, fromWarehouseId: 'wh-003', toWarehouseId: null, referenceType: 'ADJUSTMENT', referenceId: 'ADJ-1048', movementDate: '2026-10-01', performedBy: 'usr-207', remarks: 'Cycle count variance' },
  { id: 'mov-007', movementCode: 'MOV-88352', productId: 'prd-005', movementType: 'RETURN', quantity: 2, fromWarehouseId: null, toWarehouseId: 'wh-001', referenceType: 'SALES_ORDER', referenceId: 'SO-7138', movementDate: '2026-10-03', performedBy: 'usr-201' },
  { id: 'mov-008', movementCode: 'MOV-88368', productId: 'prd-001', movementType: 'SHIPMENT', quantity: 6, fromWarehouseId: 'wh-002', toWarehouseId: null, referenceType: 'SALES_ORDER', referenceId: 'SO-7151', movementDate: '2026-10-04', performedBy: 'usr-204' },
  { id: 'mov-009', movementCode: 'MOV-88412', productId: 'prd-007', movementType: 'RECEIPT', quantity: 10, fromWarehouseId: null, toWarehouseId: 'wh-001', referenceType: 'PURCHASE_ORDER', referenceId: 'PO-26148', movementDate: '2026-10-04', performedBy: 'usr-104' },
  { id: 'mov-010', movementCode: 'MOV-88436', productId: 'prd-008', movementType: 'TRANSFER_OUT', quantity: 5, fromWarehouseId: 'wh-004', toWarehouseId: null, referenceType: 'TRANSFER', referenceId: 'TR-2108', movementDate: '2026-10-05', performedBy: 'usr-209' },
  { id: 'mov-011', movementCode: 'MOV-88441', productId: 'prd-008', movementType: 'TRANSFER_IN', quantity: 5, fromWarehouseId: null, toWarehouseId: 'wh-005', referenceType: 'TRANSFER', referenceId: 'TR-2108', movementDate: '2026-10-05', performedBy: 'usr-211' },
  { id: 'mov-012', movementCode: 'MOV-88483', productId: 'prd-009', movementType: 'ADJUSTMENT_IN', quantity: 3, fromWarehouseId: null, toWarehouseId: 'wh-005', referenceType: 'ADJUSTMENT', referenceId: 'ADJ-1092', movementDate: '2026-10-06', performedBy: 'usr-211', remarks: 'New install kit recorded' },
  { id: 'mov-013', movementCode: 'MOV-IN-88501', productId: 'prd-010', movementType: 'RECEIPT', quantity: 20, fromWarehouseId: null, toWarehouseId: 'wh-006', referenceType: 'PURCHASE_ORDER', referenceId: 'PO-IN-26160', movementDate: '2026-10-10', performedBy: 'usr-104', remarks: 'Basmati rice replenishment received' },
  { id: 'mov-014', movementCode: 'MOV-IN-88502', productId: 'prd-013', movementType: 'RECEIPT', quantity: 50, fromWarehouseId: null, toWarehouseId: 'wh-006', referenceType: 'PURCHASE_ORDER', referenceId: 'PO-IN-26160', movementDate: '2026-10-10', performedBy: 'usr-104', remarks: 'Spice stock replenishment received' },
  { id: 'mov-015', movementCode: 'MOV-IN-88518', productId: 'prd-007', movementType: 'RECEIPT', quantity: 5, fromWarehouseId: null, toWarehouseId: 'wh-002', referenceType: 'PURCHASE_ORDER', referenceId: 'PO-IN-26168', movementDate: '2026-10-11', performedBy: 'usr-204', remarks: 'Smart TV order received at Bengaluru' },
  { id: 'mov-016', movementCode: 'MOV-IN-88527', productId: 'prd-011', movementType: 'TRANSFER_OUT', quantity: 12, fromWarehouseId: 'wh-007', toWarehouseId: null, referenceType: 'TRANSFER', referenceId: 'TR-IN-2114', movementDate: '2026-10-12', performedBy: 'usr-218', remarks: 'Milk stock sent to Kolkata retail outlet' },
  { id: 'mov-017', movementCode: 'MOV-IN-88528', productId: 'prd-011', movementType: 'TRANSFER_IN', quantity: 12, fromWarehouseId: null, toWarehouseId: 'wh-006', referenceType: 'TRANSFER', referenceId: 'TR-IN-2114', movementDate: '2026-10-12', performedBy: 'usr-214', remarks: 'Milk stock received at Delhi NCR hub' },
];

const profitLoss: ProfitLossData = {
  summary: {
    grossSales: 67347,
    cogs: 34107,
    grossProfit: 33240,
    netOperatingProfit: 18420,
  },
  chartData: [
    { month: 'Jan', revenue: 4100, cogs: 2000, net: 1100 },
    { month: 'Feb', revenue: 5800, cogs: 2800, net: 1800 },
    { month: 'Mar', revenue: 6400, cogs: 3200, net: 2000 },
    { month: 'Apr', revenue: 7800, cogs: 3800, net: 2500 },
    { month: 'May', revenue: 8800, cogs: 4400, net: 3100 },
    { month: 'Jun', revenue: 9400, cogs: 4800, net: 3200 },
    { month: 'Jul', revenue: 11200, cogs: 5700, net: 3900 },
    { month: 'Aug', revenue: 13800, cogs: 6900, net: 4800 },
  ],
};
// src/mock/erp/erpMockData.ts (add this object to your existing file)

export const layeredChartMockData: Record<string, { label: string; points: number[]; color: string }[]> = {
  'inventory-valuation': [
    { label: 'Raw Materials', points: [2000, 3000, 2500, 4000, 3500, 5000, 4500], color: '#38bdf8' },
    { label: 'Finished Goods', points: [1500, 2500, 2000, 3500, 3000, 4500, 4000], color: '#34d399' },
    { label: 'Work in Progress', points: [1000, 1500, 1200, 2000, 1800, 2500, 2200], color: '#fbbf24' }
  ],
  'vendor-delivery': [
    { label: 'On Time Deliveries', points: [80, 85, 82, 90, 88, 92, 95], color: '#34d399' },
    { label: 'Delayed Deliveries', points: [20, 15, 18, 10, 12, 8, 5], color: '#f87171' },
    { label: 'Average Delivery Time (days)', points: [5, 4.5, 4.8, 4.2, 4.3, 3.9, 3.5], color: '#60a5fa' }
  ],
  'carrier-turnaround': [
    { label: 'Average Time (hrs)', points: [12, 10, 11, 9, 8, 9, 7], color: '#a78bfa' },
    { label: 'Target Time (hrs)', points: [10, 10, 10, 10, 10, 10, 10], color: '#94a3b8' },
    { label: 'Variance (hrs)', points: [2, 0, 1, -1, -2, -1, -3], color: '#f87171' }
  ],
  'stock-movement': [
    { label: 'Inbound Volume', points: [500, 600, 550, 700, 650, 800, 750], color: '#60a5fa' },
    { label: 'Outbound Volume', points: [400, 450, 500, 550, 600, 650, 700], color: '#fb923c' },
    { label: 'Net Movement', points: [100, 150, 50, 150, 50, 150, 50], color: '#34d399' }
  ],
  'profit-loss': [
    { label: 'Total Revenue', points: [10000, 12000, 11500, 14000, 13500, 16000, 15000], color: '#34d399' },
    { label: 'Total Expenses', points: [7000, 8000, 7500, 8500, 8000, 9500, 9000], color: '#f87171' },
    { label: 'Net Profit', points: [3000, 4000, 4000, 5500, 5500, 6500, 6000], color: '#60a5fa' }
  ]
};



export const mockErpReportSource: ErpReportSourceData = {
  products,
  inventory,
  warehouses,
  vendors,
  vendorEvaluations,
  purchaseOrders,
  purchaseRequests,
  fulfillmentOrders,
  deliveries,
  shipments,
  stockMovements,
  profitLoss,
  
};
