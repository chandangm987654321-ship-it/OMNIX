import React, { useState } from 'react';
import {
  Radio,
  Flame,
  Clock,
  Sparkles,
  Trophy,
  Filter,
  CheckCircle2,
  RefreshCw,
  Compass,
  ArrowRight,
  TrendingUp,
  Layers
} from 'lucide-react';
import { Article, NewsCategory } from '../types';
import { HeroSection } from '../components/HeroSection';
import { LiveTicker } from '../components/LiveTicker';
import { BreakingBanner } from '../components/BreakingBanner';
import { NewsCard } from '../components/NewsCard';
import { NewsHeatmap } from '../components/NewsHeatmap';
import { TopTenSection } from '../components/TopTenSection';

interface HomePageProps {
  articles: Article[];
  savedArticleIds: string[];
  userInterests: NewsCategory[];
  onToggleBookmark: (articleId: string) => void;
  onSelectArticle: (article: Article) => void;
  onAskOmnix: (prompt: string, contextArticle?: Article) => void;
  onShare: (article: Article) => void;
  onOpenQuickBrief: () => void;
  onNavigateToCategory: (category: NewsCategory) => void;
  onOpenLiveVoice?: () => void;
  onOpenTranscribe?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  articles,
  savedArticleIds,
  userInterests,
  onToggleBookmark,
  onSelectArticle,
  onAskOmnix,
  onShare,
  onOpenQuickBrief,
  onNavigateToCategory,
  onOpenLiveVoice,
  onOpenTranscribe,
}) => {
  const [activeFeedTab, setActiveFeedTab] = useState<
    'all' | 'breaking' | 'latest' | 'trending' | 'editors' | 'top10'
  >('latest');
  const [selectedSubCategory, setSelectedSubCategory] = useState<NewsCategory | 'All'>('All');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filtered articles for feed
  const breakingArticles = articles.filter((a) => a.isBreaking);

  let filteredArticles = [...articles];

  if (selectedSubCategory !== 'All') {
    filteredArticles = filteredArticles.filter((a) => a.category === selectedSubCategory);
  }

  if (activeFeedTab === 'breaking') {
    filteredArticles = filteredArticles.filter((a) => a.isBreaking);
  } else if (activeFeedTab === 'latest') {
    filteredArticles.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  } else if (activeFeedTab === 'trending') {
    filteredArticles.sort((a, b) => b.trendingScore - a.trendingScore);
  } else if (activeFeedTab === 'editors') {
    filteredArticles = filteredArticles.filter((a) => a.isEditorsPick);
  }

  // Personalized section: "Recommended for You"
  const personalizedArticles = articles
    .filter((a) => userInterests.includes(a.category))
    .slice(0, 3);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div className="w-full">
      {/* Live Information Ticker */}
      <LiveTicker />

      {/* Hero Section with AI conversation/search box */}
      <HeroSection
        onAskOmnix={(prompt) => onAskOmnix(prompt)}
        onExploreLatest={() => {
          setActiveFeedTab('latest');
          const feedElement = document.getElementById('news-feed-section');
          feedElement?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenQuickBrief={onOpenQuickBrief}
        onOpenLiveVoice={onOpenLiveVoice}
        onOpenTranscribe={onOpenTranscribe}
      />

      {/* Breaking News Banner */}
      <BreakingBanner
        breakingArticles={breakingArticles}
        onSelectArticle={onSelectArticle}
        onAskArticle={(art) => onAskOmnix(`What are the latest updates on "${art.title}"?`, art)}
      />

      <div id="news-feed-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* News Heatmap visualizer */}
        <NewsHeatmap onSelectTopic={(topic) => onAskOmnix(`Tell me about the latest developments in ${topic}`)} />

        {/* Personalized "My OMNIX" section */}
        {personalizedArticles.length > 0 && (
          <div className="mb-10 p-6 rounded-3xl glass-panel border border-cyan-500/20 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-white/10 gap-2">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <h3 className="font-bold text-base text-white">Recommended For You</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 font-mono">
                  MY OMNIX FEED
                </span>
              </div>

              <div className="flex items-center space-x-2 text-xs text-gray-400">
                <span>Personalized based on interests:</span>
                <span className="text-cyan-300 font-medium">
                  {userInterests.slice(0, 3).join(', ')}
                  {userInterests.length > 3 ? '...' : ''}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {personalizedArticles.map((art) => (
                <NewsCard
                  key={art.id}
                  article={art}
                  isBookmarked={savedArticleIds.includes(art.id)}
                  onToggleBookmark={onToggleBookmark}
                  onSelectArticle={onSelectArticle}
                  onAskOmnix={(article) =>
                    onAskOmnix(`Summarize key points of "${article.title}"`, article)
                  }
                  onShare={onShare}
                />
              ))}
            </div>
          </div>
        )}

        {/* Feed Control Bar: Tabs & Categories */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-3 border-b border-white/10">
          {/* Main Feed Tabs */}
          <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto no-scrollbar py-1">
            {[
              { id: 'latest', label: 'LATEST', icon: Clock },
              { id: 'breaking', label: 'BREAKING', icon: Radio, count: breakingArticles.length },
              { id: 'trending', label: 'TRENDING NOW', icon: Flame },
              { id: 'editors', label: "EDITOR'S PICKS", icon: Sparkles },
              { id: 'top10', label: 'TOP 10 TODAY', icon: Trophy },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeFeedTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFeedTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                    isActive
                      ? 'bg-cyan-500 text-gray-950 font-bold shadow-md shadow-cyan-500/25'
                      : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && tab.count > 0 && (
                    <span className="text-[9px] px-1 py-0.2 rounded-full bg-red-600 text-white font-bold">
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Automatic Refresh Indicator */}
          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={handleRefresh}
              className="flex items-center space-x-1.5 text-xs text-gray-400 hover:text-cyan-300 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-cyan-400' : ''}`} />
              <span className="hidden sm:inline">Refresh Feed</span>
            </button>
          </div>
        </div>

        {/* TOP 10 VIEW IF SELECTED */}
        {activeFeedTab === 'top10' ? (
          <TopTenSection
            articles={articles}
            onSelectArticle={onSelectArticle}
            onAskArticle={(art) => onAskOmnix(`Explain the significance of "${art.title}"`, art)}
          />
        ) : (
          /* STANDARD ARTICLE GRID */
          <>
            {filteredArticles.length === 0 ? (
              <div className="text-center py-20 glass-panel rounded-2xl p-8 border border-white/5">
                <Compass className="w-10 h-10 text-cyan-400 mx-auto mb-3 opacity-60" />
                <h4 className="text-base font-bold text-white mb-1">No articles found in this filter</h4>
                <p className="text-xs text-gray-400 mb-4">Try selecting "All" or switching tabs.</p>
                <button
                  onClick={() => {
                    setSelectedSubCategory('All');
                    setActiveFeedTab('latest');
                  }}
                  className="px-4 py-2 rounded-xl bg-cyan-500 text-gray-950 text-xs font-bold"
                >
                  Reset Feed
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
                      onAskOmnix(`Summarize key points and perspectives on "${art.title}"`, art)
                    }
                    onShare={onShare}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
