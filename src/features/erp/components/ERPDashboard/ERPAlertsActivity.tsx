import React from 'react';

import {
  AlertTriangle,
  AlertCircle,
  Info,
  Clock3,
  PackageCheck,
  Truck,
  ShoppingCart,
  Boxes,
} from 'lucide-react';

import {
  Card,
  Badge,
  EmptyState,
} from '@shared/components';

import type {
  ERPAlert,
  ERPActivity,
} from '@features/erp/types';

interface ERPAlertsActivityProps {
  alerts: ERPAlert[];
  activities: ERPActivity[];
}

export const ERPAlertsActivity: React.FC<
  ERPAlertsActivityProps
> = ({
  alerts,
  activities,
}) => {
  const showAlerts = alerts.length > 0;
  const showActivity = activities.length > 0;

  if (!showAlerts && !showActivity) {
    return null;
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns:
          showAlerts && showActivity
            ? 'minmax(0, 0.9fr) minmax(0, 1.1fr)'
            : 'minmax(0, 1fr)',
        gap: '18px',
      }}
    >
    
      {showAlerts && (
        <Card
          title="Alerts & Exceptions"
          subtitle="Items requiring operational attention"
          badge={
            <Badge variant="warning">
              {alerts.length} Alerts
            </Badge>
          }
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            {alerts.map((alert) => (
              <AlertItem
                key={alert.id}
                alert={alert}
              />
            ))}
          </div>
        </Card>
      )}

    

      {showActivity && (
        <Card
          title="Cross-Module Activity"
          subtitle="Recent supply chain events"
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {activities.map((activity, index) => (
              <ActivityItem
                key={activity.id}
                activity={activity}
                last={index === activities.length - 1}
              />
            ))}
          </div>
        </Card>
      )}

      <div
  className="erp-alerts-activity-grid"
  style={{
    display: 'grid',
    gridTemplateColumns:
      showAlerts && showActivity
        ? 'minmax(0, 0.9fr) minmax(0, 1.1fr)'
        : 'minmax(0, 1fr)',
    gap: '18px',
  }}
></div>
    </div>
  );
};



const AlertItem: React.FC<{
  alert: ERPAlert;
}> = ({ alert }) => {
  const config = {
    critical: {
      color: '#f87171',
      background: 'rgba(239,68,68,0.08)',
      border: 'rgba(239,68,68,0.2)',
      icon: <AlertCircle size={17} />,
    },

    warning: {
      color: '#fbbf24',
      background: 'rgba(245,158,11,0.08)',
      border: 'rgba(245,158,11,0.2)',
      icon: <AlertTriangle size={17} />,
    },

    info: {
      color: '#60a5fa',
      background: 'rgba(59,130,246,0.08)',
      border: 'rgba(59,130,246,0.2)',
      icon: <Info size={17} />,
    },
  }[alert.severity];

  return (
    <div
      style={{
        display: 'flex',
        gap: '11px',
        padding: '12px',
        borderRadius: '10px',
        background: config.background,
        border: `1px solid ${config.border}`,
      }}
    >
      <div
        style={{
          color: config.color,
          marginTop: '1px',
        }}
      >
        {config.icon}
      </div>

      <div style={{ flex: 1 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <span
            style={{
              color: 'var(--text-primary)',
              fontSize: '13px',
              fontWeight: 600,
            }}
          >
            {alert.title}
          </span>

          <Badge
            variant={
              alert.severity === 'critical'
                ? 'warning'
                : 'neutral'
            }
            size="sm"
          >
            {alert.count}
          </Badge>
        </div>

        <div
          style={{
            color: 'var(--text-secondary)',
            fontSize: '11.5px',
            marginTop: '4px',
            lineHeight: 1.5,
          }}
        >
          {alert.description}
        </div>

        <div
          style={{
            color: 'var(--text-muted)',
            fontSize: '10.5px',
            marginTop: '6px',
          }}
        >
          {alert.module}
        </div>
      </div>
    </div>
  );
};



const ActivityItem: React.FC<{
  activity: ERPActivity;
  last: boolean;
}> = ({
  activity,
  last,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        gap: '12px',
        paddingBottom: last ? 0 : '16px',
        marginBottom: last ? 0 : '16px',
        borderBottom: last
          ? 'none'
          : '1px solid var(--border-subtle)',
      }}
    >
      <div
        style={{
          width: '34px',
          height: '34px',
          borderRadius: '9px',
          background: 'var(--bg-elevated)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--brand-primary)',
          flexShrink: 0,
        }}
      >
        <ActivityIcon type={activity.type} />
      </div>

      <div style={{ flex: 1 }}>
        <div
          style={{
            color: 'var(--text-primary)',
            fontSize: '12.5px',
            fontWeight: 600,
          }}
        >
          {activity.title}
        </div>

        <div
          style={{
            color: 'var(--text-secondary)',
            fontSize: '11.5px',
            marginTop: '3px',
          }}
        >
          {activity.description}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            color: 'var(--text-muted)',
            fontSize: '10.5px',
            marginTop: '5px',
          }}
        >
          <Clock3 size={11} />
          {activity.timestamp}
        </div>
      </div>
    </div>
  );
};



const ActivityIcon: React.FC<{
  type: ERPActivity['type'];
}> = ({ type }) => {
  switch (type) {
    case 'purchase_order':
      return <ShoppingCart size={16} />;

    case 'stock_movement':
      return <Boxes size={16} />;

    case 'shipment':
      return <Truck size={16} />;

    case 'delivery':
      return <PackageCheck size={16} />;

    case 'sales_order':
      return <ShoppingCart size={16} />;

    default:
      return <Info size={16} />;
  }
};