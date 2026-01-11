
import React from 'react';
import { Category, Difficulty, Challenge, Team } from './types';
import { 
  ShieldAlert, 
  Globe, 
  Key, 
  Search, 
  Fingerprint, 
  Terminal 
} from 'lucide-react';

export const CATEGORY_ICONS: Record<Category, React.ReactNode> = {
  [Category.EXPLOITATION]: <ShieldAlert size={18} className="text-red-500" />,
  [Category.WEB_SECURITY]: <Globe size={18} className="text-blue-500" />,
  [Category.CRYPTOGRAPHY]: <Key size={18} className="text-purple-500" />,
  [Category.FORENSICS]: <Fingerprint size={18} className="text-yellow-500" />,
  [Category.OSINT]: <Search size={18} className="text-green-500" />,
  [Category.PWN]: <Terminal size={18} className="text-pink-500" />
};

export const MOCK_CHALLENGES: Challenge[] = [
  {
    id: '1',
    title: 'Orbital Gate',
    category: Category.WEB_SECURITY,
    description: 'Intercept the satellite communication protocol and bypass the interstellar firewall. The facility is currently running an outdated version of AetherOS kernel.',
    points: 100,
    difficulty: Difficulty.EASY,
    solved: true,
    flag: 'FLAG{ORBITAL_BYPASS_SUCCESS}',
    payloadUrl: '#',
    fileSize: '1.2 MB',
    sha256: '8f3d...2a1'
  },
  {
    id: '2',
    title: 'Quantum Lock',
    category: Category.CRYPTOGRAPHY,
    description: 'The transmission is encrypted with a rudimentary quantum key. Analyze the packet headers to extract the base vector.',
    points: 250,
    difficulty: Difficulty.MEDIUM,
    solved: false,
    flag: 'FLAG{QUANTUM_LEAP_2024}',
    payloadUrl: '#',
    fileSize: '0.8 MB',
    sha256: 'a1b2...c3d'
  },
  {
    id: '3',
    title: 'Core Meltdown',
    category: Category.EXPLOITATION,
    description: 'A buffer overflow vulnerability has been detected in the ship\'s life support system. Craft a payload to take control.',
    points: 500,
    difficulty: Difficulty.HARD,
    solved: false,
    flag: 'FLAG{SYSTEM_RESTORED}',
    payloadUrl: '#',
    fileSize: '4.5 MB',
    sha256: 'f5e4...d3c'
  },
  {
    id: '4',
    title: 'Digital Dust',
    category: Category.FORENSICS,
    description: 'Analyze the memory dump from the crashed probe. Look for hidden file fragments in the swap partition.',
    points: 150,
    difficulty: Difficulty.EASY,
    solved: false,
    flag: 'FLAG{PROBE_DATA_RECOVERED}',
    payloadUrl: '#',
    fileSize: '128 MB',
    sha256: 'e9a8...b7c'
  },
  {
    id: '5',
    title: 'Void Signal',
    category: Category.OSINT,
    description: 'Track down the physical location of the rogue broadcast station using signal triangulation and public records.',
    points: 50,
    difficulty: Difficulty.EASY,
    solved: false,
    flag: 'FLAG{SIGNAL_LOCATED}',
    payloadUrl: '#',
    fileSize: '0.1 MB',
    sha256: 'd7c6...a5b'
  }
];

export const MOCK_TEAMS: Team[] = [
  {
    id: 't1',
    name: 'Nebula Striders',
    warpCode: 'NB-782-ST',
    commander: 'VoidWalker_X',
    points: 8450,
    members: ['User1', 'User2'],
    anomaliesResolved: 42,
    history: [
      { time: 'T-24H', points: 1200 },
      { time: 'T-16H', points: 3400 },
      { time: 'T-08H', points: 6100 },
      { time: 'NOW', points: 8450 }
    ]
  },
  {
    id: 't2',
    name: 'Void Runners',
    warpCode: 'VR-101-RW',
    commander: 'Zephyr_9',
    points: 7820,
    members: ['User3', 'User4'],
    anomaliesResolved: 39,
    history: [
      { time: 'T-24H', points: 800 },
      { time: 'T-16H', points: 2800 },
      { time: 'T-08H', points: 5200 },
      { time: 'NOW', points: 7820 }
    ]
  },
  {
    id: 't3',
    name: 'Cyber Sentinels',
    warpCode: 'CS-444-SQ',
    commander: 'IronCloud',
    points: 7580,
    members: ['User5', 'User6'],
    anomaliesResolved: 37,
    history: [
      { time: 'T-24H', points: 1500 },
      { time: 'T-16H', points: 3100 },
      { time: 'T-08H', points: 4900 },
      { time: 'NOW', points: 7580 }
    ]
  }
];
