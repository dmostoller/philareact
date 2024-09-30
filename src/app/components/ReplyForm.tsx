'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';

interface ReplyFormProps {
  postId: number;
}

export default function ReplyForm({ postId }: ReplyFormProps) {
  const [content, setContent] = useState('');
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content) {
      return;
    }

    await fetch('/api/forum/replies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId, content, author: session?.user?.name }),
    });

    setContent('');
  };

  return session ? (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        placeholder="Write a reply..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Reply
      </button>
    </form>
  ) : (
    <p>Please sign in to reply.</p>
  );
}
