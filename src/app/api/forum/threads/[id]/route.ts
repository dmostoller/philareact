// app/api/threads/[id]/route.ts
import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const thread = await prisma.thread.findUnique({
      where: { id: parseInt(id, 10) },
      include: {
        posts: {
          include: {
            replies: true,
            author: true,
          },
        },
      },
    });

    if (!thread) {
      return NextResponse.json({ error: 'Thread not found' }, { status: 404 });
    }

    return NextResponse.json(thread);
  } catch (error) {
    console.error('Error fetching thread:', error);
    return NextResponse.json({ error: 'Error fetching thread' }, { status: 500 });
  }
}
