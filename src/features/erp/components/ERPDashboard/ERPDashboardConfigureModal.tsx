import React, { useEffect, useState } from 'react';
import { Check, RotateCcw, X } from 'lucide-react';

export interface ERPDashboardConfiguration {
  showKpis: boolean;
  showInventoryWarehouse: boolean;
  showSupplyChainTrends: boolean
  showRecentOrders: boolean;
  showAlerts: boolean;
  showActivity: boolean;
}

interface ERPDashboardConfigureModalProps {
  isOpen: boolean;
  configuration: ERPDashboardConfiguration;
  onClose: () => void;
  onSave: (configuration: ERPDashboardConfiguration) => void;
}

const defaultConfiguration: ERPDashboardConfiguration = {
  showKpis: true,
  showInventoryWarehouse: true,
  showSupplyChainTrends: true,
  showRecentOrders: true,
  showAlerts: true,
  showActivity: true,
};

export const ERPDashboardConfigureModal: React.FC<
  ERPDashboardConfigureModalProps
> = ({
  isOpen,
  configuration,
  onClose,
  onSave,
}) => {
  const [localConfiguration, setLocalConfiguration] =
    useState<ERPDashboardConfiguration>(configuration);

  /**
   * Keep modal state synchronized with the dashboard configuration
   * whenever the modal is opened.
   */
  useEffect(() => {
    if (isOpen) {
      setLocalConfiguration(configuration);
    }
  }, [isOpen, configuration]);

  if (!isOpen) {
    return null;
  }

  const handleToggle = (
    key: keyof ERPDashboardConfiguration
  ) => {
    setLocalConfiguration((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  };

  const handleReset = () => {
    setLocalConfiguration(defaultConfiguration);
  };

  const handleSave = () => {
    onSave(localConfiguration);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="erp-dashboard-config-title"
      onMouseDown={onClose}
      style={overlayStyle}
    >
      <div
        onMouseDown={(event) => event.stopPropagation()}
        style={modalStyle}
      >
        {/* HEADER */}
        <div style={modalHeaderStyle}>
          <div>
            <div style={eyebrowStyle}>
              DASHBOARD SETTINGS
            </div>

            <h2
              id="erp-dashboard-config-title"
              style={titleStyle}
            >
              Configure Dashboard
            </h2>

            <p style={descriptionStyle}>
              Choose which sections should appear on your ERP
              dashboard.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close configuration"
            style={closeButtonStyle}
          >
            <X size={18} />
          </button>
        </div>

        {/* BODY */}
        <div style={modalBodyStyle}>
          <div style={sectionTitleStyle}>
            Dashboard Sections
          </div>

          <div style={sectionListStyle}>
            <ConfigurationItem
              title="KPI Summary"
              description="Open POs, low stock, pending deliveries and fulfillment rate."
              checked={localConfiguration.showKpis}
              onChange={() => handleToggle('showKpis')}
            />

            <ConfigurationItem
              title="Inventory & Warehouse"
              description="Inventory valuation and warehouse capacity utilization."
              checked={localConfiguration.showInventoryWarehouse}
              onChange={() =>
                handleToggle('showInventoryWarehouse')
              }
            />

            <ConfigurationItem
             title="Supply Chain Performance Trends"
             description="Daily order fulfillment and on-time delivery performance."
             checked={localConfiguration.showSupplyChainTrends}
             onChange={() =>
             handleToggle('showSupplyChainTrends')
             }
            />

            <ConfigurationItem
              title="Recent Orders"
              description="Latest purchase and sales order activity."
              checked={localConfiguration.showRecentOrders}
              onChange={() =>
                handleToggle('showRecentOrders')
              }
            />

            <ConfigurationItem
              title="Alerts & Exceptions"
              description="Critical stock, delayed delivery and pending approval alerts."
              checked={localConfiguration.showAlerts}
              onChange={() => handleToggle('showAlerts')}
            />

            <ConfigurationItem
              title="Activity Stream"
              description="Recent procurement, inventory, shipment and delivery activity."
              checked={localConfiguration.showActivity}
              onChange={() => handleToggle('showActivity')}
            />
          </div>
        </div>

        {/* FOOTER */}
        <div style={modalFooterStyle}>
          <button
            type="button"
            onClick={handleReset}
            style={resetButtonStyle}
          >
            <RotateCcw size={14} />
            Reset
          </button>

          <div style={footerActionsStyle}>
            <button
              type="button"
              onClick={onClose}
              style={secondaryButtonStyle}
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              style={primaryButtonStyle}
            >
              <Check size={15} />
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .erp-config-modal {
            max-width: calc(100vw - 24px) !important;
            max-height: calc(100vh - 24px) !important;
          }

          .erp-config-footer {
            flex-direction: column;
            align-items: stretch !important;
          }

          .erp-config-footer-actions {
            width: 100%;
          }

          .erp-config-footer-actions button {
            flex: 1;
          }
        }
      `}</style>
    </div>
  );
};



interface ConfigurationItemProps {
  title: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}

const ConfigurationItem: React.FC<ConfigurationItemProps> = ({
  title,
  description,
  checked,
  onChange,
}) => {
  return (
    <button
      type="button"
      onClick={onChange}
      aria-pressed={checked}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '18px',
        padding: '15px',
        borderRadius: '10px',
        border: checked
          ? '1px solid rgba(99, 102, 241, 0.35)'
          : '1px solid var(--border-subtle)',
        backgroundColor: checked
          ? 'rgba(99, 102, 241, 0.07)'
          : 'var(--bg-elevated)',
        cursor: 'pointer',
        textAlign: 'left',
        transition:
          'border-color 0.15s ease, background-color 0.15s ease',
      }}
    >
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: '4px',
          }}
        >
          {title}
        </div>

        <div
          style={{
            fontSize: '12px',
            color: 'var(--text-secondary)',
            lineHeight: 1.5,
          }}
        >
          {description}
        </div>
      </div>

      <div
        aria-hidden="true"
        style={{
          width: '42px',
          height: '23px',
          borderRadius: '999px',
          backgroundColor: checked
            ? 'var(--brand-primary)'
            : 'var(--bg-card)',
          border: checked
            ? '1px solid var(--brand-primary)'
            : '1px solid var(--border-subtle)',
          position: 'relative',
          flexShrink: 0,
          transition:
            'background-color 0.2s ease, border-color 0.2s ease',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: '3px',
            left: checked ? '21px' : '3px',
            width: '15px',
            height: '15px',
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
            transition: 'left 0.2s ease',
          }}
        />
      </div>
    </button>
  );
};



const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  zIndex: 2000,
  backgroundColor: 'rgba(2, 6, 23, 0.72)',
  backdropFilter: 'blur(4px)',
  WebkitBackdropFilter: 'blur(4px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
};

const modalStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '540px',
  maxHeight: '90vh',
  overflowY: 'auto',
  backgroundColor: 'var(--bg-card)',
  border: '1px solid var(--border-subtle)',
  borderRadius: 'var(--radius-lg)',
  boxShadow: '0 24px 70px rgba(0, 0, 0, 0.5)',
};

const modalHeaderStyle: React.CSSProperties = {
  padding: '22px 24px',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: '20px',
  borderBottom: '1px solid var(--border-subtle)',
};

const eyebrowStyle: React.CSSProperties = {
  fontSize: '10px',
  fontWeight: 700,
  letterSpacing: '0.1em',
  color: 'var(--text-muted)',
  marginBottom: '7px',
};

const titleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '20px',
  fontWeight: 700,
  fontFamily: 'var(--font-display)',
  color: 'var(--text-primary)',
  letterSpacing: '-0.02em',
};

const descriptionStyle: React.CSSProperties = {
  margin: '6px 0 0',
  fontSize: '13px',
  lineHeight: 1.5,
  color: 'var(--text-secondary)',
};

const closeButtonStyle: React.CSSProperties = {
  width: '34px',
  height: '34px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  borderRadius: '8px',
  border: '1px solid var(--border-subtle)',
  backgroundColor: 'var(--bg-elevated)',
  color: 'var(--text-secondary)',
  cursor: 'pointer',
};

const modalBodyStyle: React.CSSProperties = {
  padding: '22px 24px',
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: 'var(--text-muted)',
  marginBottom: '12px',
};

const sectionListStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '9px',
};

const modalFooterStyle: React.CSSProperties = {
  padding: '16px 24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '12px',
  borderTop: '1px solid var(--border-subtle)',
};

const footerActionsStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '9px',
};

const resetButtonStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '7px',
  padding: '8px 11px',
  border: 'none',
  background: 'transparent',
  color: 'var(--text-secondary)',
  fontSize: '12px',
  fontWeight: 600,
  cursor: 'pointer',
};

const secondaryButtonStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '7px',
  padding: '9px 14px',
  borderRadius: '8px',
  border: '1px solid var(--border-subtle)',
  backgroundColor: 'var(--bg-elevated)',
  color: 'var(--text-secondary)',
  fontSize: '12px',
  fontWeight: 600,
  cursor: 'pointer',
};

const primaryButtonStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '7px',
  padding: '9px 14px',
  borderRadius: '8px',
  border: '1px solid rgba(99, 102, 241, 0.45)',
  backgroundColor: 'rgba(99, 102, 241, 0.18)',
  color: '#a5b4fc',
  fontSize: '12px',
  fontWeight: 600,
  cursor: 'pointer',
};