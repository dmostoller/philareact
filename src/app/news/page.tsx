'use client';

import { useEffect, useState } from 'react';

interface Article {
  id: number;
  title: string;
  description: string;
  url: string;
}

const NewsPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch('/api/news');
      const data = await response.json();
      setArticles(data);
    };
    fetchArticles();
  }, []);

  return (
      <section className="container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-6">Latest Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div key={article.id} className="bg-white p-4 shadow rounded">
              <h3 className="text-xl font-bold">{article.title}</h3>
              <p className="text-gray-600">{article.description}</p>
              <a href={article.url} target="_blank" className="text-primary mt-2 block">
                Read more
              </a>
            </div>
          ))}
        </div>
      </section>
  );
};

export default NewsPage;
