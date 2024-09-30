import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch all posts, no relations or includes
    const posts = await prisma.post.findMany();
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Error fetching posts' }, { status: 500 });
  }
}


export async function POST(request: Request) {
  try {
    const { title, content, author } = await request.json();

    // Ensure title, content, and author are provided
    if (!title || !content || !author) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // Create a new post
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        author, // Save author's name directly
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error); // Log error for debugging
    return NextResponse.json({ error: 'Error creating post' }, { status: 500 });
  }
}
