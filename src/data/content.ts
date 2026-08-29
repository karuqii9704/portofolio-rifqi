export const EMAIL = 'rifqisigwannugraha@gmail.com';

export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export const HERO = {
  heading: "Hi, i'm rifqi",
  tagline: 'a software engineer building ai-driven backends and platforms that actually ship',
  portrait: '/assets/img/rifqi-hero.webp',
  portraitAlt: 'Rifqi Sigwan Nugraha',
};

export const ABOUT_TEXT =
  'I build backends, full-stack platforms, and IoT systems — an Information Technology graduate from Telkom University working across Python, PostgreSQL, Next.js, and PHP. I like owning a problem end to end: scoping it, shipping the smallest thing that works, and staying with it when it gets hard. Let’s build something that holds up.';

export type Service = {
  number: string;
  name: string;
  description: string;
};

export const SERVICES: Service[] = [
  {
    number: '01',
    name: 'Backend Engineering',
    description:
      'REST APIs, PostgreSQL schema design, and service architecture built to be read, tested, and handed over — not just to survive a demo.',
  },
  {
    number: '02',
    name: 'Full-Stack Web',
    description:
      'Next.js and PHP applications from database to interface, with admin tooling and reporting that non-engineers can actually operate.',
  },
  {
    number: '03',
    name: 'AI-Assisted Delivery',
    description:
      'A multi-agent development pipeline orchestrated through Claude Code — analyst, backend, frontend, data, and QA agents — with a human review gate before anything ships.',
  },
  {
    number: '04',
    name: 'IoT & Embedded Systems',
    description:
      'Sensor integration, solar-powered field hardware, and real-time dashboards, deployed to real sites and maintained afterwards.',
  },
  {
    number: '05',
    name: 'Data Pipelines & Dashboards',
    description:
      'Ingestion, integration, and visualisation work that turns raw device and model output into numbers people can act on.',
  },
];

export type ProjectSlot =
  | { kind: 'image'; src: string; alt: string }
  | { kind: 'tile'; name: string; meta?: string; tech?: string; tone?: number };

export type Project = {
  number: string;
  category: string;
  name: string;
  href?: string;
  linkLabel?: string;
  col1: [ProjectSlot, ProjectSlot];
  col2: ProjectSlot;
};

export const PROJECTS: Project[] = [
  {
    number: '01',
    category: 'Open Source',
    name: 'CareCanvas',
    href: 'https://carecanvas.vercel.app',
    col1: [
      {
        kind: 'image',
        src: '/assets/img/carecanvas-mobile.png',
        alt: 'CareCanvas mobile interface',
      },
      {
        kind: 'tile',
        name: 'Deterministic public demo',
        meta: 'Verified',
        tech: 'Claude · fal.ai · Supabase · Inngest',
        tone: 0,
      },
    ],
    col2: {
      kind: 'image',
      src: '/assets/img/carecanvas-desktop.png',
      alt: 'CareCanvas desktop interface',
    },
  },
  {
    number: '02',
    category: 'Prototype',
    name: 'NALAR',
    href: 'https://new-nalar.vercel.app',
    col1: [
      {
        kind: 'tile',
        name: 'Runs on synthetic data',
        meta: 'Prototype',
        tech: 'Next.js · Supabase',
        tone: 1,
      },
      {
        kind: 'tile',
        name: 'Source on GitHub',
        meta: 'Public repository',
        tech: 'karuqii9704 / new-nalar',
        tone: 3,
      },
    ],
    col2: {
      kind: 'image',
      src: '/assets/img/nalar-desktop.png',
      alt: 'NALAR desktop interface',
    },
  },
  {
    number: '03',
    category: 'First-author research',
    name: 'Synthetic IoT Data',
    linkLabel: 'Read Paper',
    href: 'https://ieeexplore.ieee.org/document/11295988',
    col1: [
      {
        kind: 'tile',
        name: 'Gaussian mixture models',
        meta: 'Method',
        tech: 'vs. Monte Carlo simulation',
        tone: 2,
      },
      {
        kind: 'tile',
        name: 'IEEE Xplore',
        meta: 'Indexed record',
        tech: 'Document 11295988',
        tone: 0,
      },
    ],
    col2: {
      kind: 'tile',
      name: 'Synthetic data generation for durian-cultivation smart farming',
      meta: 'Comparative analysis',
      tech: 'Monte Carlo · GMM · Smart farming · IoT',
      tone: 3,
    },
  },
];

/** Row one of the marquee: Rifqi's own work. */
export type MarqueeItem =
  | { kind: 'image'; src: string; alt: string }
  | { kind: 'tile'; name: string; meta: string; tech: string; tone: number };

export const OWN_WORK: MarqueeItem[] = [
  { kind: 'image', src: '/assets/img/carecanvas-desktop.png', alt: 'CareCanvas' },
  { kind: 'image', src: '/assets/img/nalar-desktop.png', alt: 'NALAR' },
  {
    kind: 'tile',
    name: 'Dashboard MSU',
    meta: 'Nov 2025 — Jan 2026',
    tech: 'Next.js · PostgreSQL',
    tone: 0,
  },
  {
    kind: 'tile',
    name: 'Sigwan ATK POS',
    meta: 'Jan — Apr 2026',
    tech: 'PHP · JavaScript',
    tone: 1,
  },
  {
    kind: 'tile',
    name: 'Qoffea',
    meta: 'Ayo Beraksi 2025 · PT Telkom Indonesia',
    tech: 'Python · Data pipelines',
    tone: 2,
  },
  {
    kind: 'tile',
    name: 'AI Surveillance Dashboard',
    meta: 'Jul — Aug 2025',
    tech: '10+ CV models over WebSocket',
    tone: 3,
  },
  {
    kind: 'tile',
    name: 'Tel-U Great Planner',
    meta: 'Copyright No. 000925616',
    tech: 'Academic planning · GPA projection',
    tone: 0,
  },
  {
    kind: 'tile',
    name: 'Rewana',
    meta: 'Innovillage · Top 163 National Finalist',
    tech: 'C++ · IoT · PHP',
    tone: 1,
  },
  {
    kind: 'image',
    src: '/assets/img/carecanvas-mobile.png',
    alt: 'CareCanvas mobile',
  },
  {
    kind: 'tile',
    name: 'Shariah Trading Assistant',
    meta: 'Public repository',
    tech: '24 tests · production build',
    tone: 2,
  },
  {
    kind: 'tile',
    name: 'Protein RADAR',
    meta: 'Team build · project lead',
    tech: 'Live application',
    tone: 3,
  },
];

/**
 * Row two of the marquee is ambient motion reference, not Rifqi's work — the
 * section labels it as such so the two rows are never read as one portfolio.
 */
export const MOTION_REFERENCES = [
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
];

export const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/karuqii9704' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rifqi-sigwan-nugraha/' },
  { label: 'Upwork', href: 'https://www.upwork.com/freelancers/~012703baf666234d72' },
];
