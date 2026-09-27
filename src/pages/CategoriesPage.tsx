import React, { useState } from 'react';
import { Grid, Sparkles, Filter, Check, Bookmark, ArrowRight } from 'lucide-react';
import { Article, NewsCategory } from '../types';
import { CATEGORIES_LIST } from '../data/mockNews';
import { NewsCard } from '../components/NewsCard';

interface CategoriesPageProps {
  articles: Article[];
  savedArticleIds: string[];
  userInterests: NewsCategory[];
  onToggleInterest: (category: NewsCategory) => void;
  onToggleBookmark: (articleId: string) => void;
  onSelectArticle: (article: Article) => void;
  onAskOmnix: (prompt: string, contextArticle?: Article) => void;
  onShare: (article: Article) => void;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({
  articles,
  savedArticleIds,
  userInterests,
  onToggleInterest,
  onToggleBookmark,
  onSelectArticle,
  onAskOmnix,
  onShare,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>('All');

  const filteredArticles =
    selectedCategory === 'All'
      ? articles
      : articles.filter((a) => a.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs mb-1">
          <Grid className="w-4 h-4" />
          <span>TOPICAL EXPLORER</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
          News Categories
        </h1>
        <p className="text-sm text-gray-400 mt-1 max-w-2xl">
          Filter real-time intelligence by domain or personalize your custom newsroom feed by following specific topics.
        </p>
      </div>

      {/* Category Pills with Follow Toggle */}
      <div className="p-5 rounded-2xl glass-panel border border-cyan-500/20 mb-8">
        <div className="flex items-center justify-between mb-3 text-xs">
          <span className="font-semibold text-gray-300">Select Category to View:</span>
          <span className="text-[11px] text-gray-500">
            ★ Star indicates followed topic in your feed
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {CATEGORIES_LIST.map((cat) => {
            const isSelected = selectedCategory === cat;
            const isFollowed = userInterests.includes(cat as NewsCategory);
            const count =
              cat === 'All' ? articles.length : articles.filter((a) => a.category === cat).length;

            return (
              <div key={cat} className="inline-flex rounded-xl overflow-hidden border border-white/10">
                <button
                  onClick={() => setSelectedCategory(cat as NewsCategory)}
                  className={`px-3 py-1.5 text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                    isSelected
                      ? 'bg-cyan-500 text-gray-950 font-bold'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSelected ? 'bg-gray-950/20 text-gray-950' : 'bg-white/10 text-gray-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>

                {cat !== 'All' && (
                  <button
                    onClick={() => onToggleInterest(cat as NewsCategory)}
                    className={`px-2 py-1.5 text-xs border-l border-white/10 transition-all ${
                      isFollowed
                        ? 'bg-cyan-950/80 text-cyan-300 font-bold'
                        : 'bg-white/5 text-gray-500 hover:text-white'
                    }`}
                    title={isFollowed ? 'Following (Click to unfollow)' : 'Click to follow category'}
                  >
                    {isFollowed ? '★' : '☆'}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Category Results Header */}
      <div className="flex items-center justify-between pb-3 mb-6 border-b border-white/10 text-xs">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-base text-white">{selectedCategory}</span>
          <span className="text-gray-400">({filteredArticles.length} stories available)</span>
        </div>

        {selectedCategory !== 'All' && (
          <button
            onClick={() => onToggleInterest(selectedCategory)}
            className={`px-3 py-1 rounded-xl font-semibold transition-all flex items-center space-x-1 ${
              userInterests.includes(selectedCategory)
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
            }`}
          >
            <span>{userInterests.includes(selectedCategory) ? 'Following Category' : '+ Follow Category'}</span>
          </button>
        )}
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="text-center py-20 glass-panel rounded-2xl p-8 border border-white/5">
          <p className="text-sm text-gray-400 mb-2">
            No current articles under "{selectedCategory}" in this session snapshot.
          </p>
          <button
            onClick={() => setSelectedCategory('All')}
            className="px-4 py-2 rounded-xl bg-cyan-500 text-gray-950 text-xs font-bold"
          >
            View All Categories
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <NewsCard
              key={article.id}
              article={article}
              isBookmarked={savedArticleIds.includes(article.id)}
              onToggleBookmark={onToggleBookmark}
              onSelectArticle={onSelectArticle}
              onAskOmnix={(art) =>
                onAskOmnix(`What are the latest updates on "${art.title}"?`, art)
              }
              onShare={onShare}
            />
          ))}
        </div>
      )}
    </div>
  );
};
