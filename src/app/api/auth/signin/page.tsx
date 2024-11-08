"use client";

import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import GoogleButton from "../../../../components/GoogleButton";
import GithubButton from "@/components/GithubButton";
import Link from "next/link";

export default function SignInPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-dark-slate-950 px-2">
      <div className="w-full max-w-md px-4 py-8 space-y-6 bg-dark-slate-900 rounded-xl shadow-xl border border-dark-slate-700">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Welcome</h1>
          <p className="text-dark-slate-100 font-medium">Sign in or create an account to get started</p>
        </div>

        <div className="space-y-6">
          <div className="py-6 border border-dark-slate-600 rounded-lg bg-dark-slate-700">
            <h2 className="text-lg font-semibold mb-4 text-center">Continue with</h2>
            <div className="flex justify-center space-x-4">
              <GoogleButton onClick={() => signIn("google")} />
              <GithubButton onClick={() => signIn("github")} />
            </div>
          </div>

          <div className="text-sm text-dark-slate-200 space-y-3">
            <p className="text-center font-medium">New user? Your account will be created automatically</p>
            <p className="text-center">
              We only request basic profile access to create your secure account. Your data stays private and
              we never post on your behalf.
            </p>
            <p className="text-center text-xs text-dark-slate-300">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>

        <div className="text-center text-sm text-dark-slate-200">
          <p>
            Questions?{" "}
            <Link href="/forum" className="text-blue-400 hover:text-blue-300">
              Ask the community
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
