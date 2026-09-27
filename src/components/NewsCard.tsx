import React, { useState } from 'react';
import {
  Bookmark,
  Share2,
  Sparkles,
  Clock,
  Layers,
  HelpCircle,
  TrendingUp,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { Article } from '../types';
import { formatRelativeTime } from '../utils/storage';

interface NewsCardProps {
  article: Article;
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
  onSelectArticle: (article: Article) => void;
  onAskOmnix: (article: Article) => void;
  onShare: (article: Article) => void;
}

export const NewsCard: React.FC<NewsCardProps> = ({
  article,
  isBookmarked,
  onToggleBookmark,
  onSelectArticle,
  onAskOmnix,
  onShare,
}) => {
  const [showWhyReason, setShowWhyReason] = useState(false);

  return (
    <article className="group relative rounded-2xl glass-panel glass-panel-hover overflow-hidden flex flex-col justify-between transition-all duration-300 border border-white/10 hover:border-cyan-500/40">
      <div>
        {/* Card Header & Thumbnail */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-900">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent" />

          {/* Top Urgent Badges & Bookmark */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <div className="flex items-center space-x-1.5">
              {article.isBreaking && (
                <span className="flex items-center space-x-1 px-2 py-0.5 rounded-md bg-red-600/90 text-white text-[10px] font-bold font-mono shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                  <span>BREAKING</span>
                </span>
              )}

              {article.trendingScore > 90 && (
                <span className="flex items-center space-x-1 px-2 py-0.5 rounded-md bg-amber-500/90 backdrop-blur-md text-gray-950 text-[10px] font-bold font-mono shadow-sm">
                  <TrendingUp className="w-3 h-3" />
                  <span>TRENDING</span>
                </span>
              )}
            </div>

            {/* Bookmark Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(article.id);
              }}
              className={`p-1.5 rounded-lg backdrop-blur-md border transition-all ${
                isBookmarked
                  ? 'bg-cyan-500 text-gray-950 border-cyan-400'
                  : 'bg-gray-950/60 text-gray-300 hover:text-white border-white/10 hover:border-cyan-500/40'
              }`}
              title={isBookmarked ? 'Remove Bookmark' : 'Save Story'}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-gray-950' : ''}`} />
            </button>
          </div>
        </div>

        {/* Card Content Body */}
        <div className="p-4 sm:p-5">
          {/* Zero-Pill Clean Typographic Kicker */}
          <div className="flex items-center flex-wrap gap-1.5 text-xs text-gray-400 mb-2 font-mono">
            <span className="font-semibold text-cyan-300 uppercase tracking-wider">{article.category}</span>
            <span aria-hidden="true" className="text-gray-600">·</span>
            <span className="text-gray-300">{article.source}</span>
            <span aria-hidden="true" className="text-gray-600">·</span>
            <span>{formatRelativeTime(article.publishedAt)}</span>
            <span aria-hidden="true" className="text-gray-600">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-gray-500 inline" />
              {article.readTimeMinutes}m
            </span>
          </div>
          {/* Location pill if available */}
          {article.location && (
            <div className="flex items-center space-x-1 text-[11px] text-gray-400 mb-2">
              <MapPin className="w-3 h-3 text-cyan-400" />
              <span>
                {article.location.city ? `${article.location.city}, ` : ''}
                {article.location.state ? `${article.location.state}, ` : ''}
                {article.location.country}
              </span>
            </div>
          )}

          {/* Title */}
          <h3
            onClick={() => onSelectArticle(article)}
            className="font-bold text-base sm:text-lg text-white group-hover:text-cyan-300 transition-colors line-clamp-2 cursor-pointer mb-2 leading-snug"
          >
            {article.title}
          </h3>

          {/* Summary */}
          <p className="text-xs sm:text-sm text-gray-300 line-clamp-2 mb-4 leading-relaxed">
            {article.summary}
          </p>

          {/* Story Cluster indicator */}
          {article.cluster && (
            <div className="mb-3 px-2.5 py-1.5 rounded-lg bg-cyan-950/40 border border-cyan-500/20 flex items-center justify-between text-[11px]">
              <div className="flex items-center space-x-1.5 text-cyan-300 font-medium">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>Story Cluster: {article.cluster.sources.length} outlets covering</span>
              </div>
              <span className="text-[10px] text-cyan-400/80 underline cursor-pointer" onClick={() => onSelectArticle(article)}>
                Compare
              </span>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {article.tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-gray-300 border border-white/5"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="px-4 sm:px-5 pb-4 pt-2 border-t border-white/5 flex items-center justify-between">
        {/* Left: Ask OMNIX AI Button */}
        <button
          onClick={() => onAskOmnix(article)}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-all shadow-sm shadow-cyan-500/10"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Ask OMNIX</span>
        </button>

        {/* Right Tools: Share & Why seeing this */}
        <div className="flex items-center space-x-1.5">
          {/* Transparency: Why seeing this */}
          <div className="relative">
            <button
              onClick={() => setShowWhyReason(!showWhyReason)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-white/5 transition-all"
              title="Why am I seeing this story?"
            >
              <HelpCircle className="w-3.5 h-3.5" />
            </button>

            {showWhyReason && (
              <div className="absolute bottom-8 right-0 w-64 p-3 rounded-xl glass-panel shadow-2xl z-20 border border-cyan-500/30 text-[11px] animate-in fade-in">
                <p className="font-semibold text-cyan-300 mb-1">Why am I seeing this story?</p>
                <p className="text-gray-300">
                  {article.recommendationReason ||
                    'Shown based on timeliness, verification confidence, and trending velocity in this category.'}
                </p>
                <button
                  onClick={() => setShowWhyReason(false)}
                  className="mt-2 text-[10px] text-cyan-400 hover:underline block ml-auto"
                >
                  Dismiss
                </button>
              </div>
            )}
          </div>

          {/* Share */}
          <button
            onClick={() => onShare(article)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-white/5 transition-all"
            title="Share Article & Summary"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
};
