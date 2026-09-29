/**
 * Canonical Audit Metadata Types
 * Traceability metadata capturing record creation and mutation lifecycle events.
 */

export interface AuditMetadata {
  createdBy: string;
  createdAt: string;
  updatedBy?: string | null;
  updatedAt?: string | null;
}
