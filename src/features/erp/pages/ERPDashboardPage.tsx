import React, { useState } from 'react';
import {
  RefreshCw,
  Settings2,
  Activity,
} from 'lucide-react';

import {
  PageHeader,
  Badge,
  LoadingState,
  EmptyState,
  ErrorState,
} from '@shared/components';

import { useERPDashboard } from '../hooks/useERPDashboard';
import { ERPKpiCards } from '../components/ERPDashboard/ERPKpiCards';
import { ERPSupplyChainTrends } from'../components/ERPDashboard/ERPSupplyChainTrends';
import { InventoryOverview } from '../components/ERPDashboard/ERPInventoryOverview';
import { ERPRecentOrders } from '../components/ERPDashboard/ERPRecentOrders';
import { ERPAlertsActivity } from '../components/ERPDashboard/ERPAlertsActivity';

import {
  ERPDashboardConfigureModal,
  ERPDashboardConfiguration,
} from '../components/ERPDashboard/ERPDashboardConfigureModal';

export const ERPDashboardPage: React.FC = () => {
  const {
    data,
    loading,
    error,
    refetch,
  } = useERPDashboard();

 

  const [isConfigureOpen, setIsConfigureOpen] =
    useState(false);

  const [configuration, setConfiguration] =
    useState<ERPDashboardConfiguration>({
      showKpis: true,
      showInventoryWarehouse: true,
      showSupplyChainTrends: true,
      showRecentOrders: true,
      showAlerts: true,
      showActivity: true,
    });

  const handleSaveConfiguration = (
    newConfiguration: ERPDashboardConfiguration
  ) => {
    setConfiguration(newConfiguration);
  };

 

  if (loading) {
    return (
      <div style={pageContainerStyle}>
        <PageHeader
          breadcrumb="ERP / SUPPLY CHAIN"
          title="ERP Dashboard & Overview"
          description="High-level operational overview, supply chain KPI aggregations, and critical alerts."
          badge={
            <Badge variant="team-a">
              ERP
            </Badge>
          }
        />

        <LoadingState
          message="Loading supply chain dashboard..."
          size="lg"
        />
      </div>
    );
  }



  if (error) {
    return (
      <div style={pageContainerStyle}>
        <PageHeader
          breadcrumb="ERP / SUPPLY CHAIN"
          title="ERP Dashboard & Overview"
          description="High-level operational overview, supply chain KPI aggregations, and critical alerts."
          badge={
            <Badge variant="team-a">
              ERP
            </Badge>
          }
        />

        <ErrorState
          title="Unable to Load ERP Dashboard"
          message={error}
          onRetry={refetch}
        />
      </div>
    );
  }

 

  if (!data) {
    return (
      <div style={pageContainerStyle}>
        <PageHeader
          breadcrumb="ERP / SUPPLY CHAIN"
          title="ERP Dashboard & Overview"
          description="High-level operational overview, supply chain KPI aggregations, and critical alerts."
          badge={
            <Badge variant="team-a">
              ERP
            </Badge>
          }
        />

        <EmptyState
          icon={<Activity size={32} />}
          title="No ERP Dashboard Data"
          description="There is currently no supply chain information available for this workspace."
          actionLabel="Refresh Dashboard"
          onAction={refetch}
        />
      </div>
    );
  }



  return (
    <>
      <div style={pageContainerStyle}>
        <PageHeader
          breadcrumb="ERP / SUPPLY CHAIN"
          title="ERP Dashboard & Overview"
          description="High-level operational overview, supply chain KPI aggregations, cross-module activity status, and critical alerts."
          badge={
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                flexWrap: 'wrap',
              }}
            >
              <Badge variant="team-a">
                ERP
              </Badge>

              <Badge variant="success">
                Operational
              </Badge>
            </div>
          }
          actions={
            <div className="erp-dashboard-actions">
              {/* REFRESH */}
              <button
                type="button"
                onClick={refetch}
                style={headerButtonStyle}
              >
                <RefreshCw size={15} />
                Refresh
              </button>

              {/* CONFIGURE */}
              <button
                type="button"
                onClick={() => setIsConfigureOpen(true)}
                style={headerButtonStyle}
              >
                <Settings2 size={15} />
                Configure
              </button>
            </div>
          }
        />

        

        {configuration.showKpis && (
          <section
            aria-label="ERP KPI summary"
            style={sectionStyle}
          >
            <ERPKpiCards
              kpis={data.kpis}
            />
          </section>
        )}

       

        {configuration.showInventoryWarehouse && (
          <section
            aria-label="Inventory and warehouse overview"
            style={sectionStyle}
          >
            <InventoryOverview
              inventory={data.inventory}
              warehouses={data.warehouses}
            />
          </section>
        )}

     

      {configuration.showSupplyChainTrends && (
       <section
        aria-label="Supply chain performance trends"
        style={sectionStyle}
        >
       <ERPSupplyChainTrends
         trends={data.supplyChainTrends}
        />
       </section>
       )}

        

        {configuration.showRecentOrders && (
          <section
            aria-label="Recent orders"
            style={{
              marginBottom: '18px',
            }}
          >
            <ERPRecentOrders
              orders={data.recentOrders}
            />
          </section>
        )}

       

        {(configuration.showAlerts ||
          configuration.showActivity) && (
          <section
            aria-label="ERP alerts and activity"
            style={{
              marginBottom: '18px',
            }}
          >
            <ERPAlertsActivity
              alerts={
                configuration.showAlerts
                  ? data.alerts
                  : []
              }
              activities={
                configuration.showActivity
                  ? data.activities
                  : []
              }
            />
          </section>
        )}

        <style>{`
          .erp-dashboard-actions {
            display: flex;
            align-items: center;
            gap: 7px;
            flex-wrap: wrap;
            position: relative;
            top: 25px;
          }

          .erp-dashboard-actions button:hover {
            border-color: rgba(99, 102, 241, 0.45);
            color: var(--text-primary);
            background-color: rgba(99, 102, 241, 0.08);
          }

          .erp-dashboard-actions button:focus-visible {
            outline: 2px solid var(--brand-primary);
            outline-offset: 2px;
          }

          @media (max-width: 900px) {
            .erp-orders-card {
              overflow: hidden;
            }
          }

          @media (max-width: 768px) {
            .erp-kpi-card {
              min-width: 0;
            }
          }

          @media (max-width: 600px) {
            .erp-dashboard-actions {
              width: 100%;
            }

            .erp-dashboard-actions button {
              flex: 1;
              justify-content: center;
              min-width: 120px;
            }
          }

          @media (max-width: 380px) {
            .erp-dashboard-actions {
              flex-direction: column;
            }

            .erp-dashboard-actions button {
              width: 100%;
            }
          }
        `}</style>
      </div>

      
      <ERPDashboardConfigureModal
        isOpen={isConfigureOpen}
        configuration={configuration}
        onClose={() => setIsConfigureOpen(false)}
        onSave={handleSaveConfiguration}
      />
    </>
  );
};



const pageContainerStyle: React.CSSProperties = {
  padding: '28px',
  maxWidth: '1400px',
  margin: '0 auto',
};

const sectionStyle: React.CSSProperties = {
  marginBottom: '18px',
};

const headerButtonStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '7px',
  padding: '9px 13px',
  borderRadius: '8px',
  border: '1px solid var(--border-subtle)',
  background: 'var(--bg-elevated)',
  color: 'var(--text-secondary)',
  fontSize: '12px',
  fontWeight: 600,
  cursor: 'pointer',
  transition:
    'background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease',
};