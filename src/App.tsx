import { useState } from 'react';
import { TabType } from './types';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { DashboardScreen } from './screens/DashboardScreen';
import { ReliefScreen } from './screens/ReliefScreen';
import { TrackerScreen } from './screens/TrackerScreen';
import { CycleScreen } from './screens/CycleScreen';
import { InsightsScreen } from './screens/InsightsScreen';
import { SosModal } from './components/SosModal';
import { SmsModal } from './components/SmsModal';
import { ComfortChatModal } from './components/ComfortChatModal';
import { ProfileModal } from './components/ProfileModal';
import { ambientSound } from './utils/audioSynth';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('dashboard');

  // Modals state
  const [isSosOpen, setIsSosOpen] = useState(false);
  const [isSmsOpen, setIsSmsOpen] = useState(false);
  const [smsDefaultText, setSmsDefaultText] = useState<string | undefined>(undefined);
  const [isComfortChatOpen, setIsComfortChatOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Global Audio Synth State
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Relief Timer active state
  const [timerActive, setTimerActive] = useState(false);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2400);
  };

  const toggleAudio = () => {
    if (isPlayingAudio) {
      ambientSound.stop();
      setIsPlayingAudio(false);
      showToast('Sound paused ⏸️');
    } else {
      ambientSound.play('pink-noise', 0.25);
      setIsPlayingAudio(true);
      showToast('Playing calming pink noise 🎧');
    }
  };

  const handleOpenSmsModal = (text?: string) => {
    setSmsDefaultText(text);
    setIsSmsOpen(true);
  };

  const handleStartReliefTimer = () => {
    setTimerActive(true);
    showToast('20-min heat pack timer started 🔥');
  };

  return (
    <div className="min-h-screen bg-[#fff8f9] text-[#2d1226] font-['Plus_Jakarta_Sans'] flex flex-col selection:bg-[#ff4fa3] selection:text-white">
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        onOpenSos={() => setIsSosOpen(true)}
        onOpenSupportChat={() => setIsComfortChatOpen(true)}
        isPlayingAudio={isPlayingAudio}
        onToggleAudio={toggleAudio}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-20 pb-6">
        {currentTab === 'dashboard' && (
          <DashboardScreen
            onNavigateTab={setCurrentTab}
            onOpenSosModal={() => setIsSosOpen(true)}
            onOpenSmsModal={handleOpenSmsModal}
            onStartReliefTimer={handleStartReliefTimer}
            isPlayingAudio={isPlayingAudio}
            onToggleAudio={toggleAudio}
          />
        )}

        {currentTab === 'relief-kit' && (
          <ReliefScreen
            onOpenSosModal={() => setIsSosOpen(true)}
            onOpenSmsModal={handleOpenSmsModal}
            timerActive={timerActive}
            onToggleTimer={setTimerActive}
            isPlayingAudio={isPlayingAudio}
            onToggleAudio={toggleAudio}
          />
        )}

        {currentTab === 'symptom-tracker' && (
          <TrackerScreen
            onEntryLogged={() => showToast('Pain & symptoms logged to diary 🎀')}
          />
        )}

        {currentTab === 'cycle-calendar' && <CycleScreen />}

        {currentTab === 'doctor-insights' && <InsightsScreen />}
      </main>

      {/* Floating Audio Mini-Player (Visible on any screen when audio is playing) */}
      {isPlayingAudio && currentTab !== 'relief-kit' && (
        <div className="fixed bottom-22 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-sm rounded-full bg-[#2d1226]/90 backdrop-blur-md text-white px-4 py-2 flex items-center justify-between shadow-[0_8px_24px_rgba(45,18,38,0.3)] border border-white/10 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div
            onClick={() => setCurrentTab('relief-kit')}
            className="flex items-center gap-2.5 min-w-0 cursor-pointer flex-1"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff4fa3] animate-ping"></span>
            <div className="flex flex-col min-w-0">
              <span className="text-[12px] font-bold text-white truncate">
                Pink Noise & Rainfall Active
              </span>
              <span className="text-[10px] text-white/70">Tap to adjust sound 🎧</span>
            </div>
          </div>
          <button
            onClick={toggleAudio}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white shrink-0 active:scale-95 transition-all ml-2"
            title="Pause Audio"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">pause</span>
          </button>
        </div>
      )}

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed top-22 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-[#2d1226] text-white text-[12px] font-bold shadow-lg shadow-black/15 flex items-center gap-2 border border-white/10 animate-in fade-in slide-in-from-top-2 duration-200">
          <span className="material-symbols-outlined text-[14px] text-[#ff4fa3]">auto_awesome</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Fixed Bottom Tab Navigation */}
      <BottomNav currentTab={currentTab} onChangeTab={setCurrentTab} />

      {/* Global Interactive Modals */}
      <SosModal
        isOpen={isSosOpen}
        onClose={() => setIsSosOpen(false)}
        onSendSms={(text) => handleOpenSmsModal(text)}
      />

      <SmsModal
        isOpen={isSmsOpen}
        onClose={() => setIsSmsOpen(false)}
        initialText={smsDefaultText}
      />

      <ComfortChatModal
        isOpen={isComfortChatOpen}
        onClose={() => setIsComfortChatOpen(false)}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </div>
  );
}
