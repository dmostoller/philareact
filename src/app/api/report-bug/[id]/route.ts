// pages/api/bug-report/[id].ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function PUT(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();
  const bugReportId = parseInt(id as string);
  const { status } = await req.json();

  try {
    const updatedReport = await prisma.bugReport.update({
      where: { id: bugReportId },
      data: { status }
    });
    return NextResponse.json(updatedReport, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Failed to update bug report status" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
