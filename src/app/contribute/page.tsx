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
    <div className="container mx-auto p-6 relative mt-4">
      <h1 className="text-3xl font-bold mb-6">Contribute to PhilaReact</h1>
      <div className="absolute top-0 right-0 mt-6 mr-6">
        <Link href="https://github.com/dmostoller/philareact" target="_blank" rel="noopener noreferrer">
          <Image
            src="/github-mark-white.png"
            alt="GitHub Logo"
            width={96}
            height={96}
            className="inline-block w-12 h-12 hover:scale-105 transition-transform duration-300"
          />
        </Link>
      </div>
      <p className="mb-6">
        We welcome contributions from the community! Here&apos;s how you can get involved:
      </p>
      <ul className="list-disc list-inside mb-6">
        <li>
          <strong>Fork the repository on GitHub:</strong> Click the &quot;Fork&quot; button at the top right
          corner of the repository page to create a copy of the repository under your GitHub account.
          <div className="text-center my-2">
            <Link href="https://github.com/dmostoller/philareact" target="_blank" rel="noopener noreferrer">
              <span className="text-deep-sapphire-400 font-semibold hover:underline">
                https://github.com/dmostoller/philareact
              </span>
            </Link>
          </div>
        </li>
        <li>
          <strong>Clone your forked repository:</strong> Use the following command to clone the repository to
          your local machine:
          <CopyablePre>git clone https://github.com/yourusername/philareact.git</CopyablePre>
        </li>
        <li>
          <strong>Create a new branch:</strong> Create a new branch for your feature or bug fix:
          <CopyablePre>git checkout -b feature/YourFeatureName</CopyablePre>
        </li>
        <li>
          <strong>Make your changes:</strong> Implement your feature or bug fix.
        </li>
        <li>
          <strong>Commit your changes:</strong> Commit your changes with a descriptive commit message:
          <CopyablePre>git commit -m &quot;Add new feature&quot;</CopyablePre>
        </li>
        <li>
          <strong>Push to your branch:</strong> Push your changes to your forked repository:
          <CopyablePre>git push origin feature/YourFeatureName</CopyablePre>
        </li>
        <li>
          <strong>Open a Pull Request:</strong> Go to the original repository and open a pull request to merge
          your changes. Provide a detailed description of your changes and any relevant information.
        </li>
        <br></br>
        <li>
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
      <div className="container"></div>
      {showForm && (
        <div className="mb-6 container w-full bg-dark-slate-700 md:w-3/4 lg:w-2/3 mx-auto p-4 rounded-lg border border-dark-slate-500">
          <h2 className="text-2xl font-semibold mb-4 text-center">Report a Bug</h2>
          <BugReportForm onSubmitSuccess={handleFormSubmitSuccess} />
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
