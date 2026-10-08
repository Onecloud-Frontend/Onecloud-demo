import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';
import type { Employee, UploadDocumentPayload } from '../../types';

interface UploadDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee;
  onUpload: (payload: UploadDocumentPayload) => Promise<void> | void;
}

export const UploadDocumentModal: React.FC<UploadDocumentModalProps> = ({
  isOpen,
  onClose,
  employee,
  onUpload,
}) => {
  const [documentType, setDocumentType] = useState('Government Identity Proof (Passport / National ID)');
  const [documentNumber, setDocumentNumber] = useState('');
  const [fileName, setFileName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!documentType || submitting) return;

    setSubmitting(true);
    try {
      await onUpload({
        employeeId: employee.id,
        documentType,
        documentNumber: documentNumber.trim() || undefined,
        fileUrl: fileName ? `/documents/${fileName}` : `/documents/${employee.id}-${Date.now()}.pdf`,
      });
      setDocumentNumber('');
      setFileName('');
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
            <h3 className="ess-modal-title">Upload Employee Document</h3>
            <p className="ess-modal-subtitle">
              Employee: {employee.firstName} {employee.lastName} ({employee.employeeCode})
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
              <label className="ess-field-label">Document Classification *</label>
              <select
                className="ess-select"
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                required
              >
                <option value="Government Identity Proof (Passport / National ID)">
                  Government Identity Proof (Passport / National ID)
                </option>
                <option value="Permanent Account Number (PAN Card)">
                  Permanent Account Number (PAN Card)
                </option>
                <option value="Degree Certificate & University Transcripts">
                  Degree Certificate & University Transcripts
                </option>
                <option value="Direct Salary Deposit Mandate / Bank Cheque">
                  Direct Salary Deposit Mandate / Bank Cheque
                </option>
                <option value="Professional License & Certification">
                  Professional License & Certification
                </option>
                <option value="Previous Employment Relieving & Experience Letter">
                  Previous Employment Relieving & Experience Letter
                </option>
              </select>
            </div>

            <div className="ess-field-group">
              <label className="ess-field-label">Document Identification / Reference Number</label>
              <input
                className="ess-input"
                type="text"
                value={documentNumber}
                onChange={(e) => setDocumentNumber(e.target.value)}
                placeholder="e.g. P-98214812 or PAN-ABCPS8192K"
              />
            </div>

            <div className="ess-field-group">
              <label className="ess-field-label">File Name / Document Attachment Mock</label>
              <input
                className="ess-input"
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="e.g. passport_scan_verified.pdf"
              />
              <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                Accepted formats: PDF, PNG, JPG (Mock uploaded to enterprise document vault)
              </span>
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
              <Upload size={16} />
              {submitting ? 'Uploading...' : 'Submit for Verification'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
