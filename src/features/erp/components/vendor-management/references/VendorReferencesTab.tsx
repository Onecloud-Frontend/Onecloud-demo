import { useState, type FormEvent } from "react";
import { BookmarkPlus, Plus } from "lucide-react";
import {
  Panel,
  PrimaryButton,
  StatusBadge,
  Table,
  fieldClassName,
  tableCellClass,
  tableHeadClass,
} from "../shared";

type VendorReference = {
  company: string;
  contact: string;
  contactDetails: string;
  status: string;
};

const initialReferences: VendorReference[] = [
  {
    company: "Reliance Industries Ltd",
    contact: "Amitabh Verma (VP)",
    contactDetails: "+91 98330 00112",
    status: "Positive Verified",
  },
];

export function VendorReferencesTab() {
  const [references, setReferences] = useState(initialReferences);
  const [showForm, setShowForm] = useState(false);
  const [company, setCompany] = useState("");
  const [contact, setContact] = useState("");
  const [contactDetails, setContactDetails] = useState("");

  const addReference = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setReferences((current) => [
      ...current,
      {
        company: company.trim(),
        contact: contact.trim(),
        contactDetails: contactDetails.trim(),
        status: "Pending",
      },
    ]);
    setCompany("");
    setContact("");
    setContactDetails("");
    setShowForm(false);
  };

  return (
    <Panel>
      <div className="space-y-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              Vendor Trade References
            </h2>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Previous client endorsements and background feedback checks.
            </p>
          </div>
          <PrimaryButton onClick={() => setShowForm((visible) => !visible)}>
            <BookmarkPlus className="h-4 w-4" aria-hidden="true" />
            {showForm ? "Close form" : "Add reference"}
          </PrimaryButton>
        </div>

        {showForm && (
          <form
            onSubmit={addReference}
            className="grid grid-cols-1 gap-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 sm:grid-cols-3"
          >
            <label className="space-y-1.5 text-xs font-medium text-[var(--text-secondary)]">
              Client company name
              <input
                className={fieldClassName}
                value={company}
                onChange={(event) => setCompany(event.target.value)}
                required
                maxLength={100}
              />
            </label>
            <label className="space-y-1.5 text-xs font-medium text-[var(--text-secondary)]">
              Reference contact person
              <input
                className={fieldClassName}
                value={contact}
                onChange={(event) => setContact(event.target.value)}
                required
                maxLength={100}
              />
            </label>
            <label className="space-y-1.5 text-xs font-medium text-[var(--text-secondary)]">
              Phone number or email
              <input
                className={fieldClassName}
                value={contactDetails}
                onChange={(event) => setContactDetails(event.target.value)}
                required
                maxLength={120}
              />
            </label>
            <div className="sm:col-span-3 sm:justify-self-end">
              <PrimaryButton type="submit">
                <Plus className="h-4 w-4" aria-hidden="true" />
                Save reference
              </PrimaryButton>
            </div>
          </form>
        )}

        <Table minWidth="min-w-[640px]">
          <thead>
            <tr>
              <th className={tableHeadClass}>Client company</th>
              <th className={tableHeadClass}>Contact person</th>
              <th className={tableHeadClass}>Phone / email</th>
              <th className={tableHeadClass}>Feedback status</th>
            </tr>
          </thead>
          <tbody>
            {references.map((reference) => (
              <tr key={`${reference.company}-${reference.contact}`}>
                <td className={`${tableCellClass} font-semibold text-[var(--text-primary)]`}>
                  {reference.company}
                </td>
                <td className={tableCellClass}>{reference.contact}</td>
                <td className={tableCellClass}>{reference.contactDetails}</td>
                <td className={tableCellClass}>
                  <StatusBadge status={reference.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Panel>
  );
}
