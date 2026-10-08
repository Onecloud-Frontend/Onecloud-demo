import React, { useState } from 'react';
import { EmployeeDocument, DocumentVerificationStatus } from '../../types';
import { formatDate } from '@shared/utils/formatters';
import {
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Plus,
  ExternalLink,
  ShieldCheck,
  Check,
  X,
  UploadCloud,
  Paperclip,
} from 'lucide-react';

interface EmployeeDocumentSectionProps {
  employeeId: string;
  documents: EmployeeDocument[];
  onVerifyStatus?: (documentId: string, status: DocumentVerificationStatus) => Promise<void>;
  onAddDocument?: (document: Partial<EmployeeDocument>) => Promise<void>;
}

export const EmployeeDocumentSection: React.FC<EmployeeDocumentSectionProps> = ({
  employeeId,
  documents,
  onVerifyStatus,
  onAddDocument,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [docType, setDocType] = useState('');
  const [docNumber, setDocNumber] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [processingDocId, setProcessingDocId] = useState<string | null>(null);

  const getStatusBadge = (status: DocumentVerificationStatus) => {
    switch (status) {
      case 'VERIFIED':
        return (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'rgba(16, 185, 129, 0.12)',
              color: '#34d399',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              fontSize: '11px',
              fontWeight: 600,
            }}
          >
            <CheckCircle size={12} />
            Verified
          </span>
        );
      case 'REJECTED':
        return (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'rgba(239, 68, 68, 0.12)',
              color: '#f87171',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              fontSize: '11px',
              fontWeight: 600,
            }}
          >
            <XCircle size={12} />
            Rejected
          </span>
        );
      case 'PENDING_VERIFICATION':
      default:
        return (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'rgba(245, 158, 11, 0.12)',
              color: '#fbbf24',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              fontSize: '11px',
              fontWeight: 600,
            }}
          >
            <Clock size={12} />
            Pending Verification
          </span>
        );
    }
  };

  const handleVerify = async (docId: string, status: DocumentVerificationStatus) => {
    if (!onVerifyStatus) return;
    try {
      setProcessingDocId(docId);
      await onVerifyStatus(docId, status);
    } finally {
      setProcessingDocId(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      if (!docType.trim()) {
        const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ');
        setDocType(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
      }
    }
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!docType.trim() || !onAddDocument) return;

    try {
      setIsSubmitting(true);
      const generatedFileUrl = selectedFile
        ? URL.createObjectURL(selectedFile)
        : `/docs/${employeeId}/document.pdf`;

      await onAddDocument({
        employeeId,
        documentType: docType.trim(),
        documentNumber: docNumber.trim() || undefined,
        fileUrl: generatedFileUrl,
        status: 'PENDING_VERIFICATION',
      });
      setDocType('');
      setDocNumber('');
      setSelectedFile(null);
      setShowAddForm(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              backgroundColor: 'rgba(99, 102, 241, 0.12)',
              color: 'var(--brand-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ShieldCheck size={16} />
          </div>
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
              Compliance & Verification Documents
            </h4>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              Official identification, certifications, and contracts ({documents.length} files)
            </span>
          </div>
        </div>

        {onAddDocument && !showAddForm && (
          <button
            type="button"
            onClick={() => setShowAddForm(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--brand-primary)',
              padding: '6px 12px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              backgroundColor: 'rgba(99, 102, 241, 0.08)',
              cursor: 'pointer',
            }}
          >
            <Plus size={14} />
            Add Document
          </button>
        )}
      </div>

      {/* Add Document Inline Form */}
      {showAddForm && (
        <form
          onSubmit={handleAddSubmit}
          style={{
            backgroundColor: 'var(--bg-elevated)',
            border: '1px solid var(--border-focus)',
            borderRadius: 'var(--radius-md)',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
            Record New Employee Document
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '10px',
            }}
          >
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  marginBottom: '4px',
                }}
              >
                Document Type *
              </label>
              <input
                type="text"
                list="common-doc-types"
                placeholder="e.g. Passport, Degree Certificate"
                value={docType}
                onChange={(e) => setDocType(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '7px 10px',
                  fontSize: '13px',
                  backgroundColor: 'var(--bg-input)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-primary)',
                  outline: 'none',
                }}
              />
              <datalist id="common-doc-types">
                <option value="Government ID (Passport)" />
                <option value="National Identity Card / Driving License" />
                <option value="Educational Degree Certificate" />
                <option value="Offer Letter & Employment Contract" />
                <option value="Relieving & Experience Letter" />
                <option value="Tax Declaration (W-4 / W-9 / Form 16)" />
              </datalist>
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  marginBottom: '4px',
                }}
              >
                Document Number / ID
              </label>
              <input
                type="text"
                placeholder="e.g. P-849201"
                value={docNumber}
                onChange={(e) => setDocNumber(e.target.value)}
                style={{
                  width: '100%',
                  padding: '7px 10px',
                  fontSize: '13px',
                  backgroundColor: 'var(--bg-input)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-primary)',
                  outline: 'none',
                }}
              />
            </div>

            {/* Upload Document File Dropzone */}
            <div style={{ gridColumn: 'span 2' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  marginBottom: '6px',
                }}
              >
                Upload File *
              </label>

              {!selectedFile ? (
                <label
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px 16px',
                    border: '1px dashed var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-input)',
                    cursor: 'pointer',
                    textAlign: 'center',
                    gap: '6px',
                    transition: 'border-color var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--brand-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  }}
                >
                  <UploadCloud size={24} style={{ color: 'var(--brand-primary)' }} />
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    Click to browse and upload document file
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    Supports PDF, PNG, JPG, JPEG, or DOCX (up to 20MB)
                  </span>
                  <input
                    type="file"
                    required
                    onChange={handleFileChange}
                    accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                    style={{ display: 'none' }}
                  />
                </label>
              ) : (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(99, 102, 241, 0.08)',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '6px',
                        backgroundColor: 'rgba(99, 102, 241, 0.15)',
                        color: 'var(--brand-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Paperclip size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {selectedFile.name}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • {selectedFile.type || 'Document'}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedFile(null)}
                    title="Remove selected file"
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--status-danger)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--text-muted)';
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
            <button
              type="button"
              onClick={() => {
                setShowAddForm(false);
                setSelectedFile(null);
              }}
              style={{
                fontSize: '12px',
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)',
                backgroundColor: 'transparent',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !docType.trim() || !selectedFile}
              style={{
                fontSize: '12px',
                fontWeight: 600,
                padding: '6px 14px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--brand-primary)',
                color: '#ffffff',
                border: 'none',
                cursor: isSubmitting || !selectedFile ? 'not-allowed' : 'pointer',
                opacity: isSubmitting || !selectedFile ? 0.6 : 1,
              }}
            >
              {isSubmitting ? 'Saving...' : 'Save Document'}
            </button>
          </div>
        </form>
      )}

      {/* Documents List */}
      {documents.length === 0 ? (
        <div
          style={{
            padding: '24px',
            textAlign: 'center',
            backgroundColor: 'var(--bg-elevated)',
            border: '1px dashed var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--text-muted)',
            fontSize: '13px',
          }}
        >
          No documents on record for this employee.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {documents.map((doc) => {
            const isProcessing = processingDocId === doc.id;

            return (
              <div
                key={doc.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  backgroundColor: 'var(--bg-elevated)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  gap: '12px',
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: '220px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'rgba(148, 163, 184, 0.1)',
                      color: 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <FileText size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {doc.documentType}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {doc.documentNumber ? `ID: ${doc.documentNumber} • ` : ''}
                      Uploaded {formatDate(doc.uploadedAt)}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  {getStatusBadge(doc.status)}

                  {doc.fileUrl && (
                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Open Document File"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '12px',
                        color: 'var(--text-secondary)',
                        padding: '4px 8px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-subtle)',
                      }}
                    >
                      <ExternalLink size={12} />
                      View
                    </a>
                  )}

                  {/* Verification Actions */}
                  {onVerifyStatus && doc.status === 'PENDING_VERIFICATION' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <button
                        type="button"
                        disabled={isProcessing}
                        onClick={() => handleVerify(doc.id, 'VERIFIED')}
                        title="Mark as Verified"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '4px 8px',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: 'rgba(16, 185, 129, 0.15)',
                          color: '#34d399',
                          border: '1px solid rgba(16, 185, 129, 0.4)',
                          fontSize: '11px',
                          fontWeight: 600,
                          cursor: isProcessing ? 'not-allowed' : 'pointer',
                        }}
                      >
                        <Check size={12} />
                        Verify
                      </button>
                      <button
                        type="button"
                        disabled={isProcessing}
                        onClick={() => handleVerify(doc.id, 'REJECTED')}
                        title="Mark as Rejected"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '4px 8px',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: 'rgba(239, 68, 68, 0.15)',
                          color: '#f87171',
                          border: '1px solid rgba(239, 68, 68, 0.4)',
                          fontSize: '11px',
                          fontWeight: 600,
                          cursor: isProcessing ? 'not-allowed' : 'pointer',
                        }}
                      >
                        <X size={12} />
                        Reject
                      </button>
                    </div>
                  )}

                  {/* Option to re-verify if already decided */}
                  {onVerifyStatus && doc.status !== 'PENDING_VERIFICATION' && (
                    <button
                      type="button"
                      disabled={isProcessing}
                      onClick={() =>
                        handleVerify(
                          doc.id,
                          doc.status === 'VERIFIED' ? 'PENDING_VERIFICATION' : 'VERIFIED'
                        )
                      }
                      style={{
                        fontSize: '11px',
                        color: 'var(--text-muted)',
                        padding: '3px 6px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-subtle)',
                        backgroundColor: 'transparent',
                        cursor: isProcessing ? 'not-allowed' : 'pointer',
                      }}
                    >
                      {doc.status === 'VERIFIED' ? 'Reset Status' : 'Re-verify'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
