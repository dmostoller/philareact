import React from 'react';
import LoadingButtonSpinner from './LoadingButtonSpinner';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  className?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ loading, className, children, ...props }) => {
  return (
    <button
      type="submit"
      className={`px-4 py-2 font-semibold border border-dark-slate-700 bg-gradient-to-b from-dark-slate-500 to-dark-slate-700 text-dark-slate-50 rounded-lg hover:from-dark-slate-400 hover:to-dark-slate-600 ${className}`}
      disabled={loading}
      {...props}
    >
      {loading ? <LoadingButtonSpinner /> : children}
    </button>
  );
};

export default PrimaryButton;
