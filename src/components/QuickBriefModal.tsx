import React, { useState } from 'react';
import { X, Zap, ChevronRight, ChevronLeft, Sparkles, Check } from 'lucide-react';
import { Article } from '../types';

interface QuickBriefModalProps {
  onClose: () => void;
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const QuickBriefModal: React.FC<QuickBriefModalProps> = ({
  onClose,
  articles,
  onSelectArticle,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const quickStories = articles.slice(0, 6);
  const current = quickStories[currentIndex] || quickStories[0];

  const handleNext = () => {
    if (currentIndex < quickStories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in">
      <div className="relative w-full max-w-lg rounded-3xl glass-panel shadow-2xl border border-amber-500/30 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 bg-gray-950/90 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-amber-400 fill-amber-400" />
            <div>
              <h3 className="font-bold text-sm text-white">⚡ Quick Brief</h3>
              <p className="text-[10px] text-gray-400">“Today's news in 60 seconds.”</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono text-amber-400 font-bold">
              {currentIndex + 1} / {quickStories.length}
            </span>
            <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Dots */}
        <div className="w-full bg-gray-900 h-1 flex">
          {quickStories.map((_, idx) => (
            <div
              key={idx}
              className={`flex-1 h-full transition-all duration-300 ${
                idx <= currentIndex ? 'bg-amber-400' : 'bg-transparent'
              }`}
            />
          ))}
        </div>

        {/* Story Card */}
        <div className="p-6 space-y-4">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-gray-900 border border-white/10">
            <img src={current.imageUrl} alt={current.title} className="w-full h-full object-cover" />
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-gray-950/80 backdrop-blur text-[10px] font-bold text-cyan-300">
              {current.category}
            </div>
          </div>

          <div className="text-xs text-gray-400 font-mono flex items-center space-x-2">
            <span>{current.source}</span>
            <span>•</span>
            <span>{current.readTimeMinutes} min read</span>
          </div>

          <h2 className="text-lg font-bold text-white leading-snug">{current.title}</h2>

          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs sm:text-sm text-amber-100 leading-relaxed font-medium">
            {current.summary}
          </div>
        </div>

        {/* Footer controls */}
        <div className="p-4 bg-gray-950/80 border-t border-white/10 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="px-3 py-1.5 rounded-xl text-xs text-gray-400 hover:text-white disabled:opacity-30 flex items-center space-x-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onSelectArticle(current);
            }}
            className="text-xs text-cyan-400 hover:underline"
          >
            Read Full Article
          </button>

          <button
            onClick={handleNext}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-950 font-bold text-xs hover:opacity-90 flex items-center space-x-1"
          >
            <span>{currentIndex === quickStories.length - 1 ? 'Finish' : 'Next'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
