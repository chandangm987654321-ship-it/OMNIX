import React, { useState } from 'react';
import { X, Share2, Copy, Check, Sparkles } from 'lucide-react';
import { Article } from '../types';

interface ShareCardModalProps {
  article?: Article | null;
  customTitle?: string;
  customText?: string;
  onClose: () => void;
}

export const ShareCardModal: React.FC<ShareCardModalProps> = ({
  article,
  customTitle,
  customText,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  const title = article?.title || customTitle || 'OMNIX Intelligence Report';
  const summary = article?.summary || customText || 'Grounded multi-source news synthesis.';
  const source = article?.source || 'OMNIX Live';

  const shareText = `OMNIX — News that talks back\n\n"${title}"\n\n${summary}\n\nSource: ${source}\nExplore on OMNIX: ${window.location.origin}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in">
      <div className="relative w-full max-w-md rounded-3xl glass-panel shadow-2xl border border-cyan-500/30 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 bg-gray-950/90 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Share2 className="w-4 h-4 text-cyan-400" />
            <h3 className="font-bold text-sm text-white">Share OMNIX Intelligence</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Share Preview Card */}
        <div className="p-6">
          <div className="rounded-2xl p-5 bg-gradient-to-br from-gray-900 via-gray-950 to-cyan-950/60 border border-cyan-500/30 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="font-extrabold text-cyan-400 font-mono tracking-wider flex items-center gap-1.5">
                OMNIX
                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-cyan-500/20 text-cyan-300 font-sans">
                  AI SYNTHESIS
                </span>
              </span>
              <span className="text-[10px] text-gray-400 font-mono">{source}</span>
            </div>

            <h4 className="text-base font-bold text-white mb-2 leading-snug">{title}</h4>

            <p className="text-xs text-gray-300 line-clamp-3 leading-relaxed mb-4">{summary}</p>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-gray-400">
              <span>“News that talks back.”</span>
              <span className="text-cyan-400 font-semibold font-mono">omnix.ai</span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="p-4 bg-gray-950/80 border-t border-white/10 flex items-center justify-between">
          <button
            onClick={handleCopy}
            className="w-full py-2.5 rounded-xl bg-cyan-500 text-gray-950 font-bold text-xs hover:bg-cyan-400 flex items-center justify-center space-x-1.5 transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-950" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Share Card & Link'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
