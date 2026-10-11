export type TabType = 'dashboard' | 'relief-kit' | 'symptom-tracker' | 'cycle-calendar' | 'doctor-insights';

export interface SymptomLogEntry {
  id: string;
  timestamp: string;
  painLevel: number; // 1-10
  symptoms: string[];
  flow: 'None' | 'Spotting' | 'Light' | 'Medium' | 'Heavy';
  mood: string;
  remediesUsed: string[];
  notes?: string;
}

export interface VanityChecklistItem {
  id: string;
  name: string;
  checked: boolean;
  category: 'heat' | 'snacks' | 'hygiene' | 'cozy';
}

export interface SmsTemplate {
  id: string;
  title: string;
  text: string;
  urgency: 'gentle' | 'urgent' | 'sweet';
}

export interface ReliefGuide {
  id: string;
  title: string;
  subtitle: string;
  durationMinutes: number;
  steps: string[];
  tags: string[];
}
