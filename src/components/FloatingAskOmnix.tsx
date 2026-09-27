import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, User, Volume2, ArrowRight } from 'lucide-react';
import { Article } from '../types';

interface FloatingAskOmnixProps {
  currentArticle?: Article | null;
  onNavigateToFullChat: (prompt?: string) => void;
}

export const FloatingAskOmnix: React.FC<FloatingAskOmnixProps> = ({
  currentArticle,
  onNavigateToFullChat,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [miniMessages, setMiniMessages] = useState<{ sender: 'user' | 'ai'; text: string }[]>([
    {
      sender: 'ai',
      text: 'Hi! Ask me anything about what you are currently reading or any global news.',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const query = input.trim();
    setInput('');
    setMiniMessages((prev) => [...prev, { sender: 'user', text: query }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          contextArticle: currentArticle,
        }),
      });
      const data = await res.json();
      setMiniMessages((prev) => [
        ...prev,
        { sender: 'ai', text: data.reply || 'Here is the latest intelligence.' },
      ]);
    } catch {
      setMiniMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: 'OMNIX is monitoring updates across international & local wires.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 md:bottom-8 right-5 z-40 p-3.5 rounded-full bg-gradient-to-tr from-cyan-500 via-teal-400 to-blue-600 text-gray-950 font-bold shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-400/70 hover:scale-105 active:scale-95 transition-all flex items-center space-x-2"
        title="Ask OMNIX AI"
      >
        <Sparkles className="w-5 h-5 text-gray-950 animate-pulse" />
        <span className="hidden sm:inline text-xs font-extrabold uppercase tracking-wide">
          Ask OMNIX
        </span>
      </button>

      {/* Slide-over Mini Drawer */}
      {isOpen && (
        <div className="fixed bottom-24 md:bottom-20 right-5 z-50 w-[350px] sm:w-[400px] rounded-2xl glass-panel shadow-2xl border border-cyan-500/30 overflow-hidden flex flex-col h-[480px] animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="p-3.5 bg-gray-950/80 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white font-mono">OMNIX Quick Assistant</h4>
                <p className="text-[10px] text-gray-400">Contextual live AI</p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onNavigateToFullChat();
                }}
                className="text-[10px] text-cyan-400 hover:underline px-1.5 py-0.5"
              >
                Expand
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3 text-xs">
            {miniMessages.map((m, idx) => (
              <div
                key={idx}
                className={`flex items-start space-x-2 ${
                  m.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                    m.sender === 'user' ? 'bg-cyan-600 text-white' : 'bg-gray-800 text-cyan-400'
                  }`}
                >
                  {m.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>
                <div
                  className={`p-2.5 rounded-xl max-w-[80%] whitespace-pre-wrap leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-cyan-600 text-white rounded-tr-none'
                      : 'bg-white/5 text-gray-200 border border-white/5 rounded-tl-none'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center space-x-2 text-[11px] text-cyan-400 py-1">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>Searching & synthesizing...</span>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-2 border-t border-white/10 bg-gray-950/80">
            <div className="flex items-center space-x-1.5">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about this story or any news..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2 rounded-xl bg-cyan-500 text-gray-950 font-bold hover:bg-cyan-400 disabled:opacity-40 transition-all shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
