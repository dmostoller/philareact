'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import PrimaryButton from '../components/PrimaryButton';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  upvotes: number;
  downvotes: number;
  threadId: number;
  createdAt: string;
  replies: [];
}

interface CreatePostFormProps {
  onPostCreated: (post: Post) => void;
  threadId: number;
}

export default function CreatePostForm({ onPostCreated, threadId }: CreatePostFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!session) {
      alert('You must be logged in to create a post.');
      setLoading(false);
      return;
    }

    if (!title || !content) {
      alert('Please fill out all fields.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/forum/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          threadId,
          author: session.user.name, // Use session's user name as the author
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to create post');
      }

      const newPost: Post = await res.json();
      onPostCreated(newPost);

      // Clear form fields
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('An error occurred while creating the post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-dark-slate-600 p-4 shadow-md rounded-lg mb-6 mx-2">
      <h3 className="text-xl font-semibold mb-4">Create a new post</h3>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-4 border rounded bg-dark-slate-600 border-dark-slate-500 focus:outline-none focus:ring focus:ring-gray-500"
        aria-label="Post title"
      />
      <textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 mb-4 border rounded bg-dark-slate-600 border-dark-slate-500 focus:outline-none focus:ring focus:ring-gray-500"
        aria-label="Post content"
      />
      <PrimaryButton type="submit" loading={loading} className="w-full">
        Post
      </PrimaryButton>
    </form>
  );
}
