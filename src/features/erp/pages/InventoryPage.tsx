import React, { useEffect, useMemo, useState } from 'react';
import { Card, Badge, Input, Button, LoadingState, ErrorState } from '@shared/components';

import {
  mockInventoryItems,
  mockProductLookup,
  mockWarehouseLookup,
  mockBatches,
  mockSerialNumbers,
  mockStockMovements,
  mockReorderRules,
  mockStockAdjustments as initialAdjustments,
} from '@mock/erp/erpInventoryMockData';

import type { StockAdjustment, StockAdjustmentReason, StockAdjustmentItem } from '@features/erp/types';

// Physical Stock Count records — kept local for now.
const mockStockCounts = [
  { id: 'count-001', countCode: 'SC-0091', warehouseId: 'wh-001', scheduledDate: '2026-10-10T00:00:00Z', countType: 'CYCLE', status: 'PLANNED', countedBy: 'ERP-DEV-04', completedAt: null },
  { id: 'count-002', countCode: 'SC-0090', warehouseId: 'wh-002', scheduledDate: '2026-10-05T00:00:00Z', countType: 'FULL', status: 'COMPLETED', countedBy: 'ERP-DEV-04', completedAt: '2026-10-05T17:30:00Z' },
  { id: 'count-003', countCode: 'SC-0089', warehouseId: 'wh-001', scheduledDate: '2026-09-28T00:00:00Z', countType: 'SPOT', status: 'RECONCILED', countedBy: 'ERP-DEV-04', completedAt: '2026-09-28T14:00:00Z' },
];

const REASON_OPTIONS: StockAdjustmentReason[] = ['CYCLE_COUNT', 'DAMAGE', 'THEFT', 'DATA_CORRECTION', 'EXPIRED'];

const movementVariant: Record<string, 'success' | 'warning' | 'neutral'> = {
  RECEIPT: 'success',
  SHIPMENT: 'neutral',
  TRANSFER_IN: 'success',
  TRANSFER_OUT: 'neutral',
  ADJUSTMENT_IN: 'success',
  ADJUSTMENT_OUT: 'warning',
  RETURN: 'warning',
};

type SortField = 'product' | 'available' | 'reserved';
type SortDirection = 'asc' | 'desc';

export const InventoryPage: React.FC = () => {
  // ---------- Loading / Error simulation ----------
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadAttempt, setLoadAttempt] = useState(0);

  const [items] = useState(mockInventoryItems);
  const [batches] = useState(mockBatches);
  const [serials] = useState(mockSerialNumbers);
  const [adjustments, setAdjustments] = useState<StockAdjustment[]>(initialAdjustments);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const timer = setTimeout(() => {
      if (cancelled) return;
      setLoading(false);
    }, 600);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [loadAttempt]);

  // ---------- Filters ----------
  const [searchText, setSearchText] = useState('');
  const [warehouseFilter, setWarehouseFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // ---------- Sorting ----------
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredItems = useMemo(() => {
    const filtered = items.filter((item) => {
      const product = mockProductLookup[item.productId];
      const matchesSearch =
        !searchText ||
        product?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        product?.sku?.toLowerCase().includes(searchText.toLowerCase());

      const matchesWarehouse = warehouseFilter === 'ALL' || item.warehouseId === warehouseFilter;

      const isLow = item.quantityAvailable <= item.reorderPoint;
      const matchesStatus =
        statusFilter === 'ALL' ||
        (statusFilter === 'LOW_STOCK' && isLow) ||
        (statusFilter === 'HEALTHY' && !isLow);

      return matchesSearch && matchesWarehouse && matchesStatus;
    });

    if (!sortField) return filtered;

    const sorted = [...filtered].sort((a, b) => {
      let result = 0;
      if (sortField === 'product') {
        const nameA = mockProductLookup[a.productId]?.name ?? '';
        const nameB = mockProductLookup[b.productId]?.name ?? '';
        result = nameA.localeCompare(nameB);
      } else if (sortField === 'available') {
        result = a.quantityAvailable - b.quantityAvailable;
      } else if (sortField === 'reserved') {
        result = a.quantityReserved - b.quantityReserved;
      }
      return sortDirection === 'asc' ? result : -result;
    });

    return sorted;
  }, [items, searchText, warehouseFilter, statusFilter, sortField, sortDirection]);

  // ---------- Export SKU Stock Balance to CSV ----------
  const handleExportCSV = () => {
    const headers = ['Product', 'Warehouse', 'Available', 'Reserved', 'Status'];
    const rows = filteredItems.map((item) => {
      const product = mockProductLookup[item.productId];
      const warehouse = mockWarehouseLookup[item.warehouseId];
      const isLow = item.quantityAvailable <= item.reorderPoint;
      return [
        product?.name ?? item.productId,
        warehouse?.name ?? item.warehouseId,
        String(item.quantityAvailable),
        String(item.quantityReserved),
        isLow ? 'LOW STOCK' : 'HEALTHY',
      ];
    });

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sku-stock-balance-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // ---------- Reorder Alerts ----------
  const reorderAlerts = useMemo(() => {
    return items
      .filter((item) => item.quantityAvailable <= item.reorderPoint)
      .map((item) => {
        const rule = mockReorderRules.find(
          (r) => r.productId === item.productId && r.warehouseId === item.warehouseId
        );
        return { item, rule };
      });
  }, [items]);

  // ---------- New Stock Adjustment form ----------
  const [form, setForm] = useState({
    warehouseId: '',
    productId: '',
    reason: '' as StockAdjustmentReason | '',
    currentQuantity: '',
    adjustedQuantity: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formSuccess, setFormSuccess] = useState(false);

  // Auto-fill Current Quantity when Warehouse + Product are both selected
  useEffect(() => {
    if (form.warehouseId && form.productId) {
      const match = items.find(
        (i) => i.warehouseId === form.warehouseId && i.productId === form.productId
      );
      if (match) {
        setForm((prev) => ({ ...prev, currentQuantity: String(match.quantityAvailable) }));
      }
    }
  }, [form.warehouseId, form.productId, items]);

  const handleFormChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setFormErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
    setFormSuccess(false);
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!form.warehouseId) errors.warehouseId = 'Warehouse is required';
    if (!form.productId) errors.productId = 'Product is required';
    if (!form.reason) errors.reason = 'Reason is required';
    if (form.currentQuantity === '') errors.currentQuantity = 'Current quantity is required';
    if (form.adjustedQuantity === '') errors.adjustedQuantity = 'Adjusted quantity is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitAdjustment = () => {
    if (!validateForm()) return;

    const current = Number(form.currentQuantity);
    const adjusted = Number(form.adjustedQuantity);
    const difference = adjusted - current;

    const matchedItem = items.find(
      (i) => i.warehouseId === form.warehouseId && i.productId === form.productId
    );

    const newItem: StockAdjustmentItem = {
      id: `adj-item-${Date.now()}`,
      productId: form.productId,
      currentQuantity: current,
      adjustedQuantity: adjusted,
      difference,
      totalCostImpact: difference * (matchedItem?.averageUnitCost ?? 0),
    };

    const newAdjustment: StockAdjustment = {
      id: `adj-${Date.now()}`,
      adjustmentNumber: `ADJ-${String(adjustments.length + 1).padStart(4, '0')}`,
      warehouseId: form.warehouseId,
      reason: form.reason as StockAdjustmentReason,
      status: 'DRAFT',
      createdAt: new Date().toISOString(),
      approvedBy: null,
      items: [newItem],
    };

    setAdjustments((prev) => [newAdjustment, ...prev]);
    setForm({ warehouseId: '', productId: '', reason: '', currentQuantity: '', adjustedQuantity: '' });
    setFormSuccess(true);
  };

  // ---------- Badge variant maps ----------
  const batchStatusVariant: Record<string, 'success' | 'warning' | 'neutral'> = {
    AVAILABLE: 'success',
    QUARANTINE: 'warning',
    EXPIRED: 'warning',
    DEPLETED: 'neutral',
  };

  const serialStatusVariant: Record<string, 'success' | 'warning' | 'neutral'> = {
    IN_STOCK: 'success',
    ALLOCATED: 'warning',
    SOLD: 'neutral',
    RETURNED: 'warning',
    DEFECTIVE: 'warning',
  };

  const adjustmentStatusVariant: Record<string, 'success' | 'warning' | 'neutral'> = {
    DRAFT: 'neutral',
    APPROVED: 'warning',
    POSTED: 'success',
    REJECTED: 'warning',
  };

  const countStatusVariant: Record<string, 'success' | 'warning' | 'neutral'> = {
    PLANNED: 'neutral',
    COMPLETED: 'warning',
    RECONCILED: 'success',
  };

  // ---------- KPI totals ----------
  const totalItems = items.length;
  const totalAvailable = items.reduce((sum, i) => sum + i.quantityAvailable, 0);
  const totalReserved = items.reduce((sum, i) => sum + i.quantityReserved, 0);
  const lowStockItems = items.filter((i) => i.quantityAvailable <= i.reorderPoint).length;

  const sortArrow = (field: SortField) => {
    if (sortField !== field) return '';
    return sortDirection === 'asc' ? ' ▲' : ' ▼';
  };

  if (loading) {
    return <LoadingState message="Loading inventory..." />;
  }

  if (error) {
    return (
      <ErrorState
        message={error}
        onRetry={() => setLoadAttempt((n) => n + 1)}
        retryLabel="Retry"
      />
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)' }}>
          Inventory
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
          Item catalog, stock levels, adjustments and movement history
        </p>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <Card title="Total Items" accent="team-a">
          <div style={{ fontSize: '24px', fontWeight: 700 }}>{totalItems}</div>
        </Card>
        <Card title="Available Qty" accent="team-a">
          <div style={{ fontSize: '24px', fontWeight: 700 }}>{totalAvailable}</div>
        </Card>
        <Card title="Reserved Qty" accent="team-a">
          <div style={{ fontSize: '24px', fontWeight: 700 }}>{totalReserved}</div>
        </Card>
        <Card title="Low Stock Items" accent="team-a">
          <div style={{ fontSize: '24px', fontWeight: 700, color: lowStockItems > 0 ? '#fb7185' : 'inherit' }}>
            {lowStockItems}
          </div>
        </Card>
      </div>

      {/* Reorder Alerts */}
      {reorderAlerts.length > 0 && (
        <Card title="⚠️ Reorder Alerts" accent="team-a" style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {reorderAlerts.map(({ item, rule }) => {
              const product = mockProductLookup[item.productId];
              const warehouse = mockWarehouseLookup[item.warehouseId];
              return (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 12px',
                    background: 'var(--bg-elevated)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '13px',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                      {product?.name ?? item.productId}
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
                      {warehouse?.name ?? item.warehouseId} · Available {item.quantityAvailable} / Reorder Point {item.reorderPoint}
                      {rule && rule.preferredVendorId && ` · Preferred vendor: ${rule.preferredVendorId}`}
                    </div>
                  </div>
                  <Badge variant={rule?.autoReorder ? 'success' : 'warning'} size="sm">
                    {rule?.autoReorder ? 'AUTO-REORDER ON' : 'MANUAL REORDER'}
                  </Badge>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Filters */}
      <Card title="Filters" accent="team-a" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '12px' }}>
          <Input
            label="Search"
            placeholder="Search by product name or SKU"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <div>
            <label style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Warehouse</label>
            <select
              value={warehouseFilter}
              onChange={(e) => setWarehouseFilter(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-input)',
              }}
            >
              <option value="ALL">All Warehouses</option>
              {Object.values(mockWarehouseLookup).map((wh) => (
                <option key={wh.id} value={wh.id}>
                  {wh.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-input)',
              }}
            >
              <option value="ALL">All</option>
              <option value="HEALTHY">Healthy</option>
              <option value="LOW_STOCK">Low Stock</option>
            </select>
          </div>
        </div>
      </Card>

      {/* SKU Stock Balance */}
      <Card
        title="SKU Stock Balance"
        accent="team-a"
        style={{ marginBottom: '24px' }}
        action={
          <Button variant="outline" size="sm" onClick={handleExportCSV}>
            Export CSV
          </Button>
        }
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border-subtle)' }}>
              <th
                style={{ padding: '8px', cursor: 'pointer' }}
                onClick={() => handleSort('product')}
              >
                Product{sortArrow('product')}
              </th>
              <th style={{ padding: '8px' }}>Warehouse</th>
              <th
                style={{ padding: '8px', cursor: 'pointer' }}
                onClick={() => handleSort('available')}
              >
                Available{sortArrow('available')}
              </th>
              <th
                style={{ padding: '8px', cursor: 'pointer' }}
                onClick={() => handleSort('reserved')}
              >
                Reserved{sortArrow('reserved')}
              </th>
              <th style={{ padding: '8px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => {
              const product = mockProductLookup[item.productId];
              const warehouse = mockWarehouseLookup[item.warehouseId];
              const isLow = item.quantityAvailable <= item.reorderPoint;
              return (
                <tr key={item.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '8px' }}>{product?.name ?? item.productId}</td>
                  <td style={{ padding: '8px' }}>{warehouse?.name ?? item.warehouseId}</td>
                  <td style={{ padding: '8px' }}>{item.quantityAvailable}</td>
                  <td style={{ padding: '8px' }}>{item.quantityReserved}</td>
                  <td style={{ padding: '8px' }}>
                    <Badge variant={isLow ? 'warning' : 'success'} size="sm">
                      {isLow ? 'LOW STOCK' : 'HEALTHY'}
                    </Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

      {/* Batches/Lots + Serialized Items */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
        <Card title="Batches / Lots" accent="team-a">
          {batches.map((batch) => {
            const product = mockProductLookup[batch.productId];
            return (
              <div
                key={batch.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 0',
                  borderBottom: '1px solid var(--border-subtle)',
                  fontSize: '13px',
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{batch.batchNumber}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
                    {product?.name ?? batch.productId} · {batch.remainingQuantity}/{batch.quantity} remaining
                  </div>
                </div>
                <Badge variant={batchStatusVariant[batch.status]} size="sm">
                  {batch.status}
                </Badge>
              </div>
            );
          })}
        </Card>

        <Card title="Serialized Items" accent="team-a">
          {serials.map((serial) => {
            const product = mockProductLookup[serial.productId];
            return (
              <div
                key={serial.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 0',
                  borderBottom: '1px solid var(--border-subtle)',
                  fontSize: '13px',
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{serial.serialCode}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
                    {product?.name ?? serial.productId}
                  </div>
                </div>
                <Badge variant={serialStatusVariant[serial.status]} size="sm">
                  {serial.status.replace('_', ' ')}
                </Badge>
              </div>
            );
          })}
        </Card>
      </div>

      {/* New Stock Adjustment */}
      <Card title="New Stock Adjustment" accent="team-a" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '12px' }}>
          <div>
            <label style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Warehouse</label>
            <select
              value={form.warehouseId}
              onChange={(e) => handleFormChange('warehouseId', e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-input)',
              }}
            >
              <option value="">Select warehouse</option>
              {Object.values(mockWarehouseLookup).map((wh) => (
                <option key={wh.id} value={wh.id}>
                  {wh.name}
                </option>
              ))}
            </select>
            {formErrors.warehouseId && (
              <div style={{ color: 'var(--status-danger)', fontSize: '12px', marginTop: '4px' }}>
                {formErrors.warehouseId}
              </div>
            )}
          </div>

          <div>
            <label style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Product</label>
            <select
              value={form.productId}
              onChange={(e) => handleFormChange('productId', e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-input)',
              }}
            >
              <option value="">Select product</option>
              {Object.values(mockProductLookup).map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            {formErrors.productId && (
              <div style={{ color: 'var(--status-danger)', fontSize: '12px', marginTop: '4px' }}>
                {formErrors.productId}
              </div>
            )}
          </div>

          <div>
            <label style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Reason</label>
            <select
              value={form.reason}
              onChange={(e) => handleFormChange('reason', e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-input)',
              }}
            >
              <option value="">Select reason</option>
              {REASON_OPTIONS.map((r) => (
                <option key={r} value={r}>
                  {r.replace('_', ' ')}
                </option>
              ))}
            </select>
            {formErrors.reason && (
              <div style={{ color: 'var(--status-danger)', fontSize: '12px', marginTop: '4px' }}>
                {formErrors.reason}
              </div>
            )}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
          <Input
            label="Current Quantity"
            value={form.currentQuantity}
            onChange={(e) => handleFormChange('currentQuantity', e.target.value)}
            error={formErrors.currentQuantity}
          />
          <Input
            label="Adjusted Quantity"
            value={form.adjustedQuantity}
            onChange={(e) => handleFormChange('adjustedQuantity', e.target.value)}
            error={formErrors.adjustedQuantity}
          />
        </div>

        {formSuccess && (
          <div style={{ color: '#34d399', fontSize: '13px', marginBottom: '12px' }}>
            Adjustment submitted successfully.
          </div>
        )}

        <Button variant="primary" onClick={handleSubmitAdjustment}>
          Submit Adjustment
        </Button>
      </Card>

      {/* Stock Adjustments & Write-offs */}
      <Card title="Stock Adjustments & Write-offs" accent="team-a" style={{ marginBottom: '24px' }}>
        {adjustments.map((adj) => {
          const warehouse = mockWarehouseLookup[adj.warehouseId];
          const totalImpact = adj.items.reduce((sum, i) => sum + i.totalCostImpact, 0);
          return (
            <div key={adj.id} style={{ padding: '10px 0', borderBottom: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '13px' }}>{adj.adjustmentNumber}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
                    {warehouse?.name ?? adj.warehouseId} · {adj.reason.replace('_', ' ')}
                  </div>
                </div>
                <Badge variant={adjustmentStatusVariant[adj.status]} size="sm">
                  {adj.status}
                </Badge>
              </div>
              <div style={{ fontSize: '13px', marginTop: '6px' }}>
                Total cost impact:{' '}
                <span style={{ color: totalImpact < 0 ? '#fb7185' : '#34d399' }}>
                  ₹{totalImpact.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          );
        })}
      </Card>

      {/* Stock Counting */}
      <Card title="Stock Counting" accent="team-a" style={{ marginBottom: '24px' }}>
        {mockStockCounts.map((c) => {
          const warehouse = mockWarehouseLookup[c.warehouseId];
          return (
            <div
              key={c.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 0',
                borderBottom: '1px solid var(--border-subtle)',
                fontSize: '13px',
              }}
            >
              <div>
                <div style={{ fontWeight: 600 }}>{c.countCode}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
                  {warehouse?.name ?? c.warehouseId} · {c.countType} · scheduled{' '}
                  {new Date(c.scheduledDate).toLocaleDateString('en-IN')}
                </div>
              </div>
              <Badge variant={countStatusVariant[c.status]} size="sm">
                {c.status}
              </Badge>
            </div>
          );
        })}
      </Card>

      {/* Movement History */}
      <Card title="Movement History" accent="team-a" style={{ marginBottom: '24px' }}>
        {[...mockStockMovements]
          .sort((a, b) => new Date(b.movementDate).getTime() - new Date(a.movementDate).getTime())
          .map((m) => {
            const product = mockProductLookup[m.productId];
            const from = m.fromWarehouseId ? mockWarehouseLookup[m.fromWarehouseId]?.name : null;
            const to = m.toWarehouseId ? mockWarehouseLookup[m.toWarehouseId]?.name : null;

            return (
              <div
                key={m.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  padding: '10px 0',
                  borderBottom: '1px solid var(--border-subtle)',
                  fontSize: '13px',
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                    {m.movementCode} · {product?.name ?? m.productId}
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
                    {from && `From ${from} `}
                    {to && `→ ${to} `}
                    {!from && !to && '—'}
                    {' · '}Ref: {m.referenceType} ({m.referenceId}) · by {m.performedBy}
                  </div>
                  {m.remarks && (
                    <div style={{ color: 'var(--text-secondary)', fontSize: '12px', marginTop: '2px' }}>
                      {m.remarks}
                    </div>
                  )}
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <Badge variant={movementVariant[m.movementType]} size="sm">
                    {m.movementType.replace('_', ' ')}
                  </Badge>
                  <div style={{ fontSize: '13px', fontWeight: 600, marginTop: '6px' }}>{m.quantity}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    {new Date(m.movementDate).toLocaleDateString('en-IN')}
                  </div>
                </div>
              </div>
            );
          })}
      </Card>
    </div>
  );
};