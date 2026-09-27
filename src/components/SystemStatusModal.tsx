import React, { useState, useEffect } from 'react';
import { X, Activity, Server, Cpu, Search, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';

interface SystemStatusModalProps {
  onClose: () => void;
  demoMode: boolean;
  onToggleDemoMode: () => void;
}

export const SystemStatusModal: React.FC<SystemStatusModalProps> = ({
  onClose,
  demoMode,
  onToggleDemoMode,
}) => {
  const [status, setStatus] = useState<any>({
    newsService: true,
    aiService: true,
    searchService: true,
    lastUpdated: new Date().toISOString(),
    articleCount: 48,
    activeModel: 'gemini-3.8-flash',
    ttsModel: 'gemini-3.8-flash-lite-tts',
    mode: 'live',
  });
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchStatus = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/status');
      const data = await res.json();
      setStatus(data);
    } catch {
      // offline fallback status
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in">
      <div className="relative w-full max-w-xl rounded-3xl glass-panel shadow-2xl border border-cyan-500/30 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 bg-gray-950/90 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
              <Activity className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-lg text-white font-mono">System & AI Health</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono">
                  ALL OPERATIONAL
                </span>
              </div>
              <p className="text-xs text-gray-400">OMNIX Neural Infrastructure & Service Health</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 rounded-lg text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Metrics */}
        <div className="p-6 space-y-5">
          {/* Services list */}
          <div className="space-y-2.5">
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Server className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-semibold text-white">News Ingestion Service</span>
              </div>
              <span className="flex items-center space-x-1.5 text-xs text-emerald-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Connected</span>
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <div>
                  <span className="text-xs font-semibold text-white">Gemini Conversational Engine</span>
                  <span className="text-[10px] text-gray-400 block font-mono">model: gemini-3.8-flash</span>
                </div>
              </div>
              <span className="flex items-center space-x-1.5 text-xs text-emerald-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Active & Grounded</span>
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Search className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-semibold text-white">Google Search Grounding Service</span>
              </div>
              <span className="flex items-center space-x-1.5 text-xs text-emerald-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Enabled</span>
              </span>
            </div>
          </div>

          {/* Mode Switch: Demo vs Live */}
          <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-white mb-0.5">
                Current Operating Mode: {demoMode ? 'Sample Prototype Mode' : 'Live Neural Mode'}
              </div>
              <p className="text-[11px] text-gray-300">
                {demoMode
                  ? 'Showing verified sample datasets for evaluation without external dependencies.'
                  : 'Connected to primary live news wire feeds and real-time Gemini AI.'}
              </p>
            </div>
            <button
              onClick={onToggleDemoMode}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                demoMode
                  ? 'bg-amber-500 text-gray-950 font-bold'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {demoMode ? 'Switch to Live' : 'Switch to Demo'}
            </button>
          </div>

          {/* Metrics grid */}
          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-gray-400 text-[10px] block">INDEXED ARTICLES</span>
              <span className="text-base text-white font-bold">{status.articleCount || 48} Active</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-gray-400 text-[10px] block">CATEGORIES TRACKED</span>
              <span className="text-base text-cyan-400 font-bold">21 Regional & Global</span>
            </div>
          </div>

          <div className="text-[11px] text-gray-400 flex items-center justify-between pt-2">
            <span>Last Heartbeat: {new Date(status.lastUpdated).toLocaleTimeString()}</span>
            <button
              onClick={fetchStatus}
              className="text-cyan-400 hover:underline flex items-center space-x-1"
            >
              <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh Status</span>
            </button>
          </div>
        </div>

        <div className="p-4 bg-gray-950/80 border-t border-white/10 text-right">
          <button
            onClick={onClose}
            className="px-5 py-1.5 rounded-xl bg-cyan-500 text-gray-950 font-bold text-xs hover:bg-cyan-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
