import React, { useState } from 'react';
import { Bookmark, Search, Trash2, BookOpen, Clock, ArrowRight } from 'lucide-react';
import { Article } from '../types';
import { NewsCard } from '../components/NewsCard';

interface SavedPageProps {
  articles: Article[];
  savedArticleIds: string[];
  onToggleBookmark: (articleId: string) => void;
  onClearAllBookmarks: () => void;
  onSelectArticle: (article: Article) => void;
  onAskOmnix: (prompt: string, contextArticle?: Article) => void;
  onShare: (article: Article) => void;
  onNavigateHome: () => void;
}

export const SavedPage: React.FC<SavedPageProps> = ({
  articles,
  savedArticleIds,
  onToggleBookmark,
  onClearAllBookmarks,
  onSelectArticle,
  onAskOmnix,
  onShare,
  onNavigateHome,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const savedArticles = articles.filter((a) => savedArticleIds.includes(a.id));

  const filtered = savedArticles.filter((a) => {
    const matchQuery =
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = categoryFilter === 'All' || a.category === categoryFilter;
    return matchQuery && matchCat;
  });

  const totalReadingTime = savedArticles.reduce((acc, curr) => acc + curr.readTimeMinutes, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs mb-1">
            <Bookmark className="w-4 h-4" />
            <span>READING LIST & ARCHIVE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
            Saved Stories
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Your offline-ready reading queue stored safely in local storage.
          </p>
        </div>

        {savedArticles.length > 0 && (
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>~{totalReadingTime} mins total reading</span>
            </div>

            <button
              onClick={onClearAllBookmarks}
              className="px-3 py-1.5 rounded-xl text-xs text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 transition-all flex items-center space-x-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          </div>
        )}
      </div>

      {savedArticles.length === 0 ? (
        <div className="text-center py-24 glass-panel rounded-3xl p-8 border border-white/5 max-w-lg mx-auto">
          <BookOpen className="w-12 h-12 text-cyan-400 mx-auto mb-3 opacity-60" />
          <h3 className="text-lg font-bold text-white mb-2">No Saved Stories Yet</h3>
          <p className="text-xs text-gray-400 mb-6">
            Bookmark stories across the home feed, search, or category explorer to save them to your personal reading list.
          </p>
          <button
            onClick={onNavigateHome}
            className="px-6 py-2.5 rounded-xl bg-cyan-500 text-gray-950 font-bold text-xs hover:bg-cyan-400 shadow-lg shadow-cyan-500/20"
          >
            Explore Today's Stories
          </button>
        </div>
      ) : (
        <>
          {/* Search bar inside Saved */}
          <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search saved articles..."
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article) => (
              <NewsCard
                key={article.id}
                article={article}
                isBookmarked={true}
                onToggleBookmark={onToggleBookmark}
                onSelectArticle={onSelectArticle}
                onAskOmnix={(art) =>
                  onAskOmnix(`What are the key takeaways from "${art.title}"?`, art)
                }
                onShare={onShare}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
