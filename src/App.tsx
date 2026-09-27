/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Article, NewsCategory, NotificationItem } from './types';
import { INITIAL_ARTICLES } from './data/mockNews';
import { loadUserState, saveUserState, UserState } from './utils/storage';
import { Header } from './components/Header';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { FloatingAskOmnix } from './components/FloatingAskOmnix';

// Pages
import { HomePage } from './pages/HomePage';
import { CategoriesPage } from './pages/CategoriesPage';
import { SearchPage } from './pages/SearchPage';
import { ExplorePage } from './pages/ExplorePage';
import { SavedPage } from './pages/SavedPage';
import { OmnixAIChat } from './components/OmnixAIChat';

// Modals
import { ArticleModal } from './components/ArticleModal';
import { MorningBriefModal } from './components/MorningBriefModal';
import { QuickBriefModal } from './components/QuickBriefModal';
import { ExplainWorldModal } from './components/ExplainWorldModal';
import { AiCompareModal } from './components/AiCompareModal';
import { ProfileModal } from './components/ProfileModal';
import { SystemStatusModal } from './components/SystemStatusModal';
import { OnboardingModal } from './components/OnboardingModal';
import { ShareCardModal } from './components/ShareCardModal';
import { LiveVoiceModal } from './components/LiveVoiceModal';
import { AudioTranscribeModal } from './components/AudioTranscribeModal';

export default function App() {
  const [userState, setUserState] = useState<UserState>(() => loadUserState());
  const [activeTab, setActiveTab] = useState<string>('home');
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);

  // Modals state
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [contextArticleForChat, setContextArticleForChat] = useState<Article | null>(null);
  const [chatPromptFromElsewhere, setChatPromptFromElsewhere] = useState<string>('');
  
  const [showMorningBrief, setShowMorningBrief] = useState(false);
  const [showQuickBrief, setShowQuickBrief] = useState(false);
  const [showExplainWorld, setShowExplainWorld] = useState(false);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSystemStatus, setShowSystemStatus] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showLiveVoice, setShowLiveVoice] = useState(false);
  const [showTranscribeModal, setShowTranscribeModal] = useState(false);
  const [shareData, setShareData] = useState<{ article?: Article; title?: string; text?: string } | null>(null);

  // Sync state to LocalStorage
  useEffect(() => {
    saveUserState(userState);
  }, [userState]);

  // Sync theme
  useEffect(() => {
    const root = document.documentElement;
    if (userState.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [userState.theme]);

  // First time onboarding check
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('omnix_onboarded_v1');
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  // Global Keyboard shortcuts (e.g. Cmd+K for search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setActiveTab('search');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleBookmark = (articleId: string) => {
    setUserState((prev) => {
      const exists = prev.savedArticleIds.includes(articleId);
      const newSaved = exists
        ? prev.savedArticleIds.filter((id) => id !== articleId)
        : [...prev.savedArticleIds, articleId];
      return { ...prev, savedArticleIds: newSaved };
    });
  };

  const handleClearAllBookmarks = () => {
    setUserState((prev) => ({ ...prev, savedArticleIds: [] }));
  };

  const handleToggleTheme = () => {
    setUserState((prev) => ({
      ...prev,
      theme: prev.theme === 'dark' ? 'light' : 'dark',
    }));
  };

  const handleOpenArticle = (article: Article) => {
    setSelectedArticle(article);
    // Track read history & subtle achievement
    setUserState((prev) => {
      const alreadyRead = prev.readArticleIds.includes(article.id);
      const updated = alreadyRead ? prev.readArticleIds : [...prev.readArticleIds, article.id];
      return {
        ...prev,
        readArticleIds: updated,
        achievements: { ...prev.achievements, firstStory: true },
      };
    });
  };

  const handleAskOmnix = (prompt: string, contextArt?: Article) => {
    setChatPromptFromElsewhere(prompt);
    if (contextArt) {
      setContextArticleForChat(contextArt);
    }
    setActiveTab('ai-chat');
    // increment inquiry count
    setUserState((prev) => ({
      ...prev,
      askedAiCount: prev.askedAiCount + 1,
      achievements: {
        ...prev.achievements,
        curiousMind: prev.askedAiCount + 1 >= 5,
      },
    }));
  };

  const handleSelectNotification = (notif: NotificationItem) => {
    // mark read
    setUserState((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) =>
        n.id === notif.id ? { ...n, read: true } : n
      ),
    }));

    if (notif.articleId) {
      const matched = articles.find((a) => a.id === notif.articleId);
      if (matched) {
        setSelectedArticle(matched);
      }
    }
  };

  const handleClearNotifications = () => {
    setUserState((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) => ({ ...n, read: true })),
    }));
  };

  const handleCompleteOnboarding = (selectedInterests: NewsCategory[]) => {
    setUserState((prev) => ({
      ...prev,
      interests: selectedInterests,
    }));
    localStorage.setItem('omnix_onboarded_v1', 'true');
    setShowOnboarding(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSearch={() => setActiveTab('search')}
        onOpenMorningBrief={() => setShowMorningBrief(true)}
        onOpenQuickBrief={() => setShowQuickBrief(true)}
        onOpenProfile={() => setShowProfile(true)}
        onOpenSystemStatus={() => setShowSystemStatus(true)}
        onOpenLiveVoice={() => setShowLiveVoice(true)}
        onOpenTranscribe={() => setShowTranscribeModal(true)}
        theme={userState.theme}
        onToggleTheme={handleToggleTheme}
        demoMode={userState.demoMode}
        notifications={userState.notifications}
        onSelectNotification={handleSelectNotification}
        onClearNotifications={handleClearNotifications}
        savedCount={userState.savedArticleIds.length}
      />

      {/* Main Page View */}
      <main className="flex-1 pb-16 md:pb-0">
        {activeTab === 'home' && (
          <HomePage
            articles={articles}
            savedArticleIds={userState.savedArticleIds}
            userInterests={userState.interests}
            onToggleBookmark={handleToggleBookmark}
            onSelectArticle={handleOpenArticle}
            onAskOmnix={handleAskOmnix}
            onShare={(art) => setShareData({ article: art })}
            onOpenQuickBrief={() => setShowQuickBrief(true)}
            onNavigateToCategory={(cat) => {
              setActiveTab('categories');
            }}
            onOpenLiveVoice={() => setShowLiveVoice(true)}
            onOpenTranscribe={() => setShowTranscribeModal(true)}
          />
        )}

        {activeTab === 'latest' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6 pb-4 border-b border-white/10">
              <h1 className="text-3xl font-extrabold text-white font-mono">Latest Breaking News</h1>
              <p className="text-sm text-gray-400">Real-time chronologically sorted intelligence stream</p>
            </div>
            <HomePage
              articles={articles}
              savedArticleIds={userState.savedArticleIds}
              userInterests={userState.interests}
              onToggleBookmark={handleToggleBookmark}
              onSelectArticle={handleOpenArticle}
              onAskOmnix={handleAskOmnix}
              onShare={(art) => setShareData({ article: art })}
              onOpenQuickBrief={() => setShowQuickBrief(true)}
              onNavigateToCategory={() => setActiveTab('categories')}
            />
          </div>
        )}

        {activeTab === 'categories' && (
          <CategoriesPage
            articles={articles}
            savedArticleIds={userState.savedArticleIds}
            userInterests={userState.interests}
            onToggleInterest={(cat) => {
              const current = userState.interests;
              const updated = current.includes(cat)
                ? current.filter((c) => c !== cat)
                : [...current, cat];
              setUserState((prev) => ({ ...prev, interests: updated }));
            }}
            onToggleBookmark={handleToggleBookmark}
            onSelectArticle={handleOpenArticle}
            onAskOmnix={handleAskOmnix}
            onShare={(art) => setShareData({ article: art })}
          />
        )}

        {activeTab === 'trending' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6 pb-4 border-b border-white/10">
              <h1 className="text-3xl font-extrabold text-white font-mono">Trending Velocity</h1>
              <p className="text-sm text-gray-400">Stories gaining significant algorithmic momentum</p>
            </div>
            <HomePage
              articles={[...articles].sort((a, b) => b.trendingScore - a.trendingScore)}
              savedArticleIds={userState.savedArticleIds}
              userInterests={userState.interests}
              onToggleBookmark={handleToggleBookmark}
              onSelectArticle={handleOpenArticle}
              onAskOmnix={handleAskOmnix}
              onShare={(art) => setShareData({ article: art })}
              onOpenQuickBrief={() => setShowQuickBrief(true)}
              onNavigateToCategory={() => setActiveTab('categories')}
            />
          </div>
        )}

        {activeTab === 'search' && (
          <SearchPage
            articles={articles}
            savedArticleIds={userState.savedArticleIds}
            onToggleBookmark={handleToggleBookmark}
            onSelectArticle={handleOpenArticle}
            onAskOmnix={handleAskOmnix}
            onShare={(art) => setShareData({ article: art })}
          />
        )}

        {activeTab === 'ai-chat' && (
          <OmnixAIChat
            initialPrompt={chatPromptFromElsewhere}
            contextArticle={contextArticleForChat}
            onClearContextArticle={() => setContextArticleForChat(null)}
            onSelectArticle={(id) => {
              const matched = articles.find((a) => a.id === id);
              if (matched) handleOpenArticle(matched);
            }}
            onOpenShareModal={(title, text) => setShareData({ title, text })}
            onOpenLiveVoice={() => setShowLiveVoice(true)}
            onOpenTranscribe={() => setShowTranscribeModal(true)}
          />
        )}

        {activeTab === 'explore' && (
          <ExplorePage
            articles={articles}
            savedArticleIds={userState.savedArticleIds}
            onToggleBookmark={handleToggleBookmark}
            onSelectArticle={handleOpenArticle}
            onAskOmnix={handleAskOmnix}
            onShare={(art) => setShareData({ article: art })}
            onOpenExplainWorld={() => setShowExplainWorld(true)}
            onOpenCompare={() => setShowCompareModal(true)}
          />
        )}

        {activeTab === 'saved' && (
          <SavedPage
            articles={articles}
            savedArticleIds={userState.savedArticleIds}
            onToggleBookmark={handleToggleBookmark}
            onClearAllBookmarks={handleClearAllBookmarks}
            onSelectArticle={handleOpenArticle}
            onAskOmnix={handleAskOmnix}
            onShare={(art) => setShareData({ article: art })}
            onNavigateHome={() => setActiveTab('home')}
          />
        )}
      </main>

      {/* Persistent Floating "Ask OMNIX" button */}
      <FloatingAskOmnix
        currentArticle={selectedArticle}
        onNavigateToFullChat={(prompt) => {
          if (prompt) setChatPromptFromElsewhere(prompt);
          setActiveTab('ai-chat');
        }}
      />

      {/* Footer */}
      <Footer onOpenSystemStatus={() => setShowSystemStatus(true)} />

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSearch={() => setActiveTab('search')}
        savedCount={userState.savedArticleIds.length}
      />

      {/* Modals & Overlays */}
      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
          isBookmarked={userState.savedArticleIds.includes(selectedArticle.id)}
          onToggleBookmark={handleToggleBookmark}
          onAskOmnix={(prompt, art) => {
            setSelectedArticle(null);
            handleAskOmnix(prompt, art);
          }}
          onShare={(art) => setShareData({ article: art })}
          allArticles={articles}
          onSelectArticle={handleOpenArticle}
        />
      )}

      {showMorningBrief && (
        <MorningBriefModal
          onClose={() => setShowMorningBrief(false)}
          articles={articles}
          onSelectArticle={handleOpenArticle}
        />
      )}

      {showQuickBrief && (
        <QuickBriefModal
          onClose={() => setShowQuickBrief(false)}
          articles={articles}
          onSelectArticle={handleOpenArticle}
        />
      )}

      {showExplainWorld && (
        <ExplainWorldModal
          onClose={() => setShowExplainWorld(false)}
          onAskOmnix={(prompt) => {
            setShowExplainWorld(false);
            handleAskOmnix(prompt);
          }}
        />
      )}

      {showCompareModal && (
        <AiCompareModal
          onClose={() => setShowCompareModal(false)}
          articles={articles}
        />
      )}

      {showProfile && (
        <ProfileModal
          userState={userState}
          onUpdateState={(partial) => setUserState((prev) => ({ ...prev, ...partial }))}
          onClose={() => setShowProfile(false)}
        />
      )}

      {showSystemStatus && (
        <SystemStatusModal
          onClose={() => setShowSystemStatus(false)}
          demoMode={userState.demoMode}
          onToggleDemoMode={() =>
            setUserState((prev) => ({ ...prev, demoMode: !prev.demoMode }))
          }
        />
      )}

      {showOnboarding && (
        <OnboardingModal
          onComplete={handleCompleteOnboarding}
          onSkip={() => {
            localStorage.setItem('omnix_onboarded_v1', 'true');
            setShowOnboarding(false);
          }}
        />
      )}

      {shareData && (
        <ShareCardModal
          article={shareData.article}
          customTitle={shareData.title}
          customText={shareData.text}
          onClose={() => setShareData(null)}
        />
      )}

      {showLiveVoice && (
        <LiveVoiceModal
          onClose={() => setShowLiveVoice(false)}
          onOpenChatWithTopic={(topic) => {
            setShowLiveVoice(false);
            handleAskOmnix(topic);
          }}
        />
      )}

      {showTranscribeModal && (
        <AudioTranscribeModal
          onClose={() => setShowTranscribeModal(false)}
          onDiscussInChat={(transcriptContext) => {
            setShowTranscribeModal(false);
            handleAskOmnix(transcriptContext);
          }}
        />
      )}
    </div>
  );
}
