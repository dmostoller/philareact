// route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || "1";
  const perPage = "12";

  const devToResponse = await fetch(
    `https://dev.to/api/articles?tag=react&tag=nextjs&per_page=${perPage}&page=${page}`
  );

  if (!devToResponse.ok) {
    return NextResponse.error();
  }

  const articles = await devToResponse.json();
  return NextResponse.json(articles);
}
