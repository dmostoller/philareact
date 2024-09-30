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
    <div className="bg-white p-6 shadow-md rounded-lg">
      {/* Post Title */}
      <h2 className="text-xl font-bold mb-2">{post.title}</h2>

      {/* Post Content */}
      <p className="text-gray-700 mb-4">{post.content}</p>

      {/* Post Author and CreatedAt */}
      <p className="text-sm text-gray-500">
        Posted by <span className="font-medium">{post.author}</span> on{' '}
        {new Date(post.createdAt).toLocaleString()}
      </p>
    </div>
  );
}