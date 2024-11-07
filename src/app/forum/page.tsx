"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import PostCard from "../../components/PostCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { CircleCheckIcon } from "../../components/icons/circle-check";
import { DeleteIcon } from "../../components/icons/delete";

const CreatePostForm = dynamic(() => import("../../components/CreatePostForm"), { ssr: false });

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
  const isAdmin = session?.user?.role === "ADMIN";
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const response = await fetch("/api/forum/threads");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setThreads(data);
        if (data.length > 0) {
          setSelectedThread(data[0]);
          setPosts(data[0].posts || []);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message || "Error fetching threads");
        } else {
          setError("Error fetching threads");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchThreads();
  }, []);

  const handleCreateThread = async (title: string) => {
    try {
      const response = await fetch("/api/forum/threads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title })
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const newThread = await response.json();
      setThreads([...threads, newThread]);
      setSelectedThread(newThread);
      setPosts([]);
    } catch (error) {
      console.error("Error creating thread:", error);
      alert("An error occurred while creating the thread.");
    }
  };

  const handlePostCreated = (newPost: Post) => {
    if (selectedThread) {
      const postWithReplies: Post = {
        ...newPost,
        replies: newPost.replies || [],
        upvotes: newPost.upvotes || 0,
        downvotes: newPost.downvotes || 0
      };
      setPosts([postWithReplies, ...posts]);
      setThreads(
        threads.map(thread =>
          thread.id === selectedThread.id
            ? { ...thread, posts: [postWithReplies, ...(thread.posts || [])] } // Ensure posts is an array
            : thread
        )
      );
    }
  };

  const handleDeletePost = (postId: number) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const handleThreadSelect = async (thread: Thread) => {
    setSelectedThread(thread);
    setLoading(true);
    try {
      const response = await fetch(`/api/forum/threads/${thread.id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setPosts(data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Error fetching posts");
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-12">
      <div className="flex flex-col md:flex-row md:space-x-6">
        {/* Threads Section */}
        <div className="w-full md:w-1/3 mb-8 md:mb-0">
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">Threads</h2>

          {/* Horizontal scroll on mobile, vertical list on desktop */}
          <div className="relative">
            <ul className="mb-4 flex overflow-x-auto md:block md:overflow-visible pb-2 md:pb-0 space-x-2 md:space-x-0 scrollbar-hide">
              {threads.map(thread => (
                <li
                  key={thread.id}
                  className={`
                  flex-shrink-0 
                  w-[85vw] 
                  md:w-full 
                  relative 
                  mb-0 
                  md:mb-2 
                  cursor-pointer 
                  p-4 
                  font-semibold 
                  rounded 
                  border
                  ${
                    selectedThread?.id === thread.id
                      ? "bg-dark-slate-700 border-dark-slate-500"
                      : "bg-dark-slate-900 border-dark-slate-600"
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
            <div className="relative w-full px-2 md:px-0">
              <form
                onSubmit={e => {
                  e.preventDefault();
                  if (inputRef.current && inputRef.current.value.trim()) {
                    handleCreateThread(inputRef.current.value.trim());
                    inputRef.current.value = "";
                  }
                }}
                className="flex items-center"
              >
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="New thread title"
                  className="flex-1 p-2 md:p-2 border-4 border-r-4 rounded-l-md bg-dark-slate-950 border-dark-slate-600 focus:outline-none  focus:ring-gray-500"
                  onKeyDown={e => {
                    if (e.key === "Enter" && inputRef.current && inputRef.current.value.trim()) {
                      e.preventDefault();
                      const form = e.currentTarget.closest("form");
                      if (form) {
                        form.requestSubmit();
                      }
                    }
                  }}
                />
                <button
                  type="submit"
                  className="text-dark-slate-400 border-y-2 border-r-2 rounded-r bg-dark-slate-950 border-dark-slate-600 hover:bg-dark-slate-800 transition-colors"
                >
                  <CircleCheckIcon />
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Posts Section */}
        <div className="w-full md:w-2/3">
          {selectedThread && (
            <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">{selectedThread.title}</h2>
          )}

          {session && selectedThread && (
            <div className="mb-6">
              <CreatePostForm onPostCreated={handlePostCreated} threadId={selectedThread.id} />
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 md:gap-6">
            {loading ? (
              <>
                {Array(3)
                  .fill(null)
                  .map((_, index) => (
                    <div key={index} className="bg-dark-slate-600 p-4 md:p-6 shadow-md rounded-lg">
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
                {posts.length > 0 ? (
                  <>
                    {posts.map((post: Post) => (
                      <PostCard key={post.id} post={post} onDeletePost={handleDeletePost} />
                    ))}
                  </>
                ) : (
                  <div className="px-4 py-16 md:py-28 text-center bg-dark-slate-900 border border-dark-slate-700 rounded-lg">
                    <p className="text-gray-400">
                      No posts in this thread yet.
                      {session ? (
                        " Start the discussion!"
                      ) : (
                        <>
                          <Link href="/api/auth/signin" className="text-blue-400 hover:text-blue-300 ml-1">
                            Sign in
                          </Link>{" "}
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
