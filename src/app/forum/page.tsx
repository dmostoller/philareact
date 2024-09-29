'use client'
import Forum from '../components/Forum';
import { useSession, signIn, signOut } from 'next-auth/react';

const ForumPage = () => {
  const { data: session } = useSession();

  return (
      <section className="container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-6">Community Forum</h2>
        {!session ? (
          <button onClick={() => signIn('google')} className="bg-primary text-white px-4 py-2 rounded">
            Sign in to join the forum
          </button>
        ) : (
          <>
            <p>Welcome, {session.user?.name}</p>
            <Forum />
            <button onClick={() => signOut()} className="mt-4 text-primary">
              Sign out
            </button>
          </>
        )}
      </section>
  );
};

export default ForumPage;
