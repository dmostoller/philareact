import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function POST(req: Request) {
  const { name, email, error, description, browser, os, steps, expected, actual, severity } =
    await req.json();

  try {
    const bugReport = await prisma.bugReport.create({
      data: {
        name,
        email,
        error,
        description,
        browser,
        os,
        steps,
        expected,
        actual,
        severity,
      },
    });
    return NextResponse.json({ message: 'Bug report submitted successfully', bugReport }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: 'Error submitting bug report', error: (err as Error).message },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get('userEmail');

    const bugReports = await prisma.bugReport.findMany({
      where: userEmail
        ? {
            email: userEmail,
          }
        : undefined,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(bugReports, { status: 200 });
  } catch (error) {
    console.error('Error fetching bug reports:', error);
    return NextResponse.json({ error: 'Failed to fetch bug reports' }, { status: 500 });
  }
}
