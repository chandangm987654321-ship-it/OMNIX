import React from 'react';
import { Trophy, Sparkles, ChevronRight, Info } from 'lucide-react';
import { Article } from '../types';

interface TopTenSectionProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onAskArticle: (article: Article) => void;
}

export const TopTenSection: React.FC<TopTenSectionProps> = ({
  articles,
  onSelectArticle,
  onAskArticle,
}) => {
  const top10 = [...articles].sort((a, b) => b.trendingScore - a.trendingScore).slice(0, 10);

  return (
    <div className="rounded-2xl glass-panel p-5 border border-cyan-500/20 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-white/10 gap-2">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
            <Trophy className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base text-white">TOP 10 TODAY</h3>
            <span className="text-[10px] text-gray-400">Algorithmic ranking by verification, recency & engagement</span>
          </div>
        </div>

        <div className="flex items-center space-x-1 text-[11px] text-cyan-300/80 bg-cyan-950/40 px-2.5 py-1 rounded-lg border border-cyan-500/20">
          <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span>OMNIX-generated synthesis signal • Not universal ranking</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
        {top10.map((article, index) => {
          const rank = index + 1;
          const isTopThree = rank <= 3;

          return (
            <div
              key={article.id}
              className="flex items-start space-x-3 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-cyan-500/30 transition-all cursor-pointer group"
              onClick={() => onSelectArticle(article)}
            >
              {/* Rank Badge */}
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 font-mono font-extrabold text-xs ${
                  isTopThree
                    ? 'bg-gradient-to-tr from-cyan-500 to-teal-400 text-gray-950 shadow-md shadow-cyan-500/20'
                    : 'bg-white/5 text-gray-400 border border-white/10'
                }`}
              >
                #{rank}
              </div>

              {/* Story Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 text-[10px] text-gray-400 mb-0.5">
                  <span className="text-cyan-300 font-semibold">{article.category}</span>
                  <span>•</span>
                  <span>{article.source}</span>
                  <span>•</span>
                  <span className="font-mono text-cyan-400">{article.trendingScore}% signal</span>
                </div>

                <h4 className="text-xs sm:text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                  {article.title}
                </h4>

                <p className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">
                  {article.summary}
                </p>
              </div>

              {/* Ask trigger */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAskArticle(article);
                }}
                className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 transition-all shrink-0"
                title="Ask OMNIX about this"
              >
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
