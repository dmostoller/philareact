'use client'; // If required to ensure the page renders client-side

import { useEffect, useState, Suspense } from 'react';
import { ExpandIcon } from '../components/icons';
import LoadingSkeleton from '../components/LoadingSkeleton';
import BasicButton from '../components/BasicButton';

// Define the decode function at the top of your file
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
    profile_image_90: string; // Assuming this is the one you're using for images
  };
}

const Articles = ({ articles }: { articles: Article[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-4">
    {articles.map((article) => {
      const decodedProfileImageUrl = decodeCloudflareImageUrl(article.user.profile_image_90);
      return (
        <div
          key={article.id}
          className="bg-dark-slate-600 p-6 shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex space-x-4">
            {decodedProfileImageUrl && (
              <img
                src={decodedProfileImageUrl}
                alt={article.user.name}
                className="h-10 w-10 rounded-full m-1"
              />
            )}
            <h3 className="text-lg font-bold mb-2">{article.title}</h3>
          </div>
          <p className="text-sm text-dark-slate-100 mb-4">{article.description}</p>
          <div className="flex space-x-2 mb-4">
            {article.tag_list.map((tag) => (
              <span key={tag} className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center">
            <BasicButton
              as="a"
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              icon={<ExpandIcon />}
            >
              Read Full Article
            </BasicButton>
          </div>
        </div>
      );
    })}
  </div>
);

export default function NewsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch('/api/news');
        const data = await res.json();
        setArticles(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <section className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-center mb-10">Latest React & Next.js Articles</h1>
      <Suspense fallback={<LoadingSkeleton />}>
        {loading ? <LoadingSkeleton /> : <Articles articles={articles} />}
      </Suspense>
    </section>
  );
}
