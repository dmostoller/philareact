// First create a new API endpoint at app/api/user-stats/route.ts
import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

// app/api/user-stats/route.ts
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    const userPosts = await prisma.post.findMany({
      where: { authorId: userId },
      select: { id: true },
    });

    const [posts, comments, upvotes, downvotes] = await Promise.all([
      prisma.post.count({ where: { authorId: userId } }),
      prisma.reply.count({ where: { authorId: userId } }),
      prisma.vote.count({
        where: {
          postId: { in: userPosts.map((p) => p.id) },
          type: 'UPVOTE',
        },
      }),
      prisma.vote.count({
        where: {
          postId: { in: userPosts.map((p) => p.id) },
          type: 'DOWNVOTE',
        },
      }),
    ]);

    return NextResponse.json({ posts, comments, upvotes, downvotes });
  } catch (error) {
    console.error('Detailed error:', error);
    return NextResponse.json({ error: 'Error fetching user stats' }, { status: 500 });
  }
}
