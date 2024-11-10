// app/api/replies/route.ts
import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function POST(request: Request) {
  try {
    const { content, authorId, postId } = await request.json();

    if (!content || !authorId || !postId) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const newReply = await prisma.reply.create({
      data: {
        content,
        author: {
          connect: { id: authorId },
        },
        post: {
          connect: { id: postId },
        },
      },
      include: {
        author: true,
      },
    });

    return NextResponse.json(newReply, { status: 201 });
  } catch (error) {
    console.error('Error creating reply:', error);
    return NextResponse.json({ error: 'Error creating reply' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id, authorId, userRole } = await request.json();

    if (!id || !authorId || !userRole) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const reply = await prisma.reply.findUnique({
      where: { id },
      include: { author: true },
    });

    if (!reply) {
      return NextResponse.json({ error: 'Reply not found' }, { status: 404 });
    }

    if (reply.authorId !== authorId && userRole !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    await prisma.reply.delete({ where: { id } });

    return NextResponse.json({ message: 'Reply deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting reply:', error);
    return NextResponse.json({ error: 'Error deleting reply' }, { status: 500 });
  }
}
