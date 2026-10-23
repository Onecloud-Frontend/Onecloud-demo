import type { ButtonHTMLAttributes, ReactNode } from "react";

export type VendorStatus = "Active" | "Under Audit" | "Inactive";

export interface VendorRecord {
  id: string;
  name: string;
  category: string;
  gstin: string;
  rating: number;
  status: VendorStatus;
}

export function Panel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 shadow-lg shadow-black/10 sm:p-6 ${className}`}
    >
      {children}
    </section>
  );
}

export function SectionHeading({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-[var(--border-subtle)] pb-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-lg font-bold text-[var(--text-primary)]">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

export function PrimaryButton({
  children,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-[var(--brand-primary)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--brand-primary-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--border-focus)] focus:ring-offset-2 focus:ring-offset-[var(--bg-card)] disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}

export const fieldClassName =
  "w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-input)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none transition focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--border-focus)]";

export function StatusBadge({ status }: { status: string }) {
  const style =
    status === "Active" || status === "Positive Verified"
      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
      : status === "Under Audit" || status === "Pending"
        ? "border-amber-500/30 bg-amber-500/10 text-amber-300"
        : "border-slate-500/30 bg-slate-500/10 text-[var(--text-secondary)]";

  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-semibold ${style}`}
    >
      {status}
    </span>
  );
}

export function Table({
  children,
  minWidth = "min-w-[680px]",
}: {
  children: ReactNode;
  minWidth?: string;
}) {
  return (
    <div className="mt-5 overflow-x-auto">
      <table className={`w-full border-collapse text-left text-sm ${minWidth}`}>
        {children}
      </table>
    </div>
  );
}

export const tableHeadClass =
  "border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]";
export const tableCellClass =
  "border-b border-[var(--border-subtle)] px-4 py-3.5 text-[var(--text-secondary)]";
