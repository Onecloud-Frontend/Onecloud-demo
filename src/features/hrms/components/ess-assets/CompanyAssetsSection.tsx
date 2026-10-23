import React, { useState } from 'react';
import {
  Laptop,
  Monitor,
  Smartphone,
  Cpu,
  Layers,
  RotateCcw,
  Wrench,
  Search,
  Plus,
  UserCheck,
  Armchair,
} from 'lucide-react';
import type {
  Asset,
  AssetAssignment,
  Employee,
  EmployeeRequest,
  AssetMaintenance,
} from '../../types';

interface CompanyAssetsSectionProps {
  activeEmployee: Employee;
  assets: Asset[];
  assignments: AssetAssignment[];
  employees: Employee[];
  requests: EmployeeRequest[];
  maintenanceRecords: AssetMaintenance[];
  onAssignAssetClick: (asset: Asset) => void;
  onReturnAssetClick: (asset: Asset) => void;
  onScheduleMaintenanceClick: (initialAssetId?: string) => void;
  onRequestHardwareClick: () => void;
}

type AssetsSubsection =
  | 'overview'
  | 'my-assigned'
  | 'inventory'
  | 'requests'
  | 'returns'
  | 'maintenance';

export const CompanyAssetsSection: React.FC<CompanyAssetsSectionProps> = ({
  activeEmployee,
  assets,
  assignments,
  employees,
  requests,
  maintenanceRecords,
  onAssignAssetClick,
  onReturnAssetClick,
  onScheduleMaintenanceClick,
  onRequestHardwareClick,
}) => {
  const [activeSub, setActiveSub] = useState<AssetsSubsection>('overview');

  // Search & filter state for company-wide inventory
  const [inventorySearch, setInventorySearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // Get active assigned assets for the ACTIVE employee ONLY
  const activeEmployeeAssignments = assignments.filter(
    (asg) => asg.employeeId === activeEmployee.id && !asg.returnDate
  );

  const activeEmployeeAssignedAssets = activeEmployeeAssignments
    .map((asg) => {
      const asset = assets.find((a) => a.id === asg.assetId);
      return asset ? { assignment: asg, asset } : null;
    })
    .filter((item): item is { assignment: AssetAssignment; asset: Asset } => item !== null);

  // Hardware requests belonging to active employee
  const hardwareRequests = requests.filter(
    (r) =>
      r.requestType === 'DEVICE_ACCESS' ||
      r.title.toLowerCase().includes('hardware') ||
      r.title.toLowerCase().includes('laptop') ||
      r.title.toLowerCase().includes('monitor')
  );

  // Overview calculation
  const totalFleetCount = assets.length;
  const assignedCount = assets.filter((a) => a.status === 'ASSIGNED').length;
  const availableCount = assets.filter((a) => a.status === 'AVAILABLE').length;
  const maintenanceCount = assets.filter((a) => a.status === 'UNDER_MAINTENANCE').length;
  const totalValuation = assets.reduce((sum, a) => sum + (a.cost || 0), 0);

  const getAssignee = (assetId: string): Employee | null => {
    const asg = assignments.find((a) => a.assetId === assetId && !a.returnDate);
    if (!asg) return null;
    return employees.find((e) => e.id === asg.employeeId) || null;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'LAPTOP':
        return <Laptop size={16} color="var(--brand-primary)" />;
      case 'MONITOR':
        return <Monitor size={16} color="#38bdf8" />;
      case 'PHONE':
        return <Smartphone size={16} color="#10b981" />;
      case 'FURNITURE':
        return <Armchair size={16} color="#f59e0b" />;
      default:
        return <Cpu size={16} color="#c084fc" />;
    }
  };

  // Filtered Company-Wide inventory (Never filtered by active employee)
  const filteredInventory = assets.filter((a) => {
    const matchesCat = categoryFilter === 'ALL' || a.category === categoryFilter;
    const matchesStatus = statusFilter === 'ALL' || a.status === statusFilter;
    const term = inventorySearch.toLowerCase();
    const matchesSearch =
      a.name.toLowerCase().includes(term) ||
      a.assetTag.toLowerCase().includes(term) ||
      (a.serialNumber && a.serialNumber.toLowerCase().includes(term)) ||
      (a.brand && a.brand.toLowerCase().includes(term)) ||
      (a.model && a.model.toLowerCase().includes(term));
    return matchesCat && matchesStatus && matchesSearch;
  });

  const formatCurrency = (val: number): string => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Sub-navigation bar */}
      <div className="ess-subnav" role="tablist">
        <button
          type="button"
          className={`ess-subnav-btn ${activeSub === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveSub('overview')}
        >
          <Layers size={15} /> Asset Overview
        </button>
        <button
          type="button"
          className={`ess-subnav-btn ${activeSub === 'my-assigned' ? 'active' : ''}`}
          onClick={() => setActiveSub('my-assigned')}
        >
          <UserCheck size={15} /> My Assigned Assets ({activeEmployeeAssignedAssets.length})
        </button>
        <button
          type="button"
          className={`ess-subnav-btn ${activeSub === 'inventory' ? 'active' : ''}`}
          onClick={() => setActiveSub('inventory')}
        >
          <Laptop size={15} /> Company Asset Inventory ({assets.length})
        </button>
        <button
          type="button"
          className={`ess-subnav-btn ${activeSub === 'requests' ? 'active' : ''}`}
          onClick={() => setActiveSub('requests')}
        >
          <Plus size={15} /> Asset Requests ({hardwareRequests.length})
        </button>
        <button
          type="button"
          className={`ess-subnav-btn ${activeSub === 'returns' ? 'active' : ''}`}
          onClick={() => setActiveSub('returns')}
        >
          <RotateCcw size={15} /> Asset Returns
        </button>
        <button
          type="button"
          className={`ess-subnav-btn ${activeSub === 'maintenance' ? 'active' : ''}`}
          onClick={() => setActiveSub('maintenance')}
        >
          <Wrench size={15} /> Maintenance & Repairs ({maintenanceRecords.length})
        </button>
      </div>

      {/* =========================================================================
          SUBSECTION 1: ASSET OVERVIEW
          ========================================================================= */}
      {activeSub === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="ess-metrics-grid">
            <div className="ess-metric-box">
              <span className="ess-metric-title">Total Company Fleet</span>
              <span className="ess-metric-val">{totalFleetCount} Assets</span>
              <span className="ess-metric-sub">Enterprise managed workstations</span>
            </div>
            <div className="ess-metric-box">
              <span className="ess-metric-title">Active In-Service (Assigned)</span>
              <span className="ess-metric-val" style={{ color: '#38bdf8' }}>{assignedCount}</span>
              <span className="ess-metric-sub">Allocated to employee workstations</span>
            </div>
            <div className="ess-metric-box">
              <span className="ess-metric-title">Available in IT Vault</span>
              <span className="ess-metric-val" style={{ color: '#10b981' }}>{availableCount}</span>
              <span className="ess-metric-sub">Ready for immediate issuance</span>
            </div>
            <div className="ess-metric-box">
              <span className="ess-metric-title">In Diagnostic / Repair</span>
              <span className="ess-metric-val" style={{ color: '#f59e0b' }}>{maintenanceCount}</span>
              <span className="ess-metric-sub">Undergoing technical servicing</span>
            </div>
            <div className="ess-metric-box">
              <span className="ess-metric-title">Fleet Capital Valuation</span>
              <span className="ess-metric-val" style={{ color: 'var(--brand-primary)' }}>{formatCurrency(totalValuation)}</span>
              <span className="ess-metric-sub">Hardware capital asset value</span>
            </div>
          </div>

          {/* Quick Active Employee Assigned Hardware Banner */}
          <div className="ess-card">
            <div className="ess-card-header">
              <h4 className="ess-card-title">
                <Laptop size={18} style={{ color: 'var(--brand-primary)' }} />
                Hardware Custody: {activeEmployee.firstName} {activeEmployee.lastName} ({activeEmployee.employeeCode})
              </h4>
              <button
                type="button"
                className="ess-subnav-btn"
                style={{ backgroundColor: 'var(--brand-primary)', color: '#ffffff', fontWeight: 600 }}
                onClick={onRequestHardwareClick}
              >
                <Plus size={15} /> Request Equipment Upgrade
              </button>
            </div>

            {activeEmployeeAssignedAssets.length === 0 ? (
              <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
                No hardware assets currently assigned to {activeEmployee.firstName} {activeEmployee.lastName}.
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '14px' }}>
                {activeEmployeeAssignedAssets.map(({ asset, assignment }) => (
                  <div
                    key={asset.id}
                    style={{
                      padding: '16px',
                      backgroundColor: 'var(--bg-elevated)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div
                          style={{
                            padding: '8px',
                            borderRadius: 'var(--radius-sm)',
                            backgroundColor: 'rgba(99, 102, 241, 0.15)',
                            display: 'flex',
                          }}
                        >
                          {getCategoryIcon(asset.category)}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '14px' }}>
                            {asset.name}
                          </div>
                          <div style={{ fontSize: '11px', color: '#a5b4fc', fontFamily: 'var(--font-mono)' }}>
                            Tag: {asset.assetTag} • S/N: {asset.serialNumber || 'N/A'}
                          </div>
                        </div>
                      </div>
                      <span className="badge-status-pill badge-status-assigned">In Custody</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Assigned Date:</span>
                        <strong style={{ color: 'var(--text-primary)' }}>{assignment.assignedDate}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Issued Condition:</span>
                        <span style={{ color: 'var(--text-secondary)' }}>{assignment.conditionOnAssign}</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '8px', borderTop: '1px solid var(--border-subtle)' }}>
                      <button
                        type="button"
                        className="ess-subnav-btn"
                        style={{ padding: '4px 10px', fontSize: '11.5px', color: '#f59e0b' }}
                        onClick={() => onReturnAssetClick(asset)}
                      >
                        <RotateCcw size={13} /> Initiate Return
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          SUBSECTION 2: MY ASSIGNED ASSETS (Active Employee Only)
          ========================================================================= */}
      {activeSub === 'my-assigned' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>
                Equipment Assigned to {activeEmployee.firstName} {activeEmployee.lastName}
              </h3>
              <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
                Corporate IT devices, monitors, and ergonomic workstations currently under your active custody.
              </p>
            </div>
            <button
              type="button"
              className="ess-subnav-btn"
              style={{ backgroundColor: 'var(--brand-primary)', color: '#ffffff', fontWeight: 600 }}
              onClick={onRequestHardwareClick}
            >
              <Plus size={16} /> Request Device Upgrade
            </button>
          </div>

          {activeEmployeeAssignedAssets.length === 0 ? (
            <div className="ess-card" style={{ textAlign: 'center', padding: '48px 24px', color: 'var(--text-muted)' }}>
              <Laptop size={40} style={{ margin: '0 auto 12px', color: 'var(--text-muted)' }} />
              <h4 style={{ margin: 0, color: 'var(--text-primary)' }}>No Hardware Assets Assigned</h4>
              <p style={{ margin: '6px 0 16px', fontSize: '13px' }}>
                There are no active hardware assignments recorded for employee code {activeEmployee.employeeCode}.
              </p>
              <button
                type="button"
                className="ess-subnav-btn"
                style={{ backgroundColor: 'var(--brand-primary)', color: '#ffffff', margin: '0 auto' }}
                onClick={onRequestHardwareClick}
              >
                Raise Equipment Request
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '16px' }}>
              {activeEmployeeAssignedAssets.map(({ asset, assignment }) => (
                <div
                  key={asset.id}
                  className="ess-card"
                  style={{ justifyContent: 'space-between' }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div
                          style={{
                            padding: '10px',
                            borderRadius: 'var(--radius-md)',
                            backgroundColor: 'rgba(99, 102, 241, 0.12)',
                          }}
                        >
                          {getCategoryIcon(asset.category)}
                        </div>
                        <div>
                          <h4 style={{ margin: 0, fontSize: '15px', color: 'var(--text-primary)', fontWeight: 600 }}>
                            {asset.name}
                          </h4>
                          <span style={{ fontSize: '11px', color: '#a5b4fc', fontFamily: 'var(--font-mono)' }}>
                            Tag: {asset.assetTag} • S/N: {asset.serialNumber || 'N/A'}
                          </span>
                        </div>
                      </div>
                      <span className="badge-status-pill badge-status-assigned">Active</span>
                    </div>

                    <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Brand & Model:</span>
                        <strong style={{ color: 'var(--text-primary)' }}>{asset.brand} {asset.model}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Assigned Date:</span>
                        <strong style={{ color: 'var(--text-primary)' }}>{assignment.assignedDate}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Capital Valuation:</span>
                        <strong style={{ color: '#10b981' }}>{formatCurrency(asset.cost || 0)}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Issuance Condition:</span>
                        <span style={{ color: 'var(--text-secondary)' }}>{assignment.conditionOnAssign}</span>
                      </div>
                      {assignment.notes && (
                        <div style={{ marginTop: '4px', padding: '8px', backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)', fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                          Notes: {assignment.notes}
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button
                      type="button"
                      className="ess-subnav-btn"
                      style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}
                      onClick={() => onScheduleMaintenanceClick(asset.id)}
                    >
                      <Wrench size={13} /> Report Issue
                    </button>
                    <button
                      type="button"
                      className="ess-subnav-btn"
                      style={{ fontSize: '11.5px', color: '#f59e0b', borderColor: 'rgba(245, 158, 11, 0.3)' }}
                      onClick={() => onReturnAssetClick(asset)}
                    >
                      <RotateCcw size={13} /> Return Asset
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          SUBSECTION 3: COMPANY ASSET INVENTORY (Company-wide Catalog)
          ========================================================================= */}
      {activeSub === 'inventory' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>
                Company-Wide Hardware Inventory Catalog
              </h3>
              <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
                Enterprise fleet registry of all corporate laptops, monitors, mobile devices, and office equipment.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                className="ess-subnav-btn"
                style={{ backgroundColor: 'var(--bg-elevated)', color: 'var(--text-primary)' }}
                onClick={() => onScheduleMaintenanceClick()}
              >
                <Wrench size={14} /> Schedule Service
              </button>
            </div>
          </div>

          {/* Filter Bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
              padding: '12px 16px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: '1 1 240px' }}>
              <Search size={16} color="var(--text-muted)" />
              <input
                type="text"
                value={inventorySearch}
                onChange={(e) => setInventorySearch(e.target.value)}
                placeholder="Search tag, model, brand, serial number..."
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-primary)',
                  fontSize: '13px',
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <select
                className="ess-select"
                style={{ width: 'auto', padding: '6px 12px', fontSize: '12px' }}
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="ALL">All Categories</option>
                <option value="LAPTOP">Laptops</option>
                <option value="MONITOR">Monitors</option>
                <option value="PHONE">Phones</option>
                <option value="PERIPHERAL">Peripherals</option>
                <option value="FURNITURE">Furniture</option>
              </select>

              <select
                className="ess-select"
                style={{ width: 'auto', padding: '6px 12px', fontSize: '12px' }}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="ALL">All Statuses</option>
                <option value="AVAILABLE">Available</option>
                <option value="ASSIGNED">Assigned</option>
                <option value="UNDER_MAINTENANCE">Under Maintenance</option>
              </select>
            </div>
          </div>

          {/* Inventory Table */}
          <div className="ess-table-wrap">
            <table className="ess-table">
              <thead>
                <tr>
                  <th>Asset / Tag</th>
                  <th>Category</th>
                  <th>Brand & Model</th>
                  <th>Serial Number</th>
                  <th>Valuation</th>
                  <th>Status</th>
                  <th>Current Allocation</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.length === 0 ? (
                  <tr>
                    <td colSpan={8} style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>
                      No company assets match the specified filters.
                    </td>
                  </tr>
                ) : (
                  filteredInventory.map((ast) => {
                    const assignee = getAssignee(ast.id);
                    return (
                      <tr key={ast.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div
                              style={{
                                padding: '6px',
                                borderRadius: 'var(--radius-sm)',
                                backgroundColor: 'var(--bg-elevated)',
                                display: 'flex',
                              }}
                            >
                              {getCategoryIcon(ast.category)}
                            </div>
                            <div>
                              <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{ast.name}</div>
                              <div style={{ fontSize: '11px', color: '#a5b4fc', fontFamily: 'var(--font-mono)' }}>
                                {ast.assetTag}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>{ast.category}</td>
                        <td>{ast.brand} {ast.model}</td>
                        <td>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-secondary)' }}>
                            {ast.serialNumber || '—'}
                          </span>
                        </td>
                        <td>
                          <strong>{formatCurrency(ast.cost || 0)}</strong>
                        </td>
                        <td>
                          <span
                            className={`badge-status-pill ${
                              ast.status === 'AVAILABLE'
                                ? 'badge-status-available'
                                : ast.status === 'ASSIGNED'
                                ? 'badge-status-assigned'
                                : 'badge-status-maintenance'
                            }`}
                          >
                            {ast.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td>
                          {assignee ? (
                            <span style={{ fontSize: '12px', color: 'var(--text-primary)' }}>
                              {assignee.firstName} {assignee.lastName} ({assignee.employeeCode})
                            </span>
                          ) : (
                            <span style={{ fontSize: '11.5px', color: '#10b981' }}>In IT Storage Vault</span>
                          )}
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: '6px' }}>
                            {ast.status === 'AVAILABLE' && (
                              <button
                                type="button"
                                className="ess-subnav-btn"
                                style={{ padding: '4px 8px', fontSize: '11px', color: 'var(--brand-primary)' }}
                                onClick={() => onAssignAssetClick(ast)}
                              >
                                Assign
                              </button>
                            )}
                            {ast.status === 'ASSIGNED' && (
                              <button
                                type="button"
                                className="ess-subnav-btn"
                                style={{ padding: '4px 8px', fontSize: '11px', color: '#f59e0b' }}
                                onClick={() => onReturnAssetClick(ast)}
                              >
                                Return
                              </button>
                            )}
                            {ast.status !== 'UNDER_MAINTENANCE' && (
                              <button
                                type="button"
                                className="ess-subnav-btn"
                                style={{ padding: '4px 8px', fontSize: '11px', color: 'var(--text-muted)' }}
                                onClick={() => onScheduleMaintenanceClick(ast.id)}
                              >
                                Service
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =========================================================================
          SUBSECTION 4: ASSET REQUESTS
          ========================================================================= */}
      {activeSub === 'requests' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>
                Hardware Allocation & Upgrade Requests
              </h3>
              <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
                Requests submitted by {activeEmployee.firstName} {activeEmployee.lastName} for workstation upgrades, monitors, and peripherals.
              </p>
            </div>
            <button
              type="button"
              className="ess-subnav-btn"
              style={{ backgroundColor: 'var(--brand-primary)', color: '#ffffff', fontWeight: 600 }}
              onClick={onRequestHardwareClick}
            >
              <Plus size={16} /> Request Equipment
            </button>
          </div>

          <div className="ess-table-wrap">
            <table className="ess-table">
              <thead>
                <tr>
                  <th>Request Details</th>
                  <th>Submitted Date</th>
                  <th>Status</th>
                  <th>Assigned IT Specialist</th>
                  <th>Resolution / Allocation Note</th>
                </tr>
              </thead>
              <tbody>
                {hardwareRequests.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>
                      No hardware requests submitted by {activeEmployee.firstName} {activeEmployee.lastName}.
                    </td>
                  </tr>
                ) : (
                  hardwareRequests.map((req) => (
                    <tr key={req.id}>
                      <td>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{req.title}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                          {req.description}
                        </div>
                      </td>
                      <td>{new Date(req.createdAt).toLocaleDateString()}</td>
                      <td>
                        <span
                          className={`badge-status-pill ${
                            req.status === 'RESOLVED'
                              ? 'badge-status-verified'
                              : req.status === 'OPEN'
                              ? 'badge-status-open'
                              : 'badge-status-pending'
                          }`}
                        >
                          {req.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td>{req.assignedTo || 'IT Procurement Queue'}</td>
                      <td>
                        <span style={{ fontSize: '12px', color: req.resolutionNotes ? 'var(--text-secondary)' : 'var(--text-muted)' }}>
                          {req.resolutionNotes || '—'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =========================================================================
          SUBSECTION 5: ASSET RETURNS
          ========================================================================= */}
      {activeSub === 'returns' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="ess-card">
            <h4 className="ess-card-title">
              <RotateCcw size={18} style={{ color: '#f59e0b' }} />
              Active Assignments Eligible for Return Check-in
            </h4>
            <p style={{ margin: '4px 0 16px', fontSize: '13px', color: 'var(--text-secondary)' }}>
              Select an asset below to initiate formal condition verification and check-in back into the IT vault.
            </p>

            <div className="ess-table-wrap">
              <table className="ess-table">
                <thead>
                  <tr>
                    <th>Asset Tag / Model</th>
                    <th>Current Assignee</th>
                    <th>Assigned Date</th>
                    <th>Issuance Condition</th>
                    <th style={{ textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {assignments.filter((asg) => !asg.returnDate).map((asg) => {
                    const ast = assets.find((a) => a.id === asg.assetId);
                    const emp = employees.find((e) => e.id === asg.employeeId);
                    if (!ast) return null;
                    return (
                      <tr key={asg.id}>
                        <td>
                          <div style={{ fontWeight: 600 }}>{ast.name}</div>
                          <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#a5b4fc' }}>
                            {ast.assetTag}
                          </span>
                        </td>
                        <td>
                          {emp ? `${emp.firstName} ${emp.lastName} (${emp.employeeCode})` : asg.employeeId}
                        </td>
                        <td>{asg.assignedDate}</td>
                        <td style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{asg.conditionOnAssign}</td>
                        <td style={{ textAlign: 'right' }}>
                          <button
                            type="button"
                            className="ess-subnav-btn"
                            style={{ padding: '4px 10px', fontSize: '11.5px', color: '#f59e0b' }}
                            onClick={() => onReturnAssetClick(ast)}
                          >
                            <RotateCcw size={13} /> Process Return
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SUBSECTION 6: MAINTENANCE & REPAIR HISTORY
          ========================================================================= */}
      {activeSub === 'maintenance' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>
                Hardware Servicing & Preventive Maintenance History
              </h3>
              <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
                Track battery health checks, thermal cooling servicing, and component repair tickets.
              </p>
            </div>
            <button
              type="button"
              className="ess-subnav-btn"
              style={{ backgroundColor: 'var(--brand-primary)', color: '#ffffff', fontWeight: 600 }}
              onClick={() => onScheduleMaintenanceClick()}
            >
              <Plus size={16} /> Schedule Maintenance
            </button>
          </div>

          <div className="ess-table-wrap">
            <table className="ess-table">
              <thead>
                <tr>
                  <th>Asset Target</th>
                  <th>Maintenance Type</th>
                  <th>Work Description</th>
                  <th>Cost ($ USD)</th>
                  <th>Scheduled Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {maintenanceRecords.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>
                      No maintenance records registered.
                    </td>
                  </tr>
                ) : (
                  maintenanceRecords.map((mnt) => {
                    const ast = assets.find((a) => a.id === mnt.assetId);
                    return (
                      <tr key={mnt.id}>
                        <td>
                          <div style={{ fontWeight: 600 }}>{ast?.name || mnt.assetId}</div>
                          <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#a5b4fc' }}>
                            {ast?.assetTag || 'N/A'}
                          </span>
                        </td>
                        <td>
                          <span
                            style={{
                              fontSize: '11px',
                              fontWeight: 700,
                              fontFamily: 'var(--font-mono)',
                              padding: '2px 6px',
                              borderRadius: '4px',
                              backgroundColor: 'rgba(255, 255, 255, 0.06)',
                              color: 'var(--text-secondary)',
                            }}
                          >
                            {mnt.maintenanceType}
                          </span>
                        </td>
                        <td>
                          <div style={{ fontSize: '13px', maxWidth: '380px' }}>{mnt.description}</div>
                        </td>
                        <td>{mnt.cost ? formatCurrency(mnt.cost) : '—'}</td>
                        <td>{mnt.scheduledDate}</td>
                        <td>
                          <span
                            className={`badge-status-pill ${
                              mnt.status === 'COMPLETED'
                                ? 'badge-status-verified'
                                : mnt.status === 'IN_PROGRESS'
                                ? 'badge-status-maintenance'
                                : 'badge-status-open'
                            }`}
                          >
                            {mnt.status.replace('_', ' ')}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
