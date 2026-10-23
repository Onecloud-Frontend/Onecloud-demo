import { ArrowDownUp, Boxes, DollarSign, Truck, UsersRound } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ErpReportType } from '../types/reportTypes';

const reportOptions: Array<{ id: ErpReportType; label: string; description: string; icon: LucideIcon }> = [
  { id: 'inventory-valuation', label: 'Inventory valuation', description: 'Stock value and availability', icon: Boxes },
  { id: 'vendor-delivery', label: 'Vendor performance', description: 'Supplier ratings and orders', icon: UsersRound },
  { id: 'carrier-turnaround', label: 'Carrier turnaround', description: 'Delivery dates and exceptions', icon: Truck },
  { id: 'stock-movement', label: 'Stock movement', description: 'Receipts, transfers, and issues', icon: ArrowDownUp },
  { id: 'profit-loss', label: 'Profit & Loss', description: 'Revenues vs expenses', icon: DollarSign }
];

interface ReportTypeSelectorProps {
  activeReport: ErpReportType;
  onSelect: (type: ErpReportType) => void;
}

export function ReportTypeSelector({ activeReport, onSelect }: ReportTypeSelectorProps) {
  return (
    <nav className="erp-report-types" aria-label="Report type">
      {reportOptions.map(({ id, label, description, icon: Icon }) => (
        <button
          aria-current={activeReport === id ? 'page' : undefined}
          className={`erp-report-type${activeReport === id ? ' is-active' : ''}`}
          key={id}
          onClick={() => onSelect(id)}
          type="button"
        >
          <span className="erp-report-type-icon"><Icon size={18} strokeWidth={1.8} /></span>
          <span className="erp-report-type-copy"><strong>{label}</strong><small>{description}</small></span>
          <span className="erp-report-type-indicator" />
        </button>
      ))}
    </nav>
  );
}