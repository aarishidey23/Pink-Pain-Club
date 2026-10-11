import React, { useState } from 'react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const [nickname, setNickname] = useState('Queen');
  const [cycleDays, setCycleDays] = useState(28);
  const [periodDays, setPeriodDays] = useState(5);
  const [supportName, setSupportName] = useState('My Babe');
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-[2.5rem] bg-[#fff8f9] p-6 shadow-2xl border border-[#ffd7ee] flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#b7046c] text-[22px]">
              account_circle
            </span>
            <span className="font-['Epilogue'] text-[18px] font-bold text-[#2d1226]">
              Baddie Club Profile
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#ffe8f3] text-[#584048] flex items-center justify-center hover:bg-[#ffd7ee]"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="flex flex-col gap-3">
          <div>
            <label className="text-[11px] font-bold text-[#755664] uppercase tracking-wider block mb-1">
              Sanctuary Nickname
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full px-4 py-2.5 rounded-full bg-white border border-[#ffd7ee] text-[13px] text-[#2d1226] focus:outline-none focus:ring-2 focus:ring-[#ff4fa3]/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-[#755664] uppercase tracking-wider block mb-1">
                Cycle Length (Days)
              </label>
              <input
                type="number"
                min="21"
                max="45"
                value={cycleDays}
                onChange={(e) => setCycleDays(parseInt(e.target.value) || 28)}
                className="w-full px-4 py-2.5 rounded-full bg-white border border-[#ffd7ee] text-[13px] text-[#2d1226] focus:outline-none focus:ring-2 focus:ring-[#ff4fa3]/50"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-[#755664] uppercase tracking-wider block mb-1">
                Period Days
              </label>
              <input
                type="number"
                min="2"
                max="10"
                value={periodDays}
                onChange={(e) => setPeriodDays(parseInt(e.target.value) || 5)}
                className="w-full px-4 py-2.5 rounded-full bg-white border border-[#ffd7ee] text-[13px] text-[#2d1226] focus:outline-none focus:ring-2 focus:ring-[#ff4fa3]/50"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-[#755664] uppercase tracking-wider block mb-1">
              Support Person Nickname
            </label>
            <input
              type="text"
              value={supportName}
              onChange={(e) => setSupportName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-full bg-white border border-[#ffd7ee] text-[13px] text-[#2d1226] focus:outline-none focus:ring-2 focus:ring-[#ff4fa3]/50"
            />
          </div>

          <div className="p-3 rounded-[1rem] bg-[#ffe0f1] text-[11px] text-[#584048]">
            ✨ Data is stored on your device. Pink Pain Club prioritizes complete privacy for your reproductive wellness.
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3.5 rounded-full bg-gradient-to-r from-[#ff4fa3] to-[#b7046c] text-white text-[13px] font-bold active:scale-95 transition-all shadow-md"
          >
            {saved ? 'Saved Changes! 🎀' : 'Save Preferences'}
          </button>
        </form>
      </div>
    </div>
  );
};
