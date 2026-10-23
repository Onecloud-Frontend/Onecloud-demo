import { useState, type FormEvent } from "react";
import { Mail, MapPin, Phone, Plus, User, X } from "lucide-react";
import { Panel, PrimaryButton, fieldClassName } from "../shared";

type Location = {
  id: string;
  type: string;
  title: string;
  address: string;
  contact: string;
  designation: string;
  phone: string;
  email: string;
};

const initialLocations: Location[] = [
  {
    id: "LOC-01",
    type: "HQ / Primary billing",
    title: "ACME Technologies HQ",
    address:
      "Plot No. 42, Bandra-Kurla Complex, Near Diamond Market, Mumbai, Maharashtra - 400051",
    contact: "Rajesh Sharma",
    designation: "Procurement Head",
    phone: "+91 98200 12345",
    email: "r.sharma@acme.com",
  },
  {
    id: "LOC-02",
    type: "Warehouse / Dispatch",
    title: "Bhiwandi Logistics Hub",
    address:
      "Shed 12, Logistics Park, Mankoli Naka, Bhiwandi, Thane, Maharashtra - 421302",
    contact: "Sanjay Patel",
    designation: "Dispatch Manager",
    phone: "+91 97110 54321",
    email: "dispatch@acme.com",
  },
];

export function VendorContactsTab() {
  const [locations, setLocations] = useState(initialLocations);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [phone, setPhone] = useState("");

  const addLocation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLocations((current) => [
      ...current,
      {
        id: `LOC-${String(current.length + 1).padStart(2, "0")}`,
        type: "Secondary location",
        title: title.trim(),
        address: address.trim(),
        contact: contact.trim(),
        designation: "",
        phone: phone.trim(),
        email: "",
      },
    ]);
    setTitle("");
    setAddress("");
    setContact("");
    setPhone("");
    setShowForm(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            Vendor Locations & Key Contacts
          </h2>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Manage billing, shipping, and primary escalation contacts.
          </p>
        </div>
        <PrimaryButton onClick={() => setShowForm((visible) => !visible)}>
          {showForm ? (
            <X className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Plus className="h-4 w-4" aria-hidden="true" />
          )}
          {showForm ? "Cancel" : "Add new address"}
        </PrimaryButton>
      </div>

      {showForm && (
        <Panel>
          <form onSubmit={addLocation} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="space-y-1.5 text-xs font-medium text-[var(--text-secondary)]">
              Location title
              <input
                className={fieldClassName}
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
                maxLength={100}
              />
            </label>
            <label className="space-y-1.5 text-xs font-medium text-[var(--text-secondary)] sm:col-span-2">
              Full street address
              <textarea
                className={fieldClassName}
                rows={2}
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                required
                maxLength={250}
              />
            </label>
            <label className="space-y-1.5 text-xs font-medium text-[var(--text-secondary)]">
              Contact person
              <input
                className={fieldClassName}
                value={contact}
                onChange={(event) => setContact(event.target.value)}
                required
                maxLength={100}
              />
            </label>
            <label className="space-y-1.5 text-xs font-medium text-[var(--text-secondary)]">
              Phone number
              <input
                className={fieldClassName}
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                required
                maxLength={30}
              />
            </label>
            <div className="sm:col-span-2 sm:justify-self-end">
              <PrimaryButton type="submit">Save location</PrimaryButton>
            </div>
          </form>
        </Panel>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {locations.map((location) => (
          <Panel key={location.id} className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full border border-[var(--brand-primary)]/30 bg-[var(--brand-primary)]/10 px-2.5 py-1 text-[11px] font-bold text-indigo-300">
                {location.type}
              </span>
              <span className="font-mono text-xs text-[var(--text-muted)]">
                #{location.id}
              </span>
            </div>
            <div>
              <h3 className="font-bold text-[var(--text-primary)]">
                {location.title}
              </h3>
              <p className="mt-2 flex items-start gap-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--text-muted)]" aria-hidden="true" />
                {location.address}
              </p>
            </div>
            <div className="space-y-2 border-t border-[var(--border-subtle)] pt-4 text-sm text-[var(--text-secondary)]">
              <p className="flex items-center gap-2">
                <User className="h-4 w-4 text-[var(--text-muted)]" aria-hidden="true" />
                <span className="font-semibold text-[var(--text-primary)]">
                  {location.contact}
                </span>
                {location.designation && (
                  <span className="truncate text-xs">({location.designation})</span>
                )}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[var(--text-muted)]" aria-hidden="true" />
                {location.phone}
              </p>
              {location.email && (
                <p className="flex items-center gap-2 break-all">
                  <Mail className="h-4 w-4 shrink-0 text-[var(--text-muted)]" aria-hidden="true" />
                  {location.email}
                </p>
              )}
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}
