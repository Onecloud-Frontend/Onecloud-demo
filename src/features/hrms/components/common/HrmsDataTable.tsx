import React, { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight, Filter, Inbox } from 'lucide-react';

export interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  width?: string;
  sortable?: boolean;
}

export interface FilterOption {
  label: string;
  value: string;
}

interface HrmsDataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string;
  searchPlaceholder?: string;
  searchFilter?: (item: T, query: string) => boolean;
  filterOptions?: FilterOption[];
  filterValue?: string;
  onFilterChange?: (val: string) => void;
  filterKey?: keyof T;
  actionsSlot?: React.ReactNode;
  defaultPageSize?: number;
  emptyMessage?: string;
  onRowClick?: (item: T) => void;
}

export function HrmsDataTable<T>({
  data,
  columns,
  keyExtractor,
  searchPlaceholder = 'Search records...',
  searchFilter,
  filterOptions,
  filterValue: externalFilterValue,
  onFilterChange: externalOnFilterChange,
  filterKey,
  actionsSlot,
  defaultPageSize = 8,
  emptyMessage = 'No matching records found',
  onRowClick,
}: HrmsDataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [internalFilter, setInternalFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const currentFilter = externalFilterValue !== undefined ? externalFilterValue : internalFilter;
  const handleFilterChange = (val: string) => {
    if (externalOnFilterChange) {
      externalOnFilterChange(val);
    } else {
      setInternalFilter(val);
    }
    setCurrentPage(1);
  };

  // Filtered & Sorted items
  const processedData = useMemo(() => {
    let result = [...data];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      if (searchFilter) {
        result = result.filter((item) => searchFilter(item, q));
      } else {
        result = result.filter((item) => {
          return Object.values(item as Record<string, unknown>).some((val) => {
            if (val === null || val === undefined) return false;
            return String(val).toLowerCase().includes(q);
          });
        });
      }
    }

    // Category / status dropdown filter
    if (currentFilter && currentFilter !== 'ALL' && filterKey) {
      result = result.filter((item) => String(item[filterKey]) === currentFilter);
    }

    // Sorting
    if (sortKey) {
      result.sort((a, b) => {
        const valA = (a as Record<string, unknown>)[sortKey];
        const valB = (b as Record<string, unknown>)[sortKey];
        if (valA === valB) return 0;
        if (valA === null || valA === undefined) return 1;
        if (valB === null || valB === undefined) return -1;
        const comp = String(valA).localeCompare(String(valB), undefined, { numeric: true });
        return sortDirection === 'asc' ? comp : -comp;
      });
    }

    return result;
  }, [data, searchQuery, searchFilter, currentFilter, filterKey, sortKey, sortDirection]);

  // Pagination calculation
  const totalItems = processedData.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const paginatedData = processedData.slice(startIndex, startIndex + pageSize);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top Filter & Actions Header */}
      <div
        style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'rgba(15, 23, 42, 0.4)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '280px' }}>
          {/* Search Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'var(--bg-input)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '7px 12px',
              gap: '8px',
              width: '100%',
              maxWidth: '360px',
            }}
          >
            <Search size={16} color="var(--text-muted)" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={searchPlaceholder}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-primary)',
                fontSize: '13px',
                outline: 'none',
                width: '100%',
              }}
            />
          </div>

          {/* Filter Dropdown */}
          {filterOptions && filterOptions.length > 0 && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'var(--bg-input)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '6px 10px',
                gap: '6px',
              }}
            >
              <Filter size={14} color="var(--text-muted)" />
              <select
                value={currentFilter}
                onChange={(e) => handleFilterChange(e.target.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-primary)',
                  fontSize: '13px',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                <option value="ALL" style={{ background: '#0f172a', color: '#fff' }}>
                  All Statuses
                </option>
                {filterOptions.map((opt) => (
                  <option key={opt.value} value={opt.value} style={{ background: '#0f172a', color: '#fff' }}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Action Buttons Slot */}
        {actionsSlot && <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>{actionsSlot}</div>}
      </div>

      {/* Responsive Table Container */}
      <div style={{ overflowX: 'auto', width: '100%' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: 'rgba(30, 41, 59, 0.4)', borderBottom: '1px solid var(--border-subtle)' }}>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable !== false && handleSort(col.key)}
                  style={{
                    padding: '12px 18px',
                    color: 'var(--text-secondary)',
                    fontWeight: 600,
                    fontSize: '12px',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    cursor: col.sortable !== false ? 'pointer' : 'default',
                    userSelect: 'none',
                    width: col.width,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {col.header}
                    {sortKey === col.key && (
                      <span style={{ fontSize: '10px', color: 'var(--brand-primary)' }}>
                        {sortDirection === 'asc' ? '▲' : '▼'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} style={{ padding: '48px 20px', textAlign: 'center' }}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '12px',
                      color: 'var(--text-muted)',
                    }}
                  >
                    <Inbox size={36} strokeWidth={1.5} />
                    <p style={{ fontSize: '14px', margin: 0 }}>{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedData.map((item) => (
                <tr
                  key={keyExtractor(item)}
                  onClick={() => onRowClick && onRowClick(item)}
                  style={{
                    borderBottom: '1px solid var(--border-subtle)',
                    transition: 'background-color 150ms ease',
                    cursor: onRowClick ? 'pointer' : 'default',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--bg-card-hover)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {columns.map((col) => (
                    <td key={col.key} style={{ padding: '14px 18px', color: 'var(--text-primary)' }}>
                      {col.render ? col.render(item) : String((item as Record<string, unknown>)[col.key] ?? '')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div
        style={{
          padding: '14px 20px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '12px',
          color: 'var(--text-muted)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            style={{
              backgroundColor: 'var(--bg-input)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-primary)',
              padding: '3px 6px',
              fontSize: '12px',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            {[5, 8, 12, 20, 50].map((s) => (
              <option key={s} value={s} style={{ background: '#0f172a' }}>
                {s}
              </option>
            ))}
          </select>
          <span>
            Showing {totalItems === 0 ? 0 : startIndex + 1}–{Math.min(startIndex + pageSize, totalItems)} of {totalItems}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={safeCurrentPage <= 1}
            style={{
              padding: '5px 10px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              backgroundColor: safeCurrentPage <= 1 ? 'transparent' : 'var(--bg-elevated)',
              color: safeCurrentPage <= 1 ? 'var(--text-muted)' : 'var(--text-primary)',
              cursor: safeCurrentPage <= 1 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              opacity: safeCurrentPage <= 1 ? 0.5 : 1,
            }}
          >
            <ChevronLeft size={14} /> Prev
          </button>

          <span style={{ margin: '0 8px', color: 'var(--text-secondary)' }}>
            Page {safeCurrentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={safeCurrentPage >= totalPages}
            style={{
              padding: '5px 10px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              backgroundColor: safeCurrentPage >= totalPages ? 'transparent' : 'var(--bg-elevated)',
              color: safeCurrentPage >= totalPages ? 'var(--text-muted)' : 'var(--text-primary)',
              cursor: safeCurrentPage >= totalPages ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              opacity: safeCurrentPage >= totalPages ? 0.5 : 1,
            }}
          >
            Next <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
