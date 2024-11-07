// components/CopyablePre.tsx
import { useState } from "react";
import { CopyIcon } from "../components/icons/copy";

interface CopyablePreProps {
  children: React.ReactNode;
}

const CopyablePre: React.FC<CopyablePreProps> = ({ children }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(children?.toString() || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative flex items-center">
      <pre className="bg-dark-slate-800 w-full text-[11px] sm:text-sm p-1.5 sm:p-2 border border-dark-slate-500 rounded m-1.5 sm:m-4">
        <code>{children}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-0 right-0 mt-1.5 sm:mt-3 mr-2 sm:mr-4 text-gray-400 hover:text-white size-9"
        aria-label="Copy to clipboard"
      >
        <CopyIcon />
      </button>
      {copied && (
        <span className="absolute top-0 mt-3.5 sm:mt-5 mr-2 sm:mr-4 right-8 sm:right-10 text-green-500 text-[11px] sm:text-sm">
          Copied!
        </span>
      )}
    </div>
  );
};

export default CopyablePre;
