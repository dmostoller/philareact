"use client"; // If required to ensure the page renders client-side

import { useEffect, useState, Suspense } from "react";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import Link from "next/link";
import Image from "next/image";

function decodeCloudflareImageUrl(cloudflareUrl: string): string | null {
  const regex = /\/https%3A%2F%2F(.*)/;
  const match = cloudflareUrl.match(regex);
  if (!match || match.length < 2) {
    return null;
  }
  const encodedPart = match[1];
  return `https://${decodeURIComponent(encodedPart)}`;
}

interface Article {
  id: number;
  title: string;
  description: string;
  url: string;
  tag_list: string[];
  user: {
    name: string;
    profile_image: string;
    profile_image_90: string;
  };
}

const Articles = ({ articles }: { articles: Article[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-4">
    {articles.map(article => {
      const decodedProfileImageUrl = decodeCloudflareImageUrl(article.user.profile_image_90);
      return (
        <div
          key={article.id}
          className="bg-dark-slate-800 p-6 shadow-md rounded-lg border border-dark-slate-600 hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex space-x-4">
            {decodedProfileImageUrl && (
              <Image
                src={decodedProfileImageUrl}
                alt={article.user.name}
                width={40}
                height={40}
                className="rounded-full m-1 h-10 w-10"
              />
            )}
            <h3 className="text-lg font-bold mb-2">{article.title}</h3>
          </div>
          <p className="text-sm text-dark-slate-100 mb-4">{article.description}</p>
          <div className="flex space-x-2 mb-4">
            {article.tag_list.map(tag => (
              <span key={tag} className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs">
                {tag}
              </span>
            ))}
          </div>
          <Link href={article.url} target="_blank" rel="noopener norefferer">
            <div className=" mt-4 font-semibold inline-block hover:underline transition-colors">
              Read Full Article →
            </div>
          </Link>
        </div>
      );
    })}
  </div>
);

export default function NewsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async (currentPage: number) => {
    try {
      const res = await fetch(`/api/news?page=${currentPage}`);
      const data = await res.json();
      setArticles(prev => [...prev, ...data]);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(page);
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !loading) {
        setPage(prev => prev + 1);
        setLoading(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <section className="container mx-auto py-12">
      <h1 className="text-3xl font-bold text-center mb-10">Latest React & Next.js Articles</h1>
      <Suspense fallback={<LoadingSkeleton />}>
        <Articles articles={articles} />
        {loading && <LoadingSkeleton />}
      </Suspense>
    </section>
  );
}
