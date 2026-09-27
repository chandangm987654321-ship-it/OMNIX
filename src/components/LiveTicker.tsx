import React from 'react';
import { Activity, TrendingUp, TrendingDown, Sun, Globe2, Rocket, Radio } from 'lucide-react';

export const LiveTicker: React.FC = () => {
  const tickerItems = [
    { type: 'market', label: 'S&P 500', value: '5,842.10', change: '+0.68%', isUp: true },
    { type: 'market', label: 'NASDAQ', value: '18,415.80', change: '+1.24%', isUp: true },
    { type: 'market', label: 'NIFTY 50', value: '25,380.45', change: '+0.82%', isUp: true },
    { type: 'market', label: 'TECH 100', value: '20,490.15', change: '+1.45%', isUp: true },
    { type: 'weather', label: 'Davanagere', value: '28°C Sunny', change: 'Humidity 48%' },
    { type: 'weather', label: 'Bengaluru', value: '23°C Pleasant', change: 'Air Quality: Good (42)' },
    { type: 'weather', label: 'Geneva', value: '17°C Clear', change: 'Summit Day 2' },
    { type: 'space', label: 'ISRO Lunar Link', value: 'ISTRAC Bengaluru', change: 'Telemetry: Nominal' },
    { type: 'system', label: 'OMNIX Pulse', value: '48 Sources Active', change: 'Grounding Latency: 420ms' },
  ];

  return (
    <div className="w-full bg-gray-950/80 border-b border-white/5 py-1.5 overflow-hidden text-xs text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Live badge */}
        <div className="flex items-center space-x-2 shrink-0 pr-4 border-r border-white/10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="font-mono text-[11px] font-bold text-cyan-400 tracking-wider">LIVE DATA</span>
          <span className="text-[10px] text-gray-400 hidden sm:inline">Updated 2 min ago</span>
        </div>

        {/* Marquee ticker */}
        <div className="flex-1 overflow-x-auto no-scrollbar flex items-center space-x-6 px-4">
          {tickerItems.map((item, index) => (
            <div key={index} className="flex items-center space-x-1.5 whitespace-nowrap text-[11px]">
              {item.type === 'market' && (
                <>
                  <span className="text-gray-400 font-medium">{item.label}</span>
                  <span className="font-mono font-semibold text-white">{item.value}</span>
                  <span
                    className={`flex items-center text-[10px] font-mono ${
                      item.isUp ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {item.isUp ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
                    {item.change}
                  </span>
                </>
              )}
              {item.type === 'weather' && (
                <>
                  <Sun className="w-3 h-3 text-amber-400" />
                  <span className="text-gray-400 font-medium">{item.label}</span>
                  <span className="font-mono text-gray-200">{item.value}</span>
                  <span className="text-gray-400 text-[10px]">({item.change})</span>
                </>
              )}
              {item.type === 'space' && (
                <>
                  <Rocket className="w-3 h-3 text-cyan-400" />
                  <span className="text-cyan-300 font-medium">{item.label}</span>
                  <span className="font-mono text-white">{item.value}</span>
                  <span className="text-emerald-400 text-[10px] font-mono">{item.change}</span>
                </>
              )}
              {item.type === 'system' && (
                <>
                  <Activity className="w-3 h-3 text-cyan-400" />
                  <span className="text-gray-400">{item.label}:</span>
                  <span className="text-cyan-300 font-medium">{item.value}</span>
                </>
              )}
              <span className="text-white/10 ml-4">•</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
