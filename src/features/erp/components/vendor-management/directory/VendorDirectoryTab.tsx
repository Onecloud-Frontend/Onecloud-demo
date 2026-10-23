import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Building2,
  CheckCircle2,
  Clock3,
  ChevronDown,
  Search,
  Star,
  TrendingUp,
} from "lucide-react";
import {
  Panel,
  StatusBadge,
  Table,
  tableCellClass,
  tableHeadClass,
  type VendorRecord,
} from "../shared";

const statCards = [
  {
    title: "Total Vendors",
    value: "128",
    note: "+12% from last month",
    icon: Building2,
    color: "text-blue-400 bg-blue-500/10",
  },
  {
    title: "Active Suppliers",
    value: "112",
    note: "87.5% compliance rate",
    icon: CheckCircle2,
    color: "text-emerald-400 bg-emerald-500/10",
  },
  {
    title: "Under Review",
    value: "12",
    note: "Action needed",
    icon: Clock3,
    color: "text-amber-400 bg-amber-500/10",
  },
  {
    title: "Blacklisted / Inactive",
    value: "4",
    note: "Risk flagged",
    icon: AlertTriangle,
    color: "text-rose-400 bg-rose-500/10",
  },
];

export function VendorDirectoryTab({
  vendors,
  onStartOnboarding,
}: {
  vendors: VendorRecord[];
  onStartOnboarding: () => void;
}) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  const filteredVendors = useMemo(() => {
    const query = search.trim().toLowerCase();
    return vendors.filter((vendor) => {
      const matchesSearch =
        !query ||
        [vendor.name, vendor.id, vendor.gstin, vendor.category].some((value) =>
          value.toLowerCase().includes(query),
        );
      return matchesSearch && (status === "ALL" || vendor.status === status);
    });
  }, [search, status, vendors]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map(({ title, value, note, icon: Icon, color }) => (
          <Panel key={title} className="p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
                  {title}
                </p>
                <p className="mt-1 text-2xl font-bold text-[var(--text-primary)]">
                  {title === "Total Vendors" ? vendors.length : value}
                </p>
                <p className="mt-1 flex items-center gap-1 text-xs text-[var(--text-secondary)]">
                  {title === "Total Vendors" && (
                    <TrendingUp
                      className="h-3.5 w-3.5 text-emerald-400"
                      aria-hidden="true"
                    />
                  )}
                  {note}
                </p>
              </div>
              <div className={`rounded-xl p-3 ${color}`}>
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
            </div>
          </Panel>
        ))}
      </div>

      <Panel className="overflow-hidden p-0">
        <div className="flex flex-col gap-3 border-b border-[var(--border-subtle)] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <label className="relative min-w-0 flex-1">
            <span className="sr-only">Search vendors</span>
            <Search
              className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]"
              aria-hidden="true"
            />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by vendor, code, GSTIN or category..."
              className="w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-input)] py-2.5 pl-10 pr-4 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--border-focus)]"
              type="search"
            />
          </label>

          <div className="relative">
            <label>
              <span className="sr-only">Filter by status</span>

              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="h-full min-h-10 appearance-none rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-input)] px-3 pr-9 text-sm text-[var(--text-secondary)] outline-none focus:border-[var(--brand-primary)]"
              >
                <option value="ALL">All status</option>
                <option value="Active">Active</option>
                <option value="Under Audit">Under Audit</option>
                <option value="Inactive">Inactive</option>
              </select>
            </label>

            <ChevronDown
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-secondary)]"
              aria-hidden="true"
            />
          </div>
        </div>

        <Table minWidth="min-w-[720px]">
          <thead>
            <tr>
              <th className={`${tableHeadClass} pl-6`}>Vendor Info</th>
              <th className={tableHeadClass}>Category</th>
              <th className={tableHeadClass}>GSTIN Number</th>
              <th className={tableHeadClass}>Rating</th>
              <th className={tableHeadClass}>Status</th>
              <th className={`${tableHeadClass} pr-6 text-right`}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVendors.map((vendor) => (
              <tr
                key={vendor.id}
                className="transition-colors hover:bg-[var(--bg-card-hover)]"
              >
                <td className={`${tableCellClass} pl-6`}>
                  <div className="flex items-center gap-3">
                    <span className="rounded-lg bg-[var(--brand-primary)]/10 p-2 text-[var(--brand-primary)]">
                      <Building2 className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block font-semibold text-[var(--text-primary)]">
                        {vendor.name}
                      </span>
                      <span className="mt-0.5 block font-mono text-xs text-[var(--text-muted)]">
                        {vendor.id}
                      </span>
                    </span>
                  </div>
                </td>
                <td className={tableCellClass}>{vendor.category}</td>
                <td className={`${tableCellClass} font-mono text-xs`}>
                  {vendor.gstin || "—"}
                </td>
                <td className={tableCellClass}>
                  <span className="inline-flex items-center gap-1 font-semibold text-amber-300">
                    <Star className="h-4 w-4 fill-current" aria-hidden="true" />
                    {vendor.rating ? vendor.rating.toFixed(1) : "New"}
                  </span>
                </td>
                <td className={tableCellClass}>
                  <StatusBadge status={vendor.status} />
                </td>
                <td className={`${tableCellClass} pr-6 text-right`}>
                  <button
                    type="button"
                    className="text-xs font-semibold text-[var(--brand-primary)] hover:text-[var(--text-primary)]"
                    onClick={onStartOnboarding}
                  >
                    Review
                  </button>
                </td>
              </tr>
            ))}
            {filteredVendors.length === 0 && (
              <tr>
                <td
                  className="px-4 py-10 text-center text-sm text-[var(--text-muted)]"
                  colSpan={6}
                >
                  No vendors match your search.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Panel>
    </div>
  );
}
