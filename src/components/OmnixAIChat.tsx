import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Mic,
  Volume2,
  VolumeX,
  Copy,
  Check,
  RotateCcw,
  Trash2,
  Share2,
  ExternalLink,
  Plus,
  Compass,
  ArrowRight,
  Bot,
  User,
  Radio,
  FileText,
  Zap,
  Search,
  CheckCircle,
  Lightbulb,
  Cpu
} from 'lucide-react';
import { ChatMessage, GroundingSource, Article, AiRoleId, AiRoleConfig } from '../types';
import { playTtsAudio, stopTtsAudio, createSpeechRecognizer } from '../utils/audio';

const AI_ROLES: AiRoleConfig[] = [
  {
    id: 'news_anchor',
    name: 'News Anchor',
    tagline: 'Balanced Global Intelligence',
    model: 'gemini-3.5-flash',
    badge: 'General Tasks • Search Grounded',
    speed: 'Balanced',
    description: 'Synthesizes primary wires, regional alerts, and real-time Google Search context.',
    iconName: 'Radio',
  },
  {
    id: 'deep_analyst',
    name: 'Deep Analyst',
    tagline: 'Complex Multi-Horizon Reasoning',
    model: 'gemini-3.1-pro-preview',
    badge: 'Complex Tasks • Pro Reasoning',
    speed: 'Deep Reasoning',
    description: 'Explores macroeconomic ripple effects, geopolitical strategy, and counterfactuals.',
    iconName: 'Cpu',
  },
  {
    id: 'flash_wire',
    name: 'Flash Wire',
    tagline: 'Ultra-Fast Instant Dispatch',
    model: 'gemini-3.1-flash-lite',
    badge: 'Fast Tasks • Minimal Latency',
    speed: 'Instant',
    description: 'Delivers zero-fluff headline bullets and key metrics in under 3 seconds.',
    iconName: 'Zap',
  },
  {
    id: 'fact_checker',
    name: 'Fact-Checker',
    tagline: 'Audit & Source Verification',
    model: 'gemini-3.5-flash',
    badge: 'Source Verification • Evidence Audit',
    speed: 'Balanced',
    description: 'Cross-references primary claims against official records and identifies discrepancies.',
    iconName: 'CheckCircle',
  },
  {
    id: 'explainer',
    name: 'ELIF15 Explainer',
    tagline: 'Plain-English Demystifier',
    model: 'gemini-3.5-flash',
    badge: 'Plain Language • Vivid Analogies',
    speed: 'Balanced',
    description: 'Breaks down complex policies, scientific discoveries, and tech into intuitive ideas.',
    iconName: 'Lightbulb',
  },
];

interface OmnixAIChatProps {
  initialPrompt?: string;
  contextArticle?: Article | null;
  onClearContextArticle?: () => void;
  onSelectArticle?: (articleId: string) => void;
  onOpenShareModal?: (title: string, summary: string) => void;
  onOpenLiveVoice?: () => void;
  onOpenTranscribe?: () => void;
}

export const OmnixAIChat: React.FC<OmnixAIChatProps> = ({
  initialPrompt = '',
  contextArticle = null,
  onClearContextArticle,
  onSelectArticle,
  onOpenShareModal,
  onOpenLiveVoice,
  onOpenTranscribe,
}) => {
  const [selectedRole, setSelectedRole] = useState<AiRoleId>('news_anchor');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: `Hello, I'm **OMNIX AI** — your conversational guide to the world's latest news.\n\nI continuously synthesize primary news wires, scientific publications, and regional bulletins. You can switch between specialized AI roles above (*Deep Analyst, Flash Wire, Fact-Checker, News Anchor, ELIF15*) or talk in real-time with **Live Voice**.\n\n*“News that talks back.”* How can I help you understand today's events?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedFollowUps: [
        "What are today's biggest world stories?",
        'What happened in Karnataka and Davanagere today?',
        'Explain today\'s economy news.',
        'Give me the latest technology news.',
        'Summarize the biggest stories in 60 seconds.'
      ]
    }
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentRoleConfig = AI_ROLES.find((r) => r.id === selectedRole) || AI_ROLES[0];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle initial prompt if passed
  useEffect(() => {
    if (initialPrompt && initialPrompt.trim()) {
      handleSendMessage(initialPrompt.trim());
    }
  }, [initialPrompt]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: messages.slice(-6),
          contextArticle: contextArticle,
          role: selectedRole,
        }),
      });

      const data = await response.json();

      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || 'No response returned.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: data.sources || [],
        suggestedFollowUps: data.suggestedFollowUps || [
          'What are the key implications of this?',
          'What happened before this?',
          'What are the different perspectives on this story?'
        ],
        relatedArticleId: contextArticle?.id,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const fallbackMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: `OMNIX AI is running in local resilience mode.\n\n• Verified developments are monitored across multi-source feeds.\n• You can ask about key facts, timelines, or local Karnataka & global impacts.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedFollowUps: [
          'What are today\'s biggest world stories?',
          'What happened in India today?'
        ]
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };


  const handleRegenerate = async (lastUserText: string) => {
    await handleSendMessage(lastUserText);
  };

  const handleClearChat = () => {
    stopTtsAudio();
    setSpeakingMessageId(null);
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'assistant',
        text: `New conversation started. What would you like to explore today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedFollowUps: [
          "What are today's biggest world stories?",
          'Explain today\'s economy news.',
          'Give me the latest technology news.'
        ]
      }
    ]);
  };

  const handleVoiceInput = () => {
    if (isListening) return;
    const recognizer = createSpeechRecognizer(
      (transcript) => {
        setIsListening(false);
        handleSendMessage(transcript);
      },
      (err) => {
        console.warn('Voice recognition error:', err);
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
      alert('Speech recognition is not available in your browser.');
    }
  };

  const handleSpeak = async (msg: ChatMessage) => {
    if (speakingMessageId === msg.id) {
      stopTtsAudio();
      setSpeakingMessageId(null);
      return;
    }

    stopTtsAudio();
    setSpeakingMessageId(msg.id);

    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: msg.text.slice(0, 400), voice: 'Kore' }),
      });
      const data = await res.json();

      await playTtsAudio(
        data.audio,
        msg.text,
        () => setSpeakingMessageId(msg.id),
        () => setSpeakingMessageId(null)
      );
    } catch {
      await playTtsAudio(
        null,
        msg.text,
        () => setSpeakingMessageId(msg.id),
        () => setSpeakingMessageId(null)
      );
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header bar */}
      <div className="rounded-2xl glass-panel p-4 sm:p-5 border border-cyan-500/20 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xl shadow-cyan-950/20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-teal-400 p-[1.5px] shadow-lg shadow-cyan-500/30">
            <div className="w-full h-full bg-gray-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-bold text-white font-mono">OMNIX AI</h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 font-mono border border-cyan-500/30">
                {currentRoleConfig.model} • {currentRoleConfig.speed}
              </span>
            </div>
            <p className="text-xs text-gray-400">
              {currentRoleConfig.tagline} — “News that talks back.”
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Live Voice Trigger */}
          {onOpenLiveVoice && (
            <button
              onClick={onOpenLiveVoice}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-teal-500/20 to-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 transition-all shadow-sm"
              title="Start real-time voice conversation with gemini-3.8-live"
            >
              <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>Live Voice</span>
              <span className="text-[9px] px-1 py-0.2 rounded bg-cyan-400 text-gray-950 font-bold">
                LIVE API
              </span>
            </button>
          )}

          {/* Audio Transcribe Trigger */}
          {onOpenTranscribe && (
            <button
              onClick={onOpenTranscribe}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-gray-200 border border-white/10 hover:border-cyan-500/40 transition-all"
              title="Transcribe news recording with gemini-3.5-transcribe"
            >
              <FileText className="w-3.5 h-3.5 text-teal-400" />
              <span>Transcribe Audio</span>
            </button>
          )}

          {contextArticle && (
            <div className="flex items-center space-x-2 px-2.5 py-1 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-xs text-cyan-300">
              <span className="truncate max-w-[120px] sm:max-w-[180px]">Context: {contextArticle.title}</span>
              {onClearContextArticle && (
                <button onClick={onClearContextArticle} className="text-gray-400 hover:text-white">✕</button>
              )}
            </div>
          )}

          <button
            onClick={handleClearChat}
            className="p-2 rounded-xl text-gray-400 hover:text-rose-400 hover:bg-white/5 border border-white/5 transition-all text-xs flex items-center space-x-1"
            title="Start new conversation"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">New Chat</span>
          </button>
        </div>
      </div>

      {/* AI Role Selection Bar */}
      <div className="mb-4 bg-white/5 p-2 rounded-2xl border border-white/10 flex items-center gap-2 overflow-x-auto scrollbar-none">
        <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider pl-2 pr-1 hidden sm:inline whitespace-nowrap">
          AI Role:
        </span>
        {AI_ROLES.map((role) => {
          const isSelected = selectedRole === role.id;
          return (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-cyan-500 text-gray-950 font-bold shadow-md shadow-cyan-500/30'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
              title={`${role.name}: ${role.description} (Model: ${role.model})`}
            >
              <span>{role.name}</span>
              <span
                className={`text-[9px] px-1 rounded ${
                  isSelected
                    ? 'bg-gray-950/20 text-gray-900 font-semibold'
                    : 'bg-white/10 text-cyan-300 font-mono'
                }`}
              >
                {role.model.replace('gemini-', '')}
              </span>
            </button>
          );
        })}
      </div>

      {/* Chat Messages Container */}
      <div className="rounded-2xl glass-panel border border-cyan-500/20 p-4 sm:p-6 min-h-[500px] max-h-[650px] overflow-y-auto space-y-5 flex flex-col">
        {messages.map((msg, index) => {
          const isUser = msg.sender === 'user';
          const isSpeaking = speakingMessageId === msg.id;

          return (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  isUser
                    ? 'bg-cyan-600 text-gray-950 font-bold'
                    : 'bg-gradient-to-tr from-cyan-500 to-teal-400 p-[1px]'
                }`}
              >
                {isUser ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <div className="w-full h-full bg-gray-950 rounded-[11px] flex items-center justify-center">
                    <Bot className="w-4 h-4 text-cyan-400" />
                  </div>
                )}
              </div>

              {/* Message bubble */}
              <div className={`max-w-[85%] sm:max-w-[78%] flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                    isUser
                      ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-lg shadow-cyan-600/20 rounded-tr-sm font-medium'
                      : 'glass-panel bg-gray-900/60 border border-white/10 text-gray-200 rounded-tl-sm'
                  }`}
                >
                  {msg.text}

                  {/* Grounding Sources (Live Web Links) */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-white/10">
                      <div className="text-[11px] font-semibold text-cyan-400 flex items-center gap-1 mb-2">
                        <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
                        Grounded Live Sources:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {msg.sources.map((src, sIdx) => (
                          <a
                            key={sIdx}
                            href={src.uri}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-white/5 hover:bg-cyan-500/20 text-[11px] text-gray-300 hover:text-cyan-300 border border-white/10 hover:border-cyan-500/30 transition-all"
                          >
                            <ExternalLink className="w-3 h-3 text-cyan-400" />
                            <span className="truncate max-w-[160px]">{src.title}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Message action bar */}
                <div className="flex items-center space-x-2 mt-1 px-1 text-[11px] text-gray-400">
                  <span>{msg.timestamp}</span>

                  {!isUser && (
                    <>
                      <span>•</span>
                      {/* TTS Speak */}
                      <button
                        onClick={() => handleSpeak(msg)}
                        className={`hover:text-cyan-300 transition-colors flex items-center space-x-1 ${
                          isSpeaking ? 'text-cyan-400 animate-pulse' : ''
                        }`}
                        title={isSpeaking ? 'Stop Audio' : 'Listen with OMNIX Voice'}
                      >
                        {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                        <span className="text-[10px]">{isSpeaking ? 'Playing' : 'Listen'}</span>
                      </button>

                      {/* Copy */}
                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="hover:text-cyan-300 transition-colors"
                        title="Copy to clipboard"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {/* Share */}
                      {onOpenShareModal && (
                        <button
                          onClick={() => onOpenShareModal('OMNIX AI Intelligence', msg.text)}
                          className="hover:text-cyan-300 transition-colors"
                          title="Share answer"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </>
                  )}
                </div>

                {/* Suggested follow-up chips if latest message */}
                {!isUser && index === messages.length - 1 && msg.suggestedFollowUps && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {msg.suggestedFollowUps.map((prompt, pIdx) => (
                      <button
                        key={pIdx}
                        onClick={() => handleSendMessage(prompt)}
                        className="text-xs px-2.5 py-1 rounded-lg bg-cyan-950/40 hover:bg-cyan-900/40 text-cyan-300 border border-cyan-500/20 hover:border-cyan-500/40 transition-all flex items-center space-x-1"
                      >
                        <span>{prompt}</span>
                        <ArrowRight className="w-3 h-3 text-cyan-400" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-teal-400 p-[1px] shrink-0">
              <div className="w-full h-full bg-gray-950 rounded-[11px] flex items-center justify-center">
                <Bot className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <div className="glass-panel p-3.5 rounded-2xl rounded-tl-sm border border-white/10 flex items-center space-x-2 text-xs text-gray-300">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
              <span>OMNIX is synthesizing multi-source live knowledge...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(input);
        }}
        className="mt-4 relative glass-panel rounded-2xl p-2 border border-cyan-500/30 focus-within:border-cyan-400 shadow-xl"
      >
        <div className="flex items-center space-x-2 px-3 py-1">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask follow-up, drill into specifics, or request comparisons…"
            className="w-full bg-transparent border-0 text-white placeholder-gray-400 text-sm focus:ring-0 focus:outline-none"
            disabled={isLoading}
          />

          {/* Voice Input */}
          <button
            type="button"
            onClick={handleVoiceInput}
            className={`p-2 rounded-xl transition-all shrink-0 ${
              isListening
                ? 'bg-rose-500 text-white animate-bounce'
                : 'text-gray-400 hover:text-cyan-300 hover:bg-white/5'
            }`}
            title="Speak Question"
          >
            <Mic className="w-4 h-4" />
          </button>

          {/* Send */}
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-gray-950 font-bold text-xs sm:text-sm hover:opacity-90 disabled:opacity-40 transition-all shrink-0 flex items-center space-x-1"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>

        {isListening && (
          <div className="flex items-center justify-center space-x-1 py-1.5 border-t border-white/5 mt-1 text-xs text-rose-400">
            <span>Listening to voice input...</span>
            <span className="w-1 h-3 bg-rose-400 animate-pulse rounded-full"></span>
            <span className="w-1 h-5 bg-rose-400 animate-pulse delay-75 rounded-full"></span>
            <span className="w-1 h-3 bg-rose-400 animate-pulse delay-150 rounded-full"></span>
          </div>
        )}
      </form>
    </div>
  );
};
