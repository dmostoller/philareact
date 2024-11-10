// components/FloatingButton.tsx
import Link from 'next/link';
import { Bug } from 'lucide-react';

const BugButton: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 hidden lg:block">
      <Link href="/bug-report">
        <button
          className="bg-dark-slate-600 text-dark-slate-100 p-3 rounded-full shadow-lg 
                 hover:bg-dark-slate-200 hover:text-dark-slate-900
                 transition-colors duration-200"
          aria-label="Report a bug"
          type="button"
        >
          <Bug aria-hidden="true" />
        </button>
      </Link>
    </div>
  );
};

export default BugButton;
