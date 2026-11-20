import type { SkillGroup } from '../types/portfolio';

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'frontend',
    index: '01',
    title: 'Frontend',
    summary: 'Component architecture, type-safe interfaces, and responsive layout systems.',
    items: [
      'React',
      'JavaScript',
      'TypeScript',
      'HTML',
      'CSS',
      'Tailwind CSS',
      'Next.js',
    ],
  },
  {
    id: 'backend',
    index: '02',
    title: 'Backend',
    summary: 'Server-side routing, application logic, and practical REST endpoint foundations.',
    items: [
      'Node.js',
      'Express.js',
      'Basic API development',
    ],
  },
  {
    id: 'workflow',
    index: '03',
    title: 'Development workflow',
    summary: 'Modern version control and AI-assisted tooling focused on reliable delivery.',
    items: [
      'Claude',
      'Codex',
      'Antigravity',
      'Git',
      'Responsive design',
      'AI-assisted development',
    ],
  },
];
