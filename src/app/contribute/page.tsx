"use client";
import { Suspense } from "react";
import Link from "next/link";
import PrimaryButton from "../../components/PrimaryButton";
import CopyablePre from "../../components/CopyablePre";
import LoadingSpinner from "@/components/LoadingSpinner";

const ContributePageContent = () => {
  return (
    <div className="container mx-auto py-4 px-2 mt-2">
      <div className="mx-auto max-w-5xl px-4 md:px-6 py-4 md:py-6 relative">
        <h1 className="text-3xl font-bold mb-6 md:mb-8 pr-16 md:pr-0 text-center">
          Contribute to PhilaReact
        </h1>
        <div className="absolute top-0 right-0 mt-4 mr-4 md:mt-6 md:mr-6">
          <Link href="https://github.com/dmostoller/philareact" target="_blank" rel="noopener noreferrer">
            <div>
              <svg
                width={48}
                height={48}
                viewBox="0 0 98 96"
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 md:w-12 md:h-12 hover:scale-105 transition-transform duration-300 fill-dark-slate-50 dark:fill-dark-slate-50"
              >
                <path d="M48.9,0C21.8,0,0,22,0,49.2C0,71,14,89.4,33.4,95.9c2.4,0.5,3.3-1.1,3.3-2.4c0-1.1-0.1-5.1-0.1-9.1 c-13.6,2.9-16.4-5.9-16.4-5.9c-2.2-5.7-5.4-7.2-5.4-7.2c-4.4-3,0.3-3,0.3-3c4.9,0.3,7.5,5.1,7.5,5.1c4.4,7.5,11.4,5.4,14.2,4.1 c0.4-3.2,1.7-5.4,3.1-6.6c-10.8-1.1-22.2-5.4-22.2-24.3c0-5.4,1.9-9.8,5-13.2c-0.5-1.2-2.2-6.3,0.5-13c0,0,4.1-1.3,13.4,5.1 c3.9-1.1,8.1-1.6,12.2-1.6s8.3,0.6,12.2,1.6c9.3-6.4,13.4-5.1,13.4-5.1c2.7,6.8,1,11.8,0.5,13c3.2,3.4,5,7.8,5,13.2 c0,18.9-11.4,23.1-22.3,24.3c1.8,1.5,3.3,4.5,3.3,9.1c0,6.6-0.1,11.9-0.1,13.5c0,1.3,0.9,2.9,3.3,2.4C83.6,89.4,97.6,71,97.6,49.2 C97.7,22,75.8,0,48.9,0z" />
              </svg>
            </div>
          </Link>
        </div>
        <p className="mb-4 md:mb-6 text-sm md:text-base text-center">
          We welcome contributions from the community! Here&apos;s how you can get involved:
        </p>
        <ul className="list-disc list-outside ml-4 md:ml-6 mb-6 space-y-4 ">
          <li>
            <strong>Fork the repository on GitHub:</strong> Click the &quot;Fork&quot; button at the top right
            corner of the repository page to create a copy of the repository under your GitHub account.
            <div className="my-2 break-all text-center">
              <Link
                href="https://github.com/dmostoller/philareact"
                target="_blank"
                rel="noopener noreferrer"
                className="text-deep-sapphire-400 font-semibold hover:underline"
              >
                https://github.com/dmostoller/philareact
              </Link>
            </div>
          </li>
          <li>
            <strong>Clone your forked repository:</strong> Use the following command to clone the repository
            to your local machine:
            <div className="mt-2 mb-4 flex justify-center">
              <CopyablePre showCopyIcon={false}>
                <span className="md:hidden">git clone https://github.com/...</span>
                <span className="hidden md:inline">
                  git clone https://github.com/[your-username]/philareact.git
                </span>
              </CopyablePre>
            </div>
          </li>
          <li>
            <strong>Create a new branch:</strong> Create a new branch for your feature or bug fix:
            <div className="mt-2 mb-4 flex justify-center">
              <CopyablePre showCopyIcon={false}>git checkout -b feature/YourFeatureName</CopyablePre>
            </div>
          </li>
          <li>
            <strong>Make your changes:</strong> Implement your feature or bug fix.
          </li>
          <li>
            <strong>Commit your changes:</strong> Commit your changes with a descriptive commit message:
            <div className="mt-2 mb-4 flex justify-center">
              <CopyablePre showCopyIcon={false}>git commit -m &quot;Add new feature&quot;</CopyablePre>
            </div>
          </li>
          <li>
            <strong>Push to your branch:</strong> Push your changes to your forked repository:
            <div className="mt-2 mb-4 flex justify-center">
              <CopyablePre showCopyIcon={false}>git push origin feature/YourFeatureName</CopyablePre>
            </div>
          </li>
          <li>
            <strong>Open a Pull Request:</strong> Go to the original repository and open a pull request to
            merge your changes. Provide a detailed description of your changes and any relevant information.
          </li>
          <li className="mt-6">
            <strong>Other ways to contribute: </strong> If you&apos;ve encountered an issue or bug, please let
            us know by filling out the form below. Your feedback is invaluable in helping us improve the site.
            Thank you for taking the time to help make PhilaReact better!
          </li>
        </ul>
        <div className="text-center mb-6">
          <Link href="/bug-report">
            <PrimaryButton>Report a Bug</PrimaryButton>
          </Link>
        </div>
      </div>
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
