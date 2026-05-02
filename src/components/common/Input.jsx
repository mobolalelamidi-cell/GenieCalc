import React from 'react';

export const Input = ({
  label,
  type = 'text',
  error = '',
  required = false,
  icon,
  ...props
}) => {
  return (
    <div className="input-group">
      {label && (
        <label className="input-label">
          {label}
          {required && <span className="input-required">*</span>}
        </label>
      )}

      <div className={`input-wrapper ${icon ? 'has-icon' : ''}`}>
        {icon && <span className="input-icon">{icon}</span>}
        <input
          type={type}
          className={`input-field ${error ? 'input-error' : ''}`}
          {...props}
        />
      </div>

      {error && <p className="input-error-text">{error}</p>}
    </div>
  );
};

export default Input;
