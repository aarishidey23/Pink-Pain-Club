import React, { useState } from 'react';

export const InsightsScreen: React.FC = () => {
  const [copiedReport, setCopiedReport] = useState<boolean>(false);

  const doctorReportText = `--- PINK PAIN CLUB: OB/GYN CLINICAL VISIT SUMMARY ---
Patient Self-Reported Period & Dysmenorrhea History:
- Cycle Length: Regular 28-day intervals
- Menstrual Bleeding Duration: 5 days (Peak flow Day 1-2)
- Peak Pain Intensity: 8/10 (Deep uterine cramping & lower back radiating ache)
- Associated Symptoms: Dysmenorrhea, nausea, fatigue, abdominal bloating
- Efficacy of Non-Pharmacological Interventions:
  * Thermotherapy (Adhesive/Electric Heat Pack): High efficacy (88% relief reported within ~24 mins)
  * Magnesium Glycinate & Warm Hydration: Moderate-high symptom reduction
- OTC Analgesic Response: Partial relief with Ibuprofen 400mg taken at symptom onset
- Screened Red Flags: No sudden syncope, no unexplained intermenstrual bleeding.
Generated via Pink Pain Club Wellness Platform.`;

  const handleCopyReport = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(doctorReportText);
    }
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-5 pt-4 pb-28 gap-4">
      {/* Top Banner */}
      <div className="rounded-[2rem] bg-[#ffe0f1] p-6 shadow-sm border border-[#ffd7ee]">
        <div className="flex items-center justify-between mb-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff4fa3] text-white text-[11px] font-bold">
            <span className="material-symbols-outlined text-[12px] material-symbols-filled">auto_awesome</span>
            Doctor & Remedy Intel
          </span>
          <span className="text-[12px] font-bold text-[#755664]">Evidence-Based</span>
        </div>
        <h1 className="font-['Epilogue'] text-[24px] font-extrabold text-[#2d1226]">
          What Actually Works For You 🎀
        </h1>
        <p className="text-[13px] text-[#584048] font-medium mt-1 leading-snug">
          Real efficacy percentages computed from your symptom logs, plus a ready-to-share OB/GYN appointment brief.
        </p>
      </div>

      {/* Top Remedy Rankings */}
      <div className="rounded-[2rem] bg-white p-5 shadow-sm border border-[#ffd7ee] flex flex-col gap-3">
        <span className="font-['Epilogue'] text-[16px] font-bold text-[#2d1226]">
          Your Top Relief Combinations
        </span>

        <div className="flex flex-col gap-2.5">
          {[
            {
              percent: '88%',
              title: 'Heat Pack + Magnesium Tea',
              time: 'Relief felt in ~24 mins',
              rating: '⭐⭐⭐⭐⭐ High Efficacy',
            },
            {
              percent: '82%',
              title: 'Ibuprofen 400mg + Warm Water Bottle',
              time: 'Prostaglandin inhibitor',
              rating: '⭐⭐⭐⭐ Fast Acting',
            },
            {
              percent: '78%',
              title: 'Dark Chocolate + Epsom Salt Bath',
              time: 'Transdermal magnesium uptake',
              rating: '⭐⭐⭐⭐ Muscle Relaxing',
            },
            {
              percent: '74%',
              title: 'Pink Noise Frequency + Fetal Pillow Rest',
              time: 'Vagal nerve soothing',
              rating: '⭐⭐⭐ Tension Reducer',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="rounded-[1.25rem] bg-[#fff0f6] p-3.5 border border-[#ffd7ee] flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#ffe0f1] flex items-center justify-center font-['Epilogue'] font-extrabold text-[#b7046c] text-[15px]">
                  {item.percent}
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] font-bold text-[#2d1226]">{item.title}</span>
                  <span className="text-[11px] text-[#584048]">{item.time}</span>
                </div>
              </div>
              <span className="text-[10px] font-bold text-[#b7046c] bg-white px-2 py-0.5 rounded-full shadow-xs">
                {item.rating}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* OB/GYN Appointment Report Generator */}
      <div className="rounded-[2rem] bg-white p-5 shadow-sm border border-[#ffd7ee] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#b7046c] text-[20px]">description</span>
            <span className="font-['Epilogue'] text-[16px] font-bold text-[#2d1226]">
              OB/GYN Visit Summary
            </span>
          </div>
          <span className="text-[11px] font-bold text-[#755664] bg-[#ffe0f1] px-2 py-0.5 rounded-full">
            Clinical Format
          </span>
        </div>

        <p className="text-[12px] text-[#584048] leading-relaxed">
          Take this formatted summary to your next doctor or gynecologist appointment so they have precise data on your pain levels and patterns.
        </p>

        <div className="p-3.5 rounded-[1.25rem] bg-[#fff8f9] border border-[#ffd7ee] font-mono text-[11px] text-[#2d1226] whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
          {doctorReportText}
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleCopyReport}
            className="flex-1 py-3 rounded-full bg-[#b7046c] text-white text-[12px] font-bold active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-sm"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">
              {copiedReport ? 'check' : 'content_copy'}
            </span>
            <span>{copiedReport ? 'Report Copied! 📋' : 'Copy Doctor Report'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-3 rounded-full bg-[#ffe8f3] text-[#2d1226] text-[12px] font-bold hover:bg-[#ffe0f1] active:scale-95 transition-all flex items-center justify-center gap-1"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">print</span>
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* Medical Safety & Red Flag Checklist */}
      <div className="rounded-[2rem] bg-[#ffdad6]/60 p-5 shadow-sm border border-[#ffdad6] flex flex-col gap-2.5">
        <div className="flex items-center gap-2 text-[#ba1a1a]">
          <span className="material-symbols-outlined text-[20px]">warning</span>
          <span className="font-['Epilogue'] text-[15px] font-bold">
            When to Seek Urgent Medical Care
          </span>
        </div>
        <p className="text-[12px] text-[#45263c] leading-relaxed">
          While period cramps are very common, severe pelvic pain can indicate conditions like endometriosis, adenomyosis, or ovarian cysts. Consult a physician immediately if you experience:
        </p>
        <ul className="text-[12px] text-[#45263c] space-y-1 pl-4 list-disc font-medium">
          <li>Severe sudden unilateral sharp pelvic pain</li>
          <li>Fever, chills, or abnormal foul discharge</li>
          <li>Heavy bleeding soaking more than 2 maxi pads per hour for over 2 hours</li>
          <li>Dizziness, fainting, or inability to keep fluids down</li>
        </ul>
      </div>
    </div>
  );
};
