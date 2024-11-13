'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { DeleteIcon, UpvoteIcon, DownvoteIcon } from './icons';
import PrimaryButton from '../components/PrimaryButton';
import { toast } from 'sonner';
import UserAvatar from './UserAvatar';
import { Post } from '@/lib/types';
import { MessageCircleReply, MessageCircleX, Pin, PinOff } from 'lucide-react';

interface PostCardProps {
  post: Post;
  onDeletePost: (postId: number) => void;
  onPinToggle?: (postId: number) => void;
}

export default function PostCard(props: PostCardProps) {
  const { post, onDeletePost, onPinToggle } = props;
  const [replies, setReplies] = useState(post.replies || []);
  const [replyContent, setReplyContent] = useState('');
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [upvotes, setUpvotes] = useState(post.upvotes || 0);
  const [downvotes, setDownvotes] = useState(post.downvotes || 0);
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleUpvote = async () => {
    if (!session) {
      toast.error('You must be logged in to vote.');
      return;
    }

    try {
      const response = await fetch('/api/forum/upvote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: session.user.id, postId: post.id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 400) {
          toast.error('You have already voted on this post');
        } else {
          throw new Error(errorData.message || 'Network response was not ok');
        }
        return;
      }

      setUpvotes(upvotes + 1);
      toast.success('Post upvoted successfully');
    } catch (error) {
      console.error('Failed to upvote:', error);
      toast.error('Failed to upvote post');
    }
  };

  const handleDownvote = async () => {
    if (!session) {
      toast.error('You must be logged in to vote.');
      return;
    }

    try {
      const response = await fetch('/api/forum/downvote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: session.user.id, postId: post.id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 400) {
          toast.error('You have already voted on this post');
        } else {
          throw new Error(errorData.message || 'Network response was not ok');
        }
        return;
      }

      setDownvotes(downvotes + 1);
      toast.success('Post downvoted successfully');
    } catch (error) {
      console.error('Failed to downvote:', error);
      toast.error('Failed to downvote post');
    }
  };

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!session) {
      alert('You must be logged in to create a post.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/forum/replies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: replyContent,
          authorId: session.user.id,
          postId: post.id,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const newReply = await response.json();
      setReplies([...replies, newReply]);
      setReplyContent('');
      setShowReplyForm(false);
    } catch (error) {
      console.error('Error creating reply:', error);
      alert('An error occurred while creating the reply.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async () => {
    if (!session) {
      toast.error('You must be logged in to delete a post.');
      return;
    }

    const promise = new Promise((resolve, reject) => {
      const confirmToast = toast('Delete Post?', {
        description: 'Are you sure you want to delete this post?',
        action: {
          label: 'Delete',
          onClick: async () => {
            try {
              const response = await fetch('/api/forum/posts', {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  id: post.id,
                  authorId: session.user.id,
                  userRole: session.user.role,
                }),
              });

              if (!response.ok) {
                throw new Error('Network response was not ok');
              }

              onDeletePost(post.id);
              resolve('deleted');
              toast.dismiss(confirmToast);
            } catch (error) {
              console.error('Error deleting post:', error);
              reject(error);
              toast.dismiss(confirmToast);
            }
          },
        },
        cancel: {
          label: 'Cancel',
          onClick: () => {
            reject(new Error('Action canceled'));
            toast.dismiss(confirmToast);
          },
        },
      });
    });

    toast.promise(promise, {
      loading: 'Deleting post...',
      success: 'Post deleted successfully',
      error: (error) => (error.message === 'Action canceled' ? 'Action canceled' : 'Failed to delete post'),
    });
  };

  const handleDeleteReply = async (replyId: number) => {
    if (!session) {
      toast.error('You must be logged in to delete a reply.');
      return;
    }

    const promise = new Promise((resolve, reject) => {
      const confirmToast = toast('Delete Reply?', {
        description: 'Are you sure you want to delete this reply?',
        action: {
          label: 'Delete',
          onClick: async () => {
            try {
              const response = await fetch('/api/forum/replies', {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  id: replyId,
                  authorId: session.user.id,
                  userRole: session.user.role,
                }),
              });

              if (!response.ok) {
                throw new Error('Network response was not ok');
              }

              setReplies(replies.filter((reply) => reply.id !== replyId));
              resolve('deleted');
              toast.dismiss(confirmToast);
            } catch (error) {
              console.error('Error deleting reply:', error);
              reject(error);
              toast.dismiss(confirmToast);
            }
          },
        },
        cancel: {
          label: 'Cancel',
          onClick: () => {
            reject(new Error('Action canceled'));
            toast.dismiss(confirmToast);
          },
        },
      });
    });

    toast.promise(promise, {
      loading: 'Deleting reply...',
      success: 'Reply deleted successfully',
      error: (error) => (error.message === 'Action canceled' ? 'Action canceled' : 'Failed to delete reply'),
    });
  };

  const handlePinToggle = async () => {
    if (!session) {
      toast.error('You must be logged in.');
      return;
    }

    try {
      const response = await fetch('/api/forum/pin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId: post.id,
          userRole: session.user.role,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const updatedPost = await response.json();
      if (onPinToggle) {
        onPinToggle(post.id);
      }
      toast.success(updatedPost.pinned ? 'Post pinned successfully' : 'Post unpinned successfully');
    } catch (error) {
      console.error('Error toggling pin:', error);
      toast.error('Failed to toggle pin status');
    }
  };

  return (
    <div className="bg-dark-slate-900 border border-dark-slate-700 p-6 shadow-md rounded-lg mx-0 mb-4 relative">
      <div className="flex items-start gap-4">
        <span className="block md:hidden">
          {post.author?.name && <UserAvatar name={post.author.name} size={50} />}
        </span>
        <span className="hidden md:block">
          {post.author?.name && <UserAvatar name={post.author.name} size={75} />}
        </span>
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold mb-2 mr-8">{post.title}</h2>
            {post.pinned && (
              <div className="absolute top-2 right-2 bg-dark-slate-500 text-dark-slate-900 px-2 py-1 rounded-full text-xs font-bold">
                Pinned
              </div>
            )}
            <div className="flex items-center gap-2">
              {session?.user.role === 'ADMIN' && (
                <button
                  onClick={handlePinToggle}
                  className={`text-dark-slate-300 hover:text-dark-slate-200 ${
                    post.pinned ? 'text-yellow-500' : ''
                  }`}
                  title={post.pinned ? 'Unpin post' : 'Pin post'}
                >
                  {post.pinned ? <PinOff size={28} /> : <Pin size={28} />}
                </button>
              )}
              {(session?.user.name === post.author?.name || session?.user.role === 'ADMIN') && (
                <button onClick={handleDeletePost} className="text-dark-slate-300 hover:text-dark-slate-200">
                  <DeleteIcon />
                </button>
              )}
            </div>
          </div>
          <p className="mb-4 mr-2">{post.content}</p>
          <p className="text-sm text-dark-slate-300">
            Posted by <span className="font-medium">{post.author?.name || 'Unknown User'}</span> on{' '}
            {new Date(post.createdAt).toLocaleString()}
          </p>
          {session && (
            <div className="flex items-center mt-2">
              <button onClick={handleUpvote} className="flex items-center">
                <UpvoteIcon />
                <span className="ml-1 font-medium">{upvotes}</span>
              </button>
              <button onClick={handleDownvote} className="flex items-center ml-4">
                <DownvoteIcon />
                <span className="ml-1 font-medium">{downvotes}</span>
              </button>
              <button onClick={() => setShowReplyForm(!showReplyForm)} className="ml-6">
                {showReplyForm ? <MessageCircleX size={32} /> : <MessageCircleReply size={32} />}
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Replies</h3>
        {replies.length > 0 ? (
          replies.map((reply) => (
            <div key={reply.id} className="bg-dark-slate-700 p-4 rounded-lg mb-2 relative">
              <div className="flex items-start gap-3">
                <UserAvatar name={reply.author?.name || 'Unknown User'} size={45} />
                <div className="flex-1">
                  <p>{reply.content}</p>
                  <p className="text-xs text-dark-slate-400 mt-1">
                    Replied by <span className="font-medium">{reply.author?.name || 'Unknown User'}</span> on{' '}
                    {new Date(reply.createdAt).toLocaleString()}
                  </p>
                </div>
                {(session?.user.name === reply.author?.name || session?.user.role === 'ADMIN') && (
                  <button
                    onClick={() => handleDeleteReply(reply.id)}
                    className="text-dark-slate-400 hover:text-dark-slate-300"
                  >
                    <DeleteIcon />
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-dark-slate-300">No replies yet.</p>
        )}
      </div>
      {session && (
        <>
          {showReplyForm && (
            <form onSubmit={handleReplySubmit} className="mt-4">
              <textarea
                placeholder="Write a reply..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="w-full p-2 mb-4 border rounded bg-dark-slate-950 border-dark-slate-700 focus:outline-none focus:ring focus:ring-gray-500"
                aria-label="Reply content"
              />
              <PrimaryButton type="submit" loading={loading} className="w-full">
                Submit Reply
              </PrimaryButton>
            </form>
          )}
        </>
      )}
    </div>
  );
}
