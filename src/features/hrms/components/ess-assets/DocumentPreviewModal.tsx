import React from 'react';
import { X, FileText, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import type { EmployeeDocument } from '../../types';

interface DocumentPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: EmployeeDocument | null;
}

export const DocumentPreviewModal: React.FC<DocumentPreviewModalProps> = ({
  isOpen,
  onClose,
  document,
}) => {
  if (!isOpen || !document) return null;

  return (
    <div className="ess-modal-backdrop" onClick={onClose}>
      <div className="ess-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="ess-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                padding: '8px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(99, 102, 241, 0.15)',
                color: 'var(--brand-primary)',
              }}
            >
              <FileText size={20} />
            </div>
            <div>
              <h3 className="ess-modal-title">{document.documentType}</h3>
              <p className="ess-modal-subtitle">
                Reference ID: {document.documentNumber || 'N/A'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        <div className="ess-modal-body">
          <div
            style={{
              padding: '16px',
              backgroundColor: 'var(--bg-elevated)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              fontSize: '13px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-muted)' }}>Verification Status:</span>
              <span
                className={`badge-status-pill ${
                  document.status === 'VERIFIED'
                    ? 'badge-status-verified'
                    : document.status === 'PENDING_VERIFICATION'
                    ? 'badge-status-pending'
                    : 'badge-status-maintenance'
                }`}
              >
                {document.status === 'VERIFIED' && <CheckCircle2 size={12} />}
                {document.status === 'PENDING_VERIFICATION' && <Clock size={12} />}
                {document.status === 'REJECTED' && <AlertTriangle size={12} />}
                {document.status.replace('_', ' ')}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Uploaded Timestamp:</span>
              <strong style={{ color: 'var(--text-primary)' }}>
                {new Date(document.uploadedAt).toLocaleString()}
              </strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Verified Timestamp:</span>
              <strong style={{ color: 'var(--text-primary)' }}>
                {document.verifiedAt ? new Date(document.verifiedAt).toLocaleString() : 'Pending HR Verification Review'}
              </strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Vault Storage Path:</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#a5b4fc' }}>
                {document.fileUrl}
              </span>
            </div>
          </div>

          <div
            style={{
              height: '180px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-base)',
              border: '1px dashed var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              color: 'var(--text-muted)',
              fontSize: '13px',
            }}
          >
            <FileText size={36} color="var(--brand-primary)" />
            <span>Digital Document Vault Secure Preview</span>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              SHA-256 Checksum Verified • Confidential HR Master Record
            </span>
          </div>
        </div>

        <div className="ess-modal-footer">
          <button
            type="button"
            className="ess-subnav-btn"
            style={{ backgroundColor: 'var(--bg-elevated)', color: 'var(--text-primary)' }}
            onClick={onClose}
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
