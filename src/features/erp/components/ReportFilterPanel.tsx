import { CalendarDays, Search, SlidersHorizontal } from 'lucide-react';
import type { ErpReportFilters, ErpReportType } from '../types/reportTypes';
import type { Warehouse } from '../types/warehouse';

const statusOptions: Record<ErpReportType, string[]> = {
  'inventory-valuation': ['HEALTHY', 'LOW STOCK'],
  'vendor-delivery': ['ACTIVE', 'INACTIVE', 'UNDER_REVIEW', 'BLACKLISTED'],
  'carrier-turnaround': ['DELIVERED', 'OUT_FOR_DELIVERY', 'IN_TRANSIT', 'EXCEPTION', 'DISPATCHED'],
  'stock-movement': ['RECEIPT', 'SHIPMENT', 'TRANSFER_IN', 'TRANSFER_OUT', 'ADJUSTMENT_IN', 'ADJUSTMENT_OUT', 'RETURN'],
  'profit-loss': ['PROFIT', 'LOSS'],
};

interface ReportFilterPanelProps {
  activeReport: ErpReportType;
  filters: ErpReportFilters;
  warehouses: Warehouse[];
  isLoading: boolean;
  onChange: (filters: ErpReportFilters) => void;
  onApply: () => void;
  onReset: () => void;
}

export function ReportFilterPanel({ activeReport, filters, warehouses, isLoading, onChange, onApply, onReset }: ReportFilterPanelProps) {
  const update = (key: keyof ErpReportFilters, value: string) => onChange({ ...filters, [key]: value });
  
  // Warehouse filter only for inventory and stock movement[cite: 19]
  const usesWarehouse = activeReport === 'inventory-valuation' || activeReport === 'stock-movement';
  
  // Search bar logic
  const showSearch = activeReport !== 'profit-loss'; 

  return (
    <section className="erp-report-filter-panel" aria-label="Report filters">
      <div className="erp-report-filter-title"><span className="erp-report-filter-icon"><SlidersHorizontal size={16} /></span><strong>Filters</strong><span>Refine report data</span></div>
      <div className="erp-report-filter-fields">
        <label className="erp-report-field erp-report-date-field">
          <span>Date range</span>
          <span className="erp-report-date-input"><CalendarDays size={15} /><input aria-label="Start date" type="date" value={filters.from} onChange={(event) => update('from', event.target.value)} /></span>
          <span className="erp-report-date-separator">to</span>
          <span className="erp-report-date-input"><CalendarDays size={15} /><input aria-label="End date" type="date" value={filters.to} onChange={(event) => update('to', event.target.value)} /></span>
        </label>
        
        {usesWarehouse && (
          <label className="erp-report-field">
            <span>Warehouse</span>
            <select value={filters.warehouseId} onChange={(event) => update('warehouseId', event.target.value)}>
              <option value="all">All warehouses</option>
              {warehouses.map((warehouse) => <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>)}
            </select>
          </label>
        )}
        
        <label className="erp-report-field">
          <span>{activeReport === 'profit-loss' ? 'Record Type' : 'Status'}</span>
          <select value={filters.status} onChange={(event) => update('status', event.target.value)}>
            <option value="all">All {activeReport === 'profit-loss' ? 'records' : 'statuses'}</option>
            {statusOptions[activeReport].map((status) => <option key={status} value={status}>{status.replaceAll('_', ' ')}</option>)}
          </select>
        </label>

        {showSearch && (
          <label className="erp-report-field erp-report-search-field">
            <span>Search</span>
            <span className="erp-report-search-input"><Search size={16} /><input type="search" placeholder="Name, code, or reference" value={filters.search} onChange={(event) => update('search', event.target.value)} /></span>
          </label>
        )}

        <div className="erp-report-filter-actions">
          <button className="erp-report-reset" type="button" onClick={onReset}>Reset</button>
          <button className="erp-report-apply" type="button" onClick={onApply} disabled={isLoading}>{isLoading ? 'Applying...' : 'Apply filters'}</button>
        </div>
      </div>
    </section>
  );
}