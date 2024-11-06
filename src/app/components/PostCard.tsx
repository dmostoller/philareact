'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { DeleteIcon } from './icons/delete';
interface Reply {
  id: number;
  content: string;
  author: string;
  createdAt: string;
}

interface PostCardProps {
  post: {
    id: number;
    title: string;
    content: string;
    author: string;
    createdAt: string;
    replies: Reply[];
  };
  onDeletePost: (postId: number) => void;
}

export default function PostCard({ post, onDeletePost }: PostCardProps) {
  const [replies, setReplies] = useState(post.replies || []);
  const [replyContent, setReplyContent] = useState('');
  const { data: session } = useSession();

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

      if (!session) {
      alert('You must be logged in to create a post.');
      return;
    }

    try {
      const response = await fetch('/api/forum/replies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: replyContent, author: session.user.name, postId: post.id }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const newReply = await response.json();
      setReplies([...replies, newReply]);
      setReplyContent('');
    } catch (error) {
      console.error('Error creating reply:', error);
      alert('An error occurred while creating the reply.');
    }
  };

    const handleDeletePost = async () => {
    if (!session) {
      alert('You must be logged in to delete a post.');
      return;
    }
    const confirmed = window.confirm('Are you sure you want to delete this post?');

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch('/api/forum/posts', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: post.id, author: session.user.name, userRole: session.user.role }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      onDeletePost(post.id);
      // Optionally, you can remove the post from the UI here
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('An error occurred while deleting the post.');
    }
  };

  const handleDeleteReply = async (replyId: number) => {
    if (!session) {
      alert('You must be logged in to delete a reply.');
      return;
    }
    
    const confirmed = window.confirm('Are you sure you want to delete this post?');

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch('/api/forum/replies', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: replyId, author: session.user.name, userRole: session.user.role }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setReplies(replies.filter((reply) => reply.id !== replyId));
    } catch (error) {
      console.error('Error deleting reply:', error);
      alert('An error occurred while deleting the reply.');
    }
  };

  return (
    <div className="bg-dark-slate-600 p-6 shadow-md rounded-lg mx-2 mb-4 relative">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold mb-2">{post.title}</h2>
        {(session?.user.name === post.author || session?.user.role === 'ADMIN') && (
          <button onClick={handleDeletePost} className="absolute top-2 right-2 text-dark-slate-500 hover:text-dark-slate-400">
            <DeleteIcon />
          </button>
        )}
      </div>
      <p className="mb-4">{post.content}</p>
      <p className="text-sm text-dark-slate-300">
        Posted by <span className="font-medium">{post.author}</span> on{' '}
        {new Date(post.createdAt).toLocaleString()}
      </p>

      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Replies</h3>
        {replies.length > 0 ? (
          replies.map((reply) => (
            <div key={reply.id} className="bg-dark-slate-700 p-4 rounded-lg mb-2 relative">
              <div className="flex justify-between items-center">
                <p>{reply.content}</p>
                {(session?.user.name === reply.author || session?.user.role === 'ADMIN') && (
                  <button onClick={() => handleDeleteReply(reply.id)} className="absolute top-0 right-0 text-dark-slate-500 hover:text-dark-slate-400 size-9">
                    <DeleteIcon />
                  </button>
                )}
              </div>
              <p className="text-xs text-gray-400">
                Replied by <span className="font-medium">{reply.author}</span> on{' '}
                {new Date(reply.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-300">No replies yet.</p>
        )}
      </div>


      <form onSubmit={handleReplySubmit} className="mt-4">
        <textarea
          placeholder="Write a reply..."
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
        className="w-full p-2 mb-4 border rounded bg-dark-slate-600 border-dark-slate-500 focus:outline-none focus:ring focus:ring-gray-500"
          aria-label="Reply content"
        />
        <button
          type="submit"
          className="px-4 py-2 w-full font-semibold bg-gradient-to-b from-deep-sapphire-500 to-deep-sapphire-600 text-white rounded-lg hover:from-deep-sapphire-600 hover:to-deep-sapphire-700"
        >
          Reply
        </button>
      </form>
    </div>
  );
}


