"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import PrimaryButton from "../components/PrimaryButton";
import { toast } from "sonner";
import { Post } from "@/lib/types";
import { X } from "lucide-react";
interface CreatePostFormProps {
  onPostCreated: (post: Post) => void;
  threadId: number;
}

export default function CreatePostForm({ onPostCreated, threadId }: CreatePostFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!session) {
      toast.error("You must be logged in to create a post.");
      setLoading(false);
      return;
    }

    if (!title || !content) {
      toast.error("Please fill out all fields.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/forum/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          threadId,
          author: session.user.name // Use session's user name as the author
        })
      });

      if (!res.ok) {
        throw new Error("Failed to create post");
      }

      const newPost: Post = await res.json();
      onPostCreated(newPost);

      // Clear form fields
      setTitle("");
      setContent("");
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("An error occurred while creating the post.");
    } finally {
      toast.success("Post created successfully");
      setLoading(false);
    }
  };

  if (!isFormOpen) {
    return (
      <PrimaryButton onClick={() => setIsFormOpen(true)} className="w-full mb-6">
        Create Post
      </PrimaryButton>
    );
  }

  return (
    <div className="transition-all duration-200 ease-in-out">
      <form
        onSubmit={handleSubmit}
        className="bg-dark-slate-900 border border-dark-slate-700 p-4 shadow-md rounded-lg mb-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Create a new post</h3>
          <button
            type="button"
            onClick={() => setIsFormOpen(false)}
            className="text-dark-slate-200 hover:text-dark-slate-400"
          >
            <X size={24} />
          </button>
        </div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full p-2 mb-4 border rounded bg-dark-slate-950 border-dark-slate-700 focus:outline-none focus:ring focus:ring-gray-500"
          aria-label="Post title"
        />
        <textarea
          placeholder="What's on your mind?"
          rows={4}
          value={content}
          onChange={e => setContent(e.target.value)}
          className="w-full p-2 mb-4 border rounded bg-dark-slate-950 border-dark-slate-700 focus:outline-none focus:ring focus:ring-gray-500"
          aria-label="Post content"
        />
        <PrimaryButton type="submit" loading={loading} className="w-full">
          Post
        </PrimaryButton>
      </form>
    </div>
  );
}
