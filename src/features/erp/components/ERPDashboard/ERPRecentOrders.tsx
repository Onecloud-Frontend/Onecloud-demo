import React, { useMemo, useState } from 'react';
import {ArrowUpRight,ArrowDownLeft,ExternalLink,Search,
  X,
  Filter,
  ShoppingCart,
} from 'lucide-react';

import {
  Card,
  Badge,
  EmptyState,
} from '@shared/components';

import type {
  ERPRecentOrder,
} from '@features/erp/types';

interface ERPRecentOrdersProps {
  orders: ERPRecentOrder[];
}

type OrderTypeFilter = 'ALL' | 'PURCHASE' | 'SALES';

type OrderStatusFilter =
  | 'ALL'
  | ERPRecentOrder['status'];

export const ERPRecentOrders: React.FC<
  ERPRecentOrdersProps
> = ({ orders }) => {
  const [isViewAllOpen, setIsViewAllOpen] =
    useState(false);

  return (
    <>
      <Card
        title="Recent Orders"
        subtitle="Latest procurement and sales activity"
        action={
          <button
            type="button"
            onClick={() => setIsViewAllOpen(true)}
            style={linkButtonStyle}
          >
            View all
            <ExternalLink size={13} />
          </button>
        }
        className="erp-orders-card"
      >
        <div
          style={{
            width: '100%',
            overflowX: 'auto',
          }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              minWidth: '700px',
            }}
          >
            <thead>
              <tr>
                <TableHeader>Order</TableHeader>
                <TableHeader>Type</TableHeader>
                <TableHeader>Party</TableHeader>
                <TableHeader>Warehouse</TableHeader>
                <TableHeader>Amount</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Date</TableHeader>
              </tr>
            </thead>

            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <OrderTableRow
                    key={order.id}
                    order={order}
                  />
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    style={{
                      padding: '30px',
                      textAlign: 'center',
                      color: 'var(--text-muted)',
                      fontSize: '12px',
                    }}
                  >
                    No recent orders available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {isViewAllOpen && (
        <AllOrdersModal
          orders={orders}
          onClose={() => setIsViewAllOpen(false)}
        />
      )}
    </>
  );
};



const OrderTableRow: React.FC<{
  order: ERPRecentOrder;
}> = ({ order }) => {
  return (
    <tr>
      <TableCell>
        <span
          style={{
            color: 'var(--text-primary)',
            fontWeight: 600,
          }}
        >
          {order.orderNumber}
        </span>
      </TableCell>

      <TableCell>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          {order.type === 'PURCHASE' ? (
            <ArrowDownLeft
              size={14}
              color="#818cf8"
            />
          ) : (
            <ArrowUpRight
              size={14}
              color="#34d399"
            />
          )}

          <span>
            {order.type === 'PURCHASE'
              ? 'Purchase'
              : 'Sales'}
          </span>
        </div>
      </TableCell>

      <TableCell>
        {order.partyName}
      </TableCell>

      <TableCell>
        {order.warehouse}
      </TableCell>

      <TableCell>
        ₹{order.amount.toLocaleString('en-IN')}
      </TableCell>

      <TableCell>
        <OrderStatusBadge
          status={order.status}
        />
      </TableCell>

      <TableCell>
        {formatDate(order.date)}
      </TableCell>
    </tr>
  );
};



interface AllOrdersModalProps {
  orders: ERPRecentOrder[];
  onClose: () => void;
}

const AllOrdersModal: React.FC<
  AllOrdersModalProps
> = ({
  orders,
  onClose,
}) => {
  const [search, setSearch] = useState('');

  const [typeFilter, setTypeFilter] =
    useState<OrderTypeFilter>('ALL');

  const [statusFilter, setStatusFilter] =
    useState<OrderStatusFilter>('ALL');

  const filteredOrders = useMemo(() => {
    const searchValue =
      search.trim().toLowerCase();

    return orders.filter((order) => {
      const matchesType =
        typeFilter === 'ALL' ||
        order.type === typeFilter;

      const matchesStatus =
        statusFilter === 'ALL' ||
        order.status === statusFilter;

      const matchesSearch =
        searchValue === '' ||
        order.orderNumber
          .toLowerCase()
          .includes(searchValue) ||
        order.partyName
          .toLowerCase()
          .includes(searchValue) ||
        order.warehouse
          .toLowerCase()
          .includes(searchValue) ||
        order.id
          .toLowerCase()
          .includes(searchValue);

      return (
        matchesType &&
        matchesStatus &&
        matchesSearch
      );
    });
  }, [
    orders,
    search,
    typeFilter,
    statusFilter,
  ]);

  const clearFilters = () => {
    setSearch('');
    setTypeFilter('ALL');
    setStatusFilter('ALL');
  };

  const hasActiveFilters =
    search !== '' ||
    typeFilter !== 'ALL' ||
    statusFilter !== 'ALL';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="erp-all-orders-title"
      style={modalOverlayStyle}
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <div style={modalStyle}>

        <div style={modalHeaderStyle}>
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '9px',
              }}
            >
              <div style={modalIconStyle}>
                <ShoppingCart size={17} />
              </div>

              <h2
                id="erp-all-orders-title"
                style={{
                  margin: 0,
                  color: 'var(--text-primary)',
                  fontSize: '17px',
                  fontWeight: 700,
                }}
              >
                All Orders
              </h2>
            </div>

            <p
              style={{
                margin:
                  '6px 0 0 41px',
                color: 'var(--text-muted)',
                fontSize: '11.5px',
              }}
            >
              Complete procurement and sales
              order overview
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close orders"
            style={closeButtonStyle}
          >
            <X size={18} />
          </button>
        </div>


        <div style={filterAreaStyle}>
          {/* Search */}
          <div style={searchWrapperStyle}>
            <Search size={15} />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search order, party or warehouse..."
              style={searchInputStyle}
            />
          </div>

          {/* Type Filter */}
          <div style={filterGroupStyle}>
            <Filter
              size={14}
              color="var(--text-muted)"
            />

            <FilterButton
              active={
                typeFilter === 'ALL'
              }
              onClick={() =>
                setTypeFilter('ALL')
              }
            >
              All
            </FilterButton>

            <FilterButton
              active={
                typeFilter === 'PURCHASE'
              }
              onClick={() =>
                setTypeFilter('PURCHASE')
              }
            >
              Purchase
            </FilterButton>

            <FilterButton
              active={
                typeFilter === 'SALES'
              }
              onClick={() =>
                setTypeFilter('SALES')
              }
            >
              Sales
            </FilterButton>
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(
                event.target
                  .value as OrderStatusFilter,
              )
            }
            style={selectStyle}
            aria-label="Filter orders by status"
          >
            <option value="ALL">
              All Statuses
            </option>

            <option value="PENDING">
              Pending
            </option>

            <option value="APPROVED">
              Approved
            </option>

            <option value="PROCESSING">
              Processing
            </option>

            <option value="RECEIVED">
              Received
            </option>

            <option value="SHIPPED">
              Shipped
            </option>

            <option value="DELIVERED">
              Delivered
            </option>

            <option value="CANCELLED">
              Cancelled
            </option>
          </select>
        </div>

        <div style={summaryStyle}>
          <span>
            Showing{' '}
            <strong
              style={{
                color:
                  'var(--text-primary)',
              }}
            >
              {filteredOrders.length}
            </strong>{' '}
            of{' '}
            <strong
              style={{
                color:
                  'var(--text-primary)',
              }}
            >
              {orders.length}
            </strong>{' '}
            orders
          </span>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              style={clearFilterButtonStyle}
            >
              Clear filters
            </button>
          )}
        </div>


        <div style={modalTableWrapperStyle}>
          {filteredOrders.length === 0 ? (
            <div
              style={{
                padding: '30px 0',
              }}
            >
              <EmptyState
                icon={<Search size={28} />}
                title="No Orders Found"
                description="Try changing your search or filter criteria."
                actionLabel={
                  hasActiveFilters
                    ? 'Clear Filters'
                    : undefined
                }
                onAction={
                  hasActiveFilters
                    ? clearFilters
                    : undefined
                }
              />
            </div>
          ) : (
            <div
              style={{
                width: '100%',
                overflowX: 'auto',
              }}
            >
              <table
                style={{
                  width: '100%',
                  minWidth: '900px',
                  borderCollapse:
                    'collapse',
                }}
              >
                <thead>
                  <tr>
                    <TableHeader>
                      Order
                    </TableHeader>

                    <TableHeader>
                      Type
                    </TableHeader>

                    <TableHeader>
                      Party
                    </TableHeader>

                    <TableHeader>
                      Warehouse
                    </TableHeader>

                    <TableHeader>
                      Amount
                    </TableHeader>

                    <TableHeader>
                      Status
                    </TableHeader>

                    <TableHeader>
                      Date
                    </TableHeader>
                  </tr>
                </thead>

                <tbody>
                  {filteredOrders.map(
                    (order) => (
                      <OrderTableRow
                        key={order.id}
                        order={order}
                      />
                    ),
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>


        <div style={modalFooterStyle}>
          <button
            type="button"
            onClick={onClose}
            style={secondaryButtonStyle}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};


const FilterButton: React.FC<{
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({
  active,
  onClick,
  children,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        ...filterButtonStyle,
        ...(active
          ? activeFilterButtonStyle
          : {}),
      }}
    >
      {children}
    </button>
  );
};


const TableHeader: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => (
  <th
    style={{
      textAlign: 'left',
      padding: '10px 12px',
      borderBottom:
        '1px solid var(--border-subtle)',
      color: 'var(--text-muted)',
      fontSize: '11px',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      whiteSpace: 'nowrap',
    }}
  >
    {children}
  </th>
);

const TableCell: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => (
  <td
    style={{
      padding: '13px 12px',
      borderBottom:
        '1px solid var(--border-subtle)',
      color: 'var(--text-secondary)',
      fontSize: '12.5px',
      whiteSpace: 'nowrap',
    }}
  >
    {children}
  </td>
);



const OrderStatusBadge: React.FC<{
  status: ERPRecentOrder['status'];
}> = ({ status }) => {
  const variant =
    status === 'APPROVED' ||
    status === 'RECEIVED' ||
    status === 'DELIVERED'
      ? 'success'
      : status === 'PENDING'
        ? 'warning'
        : 'neutral';

  return (
    <Badge
      variant={variant}
      size="sm"
    >
      {status}
    </Badge>
  );
};



const formatDate = (date: string) =>
  new Date(date).toLocaleDateString(
    'en-IN',
    {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    },
  );



const linkButtonStyle: React.CSSProperties = {
  border: 'none',
  background: 'transparent',
  color: 'var(--brand-primary)',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  fontSize: '12px',
  fontWeight: 600,
};

const modalOverlayStyle: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  zIndex: 1000,
  background:
    'rgba(2, 6, 23, 0.72)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
};

const modalStyle: React.CSSProperties = {
  width: 'min(1180px, 100%)',
  maxHeight:
    'calc(100vh - 40px)',
  display: 'flex',
  flexDirection: 'column',
  background: 'var(--bg-card)',
  border:
    '1px solid var(--border-subtle)',
  borderRadius: '14px',
  boxShadow:
    '0 24px 80px rgba(0, 0, 0, 0.45)',
  overflow: 'hidden',
};

const modalHeaderStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: '20px',
  padding: '20px 22px',
  borderBottom:
    '1px solid var(--border-subtle)',
};

const modalIconStyle: React.CSSProperties = {
  width: '32px',
  height: '32px',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background:
    'rgba(59, 130, 246, 0.12)',
  color: 'var(--brand-primary)',
};

const closeButtonStyle: React.CSSProperties = {
  width: '32px',
  height: '32px',
  borderRadius: '7px',
  border:
    '1px solid var(--border-subtle)',
  background: 'var(--bg-elevated)',
  color: 'var(--text-secondary)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
};

const filterAreaStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  flexWrap: 'wrap',
  padding: '14px 22px',
  borderBottom:
    '1px solid var(--border-subtle)',
  background: 'var(--bg-elevated)',
};

const searchWrapperStyle: React.CSSProperties = {
  minWidth: '260px',
  flex: 1,
  maxWidth: '390px',
  height: '36px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '0 11px',
  borderRadius: '7px',
  border:
    '1px solid var(--border-subtle)',
  background: 'var(--bg-card)',
  color: 'var(--text-muted)',
};

const searchInputStyle: React.CSSProperties = {
  width: '100%',
  border: 'none',
  outline: 'none',
  background: 'transparent',
  color: 'var(--text-primary)',
  fontSize: '11.5px',
};

const filterGroupStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
};

const filterButtonStyle: React.CSSProperties = {
  height: '32px',
  padding: '0 10px',
  borderRadius: '6px',
  border: '1px solid transparent',
  background: 'transparent',
  color: 'var(--text-muted)',
  fontSize: '11px',
  fontWeight: 600,
  cursor: 'pointer',
};

const activeFilterButtonStyle: React.CSSProperties = {
  background:
    'rgba(59, 130, 246, 0.12)',
  borderColor:
    'rgba(59, 130, 246, 0.22)',
  color: 'var(--brand-primary)',
};

const selectStyle: React.CSSProperties = {
  height: '36px',
  padding: '0 10px',
  borderRadius: '7px',
  border:
    '1px solid var(--border-subtle)',
  background: 'var(--bg-card)',
  color: 'var(--text-secondary)',
  fontSize: '11px',
  outline: 'none',
};

const summaryStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '12px',
  padding: '10px 22px',
  color: 'var(--text-muted)',
  fontSize: '10.5px',
};

const clearFilterButtonStyle: React.CSSProperties = {
  border: 'none',
  background: 'transparent',
  color: 'var(--brand-primary)',
  fontSize: '10.5px',
  fontWeight: 600,
  cursor: 'pointer',
};

const modalTableWrapperStyle: React.CSSProperties = {
  flex: 1,
  minHeight: '250px',
  overflow: 'auto',
  padding: '0 22px',
};

const modalFooterStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-end',
  padding: '14px 22px',
  borderTop:
    '1px solid var(--border-subtle)',
};

const secondaryButtonStyle: React.CSSProperties = {
  height: '34px',
  padding: '0 14px',
  borderRadius: '7px',
  border:
    '1px solid var(--border-subtle)',
  background: 'var(--bg-elevated)',
  color: 'var(--text-secondary)',
  fontSize: '11px',
  fontWeight: 600,
  cursor: 'pointer',
};
