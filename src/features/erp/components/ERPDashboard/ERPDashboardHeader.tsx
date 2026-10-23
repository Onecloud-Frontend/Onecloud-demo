import React from 'react';
import { CalendarDays, RefreshCw,} from 'lucide-react';

interface ERPDashboardHeaderProps {
  onRefresh: () => void;
  isRefreshing?: boolean;
}

export const ERPDashboardHeader: React.FC<ERPDashboardHeaderProps> = ({
  onRefresh,
  isRefreshing = false,
}) => {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
          ERP / SUPPLY CHAIN
        </p>

        <h1 className="text-2xl font-semibold tracking-tight text-slate-100">
          ERP Dashboard
        </h1>

        <p className="mt-1 max-w-2xl text-sm text-slate-400">
          Supply chain operational overview, inventory health,
          procurement activity and fulfillment performance.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 text-xs font-medium text-slate-300 transition hover:border-slate-600 hover:bg-slate-800"
        >
          <CalendarDays size={15} />
          Last 30 Days
        </button>

        <button
          type="button"
          onClick={onRefresh}
          disabled={isRefreshing}
          className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 text-xs font-medium text-slate-300 transition hover:border-slate-600 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw
            size={15}
            className={
              isRefreshing
                ? 'animate-spin'
                : ''
            }
          />
          Refresh
        </button>
      </div>
    </div>
  );
};