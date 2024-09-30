'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import PostCard from '../components/PostCard';
import LoadingSpinner from '../components/LoadingSpinner';

const CreatePostForm = dynamic(() => import('../components/CreatePostForm'), { ssr: false });

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

const ForumPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message || 'Error fetching posts');
        } else {
          setError('Error fetching posts');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-center mb-10">Forum</h1>

      {session && <CreatePostForm onPostCreated={(post: Post) => setPosts([post, ...posts])} />}

      <div className="grid grid-cols-1 gap-6 mt-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default ForumPage;