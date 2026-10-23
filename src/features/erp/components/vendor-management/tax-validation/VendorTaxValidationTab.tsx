import { useState } from "react";
import { CheckCircle2, Download, ShieldCheck } from "lucide-react";
import {
  Panel,
  PrimaryButton,
  fieldClassName,
} from "../shared";

type TaxDocumentType = "GSTIN" | "PAN";

export function VendorTaxValidationTab() {
  const [documentType, setDocumentType] = useState<TaxDocumentType>("GSTIN");
  const [taxId, setTaxId] = useState("27AABCU9603R1ZN");
  const [result, setResult] = useState<"idle" | "valid" | "invalid">("idle");

  const verify = () => {
    const pattern =
      documentType === "GSTIN"
        ? /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/
        : /^[A-Z]{5}[0-9]{4}[A-Z]$/;
    setResult(pattern.test(taxId.trim().toUpperCase()) ? "valid" : "invalid");
  };

  const selectDocumentType = (type: TaxDocumentType) => {
    setDocumentType(type);
    setTaxId(type === "GSTIN" ? "27AABCU9603R1ZN" : "AABCU9603R");
    setResult("idle");
  };

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      <Panel className="space-y-5">
        <div>
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            Tax Compliance Verifier
          </h2>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Check the format of a vendor GSTIN or PAN.
          </p>
        </div>

        <fieldset>
          <legend className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
            Select ID type
          </legend>
          <div className="grid grid-cols-2 gap-2">
            {(["GSTIN", "PAN"] as const).map((type) => (
              <button
                key={type}
                type="button"
                aria-pressed={documentType === type}
                onClick={() => selectDocumentType(type)}
                className={`rounded-xl border px-3 py-2.5 text-sm font-semibold transition-colors ${
                  documentType === type
                    ? "border-[var(--brand-primary)] bg-[var(--brand-primary)]/10 text-[var(--text-primary)]"
                    : "border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {type} number
              </button>
            ))}
          </div>
        </fieldset>

        <label className="block space-y-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
          Enter {documentType} ({documentType === "GSTIN" ? "15" : "10"} characters)
          <input
            className={`${fieldClassName} font-mono uppercase`}
            value={taxId}
            onChange={(event) => {
              setTaxId(event.target.value.toUpperCase());
              setResult("idle");
            }}
            maxLength={documentType === "GSTIN" ? 15 : 10}
            placeholder={documentType === "GSTIN" ? "27AABCU9603R1ZN" : "AABCU9603R"}
          />
        </label>

        <PrimaryButton className="w-full" onClick={verify}>
          <ShieldCheck className="h-4 w-4" aria-hidden="true" />
          Verify format
        </PrimaryButton>
        <p className="text-xs leading-relaxed text-[var(--text-muted)]">
          Demo only: this validates the ID format locally. It does not query a
          government portal or confirm registration status.
        </p>
      </Panel>

      <Panel className="lg:col-span-2">
        <div className="flex flex-col gap-3 border-b border-[var(--border-subtle)] pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-bold text-[var(--text-primary)]">
              Validation result
            </h2>
            <p className="mt-1 text-xs text-[var(--text-muted)]">
              Local format check · No external lookup
            </p>
          </div>
          <span className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3 py-1 text-xs font-semibold text-[var(--text-secondary)]">
            {result === "valid"
              ? "FORMAT VALID"
              : result === "invalid"
                ? "FORMAT INVALID"
                : "NOT CHECKED"}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 py-5 sm:grid-cols-2">
          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4">
            <p className="text-xs uppercase tracking-wider text-[var(--text-muted)]">
              Document type
            </p>
            <p className="mt-1 font-semibold text-[var(--text-primary)]">
              {documentType}
            </p>
          </div>
          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4">
            <p className="text-xs uppercase tracking-wider text-[var(--text-muted)]">
              Identifier entered
            </p>
            <p className="mt-1 break-all font-mono text-sm font-semibold text-[var(--text-primary)]">
              {taxId || "—"}
            </p>
          </div>
        </div>

        {result !== "idle" && (
          <div
            role="status"
            className={`flex items-start gap-3 rounded-xl border p-4 ${
              result === "valid"
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                : "border-rose-500/30 bg-rose-500/10 text-rose-300"
            }`}
          >
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <div>
              <p className="text-sm font-bold">
                {result === "valid"
                  ? "The identifier format is valid."
                  : "The identifier format is not valid."}
              </p>
              <p className="mt-1 text-xs leading-relaxed opacity-80">
                {result === "valid"
                  ? "This confirms only the expected character pattern, not that the identifier is registered or active."
                  : `Enter a ${documentType === "GSTIN" ? "15-character GSTIN" : "10-character PAN"} in the expected format and try again.`}
              </p>
            </div>
          </div>
        )}

        <div className="mt-5 flex justify-end border-t border-[var(--border-subtle)] pt-4">
          <button
            type="button"
            disabled={result === "idle"}
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-[var(--text-secondary)] transition hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-primary)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Print verification result
          </button>
        </div>
      </Panel>
    </div>
  );
}
