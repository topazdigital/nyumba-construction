import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock, Eye, Share2 } from 'lucide-react';

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/articles/${id}`)
      .then(r => r.json())
      .then(data => { setArticle(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  if (!article) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Article not found</h2>
        <Link to="/articles" className="text-blue-600 hover:underline">Back to articles</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/articles" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 text-sm font-medium">
          <ArrowLeft className="h-4 w-4" /> Back to Articles
        </Link>

        <article className="bg-white rounded-xl shadow-sm overflow-hidden">
          {article.featuredImage && (
            <img src={article.featuredImage} alt={article.title} className="w-full h-80 object-cover" />
          )}
          <div className="p-8">
            <div className="mb-4">
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{article.category}</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{article.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6 pb-6 border-b">
              <span className="flex items-center gap-1"><User className="h-4 w-4" />{article.author}</span>
              <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{article.createdAt ? new Date(article.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}</span>
              {article.readTime && <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{article.readTime}</span>}
              <span className="flex items-center gap-1"><Eye className="h-4 w-4" />{(article.views || 0).toLocaleString()} views</span>
            </div>
            <div
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: article.content || `<p>${article.excerpt}</p>` }}
            />
          </div>
        </article>
      </div>
    </div>
  );
};

export default ArticleDetail;
