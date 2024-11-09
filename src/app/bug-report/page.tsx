"use client";
import { Suspense } from "react";
import BugReportForm from "../../components/BugReportForm";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useRouter } from "next/navigation";
import { Bug } from "lucide-react";

const BugReportContent = () => {
  const router = useRouter();

  const handleFormSubmitSuccess = () => {
    router.push("/contribute");
  };

  return (
    <div className="container mx-auto py-6 px-2">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-6 py-4 md:py-6">
        <h1 className="text-3xl font-bold mb-6 text-center">
          <div className="flex justify-center items-center">
            <Bug size={32} className="mr-2" />
            Report a Bug
          </div>
        </h1>
        <div className="w-full bg-dark-slate-800 rounded-lg border border-dark-slate-500 p-4 md:p-6">
          <BugReportForm onSubmitSuccess={handleFormSubmitSuccess} />
        </div>
      </div>
    </div>
  );
};

const BugReportPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <BugReportContent />
    </Suspense>
  );
};

export default BugReportPage;
