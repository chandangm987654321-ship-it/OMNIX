import React from 'react';
import { X, User, Trophy, Bookmark, BookOpen, Sparkles, Bell, Check, Sliders } from 'lucide-react';
import { UserState } from '../utils/storage';
import { NewsCategory } from '../types';
import { CATEGORIES_LIST } from '../data/mockNews';

interface ProfileModalProps {
  userState: UserState;
  onUpdateState: (newState: Partial<UserState>) => void;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  userState,
  onUpdateState,
  onClose,
}) => {
  const toggleInterest = (category: NewsCategory) => {
    if (category === 'All') return;
    const current = userState.interests;
    if (current.includes(category)) {
      if (current.length > 1) {
        onUpdateState({ interests: current.filter((c) => c !== category) });
      }
    } else {
      onUpdateState({ interests: [...current, category] });
    }
  };

  const achievementsList = [
    {
      id: 'firstStory',
      title: 'First Story',
      desc: 'Read your first verified article.',
      unlocked: userState.achievements.firstStory,
    },
    {
      id: 'newsExplorer',
      title: 'News Explorer',
      desc: 'Explored 5 distinct regional and tech categories.',
      unlocked: userState.interests.length >= 5,
    },
    {
      id: 'curiousMind',
      title: 'Curious Mind',
      desc: 'Engaged with OMNIX AI with intelligent follow-up inquiries.',
      unlocked: userState.askedAiCount >= 3,
    },
    {
      id: 'dailyReader',
      title: 'Daily Reader',
      desc: 'Maintained real-time news awareness.',
      unlocked: userState.achievements.dailyReader,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl glass-panel shadow-2xl border border-cyan-500/30 overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-gray-950/90 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-teal-400 p-[1.5px]">
              <div className="w-full h-full bg-gray-950 rounded-[14px] flex items-center justify-center">
                <User className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">Your OMNIX Profile</h3>
              <p className="text-xs text-gray-400">Personalized Feed, Interests & Intelligence Stats</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 rounded-lg text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
              <BookOpen className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
              <div className="text-xl font-mono font-bold text-white">
                {userState.readArticleIds.length}
              </div>
              <div className="text-[11px] text-gray-400">Stories Read</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
              <Bookmark className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
              <div className="text-xl font-mono font-bold text-white">
                {userState.savedArticleIds.length}
              </div>
              <div className="text-[11px] text-gray-400">Saved Bookmarks</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
              <Sparkles className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
              <div className="text-xl font-mono font-bold text-white">
                {userState.askedAiCount}
              </div>
              <div className="text-[11px] text-gray-400">AI Inquiries</div>
            </div>
          </div>

          {/* Interests Personalization */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Personalized Feed Categories ({userState.interests.length} selected)
              </h4>
              <span className="text-[11px] text-gray-400">Click to toggle</span>
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto p-1">
              {CATEGORIES_LIST.filter((c) => c !== 'All').map((cat) => {
                const isSelected = userState.interests.includes(cat as NewsCategory);
                return (
                  <button
                    key={cat}
                    onClick={() => toggleInterest(cat as NewsCategory)}
                    className={`text-xs px-3 py-1 rounded-xl transition-all border ${
                      isSelected
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 font-semibold shadow-sm shadow-cyan-500/20'
                        : 'bg-white/5 text-gray-400 border-white/5 hover:border-white/10 hover:text-white'
                    }`}
                  >
                    {isSelected && <span className="mr-1">✓</span>}
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Engagement Achievements */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center space-x-1.5">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Reader Milestones</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {achievementsList.map((ach) => (
                <div
                  key={ach.id}
                  className={`p-3 rounded-xl border flex items-start space-x-2.5 text-xs transition-all ${
                    ach.unlocked
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-100'
                      : 'bg-white/[0.01] border-white/5 text-gray-500 opacity-60'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                      ach.unlocked ? 'bg-amber-500 text-gray-950 font-bold' : 'bg-gray-800 text-gray-500'
                    }`}
                  >
                    {ach.unlocked ? '★' : '•'}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{ach.title}</div>
                    <div className="text-[11px] text-gray-400">{ach.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-950/80 border-t border-white/10 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-cyan-500 text-gray-950 font-bold text-xs hover:bg-cyan-400 transition-all"
          >
            Save & Return
          </button>
        </div>
      </div>
    </div>
  );
};
