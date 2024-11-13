import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { postId, userRole } = await request.json();

    if (userRole !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: { pinned: !post.pinned },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error('Error toggling pin status:', error);
    return NextResponse.json({ error: 'Error toggling pin status' }, { status: 500 });
  }
}
