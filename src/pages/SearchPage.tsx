import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Sparkles,
  Users,
  Building2,
  MapPin,
  Tag,
  ArrowRight,
  Clock,
  ChevronDown,
  X
} from 'lucide-react';
import { Article, NewsCategory } from '../types';
import { NewsCard } from '../components/NewsCard';
import { CATEGORIES_LIST } from '../data/mockNews';

interface SearchPageProps {
  articles: Article[];
  savedArticleIds: string[];
  onToggleBookmark: (articleId: string) => void;
  onSelectArticle: (article: Article) => void;
  onAskOmnix: (prompt: string, contextArticle?: Article) => void;
  onShare: (article: Article) => void;
  initialQuery?: string;
}

export const SearchPage: React.FC<SearchPageProps> = ({
  articles,
  savedArticleIds,
  onToggleBookmark,
  onSelectArticle,
  onAskOmnix,
  onShare,
  initialQuery = '',
}) => {
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'relevance' | 'latest'>('relevance');
  const [timeFilter, setTimeFilter] = useState<'all' | 'today' | 'week'>('all');

  const query = searchTerm.toLowerCase().trim();

  // Intelligent Search Grouping
  const searchResults = useMemo(() => {
    if (!query) {
      return {
        articles: articles,
        matchedPeople: [],
        matchedPlaces: [],
        matchedTags: [],
        matchedSources: [],
      };
    }

    // Filter articles
    let matchedArticles = articles.filter((art) => {
      const matchTitle = art.title.toLowerCase().includes(query);
      const matchSummary = art.summary.toLowerCase().includes(query);
      const matchCategory = art.category.toLowerCase().includes(query);
      const matchTags = art.tags.some((t) => t.toLowerCase().includes(query));
      const matchPeople = art.keyPeople?.some((p) => p.name.toLowerCase().includes(query));
      const matchCity = art.location?.city?.toLowerCase().includes(query);
      const matchState = art.location?.state?.toLowerCase().includes(query);
      const matchCountry = art.location?.country?.toLowerCase().includes(query);
      const matchSource = art.source.toLowerCase().includes(query);

      return (
        matchTitle ||
        matchSummary ||
        matchCategory ||
        matchTags ||
        matchPeople ||
        matchCity ||
        matchState ||
        matchCountry ||
        matchSource
      );
    });

    // Category filter
    if (selectedCategory !== 'All') {
      matchedArticles = matchedArticles.filter((a) => a.category === selectedCategory);
    }

    // Sort filter
    if (sortBy === 'latest') {
      matchedArticles.sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    } else {
      matchedArticles.sort((a, b) => b.trendingScore - a.trendingScore);
    }

    // Extract matched entities
    const peopleSet = new Set<string>();
    const placesSet = new Set<string>();
    const tagsSet = new Set<string>();
    const sourcesSet = new Set<string>();

    articles.forEach((a) => {
      a.keyPeople?.forEach((p) => {
        if (p.name.toLowerCase().includes(query) || p.role.toLowerCase().includes(query)) {
          peopleSet.add(`${p.name} (${p.role})`);
        }
      });
      if (
        a.location?.city?.toLowerCase().includes(query) ||
        a.location?.state?.toLowerCase().includes(query) ||
        a.location?.country?.toLowerCase().includes(query)
      ) {
        placesSet.add(
          `${a.location.city ? a.location.city + ', ' : ''}${a.location.state ? a.location.state + ', ' : ''}${a.location.country}`
        );
      }
      a.tags.forEach((t) => {
        if (t.toLowerCase().includes(query)) tagsSet.add(t);
      });
      if (a.source.toLowerCase().includes(query)) sourcesSet.add(a.source);
    });

    return {
      articles: matchedArticles,
      matchedPeople: Array.from(peopleSet),
      matchedPlaces: Array.from(placesSet),
      matchedTags: Array.from(tagsSet),
      matchedSources: Array.from(sourcesSet),
    };
  }, [articles, query, selectedCategory, sortBy, timeFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Header */}
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-mono mb-2">
          News Search
        </h1>
        <p className="text-sm text-gray-400">
          Search across verified primary sources, key people, companies, places, and events.
        </p>
      </div>

      {/* Main Search Input */}
      <div className="relative glass-panel rounded-2xl p-2 border border-cyan-500/30 focus-within:border-cyan-400 mb-6 shadow-xl">
        <div className="flex items-center space-x-3 px-3 py-1.5">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search keywords, people, organizations, locations (e.g. 'Davanagere', 'ISRO', 'AI Accord', 'Chips')..."
            className="w-full bg-transparent border-0 text-white placeholder-gray-400 text-sm sm:text-base focus:ring-0 focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 rounded-lg text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center gap-3 p-3.5 rounded-2xl glass-panel border border-white/10 mb-8 text-xs">
        <div className="flex items-center space-x-1.5 text-gray-400">
          <Filter className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-semibold text-gray-300">Filters:</span>
        </div>

        {/* Category select */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-cyan-400"
        >
          {CATEGORIES_LIST.map((c) => (
            <option key={c} value={c} className="bg-gray-900 text-white">
              {c}
            </option>
          ))}
        </select>

        {/* Sort select */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-cyan-400"
        >
          <option value="relevance" className="bg-gray-900 text-white">
            Sort by Relevance
          </option>
          <option value="latest" className="bg-gray-900 text-white">
            Sort by Latest
          </option>
        </select>

        {/* Quick sample chips */}
        <div className="flex flex-wrap gap-1.5 ml-auto">
          {['Davanagere', 'ISRO', 'Silicon Photonics', 'AI Accord', 'Solid-State'].map((keyword) => (
            <button
              key={keyword}
              onClick={() => setSearchTerm(keyword)}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-gray-300 hover:text-cyan-300 border border-white/5"
            >
              {keyword}
            </button>
          ))}
        </div>
      </div>

      {/* Intelligent Groupings Section (if user searched) */}
      {query && (
        <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {searchResults.matchedPeople.length > 0 && (
            <div className="p-4 rounded-2xl glass-panel border border-cyan-500/20">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-cyan-400 mb-2">
                <Users className="w-3.5 h-3.5" />
                <span>Related People / Executives</span>
              </div>
              <div className="space-y-1 text-xs text-gray-300">
                {searchResults.matchedPeople.map((p, idx) => (
                  <div key={idx} className="p-1.5 rounded-lg bg-white/5 font-medium">
                    {p}
                  </div>
                ))}
              </div>
            </div>
          )}

          {searchResults.matchedPlaces.length > 0 && (
            <div className="p-4 rounded-2xl glass-panel border border-cyan-500/20">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-cyan-400 mb-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>Related Locations & Hubs</span>
              </div>
              <div className="space-y-1 text-xs text-gray-300">
                {searchResults.matchedPlaces.map((pl, idx) => (
                  <div key={idx} className="p-1.5 rounded-lg bg-white/5 font-medium">
                    {pl}
                  </div>
                ))}
              </div>
            </div>
          )}

          {searchResults.matchedTags.length > 0 && (
            <div className="p-4 rounded-2xl glass-panel border border-cyan-500/20">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-cyan-400 mb-2">
                <Tag className="w-3.5 h-3.5" />
                <span>Related Topics & Entities</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {searchResults.matchedTags.map((t, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSearchTerm(t)}
                    className="text-xs px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10"
                  >
                    #{t}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Results Count Header */}
      <div className="flex items-center justify-between pb-3 mb-6 border-b border-white/10 text-xs">
        <span className="text-gray-400">
          Showing <span className="text-white font-bold">{searchResults.articles.length}</span> results
          {query ? ` for "${searchTerm}"` : ''}
        </span>
      </div>

      {/* Articles Grid */}
      {searchResults.articles.length === 0 ? (
        <div className="text-center py-20 glass-panel rounded-2xl p-8 border border-white/5">
          <p className="text-sm text-gray-300 mb-2">No matching news articles found for "{searchTerm}".</p>
          <p className="text-xs text-gray-500 mb-4">You can ask OMNIX AI to search the live web for this query:</p>
          <button
            onClick={() => onAskOmnix(`What are the latest updates about "${searchTerm}"?`)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-gray-950 font-bold text-xs"
          >
            Ask OMNIX AI to Search Web
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.articles.map((article) => (
            <NewsCard
              key={article.id}
              article={article}
              isBookmarked={savedArticleIds.includes(article.id)}
              onToggleBookmark={onToggleBookmark}
              onSelectArticle={onSelectArticle}
              onAskOmnix={(art) =>
                onAskOmnix(`What are the latest verified facts on "${art.title}"?`, art)
              }
              onShare={onShare}
            />
          ))}
        </div>
      )}
    </div>
  );
};
