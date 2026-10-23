import React from 'react';
import {
  ClipboardList,
  PackageSearch,
  Truck,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';

import { Card } from '@shared/components';
import type { ERPDashboardKpis } from '@features/erp/types';

interface ERPKpiCardsProps {
  kpis: ERPDashboardKpis;
}

interface KpiItemProps {
  title: React.ReactNode;
  value: string;
  change: number;
  description: string;
  icon: React.ReactNode;
  variant?: 'normal' | 'warning' | 'danger';
  progress?: number;
}

const KpiItem: React.FC<KpiItemProps> = ({
  title,
  value,
  change,
  description,
  icon,
  variant = 'normal',
  progress,
}) => {
  const isPositive = change >= 0;

  const iconBackground =
    variant === 'danger'
      ? 'rgba(239, 68, 68, 0.12)'
      : variant === 'warning'
        ? 'rgba(245, 158, 11, 0.12)'
        : 'rgba(99, 102, 241, 0.12)';

  const iconColor =
    variant === 'danger'
      ? '#f87171'
      : variant === 'warning'
        ? '#fbbf24'
        : '#818cf8';

  return (
    <Card className="erp-kpi-card">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '16px',
        }}
      >
        <div>
          <div
            style={{
              color: 'var(--text-secondary)',
              fontSize: '13px',
              fontWeight: 500,
              marginBottom: '10px',
            }}
          >
            {title}
          </div>

          <div
            style={{
              color: 'var(--text-primary)',
              fontSize: '28px',
              fontWeight: 700,
              letterSpacing: '-0.03em',
            }}
          >
            {value}
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginTop: '10px',
              fontSize: '12px',
            }}
          >
            {change !== 0 && (
              <>
                {isPositive ? (
                  <TrendingUp size={14} color="#34d399" />
                ) : (
                  <TrendingDown size={14} color="#f87171" />
                )}

                <span
                  style={{
                    color: isPositive ? '#34d399' : '#f87171',
                    fontWeight: 600,
                  }}
                >
                  {Math.abs(change)}%
                </span>
              </>
            )}

            <span style={{ color: 'var(--text-muted)' }}>
              {description}
            </span>
          </div>

          {progress !== undefined && (
            <div style={{ marginTop: '10px' }}>
              <div
                style={{
                  height: '5px',
                  width: '100%',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  background: 'var(--border-subtle)',
                }}
                role="progressbar"
                aria-label="Estimated deliveries on schedule"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${progress}%`,
                    borderRadius: '10px',
                    background: iconColor,
                    transition: 'width 200ms ease',
                  }}
                />
              </div>

              <div
                style={{
                  color: 'var(--text-muted)',
                  fontSize: '11px',
                  marginTop: '5px',
                }}
              >
                {progress}% on schedule
              </div>
            </div>
          )}
        </div>

        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: iconBackground,
            color: iconColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
      </div>
    </Card>
  );
};

export const ERPKpiCards: React.FC<ERPKpiCardsProps> = ({
  kpis,
}) => {
  const onSchedulePercentage =
    kpis.pendingDeliveries > 0
      ? Math.min(
          100,
          Math.max(
            0,
            Math.round(
              ((kpis.pendingDeliveries -
                kpis.delayedDeliveries) /
                kpis.pendingDeliveries) *
                100,
            ),
          ),
        )
      : 100;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns:
          'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
        marginBottom: '18px',
      }}
    >
      <KpiItem
        title={
          <>
            Total Open
            <br />
            POs
          </>
        }
        value={kpis.totalOpenPOs.toLocaleString()}
        change={kpis.openPOChange}
        description="vs previous period"
        icon={<ClipboardList size={21} />}
      />

      <KpiItem
        title="Low Stock SKU Alerts"
        value={kpis.lowStockSkus.toLocaleString()}
        change={0}
        description={`${kpis.criticalStockItems} critical items`}
        icon={<PackageSearch size={21} />}
        variant={
          kpis.criticalStockItems > 0
            ? 'danger'
            : 'normal'
        }
      />

      <KpiItem
        title="Pending Deliveries"
        value={kpis.pendingDeliveries.toLocaleString()}
        change={0}
        description={`${kpis.delayedDeliveries} delayed`}
        icon={<Truck size={21} />}
        variant={
          kpis.delayedDeliveries > 0
            ? 'warning'
            : 'normal'
        }
        progress={onSchedulePercentage}
      />

      <KpiItem
        title="Order Fulfillment Rate"
        value={`${kpis.fulfillmentRate}%`}
        change={kpis.fulfillmentChange}
        description="vs previous period"
        icon={<TrendingUp size={21} />}
      />
    </div>
  );
};