"use client";
import { Suspense, useState, useEffect } from "react";
import BugReportForm from "../../components/BugReportForm";
import Link from "next/link";
import Image from "next/image";
import PrimaryButton from "../../components/PrimaryButton";
import CopyablePre from "../../components/CopyablePre";
import { useSearchParams } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";

const ContributePageContent = () => {
  const [showForm, setShowForm] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("showForm") === "true") {
      setShowForm(true);
    }
  }, [searchParams]);

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  const handleFormSubmitSuccess = () => {
    setShowForm(false);
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-4 md:py-6 relative mt-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 pr-16 md:pr-0 text-center">
        Contribute to PhilaReact
      </h1>

      <div className="absolute top-0 right-0 mt-2 mr-8 md:mt-6 md:mr-6">
        <Link href="https://github.com/dmostoller/philareact" target="_blank" rel="noopener noreferrer">
          <Image
            src="/github-mark-white.png"
            alt="GitHub Logo"
            width={96}
            height={96}
            className="inline-block w-10 h-10 md:w-12 md:h-12 hover:scale-105 transition-transform duration-300"
          />
        </Link>
      </div>

      <p className="mb-4 md:mb-6 text-sm md:text-base text-center">
        We welcome contributions from the community! Here&apos;s how you can get involved:
      </p>

      <ul className="list-disc list-outside ml-4 md:ml-6 mb-6 space-y-4 text-sm md:text-base">
        <li>
          <strong>Fork the repository on GitHub:</strong> Click the &quot;Fork&quot; button at the top right
          corner of the repository page to create a copy of the repository under your GitHub account.
          <div className="my-2 break-all">
            <Link
              href="https://github.com/dmostoller/philareact"
              target="_blank"
              rel="noopener noreferrer"
              className="text-deep-sapphire-400 font-semibold hover:underline text-sm md:text-base"
            >
              https://github.com/dmostoller/philareact
            </Link>
          </div>
        </li>
        <li>
          <strong>Clone your forked repository:</strong> Use the following command to clone the repository to
          your local machine:
          <div className="mt-2 mb-4">
            <CopyablePre showCopyIcon={false}>
              git clone https://github.com/username/philareact.git
            </CopyablePre>
          </div>
        </li>
        <li>
          <strong>Create a new branch:</strong> Create a new branch for your feature or bug fix:
          <div className="mt-2 mb-4">
            <CopyablePre showCopyIcon={false}>git checkout -b feature/YourFeatureName</CopyablePre>
          </div>
        </li>
        <li>
          <strong>Make your changes:</strong> Implement your feature or bug fix.
        </li>
        <li>
          <strong>Commit your changes:</strong> Commit your changes with a descriptive commit message:
          <div className="mt-2 mb-4">
            <CopyablePre showCopyIcon={false}>git commit -m &quot;Add new feature&quot;</CopyablePre>
          </div>
        </li>
        <li>
          <strong>Push to your branch:</strong> Push your changes to your forked repository:
          <div className="mt-2 mb-4">
            <CopyablePre showCopyIcon={false}>git push origin feature/YourFeatureName</CopyablePre>
          </div>
        </li>
        <li>
          <strong>Open a Pull Request:</strong> Go to the original repository and open a pull request to merge
          your changes. Provide a detailed description of your changes and any relevant information.
        </li>
        <li className="mt-6">
          <strong>Other ways to contribute: </strong> If you&apos;ve encountered an issue or bug, please let
          us know by filling out the form below. Your feedback is invaluable in helping us improve the site.
          Thank you for taking the time to help make PhilaReact better!
        </li>
      </ul>

      <div className="text-center mb-6">
        <PrimaryButton onClick={toggleFormVisibility}>
          {showForm ? "Hide Bug Report Form" : "Report a Bug"}
        </PrimaryButton>
      </div>

      {showForm && (
        <div className="mb-6 w-full bg-dark-slate-800 max-w-3xl mx-auto rounded-lg border border-dark-slate-500 p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center">Report a Bug</h2>
          <div className="max-w-3xl mx-auto">
            <BugReportForm onSubmitSuccess={handleFormSubmitSuccess} />
          </div>
        </div>
      )}
    </div>
  );
};

const ContributePage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ContributePageContent />
    </Suspense>
  );
};

export default ContributePage;
