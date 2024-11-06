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
      className={`px-4 py-2 font-semibold bg-gradient-to-b from-deep-sapphire-500 to-deep-sapphire-600 text-white rounded-lg hover:from-deep-sapphire-600 hover:to-deep-sapphire-700 ${className}`}
      disabled={loading}
      {...props}
    >
      {loading ? <LoadingButtonSpinner /> : children}
    </button>
  );
};

export default PrimaryButton;
