'use client';

import ReplyForm from './ReplyForm';

interface PostCardProps {
  post: {
    id: number;
    title: string;
    content: string;
    author: string; // Author is now just a string
    replies: { id: number; content: string; author: string; createdAt: string }[];
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

      {/* Replies Section */}
      <div className="mt-4">
        <h3 className="font-semibold mb-2">Replies:</h3>
        {post.replies?.length > 0 ? (
          post.replies.map((reply) => (
            <div key={reply.id} className="bg-gray-100 p-2 rounded mb-2">
              <p>{reply.content}</p>
              <p className="text-sm text-gray-500">
                — <span className="font-medium">{reply.author}</span> on{' '}
                {new Date(reply.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p>No replies yet.</p>
        )}
      </div>

      {/* Reply Form */}
      <ReplyForm postId={post.id} />
    </div>
  );
}
