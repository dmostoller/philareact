// components/CopyablePre.tsx
import { useState } from 'react';
import { CopyIcon } from '../components/icons/copy';

interface CopyablePreProps {
  children: React.ReactNode;
  showCopyIcon?: boolean; // Add optional prop
}

const CopyablePre: React.FC<CopyablePreProps> = ({
  children,
  showCopyIcon = true, // Default to true
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(children?.toString() || '');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex items-center max-w-3xl">
      <pre className="bg-dark-slate-900 flex-1 text-[11px] p-1.5 sm:p-2 text-xs md:text-sm border border-dark-slate-600 rounded m-1.5 sm:m-4">
        <code>{children}</code>
      </pre>
      {showCopyIcon && (
        <div className="flex flex-col items-end mr-2 sm:mr-4 mt-1.5 sm:mt-3">
          <button
            onClick={handleCopy}
            className="text-gray-400 hover:text-white size-9"
            aria-label="Copy to clipboard"
          >
            <CopyIcon />
          </button>
          {copied && <span className="text-green-500 text-[11px] sm:text-sm">Copied!</span>}
        </div>
      )}
    </div>
  );
};

export default CopyablePre;
