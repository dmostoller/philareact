'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import PostCard from '../../components/PostCard';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { MessageCircleIcon } from '@/components/icons/message';
import { CalendarArrowDown, CalendarArrowUp, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { Post, Thread } from '@/lib/types';
import ThreadList from '../../components/ThreadList';
import ThreadForm from '../../components/ThreadForm';
import { Drawer } from 'vaul';
import PrimaryButton from '../../components/PrimaryButton';
import { MessageCirclePlus, ChevronsUp } from 'lucide-react';

const CreatePostForm = dynamic(() => import('../../components/CreatePostForm'), { ssr: false });

const ForumPage: React.FC = () => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === 'ADMIN';
  const [loading, setLoading] = useState(true);
  const [threadsLoading, setThreadsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortDescending, setSortDescending] = useState(true);
  const [showThreadForm, setShowThreadForm] = useState(false);

  useEffect(() => {
    const fetchThreads = async () => {
      setThreadsLoading(true);
      try {
        const response = await fetch('/api/forum/threads');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const sortedThreads: Thread[] = data.sort((a: Thread, b: Thread) => a.id - b.id);
        setThreads(sortedThreads);
        if (sortedThreads.length > 0) {
          setSelectedThread(sortedThreads[0]);
          setPosts(sortedThreads[0].posts || []);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message || 'Error fetching threads');
        } else {
          setError('Error fetching threads');
        }
      } finally {
        setLoading(false);
        setThreadsLoading(false);
      }
    };

    fetchThreads();
  }, []);

  const handleCreateThread = async (title: string, description: string) => {
    try {
      const response = await fetch('/api/forum/threads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
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
      toast.error('An error occurred while creating the thread.');
    }
  };

  const handleDeleteThread = async (threadId: number) => {
    if (!session) {
      toast.error('You must be logged in to delete a thread.');
      return;
    }

    const promise = new Promise((resolve, reject) => {
      const confirmToast = toast('Delete Thread?', {
        description: 'Are you sure you want to delete this thread and all its posts?',
        action: {
          label: 'Delete',
          onClick: async () => {
            try {
              const response = await fetch(`/api/forum/threads`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  id: threadId,
                  userRole: session.user.role,
                }),
              });

              if (!response.ok) {
                throw new Error('Network response was not ok');
              }

              // Update local state
              setThreads(threads.filter((thread) => thread.id !== threadId));
              if (selectedThread?.id === threadId) {
                setSelectedThread(null);
                setPosts([]);
              }

              resolve('deleted');
              toast.dismiss(confirmToast);
            } catch (error) {
              console.error('Error deleting thread:', error);
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
      loading: 'Deleting thread...',
      success: 'Thread deleted successfully',
      error: (error) => (error.message === 'Action canceled' ? 'Action canceled' : 'Failed to delete thread'),
    });
  };

  const handleUpdateThread = async (threadId: number, title: string, description: string) => {
    try {
      const response = await fetch(`/api/forum/threads`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: threadId,
          title,
          description,
          userRole: session?.user?.role,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update thread');
      }

      // Update threads list
      setThreads(
        threads.map((thread) => (thread.id === threadId ? { ...thread, title, description } : thread))
      );

      // Update selected thread
      if (selectedThread?.id === threadId) {
        setSelectedThread((prev) => (prev ? { ...prev, title, description } : null));
      }

      toast.success('Thread updated successfully');
    } catch (error) {
      console.error('Error updating thread:', error);
      toast.error('Failed to update thread');
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
          {/* Desktop View */}
          <div className="hidden md:block">
            <ThreadList
              threads={threads}
              threadsLoading={threadsLoading}
              selectedThread={selectedThread}
              handleThreadSelect={handleThreadSelect}
              isAdmin={isAdmin}
              handleDeleteThread={handleDeleteThread}
              handleUpdateThread={handleUpdateThread}
            />
            {isAdmin && (
              <div className="space-y-4">
                <PrimaryButton onClick={() => setShowThreadForm(!showThreadForm)} className="w-full">
                  {showThreadForm ? 'Cancel' : 'Create New Channel'}
                </PrimaryButton>
                {showThreadForm && (
                  <ThreadForm onSubmit={handleCreateThread} placeholder="New channel name" />
                )}
              </div>
            )}
            {!session && (
              <div className="text-center mt-4">
                <Link href="/api/auth/signin" className="text-blue-400 hover:text-blue-300">
                  Sign in
                </Link>{' '}
                to use the forum.
              </div>
            )}
          </div>

          {/* Mobile Drawer */}
          <Drawer.Root>
            <Drawer.Trigger className="md:hidden w-full bg-dark-slate-900 border border-dark-slate-600 rounded-lg p-4 flex items-center justify-between">
              <span className="font-semibold">Show Channels</span>
              <ChevronRight />
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 bg-black/40" />
              <Drawer.Content className="bg-dark-slate-900 flex flex-col rounded-t-[10px] h-[96vh] mt-24 fixed bottom-0 left-0 right-0">
                <div className="p-4 bg-dark-slate-800 rounded-t-[10px] flex-1 overflow-y-auto">
                  <div className="w-12 h-1.5 bg-dark-slate-600 rounded-full mx-auto mb-8" />
                  <ThreadList
                    threads={threads}
                    threadsLoading={threadsLoading}
                    selectedThread={selectedThread}
                    handleThreadSelect={(thread) => {
                      handleThreadSelect(thread);
                      const drawerClose = document.querySelector('[data-vaul-drawer-close]');
                      if (drawerClose instanceof HTMLElement) drawerClose.click();
                    }}
                    isAdmin={isAdmin}
                    handleDeleteThread={handleDeleteThread}
                    handleUpdateThread={handleUpdateThread}
                  />
                  {isAdmin && (
                    <div className="space-y-4">
                      <PrimaryButton onClick={() => setShowThreadForm(!showThreadForm)} className="w-full">
                        {showThreadForm ? 'Cancel' : 'Create New Channel'}
                      </PrimaryButton>
                      {showThreadForm && (
                        <ThreadForm onSubmit={handleCreateThread} placeholder="New channel name" />
                      )}
                    </div>
                  )}
                  {!session && (
                    <div className="text-center mt-4">
                      <Link href="/api/auth/signin" className="text-blue-400 hover:text-blue-300">
                        Sign in
                      </Link>{' '}
                      to use the forum.
                    </div>
                  )}
                </div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </div>

        {/* Posts Section */}
        <div className="w-full md:w-2/3">
          {selectedThread && (
            <>
              <div className="flex flex-col sm:flex-row items-center sm:justify-between mb-4 gap-4">
                <h2 className="text-xl border border-dark-slate-700 p-4 bg-dark-slate-900 rounded-lg font-bold w-full sm:flex-1 text-center">
                  {selectedThread.title}
                </h2>
                <button
                  onClick={() => setSortDescending(!sortDescending)}
                  className="w-full sm:w-auto p-4 bg-dark-slate-900 border border-dark-slate-700 hover:bg-dark-slate-700 rounded-lg flex items-center justify-center sm:justify-start gap-2 text-lg font-normal"
                >
                  {sortDescending ? (
                    <>
                      <CalendarArrowDown /> Newest First
                    </>
                  ) : (
                    <>
                      <CalendarArrowUp /> Oldest First
                    </>
                  )}
                </button>
              </div>

              <div className="relative text-md font-medium text-center border border-dark-slate-700 p-4 bg-dark-slate-900 rounded-lg w-full mb-4">
                {selectedThread.description || 'No description provided'}
              </div>
            </>
          )}
          {session && selectedThread && (
            <div className="hidden md:block">
              <CreatePostForm onPostCreated={handlePostCreated} threadId={selectedThread.id} />
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
      <div>
        <Drawer.Root>
          <Drawer.Trigger>
            <span
              className="fixed bottom-6 right-6 block md:hidden bg-dark-slate-600 text-dark-slate-100 p-4 rounded-full shadow-lg 
               hover:bg-dark-slate-200 hover:text-dark-slate-900 z-999"
            >
              <MessageCirclePlus aria-hidden="true" size={32} />
            </span>
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/40" />
            <Drawer.Content className="bg-dark-slate-900 flex flex-col rounded-t-[10px] h-[96vh] mt-24 fixed bottom-0 left-0 right-0">
              <div className="p-4 bg-dark-slate-800 rounded-t-[10px] flex-1 overflow-y-auto">
                <div className="w-12 h-1.5 bg-dark-slate-600 rounded-full mx-auto mb-8" />
                {selectedThread ? (
                  <CreatePostForm
                    onPostCreated={(post) => {
                      handlePostCreated(post);
                      const drawerClose = document.querySelector('[data-vaul-drawer-close]');
                      if (drawerClose instanceof HTMLElement) drawerClose.click();
                    }}
                    threadId={selectedThread.id}
                    defaultOpen={true}
                  />
                ) : (
                  <div className="text-center text-dark-slate-400">Please select a channel first</div>
                )}
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </div>
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 left-6 block md:hidden bg-dark-slate-600 text-dark-slate-100 p-4 rounded-full shadow-lg 
               hover:bg-dark-slate-200 hover:text-dark-slate-900 z-999"
      >
        <ChevronsUp aria-hidden="true" size={32} />
      </button>
    </div>
  );
};

export default ForumPage;
