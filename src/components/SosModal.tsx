import React, { useState, useEffect } from 'react';

interface SosModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendSms: (text: string) => void;
}

export const SosModal: React.FC<SosModalProps> = ({ isOpen, onClose, onSendSms }) => {
  const [pulseScale, setPulseScale] = useState(1);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setPulseScale((prev) => (prev === 1 ? 1.08 : 1));
    }, 1500);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-[2.5rem] bg-gradient-to-b from-[#fff0f6] to-[#ffe0f1] p-6 shadow-2xl border-2 border-[#ff3158]/40 overflow-hidden flex flex-col gap-4">
        {/* Glow backdrop */}
        <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-[#ff3158]/20 blur-3xl pointer-events-none"></div>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#ff3158] text-white flex items-center justify-center font-bold text-[14px]">
              SOS
            </span>
            <span className="font-['Epilogue'] text-[18px] font-extrabold text-[#be0037]">
              Cramp Crisis Sanctuary
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/80 text-[#584048] flex items-center justify-center hover:bg-white shadow-xs"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Reassuring Big Message */}
        <div className="text-center py-2 flex flex-col items-center">
          <div
            className="w-20 h-20 rounded-full bg-[#ff596d]/20 border-2 border-[#ff3158] flex items-center justify-center text-[#be0037] mb-2 transition-transform duration-700 ease-in-out shadow-lg"
            style={{ transform: `scale(${pulseScale})` }}
          >
            <span className="material-symbols-outlined text-[38px] material-symbols-filled">
              favorite
            </span>
          </div>
          <h2 className="font-['Epilogue'] text-[22px] font-extrabold text-[#2d1226]">
            Breathe, baby. You're safe.
          </h2>
          <p className="text-[13px] text-[#584048] mt-1 font-medium max-w-xs">
            This wave has a beginning, a peak, and an ending. You do not have to power through this alone.
          </p>
        </div>

        {/* Immediate 3 Physical Actions */}
        <div className="bg-white/80 backdrop-blur-md rounded-[1.5rem] p-4 flex flex-col gap-2.5 border border-[#ffd7ee]">
          <span className="text-[12px] font-bold text-[#b7046c] uppercase tracking-wider">
            Immediate 3-Step Relief
          </span>

          <div className="flex items-center gap-3 text-[13px] text-[#2d1226] font-semibold">
            <span className="w-6 h-6 rounded-full bg-[#ffe0f1] text-[#b7046c] flex items-center justify-center text-[12px] font-bold shrink-0">
              1
            </span>
            <span>Unbutton tight pants & apply maximum heat directly to lower pelvis</span>
          </div>

          <div className="flex items-center gap-3 text-[13px] text-[#2d1226] font-semibold">
            <span className="w-6 h-6 rounded-full bg-[#ffe0f1] text-[#b7046c] flex items-center justify-center text-[12px] font-bold shrink-0">
              2
            </span>
            <span>Curl into fetal position with a pillow clutched between knees</span>
          </div>

          <div className="flex items-center gap-3 text-[13px] text-[#2d1226] font-semibold">
            <span className="w-6 h-6 rounded-full bg-[#ffe0f1] text-[#b7046c] flex items-center justify-center text-[12px] font-bold shrink-0">
              3
            </span>
            <span>Take slow 6-second exhales to release abdominal clenching</span>
          </div>
        </div>

        {/* 1-Tap SOS Dispatch Actions */}
        <div className="flex flex-col gap-2 pt-1">
          <button
            onClick={() => {
              onSendSms("🚨 SOS: Having severe cramp attack right now. Please bring heat pad, snacks & water ASAP 💗");
              onClose();
            }}
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#ff3158] to-[#be0037] text-white font-bold text-[13px] shadow-[0_8px_24px_rgba(255,49,88,0.35)] active:scale-95 transition-all flex items-center justify-center gap-2"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
            <span>Dispatch SOS Text to My Person 📱</span>
          </button>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-full bg-white text-[#584048] font-bold text-[13px] hover:bg-[#ffe8f3] active:scale-95 transition-all text-center"
            type="button"
          >
            Back to Sanctuary
          </button>
        </div>
      </div>
    </div>
  );
};
