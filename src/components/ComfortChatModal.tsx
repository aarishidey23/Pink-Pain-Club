import React, { useState } from 'react';

interface ComfortChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const comfortCards = [
  {
    title: 'Guilt-Free Rest',
    message: 'Rest is not something you have to earn after being productive. Taking care of your body today IS your most important task.',
    icon: 'spa',
  },
  {
    title: 'Hormonal Grace',
    message: 'Your body is shedding an entire uterine lining while rewriting its hormonal rhythm. Give yourself the tenderness you would give a newborn.',
    icon: 'favorite',
  },
  {
    title: 'Temporary Storm',
    message: 'Remember: intense cramps peak and then decline. The prostaglandin waves will subside. You are resilient, gorgeous, and safe.',
    icon: 'auto_awesome',
  },
  {
    title: 'Cozy Boundaries',
    message: 'It is 100% acceptable to cancel plans, silence notifications, stay in soft socks, and say no to everyone today.',
    icon: 'bedtime',
  },
];

export const ComfortChatModal: React.FC<ComfortChatModalProps> = ({ isOpen, onClose }) => {
  const [cardIndex, setCardIndex] = useState(0);

  if (!isOpen) return null;

  const currentCard = comfortCards[cardIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-[2.5rem] bg-[#fff8f9] p-6 shadow-2xl border border-[#ffd7ee] flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#be0037] text-[22px]">
              favorite
            </span>
            <span className="font-['Epilogue'] text-[18px] font-bold text-[#2d1226]">
              Baddie Comfort Sanctuary
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

        {/* Comfort Affirmation Card */}
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#ffe0f1] to-[#ffe8f3] p-6 text-center border border-[#ffd7ee] shadow-sm flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-[#ff4fa3] shadow-sm">
            <span className="material-symbols-outlined text-[28px] material-symbols-filled">
              {currentCard.icon}
            </span>
          </div>

          <h3 className="font-['Epilogue'] text-[18px] font-extrabold text-[#2d1226]">
            {currentCard.title}
          </h3>

          <p className="text-[13px] text-[#45263c] leading-relaxed font-medium">
            "{currentCard.message}"
          </p>

          <span className="text-[11px] font-bold text-[#b7046c] mt-1 bg-white/70 px-3 py-1 rounded-full">
            Pink Pain Club Sanctuary Whisper 🎀
          </span>
        </div>

        {/* Shuffle Card Button */}
        <button
          onClick={() => setCardIndex((prev) => (prev + 1) % comfortCards.length)}
          className="w-full py-3 rounded-full bg-[#ff4fa3] text-white text-[13px] font-bold active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-sm hover:bg-[#b7046c]"
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">casino</span>
          <span>Draw Another Comfort Card</span>
        </button>

        {/* Quick soothing reminders */}
        <div className="p-3.5 rounded-[1.25rem] bg-[#fff0f6] border border-[#ffd7ee] flex items-start gap-2.5">
          <span className="material-symbols-outlined text-[#be0037] text-[18px] mt-0.5">
            check_circle
          </span>
          <p className="text-[11px] text-[#584048] leading-snug">
            Hot water bottle ready? Water glass refilled? Magnesium taken? You are doing wonderfully, darling.
          </p>
        </div>
      </div>
    </div>
  );
};
