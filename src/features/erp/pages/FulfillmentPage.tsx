import { useMemo, useState } from 'react';

import type {
  Return,
  ReturnItem,
  SalesOrderStatus,
  Shipment,
} from '@features/erp/types';

import { mockReturns, mockSalesOrders } from '@mock/erp';
import '../../../styles/fulfillment.css';

type ActiveTab = 'FULFILLMENT' | 'RETURNS';
type StatusFilter = 'ALL' | SalesOrderStatus;
type PickedQuantities = Record<string, number>;
type ShipmentByOrder = Record<string, Shipment>;

interface DispatchForm {
  carrier: string;
  trackingNumber: string;
  shippingMethod: 'ROAD' | 'AIR' | 'SEA' | 'EXPRESS';
  shippingCost: string;
  estimatedDeliveryDate: string;
}

export const FulfillmentPage = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('FULFILLMENT');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');

  // Pick & Pack
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [pickedQuantities, setPickedQuantities] = useState<PickedQuantities>({});
  const [barcode, setBarcode] = useState('');
  const [packageType, setPackageType] = useState('Standard Box');
  const [packedOrders, setPackedOrders] = useState<string[]>([]);

  // Dispatch
  const [dispatchOrderId, setDispatchOrderId] = useState<string | null>(null);
  const [dispatchedOrders, setDispatchedOrders] = useState<string[]>([]);
  const [dispatchForm, setDispatchForm] = useState<DispatchForm>({
    carrier: '',
    trackingNumber: '',
    shippingMethod: 'ROAD',
    shippingCost: '',
    estimatedDeliveryDate: '',
  });

  // Tracking: frontend/mock state only
  const [shipmentByOrder, setShipmentByOrder] = useState<ShipmentByOrder>({});
  const [trackingOrderId, setTrackingOrderId] = useState<string | null>(null);

  // Returns / RMA: frontend/mock state only
  const [returns, setReturns] = useState<Return[]>(() =>
    mockReturns.map((record) => ({
      ...record,
      items: record.items.map((item) => ({ ...item })),
    })),
  );
  const [selectedReturnId, setSelectedReturnId] = useState<string | null>(null);
  const [inspectionConditions, setInspectionConditions] =
    useState<Record<string, ReturnItem['condition']>>({});
  const [inspectionNotes, setInspectionNotes] = useState('');
  const [inspectionNotesByReturn, setInspectionNotesByReturn] =
    useState<Record<string, string>>({});

  type RestockDecision = 'YES' | 'NO' | '';

  const [restockDecisions, setRestockDecisions] = useState<
    Record<string, RestockDecision>
  >({});


  const fulfillmentOrders = useMemo(
    () => mockSalesOrders.filter((order) => order.status === 'CONFIRMED'),
    [],
  );

  const filteredOrders = useMemo(() => {
    const value = search.trim().toLowerCase();

    return fulfillmentOrders
      .filter((order) => {
        const matchesSearch =
          !value ||
          order.orderNumber.toLowerCase().includes(value) ||
          order.customerId.toLowerCase().includes(value) ||
          order.items.some((item) =>
            item.description.toLowerCase().includes(value)
          );

        const matchesStatus =
          statusFilter === 'ALL' || order.status === statusFilter;

        return matchesSearch && matchesStatus;
      })
      .sort(
        (a, b) =>
          new Date(a.deliveryDueDate).getTime() -
          new Date(b.deliveryDueDate).getTime()
      );
  }, [fulfillmentOrders, search, statusFilter]);

  const selectedOrder = useMemo(
    () => mockSalesOrders.find((order) => order.id === selectedOrderId),
    [selectedOrderId],
  );
  const dispatchOrder = useMemo(
    () => mockSalesOrders.find((order) => order.id === dispatchOrderId),
    [dispatchOrderId],
  );
  const trackingOrder = useMemo(
    () => mockSalesOrders.find((order) => order.id === trackingOrderId),
    [trackingOrderId],
  );
  const trackingShipment = useMemo(
    () => (trackingOrderId ? shipmentByOrder[trackingOrderId] : undefined),
    [shipmentByOrder, trackingOrderId],
  );
  const selectedReturn = useMemo(
    () => returns.find((record) => record.id === selectedReturnId),
    [returns, selectedReturnId],
  );

  const getStatusLabel = (status: SalesOrderStatus): string => {
    const labels: Record<SalesOrderStatus, string> = {
      DRAFT: 'Draft',
      CONFIRMED: 'Ready',
      PROCESSING: 'Processing',
      PARTIALLY_FULFILLED: 'Partially Fulfilled',
      FULFILLED: 'Fulfilled',
      SHIPPED: 'Shipped',
      DELIVERED: 'Delivered',
      CANCELLED: 'Cancelled',
    };
    return labels[status];
  };

  const getStatusClass = (status: SalesOrderStatus): string => {
    const classes: Record<SalesOrderStatus, string> = {
      DRAFT: 'status-draft',
      CONFIRMED: 'status-ready',
      PROCESSING: 'status-processing',
      PARTIALLY_FULFILLED: 'status-partial',
      FULFILLED: 'status-fulfilled',
      SHIPPED: 'status-shipped',
      DELIVERED: 'status-delivered',
      CANCELLED: 'status-cancelled',
    };
    return classes[status];
  };


  const getSlaInfo = (dueDate: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const due = new Date(`${dueDate}T00:00:00`);
    const daysLeft = Math.round(
      (due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysLeft < 0) {
      return {
        label: `Overdue by ${Math.abs(daysLeft)} day(s)`,
        className: 'sla-overdue',
        priority: 1,
      };
    }

    if (daysLeft === 0) {
      return {
        label: 'Due Today',
        className: 'sla-today',
        priority: 2,
      };
    }

    if (daysLeft <= 2) {
      return {
        label: `Due in ${daysLeft} day(s)`,
        className: 'sla-soon',
        priority: 3,
      };
    }

    return {
      label: `${daysLeft} days remaining`,
      className: 'sla-on-track',
      priority: 4,
    };
  };

  const getShipmentStatusLabel = (status: Shipment['status']): string => {
    const labels: Record<Shipment['status'], string> = {
      CREATED: 'Created',
      DISPATCHED: 'Dispatched',
      IN_TRANSIT: 'In Transit',
      OUT_FOR_DELIVERY: 'Out for Delivery',
      DELIVERED: 'Delivered',
      EXCEPTION: 'Exception',
    };
    return labels[status];
  };

  const getShipmentStatusClass = (status: Shipment['status']): string => {
    const classes: Record<Shipment['status'], string> = {
      CREATED: 'tracking-status-created',
      DISPATCHED: 'tracking-status-dispatched',
      IN_TRANSIT: 'tracking-status-transit',
      OUT_FOR_DELIVERY: 'tracking-status-out',
      DELIVERED: 'tracking-status-delivered',
      EXCEPTION: 'tracking-status-exception',
    };
    return classes[status];
  };

  const getTrackingUrl = (carrier: string, trackingNumber: string) =>
    `https://tracking.example.com/${encodeURIComponent(carrier.toLowerCase())}/${encodeURIComponent(trackingNumber)}`;

  const getOrderDisplayStatus = (orderId: string, originalStatus: SalesOrderStatus) => {
    const shipment = shipmentByOrder[orderId];
    if (shipment?.status === 'DELIVERED') {
      return { label: 'Delivered', className: 'status-delivered' };
    }
    if (dispatchedOrders.includes(orderId) || shipment) {
      return { label: 'Shipped', className: 'status-shipped' };
    }
    if (packedOrders.includes(orderId)) {
      return { label: 'Ready for Dispatch', className: 'status-packed' };
    }
    return { label: getStatusLabel(originalStatus), className: getStatusClass(originalStatus) };
  };

  // Pick & Pack handlers
  const handlePickAndPack = (orderId: string) => {
    const order = mockSalesOrders.find((item) => item.id === orderId);
    if (!order) return;
    if (order.status !== 'CONFIRMED') {
      alert('This order is not ready for Pick & Pack.');
      return;
    }
    if (packedOrders.includes(orderId)) return;

    setSelectedOrderId(orderId);
    setBarcode('');
    setPackageType('Standard Box');
    const quantities: PickedQuantities = {};
    order.items.forEach((item) => {
      quantities[item.id] = item.quantity - item.fulfilledQuantity;
    });
    setPickedQuantities(quantities);
  };

  const handleCloseDrawer = () => {
    setSelectedOrderId(null);
    setBarcode('');
    setPackageType('Standard Box');
    setPickedQuantities({});
  };

  const handleQuantityChange = (itemId: string, value: number, maxQuantity: number) => {
    const safeValue = Math.max(0, Math.min(value, maxQuantity));
    setPickedQuantities((previous) => ({ ...previous, [itemId]: safeValue }));
  };

  const handleConfirmPacking = () => {
    if (!selectedOrder) return;
    const allItemsPicked = selectedOrder.items.every((item) => {
      const required = item.quantity - item.fulfilledQuantity;
      return (pickedQuantities[item.id] ?? 0) >= required;
    });
    if (!allItemsPicked) {
      alert('Please pick the required quantity for all items.');
      return;
    }
    if (!barcode.trim()) {
      alert('Please enter or scan the barcode before packing.');
      return;
    }
    setPackedOrders((previous) =>
      previous.includes(selectedOrder.id) ? previous : [...previous, selectedOrder.id],
    );
    alert(`${selectedOrder.orderNumber} has been packed successfully.`);
    handleCloseDrawer();
  };

  // Dispatch handlers
  const handleOpenDispatch = (orderId: string) => {
    if (!packedOrders.includes(orderId)) {
      alert('Please complete Pick & Pack before dispatching.');
      return;
    }
    if (dispatchedOrders.includes(orderId)) return;
    if (!mockSalesOrders.some((item) => item.id === orderId)) return;
    setDispatchForm({
      carrier: '',
      trackingNumber: '',
      shippingMethod: 'ROAD',
      shippingCost: '',
      estimatedDeliveryDate: '',
    });
    setDispatchOrderId(orderId);
  };

  const handleCloseDispatch = () => {
    setDispatchOrderId(null);
    setDispatchForm({
      carrier: '',
      trackingNumber: '',
      shippingMethod: 'ROAD',
      shippingCost: '',
      estimatedDeliveryDate: '',
    });
  };

  const handleConfirmDispatch = () => {
    if (!dispatchOrder) return;
    if (!dispatchForm.carrier) {
      alert('Please select a carrier.');
      return;
    }
    if (!dispatchForm.trackingNumber.trim()) {
      alert('Please enter the tracking number.');
      return;
    }
    if (
      !dispatchForm.shippingCost.trim() ||
      !Number.isFinite(Number(dispatchForm.shippingCost)) ||
      Number(dispatchForm.shippingCost) < 0
    ) {
      alert('Please enter a valid shipping cost.');
      return;
    }
    if (!dispatchForm.estimatedDeliveryDate) {
      alert('Please select the estimated delivery date.');
      return;
    }

    const newShipment: Shipment = {
      id: `shipment-${dispatchOrder.id}`,
      shipmentNumber: `SHIP-${dispatchOrder.orderNumber.replace('SO-', '')}`,
      carrier: dispatchForm.carrier,
      trackingNumber: dispatchForm.trackingNumber.trim(),
      shippingMethod: dispatchForm.shippingMethod,
      shippingCost: Number(dispatchForm.shippingCost),
      estimatedDeliveryDate: dispatchForm.estimatedDeliveryDate,
      actualDeliveryDate: null,
      status: 'DISPATCHED',
    };

    setShipmentByOrder((previous) => ({ ...previous, [dispatchOrder.id]: newShipment }));
    setDispatchedOrders((previous) =>
      previous.includes(dispatchOrder.id) ? previous : [...previous, dispatchOrder.id],
    );
    alert(`${dispatchOrder.orderNumber} has been dispatched successfully.`);
    handleCloseDispatch();
  };

  // Tracking handlers
  const handleOpenTracking = (orderId: string) => {
    if (!dispatchedOrders.includes(orderId)) {
      alert('Please dispatch the order before opening tracking.');
      return;
    }
    if (!shipmentByOrder[orderId]) {
      alert('Shipment details are not available for this order.');
      return;
    }
    setTrackingOrderId(orderId);
  };

  const handleCloseTracking = () => setTrackingOrderId(null);

  const handleUpdateTrackingStatus = () => {
    if (!trackingOrderId || !trackingShipment) return;
    let nextStatus: Shipment['status'];

    switch (trackingShipment.status) {
      case 'CREATED':
        nextStatus = 'DISPATCHED';
        break;
      case 'DISPATCHED':
        nextStatus = 'IN_TRANSIT';
        break;
      case 'IN_TRANSIT':
        nextStatus = 'OUT_FOR_DELIVERY';
        break;
      case 'OUT_FOR_DELIVERY':
        nextStatus = 'DELIVERED';
        break;
      case 'DELIVERED':
        alert('This shipment has already been delivered.');
        return;
      case 'EXCEPTION':
        alert('This shipment is currently in exception status.');
        return;
      default:
        return;
    }

    setShipmentByOrder((previous) => {
      const current = previous[trackingOrderId];
      if (!current) return previous;
      return {
        ...previous,
        [trackingOrderId]: {
          ...current,
          status: nextStatus,
          actualDeliveryDate:
            nextStatus === 'DELIVERED'
              ? new Date().toISOString().split('T')[0]
              : current.actualDeliveryDate,
        },
      };
    });
    alert(`Shipment status updated to ${getShipmentStatusLabel(nextStatus)}.`);
  };

  // Returns / RMA handlers
  const formatLabel = (value: string) =>
    value
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, (character) => character.toUpperCase());

  const handleOpenInspection = (returnId: string) => {
    const record = returns.find((item) => item.id === returnId);
    if (!record) return;

    setSelectedReturnId(returnId);
    setInspectionNotes(inspectionNotesByReturn[returnId] ?? '');
    const conditions: Record<string, ReturnItem['condition']> = {};
    record.items.forEach((item) => {
      conditions[item.id] = item.condition;
    });
    setInspectionConditions(conditions);
  };

  const handleCloseInspection = () => {
    setSelectedReturnId(null);
    setInspectionNotes('');
    setInspectionConditions({});
  };

  const handleSaveInspection = () => {
    if (!selectedReturn) return;
    if (selectedReturn.items.some((item) => !inspectionConditions[item.id])) {
      alert('Please select a condition for every returned item.');
      return;
    }

    setReturns((previous) =>
      previous.map((record) => {
        if (record.id !== selectedReturn.id) return record;
        return {
          ...record,
          status: 'INSPECTED',
          items: record.items.map((item) => ({
            ...item,
            condition: inspectionConditions[item.id] ?? item.condition,
          })),
          updatedAt: new Date().toISOString(),
        };
      }),
    );

    setInspectionNotesByReturn((previous) => ({
      ...previous,
      [selectedReturn.id]: inspectionNotes.trim(),
    }));
    alert(`${selectedReturn.returnNumber} inspection saved.`);
    handleCloseInspection();
  };


  const handleApproveReturn = () => {
    if (!selectedReturn) return;

    if (selectedReturn.status !== 'INSPECTED') {
      alert('Please save the inspection before approving this return.');
      return;
    }

    if (!restockDecisions[selectedReturn.id]) {
      alert('Please select whether the items can be restocked.');
      return;
    }

    setReturns((previous) =>
      previous.map((record) =>
        record.id === selectedReturn.id
          ? {
            ...record,
            status: 'AUTHORIZED',
            updatedAt: new Date().toISOString(),
          }
          : record,
      ),
    );

    alert(`${selectedReturn.returnNumber} has been authorized.`);
    handleCloseInspection();
  };

  const handleRejectReturn = () => {
    if (!selectedReturn) return;

    if (selectedReturn.status !== 'INSPECTED') {
      alert('Please save the inspection before rejecting this return.');
      return;
    }

    if (!inspectionNotes.trim()) {
      alert('Please enter a reason in Inspection Notes before rejecting.');
      return;
    }

    setReturns((previous) =>
      previous.map((record) =>
        record.id === selectedReturn.id
          ? {
            ...record,
            status: 'REJECTED',
            updatedAt: new Date().toISOString(),
          }
          : record,
      ),
    );

    setInspectionNotesByReturn((previous) => ({
      ...previous,
      [selectedReturn.id]: inspectionNotes.trim(),
    }));

    alert(`${selectedReturn.returnNumber} has been rejected.`);
    handleCloseInspection();
  };


  return (
    <div className="fulfillment-page">
      <div className="fulfillment-header">
        <div>
          <h1>Sales Fulfillment & Returns</h1>
          <p>Manage sales order fulfillment, dispatch and customer returns.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="fulfillment-tabs">
        <button
          type="button"
          className={`fulfillment-tab ${activeTab === 'FULFILLMENT' ? 'active' : ''}`}
          onClick={() => setActiveTab('FULFILLMENT')}
        >
          Fulfillment
        </button>
        <button
          type="button"
          className={`fulfillment-tab ${activeTab === 'RETURNS' ? 'active' : ''}`}
          onClick={() => setActiveTab('RETURNS')}
        >
          Returns
        </button>
      </div>

      {/* Fulfillment queue */}
      {activeTab === 'FULFILLMENT' && (
        <section>
          <div className="fulfillment-filters">
            <div className="search-wrapper">
              <span className="search-icon">⌕</span>
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search order, customer or product..."
                className="fulfillment-search"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
              className="fulfillment-status-filter"
            >
              <option value="ALL">All Ready Orders</option>
              <option value="CONFIRMED">Confirmed</option>
            </select>
          </div>

          <div className="fulfillment-section-header">
            <div>
              <h2>Fulfillment Queue</h2>
              <p>Confirmed sales orders ready for warehouse processing.</p>
            </div>
            <div className="order-count-badge">{filteredOrders.length} Orders</div>
          </div>

          <div className="fulfillment-table-wrapper">
            <table className="fulfillment-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Due Date</th>
                  <th>SLA Priority</th>
                  <th>Status</th>
                  <th className="action-column">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="empty-cell">
                      <div className="empty-state">
                        <div className="empty-icon">📦</div>
                        <h3>No fulfillment orders found</h3>
                        <p>Try changing your search.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => {
                    const displayStatus = getOrderDisplayStatus(order.id, order.status);
                    const isPacked = packedOrders.includes(order.id);
                    const isDispatched = dispatchedOrders.includes(order.id);
                    return (
                      <tr key={order.id}>
                        <td>
                          <div className="order-number">{order.orderNumber}</div>
                          <div className="order-date">{order.orderDate}</div>
                        </td>
                        <td><span className="customer-id">{order.customerId}</span></td>
                        <td>
                          <div className="items-count">
                            {order.items.reduce((total, item) => total + item.quantity, 0)}
                          </div>
                          <div className="items-label">items</div>
                        </td>
                        <td>
                          <span className="due-date">
                            {order.deliveryDueDate}
                          </span>
                        </td>

                        <td>
                          {(() => {
                            const sla = getSlaInfo(order.deliveryDueDate);

                            return (
                              <span className={`sla-badge ${sla.className}`}>
                                {sla.label}
                              </span>
                            );
                          })()}
                        </td>

                        <td>
                          <span className={`status-badge ${displayStatus.className}`}>
                            <span className="status-dot" />
                            {displayStatus.label}
                          </span>
                        </td>
                        <td className="action-column">
                          {isDispatched ? (
                            <button type="button" className="track-button" onClick={() => handleOpenTracking(order.id)}>
                              Track
                            </button>
                          ) : isPacked ? (
                            <button type="button" className="dispatch-button" onClick={() => handleOpenDispatch(order.id)}>
                              Dispatch
                            </button>
                          ) : (
                            <button type="button" className="pick-pack-button" onClick={() => handlePickAndPack(order.id)}>
                              Pick & Pack
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="fulfillment-table-footer">
            Showing <strong>{filteredOrders.length}</strong> ready fulfillment orders
          </div>
        </section>
      )}

      {/* Returns table */}
      {activeTab === 'RETURNS' && (
        <section className="rma-section">
          <div className="fulfillment-section-header">
            <div>
              <h2>Returns & RMA Management</h2>
              <p>Review customer returns and inspect returned items.</p>
            </div>
            <div className="order-count-badge">{returns.length} Returns</div>
          </div>

          <div className="fulfillment-table-wrapper">
            <table className="fulfillment-table">
              <thead>
                <tr>
                  <th>Return No.</th>
                  <th>Sales Order</th>
                  <th>Customer</th>
                  <th>Reason</th>
                  <th>Items</th>
                  <th>Status</th>
                  <th className="action-column">Action</th>
                </tr>
              </thead>
              <tbody>
                {returns.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="empty-cell">
                      <div className="empty-state">
                        <div className="empty-icon">↩</div>
                        <h3>No return requests found</h3>
                        <p>Customer return requests will appear here.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  returns.map((record) => {
                    const order = mockSalesOrders.find((item) => item.id === record.salesOrderId);
                    return (
                      <tr key={record.id}>
                        <td>
                          <div className="order-number">{record.returnNumber}</div>
                          <div className="order-date">{record.createdAt.slice(0, 10)}</div>
                        </td>
                        <td>{order?.orderNumber ?? record.salesOrderId}</td>
                        <td>{record.customerId}</td>
                        <td>{formatLabel(record.reason)}</td>
                        <td>{record.items.reduce((total, item) => total + item.quantityReturned, 0)}</td>
                        <td>
                          <span className={`status-badge ${record.status === 'INSPECTED' ? 'status-fulfilled' : record.status === 'REJECTED' ? 'status-cancelled' : 'status-processing'}`}>
                            <span className="status-dot" />
                            {formatLabel(record.status)}
                          </span>
                        </td>
                        <td className="action-column">
                          <button type="button" className="pick-pack-button" onClick={() => handleOpenInspection(record.id)}>
                            {record.status === 'INSPECTED' ? 'View Inspection' : 'Inspect'}
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="fulfillment-table-footer">
            Showing <strong>{returns.length}</strong> return records
          </div>
        </section>
      )}

      {/* Pick & Pack drawer */}
      {selectedOrder && (
        <>
          <div className="drawer-overlay" onClick={handleCloseDrawer} />
          <aside className="pick-pack-drawer">
            <div className="drawer-header">
              <div>
                <span className="drawer-eyebrow">Fulfillment</span>
                <h2>Pick & Pack</h2>
                <p>{selectedOrder.orderNumber}</p>
              </div>
              <button type="button" className="drawer-close-button" onClick={handleCloseDrawer} aria-label="Close drawer">×</button>
            </div>

            <div className="drawer-section">
              <div className="drawer-summary-grid">
                <div><span className="drawer-label">Customer</span><strong>{selectedOrder.customerId}</strong></div>
                <div><span className="drawer-label">Order Date</span><strong>{selectedOrder.orderDate}</strong></div>
                <div><span className="drawer-label">Delivery Due</span><strong>{selectedOrder.deliveryDueDate}</strong></div>
                <div><span className="drawer-label">Total Items</span><strong>{selectedOrder.items.reduce((total, item) => total + item.quantity, 0)}</strong></div>
              </div>
            </div>

            <div className="drawer-section">
              <div className="drawer-section-title"><div><h3>Pick Items</h3><p>Verify the required quantity before packing.</p></div></div>
              <div className="pick-items-list">
                {selectedOrder.items.map((item) => {
                  const required = item.quantity - item.fulfilledQuantity;
                  const picked = pickedQuantities[item.id] ?? 0;
                  return (
                    <div className="pick-item" key={item.id}>
                      <div className="pick-item-info">
                        <strong>{item.description}</strong>
                        <span>Product ID: {item.productId}</span>
                        <span>Required: {required}</span>
                      </div>
                      <div className="quantity-control">
                        <button type="button" onClick={() => handleQuantityChange(item.id, picked - 1, required)} aria-label="Decrease quantity">−</button>
                        <input type="number" min={0} max={required} value={picked} onChange={(event) => handleQuantityChange(item.id, Number(event.target.value), required)} />
                        <button type="button" onClick={() => handleQuantityChange(item.id, picked + 1, required)} aria-label="Increase quantity">+</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="drawer-section">
              <div className="drawer-section-title"><div><h3>Barcode Verification</h3><p>Enter or scan the package barcode.</p></div></div>
              <input type="text" value={barcode} onChange={(event) => setBarcode(event.target.value)} placeholder="Scan or enter barcode..." className="drawer-input" />
            </div>

            <div className="drawer-section">
              <div className="drawer-section-title"><div><h3>Packing</h3><p>Select the packaging type.</p></div></div>
              <select value={packageType} onChange={(event) => setPackageType(event.target.value)} className="drawer-select">
                <option>Standard Box</option>
                <option>Small Box</option>
                <option>Large Box</option>
                <option>Protective Packaging</option>
              </select>
            </div>

            <div className="drawer-footer">
              <button type="button" className="drawer-cancel-button" onClick={handleCloseDrawer}>Cancel</button>
              <button type="button" className="drawer-confirm-button" onClick={handleConfirmPacking}>Confirm Packing</button>
            </div>
          </aside>
        </>
      )}

      {/* Dispatch drawer */}
      {dispatchOrder && (
        <>
          <div className="drawer-overlay" onClick={handleCloseDispatch} />
          <aside className="pick-pack-drawer">
            <div className="drawer-header">
              <div><span className="drawer-eyebrow">Shipment</span><h2>Dispatch Shipment</h2><p>{dispatchOrder.orderNumber}</p></div>
              <button type="button" className="drawer-close-button" onClick={handleCloseDispatch} aria-label="Close dispatch drawer">×</button>
            </div>

            <div className="drawer-section">
              <div className="drawer-summary-grid">
                <div><span className="drawer-label">Order</span><strong>{dispatchOrder.orderNumber}</strong></div>
                <div><span className="drawer-label">Customer</span><strong>{dispatchOrder.customerId}</strong></div>
                <div><span className="drawer-label">Status</span><strong className="ready-dispatch-text">Ready for Dispatch</strong></div>
                <div><span className="drawer-label">Total Items</span><strong>{dispatchOrder.items.reduce((total, item) => total + item.quantity, 0)}</strong></div>
              </div>
            </div>

            <div className="drawer-section">
              <div className="drawer-section-title"><div><h3>Carrier Details</h3><p>Select the carrier for this shipment.</p></div></div>
              <label htmlFor="carrier" className="drawer-field-label">Carrier</label>
              <select id="carrier" value={dispatchForm.carrier} onChange={(event) => setDispatchForm((previous) => ({ ...previous, carrier: event.target.value }))} className="drawer-select">
                <option value="">Select Carrier</option><option value="BlueDart">BlueDart</option><option value="DTDC">DTDC</option><option value="Delhivery">Delhivery</option>
              </select>
            </div>

            <div className="drawer-section">
              <div className="drawer-section-title"><div><h3>Tracking Details</h3><p>Enter the carrier tracking information.</p></div></div>
              <label htmlFor="trackingNumber" className="drawer-field-label">Tracking Number</label>
              <input id="trackingNumber" type="text" value={dispatchForm.trackingNumber} onChange={(event) => setDispatchForm((previous) => ({ ...previous, trackingNumber: event.target.value }))} placeholder="Enter tracking number..." className="drawer-input" />
            </div>

            <div className="drawer-section">
              <label htmlFor="shippingMethod" className="drawer-field-label">Shipping Method</label>
              <select id="shippingMethod" value={dispatchForm.shippingMethod} onChange={(event) => setDispatchForm((previous) => ({ ...previous, shippingMethod: event.target.value as DispatchForm['shippingMethod'] }))} className="drawer-select">
                <option value="ROAD">Road</option><option value="AIR">Air</option><option value="SEA">Sea</option><option value="EXPRESS">Express</option>
              </select>
            </div>

            <div className="drawer-section">
              <label htmlFor="shippingCost" className="drawer-field-label">Shipping Cost</label>
              <input id="shippingCost" type="number" min="0" value={dispatchForm.shippingCost} onChange={(event) => setDispatchForm((previous) => ({ ...previous, shippingCost: event.target.value }))} placeholder="Enter shipping cost..." className="drawer-input" />
            </div>

            <div className="drawer-section">
              <label htmlFor="estimatedDeliveryDate" className="drawer-field-label">Estimated Delivery Date</label>
              <input id="estimatedDeliveryDate" type="date" value={dispatchForm.estimatedDeliveryDate} onChange={(event) => setDispatchForm((previous) => ({ ...previous, estimatedDeliveryDate: event.target.value }))} className="drawer-input" />
            </div>

            <div className="drawer-footer">
              <button type="button" className="drawer-cancel-button" onClick={handleCloseDispatch}>Cancel</button>
              <button type="button" className="drawer-confirm-button" onClick={handleConfirmDispatch}>Confirm Dispatch</button>
            </div>
          </aside>
        </>
      )}

      {/* Tracking drawer */}
      {trackingOrder && trackingShipment && (
        <>
          <div className="drawer-overlay" onClick={handleCloseTracking} />
          <aside className="pick-pack-drawer">
            <div className="drawer-header">
              <div><span className="drawer-eyebrow">Shipment Tracking</span><h2>Track Shipment</h2><p>{trackingOrder.orderNumber}</p></div>
              <button type="button" className="drawer-close-button" onClick={handleCloseTracking} aria-label="Close tracking drawer">×</button>
            </div>

            <div className="drawer-section">
              <div className="drawer-summary-grid">
                <div><span className="drawer-label">Shipment</span><strong>{trackingShipment.shipmentNumber}</strong></div>
                <div><span className="drawer-label">Order</span><strong>{trackingOrder.orderNumber}</strong></div>
                <div><span className="drawer-label">Carrier</span><strong>{trackingShipment.carrier}</strong></div>
                <div><span className="drawer-label">Tracking Number</span><strong>{trackingShipment.trackingNumber}</strong></div>
              </div>
            </div>

            <div className="drawer-section">
              <div className="drawer-section-title">
                <div><h3>Tracking Status</h3><p>Current shipment movement status.</p></div>
                <span className={`tracking-status-badge ${getShipmentStatusClass(trackingShipment.status)}`}>{getShipmentStatusLabel(trackingShipment.status)}</span>
              </div>
              <div className="tracking-progress">
                {([
                  ['DISPATCHED', 'Dispatched', 'Shipment handed over to carrier'],
                  ['IN_TRANSIT', 'In Transit', 'Shipment is moving to destination'],
                  ['OUT_FOR_DELIVERY', 'Out for Delivery', 'Shipment is with the delivery carrier'],
                  ['DELIVERED', 'Delivered', 'Shipment delivered to customer'],
                ] as const).map(([status, label, description]) => {
                  const flow = ['DISPATCHED', 'IN_TRANSIT', 'OUT_FOR_DELIVERY', 'DELIVERED'];
                  const currentIndex = flow.indexOf(trackingShipment.status);
                  const completed = currentIndex >= flow.indexOf(status);
                  return (
                    <div className={`tracking-step ${completed ? 'completed' : ''}`} key={status}>
                      <div className="tracking-step-dot">{completed ? '✓' : '○'}</div>
                      <div><strong>{label}</strong><span>{description}</span></div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="drawer-section">
              <div className="drawer-section-title"><div><h3>Shipment Details</h3><p>Carrier and delivery information.</p></div></div>
              <div className="tracking-details-grid">
                <div className="tracking-detail-item"><span className="drawer-label">Tracking Number</span><strong>{trackingShipment.trackingNumber}</strong></div>
                <div className="tracking-detail-item"><span className="drawer-label">Shipping Method</span><strong>{trackingShipment.shippingMethod}</strong></div>
                <div className="tracking-detail-item"><span className="drawer-label">Shipping Cost</span><strong>₹{trackingShipment.shippingCost.toLocaleString('en-IN')}</strong></div>
                <div className="tracking-detail-item"><span className="drawer-label">Estimated Delivery</span><strong>{trackingShipment.estimatedDeliveryDate}</strong></div>
                {trackingShipment.actualDeliveryDate && <div className="tracking-detail-item"><span className="drawer-label">Actual Delivery</span><strong>{trackingShipment.actualDeliveryDate}</strong></div>}
              </div>
            </div>

            <div className="drawer-section">
              <div className="drawer-section-title"><div><h3>Tracking URL</h3><p>Mock carrier tracking reference.</p></div></div>
              <div className="tracking-url-box"><span>{getTrackingUrl(trackingShipment.carrier, trackingShipment.trackingNumber)}</span></div>
              <small className="tracking-mock-note">Mock URL for frontend development. Replace it with the real carrier/API URL when available.</small>
            </div>

            <div className="drawer-footer">
              <button type="button" className="drawer-cancel-button" onClick={handleCloseTracking}>Close</button>
              <button type="button" className="drawer-confirm-button" onClick={handleUpdateTrackingStatus} disabled={trackingShipment.status === 'DELIVERED' || trackingShipment.status === 'EXCEPTION'}>
                {trackingShipment.status === 'DELIVERED' ? 'Shipment Delivered' : 'Update Tracking Status'}
              </button>
            </div>
          </aside>
        </>
      )}

      {/* RMA inspection drawer */}
      {selectedReturn && (
        <>
          <div className="drawer-overlay" onClick={handleCloseInspection} />
          <aside className="pick-pack-drawer">
            <div className="drawer-header">
              <div><span className="drawer-eyebrow">Returns Management</span><h2>RMA Inspection</h2><p>{selectedReturn.returnNumber}</p></div>
              <button type="button" className="drawer-close-button" onClick={handleCloseInspection} aria-label="Close inspection drawer">×</button>
            </div>

            <div className="drawer-section">
              <div className="drawer-summary-grid">
                <div><span className="drawer-label">Return Number</span><strong>{selectedReturn.returnNumber}</strong></div>
                <div><span className="drawer-label">Sales Order</span><strong>{mockSalesOrders.find((order) => order.id === selectedReturn.salesOrderId)?.orderNumber ?? selectedReturn.salesOrderId}</strong></div>
                <div><span className="drawer-label">Customer</span><strong>{selectedReturn.customerId}</strong></div>
                <div><span className="drawer-label">Reason</span><strong>{formatLabel(selectedReturn.reason)}</strong></div>
              </div>
            </div>

            <div className="drawer-section">
              <div className="drawer-section-title"><div><h3>Returned Items</h3><p>Inspect each item and select its physical condition.</p></div></div>
              {selectedReturn.items.map((item) => (
                <div className="rma-inspection-item" key={item.id}>
                  <div className="pick-item-info">
                    <strong>{item.productId}</strong>
                    <span>Quantity returned: {item.quantityReturned}</span>
                    <span>Refund amount: ₹{item.refundAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <label className="drawer-field-label" htmlFor={`condition-${item.id}`}>Item Condition</label>
                  <select
                    id={`condition-${item.id}`}
                    className="drawer-select"
                    value={inspectionConditions[item.id] ?? item.condition}
                    onChange={(event) => setInspectionConditions((previous) => ({
                      ...previous,
                      [item.id]: event.target.value as ReturnItem['condition'],
                    }))}
                  >
                    <option value="RESALEABLE">Resaleable</option>
                    <option value="DAMAGED">Damaged</option>
                    <option value="DEFECTIVE">Defective</option>
                  </select>
                  <p className="rma-condition-help">
                    {(inspectionConditions[item.id] ?? item.condition) === 'RESALEABLE'
                      ? 'May be eligible for restocking after approval.'
                      : 'Review this item before making a restocking decision.'}
                  </p>
                </div>
              ))}
            </div>

            <div className="drawer-section">
              <div className="drawer-section-title">
                <div>
                  <h3>Restocking Authorization</h3>
                  <p>Decide whether the returned items are eligible for restocking.</p>
                </div>
              </div>

              <label
                htmlFor="restockDecision"
                className="drawer-field-label"
              >
                Can these items be restocked? *
              </label>

              <select
                id="restockDecision"
                className="drawer-select"
                value={restockDecisions[selectedReturn.id] ?? ''}
                onChange={(event) =>
                  setRestockDecisions((previous) => ({
                    ...previous,
                    [selectedReturn.id]: event.target.value as RestockDecision,
                  }))
                }
              >
                <option value="">Select decision</option>
                <option value="YES">Yes — Eligible for restocking</option>
                <option value="NO">No — Do not restock</option>
              </select>

              <p className="rma-condition-help">
                This records the decision only. Actual inventory changes must be
                coordinated with the Inventory module.
              </p>
            </div>

            <div className="drawer-section">
              <label htmlFor="inspectionNotes" className="drawer-field-label">Inspection Notes</label>
              <textarea
                id="inspectionNotes"
                className="drawer-input rma-notes"
                value={inspectionNotes}
                onChange={(event) => setInspectionNotes(event.target.value)}
                placeholder="Enter inspection observations..."
                rows={4}
              />
            </div>


            <div className="drawer-footer">
              <button
                type="button"
                className="drawer-cancel-button"
                onClick={handleCloseInspection}
              >
                Close
              </button>

              {selectedReturn.status !== 'AUTHORIZED' &&
                selectedReturn.status !== 'REJECTED' && (
                  <>
                    <button
                      type="button"
                      className="drawer-confirm-button"
                      onClick={handleSaveInspection}
                    >
                      Save Inspection
                    </button>

                    <button
                      type="button"
                      className="drawer-confirm-button"
                      onClick={handleApproveReturn}
                      disabled={selectedReturn.status !== 'INSPECTED'}
                    >
                      Approve Return
                    </button>

                    <button
                      type="button"
                      className="drawer-cancel-button"
                      onClick={handleRejectReturn}
                      disabled={selectedReturn.status !== 'INSPECTED'}
                    >
                      Reject Return
                    </button>
                  </>
                )}
            </div>

          </aside>
        </>
      )}
    </div>
  );
};

export default FulfillmentPage;
