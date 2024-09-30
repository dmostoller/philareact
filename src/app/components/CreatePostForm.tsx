'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

interface CreatePostFormProps {
  onPostCreated: (post: Post) => void;
}

export default function CreatePostForm({ onPostCreated }: CreatePostFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session) {
      alert('You must be logged in to create a post.');
      return;
    }

    if (!title || !content) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      const res = await fetch('/api/forum/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          author: session.user.name, // Use session's user name as the author
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to create post');
      }

      const newPost = await res.json();
      onPostCreated(newPost);

      // Clear form fields
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('An error occurred while creating the post.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-4 shadow-md rounded-lg mb-6">
      <h3 className="text-xl font-semibold mb-4">Create a new post</h3>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        aria-label="Post title"
      />
      <textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        aria-label="Post content"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Post
      </button>
    </form>
  );
}
