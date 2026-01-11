
export enum Category {
  EXPLOITATION = 'Exploitation',
  WEB_SECURITY = 'Web Security',
  CRYPTOGRAPHY = 'Cryptography',
  FORENSICS = 'Forensics',
  OSINT = 'OSINT',
  PWN = 'Pwn'
}

export enum Difficulty {
  EASY = 1,
  MEDIUM = 2,
  HARD = 3,
  INSANE = 4
}

export interface Challenge {
  id: string;
  title: string;
  category: Category;
  description: string;
  points: number;
  difficulty: Difficulty;
  solved: boolean;
  flag: string;
  payloadUrl?: string;
  fileSize?: string;
  sha256?: string;
}

export interface Team {
  id: string;
  name: string;
  warpCode: string;
  commander: string;
  points: number;
  members: string[];
  anomaliesResolved: number;
  history: { time: string; points: number }[];
}

export interface User {
  name: string;
  email: string;
  phone: string;
  college: string;
  rank: string;
  level: number;
  avatar: string;
}

export type AppState = 'LANDING' | 'AUTH' | 'TEAM_MANAGEMENT' | 'DASHBOARD' | 'SCOREBOARD' | 'ABOUT';
