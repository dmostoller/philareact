// src/app/api/events/route.ts

import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET() {
  try {
    const events = await prisma.event.findMany();
    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json({ error: "Error fetching events" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const data = await request.json();

  try {
    const event = await prisma.event.create({
      data: {
        title: data.title,
        description: data.description,
        start: new Date(data.start),
        end: new Date(data.end),
        userId: data.userId
      }
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json({ error: "Error creating event" }, { status: 500 });
  }
}
