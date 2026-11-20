import type { ProjectItem } from '../types/portfolio';

/**
 * Portfolio projects registry wired to live deployed applications.
 * Replace `sourceUrl` placeholders with repository URLs if you wish to
 * expose source code publicly.
 */
export const PROJECTS: ProjectItem[] = [
  {
    id: 'motion',
    index: '01',
    name: 'Motion',
    subtitle: 'Automotive configurator',
    title: 'Motion, an automotive configurator',
    category: 'Automotive · Interactive Experience',
    year: '2026',
    role: 'Frontend Architecture & Interaction Design',
    description:
      'An interactive automotive experience for the GT-RX grand touring sports coupe, letting visitors explore vehicle engineering and configure trims, finishes, wheels, interior, and packages with live INR pricing.',
    technologies: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Framer Motion',
      'React Router',
      'Zod',
      'Vitest',
      'Playwright',
    ],
    highlights: [
      'Multi-step vehicle configuration across trim, exterior colour, wheels, interior, and optional packages.',
      'Live INR price calculations that respond immediately to every trim and package selection.',
      'Persistent configurations paired with shareable configuration URLs for revisiting builds.',
      'Validated enquiry forms backed by Zod schemas with accessible error states.',
      'Unit, component, and end-to-end test suites built with Vitest and Playwright.',
    ],
    previewKind: 'automotive-showcase',
    liveDisplayHost: 'lucent-syrniki-8b37b2.netlify.app',
    liveUrl: 'https://lucent-syrniki-8b37b2.netlify.app/',
    sourceUrl: 'CONFIGURE_MOTION_SOURCE_URL',
    screens: [
      {
        id: 'motion-hero',
        label: 'Flagship Experience',
        caption: 'Nocturnal editorial launch view introducing the GT-RX coupe and headline specs.',
        image: '/images/motion_live_hero.jpg',
        alt: 'MOTION GT-RX live web application hero showcasing the dark coupe with performance specifications and burnt-orange configure button',
      },
      {
        id: 'motion-configurator',
        label: 'Live Configurator',
        caption: 'Six-step interactive builder with real-time INR totals across trims, paint, wheels, and packages.',
        image: '/images/motion_live_configurator.jpg',
        alt: 'MOTION GT-RX interactive vehicle configurator showing Trim selection, Obsidian Black vehicle viewport, and live INR pricing',
      },
      {
        id: 'motion-technology',
        label: 'Technology View',
        caption: 'Dedicated driver-focused engineering showcase with high-contrast cockpit photography.',
        image: '/images/motion_live_vehicle.jpg',
        alt: 'MOTION GT-RX technology page featuring Quiet Intelligence editorial typography and cockpit instrument cluster',
      },
    ],
    architectureNote:
      'Structured around URL-synced configuration state and deterministic INR pricing rules, verified with Vitest unit checks and Playwright end-to-end journeys.',
  },
  {
    id: 'loopdesk',
    index: '02',
    name: 'LoopDesk',
    subtitle: 'E-commerce operations platform',
    title: 'LoopDesk, an e-commerce operations platform',
    category: 'SaaS · E-commerce Operations',
    year: '2026',
    role: 'Full-Stack Interface & Workflow Engineering',
    description:
      'An operations platform built to streamline returns, instant size exchanges, refunds, customer management, and operational analytics alongside a dedicated customer self-service portal.',
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
      'Recharts',
      'Google Gemini API',
    ],
    highlights: [
      'Operations dashboard organizing returns, exchanges, refund tracking, and order history.',
      'Customer self-service portal featuring a structured multi-step return and exchange flow.',
      'AI-powered complaint summarization and return reason classification via the Google Gemini API.',
      'Automated customer response drafting tailored to order context and return status.',
      'Typed data layer with reliable local persistence for smooth client-side operations.',
    ],
    previewKind: 'operations-showcase',
    liveDisplayHost: 'funny-cannoli-ed0052.netlify.app',
    liveUrl: 'https://funny-cannoli-ed0052.netlify.app/',
    sourceUrl: 'CONFIGURE_LOOPDESK_SOURCE_URL',
    screens: [
      {
        id: 'loopdesk-overview',
        label: 'Operations Overview',
        caption: 'Unified command dashboard tracking order volume, return pipeline distribution, and AI insights.',
        image: '/images/loopdesk_live_overview.jpg',
        alt: 'LOOPDESK operations dashboard showing order and return performance chart, pipeline overview, and AI insights',
      },
      {
        id: 'loopdesk-returns',
        label: 'Returns Queue',
        caption: 'Filterable returns and exchanges table with priority triage, CSV export, and one-click review.',
        image: '/images/loopdesk_live_returns.jpg',
        alt: 'LOOPDESK returns queue interface displaying filter tabs, search bar, return requests, and approve actions',
      },
      {
        id: 'loopdesk-portal',
        label: 'Customer Portal',
        caption: 'Self-service return and instant size exchange portal with demo order autofill and guided lookup.',
        image: '/images/loopdesk_live_portal.jpg',
        alt: 'LOOPDESK customer self-service returns portal with order lookup form and instant size exchange workflow',
      },
    ],
    architectureNote:
      'Designed from practical e-commerce operations experience to unify agent triage, customer self-service returns, and Gemini-assisted complaint summarization.',
  },
];
