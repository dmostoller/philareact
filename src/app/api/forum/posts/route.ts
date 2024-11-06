// app/api/posts/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        replies: true, // Include replies in the response
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
    const { title, content, author, threadId } = await request.json();

    if (!title || !content || !author || !threadId) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        author,
        thread: {
          connect: { id: threadId },
        },
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
    const { id, author, userRole } = await request.json();

    if (!id || !author || !userRole) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const post = await prisma.post.findUnique({ where: { id } });

    if (post?.author !== author && userRole !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    await prisma.post.delete({ where: { id } });

    return NextResponse.json({ message: 'Post deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ error: 'Error deleting post' }, { status: 500 });
  }
}