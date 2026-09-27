import { Article, NewsCategory, NotificationItem } from '../types';

export interface UserState {
  interests: NewsCategory[];
  savedArticleIds: string[];
  readArticleIds: string[];
  askedAiCount: number;
  theme: 'dark' | 'light';
  notifications: NotificationItem[];
  achievements: {
    firstStory: boolean;
    newsExplorer: boolean;
    curiousMind: boolean;
    dailyReader: boolean;
  };
  demoMode: boolean;
}

const STORAGE_KEY = 'omnix_state_v1';

const DEFAULT_STATE: UserState = {
  interests: ['AI', 'Technology', 'Space', 'Karnataka', 'Davanagere', 'Climate'],
  savedArticleIds: ['omx-001', 'omx-003'],
  readArticleIds: ['omx-001'],
  askedAiCount: 3,
  theme: 'dark',
  demoMode: false,
  achievements: {
    firstStory: true,
    newsExplorer: false,
    curiousMind: false,
    dailyReader: true,
  },
  notifications: [
    {
      id: 'notif-1',
      type: 'breaking',
      title: 'Frontier AI Accord Signed',
      description: '28 nations ratify automated compute verification charter in Geneva.',
      time: '12 min ago',
      read: false,
      articleId: 'omx-001',
    },
    {
      id: 'notif-2',
      type: 'followed',
      title: 'Davanagere Smart Hub Operational',
      description: 'New 400-acre solar textile corridor opens along NH-48.',
      time: '55 min ago',
      read: false,
      articleId: 'omx-003',
    },
    {
      id: 'notif-3',
      type: 'recommendation',
      title: 'ISRO Cryogenic Lunar Engine Tests',
      description: 'Next deep space lunar exploration phase confirmed.',
      time: '1 hour ago',
      read: true,
      articleId: 'omx-002',
    },
  ],
};

export function loadUserState(): UserState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_STATE, ...parsed };
  } catch {
    return DEFAULT_STATE;
  }
}

export function saveUserState(state: UserState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to save to localStorage', e);
  }
}

export function formatRelativeTime(dateString: string): string {
  const now = Date.now();
  const past = new Date(dateString).getTime();
  const diffMinutes = Math.max(1, Math.floor((now - past) / (1000 * 60)));

  if (diffMinutes < 60) {
    return `${diffMinutes} min ago`;
  }
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  }
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
}
