import React, { useState, useEffect } from 'react';
import { X, Wrench } from 'lucide-react';
import type { Asset, ScheduleMaintenancePayload } from '../../types';

interface ScheduleMaintenanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  assets: Asset[];
  initialAssetId?: string;
  onSchedule: (payload: ScheduleMaintenancePayload) => Promise<void> | void;
}

export const ScheduleMaintenanceModal: React.FC<ScheduleMaintenanceModalProps> = ({
  isOpen,
  onClose,
  assets,
  initialAssetId,
  onSchedule,
}) => {
  const [assetId, setAssetId] = useState(initialAssetId || assets[0]?.id || '');
  const [maintenanceType, setMaintenanceType] = useState<ScheduleMaintenancePayload['maintenanceType']>('PREVENTIVE');
  const [description, setDescription] = useState('');
  const [scheduledDate, setScheduledDate] = useState('2026-10-20');
  const [cost, setCost] = useState('120');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialAssetId) {
      setAssetId(initialAssetId);
    } else if (assets.length > 0 && !assetId) {
      setAssetId(assets[0].id);
    }
  }, [initialAssetId, assets, assetId]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assetId || !description.trim() || submitting) return;

    setSubmitting(true);
    try {
      await onSchedule({
        assetId,
        maintenanceType,
        description: description.trim(),
        scheduledDate,
        cost: cost ? parseFloat(cost) : undefined,
      });
      setDescription('');
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
            <h3 className="ess-modal-title">Schedule Asset Maintenance</h3>
            <p className="ess-modal-subtitle">
              Configure servicing, diagnostic audit, or hardware repairs.
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
              <label className="ess-field-label">Target Asset *</label>
              <select
                className="ess-select"
                value={assetId}
                onChange={(e) => setAssetId(e.target.value)}
                required
              >
                {assets.map((ast) => (
                  <option key={ast.id} value={ast.id}>
                    {ast.name} ({ast.assetTag}) — {ast.status}
                  </option>
                ))}
              </select>
            </div>

            <div className="ess-field-group">
              <label className="ess-field-label">Maintenance Classification *</label>
              <select
                className="ess-select"
                value={maintenanceType}
                onChange={(e) => setMaintenanceType(e.target.value as ScheduleMaintenancePayload['maintenanceType'])}
                required
              >
                <option value="PREVENTIVE">PREVENTIVE (Routine cleaning, thermal paste, battery check)</option>
                <option value="REPAIR">REPAIR (Component replacement, screen/trackpad fix)</option>
                <option value="UPGRADE">UPGRADE (RAM expansion, SSD replacement, BIOS patch)</option>
              </select>
            </div>

            <div className="ess-field-group">
              <label className="ess-field-label">Work Description *</label>
              <textarea
                className="ess-textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detailed description of diagnostic symptoms or maintenance procedure."
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="ess-field-group">
                <label className="ess-field-label">Scheduled Date *</label>
                <input
                  className="ess-input"
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  required
                />
              </div>

              <div className="ess-field-group">
                <label className="ess-field-label">Estimated Cost ($ USD)</label>
                <input
                  className="ess-input"
                  type="number"
                  min="0"
                  step="1"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  placeholder="e.g. 150"
                />
              </div>
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
              <Wrench size={16} />
              {submitting ? 'Scheduling...' : 'Schedule Service'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
