import React, { useState } from 'react';
import { X, RotateCcw } from 'lucide-react';
import type { Asset, AssetAssignment, ReturnAssetPayload } from '../../types';

interface AssetReturnModalProps {
  isOpen: boolean;
  onClose: () => void;
  asset: Asset | null;
  assignments: AssetAssignment[];
  onReturn: (payload: ReturnAssetPayload) => Promise<void> | void;
}

export const AssetReturnModal: React.FC<AssetReturnModalProps> = ({
  isOpen,
  onClose,
  asset,
  assignments,
  onReturn,
}) => {
  const [condition, setCondition] = useState('Pristine / Excellent condition with minor normal wear');
  const [notes, setNotes] = useState('Wiped corporate profile credentials; hardware diagnostics passed.');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen || !asset) return null;

  const activeAssignment = assignments.find((a) => a.assetId === asset.id && !a.returnDate);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeAssignment || submitting) return;

    setSubmitting(true);
    try {
      await onReturn({
        assignmentId: activeAssignment.id,
        conditionOnReturn: condition,
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
            <h3 className="ess-modal-title">Process Asset Return</h3>
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
            {activeAssignment && (
              <div
                style={{
                  padding: '12px 16px',
                  backgroundColor: 'var(--bg-elevated)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '12.5px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Assigned Date: </span>
                  <strong style={{ color: 'var(--text-primary)' }}>{activeAssignment.assignedDate}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Initial Issuance Condition: </span>
                  <strong style={{ color: 'var(--text-primary)' }}>{activeAssignment.conditionOnAssign}</strong>
                </div>
              </div>
            )}

            <div className="ess-field-group">
              <label className="ess-field-label">Condition Verified on Return *</label>
              <select
                className="ess-select"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                required
              >
                <option value="Pristine / Excellent condition with minor normal wear">
                  Pristine / Excellent condition with minor normal wear
                </option>
                <option value="Good condition, normal wear and tear">
                  Good condition, normal wear and tear
                </option>
                <option value="Fair condition, minor scuffs or battery degradation">
                  Fair condition, minor scuffs or battery degradation
                </option>
                <option value="Damaged / Needs hardware repair before re-issuance">
                  Damaged / Needs hardware repair before re-issuance
                </option>
              </select>
            </div>

            <div className="ess-field-group">
              <label className="ess-field-label">Check-in Notes & IT Inspection Remarks</label>
              <textarea
                className="ess-textarea"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Diagnostic pass status, accessories returned, or inspection notes."
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
                backgroundColor: 'var(--status-success)',
                color: '#ffffff',
                fontWeight: 600,
              }}
              disabled={submitting || !activeAssignment}
            >
              <RotateCcw size={16} />
              {submitting ? 'Processing Return...' : 'Accept Return & Release Asset'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
