'use client';

import { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import LoadingSpinner from "../../../components/LoadingSpinner";


export default function SignInPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-6">Sign In</h1>
      <p className="mb-4">Sign in with your Google account to join the community.</p>
      <button
        onClick={() => signIn('google')}
        className="px-6 py-3 bg-gradient-to-b from-deep-sapphire-500 to-deep-sapphire-600 text-white rounded-lg transition transform hover:scale-105 duration-300 hover:from-deep-sapphire-600 hover:to-deep-sapphire-700"      >
        Sign in with Google
      </button>
    </div>
  );
}