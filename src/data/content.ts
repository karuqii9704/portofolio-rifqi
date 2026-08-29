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

/**
 * Every tile in the work marquee is Rifqi's own build. Each entry carries the
 * year and stack on the tile itself, a one-line summary on hover, and the full
 * write-up plus a link in the detail dialog.
 */
export type WorkItem = {
  id: string;
  name: string;
  year: string;
  context: string;
  stack: string[];
  summary: string;
  description: string;
  href?: string;
  linkLabel?: string;
  image?: { src: string; alt: string };
  tone?: number;
  /** Stated where the work has a boundary a reader should know about. */
  note?: string;
};

export const WORK: WorkItem[] = [
  {
    id: 'carecanvas',
    name: 'CareCanvas',
    year: '2026',
    context: 'Flagship · public demo',
    stack: ['Next.js 16', 'TypeScript', 'Claude', 'fal.ai Flux', 'Supabase', 'Inngest'],
    summary: 'Human-gated AI illustration pipeline with an auditable trace.',
    description:
      'An AI prototype that turns a visual brief into a child-appropriate illustration through bounded agents, an explicit human approval gate, durable execution, and a trace a reviewer can debug. Explicit state transitions, Inngest approval waits, Claude and Flux adapters, owner-scoped Supabase RLS, and raw-body Ed25519 webhook verification. 19 of 19 automated tests pass.',
    note: 'The public demo runs deterministic local adapters and makes zero external provider calls. Live Claude, fal.ai, Inngest, and Supabase paths stay environment-gated.',
    href: 'https://carecanvas.vercel.app',
    linkLabel: 'Run public demo',
    image: { src: '/assets/img/carecanvas-desktop.png', alt: 'CareCanvas desktop interface' },
    tone: 0,
  },
  {
    id: 'nalar',
    name: 'NALAR',
    year: '2026',
    context: 'Live prototype',
    stack: ['Next.js 16', 'React 19', 'Supabase', 'PostgreSQL', 'Gemini', 'Vitest'],
    summary: 'Role-based cooperative operations prototype that degrades safely.',
    description:
      'A cooperative operations prototype spanning sales, POS, customers, receipt verification, national mapping, and optional grounded AI assistance. Service-role Supabase calls stay behind server APIs, Gemini responses fall back deterministically when the provider is unavailable, and 24 of 24 tests cover forecasting, tamper detection, fail-closed APIs, rate limits, and safe degradation.',
    note: 'Runs on synthetic portfolio data. Not presented as a production cooperative or a claim of live users.',
    href: 'https://new-nalar.vercel.app',
    linkLabel: 'Open live app',
    image: { src: '/assets/img/nalar-desktop.png', alt: 'NALAR desktop interface' },
    tone: 1,
  },
  {
    id: 'plus-the-site',
    name: 'Plus.',
    year: '2025 — present',
    context: 'Co-founder · software agency',
    stack: ['Agency delivery', 'AI product', 'Web', 'Mobile', 'Cloud'],
    summary: 'The software agency I co-founded, selected for SIAP 2025 by Kemenekraf.',
    description:
      'A digital AI agency pairing practical AI implementation with human creative direction for Indonesian businesses: chatbots and customer support, CRM, mobile apps and games, cloud, and marketing, plus Plus. Studio for content and campaign assets. I co-founded it and lead end-to-end platform delivery across design, development, and marketing. Selected for the SIAP 2025 acceleration program by Kementerian Ekonomi Kreatif.',
    href: 'https://plusthe.site',
    linkLabel: 'Visit plusthe.site',
    tone: 2,
  },
  {
    id: 'synthetic-iot',
    name: 'Synthetic IoT Data',
    year: '2025',
    context: 'First-author research · IEEE Xplore',
    stack: ['Monte Carlo', 'Gaussian mixture models', 'Smart farming', 'IoT'],
    summary: 'First-author comparative study, indexed on IEEE Xplore.',
    description:
      'Comparative analysis of Gaussian mixture models and Monte Carlo simulation for synthetic data generation in durian-cultivation smart-farming IoT systems. Published as first author and indexed internationally on IEEE Xplore as document 11295988.',
    href: 'https://ieeexplore.ieee.org/document/11295988',
    linkLabel: 'Read the paper',
    tone: 3,
  },
  {
    id: 'protein-radar',
    name: 'Protein RADAR',
    year: '2026',
    context: 'Team build · project lead',
    stack: ['Next.js', 'Prisma', 'PostgreSQL', 'RBAC'],
    summary: 'Research dashboard over 20+ public data sources, with RBAC and audit logs.',
    description:
      'A Next.js and PostgreSQL dashboard integrating more than twenty public data sources, with authentication, role-based access control, and audit logging. I led the project; the build was delivered by a documented team.',
    href: 'https://protein-radar.vercel.app',
    linkLabel: 'Open live app',
    tone: 0,
  },
  {
    id: 'shariah-trading-assistant',
    name: 'Shariah Trading Assistant',
    year: '2026',
    context: 'Public repository',
    stack: ['Multi-agent orchestration', 'Evidence handling', 'QA gates'],
    summary: 'Role-scoped multi-agent research system with explicit QA gates.',
    description:
      'A role-scoped multi-agent research and analysis system with evidence handling and explicit QA gates between stages. 24 tests and a passing production build.',
    href: 'https://github.com/karuqii9704/shariah-trading-assistant',
    linkLabel: 'Inspect source',
    tone: 1,
  },
  {
    id: 'surveillance-dashboard',
    name: 'AI Surveillance Dashboard',
    year: 'Jul — Aug 2025',
    context: 'Backend engineering · computer vision',
    stack: ['Python', 'REST API', 'WebSocket', 'Data pipelines'],
    summary: 'Backend and pipelines behind 10+ computer vision models over WebSocket.',
    description:
      'Backend services, data pipelines, and RESTful APIs for real-time video analytics, intelligent alert management, and uptime monitoring, integrating more than ten computer vision models over WebSocket.',
    tone: 2,
  },
  {
    id: 'dashboard-msu',
    name: 'Dashboard MSU',
    year: 'Nov 2025 — Jan 2026',
    context: 'Full-stack delivery',
    stack: ['Next.js', 'PostgreSQL'],
    summary: 'Operational dashboard built end to end, database through interface.',
    description:
      'An operational dashboard delivered end to end on Next.js and PostgreSQL: schema design, server APIs, and reporting views built so the people running the operation can read and act on them without an engineer in the room.',
    tone: 3,
  },
  {
    id: 'sigwan-atk-pos',
    name: 'Sigwan ATK POS',
    year: 'Jan — Apr 2026',
    context: 'Point of sale · retail',
    stack: ['PHP', 'JavaScript', 'MySQL'],
    summary: 'Point-of-sale and stock system for a stationery business.',
    description:
      'A point-of-sale and inventory system for a stationery retailer, covering transactions, stock movement, and sales reporting, with an admin surface the shop staff operate day to day.',
    tone: 0,
  },
  {
    id: 'rewana',
    name: 'Rewana Flood Warning',
    year: '2023 — 2024',
    context: 'Production IoT · Desa Mukai Tengah, Kerinci',
    stack: ['C++', 'Embedded', 'IoT', 'PHP'],
    summary: 'Solar-powered flood early-warning platform serving around 300 households.',
    description:
      'An IoT water-clarity and flood monitoring platform built with Tim Rewana and deployed in Desa Mukai Tengah, Kerinci, serving roughly 300 households. Sensor integration, solar power, and a real-time web dashboard. National finalist in Innovillage two years running, Top 163 nationally.',
    tone: 1,
  },
  {
    id: 'qoffea',
    name: 'Qoffea',
    year: '2025',
    context: 'Ayo Beraksi 2025 · PT Telkom Indonesia',
    stack: ['Python', 'Flask', 'YOLO', 'Docker'],
    summary: 'Coffee-bean assessment workflow built on YOLO inference.',
    description:
      'A coffee-bean assessment workflow with Flask, YOLO inference, confidence filtering, non-maximum suppression, API tests, and container configuration, built for Ayo Beraksi 2025 at PT Telkom Indonesia.',
    note: 'The former deployment is retired. The link points to source evidence only.',
    href: 'https://github.com/karuqii9704/karuqii9704.github.io',
    linkLabel: 'Inspect source',
    tone: 2,
  },
  {
    id: 'great-planner',
    name: 'Tel-U Great Planner',
    year: '2025',
    context: 'Registered copyright · Kemenkumham RI',
    stack: ['Academic planning', 'GPA projection'],
    summary: 'Academic planning and GPA projection tool, registered as software copyright.',
    description:
      'An academic planning and GPA projection tool for Telkom University students, registered with Kemenkumham RI as “Tel-U Great Planner Academic”, registration number 000925616, in 2025.',
    tone: 3,
  },
];

export const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/karuqii9704' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rifqi-sigwan-nugraha/' },
  { label: 'Upwork', href: 'https://www.upwork.com/freelancers/~012703baf666234d72' },
];
