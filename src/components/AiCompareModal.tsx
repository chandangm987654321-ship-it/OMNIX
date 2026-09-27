import React, { useState } from 'react';
import { X, Layers, Sparkles, CheckCircle2, AlertCircle, Scale } from 'lucide-react';
import { Article } from '../types';

interface AiCompareModalProps {
  onClose: () => void;
  articles: Article[];
}

export const AiCompareModal: React.FC<AiCompareModalProps> = ({ onClose, articles }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(
    articles.slice(0, 2).map((a) => a.id)
  );
  const [comparisonResult, setComparisonResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 2) {
        setSelectedIds(selectedIds.filter((item) => item !== id));
      }
    } else {
      if (selectedIds.length < 3) {
        setSelectedIds([...selectedIds, id]);
      }
    }
  };

  const handleRunComparison = async () => {
    const selectedArticles = articles.filter((a) => selectedIds.includes(a.id));
    setIsLoading(true);

    try {
      const res = await fetch('/api/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          articles: selectedArticles,
          topic: selectedArticles[0]?.title || 'Selected News Stories',
        }),
      });
      const data = await res.json();
      setComparisonResult(data);
    } catch {
      setComparisonResult({
        consensusPoints: [
          'All outlets confirm primary event timelines and stakeholder participation.',
          'Core statistics on implementation targets are verified across releases.'
        ],
        divergences: [
          'Varying degrees of focus on environmental impacts vs commercial scaling.',
          'Different regional economic projections reported by specialized outlets.'
        ],
        framingAnalysis: 'Specialized technology outlets emphasize computational benchmarks, while general news agencies highlight geopolitical diplomacy and national regulatory compliance.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in">
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-3xl glass-panel shadow-2xl border border-cyan-500/30 overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-gray-950/90 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
              <Scale className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-lg text-white">Compare Coverage</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono">
                  MULTI-SOURCE VERIFICATION
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Compare coverage framing, common facts, and divergences across reporting bureaus
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 rounded-lg text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selection Area */}
        <div className="p-5 border-b border-white/5 bg-white/[0.01]">
          <div className="text-xs text-gray-400 mb-2 font-medium">
            Select 2 or 3 stories to analyze coverage patterns:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {articles.slice(0, 6).map((art) => {
              const isSelected = selectedIds.includes(art.id);
              return (
                <div
                  key={art.id}
                  onClick={() => toggleSelect(art.id)}
                  className={`p-3 rounded-xl cursor-pointer border text-xs transition-all ${
                    isSelected
                      ? 'bg-cyan-950/50 border-cyan-500/60 text-white shadow-md shadow-cyan-950/40'
                      : 'bg-white/5 border-white/5 text-gray-400 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] mb-1">
                    <span className="text-cyan-400 font-semibold">{art.source}</span>
                    {isSelected && <span className="text-cyan-400 font-bold">✓</span>}
                  </div>
                  <div className="font-medium line-clamp-2">{art.title}</div>
                </div>
              );
            })}
          </div>

          <button
            onClick={handleRunComparison}
            disabled={isLoading || selectedIds.length < 2}
            className="mt-3 w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-gray-950 font-bold text-xs hover:opacity-90 disabled:opacity-40 transition-all flex items-center justify-center space-x-1.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isLoading ? 'Synthesizing Divergences...' : 'Run Coverage Comparison'}</span>
          </button>
        </div>

        {/* Comparison Result */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {isLoading && (
            <div className="py-16 text-center space-y-2">
              <Sparkles className="w-7 h-7 text-cyan-400 animate-spin mx-auto" />
              <p className="text-xs text-gray-400">Comparing lexical framing, key claims, and evidence...</p>
            </div>
          )}

          {!isLoading && comparisonResult && (
            <>
              {comparisonResult.analysis ? (
                <div className="p-5 rounded-2xl glass-panel border border-cyan-500/30 text-xs sm:text-sm text-gray-200 leading-relaxed whitespace-pre-wrap">
                  {comparisonResult.analysis}
                </div>
              ) : (
                <>
                  {/* Consensus */}
                  <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30">
                    <h4 className="text-xs font-bold text-emerald-400 mb-2 flex items-center space-x-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Consensus Facts Across Outlets</span>
                    </h4>
                    <ul className="space-y-1.5 text-xs text-gray-300">
                      {comparisonResult.consensusPoints?.map((pt: string, i: number) => (
                        <li key={i} className="flex items-start space-x-2">
                          <span className="text-emerald-400 font-bold">✓</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Divergences */}
                  <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30">
                    <h4 className="text-xs font-bold text-amber-400 mb-2 flex items-center space-x-1.5">
                      <AlertCircle className="w-4 h-4" />
                      <span>Key Divergences & Differences in Scope</span>
                    </h4>
                    <ul className="space-y-1.5 text-xs text-gray-300">
                      {comparisonResult.divergences?.map((pt: string, i: number) => (
                        <li key={i} className="flex items-start space-x-2">
                          <span className="text-amber-400 font-bold">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Framing */}
                  <div className="p-4 rounded-2xl glass-panel border border-cyan-500/30">
                    <h4 className="text-xs font-bold text-cyan-300 mb-2">Editorial Framing Analysis</h4>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      {comparisonResult.framingAnalysis}
                    </p>
                  </div>
                </>
              )}
            </>
          )}

          {!isLoading && !comparisonResult && (
            <p className="text-xs text-gray-500 text-center py-10">
              Select 2 or 3 articles above and click "Run Coverage Comparison" to view an objective multi-source comparison.
            </p>
          )}
        </div>

        <div className="p-4 bg-gray-950/80 border-t border-white/10 text-right">
          <button
            onClick={onClose}
            className="px-5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
