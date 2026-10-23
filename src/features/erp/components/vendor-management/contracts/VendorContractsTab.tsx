import { useState, type FormEvent } from "react";
import { FilePlus2, FileText, Plus } from "lucide-react";
import {
  Panel,
  PrimaryButton,
  StatusBadge,
  Table,
  fieldClassName,
  tableCellClass,
  tableHeadClass,
} from "../shared";

type ContractRecord = {
  title: string;
  vendor: string;
  start: string;
  end: string;
  status: "Active" | "Pending";
};

const initialContracts: ContractRecord[] = [
  {
    title: "Master Service Agreement (MSA)",
    vendor: "ACME Technologies",
    start: "Jan 2025",
    end: "Dec 2027",
    status: "Active",
  },
];

export function VendorContractsTab() {
  const [contracts, setContracts] = useState(initialContracts);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [vendor, setVendor] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const addContract = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formatDate = (value: string) =>
      new Date(`${value}T00:00:00`).toLocaleDateString("en", {
        month: "short",
        year: "numeric",
      });
    setContracts((current) => [
      ...current,
      {
        title: title.trim(),
        vendor: vendor.trim(),
        start: formatDate(start),
        end: formatDate(end),
        status: "Pending",
      },
    ]);
    setTitle("");
    setVendor("");
    setStart("");
    setEnd("");
    setShowForm(false);
  };

  return (
    <Panel>
      <div className="space-y-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              Agreements & SLA Contracts
            </h2>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Track active non-disclosure agreements, service agreements, and SLAs.
            </p>
          </div>
          <PrimaryButton onClick={() => setShowForm((visible) => !visible)}>
            <FilePlus2 className="h-4 w-4" aria-hidden="true" />
            {showForm ? "Close form" : "Upload / create agreement"}
          </PrimaryButton>
        </div>

        {showForm && (
          <form
            onSubmit={addContract}
            className="grid grid-cols-1 gap-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 sm:grid-cols-2"
          >
            <label className="space-y-1.5 text-xs font-medium text-[var(--text-secondary)]">
              Contract title
              <input
                className={fieldClassName}
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
                maxLength={120}
              />
            </label>
            <label className="space-y-1.5 text-xs font-medium text-[var(--text-secondary)]">
              Vendor name
              <input
                className={fieldClassName}
                value={vendor}
                onChange={(event) => setVendor(event.target.value)}
                required
                maxLength={100}
              />
            </label>
            <label className="space-y-1.5 text-xs font-medium text-[var(--text-secondary)]">
              Valid from
              <input
                className={fieldClassName}
                type="date"
                value={start}
                onChange={(event) => setStart(event.target.value)}
                required
              />
            </label>
            <label className="space-y-1.5 text-xs font-medium text-[var(--text-secondary)]">
              Valid to
              <input
                className={fieldClassName}
                type="date"
                min={start || undefined}
                value={end}
                onChange={(event) => setEnd(event.target.value)}
                required
              />
            </label>
            <div className="sm:col-span-2 sm:justify-self-end">
              <PrimaryButton type="submit">
                <Plus className="h-4 w-4" aria-hidden="true" />
                Save agreement
              </PrimaryButton>
            </div>
          </form>
        )}

        <Table minWidth="min-w-[640px]">
          <thead>
            <tr>
              <th className={tableHeadClass}>Contract name</th>
              <th className={tableHeadClass}>Vendor</th>
              <th className={tableHeadClass}>Validity period</th>
              <th className={tableHeadClass}>Status</th>
              <th className={`${tableHeadClass} text-right`}>Document</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((contract) => (
              <tr key={`${contract.title}-${contract.vendor}`}>
                <td className={`${tableCellClass} font-semibold text-[var(--text-primary)]`}>
                  <span className="inline-flex items-center gap-2">
                    <FileText className="h-4 w-4 text-[var(--text-muted)]" aria-hidden="true" />
                    {contract.title}
                  </span>
                </td>
                <td className={tableCellClass}>{contract.vendor}</td>
                <td className={tableCellClass}>
                  {contract.start} - {contract.end}
                </td>
                <td className={tableCellClass}>
                  <StatusBadge status={contract.status} />
                </td>
                <td className={`${tableCellClass} text-right`}>
                  <span className="text-xs text-[var(--text-muted)]">
                    Not uploaded
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Panel>
  );
}
