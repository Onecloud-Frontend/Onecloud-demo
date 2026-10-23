import type {
  SalesOrder,
  FulfillmentOrder,
  Delivery,
  Shipment,
  Return,
} from '@features/erp/types';

/**
 * Dummy Sales Orders
 * Used temporarily until backend APIs are available.
 */
export const mockSalesOrders: SalesOrder[] = [
  {
    id: 'so-001',
    orderNumber: 'SO-1001',
    customerId: 'cust-001',
    quotationId: 'quote-001',
    orderDate: '2026-10-05',
    deliveryDueDate: '2026-10-08',
    status: 'CONFIRMED',
    currency: 'INR',

    subtotal: 75000,
    taxAmount: 13500,
    discountAmount: 2000,
    totalAmount: 86500,

    shippingAddress: {
      id: 'addr-001',
      addressType: 'SHIPPING',
      street: '100 Anna Salai',
      city: 'Chennai',
      state: 'Tamil Nadu',
      postalCode: '600002',
      country: 'India',
      isDefault: true,
    },

    billingAddress: {
      id: 'addr-002',
      addressType: 'BILLING',
      street: '100 Anna Salai',
      city: 'Chennai',
      state: 'Tamil Nadu',
      postalCode: '600002',
      country: 'India',
      isDefault: true,
    },

    paymentStatus: 'PAID',

    items: [
      {
        id: 'so-item-001',
        productId: 'prod-001',
        description: 'Business Laptop',
        quantity: 2,
        fulfilledQuantity: 0,
        unitPrice: 35000,
        discountAmount: 1000,
        taxRate: 18,
        taxAmount: 12420,
        totalAmount: 69420,
      },
      {
        id: 'so-item-002',
        productId: 'prod-002',
        description: 'Wireless Mouse',
        quantity: 2,
        fulfilledQuantity: 0,
        unitPrice: 2500,
        discountAmount: 0,
        taxRate: 18,
        taxAmount: 900,
        totalAmount: 5900,
      },
    ],

    createdBy: 'sales-user-001',
    createdAt: '2026-10-05T09:00:00Z',
    updatedAt: '2026-10-05T09:00:00Z',
  },

  {
    id: 'so-002',
    orderNumber: 'SO-1002',
    customerId: 'cust-002',
    quotationId: 'quote-002',
    orderDate: '2026-10-05',
    deliveryDueDate: '2026-10-09',
    status: 'CONFIRMED',
    currency: 'INR',

    subtotal: 42000,
    taxAmount: 7560,
    discountAmount: 1000,
    totalAmount: 48560,

    shippingAddress: {
      id: 'addr-003',
      addressType: 'SHIPPING',
      street: '45 Race Course Road',
      city: 'Coimbatore',
      state: 'Tamil Nadu',
      postalCode: '641018',
      country: 'India',
      isDefault: true,
    },

    billingAddress: {
      id: 'addr-004',
      addressType: 'BILLING',
      street: '45 Race Course Road',
      city: 'Coimbatore',
      state: 'Tamil Nadu',
      postalCode: '641018',
      country: 'India',
      isDefault: true,
    },

    paymentStatus: 'PARTIALLY_PAID',

    items: [
      {
        id: 'so-item-003',
        productId: 'prod-003',
        description: 'Office Monitor',
        quantity: 2,
        fulfilledQuantity: 0,
        unitPrice: 20000,
        discountAmount: 1000,
        taxRate: 18,
        taxAmount: 7020,
        totalAmount: 46020,
      },
    ],

    createdBy: 'sales-user-002',
    createdAt: '2026-10-05T10:00:00Z',
    updatedAt: '2026-10-05T10:00:00Z',
  },

  {
    id: 'so-003',
    orderNumber: 'SO-1003',
    customerId: 'cust-003',
    quotationId: 'quote-003',
    orderDate: '2026-10-04',
    deliveryDueDate: '2026-10-07',
    status: 'PROCESSING',
    currency: 'INR',

    subtotal: 30000,
    taxAmount: 5400,
    discountAmount: 500,
    totalAmount: 34900,

    shippingAddress: {
      id: 'addr-005',
      addressType: 'SHIPPING',
      street: '12 MG Road',
      city: 'Bengaluru',
      state: 'Karnataka',
      postalCode: '560001',
      country: 'India',
      isDefault: true,
    },

    billingAddress: {
      id: 'addr-006',
      addressType: 'BILLING',
      street: '12 MG Road',
      city: 'Bengaluru',
      state: 'Karnataka',
      postalCode: '560001',
      country: 'India',
      isDefault: true,
    },

    paymentStatus: 'PAID',
    

    items: [
      {
        id: 'so-item-004',
        productId: 'prod-004',
        description: 'Office Keyboard',
        quantity: 5,
        fulfilledQuantity: 3,
        unitPrice: 6000,
        discountAmount: 500,
        taxRate: 18,
        taxAmount: 5350,
        totalAmount: 34850,
      },
    ],

    createdBy: 'sales-user-003',
    createdAt: '2026-10-04T08:30:00Z',
    updatedAt: '2026-10-05T11:00:00Z',
  },
    {
    id: 'so-004',
    orderNumber: 'SO-1004',
    customerId: 'cust-004',
    quotationId: 'quote-004',
    orderDate: '2026-10-06',
    deliveryDueDate: '2026-10-10',
    status: 'CONFIRMED',
    currency: 'INR',

    subtotal: 55000,
    taxAmount: 9900,
    discountAmount: 1500,
    totalAmount: 63400,

    shippingAddress: {
      id: 'addr-007',
      addressType: 'SHIPPING',
      street: '25 Mount Road',
      city: 'Chennai',
      state: 'Tamil Nadu',
      postalCode: '600006',
      country: 'India',
      isDefault: true,
    },

    billingAddress: {
      id: 'addr-008',
      addressType: 'BILLING',
      street: '25 Mount Road',
      city: 'Chennai',
      state: 'Tamil Nadu',
      postalCode: '600006',
      country: 'India',
      isDefault: true,
    },

    paymentStatus: 'PAID',

    items: [
      {
        id: 'so-item-005',
        productId: 'prod-005',
        description: 'Business Desktop',
        quantity: 2,
        fulfilledQuantity: 0,
        unitPrice: 25000,
        discountAmount: 1000,
        taxRate: 18,
        taxAmount: 8820,
        totalAmount: 57820,
      },
      {
        id: 'so-item-006',
        productId: 'prod-006',
        description: 'Wireless Keyboard',
        quantity: 2,
        fulfilledQuantity: 0,
        unitPrice: 2500,
        discountAmount: 500,
        taxRate: 18,
        taxAmount: 810,
        totalAmount: 5310,
      },
    ],

    createdBy: 'sales-user-004',
    createdAt: '2026-10-06T09:15:00Z',
    updatedAt: '2026-10-06T09:15:00Z',
  },

  {
    id: 'so-005',
    orderNumber: 'SO-1005',
    customerId: 'cust-005',
    quotationId: 'quote-005',
    orderDate: '2026-10-06',
    deliveryDueDate: '2026-10-11',
    status: 'CONFIRMED',
    currency: 'INR',

    subtotal: 68000,
    taxAmount: 12240,
    discountAmount: 2000,
    totalAmount: 78240,

    shippingAddress: {
      id: 'addr-009',
      addressType: 'SHIPPING',
      street: '88 Avinashi Road',
      city: 'Coimbatore',
      state: 'Tamil Nadu',
      postalCode: '641037',
      country: 'India',
      isDefault: true,
    },

    billingAddress: {
      id: 'addr-010',
      addressType: 'BILLING',
      street: '88 Avinashi Road',
      city: 'Coimbatore',
      state: 'Tamil Nadu',
      postalCode: '641037',
      country: 'India',
      isDefault: true,
    },

    paymentStatus: 'PARTIALLY_PAID',

    items: [
      {
        id: 'so-item-007',
        productId: 'prod-007',
        description: '27-inch LED Monitor',
        quantity: 2,
        fulfilledQuantity: 0,
        unitPrice: 22000,
        discountAmount: 1000,
        taxRate: 18,
        taxAmount: 7740,
        totalAmount: 49740,
      },
      {
        id: 'so-item-008',
        productId: 'prod-008',
        description: 'USB-C Docking Station',
        quantity: 2,
        fulfilledQuantity: 0,
        unitPrice: 12000,
        discountAmount: 1000,
        taxRate: 18,
        taxAmount: 4140,
        totalAmount: 25140,
      },
    ],

    createdBy: 'sales-user-005',
    createdAt: '2026-10-06T10:30:00Z',
    updatedAt: '2026-10-06T10:30:00Z',
  },
];

/**
 * Dummy Fulfillment Orders
 */
export const mockFulfillmentOrders: FulfillmentOrder[] = [
  {
    id: 'fo-001',
    fulfillmentNumber: 'FO-1001',
    salesOrderId: 'so-001',
    warehouseId: 'wh-001',
    status: 'ALLOCATED',
    assignedTo: null,
    packedAt: null,
    createdAt: '2026-10-05T09:30:00Z',
  },

  {
    id: 'fo-002',
    fulfillmentNumber: 'FO-1002',
    salesOrderId: 'so-002',
    warehouseId: 'wh-002',
    status: 'ALLOCATED',
    assignedTo: null,
    packedAt: null,
    createdAt: '2026-10-05T10:30:00Z',
  },

  {
    id: 'fo-003',
    fulfillmentNumber: 'FO-1003',
    salesOrderId: 'so-003',
    warehouseId: 'wh-003',
    status: 'PICKING',
    assignedTo: 'warehouse-user-001',
    packedAt: null,
    createdAt: '2026-10-04T09:00:00Z',
  },
];

/**
 * Dummy Delivery records
 */
export const mockDeliveries: Delivery[] = [
  {
    id: 'delivery-001',
    deliveryNumber: 'DEL-1001',
    fulfillmentOrderId: 'fo-001',
    carrierName: 'BlueDart',
    trackingNumber: 'BD123456789',
    scheduledDate: '2026-10-08',
    deliveredDate: null,
    recipientName: 'ABC Technologies',
    status: 'SCHEDULED',
  },
];

/**
 * Dummy Shipment records
 */
export const mockShipments: Shipment[] = [
  {
    id: 'shipment-001',
    shipmentNumber: 'SHIP-1001',
    carrier: 'BlueDart',
    trackingNumber: 'BD123456789',
    shippingMethod: 'EXPRESS',
    shippingCost: 850,
    estimatedDeliveryDate: '2026-10-08',
    actualDeliveryDate: null,
    status: 'IN_TRANSIT',
  },

  {
    id: 'shipment-002',
    shipmentNumber: 'SHIP-1002',
    carrier: 'DTDC',
    trackingNumber: 'DT987654321',
    shippingMethod: 'ROAD',
    shippingCost: 450,
    estimatedDeliveryDate: '2026-10-09',
    actualDeliveryDate: null,
    status: 'DISPATCHED',
  },
];

/**
 * Dummy Return / RMA records
 */
export const mockReturns: Return[] = [
  {
    id: 'return-001',
    returnNumber: 'RMA-1001',
    salesOrderId: 'so-001',
    customerId: 'cust-001',
    reason: 'DAMAGED_IN_TRANSIT',
    status: 'REQUESTED',

    items: [
      {
        id: 'return-item-001',
        productId: 'prod-001',
        quantityReturned: 1,
        condition: 'DAMAGED',
        refundAmount: 35000,
      },
    ],

    createdAt: '2026-10-06T08:00:00Z',
    updatedAt: '2026-10-06T08:00:00Z',
  },

  {
    id: 'return-002',
    returnNumber: 'RMA-1002',
    salesOrderId: 'so-002',
    customerId: 'cust-002',
    reason: 'WRONG_ITEM',
    status: 'RECEIVED',

    items: [
      {
        id: 'return-item-002',
        productId: 'prod-003',
        quantityReturned: 1,
        condition: 'RESALEABLE',
        refundAmount: 20000,
      },
    ],

    createdAt: '2026-10-05T12:00:00Z',
    updatedAt: '2026-10-06T08:30:00Z',
  },
];