import React, { useState } from 'react';
import {
  Radio,
  Search,
  Sparkles,
  Bookmark,
  Compass,
  Grid,
  TrendingUp,
  Clock,
  Bell,
  Sun,
  Moon,
  User,
  Zap,
  Coffee,
  CheckCircle2,
  Sliders,
  ChevronDown,
  FileText
} from 'lucide-react';
import { NotificationItem } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSearch: () => void;
  onOpenMorningBrief: () => void;
  onOpenQuickBrief: () => void;
  onOpenProfile: () => void;
  onOpenSystemStatus: () => void;
  onOpenLiveVoice?: () => void;
  onOpenTranscribe?: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  demoMode: boolean;
  notifications: NotificationItem[];
  onSelectNotification: (notif: NotificationItem) => void;
  onClearNotifications: () => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  onOpenMorningBrief,
  onOpenQuickBrief,
  onOpenProfile,
  onOpenSystemStatus,
  onOpenLiveVoice,
  onOpenTranscribe,
  theme,
  onToggleTheme,
  demoMode,
  notifications,
  onSelectNotification,
  onClearNotifications,
  savedCount,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const navItems = [
    { id: 'home', label: 'Home', icon: Radio },
    { id: 'latest', label: 'Latest', icon: Clock },
    { id: 'categories', label: 'Categories', icon: Grid },
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'ai-chat', label: 'AI Chat', icon: Sparkles, badge: 'Live AI' },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'saved', label: 'Saved', icon: Bookmark, count: savedCount },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-cyan-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Brand */}
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setActiveTab('home')}
              className="group flex items-center space-x-2.5 focus:outline-none"
            >
              <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 via-teal-500 to-blue-600 p-[1.5px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-400/40 transition-all">
                <div className="w-full h-full bg-gray-950 rounded-[10px] flex items-center justify-center">
                  <div className="relative w-3.5 h-3.5">
                    <span className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-75"></span>
                    <span className="relative block w-3.5 h-3.5 rounded-full bg-cyan-400"></span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-extrabold text-xl tracking-wider text-white flex items-center gap-1.5 font-mono">
                  OMNIX
                  <span className="text-[10px] font-sans font-semibold tracking-normal px-1.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                    LIVE
                  </span>
                </span>
                <span className="text-[10px] text-cyan-200/60 font-medium tracking-tight -mt-1 hidden sm:inline">
                  News that talks back
                </span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`relative px-3 py-1.5 rounded-lg text-xs lg:text-sm font-medium transition-all flex items-center space-x-1.5 ${
                      isActive
                        ? 'text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 shadow-sm shadow-cyan-500/10'
                        : 'text-gray-400 hover:text-gray-200 hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-gray-400'}`} />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[9px] px-1 py-0.2 rounded bg-gradient-to-r from-cyan-500 to-teal-400 text-gray-950 font-bold ml-1 animate-pulse">
                        {item.badge}
                      </span>
                    )}
                    {item.count !== undefined && item.count > 0 && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/10 text-cyan-300 ml-1">
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Live Voice Button (gemini-3.8-live) */}
            {onOpenLiveVoice && (
              <button
                onClick={onOpenLiveVoice}
                className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-teal-500/20 to-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 transition-all shadow-sm"
                title="Start real-time voice conversation with gemini-3.8-live"
              >
                <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span className="hidden sm:inline">Live Voice</span>
              </button>
            )}

            {/* Audio Transcribe Button (gemini-3.5-transcribe) */}
            {onOpenTranscribe && (
              <button
                onClick={onOpenTranscribe}
                className="hidden md:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white/5 text-gray-300 border border-white/10 hover:border-cyan-500/40 hover:text-cyan-300 transition-all"
                title="Transcribe news clips with gemini-3.5-transcribe"
              >
                <FileText className="w-3.5 h-3.5 text-teal-400" />
                <span>Transcribe</span>
              </button>
            )}

            {/* Quick Brief & Morning Brief */}
            <button
              onClick={onOpenQuickBrief}
              className="hidden lg:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-amber-500/10 to-yellow-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 transition-all"
              title="Today's news in 60 seconds"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>Quick Brief</span>
            </button>

            <button
              onClick={onOpenMorningBrief}
              className="hidden lg:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white/5 text-gray-300 border border-white/10 hover:border-cyan-500/40 hover:text-cyan-300 transition-all"
              title="Daily curated digest"
            >
              <Coffee className="w-3.5 h-3.5 text-cyan-400" />
              <span>Morning Brief</span>
            </button>

            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs text-gray-400 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/30 transition-all"
            >
              <Search className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden sm:inline px-1 py-0.5 text-[9px] bg-black/40 rounded border border-white/10 text-gray-400">
                ⌘K
              </kbd>
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 ring-2 ring-gray-950 animate-pulse"></span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl glass-panel shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 border border-cyan-500/20">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center space-x-2">
                      <Bell className="w-4 h-4 text-cyan-400" />
                      <span className="font-semibold text-sm text-white">Notifications</span>
                      {unreadCount > 0 && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={onClearNotifications}
                        className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Mark all read</span>
                      </button>
                    )}
                  </div>

                  <div className="mt-3 space-y-2 max-h-72 overflow-y-auto pr-1">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-gray-400 text-center py-6">No notifications right now.</p>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => {
                            onSelectNotification(notif);
                            setShowNotifications(false);
                          }}
                          className={`p-2.5 rounded-xl cursor-pointer transition-all border ${
                            notif.read
                              ? 'bg-transparent border-white/5 text-gray-400 hover:bg-white/5'
                              : 'bg-cyan-950/30 border-cyan-500/30 text-gray-200 hover:bg-cyan-900/30'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <span className="font-medium text-xs text-white">{notif.title}</span>
                            <span className="text-[10px] text-gray-500 whitespace-nowrap ml-2">{notif.time}</span>
                          </div>
                          <p className="text-[11px] text-gray-300 mt-1 line-clamp-2">{notif.description}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Status / Demo Mode pill */}
            <button
              onClick={onOpenSystemStatus}
              className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-mono bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 transition-all"
              title="System & AI Status"
            >
              <span className={`w-2 h-2 rounded-full ${demoMode ? 'bg-amber-400' : 'bg-emerald-400 animate-pulse'}`}></span>
              <span>{demoMode ? 'DEMO' : 'LIVE AI'}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-cyan-400" />}
            </button>

            {/* Profile */}
            <button
              onClick={onOpenProfile}
              className="p-1.5 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-teal-500/20 border border-cyan-500/30 hover:border-cyan-400 transition-all"
              title="User Profile & Interests"
            >
              <User className="w-4 h-4 text-cyan-300" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
