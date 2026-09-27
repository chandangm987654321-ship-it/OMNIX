import React, { useState } from 'react';
import { X, Coffee, Volume2, VolumeX, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';
import { Article } from '../types';
import { playTtsAudio, stopTtsAudio } from '../utils/audio';

interface MorningBriefModalProps {
  onClose: () => void;
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const MorningBriefModal: React.FC<MorningBriefModalProps> = ({
  onClose,
  articles,
  onSelectArticle,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const briefSections = [
    { title: '1. Top World Story', category: 'AI', article: articles.find((a) => a.id === 'omx-001') },
    { title: '2. Top India & Karnataka', category: 'Karnataka', article: articles.find((a) => a.id === 'omx-003') || articles.find((a) => a.id === 'omx-002') },
    { title: '3. Top Technology Story', category: 'Technology', article: articles.find((a) => a.id === 'omx-004') },
    { title: '4. Business & Finance', category: 'Finance', article: articles.find((a) => a.id === 'omx-005') },
    { title: '5. Science & Space', category: 'Space', article: articles.find((a) => a.id === 'omx-002') },
    { title: '6. Global Climate', category: 'Climate', article: articles.find((a) => a.id === 'omx-009') },
    { title: '7. Trending Topic', category: 'Automotive', article: articles.find((a) => a.id === 'omx-006') },
  ];

  const handleListenBrief = async () => {
    if (isPlaying) {
      stopTtsAudio();
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    const script = `Good morning from OMNIX. Here is your 2-minute daily brief. First, in world technology, 28 nations have signed the Geneva Frontier Verification Accord to standardise AI evaluation. Second, in Karnataka, Davanagere has inaugurated a 400-acre smart agro-textile corridor alongside solar microgrids. Third, silicon photonics chips have demonstrated a 60 percent energy reduction in supercomputing clusters. Have a productive day ahead.`;

    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: script, voice: 'Kore' }),
      });
      const data = await res.json();
      await playTtsAudio(
        data.audio,
        script,
        () => setIsPlaying(true),
        () => setIsPlaying(false)
      );
    } catch {
      await playTtsAudio(
        null,
        script,
        () => setIsPlaying(true),
        () => setIsPlaying(false)
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl glass-panel shadow-2xl border border-cyan-500/30 overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-cyan-950/40 via-teal-950/30 to-gray-950/60 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
              <Coffee className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-lg text-white">OMNIX Morning Brief</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">
                  READ IN 2 MIN
                </span>
              </div>
              <p className="text-xs text-gray-300">Good morning. Here are today's biggest stories.</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 rounded-lg text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Audio Action Banner */}
        <div className="px-6 py-3 bg-white/[0.02] border-b border-white/5 flex items-center justify-between">
          <span className="text-xs text-gray-400">Audio synthesis available in natural anchor voice:</span>
          <button
            onClick={handleListenBrief}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              isPlaying
                ? 'bg-amber-500 text-gray-950 font-bold animate-pulse'
                : 'bg-white/5 text-amber-300 hover:bg-white/10 border border-amber-500/30'
            }`}
          >
            {isPlaying ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400" />}
            <span>{isPlaying ? 'Pause Brief' : 'Listen to Brief'}</span>
          </button>
        </div>

        {/* List of 7 brief points */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {briefSections.map((item, index) => {
            const art = item.article;
            return (
              <div
                key={index}
                className="p-3.5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-cyan-500/30 transition-all cursor-pointer group"
                onClick={() => {
                  if (art) {
                    onClose();
                    onSelectArticle(art);
                  }
                }}
              >
                <div className="flex items-center justify-between text-xs text-cyan-400 font-semibold mb-1">
                  <span>{item.title}</span>
                  <span className="text-[10px] text-gray-500">{art?.source || 'Wire'}</span>
                </div>
                <h4 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                  {art ? art.title : 'Global development update recorded across bureaus.'}
                </h4>
                <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                  {art ? art.summary : 'Full primary reporting available in directory.'}
                </p>
              </div>
            );
          })}
        </div>

        <div className="p-4 bg-gray-950/80 border-t border-white/10 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-cyan-500 text-gray-950 font-bold text-xs hover:bg-cyan-400 transition-all"
          >
            Done Reading
          </button>
        </div>
      </div>
    </div>
  );
};
