import React from 'react';
import { Radio, Clock, Search, Sparkles, Bookmark } from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSearch: () => void;
  savedCount: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  savedCount,
}) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Radio },
    { id: 'latest', label: 'Latest', icon: Clock },
    { id: 'search', label: 'Search', icon: Search, isAction: true },
    { id: 'ai-chat', label: 'OMNIX AI', icon: Sparkles, isHighlight: true },
    { id: 'saved', label: 'Saved', icon: Bookmark, count: savedCount },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-gray-950/90 backdrop-blur-xl border-t border-white/10 px-3 py-2">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          if (tab.isAction) {
            return (
              <button
                key={tab.id}
                onClick={onOpenSearch}
                className="flex flex-col items-center justify-center p-1 text-gray-400 hover:text-white"
              >
                <Icon className="w-5 h-5 mb-0.5" />
                <span className="text-[10px]">{tab.label}</span>
              </button>
            );
          }

          if (tab.isHighlight) {
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex flex-col items-center justify-center -mt-4"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-500 via-teal-400 to-blue-600 p-[2px] shadow-lg shadow-cyan-500/40">
                  <div className="w-full h-full bg-gray-950 rounded-full flex items-center justify-center">
                    <Icon className="w-5 h-5 text-cyan-400 animate-pulse" />
                  </div>
                </div>
                <span className="text-[10px] font-bold text-cyan-400 mt-0.5">AI</span>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex flex-col items-center justify-center p-1 transition-all ${
                isActive ? 'text-cyan-400 font-semibold' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px]">{tab.label}</span>
              {tab.count !== undefined && tab.count > 0 && (
                <span className="absolute top-0 right-1 w-2 h-2 rounded-full bg-cyan-400"></span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
