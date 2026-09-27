import React, { useState } from 'react';
import { Sparkles, ArrowRight, Mic, Search, Zap, Globe, Compass, Radio, FileText } from 'lucide-react';
import { createSpeechRecognizer } from '../utils/audio';

interface HeroSectionProps {
  onAskOmnix: (query: string) => void;
  onExploreLatest: () => void;
  onOpenQuickBrief: () => void;
  onOpenLiveVoice?: () => void;
  onOpenTranscribe?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onAskOmnix,
  onExploreLatest,
  onOpenQuickBrief,
  onOpenLiveVoice,
  onOpenTranscribe,
}) => {
  const [promptInput, setPromptInput] = useState('');
  const [isListening, setIsListening] = useState(false);

  const samplePrompts = [
    "What are today's biggest world stories?",
    "Explain today's economy news.",
    "What happened in India today?",
    "Give me the latest technology news.",
    "Summarize the biggest stories in 60 seconds.",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (promptInput.trim()) {
      onAskOmnix(promptInput.trim());
    }
  };

  const handleStartVoice = () => {
    if (isListening) return;
    const recognizer = createSpeechRecognizer(
      (transcript) => {
        setPromptInput(transcript);
        setIsListening(false);
        onAskOmnix(transcript);
      },
      (err) => {
        console.warn('Speech error:', err);
        setIsListening(false);
      },
      () => {
        setIsListening(false);
      }
    );

    if (recognizer) {
      setIsListening(true);
      recognizer.start();
    } else {
      alert('Voice recognition is not supported in this browser.');
    }
  };

  return (
    <div className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-16 px-4 sm:px-6 lg:px-8 ambient-grid">
      {/* Background radial gradient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-gradient-to-tr from-cyan-600/15 via-teal-500/10 to-blue-600/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Clean Unboxed Kicker */}
        <div className="flex items-center justify-center gap-2 text-xs text-cyan-300/80 mb-5 font-mono tracking-wide">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
          </span>
          <span className="font-semibold text-cyan-300">Live Neural Newsroom</span>
          <span aria-hidden="true" className="text-cyan-500/50">·</span>
          <span>Multi-Source Verification</span>
          <span aria-hidden="true" className="text-cyan-500/50">·</span>
          <span>Conversational Intelligence</span>
        </div>

        {/* Large Headline with Syne Display font */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold tracking-tight text-white mb-2 font-display">
          OMNIX
        </h1>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-300 via-teal-200 to-blue-400 bg-clip-text text-transparent mb-4">
          “News that talks back.”
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8 font-normal leading-relaxed text-balance">
          Discover what is happening now. Ask questions naturally. Understand the story through verified multi-source intelligence.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8">
          <button
            onClick={onExploreLatest}
            className="px-5 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-gray-950 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 transition-all flex items-center space-x-2"
          >
            <span>Explore Latest News</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onAskOmnix("What are today's biggest world stories?")}
            className="px-5 py-2.5 rounded-xl font-semibold text-sm glass-panel hover:bg-white/10 text-white border border-cyan-500/30 hover:border-cyan-400 transition-all flex items-center space-x-2"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Talk to OMNIX AI</span>
          </button>

          {onOpenLiveVoice && (
            <button
              onClick={onOpenLiveVoice}
              className="px-4 py-2.5 rounded-xl font-semibold text-sm bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border border-teal-500/30 transition-all flex items-center space-x-2"
            >
              <Radio className="w-4 h-4 text-teal-400 animate-pulse" />
              <span>Live Voice (gemini-3.8-live)</span>
            </button>
          )}

          {onOpenTranscribe && (
            <button
              onClick={onOpenTranscribe}
              className="px-4 py-2.5 rounded-xl font-semibold text-sm bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 hover:border-cyan-500/30 transition-all flex items-center space-x-2"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Transcribe Audio</span>
            </button>
          )}

          <button
            onClick={onOpenQuickBrief}
            className="px-4 py-2.5 rounded-xl font-semibold text-sm bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-all flex items-center space-x-2"
          >
            <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>60s Quick Brief</span>
          </button>
        </div>

        {/* Futuristic AI Conversation / Search Box */}
        <div className="max-w-3xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="relative glass-panel rounded-2xl p-2 border border-cyan-500/30 focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-500/20 shadow-2xl shadow-cyan-950/40 transition-all"
          >
            <div className="flex items-center space-x-2 px-3 py-1">
              <Sparkles className="w-5 h-5 text-cyan-400 shrink-0 animate-pulse" />
              <input
                type="text"
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder="Ask OMNIX anything about the latest news…"
                className="w-full bg-transparent border-0 text-white placeholder-gray-400 text-sm sm:text-base focus:ring-0 focus:outline-none"
              />

              {/* Voice Input Button */}
              <button
                type="button"
                onClick={handleStartVoice}
                className={`p-2 rounded-xl transition-all shrink-0 ${
                  isListening
                    ? 'bg-rose-500 text-white animate-bounce'
                    : 'text-gray-400 hover:text-cyan-300 hover:bg-white/5'
                }`}
                title={isListening ? 'Listening...' : 'Speak your question'}
              >
                <Mic className="w-4 h-4" />
              </button>

              {/* Submit Button */}
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-gray-950 font-bold text-xs sm:text-sm hover:opacity-90 transition-all shrink-0 flex items-center space-x-1"
              >
                <span>Ask</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Audio Waveform animation if listening */}
            {isListening && (
              <div className="flex items-center justify-center space-x-1 py-2 border-t border-white/5 mt-2">
                <span className="text-xs text-rose-400 mr-2 font-mono">Listening to your voice...</span>
                <span className="w-1 h-3 bg-rose-400 animate-pulse rounded-full"></span>
                <span className="w-1 h-5 bg-rose-400 animate-pulse delay-75 rounded-full"></span>
                <span className="w-1 h-6 bg-rose-400 animate-pulse delay-150 rounded-full"></span>
                <span className="w-1 h-4 bg-rose-400 animate-pulse delay-100 rounded-full"></span>
                <span className="w-1 h-2 bg-rose-400 animate-pulse rounded-full"></span>
              </div>
            )}
          </form>

          {/* Example Suggestions */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <Compass className="w-3 h-3 text-cyan-400" />
              Try asking:
            </span>
            {samplePrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => onAskOmnix(prompt)}
                className="text-xs px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-cyan-300 border border-white/5 hover:border-cyan-500/30 transition-all"
              >
                “{prompt}”
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
