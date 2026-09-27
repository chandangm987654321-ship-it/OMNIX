import React from 'react';
import { Radio, Sparkles, ChevronRight, Zap } from 'lucide-react';
import { Article } from '../types';
import { formatRelativeTime } from '../utils/storage';

interface BreakingBannerProps {
  breakingArticles: Article[];
  onSelectArticle: (article: Article) => void;
  onAskArticle: (article: Article) => void;
}

export const BreakingBanner: React.FC<BreakingBannerProps> = ({
  breakingArticles,
  onSelectArticle,
  onAskArticle,
}) => {
  if (!breakingArticles || breakingArticles.length === 0) return null;
  const primary = breakingArticles[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-red-950/40 via-cyan-950/30 to-gray-950/60 border border-red-500/30 shadow-xl shadow-red-950/20 p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center space-x-3.5 flex-1">
            {/* Live Indicator Beacon */}
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-red-600/20 border border-red-500/40 text-red-400 shrink-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-[11px] font-extrabold tracking-wider font-mono">BREAKING</span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 text-xs text-gray-400 mb-1">
                <span className="font-semibold text-cyan-300">{primary.source}</span>
                <span>•</span>
                <span>{formatRelativeTime(primary.publishedAt)}</span>
                {primary.location?.country && (
                  <>
                    <span>•</span>
                    <span className="text-gray-300">{primary.location.city ? `${primary.location.city}, ` : ''}{primary.location.country}</span>
                  </>
                )}
              </div>
              <h3
                onClick={() => onSelectArticle(primary)}
                className="text-base sm:text-lg font-bold text-white hover:text-cyan-300 cursor-pointer transition-colors line-clamp-1"
              >
                {primary.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 line-clamp-1 mt-0.5">
                {primary.summary}
              </p>
            </div>
          </div>

          {/* Action triggers */}
          <div className="flex items-center space-x-2 shrink-0 sm:self-center">
            <button
              onClick={() => onAskArticle(primary)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center space-x-1.5 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Ask OMNIX</span>
            </button>

            <button
              onClick={() => onSelectArticle(primary)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10 text-white border border-white/10 flex items-center space-x-1 transition-all"
            >
              <span>Read Story</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
