import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import type { Employee, CreateEmployeeRequestPayload } from '../../types';

interface RaiseRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee;
  initialRequestType?: CreateEmployeeRequestPayload['requestType'];
  onSubmit: (payload: CreateEmployeeRequestPayload) => Promise<void> | void;
}

export const RaiseRequestModal: React.FC<RaiseRequestModalProps> = ({
  isOpen,
  onClose,
  employee,
  initialRequestType = 'LETTER_REQUEST',
  onSubmit,
}) => {
  const [requestType, setRequestType] = useState<CreateEmployeeRequestPayload['requestType']>(initialRequestType);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || submitting) return;

    setSubmitting(true);
    try {
      await onSubmit({
        employeeId: employee.id,
        requestType,
        title: title.trim(),
        description: description.trim(),
      });
      setTitle('');
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
            <h3 className="ess-modal-title">Submit Employee Self-Service Request</h3>
            <p className="ess-modal-subtitle">
              Requester: {employee.firstName} {employee.lastName} ({employee.employeeCode})
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
              <label className="ess-field-label">Request Classification *</label>
              <select
                className="ess-select"
                value={requestType}
                onChange={(e) => setRequestType(e.target.value as CreateEmployeeRequestPayload['requestType'])}
                required
              >
                <option value="LETTER_REQUEST">LETTER REQUEST (Employment bonafide, visa verification, salary letter)</option>
                <option value="INFO_UPDATE">INFO UPDATE (Address correction, mobile phone, bank deposit change)</option>
                <option value="DEVICE_ACCESS">DEVICE ACCESS (Hardware upgrade, peripheral monitor, workstation)</option>
                <option value="GENERAL_INQUIRY">GENERAL INQUIRY (HR policies, benefits, medical insurance)</option>
              </select>
            </div>

            <div className="ess-field-group">
              <label className="ess-field-label">Request Title / Subject *</label>
              <input
                className="ess-input"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Visa Support Letter for Tech Conference"
                required
              />
            </div>

            <div className="ess-field-group">
              <label className="ess-field-label">Detailed Request Justification *</label>
              <textarea
                className="ess-textarea"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the exact requirements, reason, and any relevant deadlines."
                required
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
              <Send size={16} />
              {submitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
