import React from 'react';
import {Boxes,PackageCheck,Package,Warehouse,} from 'lucide-react';
import { Card, Badge } from '@shared/components';
import type {ERPInventoryOverview,ERPWarehouseCapacity,} from '@features/erp/types';

interface ERPInventoryOverviewProps {
  inventory: ERPInventoryOverview;
  warehouses: ERPWarehouseCapacity[];
}

export const InventoryOverview: React.FC<
  ERPInventoryOverviewProps
> = ({
  inventory,
  warehouses,
}) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns:
          'minmax(0, 1.05fr) minmax(0, 1fr)',
        gap: '18px',
        marginBottom: '18px',
      }}
    >
      {/* Inventory */}
      <Card
        title="Inventory Overview"
        subtitle="Current inventory valuation and availability"
        badge={<Badge variant="core">LIVE</Badge>}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(3, minmax(0, 1fr))',
            gap: '12px',
            marginBottom: '24px',
          }}
        >
          <InventoryMetric
            icon={<Boxes size={17} />}
            label="Total Value"
            value={formatCurrency(
              inventory.totalInventoryValue,
            )}
          />

          <InventoryMetric
            icon={<PackageCheck size={17} />}
            label="Available"
            value={formatCurrency(
              inventory.availableValue,
            )}
          />

          <InventoryMetric
            icon={<Package size={17} />}
            label="Reserved"
            value={formatCurrency(
              inventory.reservedValue,
            )}
          />
        </div>

        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '8px',
            }}
          >
            <span
              style={{
                color: 'var(--text-secondary)',
                fontSize: '12px',
              }}
            >
              Inventory allocation
            </span>

            <span
              style={{
                color: 'var(--text-primary)',
                fontSize: '12px',
                fontWeight: 600,
              }}
            >
              {Math.round(
                (inventory.availableValue /
                  inventory.totalInventoryValue) *
                  100,
              )}
              %
            </span>
          </div>

          <div
            style={{
              height: '8px',
              borderRadius: '999px',
              background: 'var(--bg-elevated)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${
                  (inventory.availableValue /
                    inventory.totalInventoryValue) *
                  100
                }%`,
                background:
                  'var(--brand-primary)',
                borderRadius: '999px',
              }}
            />
          </div>
        </div>
      </Card>

      {/* Warehouse */}
      <Card
        title="Warehouse Capacity"
        subtitle="Storage utilization across facilities"
        badge={
          <Badge variant="success">
            {warehouses.length} Facilities
          </Badge>
        }
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
          }}
        >
          {warehouses.map((warehouse) => (
            <div key={warehouse.id}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <Warehouse
                    size={16}
                    color="var(--text-muted)"
                  />

                  <span
                    style={{
                      color: 'var(--text-primary)',
                      fontSize: '13px',
                      fontWeight: 500,
                    }}
                  >
                    {warehouse.name}
                  </span>
                </div>

                <span
                  style={{
                    color:
                      warehouse.utilizationPercentage >= 85
                        ? '#f87171'
                        : warehouse.utilizationPercentage >=
                            70
                          ? '#fbbf24'
                          : '#34d399',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}
                >
                  {warehouse.utilizationPercentage}%
                </span>
              </div>

              <div
                style={{
                  height: '7px',
                  background: 'var(--bg-elevated)',
                  borderRadius: '999px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${warehouse.utilizationPercentage}%`,
                    background:
                      warehouse.utilizationPercentage >= 85
                        ? '#ef4444'
                        : warehouse.utilizationPercentage >=
                            70
                          ? '#f59e0b'
                          : '#10b981',
                    borderRadius: '999px',
                    transition: 'width 0.3s ease',
                  }}
                />
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '5px',
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                }}
              >
                <span>
                  {warehouse.usedCapacity} occupied
                </span>

                <span>
                  {warehouse.totalCapacity} total
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

const InventoryMetric: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
}> = ({
  icon,
  label,
  value,
}) => (
  <div
    style={{
      padding: '13px',
      borderRadius: '10px',
      background: 'var(--bg-elevated)',
      border: '1px solid var(--border-subtle)',
    }}
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        color: 'var(--text-muted)',
        fontSize: '11px',
        marginBottom: '7px',
      }}
    >
      {icon}
      {label}
    </div>

    <div
      style={{
        color: 'var(--text-primary)',
        fontSize: '16px',
        fontWeight: 650,
      }}
    >
      {value}
    </div>
  </div>
);

const formatCurrency = (value: number) => {
  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(2)}Cr`;
  }

  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(2)}L`;
  }

  return `₹${value.toLocaleString('en-IN')}`;
};