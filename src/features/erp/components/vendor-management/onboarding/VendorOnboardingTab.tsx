// import { useState, type FormEvent } from "react";
// import { CheckCircle2, Circle, Clock3, Plus, ShieldCheck } from "lucide-react";
// import {
//   Panel,
//   PrimaryButton,
//   StatusBadge,
//   Table,
//   fieldClassName,
//   tableCellClass,
//   tableHeadClass,
//   type VendorRecord,
// } from "../shared";

// const pipeline = [
//   {
//     step: "Step 1: Invite sent",
//     title: "Basic info & GSTIN",
//     note: "8 vendors completed",
//     icon: CheckCircle2,
//     style: "border-emerald-500/25 bg-emerald-500/5 text-emerald-300",
//   },
//   {
//     step: "Step 2: Documents",
//     title: "KYC & financial audit",
//     note: "4 vendors pending review",
//     icon: Clock3,
//     style: "border-[var(--brand-primary)]/30 bg-[var(--brand-primary)]/5 text-indigo-300",
//   },
//   {
//     step: "Step 3: Verification",
//     title: "Bank & address check",
//     note: "2 vendors in queue",
//     icon: Circle,
//     style: "border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-muted)]",
//   },
//   {
//     step: "Step 4: Approval",
//     title: "ERP code creation",
//     note: "Final sign-off",
//     icon: ShieldCheck,
//     style: "border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-muted)]",
//   },
// ];

// const applicants = [
//   {
//     name: "Apex Polychem Pvt Ltd",
//     category: "Raw Chemicals",
//     date: "Oct 02, 2026",
//     phase: "Phase 2: KYC Review",
//     status: "Under Audit",
//   },
//   {
//     name: "Global Logistics Corp",
//     category: "Freight & Logistics",
//     date: "Oct 04, 2026",
//     phase: "Phase 1: Registration",
//     status: "Pending",
//   },
// ];

// export function VendorOnboardingTab({
//   onAddVendor,
// }: {
//   onAddVendor: (vendor: Omit<VendorRecord, "rating" | "status">) => void;
// }) {
//   const [showForm, setShowForm] = useState(false);
//   const [name, setName] = useState("");
//   const [category, setCategory] = useState("");
//   const [gstin, setGstin] = useState("");

//   const submitVendor = (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     onAddVendor({
//       id: `VEN-${String(Date.now()).slice(-6)}`,
//       name: name.trim(),
//       category: category.trim(),
//       gstin: gstin.trim().toUpperCase(),
//     });
//     setName("");
//     setCategory("");
//     setGstin("");
//     setShowForm(false);
//   };

//   return (
//     <Panel>
//       <div className="space-y-6">
//         <div className="flex flex-col gap-4 border-b border-[var(--border-subtle)] pb-5 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <h2 className="text-lg font-bold text-[var(--text-primary)]">
//               Vendor Registration & Onboarding Pipeline
//             </h2>
//             <p className="mt-1 text-sm text-[var(--text-secondary)]">
//               Multi-step approval workflow for new supplier qualification.
//             </p>
//           </div>
//           <PrimaryButton onClick={() => setShowForm((visible) => !visible)}>
//             <Plus className="h-4 w-4" aria-hidden="true" />
//             {showForm ? "Close registration" : "Initiate self-registration"}
//           </PrimaryButton>
//         </div>

//         {showForm && (
//           <form
//             onSubmit={submitVendor}
//             className="grid grid-cols-1 gap-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 sm:grid-cols-2 lg:grid-cols-4"
//           >
//             <label className="space-y-1.5 text-xs font-medium text-[var(--text-secondary)]">
//               Vendor / Company Name
//               <input
//                 className={fieldClassName}
//                 value={name}
//                 onChange={(event) => setName(event.target.value)}
//                 required
//                 maxLength={100}
//               />
//             </label>
//             <label className="space-y-1.5 text-xs font-medium text-[var(--text-secondary)]">
//               Category
//               <input
//                 className={fieldClassName}
//                 value={category}
//                 onChange={(event) => setCategory(event.target.value)}
//                 required
//                 maxLength={60}
//               />
//             </label>
//             <label className="space-y-1.5 text-xs font-medium text-[var(--text-secondary)]">
//               GSTIN Number
//               <input
//                 className={fieldClassName}
//                 value={gstin}
//                 onChange={(event) => setGstin(event.target.value)}
//                 pattern="[0-9A-Za-z]{15}"
//                 title="Enter a 15-character GSTIN."
//                 maxLength={15}
//               />
//             </label>
//             <div className="flex items-end">
//               <PrimaryButton className="w-full" type="submit">
//                 Add to directory
//               </PrimaryButton>
//             </div>
//           </form>
//         )}

//         <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
//           {pipeline.map(({ step, title, note, icon: Icon, style }) => (
//             <div
//               key={step}
//               className={`rounded-xl border p-4 ${style}`}
//             >
//               <div className="flex items-center justify-between gap-2">
//                 <span className="text-xs font-bold uppercase tracking-wider">
//                   {step}
//                 </span>
//                 <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
//               </div>
//               <h3 className="mt-3 text-sm font-semibold text-[var(--text-primary)]">
//                 {title}
//               </h3>
//               <p className="mt-1 text-xs text-[var(--text-secondary)]">{note}</p>
//             </div>
//           ))}
//         </div>

//         <div>
//           <h3 className="text-sm font-semibold text-[var(--text-primary)]">
//             Applications requiring attention
//           </h3>
//           <Table minWidth="min-w-[640px]">
//             <thead>
//               <tr>
//                 <th className={tableHeadClass}>Applicant</th>
//                 <th className={tableHeadClass}>Category</th>
//                 <th className={tableHeadClass}>Submitted</th>
//                 <th className={tableHeadClass}>Current phase</th>
//                 <th className={`${tableHeadClass} text-right`}>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {applicants.map((applicant) => (
//                 <tr key={applicant.name}>
//                   <td className={`${tableCellClass} font-semibold text-[var(--text-primary)]`}>
//                     {applicant.name}
//                   </td>
//                   <td className={tableCellClass}>{applicant.category}</td>
//                   <td className={tableCellClass}>{applicant.date}</td>
//                   <td className={tableCellClass}>{applicant.phase}</td>
//                   <td className={`${tableCellClass} text-right`}>
//                     <StatusBadge status={applicant.status} />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </div>
//       </div>
//     </Panel>
//   );
// }


import { useState, type FormEvent } from "react";
import {
  CheckCircle2,
  Circle,
  Clock3,
  FileCheck2,
  FileText,
  Plus,
  ShieldCheck,
  Upload,
  UserCheck,
  XCircle,
} from "lucide-react";

import {
  Panel,
  PrimaryButton,
  StatusBadge,
  Table,
  fieldClassName,
  tableCellClass,
  tableHeadClass,
  type VendorRecord,
} from "../shared";

type StepStatus = "Completed" | "In Progress" | "Pending";

type OnboardingStep = {
  step: number;
  title: string;
  description: string;
  status: StepStatus;
};

type VendorForm = {
  companyName: string;
  vendorType: string;
  category: string;
  gstin: string;
  pan: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
};

type Documents = {
  gstCertificate: boolean;
  panCard: boolean;
  registrationCertificate: boolean;
  bankProof: boolean;
  addressProof: boolean;
};

type Verification = {
  gstin: StepStatus;
  pan: StepStatus;
  bank: StepStatus;
  address: StepStatus;
  contact: StepStatus;
};

type Applicant = {
  name: string;
  category: string;
  date: string;
  phase: string;
  status: string;
};

const initialVendorForm: VendorForm = {
  companyName: "",
  vendorType: "",
  category: "",
  gstin: "",
  pan: "",
  contactPerson: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
};

const initialDocuments: Documents = {
  gstCertificate: false,
  panCard: false,
  registrationCertificate: false,
  bankProof: false,
  addressProof: false,
};

const initialVerification: Verification = {
  gstin: "Pending",
  pan: "Pending",
  bank: "Pending",
  address: "Pending",
  contact: "Pending",
};

const initialApplicants: Applicant[] = [
  {
    name: "Apex Polychem Pvt Ltd",
    category: "Raw Chemicals",
    date: "Oct 02, 2026",
    phase: "Phase 2: Document Review",
    status: "Under Audit",
  },
  {
    name: "Global Logistics Corp",
    category: "Freight & Logistics",
    date: "Oct 04, 2026",
    phase: "Phase 1: Registration",
    status: "Pending",
  },
];

export function VendorOnboardingTab({
  onAddVendor,
}: {
  onAddVendor: (vendor: Omit<VendorRecord, "rating" | "status">) => void;
}) {
  const [activeStep, setActiveStep] = useState(1);
  const [showForm, setShowForm] = useState(false);

  const [vendorForm, setVendorForm] =
    useState<VendorForm>(initialVendorForm);

  const [documents, setDocuments] =
    useState<Documents>(initialDocuments);

  const [verification, setVerification] =
    useState<Verification>(initialVerification);

  const [approvalRemarks, setApprovalRemarks] = useState("");
  const [erpVendorCode, setErpVendorCode] = useState("");

  const [applicants, setApplicants] =
    useState<Applicant[]>(initialApplicants);

  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const isStepCompleted = (step: number) =>
    completedSteps.includes(step);

  const getStepStatus = (step: number): StepStatus => {
    if (isStepCompleted(step)) {
      return "Completed";
    }

    if (activeStep === step) {
      return "In Progress";
    }

    return "Pending";
  };

  const steps: OnboardingStep[] = [
    {
      step: 1,
      title: "Vendor Registration",
      description: "Basic vendor information & GSTIN",
      status: getStepStatus(1),
    },
    {
      step: 2,
      title: "Document Verification",
      description: "KYC & financial documents",
      status: getStepStatus(2),
    },
    {
      step: 3,
      title: "Vendor Verification",
      description: "GST, PAN, bank & address checks",
      status: getStepStatus(3),
    },
    {
      step: 4,
      title: "Final Approval",
      description: "Approval & ERP code creation",
      status: getStepStatus(4),
    },
  ];

  const updateVendorField = (
    field: keyof VendorForm,
    value: string,
  ) => {
    setVendorForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleRegistration = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setCompletedSteps((previous) =>
      previous.includes(1) ? previous : [...previous, 1],
    );

    setActiveStep(2);
  };

  const handleDocumentSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const allDocumentsUploaded =
      Object.values(documents).every(Boolean);

    if (!allDocumentsUploaded) {
      return;
    }

    setCompletedSteps((previous) =>
      previous.includes(2) ? previous : [...previous, 2],
    );

    setActiveStep(3);
  };

  const handleVerification = () => {
    const verified: Verification = {
      gstin: "Completed",
      pan: "Completed",
      bank: "Completed",
      address: "Completed",
      contact: "Completed",
    };

    setVerification(verified);

    setCompletedSteps((previous) =>
      previous.includes(3) ? previous : [...previous, 3],
    );

    setActiveStep(4);
  };

  const handleApproval = () => {
    if (!approvalRemarks.trim()) {
      return;
    }

    const generatedCode = `VND-${String(
      Date.now(),
    ).slice(-6)}`;

    setErpVendorCode(generatedCode);

    setCompletedSteps((previous) =>
      previous.includes(4) ? previous : [...previous, 4],
    );

    onAddVendor({
      id: generatedCode,
      name: vendorForm.companyName.trim(),
      category: vendorForm.category.trim(),
      gstin: vendorForm.gstin.trim().toUpperCase(),
    });

    setApplicants((previous) => [
      {
        name: vendorForm.companyName,
        category: vendorForm.category,
        date: "Oct 07, 2026",
        phase: "Phase 4: Approved",
        status: "Active",
      },
      ...previous,
    ]);
  };

  const resetRegistration = () => {
    setVendorForm(initialVendorForm);
    setDocuments(initialDocuments);
    setVerification(initialVerification);
    setApprovalRemarks("");
    setErpVendorCode("");
    setCompletedSteps([]);
    setActiveStep(1);
    setShowForm(false);
  };

  return (
    <Panel>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-[var(--border-subtle)] pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              Vendor Registration & Onboarding
            </h2>

            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Complete the vendor registration, verification and
              approval workflow.
            </p>
          </div>

          <PrimaryButton
            onClick={() => setShowForm((previous) => !previous)}
          >
            <Plus className="h-4 w-4" />

            {showForm
              ? "Close onboarding"
              : "Initiate self-registration"}
          </PrimaryButton>
        </div>

        {/* Progress */}
        <div>
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">
              Onboarding Progress
            </h3>

            <p className="mt-1 text-xs text-[var(--text-secondary)]">
              Complete each stage to activate the vendor.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {steps.map((item) => {
              const completed =
                item.status === "Completed";

              const inProgress =
                item.status === "In Progress";

              return (
                <button
                  key={item.step}
                  type="button"
                  onClick={() => {
                    if (
                      item.step === 1 ||
                      isStepCompleted(item.step - 1) ||
                      isStepCompleted(item.step)
                    ) {
                      setActiveStep(item.step);
                      setShowForm(true);
                    }
                  }}
                  className={`rounded-xl border p-4 text-left transition ${
                    completed
                      ? "border-emerald-200 bg-emerald-50"
                      : inProgress
                        ? "border-[var(--brand-primary)]/30 bg-[var(--brand-primary)]/5"
                        : "border-[var(--border-subtle)] bg-[var(--bg-surface)]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                          completed
                            ? "bg-emerald-100 text-emerald-700"
                            : inProgress
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {completed ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          item.step
                        )}
                      </span>

                      <span className="text-xs font-semibold text-[var(--text-secondary)]">
                        Step {item.step}
                      </span>
                    </div>

                    {completed ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    ) : inProgress ? (
                      <Clock3 className="h-4 w-4 text-blue-600" />
                    ) : (
                      <Circle className="h-4 w-4 text-gray-400" />
                    )}
                  </div>

                  <h4 className="mt-4 text-sm font-semibold text-[var(--text-primary)]">
                    {item.title}
                  </h4>

                  <p className="mt-1 text-xs text-[var(--text-secondary)]">
                    {item.description}
                  </p>

                  <span
                    className={`mt-3 inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${
                      completed
                        ? "bg-emerald-100 text-emerald-700"
                        : inProgress
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {item.status}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        {showForm && (
          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5">
            {/* STEP 1 */}
            {activeStep === 1 && (
              <form
                onSubmit={handleRegistration}
                className="space-y-5"
              >
                <div>
                  <h3 className="text-base font-semibold text-[var(--text-primary)]">
                    Step 1: Vendor Registration
                  </h3>

                  <p className="mt-1 text-xs text-[var(--text-secondary)]">
                    Enter the basic information required to
                    register the vendor.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <label className="space-y-1.5 text-xs font-medium text-[var(--text-secondary)]">
                    Vendor / Company Name
                    <input
                      className={fieldClassName}
                      value={vendorForm.companyName}
                      onChange={(event) =>
                        updateVendorField(
                          "companyName",
                          event.target.value,
                        )
                      }
                      required
                      placeholder="Enter company name"
                    />
                  </label>

                  <label className="space-y-1.5 text-xs font-medium text-[var(--text-secondary)]">
                    Vendor Type
                    <select
                      className={fieldClassName}
                      value={vendorForm.vendorType}
                      onChange={(event) =>
                        updateVendorField(
                          "vendorType",
                          event.target.value,
                        )
                      }
                      required
                    >
                      <option value="">Select type</option>
                      <option value="Supplier">Supplier</option>
                      <option value="Manufacturer">
                        Manufacturer
                      </option>
                      <option value="Service Provider">
                        Service Provider
                      </option>
                      <option value="Distributor">
                        Distributor
                      </option>
                    </select>
                  </label>

                  <label className="space-y-1.5 text-xs font-medium text-[var(--text-secondary)]">
                    Category
                    <input
                      className={fieldClassName}
                      value={vendorForm.category}
                      onChange={(event) =>
                        updateVendorField(
                          "category",
                          event.target.value,
                        )
                      }
                      required
                      placeholder="e.g. Raw Materials"
                    />
                  </label>

                  <label className="space-y-1.5 text-xs font-medium text-[var(--text-secondary)]">
                    GSTIN
                    <input
                      className={fieldClassName}
                      value={vendorForm.gstin}
                      onChange={(event) =>
                        updateVendorField(
                          "gstin",
                          event.target.value.toUpperCase(),
                        )
                      }
                      pattern="[0-9A-Za-z]{15}"
                      maxLength={15}
                      required
                      placeholder="15-character GSTIN"
                    />
                  </label>

                  <label className="space-y-1.5 text-xs font-medium text-[var(--text-secondary)]">
                    PAN
                    <input
                      className={fieldClassName}
                      value={vendorForm.pan}
                      onChange={(event) =>
                        updateVendorField(
                          "pan",
                          event.target.value.toUpperCase(),
                        )
                      }
                      pattern="[A-Za-z]{5}[0-9]{4}[A-Za-z]"
                      maxLength={10}
                      required
                      placeholder="ABCDE1234F"
                    />
                  </label>

                  <label className="space-y-1.5 text-xs font-medium text-[var(--text-secondary)]">
                    Contact Person
                    <input
                      className={fieldClassName}
                      value={vendorForm.contactPerson}
                      onChange={(event) =>
                        updateVendorField(
                          "contactPerson",
                          event.target.value,
                        )
                      }
                      required
                      placeholder="Contact person"
                    />
                  </label>

                  <label className="space-y-1.5 text-xs font-medium text-[var(--text-secondary)]">
                    Email
                    <input
                      type="email"
                      className={fieldClassName}
                      value={vendorForm.email}
                      onChange={(event) =>
                        updateVendorField(
                          "email",
                          event.target.value,
                        )
                      }
                      required
                      placeholder="vendor@example.com"
                    />
                  </label>

                  <label className="space-y-1.5 text-xs font-medium text-[var(--text-secondary)]">
                    Phone
                    <input
                      type="tel"
                      className={fieldClassName}
                      value={vendorForm.phone}
                      onChange={(event) =>
                        updateVendorField(
                          "phone",
                          event.target.value,
                        )
                      }
                      required
                      placeholder="+91 98765 43210"
                    />
                  </label>

                  <label className="space-y-1.5 text-xs font-medium text-[var(--text-secondary)]">
                    City
                    <input
                      className={fieldClassName}
                      value={vendorForm.city}
                      onChange={(event) =>
                        updateVendorField(
                          "city",
                          event.target.value,
                        )
                      }
                      required
                    />
                  </label>

                  <label className="space-y-1.5 text-xs font-medium text-[var(--text-secondary)]">
                    State
                    <select
                      className={fieldClassName}
                      value={vendorForm.state}
                      onChange={(event) =>
                        updateVendorField(
                          "state",
                          event.target.value,
                        )
                      }
                      required
                    >
                      <option value="">Select state</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Tamil Nadu">
                        Tamil Nadu
                      </option>
                      <option value="Maharashtra">
                        Maharashtra
                      </option>
                      <option value="Telangana">
                        Telangana
                      </option>
                      <option value="Delhi">Delhi</option>
                    </select>
                  </label>

                  <label className="space-y-1.5 text-xs font-medium text-[var(--text-secondary)]">
                    PIN Code
                    <input
                      className={fieldClassName}
                      value={vendorForm.pincode}
                      onChange={(event) =>
                        updateVendorField(
                          "pincode",
                          event.target.value,
                        )
                      }
                      maxLength={6}
                      required
                    />
                  </label>

                  <label className="space-y-1.5 text-xs font-medium text-[var(--text-secondary)] sm:col-span-2 lg:col-span-3">
                    Address
                    <textarea
                      className={`${fieldClassName} min-h-20`}
                      value={vendorForm.address}
                      onChange={(event) =>
                        updateVendorField(
                          "address",
                          event.target.value,
                        )
                      }
                      required
                      placeholder="Enter complete business address"
                    />
                  </label>
                </div>

                <div className="flex justify-end">
                  <PrimaryButton type="submit">
                    Save & Continue
                  </PrimaryButton>
                </div>
              </form>
            )}

            {/* STEP 2 */}
            {activeStep === 2 && (
              <form
                onSubmit={handleDocumentSubmit}
                className="space-y-5"
              >
                <div>
                  <h3 className="text-base font-semibold text-[var(--text-primary)]">
                    Step 2: Document Verification
                  </h3>

                  <p className="mt-1 text-xs text-[var(--text-secondary)]">
                    Upload and review the required vendor
                    documents.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {[
                    {
                      key: "gstCertificate",
                      title: "GST Certificate",
                      description:
                        "Official GST registration certificate",
                    },
                    {
                      key: "panCard",
                      title: "PAN Card",
                      description: "Company PAN document",
                    },
                    {
                      key: "registrationCertificate",
                      title: "Company Registration",
                      description:
                        "Company incorporation/registration proof",
                    },
                    {
                      key: "bankProof",
                      title: "Bank Account Proof",
                      description:
                        "Cancelled cheque or bank statement",
                    },
                    {
                      key: "addressProof",
                      title: "Address Proof",
                      description:
                        "Registered business address proof",
                    },
                  ].map((document) => {
                    const uploaded =
                      documents[
                        document.key as keyof Documents
                      ];

                    return (
                      <div
                        key={document.key}
                        className="flex items-center justify-between rounded-xl border border-[var(--border-subtle)] p-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="rounded-lg bg-blue-50 p-2">
                            <FileText className="h-5 w-5 text-blue-600" />
                          </div>

                          <div>
                            <p className="text-sm font-medium text-[var(--text-primary)]">
                              {document.title}
                            </p>

                            <p className="text-xs text-[var(--text-secondary)]">
                              {document.description}
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            setDocuments((previous) => ({
                              ...previous,
                              [document.key]: !uploaded,
                            }))
                          }
                          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium ${
                            uploaded
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-blue-50 text-blue-700"
                          }`}
                        >
                          {uploaded ? (
                            <>
                              <CheckCircle2 className="h-4 w-4" />
                              Uploaded
                            </>
                          ) : (
                            <>
                              <Upload className="h-4 w-4" />
                              Upload
                            </>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-end">
                  <PrimaryButton
                    type="submit"
                    disabled={!Object.values(documents).every(Boolean)}
                  >
                    Submit for Verification
                  </PrimaryButton>
                </div>
              </form>
            )}

            {/* STEP 3 */}
            {activeStep === 3 && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-base font-semibold text-[var(--text-primary)]">
                    Step 3: Vendor Verification
                  </h3>

                  <p className="mt-1 text-xs text-[var(--text-secondary)]">
                    Verify the vendor information before final
                    approval.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {[
                    {
                      key: "gstin",
                      title: "GSTIN Verification",
                      description:
                        "Validate vendor GST registration",
                    },
                    {
                      key: "pan",
                      title: "PAN Verification",
                      description:
                        "Verify company PAN details",
                    },
                    {
                      key: "bank",
                      title: "Bank Verification",
                      description:
                        "Verify vendor bank account",
                    },
                    {
                      key: "address",
                      title: "Address Verification",
                      description:
                        "Verify registered business address",
                    },
                    {
                      key: "contact",
                      title: "Contact Verification",
                      description:
                        "Verify vendor contact information",
                    },
                  ].map((item) => {
                    const status =
                      verification[
                        item.key as keyof Verification
                      ];

                    const verified = status === "Completed";

                    return (
                      <div
                        key={item.key}
                        className="flex items-center justify-between rounded-xl border border-[var(--border-subtle)] p-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="rounded-lg bg-blue-50 p-2">
                            <UserCheck className="h-5 w-5 text-blue-600" />
                          </div>

                          <div>
                            <p className="text-sm font-medium text-[var(--text-primary)]">
                              {item.title}
                            </p>

                            <p className="text-xs text-[var(--text-secondary)]">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        <span
                          className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                            verified
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {verified
                            ? "Verified"
                            : "Pending"}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-end">
                  <PrimaryButton
                    onClick={handleVerification}
                  >
                    <FileCheck2 className="h-4 w-4" />
                    Complete Verification
                  </PrimaryButton>
                </div>
              </div>
            )}

            {/* STEP 4 */}
            {activeStep === 4 && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-base font-semibold text-[var(--text-primary)]">
                    Step 4: Final Approval
                  </h3>

                  <p className="mt-1 text-xs text-[var(--text-secondary)]">
                    Review the complete vendor profile and
                    approve the vendor.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  <div className="rounded-xl border border-[var(--border-subtle)] p-4">
                    <p className="text-xs text-[var(--text-secondary)]">
                      Vendor
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">
                      {vendorForm.companyName || "Demo Vendor"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-[var(--border-subtle)] p-4">
                    <p className="text-xs text-[var(--text-secondary)]">
                      GSTIN
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">
                      {vendorForm.gstin || "-"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-[var(--border-subtle)] p-4">
                    <p className="text-xs text-[var(--text-secondary)]">
                      Category
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">
                      {vendorForm.category || "-"}
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-[var(--border-subtle)]">
                  <div className="border-b border-[var(--border-subtle)] p-4">
                    <h4 className="text-sm font-semibold text-[var(--text-primary)]">
                      Verification Summary
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 lg:grid-cols-5">
                    {Object.entries(verification).map(
                      ([key, status]) => (
                        <div
                          key={key}
                          className="flex items-center gap-2"
                        >
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" />

                          <span className="text-xs capitalize text-[var(--text-secondary)]">
                            {key} Verified
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div>
                  <label className="space-y-1.5 text-xs font-medium text-[var(--text-secondary)]">
                    Approval Remarks

                    <textarea
                      className={`${fieldClassName} min-h-24`}
                      value={approvalRemarks}
                      onChange={(event) =>
                        setApprovalRemarks(
                          event.target.value,
                        )
                      }
                      placeholder="Enter approval remarks"
                      required
                    />
                  </label>
                </div>

                {erpVendorCode && (
                  <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />

                    <div>
                      <p className="text-sm font-semibold text-emerald-800">
                        Vendor Approved Successfully
                      </p>

                      <p className="text-xs text-emerald-700">
                        ERP Vendor Code: {erpVendorCode}
                      </p>
                    </div>
                  </div>
                )}

                {!erpVendorCode && (
                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600"
                      onClick={() =>
                        setApprovalRemarks(
                          "Vendor rejected during final review.",
                        )
                      }
                    >
                      <XCircle className="h-4 w-4" />
                      Reject
                    </button>

                    <PrimaryButton
                      onClick={handleApproval}
                    >
                      <ShieldCheck className="h-4 w-4" />
                      Approve Vendor
                    </PrimaryButton>
                  </div>
                )}

                {erpVendorCode && (
                  <div className="flex justify-end">
                    <PrimaryButton
                      onClick={resetRegistration}
                    >
                      Register Another Vendor
                    </PrimaryButton>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Applications */}
        <div>
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">
              Applications Requiring Attention
            </h3>

            <p className="mt-1 text-xs text-[var(--text-secondary)]">
              Review vendor applications currently in the
              onboarding process.
            </p>
          </div>

          <Table minWidth="min-w-[700px]">
            <thead>
              <tr>
                <th className={tableHeadClass}>
                  Applicant
                </th>

                <th className={tableHeadClass}>
                  Category
                </th>

                <th className={tableHeadClass}>
                  Submitted
                </th>

                <th className={tableHeadClass}>
                  Current Phase
                </th>

                <th
                  className={`${tableHeadClass} text-right`}
                >
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {applicants.map((applicant) => (
                <tr key={`${applicant.name}-${applicant.date}`}>
                  <td
                    className={`${tableCellClass} font-semibold text-[var(--text-primary)]`}
                  >
                    {applicant.name}
                  </td>

                  <td className={tableCellClass}>
                    {applicant.category}
                  </td>

                  <td className={tableCellClass}>
                    {applicant.date}
                  </td>

                  <td className={tableCellClass}>
                    {applicant.phase}
                  </td>

                  <td
                    className={`${tableCellClass} text-right`}
                  >
                    <StatusBadge status={applicant.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </Panel>
  );
}