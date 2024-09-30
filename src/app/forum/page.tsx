'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import CreatePostForm from '../components/CreatePostForm';
import LoadingSpinner from '../components/LoadingSpinner';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  replies: { id: number; content: string; author: string; createdAt: string }[];
  createdAt: string;
}

export default function ForumPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch posts from the API
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/forum/posts');
        const data = await response.json();

        // Check if the response is an array
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          throw new Error('Posts data is not in expected format.');
        }
      } catch (error) {
        setError(error.message || 'Error fetching posts');
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

        {session && <CreatePostForm onPostCreated={(newPost) => setPosts([newPost, ...posts])} />}

        <div className="grid grid-cols-1 gap-6 mt-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
  );
}
