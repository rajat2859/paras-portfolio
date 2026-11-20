import type {
  ContactProfile,
  EducationEntry,
  ExperienceEntry,
  NavItem,
} from '../types/portfolio';

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'work', label: 'Work', href: '#work' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const CONTACT_PROFILE: ContactProfile = {
  name: 'Paras Verma',
  descriptor: 'Independent Developer',
  availability: 'Available for freelance projects',
  email: 'parasv612@gmail.com',
  phone: '7678427036',
  location: 'Gurgaon, Haryana, India',
  shortLocation: 'Gurgaon, India',
  coordinates: '28.4595° N, 77.0266° E',
};

export const ABOUT_FACTS: Array<{ label: string; value: string }> = [
  { label: 'Location', value: 'Gurgaon, Haryana, India' },
  { label: 'Education', value: 'B.Tech Information Technology' },
  { label: 'Role', value: 'Freelance Developer' },
  { label: 'Focus', value: 'Frontend & Full-Stack Development' },
];

export const EXPERIENCE_ENTRIES: ExperienceEntry[] = [
  {
    id: 'freelance-developer',
    index: '01',
    role: 'Freelance Developer',
    organization: 'Self-employed',
    period: 'November 2025 — Present',
    current: true,
    responsibilities: [
      'Support other developers on web projects using AI-assisted development workflows.',
      'Build responsive web applications using React, Next.js, Node.js, and Express.js.',
      'Collaborate on development tasks and implementation workflows.',
    ],
  },
  {
    id: 'praxis-services',
    index: '02',
    role: 'Operations Executive',
    organization: 'Praxis Services Ltd',
    period: 'July 2025 — Present',
    current: true,
    responsibilities: [
      'Manage end-to-end order processing.',
      'Coordinate vendors and track logistics.',
      'Improve fulfilment workflows.',
      'Resolve customer queries through CRM tools.',
      'Maintain reports and operational data.',
    ],
  },
  {
    id: 'ferns-n-petals',
    index: '03',
    role: 'Operations Executive',
    organization: 'FNP — Ferns N Petals',
    period: 'April 2024 — July 2025',
    current: false,
    responsibilities: [
      'Managed order processing and vendor coordination.',
      'Tracked logistics and fulfilment.',
      'Improved operational workflows.',
      'Handled customer queries and reporting.',
    ],
  },
];

export const EDUCATION_ENTRIES: EducationEntry[] = [
  {
    id: 'btech-it',
    degree: 'B.Tech — Information Technology',
    institution: 'Chitkara University',
    year: '2023',
    detail: 'CGPA 8.0',
  },
  {
    id: 'class-12',
    degree: 'Senior Secondary — Class 12',
    institution: 'Vivekanand Global School',
    year: '2019',
  },
];
