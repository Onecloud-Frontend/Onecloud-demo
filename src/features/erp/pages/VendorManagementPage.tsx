import { useState } from "react";
import {
  Award,
  BookmarkCheck,
  Building2,
  FileText,
  MapPin,
  ShieldCheck,
  UserPlus,
  Users,
} from "lucide-react";
import {
  VendorContactsTab,
  VendorContractsTab,
  VendorDirectoryTab,
  VendorOnboardingTab,
  VendorReferencesTab,
  VendorScorecardTab,
  VendorTaxValidationTab,
  type VendorRecord,
} from "../components/vendor-management";

const tabs = [
  { id: "directory", label: "Directory", icon: Users, count: "128" },
  { id: "onboarding", label: "Onboarding", icon: UserPlus, count: "4" },
  { id: "tax", label: "GSTIN / PAN", icon: ShieldCheck },
  { id: "contacts", label: "Contacts", icon: MapPin },
  { id: "scorecard", label: "Scorecard", icon: Award },
  { id: "contracts", label: "Contracts", icon: FileText },
  { id: "references", label: "References", icon: BookmarkCheck },
] as const;

type VendorTab = (typeof tabs)[number]["id"];

const initialVendors: VendorRecord[] = [
  {
    id: "VEN-001",
    name: "ABC Technologies Pvt Ltd",
    category: "IT Services",
    gstin: "29ABCDE1234F1Z5",
    rating: 4.8,
    status: "Active",
  },
  {
    id: "VEN-002",
    name: "Global Office Supplies",
    category: "Office Supplies",
    gstin: "29FGHIJ5678K1Z2",
    rating: 4.5,
    status: "Active",
  },
  {
    id: "VEN-003",
    name: "Prime Logistics",
    category: "Logistics",
    gstin: "29KLMNO9012P1Z3",
    rating: 3.9,
    status: "Under Audit",
  },
  {
    id: "VEN-004",
    name: "Reliable Manufacturing",
    category: "Manufacturing",
    gstin: "29QRSTU3456V1Z4",
    rating: 4.2,
    status: "Active",
  },
];

export function VendorManagementPage() {
  const [activeTab, setActiveTab] = useState<VendorTab>("directory");
  const [vendors, setVendors] = useState(initialVendors);

  const addVendor = (vendor: Omit<VendorRecord, "rating" | "status">) => {
    setVendors((current) => [
      ...current,
      { ...vendor, rating: 0, status: "Under Audit" },
    ]);
    setActiveTab("directory");
  };

  return (
    <div className="min-w-0 space-y-6">
      <section className="overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-lg shadow-black/10">
        <div className="border-b border-[var(--border-subtle)] px-4 py-4 sm:px-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-primary)]">
              <Building2 className="h-4 w-4" aria-hidden="true" />
              Supplier operations
            </div>
            <h1 className="text-xl font-bold text-[var(--text-primary)] sm:text-2xl">
              Vendor Management
            </h1>
            <p className="text-sm text-[var(--text-secondary)]">
              Manage supplier records, onboarding, compliance, and performance.
            </p>
          </div>
        </div>

        <div
          aria-label="Vendor management modules"
          className="flex gap-1 overflow-x-auto px-3 pt-3 [scrollbar-width:thin] sm:px-5"
          role="tablist"
        >
          {tabs.map((tab) => {
            const { id, label, icon: Icon } = tab;
            const count = "count" in tab ? tab.count : undefined;
            const isActive = activeTab === id;

            return (
              <button
                key={id}
                id={`vendor-tab-${id}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`vendor-panel-${id}`}
                onClick={() => setActiveTab(id)}
                className={`flex shrink-0 items-center gap-2 rounded-t-xl border-b-2 px-3 py-3 text-sm font-medium transition-colors sm:px-4 ${
                  isActive
                    ? "border-[var(--brand-primary)] bg-[var(--brand-primary)]/10 text-[var(--text-primary)]"
                    : "border-transparent text-[var(--text-muted)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-primary)]"
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span>{label}</span>
                {count && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] ${
                      isActive
                        ? "bg-[var(--brand-primary)]/20 text-[var(--text-primary)]"
                        : "bg-[var(--bg-elevated)] text-[var(--text-secondary)]"
                    }`}
                  >
                    {id === "directory" ? vendors.length : count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      <div
        id="vendor-panel-directory"
        role="tabpanel"
        aria-labelledby="vendor-tab-directory"
        hidden={activeTab !== "directory"}
      >
        <VendorDirectoryTab vendors={vendors} onStartOnboarding={() => setActiveTab("onboarding")} />
      </div>
      <div
        id="vendor-panel-onboarding"
        role="tabpanel"
        aria-labelledby="vendor-tab-onboarding"
        hidden={activeTab !== "onboarding"}
      >
        <VendorOnboardingTab onAddVendor={addVendor} />
      </div>
      <div
        id="vendor-panel-tax"
        role="tabpanel"
        aria-labelledby="vendor-tab-tax"
        hidden={activeTab !== "tax"}
      >
        <VendorTaxValidationTab />
      </div>
      <div
        id="vendor-panel-contacts"
        role="tabpanel"
        aria-labelledby="vendor-tab-contacts"
        hidden={activeTab !== "contacts"}
      >
        <VendorContactsTab />
      </div>
      <div
        id="vendor-panel-scorecard"
        role="tabpanel"
        aria-labelledby="vendor-tab-scorecard"
        hidden={activeTab !== "scorecard"}
      >
           <VendorScorecardTab />
      </div>
      <div
        id="vendor-panel-contracts"
        role="tabpanel"
        aria-labelledby="vendor-tab-contracts"
        hidden={activeTab !== "contracts"}
      >
         <VendorContractsTab />
      </div>
      <div
        id="vendor-panel-references"
        role="tabpanel"
        aria-labelledby="vendor-tab-references"
        hidden={activeTab !== "references"}
      >
        <VendorReferencesTab />
      </div>
    </div>
  );
}

export default VendorManagementPage;
