import React, { useState } from 'react';
import { X, Globe2, Sparkles, Send, Users, History, Lightbulb, ArrowRight } from 'lucide-react';

interface ExplainWorldModalProps {
  onClose: () => void;
  onAskOmnix: (prompt: string) => void;
}

export const ExplainWorldModal: React.FC<ExplainWorldModalProps> = ({ onClose, onAskOmnix }) => {
  const [query, setQuery] = useState('Why are semiconductor chips important?');
  const [data, setData] = useState<any>({
    topic: 'Why are semiconductor chips important?',
    explanation: 'Semiconductors are the foundational building blocks of the modern digital economy. They control the flow of electricity in every electronic device—from smartphones and medical scanners to autonomous vehicles and artificial intelligence supercomputers. Because advanced fabrication requires billions in specialized capital, global semiconductor supply chains are both highly concentrated and geopolitically critical.',
    keyPlayers: [
      { name: 'TSMC (Taiwan)', role: 'Produces over 90% of global sub-5nm advanced chips' },
      { name: 'ASML (Netherlands)', role: 'Sole worldwide producer of Extreme Ultraviolet (EUV) photolithography machines' },
      { name: 'NVIDIA, AMD & Qualcomm (USA)', role: 'Architects of leading AI accelerators and mobile chipsets' },
      { name: 'India Semiconductor Mission', role: 'Building semiconductor fabrication and packaging ecosystem in Gujarat and Karnataka' }
    ],
    timeline: [
      { period: '1947', milestone: 'Invention of the point-contact transistor at Bell Labs.' },
      { period: '1971', milestone: 'First commercial single-chip microprocessor released (Intel 4004).' },
      { period: '2020-2023', milestone: 'Global pandemic supply crunches prompt trillions in national chips acts.' },
      { period: '2025-2026', milestone: 'Sub-2nm GAA nanosheet transistors enter commercial high-volume manufacturing.' }
    ],
    whyItMatters: 'National sovereignty, technological supremacy, and future industrial productivity depend entirely on secure, localized access to silicon fabrication and photonics.'
  });
  const [isLoading, setIsLoading] = useState(false);

  const popularTopics = [
    'Why are semiconductor chips important?',
    'What is happening with the energy transition?',
    'How do sovereign central bank digital currencies work?',
    'Why is deep lunar exploration heating up?',
  ];

  const handleExplore = async (topicToSearch: string) => {
    setQuery(topicToSearch);
    setIsLoading(true);

    try {
      const res = await fetch('/api/explore-topic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: topicToSearch }),
      });
      const result = await res.json();
      setData(result);
    } catch {
      setData({
        topic: topicToSearch,
        explanation: 'Comprehensive analysis synthesizing verified geopolitical, scientific, and industrial reports.',
        keyPlayers: [],
        timeline: [],
        whyItMatters: 'Directly shapes technological and economic policy.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in">
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-3xl glass-panel shadow-2xl border border-cyan-500/30 overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-cyan-950/60 via-blue-950/40 to-gray-950/80 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
              <Globe2 className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-lg text-white">Explain the World</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono">
                  DEEP EXPLORER
                </span>
              </div>
              <p className="text-xs text-gray-300">Understand complex topics through clear visual synthesis</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 rounded-lg text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar inside Explainer */}
        <div className="p-4 bg-white/[0.02] border-b border-white/5">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (query.trim()) handleExplore(query.trim());
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask to explain any world subject, technology, or conflict..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 rounded-xl bg-cyan-500 text-gray-950 font-bold text-xs hover:bg-cyan-400 disabled:opacity-40 flex items-center space-x-1"
            >
              <span>Explain</span>
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Prompt chips */}
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {popularTopics.map((pt, i) => (
              <button
                key={i}
                onClick={() => handleExplore(pt)}
                className="text-[11px] px-2.5 py-0.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-cyan-300 border border-white/5"
              >
                {pt}
              </button>
            ))}
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {isLoading ? (
            <div className="py-20 text-center space-y-3">
              <Sparkles className="w-8 h-8 text-cyan-400 animate-spin mx-auto" />
              <p className="text-sm text-gray-300">Synthesizing deep topic breakdown across verified sources...</p>
            </div>
          ) : (
            <>
              {/* Topic Headline */}
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block mb-1">
                  Topic Breakdown
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-mono">{data.topic}</h2>
              </div>

              {/* Simple Explanation */}
              <div className="p-5 rounded-2xl bg-cyan-950/30 border border-cyan-500/30">
                <div className="flex items-center space-x-2 text-cyan-300 font-bold text-xs mb-2">
                  <Lightbulb className="w-4 h-4 text-cyan-400" />
                  <span>The Core Explanation</span>
                </div>
                <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-medium">
                  {data.explanation}
                </p>
              </div>

              {/* Key Players */}
              {data.keyPlayers && data.keyPlayers.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center space-x-1.5">
                    <Users className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Key Players & Stakeholders</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {data.keyPlayers.map((player: any, idx: number) => (
                      <div key={idx} className="p-3.5 rounded-xl glass-panel border border-white/5">
                        <div className="font-semibold text-xs text-white">{player.name}</div>
                        <div className="text-xs text-gray-400 mt-1">{player.role}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Timeline */}
              {data.timeline && data.timeline.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center space-x-1.5">
                    <History className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Evolution & Milestones</span>
                  </h4>
                  <div className="space-y-2">
                    {data.timeline.map((item: any, idx: number) => (
                      <div key={idx} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-start space-x-3 text-xs">
                        <span className="font-mono text-cyan-400 font-bold shrink-0 min-w-[70px]">
                          {item.period}
                        </span>
                        <span className="text-gray-300">{item.milestone}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Why It Matters Today */}
              {data.whyItMatters && (
                <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs sm:text-sm text-emerald-200">
                  <span className="font-bold text-emerald-400 block mb-1">Why It Matters Today:</span>
                  {data.whyItMatters}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-950/80 border-t border-white/10 flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onAskOmnix(`Tell me more about "${data.topic}"`);
            }}
            className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
          >
            <span>Ask Follow-up in OMNIX AI</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

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
