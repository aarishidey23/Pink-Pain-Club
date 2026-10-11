import React, { useState } from 'react';
import { TabType } from '../types';

interface DashboardScreenProps {
  onNavigateTab: (tab: TabType) => void;
  onOpenSosModal: () => void;
  onOpenSmsModal: (defaultText?: string) => void;
  onStartReliefTimer: () => void;
  isPlayingAudio: boolean;
  onToggleAudio: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  onNavigateTab,
  onOpenSosModal,
  onOpenSmsModal,
  onStartReliefTimer,
  isPlayingAudio,
  onToggleAudio,
}) => {
  // Protocol drawer toggle
  const [isProtocolOpen, setIsProtocolOpen] = useState(false);

  // 1-Tap Symptom Log state
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  // Period vanity checklist items state
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    'heat-pads': true,
    'dark-chocolate': true,
  });

  // Combo start button feedback state
  const [comboStarted, setComboStarted] = useState(false);

  // Copy SMS feedback state
  const [copiedSms, setCopiedSms] = useState(false);

  const defaultSmsBody = "Hey babe, having bad cramps today. Can you bring a heating pad & iced tea? 🌸";

  const symptomsList = [
    { id: 'cramps', label: 'Cramps', icon: 'water_drop', iconColor: 'text-[#be0037]' },
    { id: 'lower-back', label: 'Lower Back', icon: 'airline_seat_recline_extra', iconColor: 'text-[#b7046c]' },
    { id: 'nausea', label: 'Nausea', icon: 'sentiment_dissatisfied', iconColor: 'text-[#b7046c]' },
    { id: 'fatigue', label: 'Fatigue', icon: 'bedtime', iconColor: 'text-[#755664]' },
    { id: 'bloating', label: 'Bloating', icon: 'bubble_chart', iconColor: 'text-[#b7046c]' },
    { id: 'brain-fog', label: 'Brain Fog', icon: 'cloud', iconColor: 'text-[#755664]' },
  ];

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleStartCombo = () => {
    setComboStarted(true);
    setTimeout(() => {
      onStartReliefTimer();
      onNavigateTab('relief-kit');
    }, 600);
  };

  const handleCopySms = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(defaultSmsBody);
    }
    setCopiedSms(true);
    setTimeout(() => {
      setCopiedSms(false);
    }, 2000);
  };

  const handleOpenSms = () => {
    onOpenSmsModal(defaultSmsBody);
  };

  const toggleCheckItem = (key: string) => {
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-5 pt-4 pb-28 gap-4">
      {/* Top Ambient Greeting Banner */}
      <div className="relative overflow-hidden rounded-[2rem] bg-[#ffe0f1] p-6 shadow-[0_8px_32px_0_rgba(255,79,163,0.08)] border border-[#ffd7ee]">
        <div className="absolute -right-6 -top-6 w-36 h-36 rounded-full bg-[#ff4fa3]/20 blur-2xl pointer-events-none"></div>
        <div className="absolute right-4 bottom-2 opacity-25 pointer-events-none text-[68px] select-none">
          🎀
        </div>
        <div className="relative flex flex-col gap-2 z-10">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#ff4fa3] text-white text-[11px] font-bold shadow-[0_2px_8px_rgba(255,79,163,0.3)]">
              <span className="material-symbols-outlined text-[12px] material-symbols-filled">favorite</span>
              Baddie Sanctuary
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#ffe8f3] text-[#be0037] text-[11px] font-bold border border-[#ffd7ee]">
              <span className="material-symbols-outlined text-[12px]">arrow_back_ios_new</span>
              Safe Space
            </span>
          </div>

          <h1 className="font-['Epilogue'] text-[26px] sm:text-[30px] font-extrabold text-[#2d1226] tracking-tight mt-1 leading-tight">
            Hey, pretty girl 🎀
          </h1>
          <p className="text-[14px] text-[#584048] font-medium leading-snug">
            How are we feeling right now, queen?
          </p>

          <div className="mt-1 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/85 text-[#b7046c] text-[12px] font-bold shadow-sm w-fit border border-[#ffd7ee]/60">
            <span className="material-symbols-outlined text-[14px] text-[#ff4fa3]">auto_awesome</span>
            <span>Cramps are temporary. Your baddie energy isn't. ✨</span>
          </div>
        </div>
      </div>

      {/* Cycle Status Pill Widget */}
      <button
        onClick={() => onNavigateTab('cycle-calendar')}
        type="button"
        className="w-full text-left rounded-[1.5rem] bg-[#fff0f6] p-4 shadow-sm flex items-center justify-between gap-3 border border-[#ffd7ee] hover:bg-[#ffe8f3] transition-colors active:scale-[0.99]"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 rounded-full bg-[#ff4fa3]/20 flex items-center justify-center shrink-0 text-[#b7046c]">
            <span className="material-symbols-outlined text-[24px]">calendar_today</span>
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-['Epilogue'] text-[17px] font-bold text-[#2d1226]">Cycle Day 14</span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#ffd7ee] text-[#584048]">
                Luteal Phase (Est.)
              </span>
            </div>
            <p className="text-[12px] text-[#584048] font-medium truncate mt-0.5">
              Progesterone rising • Time for cozy layers
            </p>
          </div>
        </div>
        <span className="shrink-0 px-2.5 py-1 rounded-full bg-[#ffe0f1] text-[#584048] text-[11px] font-bold whitespace-nowrap">
          Estimates only 🌸
        </span>
      </button>

      {/* Prominent Giant 'I'M CRAMPING!' Emergency Relief Comfort Button */}
      <div className="relative flex flex-col items-center my-0.5">
        {/* Pulse Ring FX */}
        <div className="absolute inset-0 rounded-[2rem] bg-[#ff3158]/25 animate-ping pointer-events-none scale-95 opacity-70"></div>

        <button
          onClick={() => setIsProtocolOpen(!isProtocolOpen)}
          aria-label="Emergency Cramp Relief Companion"
          className="relative w-full rounded-[2rem] bg-gradient-to-r from-[#ff596d] via-[#ff4fa3] to-[#be0037] p-5 text-white shadow-[0_16px_40px_rgba(255,49,88,0.3)] active:scale-[0.98] transition-all overflow-hidden text-left flex items-center justify-between gap-3 cursor-pointer"
          type="button"
        >
          {/* Specular Gloss Highlight */}
          <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/40 to-transparent pointer-events-none"></div>

          <div className="flex items-center gap-3.5 z-10 min-w-0">
            <div className="w-13 h-13 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 shadow-inner">
              <span className="material-symbols-outlined text-[30px] text-white animate-pulse material-symbols-filled">
                favorite
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-['Epilogue'] text-[21px] sm:text-[23px] font-extrabold tracking-tight text-white uppercase drop-shadow-sm">
                  I'M CRAMPING!
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white text-[#be0037] text-[11px] uppercase font-black tracking-wider shadow-sm">
                  SOS
                </span>
              </div>
              <p className="text-[12px] font-semibold text-white/95 mt-0.5 truncate">
                Instant relief companion & comfort protocol
              </p>
            </div>
          </div>

          <div className="z-10 w-9 h-9 rounded-full bg-white/25 flex items-center justify-center shrink-0 text-white">
            <span className="material-symbols-outlined text-[20px]">bolt</span>
          </div>
        </button>

        {/* Collapsible Quick Cramp Protocol Drawer */}
        {isProtocolOpen && (
          <div className="w-full mt-3 rounded-[1.5rem] bg-[#ffe0f1] p-4 shadow-md flex flex-col gap-3 border border-[#ffd7ee] animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-bold text-[#be0037] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">healing</span>
                Rapid Cramp Rescue Active
              </span>
              <button
                onClick={() => setIsProtocolOpen(false)}
                className="w-7 h-7 rounded-full bg-[#ffe8f3] flex items-center justify-center text-[#584048] hover:bg-[#ffd7ee] transition-colors"
                type="button"
                aria-label="Close protocol drawer"
              >
                <span className="material-symbols-outlined text-[15px]">close</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <button
                onClick={() => {
                  onStartReliefTimer();
                  onNavigateTab('relief-kit');
                }}
                className="bg-white p-3 rounded-[1rem] flex flex-col items-center shadow-xs hover:border-[#ff4fa3] border border-transparent transition-all active:scale-95 text-left"
                type="button"
              >
                <span className="material-symbols-outlined text-[#b7046c] text-[22px]">hot_tub</span>
                <span className="text-[12px] font-bold text-[#2d1226] mt-1">Heat Pad</span>
                <span className="text-[10px] text-[#584048] font-medium">Turn on high</span>
              </button>

              <button
                onClick={() => onNavigateTab('relief-kit')}
                className="bg-white p-3 rounded-[1rem] flex flex-col items-center shadow-xs hover:border-[#ff4fa3] border border-transparent transition-all active:scale-95 text-left"
                type="button"
              >
                <span className="material-symbols-outlined text-[#b7046c] text-[22px]">local_cafe</span>
                <span className="text-[12px] font-bold text-[#2d1226] mt-1">Warm Sip</span>
                <span className="text-[10px] text-[#584048] font-medium">Magnesium tea</span>
              </button>

              <button
                onClick={() => onNavigateTab('relief-kit')}
                className="bg-white p-3 rounded-[1rem] flex flex-col items-center shadow-xs hover:border-[#ff4fa3] border border-transparent transition-all active:scale-95 text-left"
                type="button"
              >
                <span className="material-symbols-outlined text-[#b7046c] text-[22px]">bed</span>
                <span className="text-[12px] font-bold text-[#2d1226] mt-1">Fetal Curl</span>
                <span className="text-[10px] text-[#584048] font-medium">Pillow on knees</span>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-1 border-t border-[#ffd7ee]/60">
              <span className="text-[12px] text-[#584048] font-medium">
                Need extra backup right now?
              </span>
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={onOpenSosModal}
                  className="flex-1 sm:flex-none px-3.5 py-1.5 rounded-full bg-[#be0037] text-white text-[11px] font-bold shadow-sm active:scale-95 transition-all text-center"
                  type="button"
                >
                  Full SOS Screen 🚨
                </button>
                <button
                  onClick={() => onOpenSmsModal("SOS: Urgent cramp attack! Please bring snacks and heat pack ASAP 💗")}
                  className="flex-1 sm:flex-none px-3.5 py-1.5 rounded-full bg-[#ff4fa3] text-white text-[11px] font-bold shadow-sm active:scale-95 transition-all text-center"
                  type="button"
                >
                  Send "Bring Snacks & Heat"
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Daily Comfort Vibe Card */}
      <div className="relative overflow-hidden rounded-[1.5rem] bg-[#ffe8f3] p-4.5 shadow-sm border border-[#ffd7ee]">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-[#ff4fa3]/20 flex items-center justify-center shrink-0 text-[#b7046c] mt-0.5">
            <span className="material-symbols-outlined text-[20px]">self_improvement</span>
          </div>
          <div className="flex flex-col flex-1">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-bold text-[#b7046c] tracking-wider uppercase">
                TODAY'S VIBE
              </span>
              <span className="text-[11px] font-bold text-[#755664] bg-white/70 px-2 py-0.5 rounded-full">
                Self-Care Mode
              </span>
            </div>
            <h2 className="font-['Epilogue'] text-[17px] font-bold text-[#2d1226] mt-0.5">
              Take it slow, angel 💗
            </h2>
            <p className="text-[13px] text-[#584048] mt-1 leading-relaxed font-medium">
              Your comfort kit is locked & loaded, babe. Remember: rest is completely productive too. Zero guilt allowed today.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Symptom Log 1-Tap Row */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#b7046c] text-[19px]">add_circle</span>
            <span className="text-[14px] font-bold text-[#2d1226]">1-Tap Symptom Log</span>
          </div>
          <span className="text-[12px] font-bold text-[#755664]">
            {selectedSymptoms.length === 0
              ? 'Tap what hurts'
              : `${selectedSymptoms.length} logged • Rest up!`}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {symptomsList.map((symptom) => {
            const isSelected = selectedSymptoms.includes(symptom.id);
            return (
              <button
                key={symptom.id}
                onClick={() => toggleSymptom(symptom.id)}
                className={`group flex items-center gap-1.5 px-3.5 py-2 rounded-full font-bold text-[12px] active:scale-95 transition-all shadow-xs ${
                  isSelected
                    ? 'bg-[#ff4fa3] text-white shadow-[0_2px_10px_rgba(255,79,163,0.35)]'
                    : 'bg-[#ffe8f3] text-[#2d1226] border border-[#ffd7ee] hover:bg-[#ffe0f1]'
                }`}
                type="button"
              >
                <span
                  className={`material-symbols-outlined text-[16px] ${
                    isSelected ? 'text-white' : symptom.iconColor
                  }`}
                >
                  {symptom.icon}
                </span>
                <span>{symptom.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive What Helps Me Right Now? */}
      <div className="rounded-[1.5rem] bg-[#ffe0f1] p-4.5 shadow-sm flex flex-col gap-3 border border-[#ffd7ee]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#b7046c] text-[20px]">stars</span>
            <span className="font-['Epilogue'] text-[16px] font-bold text-[#2d1226]">
              What Helps Me Right Now?
            </span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#ff4fa3] text-white text-[11px] font-bold shadow-xs">
            Your Top Combo
          </span>
        </div>

        {/* Combination Metric Pill */}
        <div className="bg-white rounded-[1rem] p-3.5 flex items-center justify-between border border-[#ffd7ee]/60 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#ffe0f1] flex items-center justify-center text-[#b7046c] font-['Epilogue'] font-extrabold text-[15px]">
              88%
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-bold text-[#2d1226]">
                Heat Pack + Magnesium Tea
              </span>
              <span className="text-[11px] font-medium text-[#584048]">
                Relief reported within 24 mins
              </span>
            </div>
          </div>

          <button
            onClick={handleStartCombo}
            className={`px-3.5 py-1.5 rounded-full text-white text-[12px] font-bold active:scale-95 transition-all flex items-center gap-1 shadow-sm ${
              comboStarted ? 'bg-[#be0037]' : 'bg-[#b7046c] hover:bg-[#ff4fa3]'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[15px]">
              {comboStarted ? 'check' : 'play_arrow'}
            </span>
            <span>{comboStarted ? 'Applied!' : 'Start'}</span>
          </button>
        </div>

        {/* Comfort Audio Ambient Player Widget */}
        <div className="rounded-[1rem] bg-[#ffe8f3] p-3 flex items-center justify-between gap-3 border border-[#ffd7ee]">
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              onClick={onToggleAudio}
              className="w-10 h-10 rounded-full bg-[#ff4fa3] text-white flex items-center justify-center shrink-0 shadow-sm active:scale-95 transition-all"
              type="button"
              aria-label="Toggle pink noise"
            >
              <span className="material-symbols-outlined text-[20px]">
                {isPlayingAudio ? 'pause_circle' : 'play_circle'}
              </span>
            </button>
            <div className="flex flex-col min-w-0">
              <span className="text-[13px] font-bold text-[#2d1226] truncate">
                Pink Noise & Warm Rainfall
              </span>
              <span className="text-[11px] font-medium text-[#584048]">
                {isPlayingAudio
                  ? 'Playing soothing 432Hz warmth loop... 🎧'
                  : 'Calming neural cramp frequencies'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[#b7046c] pr-1">
            <span
              className={`inline-block w-1 rounded-full bg-[#b7046c] transition-all duration-300 ${
                isPlayingAudio ? 'h-3 animate-pulse' : 'h-1.5 opacity-40'
              }`}
            ></span>
            <span
              className={`inline-block w-1 rounded-full bg-[#b7046c] transition-all duration-300 ${
                isPlayingAudio ? 'h-5 animate-pulse delay-75' : 'h-2 opacity-40'
              }`}
            ></span>
            <span
              className={`inline-block w-1 rounded-full bg-[#b7046c] transition-all duration-300 ${
                isPlayingAudio ? 'h-2.5 animate-pulse delay-150' : 'h-1 opacity-40'
              }`}
            ></span>
          </div>
        </div>
      </div>

      {/* Plan My Period Preview Card */}
      <div className="rounded-[1.5rem] bg-[#ffe8f3] p-4.5 shadow-sm flex flex-col gap-2.5 border border-[#ffd7ee]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#b7046c] text-[20px]">inventory_2</span>
            <span className="font-['Epilogue'] text-[16px] font-bold text-[#2d1226]">
              Plan My Period
            </span>
          </div>
          <span className="text-[11px] font-bold text-[#755664] bg-white/70 px-2 py-0.5 rounded-full">
            Next in ~14 days
          </span>
        </div>

        <p className="text-[13px] text-[#584048] font-medium leading-relaxed">
          Friendly vanity prep! Don't get caught dry. Pack your bag stash before you head out:
        </p>

        <div className="grid grid-cols-2 gap-2 mt-0.5">
          <button
            onClick={() => toggleCheckItem('heat-pads')}
            className="rounded-[1rem] bg-white p-2.5 flex items-center gap-2 text-left border border-[#ffd7ee]/60 shadow-xs cursor-pointer active:scale-98 transition-transform"
            type="button"
          >
            <span
              className={`material-symbols-outlined text-[18px] ${
                checkedItems['heat-pads'] ? 'text-[#b7046c] material-symbols-filled' : 'text-[#8b7078]'
              }`}
            >
              {checkedItems['heat-pads'] ? 'check_box' : 'check_box_outline_blank'}
            </span>
            <span className="text-[12px] font-bold text-[#2d1226]">Adhesive Heat Pads</span>
          </button>

          <button
            onClick={() => toggleCheckItem('dark-chocolate')}
            className="rounded-[1rem] bg-white p-2.5 flex items-center gap-2 text-left border border-[#ffd7ee]/60 shadow-xs cursor-pointer active:scale-98 transition-transform"
            type="button"
          >
            <span
              className={`material-symbols-outlined text-[18px] ${
                checkedItems['dark-chocolate'] ? 'text-[#b7046c] material-symbols-filled' : 'text-[#8b7078]'
              }`}
            >
              {checkedItems['dark-chocolate'] ? 'check_box' : 'check_box_outline_blank'}
            </span>
            <span className="text-[12px] font-bold text-[#2d1226]">Dark Chocolate Stash</span>
          </button>
        </div>

        {/* Visual Polish: Skincare & Coquette Aesthetic Kit Preview */}
        <div
          onClick={() => onNavigateTab('cycle-calendar')}
          className="relative w-full h-32 rounded-[1rem] overflow-hidden mt-1 shadow-xs cursor-pointer group"
        >
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            alt="A chic aesthetic coquette vanity flatlay with pink silk scrunchies, a pastel pink reusable heating pad, organic chamomile tea in a porcelain cup, and dark chocolate squares on a blush marble tray."
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDd5E9pTUuIB_WeuwOHjq6zI5Ifw_g3cVXnX9J1J4_9PitjBmd-r9qjVZ_HF-AWXUk0hAHNlWB-UzfxM06av0aQZ9gDbPx0OHK832Y67Krfi5mqdMyurStK1cclbz-DaEsXW7dmf1OV03afxhx72JeTsnfDVuv4K1v-tIA_K_aW_3HA3mNg9xvuiKFOSgr_pt_bobBrCiozFBKaP6oQGRH0MNX8UKXp16lXJ0PGVR-4Q5PMbHthG7Zv6Q"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent flex items-end justify-between p-3">
            <span className="text-[12px] text-white font-semibold">
              Baddie Vanity Stash • Ready for next cycle
            </span>
            <span className="text-[11px] font-bold text-[#ffd7ee] bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full">
              View Bag →
            </span>
          </div>
        </div>
      </div>

      {/* Discreet Support / SOS SMS Trigger Banner */}
      <div className="rounded-[1.5rem] bg-[#fff0f6] p-4.5 shadow-sm flex flex-col gap-2 border border-[#ffd7ee]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#be0037] text-[18px]">
              chat_bubble_outline
            </span>
            <span className="text-[14px] font-bold text-[#2d1226]">Discreet Support Ping</span>
          </div>
          <span className="text-[11px] font-bold text-[#584048] bg-[#ffd7ee] px-2 py-0.5 rounded-full">
            Quick SMS
          </span>
        </div>

        <div className="bg-white rounded-[1rem] p-3.5 flex flex-col gap-2.5 border border-[#ffd7ee]/60 shadow-xs">
          <span className="text-[12px] text-[#755664] italic leading-relaxed">
            "{defaultSmsBody}"
          </span>

          <div className="flex justify-end gap-2 flex-wrap">
            <button
              onClick={handleCopySms}
              className="px-3.5 py-1.5 rounded-full bg-[#ffd7ee] text-[#2d1226] text-[12px] font-bold active:scale-95 transition-transform flex items-center gap-1 hover:bg-[#ffe0f1]"
              type="button"
            >
              <span className="material-symbols-outlined text-[13px]">
                {copiedSms ? 'check' : 'content_copy'}
              </span>
              <span>{copiedSms ? 'Copied! 🎀' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handleOpenSms}
              className="px-3.5 py-1.5 rounded-full bg-[#b7046c] text-white text-[12px] font-bold active:scale-95 transition-transform flex items-center gap-1 shadow-sm hover:bg-[#ff4fa3]"
              type="button"
            >
              <span className="material-symbols-outlined text-[13px]">send</span>
              <span>Open SMS</span>
            </button>
          </div>
        </div>
      </div>

      {/* Health & Safety Medical Disclaimer Banner */}
      <div className="rounded-[1.5rem] bg-[#ffd7ee]/50 p-4 flex items-start gap-3 border border-[#ffd7ee]">
        <span className="material-symbols-outlined text-[#584048] text-[18px] shrink-0 mt-0.5">
          info
        </span>
        <p className="text-[12px] text-[#584048] leading-relaxed font-medium">
          <strong className="text-[#2d1226] font-bold">Wellness support tool:</strong> Pink Pain Club is not a medical diagnostic device. Severe, sharp, or sudden pelvic pain deserves gentle professional care from your OB/GYN or health provider.
        </p>
      </div>
    </div>
  );
};
