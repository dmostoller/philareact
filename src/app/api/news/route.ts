import { NextResponse } from 'next/server';

export async function GET() {
  const devToResponse = await fetch('https://dev.to/api/articles?tag=react,nextjs');
  const mediumResponse = await fetch('https://api.medium.com/...'); // Replace with Medium API endpoint

  const devToArticles = await devToResponse.json();
  const mediumArticles = await mediumResponse.json();

  const articles = [...devToArticles, ...mediumArticles];
  return NextResponse.json(articles);
}
