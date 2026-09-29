/**
 * Canonical Document & Attachment Reference Types
 * Standard metadata containers for uploaded files, receipts, and compliance records.
 */

export interface DocumentReference {
  id: string;
  name: string;
  documentType: string;
  fileUrl: string;
  fileSize?: number;
  mimeType?: string;
  uploadedAt: string;
  uploadedBy?: string;
}

export interface DocumentAttachment {
  id: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  mimeType?: string;
  uploadedAt: string;
  uploadedBy?: string;
}
