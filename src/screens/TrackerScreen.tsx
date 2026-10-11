import React, { useState, useEffect } from 'react';
import { SymptomLogEntry } from '../types';

interface TrackerScreenProps {
  onEntryLogged?: () => void;
}

export const TrackerScreen: React.FC<TrackerScreenProps> = ({ onEntryLogged }) => {
  // Pain Dial 1-10
  const [painScore, setPainScore] = useState<number>(5);

  // Flow selector
  const [flow, setFlow] = useState<'None' | 'Spotting' | 'Light' | 'Medium' | 'Heavy'>('Medium');

  // Selected pain locations
  const [locations, setLocations] = useState<string[]>(['Lower Abdomen', 'Lower Back']);

  // Selected symptoms
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([
    'Cramps',
    'Fatigue',
    'Bloating',
  ]);

  // Selected remedies taken
  const [remediesTaken, setRemediesTaken] = useState<string[]>(['Heat Pad']);

  // Selected mood
  const [mood, setMood] = useState<string>('Cozy Sloth');

  // Notes
  const [notes, setNotes] = useState<string>('');

  // Past logs saved in localStorage
  const [logs, setLogs] = useState<SymptomLogEntry[]>([]);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('pink_pain_logs');
      if (stored) {
        setLogs(JSON.parse(stored));
      } else {
        // Seed default realistic entries
        const initialLogs: SymptomLogEntry[] = [
          {
            id: '1',
            timestamp: 'Today, 2:15 PM',
            painLevel: 7,
            symptoms: ['Cramps', 'Lower Back', 'Bloating'],
            flow: 'Medium',
            mood: 'Tender & Sensitive',
            remediesUsed: ['Heat Pad', 'Magnesium Tea'],
            notes: 'Sharp wave around lunch, felt so much better after 20 mins with heating pad.',
          },
          {
            id: '2',
            timestamp: 'Yesterday, 8:40 PM',
            painLevel: 4,
            symptoms: ['Fatigue', 'Brain Fog'],
            flow: 'Light',
            mood: 'Cozy Sloth',
            remediesUsed: ['Chamomile Tea', 'Early Sleep'],
            notes: 'Heavy limbs and tired eyes. Snuggled with hot water bottle.',
          },
        ];
        setLogs(initialLogs);
        localStorage.setItem('pink_pain_logs', JSON.stringify(initialLogs));
      }
    } catch {
      // Ignore
    }
  }, []);

  const getPainDescription = (score: number) => {
    if (score <= 2) return { text: 'Mild whisper • Manageable', color: '#755664', bg: '#ffe8f3' };
    if (score <= 4) return { text: 'Noticeable dull ache • Distracting', color: '#b7046c', bg: '#ffe0f1' };
    if (score <= 6) return { text: 'Disruptive cramp waves • Needs heat', color: '#ff4fa3', bg: '#ffd7ee' };
    if (score <= 8) return { text: 'Intense spasms • Curling up in bed', color: '#ff3158', bg: '#ffdad6' };
    return { text: 'Severe agony • Full SOS mode required', color: '#ba1a1a', bg: '#ffdad6' };
  };

  const painMeta = getPainDescription(painScore);

  const toggleLocation = (loc: string) => {
    setLocations((prev) =>
      prev.includes(loc) ? prev.filter((i) => i !== loc) : [...prev, loc]
    );
  };

  const toggleSymptom = (sym: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(sym) ? prev.filter((i) => i !== sym) : [...prev, sym]
    );
  };

  const toggleRemedy = (rem: string) => {
    setRemediesTaken((prev) =>
      prev.includes(rem) ? prev.filter((i) => i !== rem) : [...prev, rem]
    );
  };

  const handleSaveLog = () => {
    const newEntry: SymptomLogEntry = {
      id: Date.now().toString(),
      timestamp: 'Just now',
      painLevel: painScore,
      symptoms: selectedSymptoms,
      flow,
      mood,
      remediesUsed: remediesTaken,
      notes: notes.trim() || undefined,
    };

    const updated = [newEntry, ...logs];
    setLogs(updated);
    try {
      localStorage.setItem('pink_pain_logs', JSON.stringify(updated));
    } catch {
      // Ignore
    }

    setSaveSuccess(true);
    if (onEntryLogged) onEntryLogged();
    setTimeout(() => {
      setSaveSuccess(false);
      setNotes('');
    }, 2500);
  };

  const handleDeleteLog = (id: string) => {
    const updated = logs.filter((log) => log.id !== id);
    setLogs(updated);
    try {
      localStorage.setItem('pink_pain_logs', JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-5 pt-4 pb-28 gap-4">
      {/* Top Banner */}
      <div className="rounded-[2rem] bg-[#ffe0f1] p-6 shadow-sm border border-[#ffd7ee]">
        <div className="flex items-center justify-between mb-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff4fa3] text-white text-[11px] font-bold">
            <span className="material-symbols-outlined text-[12px] material-symbols-filled">favorite</span>
            Daily Pain Check-In
          </span>
          <span className="text-[12px] font-bold text-[#584048]">Cycle Day 14</span>
        </div>
        <h1 className="font-['Epilogue'] text-[24px] font-extrabold text-[#2d1226]">
          How's the body holding up? 🌸
        </h1>
        <p className="text-[13px] text-[#584048] font-medium mt-1 leading-snug">
          Dial in your numbers with honesty. No minimizing your pain here.
        </p>
      </div>

      {/* Tactile Pain Dial / Slider */}
      <div className="rounded-[2rem] bg-white p-5 shadow-sm border border-[#ffd7ee] flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="font-['Epilogue'] text-[16px] font-bold text-[#2d1226]">
            Tactile Pain Scale (1–10)
          </span>
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center font-['Epilogue'] font-extrabold text-[18px] text-white shadow-sm transition-all"
            style={{
              backgroundColor:
                painScore <= 3
                  ? '#ff4fa3'
                  : painScore <= 6
                  ? '#b7046c'
                  : '#be0037',
            }}
          >
            {painScore}
          </div>
        </div>

        {/* Dynamic Descriptive Badge */}
        <div
          className="rounded-[1rem] p-3 transition-colors flex items-center justify-between"
          style={{ backgroundColor: painMeta.bg }}
        >
          <span className="text-[13px] font-bold" style={{ color: painMeta.color }}>
            {painMeta.text}
          </span>
          <span className="text-[11px] font-bold text-[#584048]">Level {painScore}/10</span>
        </div>

        {/* Slider Knob */}
        <div className="px-1">
          <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={painScore}
            onChange={(e) => setPainScore(parseInt(e.target.value))}
            className="w-full h-3 bg-gradient-to-r from-[#ffe0f1] via-[#ff4fa3] to-[#be0037] rounded-lg appearance-none cursor-pointer accent-[#b7046c]"
          />
          <div className="flex justify-between text-[10px] font-bold text-[#755664] mt-2 px-1">
            <span>1 (Mild)</span>
            <span>3</span>
            <span>5 (Wave)</span>
            <span>7</span>
            <span>10 (Crisis)</span>
          </div>
        </div>
      </div>

      {/* Flow Intensity Selector */}
      <div className="rounded-[2rem] bg-[#ffe8f3] p-5 shadow-sm border border-[#ffd7ee] flex flex-col gap-2.5">
        <span className="font-['Epilogue'] text-[15px] font-bold text-[#2d1226]">
          Flow Intensity
        </span>
        <div className="grid grid-cols-5 gap-1.5">
          {(['None', 'Spotting', 'Light', 'Medium', 'Heavy'] as const).map((level) => (
            <button
              key={level}
              onClick={() => setFlow(level)}
              className={`py-2 rounded-[1rem] text-[11px] font-bold transition-all active:scale-95 text-center ${
                flow === level
                  ? 'bg-[#b7046c] text-white shadow-xs'
                  : 'bg-white text-[#2d1226] border border-[#ffd7ee] hover:bg-[#ffe0f1]'
              }`}
              type="button"
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Pain Location Anatomy */}
      <div className="rounded-[2rem] bg-white p-5 shadow-sm border border-[#ffd7ee] flex flex-col gap-2.5">
        <span className="font-['Epilogue'] text-[15px] font-bold text-[#2d1226]">
          Pain Location
        </span>
        <div className="flex flex-wrap gap-2">
          {[
            'Lower Abdomen',
            'Lower Back',
            'Sacrum',
            'Inner Thighs',
            'Pelvic Floor',
            'Head / Migraine',
            'Stomach / GI',
          ].map((loc) => {
            const isSelected = locations.includes(loc);
            return (
              <button
                key={loc}
                onClick={() => toggleLocation(loc)}
                className={`px-3.5 py-1.5 rounded-full text-[12px] font-bold transition-all active:scale-95 ${
                  isSelected
                    ? 'bg-[#ff4fa3] text-white shadow-xs'
                    : 'bg-[#fff0f6] text-[#2d1226] border border-[#ffd7ee] hover:bg-[#ffe8f3]'
                }`}
                type="button"
              >
                {loc}
              </button>
            );
          })}
        </div>
      </div>

      {/* Multi-Symptom Cloud */}
      <div className="rounded-[2rem] bg-white p-5 shadow-sm border border-[#ffd7ee] flex flex-col gap-2.5">
        <span className="font-['Epilogue'] text-[15px] font-bold text-[#2d1226]">
          Accompanying Symptoms
        </span>
        <div className="flex flex-wrap gap-2">
          {[
            'Cramps',
            'Lower Back',
            'Nausea',
            'Fatigue',
            'Bloating',
            'Brain Fog',
            'Headache',
            'Breast Tenderness',
            'Hot Flashes',
            'Chills',
            'Insomnia',
          ].map((sym) => {
            const isSelected = selectedSymptoms.includes(sym);
            return (
              <button
                key={sym}
                onClick={() => toggleSymptom(sym)}
                className={`px-3 py-1.5 rounded-full text-[12px] font-bold transition-all active:scale-95 ${
                  isSelected
                    ? 'bg-[#b7046c] text-white shadow-xs'
                    : 'bg-[#fff0f6] text-[#2d1226] border border-[#ffd7ee] hover:bg-[#ffe8f3]'
                }`}
                type="button"
              >
                {sym}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mood & Comfort Vibe */}
      <div className="rounded-[2rem] bg-[#ffe0f1] p-5 shadow-sm border border-[#ffd7ee] flex flex-col gap-2.5">
        <span className="font-['Epilogue'] text-[15px] font-bold text-[#2d1226]">
          Today's Mood Vibe
        </span>
        <div className="flex flex-wrap gap-2">
          {[
            'Soft Angel',
            'Cozy Sloth',
            'Moody Princess',
            'Tender & Sensitive',
            'Zero Tolerance',
            'Needs Cuddles',
          ].map((m) => (
            <button
              key={m}
              onClick={() => setMood(m)}
              className={`px-3 py-1.5 rounded-full text-[12px] font-bold transition-all active:scale-95 ${
                mood === m
                  ? 'bg-[#be0037] text-white shadow-xs'
                  : 'bg-white text-[#2d1226] border border-[#ffd7ee] hover:bg-[#ffe8f3]'
              }`}
              type="button"
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Remedies Used */}
      <div className="rounded-[2rem] bg-white p-5 shadow-sm border border-[#ffd7ee] flex flex-col gap-2.5">
        <span className="font-['Epilogue'] text-[15px] font-bold text-[#2d1226]">
          Remedies Used Today
        </span>
        <div className="flex flex-wrap gap-2">
          {[
            'Heat Pad',
            'Magnesium Tea',
            'Ibuprofen 400mg',
            'Naproxen',
            'Warm Shower',
            'Dark Chocolate',
            'Fetal Curl Rest',
            'Acupressure',
          ].map((rem) => {
            const isSelected = remediesTaken.includes(rem);
            return (
              <button
                key={rem}
                onClick={() => toggleRemedy(rem)}
                className={`px-3 py-1.5 rounded-full text-[12px] font-bold transition-all active:scale-95 ${
                  isSelected
                    ? 'bg-[#ff4fa3] text-white shadow-xs'
                    : 'bg-[#fff0f6] text-[#2d1226] border border-[#ffd7ee] hover:bg-[#ffe8f3]'
                }`}
                type="button"
              >
                {rem}
              </button>
            );
          })}
        </div>
      </div>

      {/* Personal Notes */}
      <div className="rounded-[2rem] bg-white p-5 shadow-sm border border-[#ffd7ee] flex flex-col gap-2">
        <span className="font-['Epilogue'] text-[15px] font-bold text-[#2d1226]">
          Notes & Sensations
        </span>
        <textarea
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="e.g. sharp twinge on left side after lunch, improved after warm tea and heating pad..."
          className="w-full p-3.5 rounded-[1.25rem] bg-[#fff8f9] border border-[#ffd7ee] text-[13px] text-[#2d1226] placeholder-[#8b7078] focus:outline-none focus:ring-2 focus:ring-[#ff4fa3]/50 resize-none font-medium"
        />
      </div>

      {/* Save Button */}
      <button
        onClick={handleSaveLog}
        className={`w-full py-4 rounded-full font-bold text-[14px] text-white shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 ${
          saveSuccess
            ? 'bg-[#be0037]'
            : 'bg-gradient-to-r from-[#ff4fa3] to-[#b7046c] shadow-[0_6px_20px_rgba(255,79,163,0.35)]'
        }`}
        type="button"
      >
        <span className="material-symbols-outlined text-[18px]">
          {saveSuccess ? 'check_circle' : 'bookmark_heart'}
        </span>
        <span>{saveSuccess ? 'Saved to Baddie Health Log! 🎀' : 'Save Pain & Symptom Check-in'}</span>
      </button>

      {/* Past Entries Timeline */}
      <div className="flex flex-col gap-3 mt-3">
        <div className="flex items-center justify-between">
          <span className="font-['Epilogue'] text-[16px] font-bold text-[#2d1226]">
            Recent Check-ins
          </span>
          <span className="text-[11px] font-bold text-[#755664]">
            {logs.length} logged records
          </span>
        </div>

        {logs.map((log) => (
          <div
            key={log.id}
            className="rounded-[1.5rem] bg-white p-4.5 shadow-sm border border-[#ffd7ee] flex flex-col gap-2.5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center font-['Epilogue'] font-bold text-[13px] text-white"
                  style={{
                    backgroundColor:
                      log.painLevel <= 3
                        ? '#ff4fa3'
                        : log.painLevel <= 6
                        ? '#b7046c'
                        : '#be0037',
                  }}
                >
                  {log.painLevel}
                </div>
                <div className="flex flex-col">
                  <span className="text-[12px] font-bold text-[#2d1226]">
                    Pain Score: {log.painLevel}/10
                  </span>
                  <span className="text-[11px] text-[#755664]">{log.timestamp}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#ffe8f3] text-[#b7046c]">
                  {log.flow} Flow
                </span>
                <button
                  onClick={() => handleDeleteLog(log.id)}
                  className="w-6 h-6 rounded-full text-[#8b7078] hover:text-[#ba1a1a] flex items-center justify-center"
                  title="Delete log"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[14px]">delete</span>
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {log.symptoms.map((s, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#fff0f6] text-[#584048] border border-[#ffd7ee]"
                >
                  {s}
                </span>
              ))}
              {log.remediesUsed.map((r, idx) => (
                <span
                  key={`rem-${idx}`}
                  className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#ffd7ee] text-[#b7046c]"
                >
                  + {r}
                </span>
              ))}
            </div>

            {log.notes && (
              <p className="text-[12px] text-[#584048] italic bg-[#fff8f9] p-2.5 rounded-[1rem] border border-[#ffd7ee]/60">
                "{log.notes}"
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
