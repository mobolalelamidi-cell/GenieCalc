import React from 'react';

export const Input = ({
  label,
  type = 'text',
  error = '',
  required = false,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        className={`input-field ${error ? 'input-error' : ''}`}
        {...props}
      />
      {error && (
        <p style={{ color: '#dc2626', fontSize: '0.875rem' }}>{error}</p>
      )}
    </div>
  );
};

export default Input;
