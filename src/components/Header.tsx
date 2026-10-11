import React from 'react';
import { TabType } from '../types';

interface HeaderProps {
  currentTab: TabType;
  onOpenSos: () => void;
  onOpenSupportChat: () => void;
  isPlayingAudio: boolean;
  onToggleAudio: () => void;
  onOpenProfile: () => void;
}

const tabTitles: Record<TabType, string> = {
  'dashboard': 'Dashboard',
  'relief-kit': 'Relief Companion',
  'symptom-tracker': 'Pain & Symptom Log',
  'cycle-calendar': 'Cycle Intelligence',
  'doctor-insights': 'Remedies & Reports',
};

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onOpenSupportChat,
  isPlayingAudio,
  onToggleAudio,
  onOpenProfile,
}) => {
  return (
    <header className="fixed top-0 w-full z-50 bg-[#fff8f9]/85 backdrop-blur-xl border-b border-[#ffd7ee]/60 shadow-[0_8px_32px_0_rgba(255,79,163,0.06)]">
      <div className="max-w-xl mx-auto h-20 px-5 flex items-center justify-between gap-2">
        {/* Brand & Logo */}
        <div className="flex items-center gap-2">
          <img
            alt="Pink Pain Club Logo"
            className="h-9 w-auto object-contain drop-shadow-sm"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcIOHUd3_R1whyg9oi2h_uWDgI3u9vfl3_IDb8jJuFXS_I1mZk_h7F8J07vR6UEq39XrlIkbhBcjKesEH2GGzBscdveP2jVxWDzrl-EHcLmTVxy2nhD-H1lsb7jUbKyajXMj4KSmTKEJhVl7UzOuTEH7COf9CBn803vgZhjdx3NRzXF6jP8xyNj-AsT-1pPOcO2ovCwfSgAPzCS-lqODak1nROPr3SaMI28VMCJUxcK-cwfvZEvrUREw"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col ml-1">
            <div className="flex items-center gap-1.5">
              <span className="font-['Epilogue'] text-[17px] font-bold tracking-tight text-[#2d1226]">
                PINK PAIN CLUB
              </span>
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#ff4fa3] text-white text-[11px] font-bold shadow-[0_2px_8px_rgba(255,79,163,0.3)]">
                <span className="material-symbols-outlined text-[10px]">auto_awesome</span>
                Baddie
              </span>
            </div>
            <span className="text-[12px] font-semibold text-[#584048] line-clamp-1">
              {tabTitles[currentTab]}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          {/* I need support CTA */}
          <button
            onClick={onOpenSupportChat}
            className="min-h-[40px] px-3 flex items-center gap-1.5 rounded-full bg-[#ff596d]/15 text-[#be0037] text-[12px] font-bold shadow-[0_2px_12px_rgba(255,89,109,0.12)] active:scale-95 transition-all hover:bg-[#ff596d]/25"
            title="Open Comfort Sanctuary"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px] text-[#be0037] animate-pulse">chat</span>
            <span className="hidden sm:inline whitespace-nowrap">Comfort Chat</span>
          </button>

          {/* Sound Toggle Button */}
          <button
            onClick={onToggleAudio}
            aria-label="Toggle Soothing Sound Frequencies"
            className={`min-h-[40px] min-w-[40px] flex items-center justify-center rounded-full transition-all active:scale-95 ${
              isPlayingAudio
                ? 'bg-[#ff4fa3] text-white shadow-[0_4px_12px_rgba(255,79,163,0.3)] animate-pulse'
                : 'text-[#755664] hover:text-[#b7046c] hover:bg-[#ffe0f1]'
            }`}
            type="button"
            title={isPlayingAudio ? 'Mute soothing audio' : 'Play 432Hz pink noise'}
          >
            <span className="material-symbols-outlined text-[20px]">
              {isPlayingAudio ? 'graphic_eq' : 'volume_up'}
            </span>
          </button>

          {/* User Profile */}
          <button
            onClick={onOpenProfile}
            className="w-8 h-8 rounded-full bg-[#b7046c] flex items-center justify-center shrink-0 shadow-[0_4px_12px_rgba(183,4,108,0.25)] hover:ring-2 hover:ring-[#ff4fa3]/50 transition-all active:scale-95"
            aria-label="User Profile and Preferences"
            type="button"
          >
            <span className="material-symbols-outlined text-white text-[18px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
};
