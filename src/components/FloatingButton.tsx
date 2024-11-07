// components/FloatingButton.tsx
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBug } from "@fortawesome/free-solid-svg-icons";

const FloatingButton: React.FC = () => {
  return (
    <div className="fixed bottom-8 right-4 hidden lg:block">
      <Link href="/contribute?showForm=true">
        <span className="bg-dark-slate-950 text-dark-slate-100 p-4 rounded-full shadow-lg hover:bg-dark-slate-200 hover:text-black">
          <FontAwesomeIcon icon={faBug} size="lg" />
        </span>
      </Link>
    </div>
  );
};

export default FloatingButton;
