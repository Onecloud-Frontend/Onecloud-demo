import React from 'react';

interface BaseInputProps {
  label: string;
  required?: boolean;
  error?: string;
  helpText?: string;
}

export const TextInput: React.FC<
  BaseInputProps & React.InputHTMLAttributes<HTMLInputElement>
> = ({ label, required, error, helpText, ...props }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
      <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
        {label} {required && <span style={{ color: 'var(--status-danger, #ef4444)' }}>*</span>}
      </label>
      <input
        {...props}
        style={{
          backgroundColor: 'var(--bg-input, #0f172a)',
          border: error ? '1px solid var(--status-danger, #ef4444)' : '1px solid var(--border-subtle, #334155)',
          borderRadius: 'var(--radius-md, 6px)',
          padding: '9px 12px',
          color: 'var(--text-primary, #f8fafc)',
          fontSize: '13px',
          outline: 'none',
          transition: 'border-color 150ms ease, box-shadow 150ms ease',
          ...props.style,
        }}
        onFocus={(e) => {
          e.target.style.borderColor = 'var(--brand-primary, #6366f1)';
          e.target.style.boxShadow = '0 0 0 2px rgba(99, 102, 241, 0.2)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = error ? 'var(--status-danger, #ef4444)' : 'var(--border-subtle, #334155)';
          e.target.style.boxShadow = 'none';
        }}
      />
      {helpText && <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{helpText}</span>}
      {error && <span style={{ fontSize: '11px', color: 'var(--status-danger, #ef4444)' }}>{error}</span>}
    </div>
  );
};

export const SelectField: React.FC<
  BaseInputProps & React.SelectHTMLAttributes<HTMLSelectElement> & { options: { label: string; value: string }[] }
> = ({ label, required, error, helpText, options, ...props }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
      <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
        {label} {required && <span style={{ color: 'var(--status-danger, #ef4444)' }}>*</span>}
      </label>
      <select
        {...props}
        style={{
          backgroundColor: 'var(--bg-input, #0f172a)',
          border: error ? '1px solid var(--status-danger, #ef4444)' : '1px solid var(--border-subtle, #334155)',
          borderRadius: 'var(--radius-md, 6px)',
          padding: '9px 12px',
          color: 'var(--text-primary, #f8fafc)',
          fontSize: '13px',
          outline: 'none',
          cursor: 'pointer',
          ...props.style,
        }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} style={{ backgroundColor: '#0f172a', color: '#f8fafc' }}>
            {opt.label}
          </option>
        ))}
      </select>
      {helpText && <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{helpText}</span>}
      {error && <span style={{ fontSize: '11px', color: 'var(--status-danger, #ef4444)' }}>{error}</span>}
    </div>
  );
};

export const TextareaField: React.FC<
  BaseInputProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>
> = ({ label, required, error, helpText, ...props }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
      <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
        {label} {required && <span style={{ color: 'var(--status-danger, #ef4444)' }}>*</span>}
      </label>
      <textarea
        rows={props.rows || 3}
        {...props}
        style={{
          backgroundColor: 'var(--bg-input, #0f172a)',
          border: error ? '1px solid var(--status-danger, #ef4444)' : '1px solid var(--border-subtle, #334155)',
          borderRadius: 'var(--radius-md, 6px)',
          padding: '9px 12px',
          color: 'var(--text-primary, #f8fafc)',
          fontSize: '13px',
          outline: 'none',
          resize: 'vertical',
          fontFamily: 'inherit',
          ...props.style,
        }}
        onFocus={(e) => {
          e.target.style.borderColor = 'var(--brand-primary, #6366f1)';
          e.target.style.boxShadow = '0 0 0 2px rgba(99, 102, 241, 0.2)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = error ? 'var(--status-danger, #ef4444)' : 'var(--border-subtle, #334155)';
          e.target.style.boxShadow = 'none';
        }}
      />
      {helpText && <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{helpText}</span>}
      {error && <span style={{ fontSize: '11px', color: 'var(--status-danger, #ef4444)' }}>{error}</span>}
    </div>
  );
};

export const FormRow: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '16px',
        marginBottom: '16px',
      }}
    >
      {children}
    </div>
  );
};
