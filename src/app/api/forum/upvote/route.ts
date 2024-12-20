import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function POST(request: Request) {
  try {
    const { userId, postId } = await request.json();

    const existingVote = await prisma.vote.findFirst({
      where: {
        userId: String(userId),
        postId: Number(postId),
      },
    });

    if (existingVote) {
      return NextResponse.json({ message: 'User has already voted on this post' }, { status: 400 });
    }

    await prisma.vote.create({
      data: {
        userId: String(userId),
        postId: Number(postId),
        type: 'UPVOTE',
      },
    });

    await prisma.post.update({
      where: { id: Number(postId) },
      data: {
        upvotes: { increment: 1 },
      },
    });

    return NextResponse.json({ message: 'Upvote successful' }, { status: 200 });
  } catch (error) {
    console.error('Error upvoting post:', error);
    return NextResponse.json({ error: 'Error upvoting post' }, { status: 500 });
  }
}
