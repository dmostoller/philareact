import { NextResponse } from 'next/server';

const events = [
  {
    id: 1,
    title: 'React Meetup',
    start: new Date(2024, 9, 10, 18, 30),
    end: new Date(2024, 9, 10, 20, 30),
    description: 'A meetup for React developers in Philadelphia',
  },
  {
    id: 2,
    title: 'Hackathon',
    start: new Date(2024, 9, 15, 9, 0),
    end: new Date(2024, 9, 15, 17, 0),
    description: 'A day-long hackathon focusing on React projects',
  },
  // Add more events as needed
];

export async function GET() {
  return NextResponse.json(events);
}
