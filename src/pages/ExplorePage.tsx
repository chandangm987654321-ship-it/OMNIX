import React, { useState } from 'react';
import {
  Compass,
  MapPin,
  Share2,
  Globe2,
  Sparkles,
  Layers,
  ArrowRight,
  TrendingUp,
  Activity,
  Zap,
  Info
} from 'lucide-react';
import { Article, StoryNode } from '../types';
import { STORY_NODES, TRENDING_TOPICS } from '../data/mockNews';
import { NewsCard } from '../components/NewsCard';

interface ExplorePageProps {
  articles: Article[];
  savedArticleIds: string[];
  onToggleBookmark: (articleId: string) => void;
  onSelectArticle: (article: Article) => void;
  onAskOmnix: (prompt: string, contextArticle?: Article) => void;
  onShare: (article: Article) => void;
  onOpenExplainWorld: () => void;
  onOpenCompare: () => void;
}

export const ExplorePage: React.FC<ExplorePageProps> = ({
  articles,
  savedArticleIds,
  onToggleBookmark,
  onSelectArticle,
  onAskOmnix,
  onShare,
  onOpenExplainWorld,
  onOpenCompare,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [activeStoryNode, setActiveStoryNode] = useState<StoryNode>(STORY_NODES[0]);

  const regions = [
    { id: 'All', label: 'All Regions' },
    { id: 'Davanagere', label: 'Davanagere (Central Karnataka)' },
    { id: 'Karnataka', label: 'Karnataka (Bengaluru/Mysuru)' },
    { id: 'India', label: 'India National' },
    { id: 'North America', label: 'North America (Silicon Valley/NY)' },
    { id: 'Europe', label: 'Europe (Geneva/Stockholm)' },
  ];

  const filteredByRegion =
    selectedRegion === 'All'
      ? articles
      : articles.filter((a) => {
          if (selectedRegion === 'Davanagere') return a.location?.city === 'Davanagere';
          if (selectedRegion === 'Karnataka') return a.location?.state === 'Karnataka';
          if (selectedRegion === 'India') return a.location?.country === 'India';
          if (selectedRegion === 'North America') return a.location?.region === 'North America' || a.location?.country === 'USA';
          if (selectedRegion === 'Europe') return a.location?.region === 'Europe';
          return true;
        });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Page Header */}
      <div>
        <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs mb-1">
          <Compass className="w-4 h-4" />
          <span>VISUAL DISCOVERY & GRAPH</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
          Explore OMNIX
        </h1>
        <p className="text-sm text-gray-400 mt-1 max-w-2xl">
          Traverse location-based stories, explore interactive story connection graphs, and dive deep into global topics.
        </p>
      </div>

      {/* Feature Action Banners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Explain the World */}
        <div
          onClick={onOpenExplainWorld}
          className="p-5 rounded-3xl glass-panel border border-cyan-500/30 hover:border-cyan-400 cursor-pointer transition-all group flex items-start justify-between shadow-xl shadow-cyan-950/20"
        >
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs">
              <Globe2 className="w-4 h-4" />
              <span>SPECIAL FEATURE</span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
              Explain the World
            </h3>
            <p className="text-xs text-gray-300">
              Interactive deep-dives into semiconductor chips, quantum breakthroughs, energy transition, and space treaties.
            </p>
          </div>
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-300 group-hover:bg-cyan-500 group-hover:text-gray-950 transition-all shrink-0 ml-3">
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>

        {/* Compare Coverage */}
        <div
          onClick={onOpenCompare}
          className="p-5 rounded-3xl glass-panel border border-teal-500/30 hover:border-teal-400 cursor-pointer transition-all group flex items-start justify-between shadow-xl shadow-teal-950/20"
        >
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-teal-400 font-bold text-xs">
              <Layers className="w-4 h-4" />
              <span>EDITORIAL INTEGRITY</span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-teal-300 transition-colors">
              AI Article Comparison
            </h3>
            <p className="text-xs text-gray-300">
              Select multiple stories to cross-examine consensus facts, framing differences, and diverging sources.
            </p>
          </div>
          <div className="p-2 rounded-xl bg-teal-500/10 text-teal-300 group-hover:bg-teal-500 group-hover:text-gray-950 transition-all shrink-0 ml-3">
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* SECTION 1: STORY NETWORK / CONNECTION GRAPH */}
      <div className="p-6 rounded-3xl glass-panel border border-cyan-500/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-white/10 gap-2">
          <div>
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <h3 className="font-bold text-base text-white font-mono">Story Connection Graph</h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 font-mono">
                INTERACTIVE NETWORK
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              Explore how topics, companies, places, and events interlink across news events
            </p>
          </div>

          <div className="text-xs text-gray-400">
            Selected Node: <span className="text-cyan-300 font-bold">{activeStoryNode.label}</span>
          </div>
        </div>

        {/* Node Visualizer Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 mb-4">
          {STORY_NODES.map((node) => {
            const isSelected = activeStoryNode.id === node.id;
            const isConnected = activeStoryNode.connections.includes(node.id);

            return (
              <button
                key={node.id}
                onClick={() => setActiveStoryNode(node)}
                className={`p-2.5 rounded-xl text-left border transition-all text-xs flex flex-col justify-between h-20 ${
                  isSelected
                    ? 'bg-cyan-500 text-gray-950 font-bold border-cyan-400 shadow-lg shadow-cyan-500/30 scale-105 z-10'
                    : isConnected
                    ? 'bg-cyan-950/40 text-cyan-300 border-cyan-500/40 font-medium'
                    : 'bg-white/5 text-gray-400 border-white/5 hover:border-white/20 hover:text-white'
                }`}
              >
                <span className="text-[9px] uppercase tracking-wider opacity-75 font-mono block">
                  {node.type}
                </span>
                <span className="line-clamp-2 leading-tight">{node.label}</span>
              </button>
            );
          })}
        </div>

        {/* Node Inspector Card */}
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <span className="text-gray-400">Active Node:</span>{' '}
            <strong className="text-white text-sm">{activeStoryNode.label}</strong>{' '}
            <span className="text-cyan-400">({activeStoryNode.type})</span>
            <div className="text-gray-400 text-[11px] mt-0.5">
              Connected to: {activeStoryNode.connections.map((c) => STORY_NODES.find((n) => n.id === c)?.label).join(' • ')}
            </div>
          </div>

          <button
            onClick={() => onAskOmnix(`Explain how ${activeStoryNode.label} connects to global news and related entities.`)}
            className="px-4 py-2 rounded-xl bg-cyan-500 text-gray-950 font-bold text-xs shrink-0 flex items-center space-x-1.5 hover:bg-cyan-400 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Analyze Connections in OMNIX AI</span>
          </button>
        </div>
      </div>

      {/* SECTION 2: EXPLORE MAP / LOCATION-BASED NEWS */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-white/10 gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <h3 className="font-bold text-lg text-white">Location-Based News Map</h3>
            </div>
            <p className="text-xs text-gray-400">
              Filter verified stories by specific regional hubs (Davanagere, Karnataka, India, US, Europe)
            </p>
          </div>

          {/* Region Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {regions.map((reg) => (
              <button
                key={reg.id}
                onClick={() => setSelectedRegion(reg.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedRegion === reg.id
                    ? 'bg-cyan-500 text-gray-950 font-bold'
                    : 'bg-white/5 text-gray-300 hover:text-white border border-white/5'
                }`}
              >
                {reg.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stories from selected region */}
        {filteredByRegion.length === 0 ? (
          <div className="text-center py-16 glass-panel rounded-2xl p-6 border border-white/5">
            <p className="text-xs text-gray-400 mb-2">No regional reports in this filter.</p>
            <button
              onClick={() => setSelectedRegion('All')}
              className="px-4 py-1.5 rounded-xl bg-cyan-500 text-gray-950 text-xs font-bold"
            >
              Reset to All Regions
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredByRegion.map((article) => (
              <NewsCard
                key={article.id}
                article={article}
                isBookmarked={savedArticleIds.includes(article.id)}
                onToggleBookmark={onToggleBookmark}
                onSelectArticle={onSelectArticle}
                onAskOmnix={(art) =>
                  onAskOmnix(`What are the local and global impacts of "${art.title}"?`, art)
                }
                onShare={onShare}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
