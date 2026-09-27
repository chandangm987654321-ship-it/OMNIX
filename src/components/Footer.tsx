import React from 'react';
import { Radio, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onOpenSystemStatus: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSystemStatus }) => {
  return (
    <footer className="w-full border-t border-white/10 bg-gray-950/80 backdrop-blur-md pt-12 pb-16 sm:pb-12 text-xs text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/5">
          {/* Brand */}
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2 font-mono font-extrabold text-white text-lg tracking-wider">
              <span>OMNIX</span>
              <span className="text-[10px] font-sans px-1.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                LIVE
              </span>
            </div>
            <p className="text-sm font-semibold text-cyan-300">News that talks back.</p>
            <p className="text-xs text-gray-400 max-w-sm">
              Discover what is happening now. Ask questions. Understand the story through verified multi-source intelligence.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-10">
            <div>
              <h5 className="font-bold text-white uppercase text-[10px] tracking-wider mb-2 font-mono">
                Platform
              </h5>
              <ul className="space-y-1.5 text-xs">
                <li><button onClick={onOpenSystemStatus} className="hover:text-cyan-300">Live Status</button></li>
                <li><a href="#sources" className="hover:text-cyan-300">Source Transparency</a></li>
                <li><a href="#ai-info" className="hover:text-cyan-300">AI Architecture</a></li>
                <li><a href="#verification" className="hover:text-cyan-300">Fact Verification</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-white uppercase text-[10px] tracking-wider mb-2 font-mono">
                Regional Hubs
              </h5>
              <ul className="space-y-1.5 text-xs">
                <li><span className="text-gray-300">Karnataka Bureau</span></li>
                <li><span className="text-gray-300">Davanagere Desk</span></li>
                <li><span className="text-gray-300">Geneva Science Wire</span></li>
                <li><span className="text-gray-300">Silicon Valley Lab</span></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-white uppercase text-[10px] tracking-wider mb-2 font-mono">
                Legal & Ethics
              </h5>
              <ul className="space-y-1.5 text-xs">
                <li><a href="#privacy" className="hover:text-cyan-300">Privacy Policy</a></li>
                <li><a href="#terms" className="hover:text-cyan-300">Terms of Service</a></li>
                <li><a href="#feedback" className="hover:text-cyan-300">Submit Feedback</a></li>
                <li><a href="#contact" className="hover:text-cyan-300">Contact Editors</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 gap-3">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Multi-Source Verified • Grounded in Real-Time Web Intelligence</span>
          </div>

          <div>
            © 2026 OMNIX. All rights reserved. Built with neural search & primary wire telemetry.
          </div>
        </div>
      </div>
    </footer>
  );
};
