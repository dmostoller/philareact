import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { postId, content, author } = await req.json();

  // Find the post
  const post = posts.find((p) => p.id === postId);
  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  const newReply = {
    id: post.replies.length + 1,
    content,
    author,
    createdAt: new Date().toISOString(),
  };

  post.replies.push(newReply);

  return NextResponse.json(newReply, { status: 201 });
}
