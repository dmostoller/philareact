'use client';

interface PostCardProps {
  post: {
    id: number;
    title: string;
    content: string;
    author: string; // Author is now just a string
    createdAt: string;
  };
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="bg-dark-slate-600 p-6 shadow-md rounded-lg">
      {/* Post Title */}
      <h2 className="text-xl font-bold mb-2">{post.title}</h2>

      {/* Post Content */}
      <p className="mb-4">{post.content}</p>

      {/* Post Author and CreatedAt */}
      <p className="text-sm text-dark-slate-100">
        Posted by <span className="font-medium">{post.author}</span> on{' '}
        {new Date(post.createdAt).toLocaleString()}
      </p>
    </div>
  );
}