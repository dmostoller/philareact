'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState, useRef, useMemo } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import PostCard from '../../components/PostCard';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { CircleCheckIcon } from '../../components/icons/circle-check';
import { DeleteIcon } from '../../components/icons/delete';
import { MessageCircleIcon } from '@/components/icons/message';
import { ChevronLeftIcon, ChevronRightIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

const CreatePostForm = dynamic(() => import('../../components/CreatePostForm'), { ssr: false });

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  upvotes: number;
  downvotes: number;
  createdAt: string;
  replies: {
    id: number;
    content: string;
    author: string;
    createdAt: string;
  }[];
}
interface Thread {
  id: number;
  title: string;
  posts: Post[];
}

const ForumPage: React.FC = () => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === 'ADMIN';
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortDescending, setSortDescending] = useState(true);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const response = await fetch('/api/forum/threads');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setThreads(data);
        if (data.length > 0) {
          setSelectedThread(data[0]);
          setPosts(data[0].posts || []);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message || 'Error fetching threads');
        } else {
          setError('Error fetching threads');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchThreads();
  }, []);

  const handleCreateThread = async (title: string) => {
    try {
      const response = await fetch('/api/forum/threads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const newThread = await response.json();
      setThreads([...threads, newThread]);
      setSelectedThread(newThread);
      setPosts([]);
    } catch (error) {
      console.error('Error creating thread:', error);
      alert('An error occurred while creating the thread.');
    }
  };

  const handlePostCreated = (newPost: Post) => {
    if (selectedThread) {
      const postWithReplies: Post = {
        ...newPost,
        replies: newPost.replies || [],
        upvotes: newPost.upvotes || 0,
        downvotes: newPost.downvotes || 0,
      };
      const updatedPosts = [...posts, postWithReplies];
      setPosts(updatedPosts);
      setThreads(
        threads.map((thread) =>
          thread.id === selectedThread.id ? { ...thread, posts: updatedPosts } : thread
        )
      );
    }
  };

  const handleDeletePost = (postId: number) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  const sortPosts = (postsToSort: Post[], descending: boolean) => {
    return [...postsToSort].sort((a, b) => {
      const comparison = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return descending ? comparison : -comparison;
    });
  };

  const handleThreadSelect = async (thread: Thread) => {
    setSelectedThread(thread);
    setLoading(true);
    try {
      const response = await fetch(`/api/forum/threads/${thread.id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setPosts(sortPosts(data.posts, sortDescending));
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Error fetching posts');
    } finally {
      setLoading(false);
    }
  };

  const sortedPosts = useMemo(() => {
    return sortPosts(posts, sortDescending);
  }, [posts, sortDescending]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mx-auto px-2 py-6 md:py-12">
      <h2 className="text-3xl font-bold mb-6 text-center">
        <div className="flex justify-center items-center">
          <MessageCircleIcon />
          Community Forum
        </div>
      </h2>
      <div className="flex flex-col md:flex-row md:space-x-6">
        {/* Threads Section */}
        <div className="w-full md:w-1/3 mb-8 md:mb-0">
          {/* Horizontal scroll on mobile, vertical list on desktop */}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-dark-slate-950 to-transparent z-10 pointer-events-none md:hidden flex items-center">
              <ChevronLeftIcon className="h-8 w-8 text-white/30 animate-pulse" />
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-dark-slate-950 to-transparent z-10 pointer-events-none md:hidden flex items-center justify-end">
              <ChevronRightIcon className="h-8 w-8 text-white/30 animate-pulse" />
            </div>
            <ul className="mb-4 flex overflow-x-auto md:block md:overflow-visible pb-2 md:pb-0 space-x-2 md:space-x-0 scrollbar-hide">
              {' '}
              {threads.map((thread) => (
                <li
                  key={thread.id}
                  ref={(el) => {
                    if (selectedThread?.id === thread.id && el) {
                      el.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                        inline: 'center',
                      });
                    }
                  }}
                  className={`
                  flex-shrink-0 
                  w-[80vw] 
                  md:w-full 
                  relative 
                  mb-0 
                  md:mb-2 
                  cursor-pointer 
                  px-4
                  py-6
                  md:py-4
                  font-semibold 
                  rounded 
                  border
                  ${
                    selectedThread?.id === thread.id
                      ? 'bg-dark-slate-600 border-dark-slate-500'
                      : 'bg-dark-slate-900 border-dark-slate-600'
                  }
                `}
                  onClick={() => handleThreadSelect(thread)}
                >
                  <div className="truncate pr-10">{thread.title}</div>
                  {isAdmin && (
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-2/3 size-9 text-dark-slate-400 hover:text-dark-slate-300"
                    >
                      <DeleteIcon />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* New Thread Form */}
          {session && (
            <div className="w-full px-2 md:px-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (inputRef.current && inputRef.current.value.trim()) {
                    handleCreateThread(inputRef.current.value.trim());
                    inputRef.current.value = '';
                  }
                }}
              >
                <div className="border-2 border-dark-slate-600 rounded-md flex">
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="New thread title"
                    className="flex-1 p-2 md:p-2 bg-dark-slate-950 focus:outline-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && inputRef.current && inputRef.current.value.trim()) {
                        e.preventDefault();
                        const form = e.currentTarget.closest('form');
                        if (form) {
                          form.requestSubmit();
                        }
                      }
                    }}
                  />
                  <button
                    type="submit"
                    className="text-dark-slate-400 bg-dark-slate-950 hover:bg-dark-slate-800 transition-colors"
                  >
                    <CircleCheckIcon />
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Posts Section */}
        <div className="w-full md:w-2/3">
          {session && selectedThread && (
            <div className="mb-6">
              <CreatePostForm onPostCreated={handlePostCreated} threadId={selectedThread.id} />
            </div>
          )}
          {selectedThread && (
            <div className="flex flex-col sm:flex-row items-center sm:justify-between mb-6 gap-4">
              <h2 className="text-xl border border-dark-slate-700 p-4 bg-dark-slate-900 rounded-lg font-bold w-full sm:flex-1 text-center">
                {selectedThread.title}
              </h2>
              <button
                onClick={() => setSortDescending(!sortDescending)}
                className="w-full sm:w-auto p-4 bg-dark-slate-900 border border-dark-slate-700 hover:bg-dark-slate-700 rounded-lg flex items-center justify-center sm:justify-start gap-2 text-lg font-normal"
              >
                {sortDescending ? (
                  <>
                    Newest First <ArrowDownIcon className="h-5 w-5" />
                  </>
                ) : (
                  <>
                    Oldest First <ArrowUpIcon className="h-5 w-5" />
                  </>
                )}
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4">
            {loading ? (
              <>
                {Array(3)
                  .fill(null)
                  .map((_, index) => (
                    <div key={index} className="bg-dark-slate-900 p-4 md:p-6 shadow-md rounded-lg">
                      <div className="flex space-x-4 mb-4">
                        <Skeleton
                          circle={true}
                          height={40}
                          width={40}
                          baseColor="#737373"
                          highlightColor="#454545"
                        />
                        <Skeleton height={20} width="80%" baseColor="#737373" highlightColor="#454545" />
                      </div>
                      <Skeleton
                        height={20}
                        width="60%"
                        className="mb-4"
                        baseColor="#737373"
                        highlightColor="#454545"
                      />
                      <Skeleton count={3} baseColor="#737373" highlightColor="#454545" />
                      <Skeleton
                        height={20}
                        width="40%"
                        className="mt-4"
                        baseColor="#737373"
                        highlightColor="#454545"
                      />
                    </div>
                  ))}
              </>
            ) : (
              <>
                {sortedPosts.length > 0 ? (
                  <>
                    {sortedPosts.map((post: Post) => (
                      <PostCard key={post.id} post={post} onDeletePost={handleDeletePost} />
                    ))}
                  </>
                ) : (
                  <div className="px-2 py-16 md:py-28 text-center mx-2 bg-dark-slate-900 border border-dark-slate-700 rounded-lg">
                    <p className="text-gray-400">
                      No posts in this thread yet.
                      {session ? (
                        ' Start the discussion!'
                      ) : (
                        <>
                          <Link href="/api/auth/signin" className="text-blue-400 hover:text-blue-300 ml-1">
                            Sign in
                          </Link>{' '}
                          to start the discussion!
                        </>
                      )}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumPage;
