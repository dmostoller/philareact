// app/api/threads/route.ts
import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET() {
  try {
    const threads = await prisma.thread.findMany({
      include: {
        posts: true
      }
    });
    return NextResponse.json(threads);
  } catch (error) {
    console.error("Error fetching threads:", error);
    return NextResponse.json({ error: "Error fetching threads" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { title } = await request.json();

    if (!title) {
      return NextResponse.json({ error: "Missing title" }, { status: 400 });
    }

    const newThread = await prisma.thread.create({
      data: {
        title
      }
    });

    return NextResponse.json(newThread, { status: 201 });
  } catch (error) {
    console.error("Error creating thread:", error);
    return NextResponse.json({ error: "Error creating thread" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, title, userRole } = await request.json();

    if (!id || !title || !userRole) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    if (userRole !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const thread = await prisma.thread.findUnique({ where: { id } });

    if (!thread) {
      return NextResponse.json({ error: "Thread not found" }, { status: 404 });
    }

    const updatedThread = await prisma.thread.update({
      where: { id },
      data: { title: title }
    });

    return NextResponse.json(updatedThread, { status: 200 });
  } catch (error) {
    console.error("Error updating thread name:", error);
    return NextResponse.json({ error: "Error updating thread name" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id, userRole } = await request.json();

    if (!id || !userRole) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const thread = await prisma.thread.findUnique({ where: { id } });

    if (!thread) {
      return NextResponse.json({ error: "Thread not found" }, { status: 404 });
    }
    if (userRole !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const posts = await prisma.post.findMany({ where: { threadId: id } });

    await prisma.$transaction([
      ...posts.map(post => prisma.vote.deleteMany({ where: { postId: post.id } })),
      ...posts.map(post => prisma.reply.deleteMany({ where: { postId: post.id } })),
      prisma.post.deleteMany({ where: { threadId: id } }),
      prisma.thread.delete({ where: { id } })
    ]);

    return NextResponse.json({ message: "Thread deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting thread:", error);
    return NextResponse.json({ error: "Error deleting thread" }, { status: 500 });
  }
}
