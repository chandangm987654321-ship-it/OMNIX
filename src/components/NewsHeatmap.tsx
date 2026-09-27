import React from 'react';
import { TrendingUp, Flame, AlertCircle } from 'lucide-react';
import { NEWS_HEATMAP } from '../data/mockNews';

interface NewsHeatmapProps {
  onSelectTopic: (topicName: string) => void;
}

export const NewsHeatmap: React.FC<NewsHeatmapProps> = ({ onSelectTopic }) => {
  return (
    <div className="rounded-2xl glass-panel p-5 border border-cyan-500/20 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-white/10 gap-2">
        <div className="flex items-center space-x-2">
          <Flame className="w-4 h-4 text-cyan-400" />
          <h3 className="font-bold text-sm text-white">News Velocity Heatmap</h3>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 font-mono">
            LIVE SIGNALS
          </span>
        </div>
        <div className="flex items-center space-x-1 text-[11px] text-gray-400">
          <AlertCircle className="w-3.5 h-3.5 text-cyan-400/70" />
          <span>Automated news volume & engagement velocity signal</span>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4">
        {NEWS_HEATMAP.map((item, index) => {
          const isHigh = item.trend === 'up_fast';
          const isUp = item.trend === 'up';
          const isDown = item.trend === 'down';

          return (
            <div
              key={index}
              onClick={() => onSelectTopic(item.name)}
              className="p-3 rounded-xl bg-white/[0.02] hover:bg-cyan-950/30 border border-white/5 hover:border-cyan-500/40 cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono text-gray-400">{item.category}</span>
                <span
                  className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    isHigh
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : isUp
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : isDown
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : 'bg-white/10 text-gray-300'
                  }`}
                >
                  {item.delta}
                </span>
              </div>

              <div className="font-semibold text-xs text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                {item.name}
              </div>

              {/* Mini velocity bar */}
              <div className="mt-2 w-full bg-gray-800 rounded-full h-1 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isHigh
                      ? 'bg-gradient-to-r from-cyan-500 to-teal-400'
                      : isUp
                      ? 'bg-emerald-400'
                      : isDown
                      ? 'bg-rose-400'
                      : 'bg-gray-400'
                  }`}
                  style={{ width: `${item.score}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
