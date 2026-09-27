export type NewsCategory =
  | 'All'
  | 'World'
  | 'India'
  | 'Karnataka'
  | 'Davanagere'
  | 'Politics'
  | 'Business'
  | 'Technology'
  | 'AI'
  | 'Science'
  | 'Space'
  | 'Health'
  | 'Education'
  | 'Sports'
  | 'Entertainment'
  | 'Environment'
  | 'Startups'
  | 'Finance'
  | 'Security'
  | 'Automotive'
  | 'Agriculture'
  | 'Climate';

export interface SourceReport {
  sourceName: string;
  sourceBias?: string;
  headline: string;
  url?: string;
  publishedTime: string;
  summary: string;
  confirmedPoints: string[];
}

export interface StoryCluster {
  topic: string;
  sources: SourceReport[];
  consensusPoints: string[];
  keyDifferences: string[];
  timeline: { time: string; event: string; source: string }[];
}

export interface WhatChanged {
  earlier: string;
  now: string;
  changed: string;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: NewsCategory;
  source: string;
  sourceUrl?: string;
  author: string;
  publishedAt: string; // ISO string
  updatedAt: string;
  readTimeMinutes: number;
  trendingScore: number;
  isBreaking?: boolean;
  isEditorsPick?: boolean;
  imageUrl: string;
  location?: {
    city?: string;
    state?: string;
    country: string;
    region?: string;
  };
  tags: string[];
  keyFacts: string[];
  whyItMatters: string;
  keyPeople: { name: string; role: string }[];
  timeline: { time: string; event: string }[];
  cluster?: StoryCluster;
  whatChanged?: WhatChanged;
  recommendationReason?: string;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  sources?: GroundingSource[];
  suggestedFollowUps?: string[];
  isStreaming?: boolean;
  relatedArticleId?: string;
}

export interface TrendingTopic {
  id: string;
  name: string;
  category: NewsCategory;
  articleCount: number;
  trendVelocity: 'rapid' | 'rising' | 'steady';
  percentageChange: number;
  sparkline: number[];
}

export interface HeatmapItem {
  name: string;
  category: NewsCategory;
  score: number;
  trend: 'up_fast' | 'up' | 'stable' | 'down';
  delta: string;
}

export interface NotificationItem {
  id: string;
  type: 'breaking' | 'followed' | 'recommendation' | 'alert';
  title: string;
  description: string;
  time: string;
  read: boolean;
  articleId?: string;
}

export interface StoryNode {
  id: string;
  label: string;
  type: 'topic' | 'company' | 'person' | 'event' | 'place';
  category?: NewsCategory;
  connections: string[];
}

export type SupportedLanguage =
  | 'English'
  | 'Hindi'
  | 'Kannada'
  | 'Tamil'
  | 'Telugu'
  | 'Malayalam'
  | 'Marathi'
  | 'Bengali';

export type AiRoleId =
  | 'news_anchor'
  | 'deep_analyst'
  | 'flash_wire'
  | 'fact_checker'
  | 'explainer';

export interface AiRoleConfig {
  id: AiRoleId;
  name: string;
  tagline: string;
  model: 'gemini-3.5-flash' | 'gemini-3.1-pro-preview' | 'gemini-3.1-flash-lite';
  badge: string;
  speed: 'Instant' | 'Balanced' | 'Deep Reasoning';
  description: string;
  iconName: string;
}

export interface SpeakerSegment {
  speaker: string;
  segment: string;
  timestamp?: string;
}

export interface EntityItem {
  name: string;
  type: string;
}

export interface AudioTranscriptionResult {
  transcript: string;
  summary: string;
  detectedLanguage?: string;
  speakers?: SpeakerSegment[];
  keyTakeaways: string[];
  sentiment?: string;
  entities?: EntityItem[];
  durationSeconds?: number;
  fileName?: string;
}

export type LiveVoiceStatus =
  | 'idle'
  | 'connecting'
  | 'connected'
  | 'listening'
  | 'speaking'
  | 'error';

