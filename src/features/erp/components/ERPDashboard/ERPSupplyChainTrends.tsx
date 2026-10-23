
import React from 'react';
import { TrendingUp } from 'lucide-react';
import { Card, Badge } from '@shared/components';
import type { ERPSupplyChainTrend } from '@features/erp/types/dashboard';

interface ERPSupplyChainTrendsProps {
  trends: ERPSupplyChainTrend[];
}

const CHART_WIDTH = 640;
const CHART_HEIGHT = 230;
const LEFT = 42;
const RIGHT = 14;
const TOP = 18;
const BOTTOM = 32;

const MIN_VALUE = 80;
const MAX_VALUE = 100;

const getX = (index: number, count: number) =>
  LEFT +
  (index * (CHART_WIDTH - LEFT - RIGHT)) /
    Math.max(count - 1, 1);

const getY = (value: number) =>
  TOP +
  ((MAX_VALUE - value) / (MAX_VALUE - MIN_VALUE)) *
    (CHART_HEIGHT - TOP - BOTTOM);

export const ERPSupplyChainTrends: React.FC<
  ERPSupplyChainTrendsProps
> = ({ trends }) => {
  const latestTrend = trends[trends.length - 1];

  const fulfillmentPoints = trends
    .map(
      (item, index) =>
        `${getX(index, trends.length)},${getY(item.fulfillmentRate)}`,
    )
    .join(' ');

  const deliveryPoints = trends
    .map(
      (item, index) =>
        `${getX(index, trends.length)},${getY(item.onTimeDeliveryRate)}`,
    )
    .join(' ');

  return (
    <Card>
      <div
        style={{
          padding: '4px 0',
          color: '#e2e8f0',
        }}
      >
        {/* HEADER */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '12px',
            flexWrap: 'wrap',
            marginBottom: '24px',
          }}
        >
          <div>
            <h3
              style={{
                margin: 0,
                fontSize: '16px',
                fontWeight: 600,
                color: '#edf4ff',
              }}
            >
              Supply Chain Performance Trends
            </h3>

            <p
              style={{
                margin: '7px 0 0',
                fontSize: '12px',
                color: '#64748b',
              }}
            >
              Daily fulfillment and on-time delivery performance
            </p>
          </div>

          <Badge>Last 7 days</Badge>
        </div>

        {!trends.length ? (
          <div
            style={{
              padding: '30px 0',
              textAlign: 'center',
              fontSize: '14px',
              color: '#94a3b8',
            }}
          >
            No performance trend data available.
          </div>
        ) : (
          <>
            {/* CHART LEGEND */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                flexWrap: 'wrap',
                marginBottom: '12px',
                fontSize: '11px',
                color: '#64748b',
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '7px',
                }}
              >
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    background: '#3b82f6',
                  }}
                />
                Order fulfillment
              </span>

              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '7px',
                }}
              >
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    background: '#10b981',
                  }}
                />
                On-time delivery
              </span>
            </div>

            {/* LINE CHART */}
            <div
              style={{
                width: '100%',
                overflowX: 'auto',
              }}
            >
              <svg
                viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
                role="img"
                aria-label="Seven-day comparison of fulfillment and on-time delivery rates"
                style={{
                  display: 'block',
                  width: '100%',
                  minWidth: '320px',
                  height: 'auto',
                  overflow: 'visible',
                }}
              >
                {[80, 85, 90, 95, 100].map((value) => (
                  <g key={value}>
                    <line
                      x1={LEFT}
                      y1={getY(value)}
                      x2={CHART_WIDTH - RIGHT}
                      y2={getY(value)}
                      stroke="#64748b"
                      strokeOpacity="0.7"
                      strokeDasharray="4 4"
                    />

                    <text
                      x={LEFT - 9}
                      y={getY(value) + 4}
                      textAnchor="end"
                      fontSize="11"
                      fill="#64748b"
                    >
                      {value}%
                    </text>
                  </g>
                ))}

                <polyline
                  points={fulfillmentPoints}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <polyline
                  points={deliveryPoints}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {trends.map((item, index) => (
                  <g key={`${item.day}-${index}`}>
                    <circle
                      cx={getX(index, trends.length)}
                      cy={getY(item.fulfillmentRate)}
                      r="4"
                      fill="#3b82f6"
                    >
                      <title>
                        {item.day}: Fulfillment {item.fulfillmentRate}%
                      </title>
                    </circle>

                    <circle
                      cx={getX(index, trends.length)}
                      cy={getY(item.onTimeDeliveryRate)}
                      r="4"
                      fill="#10b981"
                    >
                      <title>
                        {item.day}: On-time delivery{' '}
                        {item.onTimeDeliveryRate}%
                      </title>
                    </circle>

                    <text
                      x={getX(index, trends.length)}
                      y={CHART_HEIGHT - 8}
                      textAnchor="middle"
                      fontSize="11"
                      fill="#64748b"
                    >
                      {item.day}
                    </text>
                  </g>
                ))}
              </svg>
            </div>

      
{/* SUMMARY CARDS */}
<div
  className="erp-trend-summary"
  style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '14px',
    marginTop: '18px',
    width: '100%',
  }}
>
  {/* FULFILLMENT CARD */}
  <div className="erp-trend-summary-card fulfillment-card">
    <div className="erp-trend-card-top">
      <div className="erp-trend-icon erp-trend-icon-blue">
        <TrendingUp size={24} strokeWidth={2.3} />
      </div>

      <span className="erp-trend-category">
        ORDER FULFILLMENT
      </span>

      <span className="erp-trend-dot blue-dot" />
    </div>

    <div className="erp-trend-main">
      <div className="erp-trend-label">
        Latest fulfillment rate
      </div>

      <div className="erp-trend-value-row">
        <span className="erp-trend-value">
          {latestTrend.fulfillmentRate}%
        </span>

        <span className="erp-trend-status">
          Fulfillment
        </span>
      </div>
    </div>

    <div className="erp-trend-progress-track">
      <div
        className="erp-trend-progress-fill fulfillment-fill"
        style={{
          width: `${Math.min(
            100,
            Math.max(0, latestTrend.fulfillmentRate),
          )}%`,
        }}
      />
    </div>

    <div className="erp-trend-card-footer">
      <span>Current reporting period</span>
      <span>{latestTrend.day}</span>
    </div>
  </div>

  {/* ON-TIME DELIVERY CARD */}
  <div className="erp-trend-summary-card delivery-card">
    <div className="erp-trend-card-top">
      <div className="erp-trend-icon erp-trend-icon-green">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      </div>

      <span className="erp-trend-category">
        DELIVERY PERFORMANCE
      </span>

      <span className="erp-trend-dot green-dot" />
    </div>

    <div className="erp-trend-main">
      <div className="erp-trend-label">
        Latest on-time delivery
      </div>

      <div className="erp-trend-value-row">
        <span className="erp-trend-value">
          {latestTrend.onTimeDeliveryRate}%
        </span>

        <span className="erp-trend-status">
          On-time
        </span>
      </div>
    </div>

    <div className="erp-trend-progress-track">
      <div
        className="erp-trend-progress-fill delivery-fill"
        style={{
          width: `${Math.min(
            100,
            Math.max(0, latestTrend.onTimeDeliveryRate),
          )}%`,
        }}
      />
    </div>

    <div className="erp-trend-card-footer">
      <span>Current reporting period</span>
      <span>{latestTrend.day}</span>
    </div>
  </div>
</div>


          </>
        )}
      </div>

      <style>
        {`
          

.erp-trend-summary-card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
  min-width: 0;
  padding: 20px 22px 16px;
  border: 1px solid #263650;
  border-radius: 14px;
  background: linear-gradient(145deg, #142138 0%, #101b2e 100%);
  box-sizing: border-box;
  overflow: hidden;
  transition:
    border-color 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.erp-trend-summary-card:hover {
  border-color: #3a4e6b;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.fulfillment-card::before,
.delivery-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
}

.fulfillment-card::before {
  background: linear-gradient(90deg, #3b82f6, transparent 75%);
}

.delivery-card::before {
  background: linear-gradient(90deg, #10b981, transparent 75%);
}

.erp-trend-card-top {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.erp-trend-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  min-width: 44px;
  border-radius: 12px;
}

.erp-trend-icon-blue {
  color: #60a5fa;
  background: rgba(59, 130, 246, 0.15);
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.erp-trend-icon-green {
  color: #34d399;
  background: rgba(16, 185, 129, 0.13);
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.erp-trend-category {
  flex: 1;
  min-width: 0;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.07em;
  line-height: 1.5;
  color: #8094b2;
}

.erp-trend-dot {
  width: 7px;
  height: 7px;
  min-width: 7px;
  border-radius: 50%;
}

.blue-dot {
  background: #3b82f6;
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.4);
}

.green-dot {
  background: #10b981;
  box-shadow: 0 0 10px rgba(16, 185, 129, 0.4);
}

.erp-trend-main {
  min-width: 0;
}

.erp-trend-label {
  margin-bottom: 5px;
  font-size: 12px;
  line-height: 1.5;
  color: #94a9c8;
}

.erp-trend-value-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.erp-trend-value {
  font-size: 34px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -1px;
  color: #edf4ff;
  font-variant-numeric: tabular-nums;
}

.erp-trend-status {
  padding: 5px 9px;
  border-radius: 6px;
  font-size: 10px;
  font-weight: 600;
  color: #a7b8d2;
  background: rgba(148, 163, 184, 0.08);
  border: 1px solid rgba(148, 163, 184, 0.12);
}

.erp-trend-progress-track {
  width: 100%;
  height: 5px;
  overflow: hidden;
  border-radius: 999px;
  background: #26344a;
}

.erp-trend-progress-fill {
  height: 100%;
  border-radius: inherit;
  transition: width 0.4s ease;
}

.fulfillment-fill {
  background: linear-gradient(90deg, #2563eb, #60a5fa);
}

.delivery-fill {
  background: linear-gradient(90deg, #059669, #34d399);
}

.erp-trend-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 11px;
  color: #7185a3;
}

@media (max-width: 600px) {
  .erp-trend-summary {
    grid-template-columns: minmax(0, 1fr) !important;
  }

  .erp-trend-summary-card {
    padding: 18px;
  }

  .erp-trend-value {
    font-size: 30px;
  }
}
        `}
      </style>
    </Card>
  );
};
