// app/api/posts/route.ts
import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true, // Include author details
        replies: {
          include: {
            author: true, // Include reply author details
          },
        },
      },
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Error fetching posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { title, content, authorId, threadId } = await request.json();

    if (!title || !content || !authorId || !threadId) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        author: {
          connect: { id: authorId },
        },
        thread: {
          connect: { id: threadId },
        },
      },
      include: {
        author: true, // Include author details in response
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Error creating post' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id, authorId, userRole } = await request.json();

    if (!id || !authorId || !userRole) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const post = await prisma.post.findUnique({
      where: { id },
      include: { author: true },
    });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    if (userRole !== 'ADMIN' && post.authorId !== authorId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    await prisma.$transaction([
      prisma.vote.deleteMany({ where: { postId: id } }),
      prisma.reply.deleteMany({ where: { postId: id } }),
      prisma.post.delete({ where: { id } }),
    ]);

    return NextResponse.json({ message: 'Post deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ error: 'Error deleting post' }, { status: 500 });
  }
}
