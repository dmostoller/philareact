import { NextResponse } from 'next/server';

export async function GET() {
  // Fetch articles from the Dev.to API
  const devToResponse = await fetch('https://dev.to/api/articles?tag=react&tag=nextjs&per_page=21');
  
  // Check if the response is OK and convert to JSON
  if (!devToResponse.ok) {
    return NextResponse.error();
  }
  
  const articles = await devToResponse.json();
  
  // Return articles in a JSON format
  return NextResponse.json(articles);
}
