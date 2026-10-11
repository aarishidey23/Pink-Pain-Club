import React, { useState } from 'react';

interface SmsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialText?: string;
}

export const SmsModal: React.FC<SmsModalProps> = ({ isOpen, onClose, initialText }) => {
  const [message, setMessage] = useState<string>(
    initialText || "Hey babe, having bad cramps today. Can you bring a heating pad & iced tea? 🌸"
  );
  const [copied, setCopied] = useState<boolean>(false);

  const presets = [
    {
      title: 'Gentle Support',
      text: "Hey babe, having bad cramps today. Can you bring a heating pad & iced tea? 🌸",
    },
    {
      title: 'Chocolate & Quiet',
      text: "Baddie down today 😭 Need dark chocolate and quiet cozy time please!",
    },
    {
      title: 'Pharmacy Errand',
      text: "SOS: Can you please pick up adhesive heat patches & ibuprofen on your way home? 💗",
    },
    {
      title: 'Low Energy Heads-up',
      text: "In bed with heavy cramps today, just letting you know if I'm slow to reply 💕",
    },
  ];

  if (!isOpen) return null;

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(message);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenSms = () => {
    window.location.href = `sms:?&body=${encodeURIComponent(message)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-[2.5rem] bg-[#fff8f9] p-6 shadow-2xl border border-[#ffd7ee] flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#be0037] text-[22px]">
              chat_bubble
            </span>
            <span className="font-['Epilogue'] text-[18px] font-bold text-[#2d1226]">
              Discreet Support Ping
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

        <p className="text-[12px] text-[#584048]">
          Send a fast, sweet text to your partner, roommate, or bestie without needing to over-explain your pain.
        </p>

        {/* Message Editor */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-[#755664] uppercase tracking-wider">
            SMS Message Body
          </label>
          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3.5 rounded-[1.25rem] bg-white border border-[#ffd7ee] text-[13px] text-[#2d1226] focus:outline-none focus:ring-2 focus:ring-[#ff4fa3]/50 resize-none font-medium leading-relaxed"
          />
        </div>

        {/* Quick Presets */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] font-bold text-[#755664] uppercase tracking-wider">
            Quick Templates
          </span>
          <div className="grid grid-cols-2 gap-1.5">
            {presets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => setMessage(preset.text)}
                className="p-2.5 rounded-[1rem] bg-[#ffe0f1] text-left hover:bg-[#ffd7ee] transition-colors border border-[#ffd7ee]/60 active:scale-95"
                type="button"
              >
                <span className="text-[11px] font-bold text-[#2d1226] block">
                  {preset.title}
                </span>
                <span className="text-[10px] text-[#584048] truncate block mt-0.5">
                  {preset.text}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={handleCopy}
            className="flex-1 py-3 rounded-full bg-[#ffe8f3] text-[#2d1226] text-[13px] font-bold active:scale-95 transition-all flex items-center justify-center gap-1.5 hover:bg-[#ffd7ee]"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">
              {copied ? 'check' : 'content_copy'}
            </span>
            <span>{copied ? 'Copied! 🎀' : 'Copy Text'}</span>
          </button>

          <button
            onClick={handleOpenSms}
            className="flex-1 py-3 rounded-full bg-[#b7046c] hover:bg-[#ff4fa3] text-white text-[13px] font-bold active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-[0_4px_16px_rgba(255,79,163,0.3)]"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">send</span>
            <span>Open in SMS App</span>
          </button>
        </div>
      </div>
    </div>
  );
};
