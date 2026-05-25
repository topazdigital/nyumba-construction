import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft, Calendar, User, Clock, Eye, Share2,
  Facebook, Twitter, Copy, CheckCheck, MessageSquare,
  ChevronRight, Heart, Globe
} from 'lucide-react';

interface Article {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  featuredImage: string | null;
  category: string;
  author: string;
  published: boolean;
  featured: boolean;
  views: number;
  readTime: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Comment {
  id: number;
  articleId: number;
  name: string;
  email: string;
  website: string | null;
  body: string;
  approved: boolean;
  createdAt: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  architecture: 'bg-purple-100 text-purple-800',
  design: 'bg-pink-100 text-pink-800',
  construction: 'bg-orange-100 text-orange-800',
  interior: 'bg-teal-100 text-teal-800',
  'real-estate': 'bg-blue-100 text-blue-800',
  news: 'bg-red-100 text-red-800',
  features: 'bg-green-100 text-green-800',
  default: 'bg-gray-100 text-gray-800',
};

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [article, setArticle] = useState<Article | null>(null);
  const [related, setRelated] = useState<Article[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [commentForm, setCommentForm] = useState({ name: '', email: '', website: '', body: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setArticle(null);
    setRelated([]);
    setComments([]);
    setSubmitStatus('idle');

    fetch(`/api/articles/${id}`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then((data: Article) => {
        setArticle(data);
        setLoading(false);
        fetch(`/api/articles?category=${encodeURIComponent(data.category)}&limit=4`)
          .then(r => r.json())
          .then((all: Article[]) => setRelated(all.filter(a => a.id !== data.id).slice(0, 3)));
        fetch(`/api/comments?articleId=${id}`)
          .then(r => r.json())
          .then(setComments)
          .catch(() => {});
      })
      .catch(() => setLoading(false));
  }, [id]);

  const shareUrl = window.location.href;
  const shareText = article?.title || 'Nyumba Magazine';

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleWhatsApp = () =>
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank');
  const handleTwitter = () =>
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  const handleFacebook = () =>
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !commentForm.name.trim() || !commentForm.email.trim() || !commentForm.body.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...commentForm, articleId: parseInt(id) }),
      });
      if (res.ok) {
        setSubmitStatus('success');
        setCommentForm({ name: '', email: '', website: '', body: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
        <p className="text-gray-500 text-sm">Loading article…</p>
      </div>
    </div>
  );

  if (!article) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="text-6xl mb-4">📰</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Article not found</h2>
        <p className="text-gray-500 mb-4">It may have been removed or the link is incorrect.</p>
        <Link to="/news" className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-medium">
          <ArrowLeft className="h-4 w-4" /> Back to News
        </Link>
      </div>
    </div>
  );

  const categoryColor = CATEGORY_COLORS[article.category?.toLowerCase()] || CATEGORY_COLORS.default;
  const formattedDate = article.createdAt
    ? new Date(article.createdAt).toLocaleDateString('en-KE', { year: 'numeric', month: 'long', day: 'numeric' })
    : '';

  const avatarInitials = article.author
    .split(' ')
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-red-600">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link to="/news" className="hover:text-red-600">News</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-gray-800 font-medium line-clamp-1 max-w-xs">{article.title}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            {/* Article card */}
            <article className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
              {article.featuredImage && (
                <div className="relative">
                  <img
                    src={article.featuredImage}
                    alt={article.title}
                    className="w-full h-72 sm:h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className={`absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full ${categoryColor}`}>
                    {article.category}
                  </span>
                </div>
              )}

              <div className="p-6 sm:p-8">
                {!article.featuredImage && (
                  <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${categoryColor}`}>
                    {article.category}
                  </span>
                )}

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
                  {article.title}
                </h1>

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-100">
                  <span className="flex items-center gap-1.5">
                    <User className="h-4 w-4 text-red-500" />
                    <span className="font-medium text-gray-700">{article.author}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-red-500" />
                    {formattedDate}
                  </span>
                  {article.readTime && (
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-red-500" />
                      {article.readTime}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5">
                    <Eye className="h-4 w-4 text-red-500" />
                    {(article.views || 0).toLocaleString()} views
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MessageSquare className="h-4 w-4 text-red-500" />
                    {comments.length} comment{comments.length !== 1 ? 's' : ''}
                  </span>
                </div>

                {/* Excerpt callout */}
                {article.excerpt && (
                  <p className="text-lg text-gray-600 font-medium italic border-l-4 border-red-600 pl-4 mb-6 leading-relaxed">
                    {article.excerpt}
                  </p>
                )}

                {/* Article body */}
                <div
                  className="prose prose-lg max-w-none text-gray-700 leading-relaxed
                    prose-headings:font-bold prose-headings:text-gray-900
                    prose-h2:text-2xl prose-h3:text-xl
                    prose-a:text-red-600 prose-a:no-underline hover:prose-a:underline
                    prose-blockquote:border-l-red-600 prose-blockquote:text-gray-600
                    prose-img:rounded-xl prose-img:shadow-sm
                    prose-strong:text-gray-900"
                  dangerouslySetInnerHTML={{ __html: article.content || `<p>${article.excerpt}</p>` }}
                />

                {/* Like + Share bar */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <button
                      onClick={() => setLiked(v => !v)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all
                        ${liked ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600'}`}
                    >
                      <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
                      {liked ? 'Liked' : 'Like this article'}
                    </button>

                    <div className="flex items-center gap-2 sm:ml-auto">
                      <Share2 className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-500 mr-1">Share:</span>

                      {/* WhatsApp */}
                      <button
                        onClick={handleWhatsApp}
                        title="Share on WhatsApp"
                        className="w-8 h-8 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center transition-colors"
                      >
                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                      </button>

                      {/* Twitter/X */}
                      <button
                        onClick={handleTwitter}
                        title="Share on X (Twitter)"
                        className="w-8 h-8 rounded-full bg-black hover:bg-gray-800 flex items-center justify-center transition-colors"
                      >
                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.745l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </button>

                      {/* Facebook */}
                      <button
                        onClick={handleFacebook}
                        title="Share on Facebook"
                        className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition-colors"
                      >
                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </button>

                      {/* Copy link */}
                      <button
                        onClick={handleCopy}
                        title="Copy link"
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors
                          ${copied ? 'bg-green-500' : 'bg-gray-200 hover:bg-gray-300'}`}
                      >
                        {copied
                          ? <CheckCheck className="h-4 w-4 text-white" />
                          : <Copy className="h-4 w-4 text-gray-600" />
                        }
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Author bio */}
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 flex gap-4 items-start">
              <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                {avatarInitials}
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Written by</p>
                <h3 className="text-base font-bold text-gray-900">{article.author}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Contributing writer at <span className="font-semibold text-red-600">Nyumba Magazine</span> — covering architecture, construction, and real estate in East Africa.
                </p>
              </div>
            </div>

            {/* Comments section */}
            <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-red-600" />
                {comments.length} Comment{comments.length !== 1 ? 's' : ''}
              </h2>

              {comments.length > 0 ? (
                <div className="space-y-6 mb-8">
                  {comments.map(comment => (
                    <div key={comment.id} className="flex gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm font-bold flex-shrink-0">
                        {comment.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-50 rounded-xl px-4 py-3">
                          <div className="flex items-center gap-2 mb-1">
                            {comment.website ? (
                              <a
                                href={comment.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-semibold text-red-600 hover:underline flex items-center gap-1"
                              >
                                {comment.name} <Globe className="h-3 w-3" />
                              </a>
                            ) : (
                              <span className="text-sm font-semibold text-gray-800">{comment.name}</span>
                            )}
                            <span className="text-xs text-gray-400">·</span>
                            <span className="text-xs text-gray-400">
                              {new Date(comment.createdAt).toLocaleDateString('en-KE', { year: 'numeric', month: 'short', day: 'numeric' })}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed">{comment.body}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400 mb-8">
                  <MessageSquare className="h-10 w-10 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">No comments yet. Be the first to comment!</p>
                </div>
              )}

              {/* Comment form */}
              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-base font-bold text-gray-900 mb-4">Leave a Comment</h3>
                {submitStatus === 'success' ? (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
                    <CheckCheck className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-green-800">Comment submitted!</p>
                      <p className="text-sm text-green-700 mt-0.5">Your comment is awaiting moderation and will appear once approved.</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleCommentSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Name <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          required
                          value={commentForm.name}
                          onChange={e => setCommentForm(f => ({ ...f, name: e.target.value }))}
                          placeholder="Your full name"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
                        <input
                          type="email"
                          required
                          value={commentForm.email}
                          onChange={e => setCommentForm(f => ({ ...f, email: e.target.value }))}
                          placeholder="your@email.com"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Website <span className="text-gray-400">(optional)</span></label>
                      <input
                        type="url"
                        value={commentForm.website}
                        onChange={e => setCommentForm(f => ({ ...f, website: e.target.value }))}
                        placeholder="https://yourwebsite.com"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Comment <span className="text-red-500">*</span></label>
                      <textarea
                        required
                        rows={4}
                        value={commentForm.body}
                        onChange={e => setCommentForm(f => ({ ...f, body: e.target.value }))}
                        placeholder="Share your thoughts…"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                      />
                    </div>
                    {submitStatus === 'error' && (
                      <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
                    )}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors flex items-center gap-2"
                    >
                      {submitting ? (
                        <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Posting…</>
                      ) : (
                        <><MessageSquare className="h-4 w-4" /> Post Comment</>
                      )}
                    </button>
                    <p className="text-xs text-gray-400">Your email address will not be published. Comments are moderated before appearing.</p>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 flex-shrink-0 space-y-6">
            {/* Related articles */}
            {related.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm p-5">
                <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-red-600 rounded-full inline-block" />
                  Related Articles
                </h3>
                <div className="space-y-4">
                  {related.map(rel => (
                    <Link key={rel.id} to={`/article/${rel.id}`} className="group flex gap-3">
                      {rel.featuredImage ? (
                        <img
                          src={rel.featuredImage}
                          alt={rel.title}
                          className="w-20 h-16 rounded-lg object-cover flex-shrink-0 group-hover:opacity-90 transition-opacity"
                        />
                      ) : (
                        <div className="w-20 h-16 rounded-lg bg-gray-100 flex-shrink-0 flex items-center justify-center">
                          <span className="text-2xl">📰</span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                          {rel.title}
                        </p>
                        <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {rel.readTime || '3 min read'}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link
                  to={`/news`}
                  className="mt-4 flex items-center gap-1 text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  More articles <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            )}

            {/* Share box */}
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-1 h-5 bg-red-600 rounded-full inline-block" />
                Share this article
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleWhatsApp}
                  className="flex items-center justify-center gap-2 py-2 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 text-sm font-medium transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </button>
                <button
                  onClick={handleTwitter}
                  className="flex items-center justify-center gap-2 py-2 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 text-sm font-medium transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.745l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  X / Twitter
                </button>
                <button
                  onClick={handleFacebook}
                  className="flex items-center justify-center gap-2 py-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 text-sm font-medium transition-colors"
                >
                  <Facebook className="h-4 w-4" />
                  Facebook
                </button>
                <button
                  onClick={handleCopy}
                  className={`flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors
                    ${copied ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}
                >
                  {copied ? <CheckCheck className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? 'Copied!' : 'Copy Link'}
                </button>
              </div>
            </div>

            {/* Newsletter CTA */}
            <div className="bg-red-600 rounded-2xl p-5 text-white">
              <h3 className="text-base font-bold mb-1">Stay Informed</h3>
              <p className="text-red-100 text-sm mb-4">Get the latest architecture & real estate stories straight to your inbox.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 min-w-0 px-3 py-2 rounded-lg text-sm text-gray-900 focus:outline-none"
                />
                <button className="bg-white text-red-600 font-semibold text-sm px-3 py-2 rounded-lg hover:bg-red-50 transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
