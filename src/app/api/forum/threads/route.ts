// app/api/threads/route.ts
import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function GET() {
  try {
    const threads = await prisma.thread.findMany({
      include: {
        posts: true, // Include posts in the response
      },
    });
    return NextResponse.json(threads);
  } catch (error) {
    console.error('Error fetching threads:', error);
    return NextResponse.json({ error: 'Error fetching threads' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { title } = await request.json();

    if (!title) {
      return NextResponse.json({ error: 'Missing title' }, { status: 400 });
    }

    const newThread = await prisma.thread.create({
      data: {
        title,
      },
    });

    return NextResponse.json(newThread, { status: 201 });
  } catch (error) {
    console.error('Error creating thread:', error);
    return NextResponse.json({ error: 'Error creating thread' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    await prisma.thread.delete({ where: { id } });

    return NextResponse.json({ message: 'Thread deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting thread:', error);
    return NextResponse.json({ error: 'Error deleting thread' }, { status: 500 });
  }
}