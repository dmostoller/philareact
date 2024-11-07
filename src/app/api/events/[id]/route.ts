// app/api/events/[id]/route.ts
import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const eventId = parseInt(params.id);

    const event = await prisma.event.delete({
      where: { id: eventId }
    });

    return NextResponse.json(event, { status: 200 });
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json({ error: "Error deleting event" }, { status: 500 });
  }
}
