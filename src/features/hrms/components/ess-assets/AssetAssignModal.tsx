import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import type { Asset, Employee, AssignAssetPayload } from '../../types';

interface AssetAssignModalProps {
  isOpen: boolean;
  onClose: () => void;
  asset: Asset | null;
  employees: Employee[];
  onAssign: (payload: AssignAssetPayload) => Promise<void> | void;
}

export const AssetAssignModal: React.FC<AssetAssignModalProps> = ({
  isOpen,
  onClose,
  asset,
  employees,
  onAssign,
}) => {
  const [employeeId, setEmployeeId] = useState(employees[0]?.id || '');
  const [condition, setCondition] = useState('Brand new sealed in box, perfect screen and chassis');
  const [notes, setNotes] = useState('Issued with standard OEM power adapter and USB-C cable');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (employees.length > 0 && !employeeId) {
      setEmployeeId(employees[0].id);
    }
  }, [employees, employeeId]);

  if (!isOpen || !asset) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!employeeId || submitting) return;

    setSubmitting(true);
    try {
      await onAssign({
        assetId: asset.id,
        employeeId,
        conditionOnAssign: condition,
        notes,
      });
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="ess-modal-backdrop" onClick={onClose}>
      <div className="ess-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="ess-modal-header">
          <div>
            <h3 className="ess-modal-title">Assign Corporate Asset</h3>
            <p className="ess-modal-subtitle">
              {asset.name} • Tag: {asset.assetTag}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="ess-modal-body">
            <div className="ess-field-group">
              <label className="ess-field-label">Target Beneficiary Employee *</label>
              <select
                className="ess-select"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                required
              >
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.firstName} {emp.lastName} ({emp.employeeCode}) — {emp.designation}
                  </option>
                ))}
              </select>
            </div>

            <div className="ess-field-group">
              <label className="ess-field-label">Condition at Time of Issuance *</label>
              <input
                className="ess-input"
                type="text"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                placeholder="e.g. Pristine condition with zero physical blemishes"
                required
              />
            </div>

            <div className="ess-field-group">
              <label className="ess-field-label">Allocation Notes & Accessories Included</label>
              <textarea
                className="ess-textarea"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="List chargers, dongles, monitor cables, or special authorizations."
              />
            </div>
          </div>

          <div className="ess-modal-footer">
            <button
              type="button"
              className="ess-subnav-btn"
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ess-subnav-btn"
              style={{
                backgroundColor: 'var(--brand-primary)',
                color: '#ffffff',
                fontWeight: 600,
              }}
              disabled={submitting}
            >
              <Check size={16} />
              {submitting ? 'Assigning...' : 'Confirm Assignment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
