import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Sparkles,
  Volume2,
  VolumeX,
  Share2,
  Bookmark,
  Languages,
  Clock,
  ExternalLink,
  Layers,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  History,
  Users,
  Compass,
  ArrowRight,
  Maximize2,
  Minimize2,
  Type
} from 'lucide-react';
import { Article, SupportedLanguage } from '../types';
import { formatRelativeTime } from '../utils/storage';
import { playTtsAudio, stopTtsAudio } from '../utils/audio';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
  onAskOmnix: (prompt: string, contextArticle: Article) => void;
  onShare: (article: Article) => void;
  allArticles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onAskOmnix,
  onShare,
  allArticles,
  onSelectArticle,
}) => {
  if (!article) return null;

  const [activeTab, setActiveTab] = useState<'article' | 'ai-insights' | 'cluster' | 'timeline'>('article');
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [focusMode, setFocusMode] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>('English');
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [readProgress, setReadProgress] = useState(0);

  const contentRef = useRef<HTMLDivElement>(null);

  const languages: SupportedLanguage[] = [
    'English',
    'Hindi',
    'Kannada',
    'Tamil',
    'Telugu',
    'Malayalam',
    'Marathi',
    'Bengali',
  ];

  // Reading progress scroll handler
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const progress = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
    setReadProgress(Math.min(100, Math.max(0, progress)));
  };

  const handleTranslate = async (lang: SupportedLanguage) => {
    setSelectedLanguage(lang);
    if (lang === 'English') {
      setTranslatedText(null);
      return;
    }

    setIsTranslating(true);
    try {
      const res = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          headline: article.title,
          content: article.content,
          type: 'translate',
          targetLanguage: lang,
        }),
      });
      const data = await res.json();
      setTranslatedText(data.result);
    } catch {
      setTranslatedText(`[${lang}]: Translation temporarily unavailable in local preview.`);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleReadAloud = async () => {
    if (isPlayingAudio) {
      stopTtsAudio();
      setIsPlayingAudio(false);
      return;
    }

    setIsPlayingAudio(true);
    const textToRead = `${article.title}. ${article.summary}. Published by ${article.source}. ${article.whyItMatters}`;

    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textToRead }),
      });
      const data = await res.json();

      await playTtsAudio(
        data.audio,
        textToRead,
        () => setIsPlayingAudio(true),
        () => setIsPlayingAudio(false)
      );
    } catch {
      await playTtsAudio(
        null,
        textToRead,
        () => setIsPlayingAudio(true),
        () => setIsPlayingAudio(false)
      );
    }
  };

  // Close audio on unmount or close
  useEffect(() => {
    return () => {
      stopTtsAudio();
    };
  }, []);

  // Related recommendations
  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id && (a.category === article.category || a.tags.some((t) => article.tags.includes(t))))
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in">
      <div
        className={`relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl glass-panel shadow-2xl border border-cyan-500/30 overflow-hidden ${
          focusMode ? 'max-w-3xl bg-gray-950' : ''
        }`}
      >
        {/* Reading Progress Bar */}
        <div className="w-full bg-gray-800 h-1">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-teal-400 transition-all duration-150"
            style={{ width: `${readProgress}%` }}
          />
        </div>

        {/* Modal Top Bar */}
        <div className="px-5 py-3.5 bg-gray-950/90 border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
              {article.category}
            </span>
            <span className="text-gray-400 text-xs hidden sm:inline">•</span>
            <span className="text-xs text-gray-300 font-medium hidden sm:inline">{article.source}</span>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center space-x-2">
            {/* Font size toggle */}
            <button
              onClick={() => {
                if (fontSize === 'normal') setFontSize('large');
                else if (fontSize === 'large') setFontSize('xlarge');
                else setFontSize('normal');
              }}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all text-xs flex items-center"
              title="Adjust text size"
            >
              <Type className="w-4 h-4 mr-0.5" />
              <span className="text-[10px] font-mono uppercase">{fontSize}</span>
            </button>

            {/* Read Aloud */}
            <button
              onClick={handleReadAloud}
              className={`p-1.5 rounded-lg transition-all flex items-center space-x-1 ${
                isPlayingAudio
                  ? 'bg-cyan-500 text-gray-950 font-bold animate-pulse'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
              title={isPlayingAudio ? 'Stop reading' : 'Read aloud'}
            >
              {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
              <span className="text-xs hidden sm:inline">{isPlayingAudio ? 'Pause' : 'Listen'}</span>
            </button>

            {/* Focus Mode */}
            <button
              onClick={() => setFocusMode(!focusMode)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all hidden sm:block"
              title={focusMode ? 'Exit Focus Mode' : 'Focus Mode'}
            >
              {focusMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Bookmark */}
            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`p-1.5 rounded-lg border transition-all ${
                isBookmarked
                  ? 'bg-cyan-500 text-gray-950 border-cyan-400'
                  : 'text-gray-300 hover:text-white border-white/10 hover:border-cyan-500/30'
              }`}
              title="Save Story"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-gray-950' : ''}`} />
            </button>

            {/* Share */}
            <button
              onClick={() => onShare(article)}
              className="p-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all"
              title="Share article card"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs inside modal */}
        <div className="px-5 bg-gray-950/60 border-b border-white/5 flex items-center space-x-4 overflow-x-auto text-xs shrink-0">
          <button
            onClick={() => setActiveTab('article')}
            className={`py-2.5 font-medium border-b-2 transition-all ${
              activeTab === 'article'
                ? 'border-cyan-400 text-cyan-300 font-bold'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            Full Story
          </button>
          <button
            onClick={() => setActiveTab('ai-insights')}
            className={`py-2.5 font-medium border-b-2 transition-all flex items-center space-x-1.5 ${
              activeTab === 'ai-insights'
                ? 'border-cyan-400 text-cyan-300 font-bold'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI Synthesis & Facts</span>
          </button>
          {article.cluster && (
            <button
              onClick={() => setActiveTab('cluster')}
              className={`py-2.5 font-medium border-b-2 transition-all flex items-center space-x-1.5 ${
                activeTab === 'cluster'
                  ? 'border-cyan-400 text-cyan-300 font-bold'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>Multi-Source Cluster</span>
            </button>
          )}
          {article.timeline && article.timeline.length > 0 && (
            <button
              onClick={() => setActiveTab('timeline')}
              className={`py-2.5 font-medium border-b-2 transition-all flex items-center space-x-1.5 ${
                activeTab === 'timeline'
                  ? 'border-cyan-400 text-cyan-300 font-bold'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              <History className="w-3.5 h-3.5 text-cyan-400" />
              <span>Story Timeline</span>
            </button>
          )}
        </div>

        {/* Scrollable Content */}
        <div
          ref={contentRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6"
        >
          {/* TAB 1: FULL STORY */}
          {activeTab === 'article' && (
            <div>
              {/* Headline */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4 font-mono">
                {article.title}
              </h1>

              {/* Source & Publication metadata */}
              <div className="flex flex-wrap items-center justify-between text-xs text-gray-400 pb-4 mb-6 border-b border-white/10 gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-cyan-300">{article.source}</span>
                  <span>•</span>
                  <span>By {article.author}</span>
                  <span>•</span>
                  <span>Published {formatRelativeTime(article.publishedAt)}</span>
                  <span>•</span>
                  <span>Updated {formatRelativeTime(article.updatedAt)}</span>
                </div>

                <div className="flex items-center space-x-1 text-gray-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{article.readTimeMinutes} min read</span>
                </div>
              </div>

              {/* Hero Image */}
              {!focusMode && (
                <div className="relative rounded-2xl overflow-hidden mb-6 aspect-[16/9] max-h-[380px] w-full border border-white/10">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-60" />
                </div>
              )}

              {/* Executive Summary Card */}
              <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 mb-6">
                <div className="flex items-center space-x-2 text-cyan-300 font-semibold text-xs mb-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>QUICK TAKEAWAY</span>
                </div>
                <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-medium">
                  {article.summary}
                </p>
              </div>

              {/* Translation selector */}
              <div className="flex flex-wrap items-center gap-2 p-2.5 rounded-xl bg-white/[0.02] border border-white/10 mb-6 text-xs">
                <div className="flex items-center space-x-1 text-cyan-400 font-medium">
                  <Languages className="w-4 h-4" />
                  <span>Translate to:</span>
                </div>
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleTranslate(lang)}
                    className={`px-2 py-0.5 rounded-md transition-all ${
                      selectedLanguage === lang
                        ? 'bg-cyan-500 text-gray-950 font-bold'
                        : 'bg-white/5 text-gray-300 hover:text-white'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              {/* Translated Text if selected */}
              {translatedText && (
                <div className="p-4 rounded-2xl bg-teal-950/30 border border-teal-500/30 mb-6 text-xs sm:text-sm text-teal-200 whitespace-pre-wrap leading-relaxed">
                  <div className="font-bold text-teal-400 mb-1">Translated into {selectedLanguage}:</div>
                  {isTranslating ? 'Translating via OMNIX AI...' : translatedText}
                </div>
              )}

              {/* Main Article Body */}
              <div
                className={`text-gray-200 leading-relaxed space-y-4 whitespace-pre-line ${
                  fontSize === 'xlarge'
                    ? 'text-lg sm:text-xl'
                    : fontSize === 'large'
                    ? 'text-base sm:text-lg'
                    : 'text-sm sm:text-base'
                }`}
              >
                {article.content}
              </div>

              {/* What Changed Section (Developing Story) */}
              {article.whatChanged && (
                <div className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-blue-950/30 to-cyan-950/30 border border-blue-500/30">
                  <div className="flex items-center space-x-2 text-cyan-300 font-bold text-xs sm:text-sm mb-3">
                    <History className="w-4 h-4 text-cyan-400" />
                    <span>WHAT CHANGED? (DEVELOPING STORY)</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-gray-950/60 border border-white/5">
                      <span className="text-[10px] font-mono text-gray-400 block mb-1 uppercase tracking-wider">Earlier</span>
                      <p className="text-gray-300">{article.whatChanged.earlier}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-gray-950/60 border border-cyan-500/30">
                      <span className="text-[10px] font-mono text-cyan-400 block mb-1 uppercase tracking-wider">Now</span>
                      <p className="text-gray-200 font-medium">{article.whatChanged.now}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-gray-950/60 border border-emerald-500/30">
                      <span className="text-[10px] font-mono text-emerald-400 block mb-1 uppercase tracking-wider">Fundamental Change</span>
                      <p className="text-emerald-200 font-medium">{article.whatChanged.changed}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Transparency Source Info Panel */}
              <div className="mt-8 p-4 rounded-xl bg-white/[0.02] border border-white/10 text-xs text-gray-400 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="font-semibold text-gray-300">Original Reporting Bureau:</span> {article.source} • Verified via Primary Distribution
                </div>
                {article.sourceUrl && (
                  <a
                    href={article.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-cyan-400 hover:underline"
                  >
                    <span>Visit Original Outlet</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              {/* Special Feature: Still Curious? Ask After Reading */}
              <div className="mt-8 p-5 rounded-2xl glass-panel border border-cyan-500/30">
                <div className="flex items-center space-x-2 text-white font-bold text-sm mb-3">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Still Curious? Ask OMNIX About This Story</span>
                </div>
                <p className="text-xs text-gray-300 mb-3">
                  Click any suggested inquiry to continue the live conversation with full article context:
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    `Why is "${article.title}" important?`,
                    'Who is most directly affected by this?',
                    'What happened before this event?',
                    'What could happen next in the coming months?',
                    'Compare major perspectives on this issue.',
                  ].map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => onAskOmnix(q, article)}
                      className="text-xs px-3 py-1.5 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-500/20 hover:border-cyan-400 transition-all flex items-center space-x-1.5 text-left"
                    >
                      <span>{q}</span>
                      <ArrowRight className="w-3 h-3 text-cyan-400 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Continue Exploring Recommendations */}
              {relatedArticles.length > 0 && (
                <div className="mt-10 pt-6 border-t border-white/10">
                  <h4 className="text-sm font-bold text-white mb-4 flex items-center space-x-2">
                    <Compass className="w-4 h-4 text-cyan-400" />
                    <span>Continue Exploring Related Stories</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {relatedArticles.map((rel) => (
                      <div
                        key={rel.id}
                        onClick={() => onSelectArticle(rel)}
                        className="p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-cyan-500/30 cursor-pointer transition-all group"
                      >
                        <div className="aspect-[16/10] rounded-lg overflow-hidden mb-2 bg-gray-900">
                          <img
                            src={rel.imageUrl}
                            alt={rel.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <span className="text-[10px] text-cyan-400 font-semibold">{rel.category}</span>
                        <h5 className="text-xs font-semibold text-white group-hover:text-cyan-300 line-clamp-2 mt-1">
                          {rel.title}
                        </h5>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: AI INSIGHTS & FACTS */}
          {activeTab === 'ai-insights' && (
            <div className="space-y-6">
              {/* Why It Matters */}
              <div className="p-5 rounded-2xl bg-cyan-950/30 border border-cyan-500/30">
                <h3 className="text-sm font-bold text-cyan-300 mb-2 flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Why It Matters</span>
                </h3>
                <p className="text-sm text-gray-200 leading-relaxed">
                  {article.whyItMatters}
                </p>
              </div>

              {/* Verified Key Facts */}
              <div className="p-5 rounded-2xl glass-panel border border-white/10">
                <h3 className="text-sm font-bold text-white mb-3 flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Verified Key Facts</span>
                </h3>
                <ul className="space-y-2.5">
                  {article.keyFacts.map((fact, idx) => (
                    <li key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-gray-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0"></span>
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key People */}
              {article.keyPeople && article.keyPeople.length > 0 && (
                <div className="p-5 rounded-2xl glass-panel border border-white/10">
                  <h3 className="text-sm font-bold text-white mb-3 flex items-center space-x-2">
                    <Users className="w-4 h-4 text-cyan-400" />
                    <span>Key People Involved</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {article.keyPeople.map((person, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                        <div className="font-semibold text-xs sm:text-sm text-white">{person.name}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{person.role}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: MULTI-SOURCE CLUSTER */}
          {activeTab === 'cluster' && article.cluster && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-cyan-950/30 border border-cyan-500/30">
                <div className="text-xs text-cyan-400 font-mono uppercase mb-1">Multi-Source Cluster</div>
                <h3 className="text-base font-bold text-white">{article.cluster.topic}</h3>
                <p className="text-xs text-gray-300 mt-1">
                  OMNIX cross-references multiple independent reporting bureaus to separate consensus facts from diverging angles.
                </p>
              </div>

              {/* What sources agree on */}
              <div className="p-5 rounded-2xl glass-panel border border-emerald-500/30">
                <h4 className="text-sm font-bold text-emerald-400 mb-3 flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>What Multiple Outlets Agree On (Consensus)</span>
                </h4>
                <ul className="space-y-2">
                  {article.cluster.consensusPoints.map((pt, idx) => (
                    <li key={idx} className="text-xs sm:text-sm text-gray-300 flex items-start space-x-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key differences */}
              <div className="p-5 rounded-2xl glass-panel border border-amber-500/30">
                <h4 className="text-sm font-bold text-amber-400 mb-3 flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>Important Differences & Editorial Framing</span>
                </h4>
                <ul className="space-y-2">
                  {article.cluster.keyDifferences.map((diff, idx) => (
                    <li key={idx} className="text-xs sm:text-sm text-gray-300 flex items-start space-x-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{diff}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Individual Sources List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Participating Sources</h4>
                {article.cluster.sources.map((src, idx) => (
                  <div key={idx} className="p-4 rounded-xl glass-panel border border-white/5 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-cyan-300">{src.sourceName}</span>
                      <span className="text-gray-500">{src.publishedTime}</span>
                    </div>
                    <div className="text-xs font-semibold text-white">"{src.headline}"</div>
                    <p className="text-xs text-gray-400">{src.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: TIMELINE */}
          {activeTab === 'timeline' && article.timeline && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white mb-2 flex items-center space-x-2">
                <History className="w-4 h-4 text-cyan-400" />
                <span>Story Chronology & Milestones</span>
              </h3>
              <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-cyan-500/30">
                {article.timeline.map((event, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-6 top-1.5 w-2.5 h-2.5 rounded-full bg-cyan-400 ring-4 ring-gray-950"></div>
                    <div className="text-xs font-mono text-cyan-300 font-semibold mb-0.5">
                      {event.time}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-200">
                      {event.event}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
