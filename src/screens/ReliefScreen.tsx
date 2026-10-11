import React, { useState, useEffect } from 'react';
import { ambientSound } from '../utils/audioSynth';

interface ReliefScreenProps {
  onOpenSosModal: () => void;
  onOpenSmsModal: (text?: string) => void;
  timerActive: boolean;
  onToggleTimer: (active: boolean) => void;
  isPlayingAudio: boolean;
  onToggleAudio: () => void;
}

export const ReliefScreen: React.FC<ReliefScreenProps> = ({
  onOpenSosModal,
  onOpenSmsModal,
  timerActive,
  onToggleTimer,
  isPlayingAudio,
  onToggleAudio,
}) => {
  // 20 minute heat timer
  const [timeLeft, setTimeLeft] = useState<number>(20 * 60);
  const [totalTime, setTotalTime] = useState<number>(20 * 60);

  // Breathing pacer state
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');

  // Audio frequency mode
  const [selectedAudioMode, setSelectedAudioMode] = useState<'pink-noise' | 'warm-rain' | '432hz'>('pink-noise');
  const [audioVolume, setAudioVolume] = useState<number>(0.25);

  // Acupressure active point timer
  const [activeAcupressurePoint, setActiveAcupressurePoint] = useState<string | null>(null);
  const [acuSecondsLeft, setAcuSecondsLeft] = useState<number>(180);
  const [isAcuRunning, setIsAcuRunning] = useState<boolean>(false);

  // Heat timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            onToggleTimer(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, timeLeft, onToggleTimer]);

  // Breathing cycle animation effect
  useEffect(() => {
    const cycle = setInterval(() => {
      setBreathPhase((prev) => {
        if (prev === 'Inhale') return 'Hold';
        if (prev === 'Hold') return 'Exhale';
        return 'Inhale';
      });
    }, 4000);
    return () => clearInterval(cycle);
  }, []);

  // Acupressure timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isAcuRunning && acuSecondsLeft > 0) {
      interval = setInterval(() => {
        setAcuSecondsLeft((prev) => {
          if (prev <= 1) {
            setIsAcuRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAcuRunning, acuSecondsLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSetTimerDuration = (mins: number) => {
    const secs = mins * 60;
    setTotalTime(secs);
    setTimeLeft(secs);
    onToggleTimer(true);
  };

  const handleAudioModeChange = (mode: 'pink-noise' | 'warm-rain' | '432hz') => {
    setSelectedAudioMode(mode);
    if (isPlayingAudio) {
      ambientSound.play(mode, audioVolume);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setAudioVolume(val);
    ambientSound.setVolume(val);
  };

  const startAcupressure = (pointName: string) => {
    setActiveAcupressurePoint(pointName);
    setAcuSecondsLeft(180);
    setIsAcuRunning(true);
  };

  const progressPercent = Math.max(0, Math.min(100, ((totalTime - timeLeft) / totalTime) * 100));

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-5 pt-4 pb-28 gap-4">
      {/* Top Header Card */}
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#ffe0f1] to-[#ffe8f3] p-6 shadow-sm border border-[#ffd7ee]">
        <div className="flex items-center justify-between mb-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff4fa3] text-white text-[11px] font-bold shadow-xs">
            <span className="material-symbols-outlined text-[12px] material-symbols-filled">local_florist</span>
            Relief Companion
          </span>
          <button
            onClick={onOpenSosModal}
            className="px-3 py-1 rounded-full bg-[#be0037] text-white text-[11px] font-bold active:scale-95 transition-all shadow-xs flex items-center gap-1"
            type="button"
          >
            <span className="material-symbols-outlined text-[13px]">bolt</span>
            <span>Emergency SOS</span>
          </button>
        </div>

        <h1 className="font-['Epilogue'] text-[24px] font-extrabold text-[#2d1226]">
          Instant Cramp Relief Lab 🌸
        </h1>
        <p className="text-[13px] text-[#584048] font-medium mt-1 leading-relaxed">
          Tactile thermotherapy, targeted neuro-frequencies, and gentle acupressure for immediate uterine comfort.
        </p>
      </div>

      {/* 20-Minute Heat Pack & Breathing Companion */}
      <div className="rounded-[2rem] bg-white p-6 shadow-sm border border-[#ffd7ee] flex flex-col items-center text-center">
        <div className="flex items-center justify-between w-full mb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#b7046c] text-[20px]">timer</span>
            <span className="font-['Epilogue'] text-[16px] font-bold text-[#2d1226]">
              Thermotherapy Session
            </span>
          </div>
          <span className="text-[11px] font-bold text-[#755664] bg-[#ffe0f1] px-2.5 py-0.5 rounded-full">
            {timerActive ? 'Heating Active 🔥' : 'Ready to Start'}
          </span>
        </div>

        {/* Circular Progress & Time Display */}
        <div className="relative w-48 h-48 my-2 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="transparent"
              stroke="#ffe0f1"
              strokeWidth="7"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="transparent"
              stroke="#ff4fa3"
              strokeWidth="7"
              strokeDasharray="264"
              strokeDashoffset={264 - (264 * progressPercent) / 100}
              strokeLinecap="round"
              className="transition-all duration-500 ease-out"
            />
          </svg>

          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-['Epilogue'] text-[34px] font-extrabold text-[#2d1226] tracking-tight">
              {formatTime(timeLeft)}
            </span>
            <span className="text-[12px] font-bold text-[#b7046c]">
              {timerActive ? 'Rest with Heat Pad' : 'Preset Duration'}
            </span>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="flex gap-2 my-2">
          {[15, 20, 30].map((mins) => (
            <button
              key={mins}
              onClick={() => handleSetTimerDuration(mins)}
              className={`px-3.5 py-1.5 rounded-full text-[12px] font-bold transition-all active:scale-95 ${
                totalTime === mins * 60 && timerActive
                  ? 'bg-[#ff4fa3] text-white shadow-sm'
                  : 'bg-[#ffe8f3] text-[#2d1226] hover:bg-[#ffe0f1]'
              }`}
              type="button"
            >
              {mins} mins
            </button>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex gap-3 mt-2 w-full max-w-xs">
          <button
            onClick={() => onToggleTimer(!timerActive)}
            className={`flex-1 py-3 rounded-full font-bold text-[13px] text-white shadow-sm active:scale-95 transition-all flex items-center justify-center gap-1.5 ${
              timerActive
                ? 'bg-[#755664] hover:bg-[#584048]'
                : 'bg-gradient-to-r from-[#ff4fa3] to-[#b7046c] shadow-[0_4px_16px_rgba(255,79,163,0.3)]'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">
              {timerActive ? 'pause' : 'play_arrow'}
            </span>
            <span>{timerActive ? 'Pause Session' : 'Start Heat Timer'}</span>
          </button>

          <button
            onClick={() => {
              setTimeLeft(totalTime);
              onToggleTimer(false);
            }}
            className="px-4 py-3 rounded-full bg-[#ffe8f3] text-[#584048] hover:text-[#2d1226] text-[13px] font-bold active:scale-95 transition-all"
            type="button"
            title="Reset timer"
          >
            <span className="material-symbols-outlined text-[18px]">restart_alt</span>
          </button>
        </div>

        {/* Synchronized Gentle Breathing Pacer Bubble */}
        <div className="w-full mt-5 pt-4 border-t border-[#ffd7ee] flex flex-col items-center">
          <span className="text-[11px] font-bold text-[#b7046c] uppercase tracking-wider mb-2">
            Pelvic Relaxation Breath Pacer
          </span>
          <div className="flex items-center gap-4">
            <div
              className={`w-16 h-16 rounded-full bg-gradient-to-tr from-[#ffe0f1] to-[#ff4fa3]/30 border-2 border-[#ff4fa3] flex items-center justify-center transition-all duration-1000 ease-in-out ${
                breathPhase === 'Inhale'
                  ? 'scale-125 shadow-[0_0_24px_rgba(255,79,163,0.4)]'
                  : breathPhase === 'Hold'
                  ? 'scale-115'
                  : 'scale-90 opacity-70'
              }`}
            >
              <span className="text-[12px] font-extrabold text-[#b7046c]">{breathPhase}</span>
            </div>
            <div className="text-left">
              <p className="text-[13px] font-bold text-[#2d1226]">
                {breathPhase === 'Inhale' && 'Slow inhale down into belly...'}
                {breathPhase === 'Hold' && 'Gently hold, softening pelvic floor...'}
                {breathPhase === 'Exhale' && 'Long, soft sigh through lips...'}
              </p>
              <p className="text-[11px] text-[#584048] mt-0.5">
                Deep abdominal breathing lowers prostaglandin spasms.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Soothing Frequency Station (Real Audio) */}
      <div className="rounded-[2rem] bg-[#ffe8f3] p-5 shadow-sm border border-[#ffd7ee] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#b7046c] text-[20px]">graphic_eq</span>
            <span className="font-['Epilogue'] text-[16px] font-bold text-[#2d1226]">
              Neural Sound Sanctuary
            </span>
          </div>
          <span className="text-[11px] font-bold text-[#b7046c] bg-white px-2.5 py-0.5 rounded-full shadow-xs">
            Synthesized Live 🎧
          </span>
        </div>

        {/* Mode Selector */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'pink-noise', label: 'Pink Noise', desc: 'Neural Calming', icon: 'waves' },
            { id: 'warm-rain', label: 'Warm Rain', desc: 'Blush Droplets', icon: 'rainy' },
            { id: '432hz', label: '432 Hz Tone', desc: 'Sacred Harmony', icon: 'music_note' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleAudioModeChange(item.id as 'pink-noise' | 'warm-rain' | '432hz')}
              className={`p-2.5 rounded-[1rem] flex flex-col items-center text-center transition-all active:scale-95 ${
                selectedAudioMode === item.id
                  ? 'bg-[#ff4fa3] text-white shadow-xs'
                  : 'bg-white text-[#2d1226] border border-[#ffd7ee] hover:bg-[#ffe0f1]'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
              <span className="text-[12px] font-bold mt-1">{item.label}</span>
              <span
                className={`text-[10px] ${
                  selectedAudioMode === item.id ? 'text-white/90' : 'text-[#755664]'
                }`}
              >
                {item.desc}
              </span>
            </button>
          ))}
        </div>

        {/* Master Audio Controller */}
        <div className="bg-white rounded-[1rem] p-3.5 flex items-center justify-between gap-3 border border-[#ffd7ee]/60">
          <button
            onClick={onToggleAudio}
            className="w-11 h-11 rounded-full bg-[#ff4fa3] text-white flex items-center justify-center shrink-0 shadow-[0_4px_12px_rgba(255,79,163,0.3)] active:scale-95 transition-all"
            type="button"
          >
            <span className="material-symbols-outlined text-[24px]">
              {isPlayingAudio ? 'pause' : 'play_arrow'}
            </span>
          </button>

          <div className="flex flex-col flex-1 min-w-0">
            <div className="flex items-center justify-between text-[11px] font-bold text-[#584048] mb-1">
              <span>Volume</span>
              <span>{Math.round(audioVolume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={audioVolume}
              onChange={handleVolumeChange}
              className="w-full accent-[#ff4fa3] h-1.5 bg-[#ffe0f1] rounded-lg cursor-pointer"
            />
          </div>

          <div className="text-right shrink-0">
            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                isPlayingAudio ? 'bg-[#ff596d]/15 text-[#be0037] animate-pulse' : 'bg-gray-100 text-[#755664]'
              }`}
            >
              {isPlayingAudio ? 'Playing' : 'Paused'}
            </span>
          </div>
        </div>
      </div>

      {/* Acupressure Points Quick Guide */}
      <div className="rounded-[2rem] bg-white p-5 shadow-sm border border-[#ffd7ee] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#b7046c] text-[20px]">touch_app</span>
            <span className="font-['Epilogue'] text-[16px] font-bold text-[#2d1226]">
              Acupressure Relief Points
            </span>
          </div>
          <span className="text-[11px] font-bold text-[#755664]">Proven 3-min holds</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* SP6 */}
          <div className="rounded-[1.25rem] bg-[#fff0f6] p-3.5 border border-[#ffd7ee] flex flex-col justify-between gap-2">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-extrabold text-[#be0037]">
                  SP-6 (San Yin Jiao)
                </span>
                <span className="text-[10px] font-bold bg-[#ffd7ee] px-2 py-0.5 rounded-full text-[#584048]">
                  Inner Ankle
                </span>
              </div>
              <p className="text-[11px] text-[#584048] mt-1 leading-snug">
                Measure 4 finger widths above your inner ankle bone behind the shin. Apply firm circular pressure.
              </p>
            </div>
            <button
              onClick={() => startAcupressure('SP-6')}
              className="mt-1 w-full py-1.5 rounded-full bg-[#b7046c] text-white text-[11px] font-bold active:scale-95 transition-all text-center"
              type="button"
            >
              {activeAcupressurePoint === 'SP-6' && isAcuRunning
                ? `Holding: ${formatTime(acuSecondsLeft)}`
                : 'Start 3-Min Pressure Hold'}
            </button>
          </div>

          {/* LI4 */}
          <div className="rounded-[1.25rem] bg-[#fff0f6] p-3.5 border border-[#ffd7ee] flex flex-col justify-between gap-2">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-extrabold text-[#b7046c]">
                  LI-4 (He Gu)
                </span>
                <span className="text-[10px] font-bold bg-[#ffd7ee] px-2 py-0.5 rounded-full text-[#584048]">
                  Hand Webbing
                </span>
              </div>
              <p className="text-[11px] text-[#584048] mt-1 leading-snug">
                In the soft flesh between your thumb and index finger. Press deeply towards index bone to stimulate endorphins.
              </p>
            </div>
            <button
              onClick={() => startAcupressure('LI-4')}
              className="mt-1 w-full py-1.5 rounded-full bg-[#ff4fa3] text-white text-[11px] font-bold active:scale-95 transition-all text-center"
              type="button"
            >
              {activeAcupressurePoint === 'LI-4' && isAcuRunning
                ? `Holding: ${formatTime(acuSecondsLeft)}`
                : 'Start 3-Min Pressure Hold'}
            </button>
          </div>
        </div>
      </div>

      {/* Gentle Comfort Stretches & Elixirs */}
      <div className="rounded-[2rem] bg-[#ffe0f1] p-5 shadow-sm border border-[#ffd7ee] flex flex-col gap-3">
        <span className="font-['Epilogue'] text-[16px] font-bold text-[#2d1226]">
          Soothing Elixir Recipes
        </span>

        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-white rounded-[1.25rem] p-3 border border-[#ffd7ee]/60 shadow-xs">
            <span className="text-[20px]">🫖</span>
            <h3 className="text-[12px] font-bold text-[#2d1226] mt-1">Magnesium Tea</h3>
            <p className="text-[11px] text-[#584048] mt-0.5 leading-snug">
              200mg Magnesium Glycinate powder stirred into hot chamomile tea with raw honey.
            </p>
          </div>

          <div className="bg-white rounded-[1.25rem] p-3 border border-[#ffd7ee]/60 shadow-xs">
            <span className="text-[20px]">🍒</span>
            <h3 className="text-[12px] font-bold text-[#2d1226] mt-1">Tart Cherry Tonic</h3>
            <p className="text-[11px] text-[#584048] mt-0.5 leading-snug">
              Natural anti-inflammatory anthocyanins + melatonin for restorative evening sleep.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
