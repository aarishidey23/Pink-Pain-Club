import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  currentTab: TabType;
  onChangeTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onChangeTab }) => {
  const navItems: { id: TabType; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Home', icon: 'spa' },
    { id: 'relief-kit', label: 'Relief', icon: 'local_florist' },
    { id: 'symptom-tracker', label: 'Tracker', icon: 'favorite' },
    { id: 'cycle-calendar', label: 'Cycle', icon: 'calendar_month' },
    { id: 'doctor-insights', label: 'Insights', icon: 'auto_awesome' },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-50 pb-[max(env(safe-area-inset-bottom,0px),8px)] bg-[#fff8f9]/90 backdrop-blur-xl border-t border-[#ffd7ee]/80 shadow-[0_-8px_32px_0_rgba(255,79,163,0.08)]">
      <div className="max-w-xl mx-auto flex justify-around items-center h-18 px-2">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChangeTab(item.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center min-h-[48px] min-w-[56px] px-3 py-1.5 rounded-full transition-all duration-200 active:scale-95 ${
                isActive
                  ? 'bg-[#ff4fa3] text-white shadow-[0_4px_16px_rgba(255,79,163,0.35)] scale-105'
                  : 'text-[#755664] hover:text-[#b7046c] hover:bg-[#ffe8f3]/60'
              }`}
              type="button"
            >
              <span
                className={`material-symbols-outlined text-[22px] transition-transform ${
                  isActive ? 'material-symbols-filled scale-110' : ''
                }`}
              >
                {item.icon}
              </span>
              <span className="text-[11px] font-bold tracking-tight mt-0.5 whitespace-nowrap">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
