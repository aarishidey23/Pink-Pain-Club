import React, { useState } from 'react';

export const CycleScreen: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<number>(14);
  const [cycleLength] = useState<number>(28);

  // Bag stash checklist
  const [checklist, setChecklist] = useState<
    { id: string; name: string; checked: boolean; category: string }[]
  >([
    { id: '1', name: 'Adhesive Heat Pads (x2)', checked: true, category: 'Heat' },
    { id: '2', name: 'Dark Chocolate 85% Bar', checked: true, category: 'Comfort' },
    { id: '3', name: 'Naproxen / Ibuprofen Mini Tin', checked: true, category: 'Meds' },
    { id: '4', name: 'Organic Cotton Regular Pads', checked: false, category: 'Care' },
    { id: '5', name: 'Discreet Scented Disposal Pouches', checked: true, category: 'Care' },
    { id: '6', name: 'Silk Scrunchie & Lip Butter', checked: true, category: 'Vanity' },
    { id: '7', name: 'Magnesium Glycinate Drink Stick', checked: false, category: 'Comfort' },
  ]);

  const [newItemName, setNewItemName] = useState<string>('');

  const toggleCheck = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    const newItem = {
      id: Date.now().toString(),
      name: newItemName.trim(),
      checked: false,
      category: 'Custom',
    };
    setChecklist([...checklist, newItem]);
    setNewItemName('');
  };

  const getPhaseForDay = (day: number) => {
    if (day <= 5) return { name: 'Menstrual Phase', color: '#be0037', tag: 'Rest & Shedding' };
    if (day <= 11) return { name: 'Follicular Phase', color: '#b7046c', tag: 'Estrogen Rebound' };
    if (day <= 16) return { name: 'Ovulatory Phase', color: '#ff4fa3', tag: 'Peak Energy' };
    return { name: 'Luteal Phase', color: '#755664', tag: 'Progesterone Rising' };
  };

  const selectedPhase = getPhaseForDay(selectedDay);

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-5 pt-4 pb-28 gap-4">
      {/* Top Banner */}
      <div className="rounded-[2rem] bg-gradient-to-br from-[#ffe0f1] to-[#ffe8f3] p-6 shadow-sm border border-[#ffd7ee]">
        <div className="flex items-center justify-between mb-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff4fa3] text-white text-[11px] font-bold">
            <span className="material-symbols-outlined text-[12px] material-symbols-filled">calendar_month</span>
            Cycle Intelligence
          </span>
          <span className="text-[12px] font-bold text-[#755664]">28-Day Rhythm</span>
        </div>

        <h1 className="font-['Epilogue'] text-[24px] font-extrabold text-[#2d1226]">
          Cycle Day {selectedDay} • {selectedPhase.name}
        </h1>
        <p className="text-[13px] text-[#584048] font-medium mt-1 leading-snug">
          Next cycle expected in ~{cycleLength - selectedDay} days. Sync your schedule with your hormones.
        </p>
      </div>

      {/* Interactive 28-Day Calendar Wheel / Matrix */}
      <div className="rounded-[2rem] bg-white p-5 shadow-sm border border-[#ffd7ee] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="font-['Epilogue'] text-[16px] font-bold text-[#2d1226]">
            Cycle Overview
          </span>
          <div className="flex gap-2 text-[10px] font-bold text-[#584048]">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#be0037]"></span>
              Period
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#ff4fa3]"></span>
              Ovulation
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#ffe0f1] border border-[#ff4fa3]"></span>
              Luteal
            </span>
          </div>
        </div>

        {/* 28 Day Grid */}
        <div className="grid grid-cols-7 gap-1.5 text-center">
          {Array.from({ length: cycleLength }, (_, i) => i + 1).map((day) => {
            const isToday = day === 14;
            const isSelected = day === selectedDay;
            const isPeriod = day <= 5;
            const isOvulation = day >= 13 && day <= 15;

            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`h-11 rounded-[1rem] flex flex-col items-center justify-center text-[12px] font-bold transition-all active:scale-95 relative ${
                  isSelected
                    ? 'ring-2 ring-[#ff4fa3] ring-offset-2 scale-105 z-10'
                    : ''
                } ${
                  isPeriod
                    ? 'bg-[#ffdad6] text-[#be0037]'
                    : isOvulation
                    ? 'bg-[#ffd7ee] text-[#b7046c]'
                    : 'bg-[#fff0f6] text-[#2d1226] hover:bg-[#ffe8f3]'
                }`}
                type="button"
              >
                <span>{day}</span>
                {isToday && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff4fa3] absolute bottom-1"></span>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Day Hormone Intel */}
        <div className="mt-2 p-3.5 rounded-[1.25rem] bg-[#ffe8f3] border border-[#ffd7ee] flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[12px] font-bold text-[#b7046c]">
              Day {selectedDay} Hormone Vibe
            </span>
            <span className="text-[13px] font-extrabold text-[#2d1226]">
              {selectedDay <= 5 && 'Prostaglandins high • Uterine clearing'}
              {selectedDay > 5 && selectedDay <= 12 && 'Estrogen building • Mental clarity returning'}
              {selectedDay > 12 && selectedDay <= 16 && 'LH surge & Peak libido • High vitality'}
              {selectedDay > 16 && 'Progesterone dominant • Appetite & chill vibes increase'}
            </span>
          </div>
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white text-[#584048] shadow-xs">
            {selectedPhase.tag}
          </span>
        </div>
      </div>

      {/* Plan My Period: Vanity Bag Stash Checklist */}
      <div className="rounded-[2rem] bg-white p-5 shadow-sm border border-[#ffd7ee] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#b7046c] text-[20px]">inventory_2</span>
            <span className="font-['Epilogue'] text-[16px] font-bold text-[#2d1226]">
              Baddie Vanity Stash Kit
            </span>
          </div>
          <span className="text-[11px] font-bold text-[#755664]">
            {checklist.filter((i) => i.checked).length}/{checklist.length} packed
          </span>
        </div>

        {/* Coquette aesthetic flatlay image hotlinked */}
        <div className="relative w-full h-32 rounded-[1.25rem] overflow-hidden shadow-xs">
          <img
            className="w-full h-full object-cover"
            alt="A chic aesthetic coquette vanity flatlay with pink silk scrunchies, reusable heating pad, organic tea and dark chocolate."
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDd5E9pTUuIB_WeuwOHjq6zI5Ifw_g3cVXnX9J1J4_9PitjBmd-r9qjVZ_HF-AWXUk0hAHNlWB-UzfxM06av0aQZ9gDbPx0OHK832Y67Krfi5mqdMyurStK1cclbz-DaEsXW7dmf1OV03afxhx72JeTsnfDVuv4K1v-tIA_K_aW_3HA3mNg9xvuiKFOSgr_pt_bobBrCiozFBKaP6oQGRH0MNX8UKXp16lXJ0PGVR-4Q5PMbHthG7Zv6Q"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
            <span className="text-[12px] font-bold text-white">
              Prepared & Protected • Never Caught Off Guard
            </span>
          </div>
        </div>

        {/* Checklist Rows */}
        <div className="flex flex-col gap-1.5 mt-1">
          {checklist.map((item) => (
            <button
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className="p-3 rounded-[1rem] bg-[#fff0f6] border border-[#ffd7ee] flex items-center justify-between text-left active:scale-98 transition-all"
              type="button"
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={`material-symbols-outlined text-[20px] ${
                    item.checked ? 'text-[#b7046c] material-symbols-filled' : 'text-[#8b7078]'
                  }`}
                >
                  {item.checked ? 'check_box' : 'check_box_outline_blank'}
                </span>
                <span
                  className={`text-[13px] font-bold ${
                    item.checked ? 'text-[#2d1226] line-through opacity-70' : 'text-[#2d1226]'
                  }`}
                >
                  {item.name}
                </span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-[#755664]">
                {item.category}
              </span>
            </button>
          ))}
        </div>

        {/* Add custom item form */}
        <form onSubmit={handleAddItem} className="flex gap-2 mt-1">
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder="Add to my bag (e.g. heating roll-on balm)..."
            className="flex-1 px-4 py-2.5 rounded-full bg-[#fff8f9] border border-[#ffd7ee] text-[13px] text-[#2d1226] placeholder-[#8b7078] focus:outline-none focus:ring-2 focus:ring-[#ff4fa3]/50"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-full bg-[#b7046c] text-white text-[12px] font-bold hover:bg-[#ff4fa3] active:scale-95 transition-all shadow-xs"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};
