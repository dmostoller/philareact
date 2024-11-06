// components/LoadingButtonSpinner.tsx

import React from "react";

const LoadingButtonSpinner: React.FC = () => {
  return (
        <div className="flex justify-center items-center">
    <div className="relative w-6 h-6">
      <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
    </div>
  );
};

export default LoadingButtonSpinner;