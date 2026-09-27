import React, { useState } from 'react';
import { Sparkles, ArrowRight, Check } from 'lucide-react';
import { NewsCategory } from '../types';
import { CATEGORIES_LIST } from '../data/mockNews';

interface OnboardingModalProps {
  onComplete: (selected: NewsCategory[]) => void;
  onSkip: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ onComplete, onSkip }) => {
  const [selected, setSelected] = useState<NewsCategory[]>([
    'AI',
    'Technology',
    'Space',
    'Karnataka',
    'Davanagere',
    'Science',
    'Climate',
  ]);

  const toggleCategory = (cat: NewsCategory) => {
    if (cat === 'All') return;
    if (selected.includes(cat)) {
      if (selected.length > 1) {
        setSelected(selected.filter((c) => c !== cat));
      }
    } else {
      setSelected([...selected, cat]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl animate-in fade-in">
      <div className="relative w-full max-w-xl rounded-3xl glass-panel shadow-2xl border border-cyan-500/40 overflow-hidden p-6 sm:p-8">
        <div className="text-center max-w-md mx-auto mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-teal-400 p-[1.5px] mx-auto mb-4 shadow-lg shadow-cyan-500/30">
            <div className="w-full h-full bg-gray-950 rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-cyan-400 animate-pulse" />
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 font-mono">
            Welcome to OMNIX
          </h2>
          <h3 className="text-sm sm:text-base font-semibold text-cyan-300 mb-2">
            “News that talks back.”
          </h3>
          <p className="text-xs sm:text-sm text-gray-300">
            Let's personalize your real-time news intelligence feed. Select topics that matter to you:
          </p>
        </div>

        {/* Category Pill Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 max-h-56 overflow-y-auto p-1">
          {CATEGORIES_LIST.filter((c) => c !== 'All').map((cat) => {
            const isSelected = selected.includes(cat as NewsCategory);
            return (
              <button
                key={cat}
                onClick={() => toggleCategory(cat as NewsCategory)}
                className={`text-xs px-3.5 py-1.5 rounded-xl transition-all border ${
                  isSelected
                    ? 'bg-cyan-500 text-gray-950 font-bold border-cyan-400 shadow-md shadow-cyan-500/25'
                    : 'bg-white/5 text-gray-300 border-white/10 hover:border-cyan-500/40 hover:text-white'
                }`}
              >
                {isSelected && <span className="mr-1">✓</span>}
                {cat}
              </button>
            );
          })}
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <button
            onClick={onSkip}
            className="text-xs text-gray-400 hover:text-white transition-colors"
          >
            Skip for now
          </button>

          <button
            onClick={() => onComplete(selected)}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-gray-950 font-bold text-xs sm:text-sm hover:opacity-90 shadow-lg shadow-cyan-500/30 flex items-center space-x-1.5"
          >
            <span>Start Exploring OMNIX</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
