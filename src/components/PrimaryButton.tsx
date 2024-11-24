import React from 'react';
import LoadingButtonSpinner from './LoadingButtonSpinner';

type ButtonProps = Pick<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'onClick' | 'type' | 'disabled' | 'aria-label' | 'name' | 'form' | 'value'
>;

interface PrimaryButtonProps extends ButtonProps {
  loading?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  loading,
  className,
  children,
  disabled,
  type = 'submit',
  ...buttonProps
}) => {
  return (
    <button
      type={type}
      className={`px-4 py-2 font-semibold border border-dark-slate-700 bg-gradient-to-b from-dark-slate-500 to-dark-slate-700 text-dark-slate-50 rounded-lg hover:from-dark-slate-400 hover:to-dark-slate-600 ${className}`}
      disabled={loading || disabled}
      {...buttonProps}
    >
      {loading ? <LoadingButtonSpinner /> : children}
    </button>
  );
};

export default PrimaryButton;
