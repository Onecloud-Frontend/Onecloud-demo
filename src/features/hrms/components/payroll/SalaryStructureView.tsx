import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

export const SalaryStructureView: React.FC = () => {
  const [annualCtc, setAnnualCtc] = useState<number>(2400000); // 24 LPA default
  const monthlyCtc = Math.round(annualCtc / 12);

  // Standard enterprise salary structure formulas
  const basicSalary = Math.round(monthlyCtc * 0.45); // 45% of monthly CTC
  const hra = Math.round(basicSalary * 0.5); // 50% of basic
  const conveyanceAllowance = 8000;
  const medicalAllowance = 5000;
  const employerPf = Math.round(basicSalary * 0.12); // 12% of basic
  const gratuity = Math.round(basicSalary * 0.0481); // 4.81%
  const specialAllowance = Math.max(
    0,
    monthlyCtc - (basicSalary + hra + conveyanceAllowance + medicalAllowance + employerPf + gratuity)
  );
  const grossSalary = basicSalary + hra + specialAllowance + conveyanceAllowance + medicalAllowance;

  // Deductions
  const employeePf = Math.round(basicSalary * 0.12);
  const professionalTax = 200;
  const estimatedTds = Math.round(grossSalary * 0.12); // approx 12%
  const totalDeductions = employeePf + professionalTax + estimatedTds;
  const netTakeHome = grossSalary - totalDeductions;

  return (
    <div className="salary-struct-container">
      {/* Top Banner / Calculator */}
      <div className="salary-struct-banner">
        <div style={{ maxWidth: '600px' }}>
          <div className="salary-struct-badge">
            <Calculator size={13} />
            <span>Interactive CTC Breakdown Engine</span>
          </div>
          <h2 className="salary-struct-title">
            Salary Structure &amp; Compensation Rulebook
          </h2>
          <p className="salary-struct-desc">
            Enterprise compensation formula according to statutory labor compliance (Basic 45% of CTC, HRA 50% of Basic, PF 12%, Gratuity 4.81%).
          </p>
        </div>

        {/* Annual CTC Input */}
        <div className="salary-ctc-card">
          <label className="salary-ctc-label">
            Target Annual CTC (INR)
          </label>
          <div className="salary-ctc-input-wrapper">
            <span className="salary-ctc-currency">₹</span>
            <input
              type="number"
              step="50000"
              value={annualCtc}
              onChange={(e) => setAnnualCtc(Number(e.target.value) || 0)}
              className="salary-ctc-input"
            />
          </div>
          <span className="salary-ctc-calc-badge">
            = ₹{(annualCtc / 100000).toFixed(1)} LPA (₹{monthlyCtc.toLocaleString()} / mo)
          </span>
        </div>
      </div>

      {/* Two Column Layout: Earnings Breakdown vs Deductions & Retirals */}
      <div className="salary-columns-grid">
        {/* Left: Monthly Earnings Structure */}
        <div className="salary-column-card">
          <div className="salary-card-header">
            <div>
              <h3 className="salary-card-title">Monthly Earnings (A)</h3>
              <p className="salary-card-subtitle">Direct payroll components disbursed monthly</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Gross Salary</span>
              <div className="salary-gross-total">₹{grossSalary.toLocaleString()}</div>
            </div>
          </div>

          <div>
            <div className="salary-line-item">
              <div>
                <span className="salary-line-name">Basic Salary</span>
                <span className="salary-line-formula">45% of Monthly CTC</span>
              </div>
              <span className="salary-line-value">₹{basicSalary.toLocaleString()}</span>
            </div>

            <div className="salary-line-item">
              <div>
                <span className="salary-line-name">House Rent Allowance (HRA)</span>
                <span className="salary-line-formula">50% of Basic</span>
              </div>
              <span className="salary-line-value">₹{hra.toLocaleString()}</span>
            </div>

            <div className="salary-line-item">
              <div>
                <span className="salary-line-name">Special Allowance</span>
                <span className="salary-line-formula">Balancing component</span>
              </div>
              <span className="salary-line-value">₹{specialAllowance.toLocaleString()}</span>
            </div>

            <div className="salary-line-item">
              <div>
                <span className="salary-line-name">Conveyance Allowance</span>
                <span className="salary-line-formula">Standard tax exempt</span>
              </div>
              <span className="salary-line-value">₹{conveyanceAllowance.toLocaleString()}</span>
            </div>

            <div className="salary-line-item">
              <div>
                <span className="salary-line-name">Medical Allowance</span>
                <span className="salary-line-formula">Fixed executive</span>
              </div>
              <span className="salary-line-value">₹{medicalAllowance.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Right: Deductions, Retirals & Net Take-home */}
        <div className="salary-column-card">
          <div>
            <div className="salary-card-header">
              <div>
                <h3 className="salary-card-title">Statutory Deductions &amp; Retirals (B)</h3>
                <p className="salary-card-subtitle">Regulatory contributions &amp; withholding taxes</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Total Deductions</span>
                <div className="salary-ded-total">₹{totalDeductions.toLocaleString()}</div>
              </div>
            </div>

            <div>
              <div className="salary-line-item">
                <div>
                  <span className="salary-line-name">Employee Provident Fund (EPF)</span>
                  <span className="salary-line-formula">12% of Basic</span>
                </div>
                <span className="salary-line-value deduction">-₹{employeePf.toLocaleString()}</span>
              </div>

              <div className="salary-line-item">
                <div>
                  <span className="salary-line-name">Professional Tax (PT)</span>
                  <span className="salary-line-formula">State compliance</span>
                </div>
                <span className="salary-line-value deduction">-₹{professionalTax.toLocaleString()}</span>
              </div>

              <div className="salary-line-item">
                <div>
                  <span className="salary-line-name">TDS / Income Tax (Estimated)</span>
                  <span className="salary-line-formula">New tax regime</span>
                </div>
                <span className="salary-line-value deduction">-₹{estimatedTds.toLocaleString()}</span>
              </div>

              <div className="salary-company-box">
                <div>
                  <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Employer PF + Gratuity in CTC</span>
                  <span className="salary-line-formula">Company contribution</span>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  ₹{(employerPf + gratuity).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* NET TAKE HOME HIGHLIGHT */}
          <div className="salary-net-box">
            <div>
              <span className="salary-net-label">
                ESTIMATED MONTHLY NET IN-HAND
              </span>
              <p className="salary-net-sub">
                Transferred to employee bank account on 31st
              </p>
            </div>
            <div className="salary-net-value">
              ₹{netTakeHome.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
