"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ExternalLink, X } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/Navbar";

const CURRENT_YEAR = new Date().getFullYear();

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const GITHUB_SVG = (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LINKEDIN_SVG = (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

// ── Data ──────────────────────────────────────────────────────────────────────

const skills: { category: string; icon: string; items: string[] }[] = [
  {
    category: "Languages",
    icon: "{ }",
    items: ["C", "C++", "Python", "JavaScript", "TypeScript", "Java", "SQL", "Ruby", "MATLAB", "Bash"],
  },
  {
    category: "Web & Backend",
    icon: "⬡",
    items: ["React", "Next.js", "Node.js", "Express", "FastAPI", "Tailwind CSS", "Vite", "REST APIs", "Passport.js", "HTML5", "CSS3"],
  },
  {
    category: "Data & ML",
    icon: "◈",
    items: ["PostgreSQL", "MySQL", "SQL Server", "pandas", "NumPy", "PyTorch", "scikit-learn", "Git", "Docker", "Linux"],
  },
  {
    category: "Robotics & Simulation",
    icon: "⊕",
    items: ["ROS2", "Gazebo", "MuJoCo", "Isaac Sim", "IsaacLab", "Foxglove", "Computer Vision", "OpenCV"],
  },
  {
    category: "Embedded & Hardware",
    icon: "⌁",
    items: ["STM32", "ESP32", "Arduino", "FPGA", "Verilog", "Altium", "KiCad", "CAN", "I2C", "SPI", "PWM", "UART"],
  },
];

const education = [
  {
    school: "University of Waterloo",
    degree: "BASc, Electrical Engineering (Co-op) · GPA: 3.8/4.0",
    period: "Sept 2025 – Apr 2030",
    location: "Waterloo, ON",
    logo: "/uwaterloo.png",
    courses: [
      "Fundamentals of Programming (C++)",
      "Project Studios (MATLAB)",
      "Digital Circuits (FPGA & Verilog)",
    ],
  },
];

const experience = [
  {
    company: "WATonomous",
    role: "Robotics Software Engineer · Humanoid Team",
    period: "Oct 2025 – Present",
    location: "Waterloo, ON",
    logo: "/watonomous_logo.jpg",
    desc: "Worked on motion control software for a custom bipedal robot inside a Dockerized ROS2 monorepo, collaborating with the UW Robotics Lab. Implemented arm and hand control in MuJoCo using iterative Jacobian methods across 21 DOF, and trained a PCA model to compress 15 finger joint positions to 7 values for real-time hand control.",
  },
  {
    company: "Einfolab Inc.",
    role: "Data Engineer · Co-op",
    period: "Jan 2026 – Apr 2026",
    location: "Richmond Hill, ON",
    logo: "/einfolab.webp",
    desc: "Designed and maintained SQL Server and MySQL databases for healthcare and non-profit clients across Ontario. Built Python/pandas ETL pipelines to automate data cleaning, deduplication, and cross-system reconciliation. Also supported client onboarding by configuring and deploying Windows Server environments.",
  },
  {
    company: "University of Waterloo Formula Electric",
    role: "Electrical & Firmware Engineer",
    period: "Sept 2025 – Apr 2026",
    location: "Waterloo, ON",
    logo: "/waterlooformulaelectric_logo.jpg",
    desc: "Developed C/C++ hardware-in-the-loop test utilities for the BMU, VCU, and PDM. Built CAN log parsing tooling to accelerate firmware debugging, and implemented pre-HV startup sequencing logic to verify system readiness before track integration.",
  },
  {
    company: "Robotics Team",
    role: "Hardware Systems Lead",
    period: "Oct 2023 – Jun 2025",
    location: "Markham, ON",
    logo: "/robotics.webp",
    desc: "Led end-to-end design and build of a competitive RC Mars rover, from chassis through embedded firmware. Wrote ESP32 motor control firmware in C++/Arduino with PWM drive and steering mapping, and integrated ultrasonic, IMU, and OpenCV camera modules for obstacle detection and autonomous fail-safe logic.",
  },
];

// ── Project types ─────────────────────────────────────────────────────────────

type Project = {
  name: string;
  subtitle?: string;
  image: string;
  stack: string[];
  shortDesc: string;
  modalKey: "buildboard" | "lingo" | "todo" | "pool" | "pcb" | "wato";
  repo: string | null;
  demo: string | null;
};

const projects: Project[] = [
  {
    name: "BuildBoard",
    image: "/buildboard-hero.png",
    stack: ["React 19", "Node.js", "Express", "PostgreSQL", "Passport.js", "Vite"],
    shortDesc:
      "Full-stack engineering collaboration platform. Students can create project pages, post build-log updates, open team recruitment roles, and message collaborators. Includes role-based auth, a SQL-ranked activity feed, and a guest demo account.",
    modalKey: "buildboard",
    repo: "https://github.com/rayymondf/Posting_Platform",
    demo: "https://posting-platform.onrender.com/",
  },
  {
    name: "Lingo: Chrome Translation Extension",
    image: "/lingo-ext.png",
    stack: ["JavaScript", "Manifest V3", "Chrome Side Panel API", "DeepL API"],
    shortDesc:
      "Manifest V3 Chrome extension that opens a full translation workspace in Chrome's native Side Panel. Calls the DeepL Free API for translations, persists draft text and history via Chrome Storage, and is live on the Chrome Web Store.",
    modalKey: "lingo",
    repo: "https://github.com/rayymondf/Lingo_Seamless_Language_Translator",
    demo: "https://chromewebstore.google.com/detail/lingo-language-translator/okfkakjgiocfbejhmlpfmlbgjgdkddbl",
  },
  {
    name: "Todo: Calendar Task Manager",
    image: "/todo-app2.png",
    stack: ["HTML5", "CSS3", "Vanilla JavaScript", "localStorage"],
    shortDesc:
      "Zero-dependency task manager in vanilla JS. Strict three-layer architecture (TodoModel / Storage / App). Includes a monthly calendar view, live search, filter and sort modes, priority levels, tags, repeat intervals, and full keyboard accessibility.",
    modalKey: "todo",
    repo: "https://github.com/rayymondf/Todo-List-Project",
    demo: "https://rayymondf.github.io/Todo-List-Project/",
  },
  {
    name: "Java 8-Ball Pool Game",
    image: "/pool-game.png",
    stack: ["Java", "Java Swing", "2D Physics", "OOP"],
    shortDesc:
      "Two-player 8-ball billiards in Java Swing with a custom physics engine built from scratch: per-tick velocity integration, elastic circle-circle collisions, friction, rail bounce, sub-step CCD to prevent tunnelling, and full rule enforcement.",
    modalKey: "pool",
    repo: "https://github.com/rayymondf/Java-Project-Billards-Game",
    demo: null,
  },
  {
    name: "Low-Side Current Sensing PCB",
    subtitle: "UW Orbital",
    image: "/pcb1.png",
    stack: ["Altium Designer", "INA180B3IDBVR", "PCB Design", "Analog Electronics"],
    shortDesc:
      "Current-sense breakout board for UW Orbital's Electrical Power System. Low-side topology: INA180B3IDBVR (100 V/V gain) across a 10 mΩ shunt amplifies a 2 mV differential signal to 200 mV, giving an MCU ADC readable output over 0–200 mA.",
    modalKey: "pcb",
    repo: null,
    demo: null,
  },
  {
    name: "Autonomous Robot Navigation Stack",
    subtitle: "WATonomous ASD",
    image: "/wato-asd.png",
    stack: ["ROS2 Humble", "C++17", "Gazebo", "A*", "Pure Pursuit", "Docker"],
    shortDesc:
      "Full autonomous nav stack for a simulated differential-drive robot in Gazebo. Four ROS2 C++ nodes — LiDAR Costmap, Map Memory, A* Planner, Pure Pursuit Controller — implement the full perception–planning–control pipeline, visualized in Foxglove Studio.",
    modalKey: "wato",
    repo: null,
    demo: "https://youtu.be/jMNTflrencM",
  },
];

const contacts = [
  { label: "Personal Email", value: "rayymondf29@gmail.com", href: "mailto:rayymondf29@gmail.com", icon: <Mail size={16} /> },
  { label: "School Email", value: "r53fang@uwaterloo.ca", href: "mailto:r53fang@uwaterloo.ca", icon: <Mail size={16} /> },
  { label: "LinkedIn", value: "raymond-fang-214192331", href: "https://www.linkedin.com/in/raymond-fang-214192331", icon: LINKEDIN_SVG },
  { label: "GitHub", value: "rayymondf", href: "https://github.com/rayymondf", icon: GITHUB_SVG },
];

// ── Shared UI ─────────────────────────────────────────────────────────────────

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="py-16 px-8 bg-[#f5f5f0] dark:bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-xs font-semibold tracking-widest text-black/40 dark:text-white/40 uppercase mb-8">{title}</h2>
        {children}
      </div>
    </section>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-2 py-0.5 text-[10px] bg-black/5 dark:bg-white/[0.08] border border-black/10 dark:border-white/[0.12] rounded-full text-black/50 dark:text-white/50 whitespace-nowrap">
      {children}
    </span>
  );
}

function ModalShell({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="relative bg-[#f5f5f0] dark:bg-[#111] border border-black/10 dark:border-white/12 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors">
          <X size={18} />
        </button>
        {children}
      </motion.div>
    </motion.div>
  );
}

function ModalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-black/8 dark:border-white/10 rounded-xl p-4 bg-black/2 dark:bg-white/3">
      <p className="text-[11px] font-semibold text-black/45 dark:text-white/45 uppercase tracking-widest mb-3">{title}</p>
      {children}
    </div>
  );
}

function ModalRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3 text-xs">
      <span className="text-black/40 dark:text-white/40 shrink-0 w-32">{label}</span>
      <span className="text-black/70 dark:text-white/65">{value}</span>
    </div>
  );
}

function ModalLinks({ repo, demo }: { repo: string | null; demo: string | null }) {
  return (
    <div className="flex gap-3 mt-6">
      {repo && (
        <a href={repo} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white border border-black/15 dark:border-white/15 hover:border-black/35 dark:hover:border-white/35 rounded-full px-3 py-1.5 transition-colors">
          {GITHUB_SVG} Repository
        </a>
      )}
      {demo && (
        <a href={demo} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white border border-black/15 dark:border-white/15 hover:border-black/35 dark:hover:border-white/35 rounded-full px-3 py-1.5 transition-colors">
          <ExternalLink size={13} /> {demo.includes("youtu") ? "Demo Video" : "Live Demo"}
        </a>
      )}
    </div>
  );
}

// ── Project Modals ────────────────────────────────────────────────────────────

function BuildBoardModal({ onClose }: { onClose: () => void }) {
  return (
    <ModalShell onClose={onClose}>
      <h2 className="text-black dark:text-white font-semibold text-lg mb-1">BuildBoard</h2>
      <p className="text-black/45 dark:text-white/45 text-xs mb-5">Full-Stack Web App · React 19 · Node.js · PostgreSQL · Deployed on Render</p>
      <div className="rounded-xl overflow-hidden border border-black/10 dark:border-white/10 mb-6">
        <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
          <Image src="/buildboard-hero.png" alt="BuildBoard landing page" fill className="object-cover" />
        </div>
      </div>
      <div className="space-y-4">
        <p className="text-sm text-black/70 dark:text-white/65 leading-relaxed">
          BuildBoard is a full-stack collaboration platform for student engineers, makers, and robotics teams. It replaces generic social networks with a purpose-built tool for sharing technical projects, recruiting teammates by skill, posting build log updates, and messaging collaborators.
        </p>
        <ModalSection title="Architecture">
          <div className="space-y-2">
            <ModalRow label="Frontend" value="React 19 SPA with Vite. Routing via Browser History API (no React Router). Responsive sidebar nav on desktop, bottom tab bar on mobile." />
            <ModalRow label="Backend" value="Node.js + Express REST API under /api/*. Session-cookie auth via Passport.js LocalStrategy with bcrypt password hashing." />
            <ModalRow label="Database" value="PostgreSQL on Neon. connect-pg-simple for session storage. Parameterized queries throughout. UNIQUE constraints prevent duplicate likes." />
            <ModalRow label="Hosting" value="Render (server + static). Neon serverless PostgreSQL. Tables auto-created on first startup." />
          </div>
        </ModalSection>
        <ModalSection title="Key Features">
          <ul className="space-y-1.5 text-xs text-black/65 dark:text-white/60">
            <li><span className="text-black dark:text-white font-medium">Project pages</span>: title, description, category, status, GitHub/demo links, skill tags</li>
            <li><span className="text-black dark:text-white font-medium">Build logs</span>: milestone-tagged progress posts per project with comments and likes</li>
            <li><span className="text-black dark:text-white font-medium">Team recruitment</span>: open roles with skill areas, join requests, owner accept/reject workflow</li>
            <li><span className="text-black dark:text-white font-medium">Ranked feed</span>: score = likes × 2 + comments × 3 − age_in_hours × 0.05, computed as a SQL expression</li>
            <li><span className="text-black dark:text-white font-medium">Authorization</span>: owner / admin / member permission model enforced at the route level</li>
            <li><span className="text-black dark:text-white font-medium">Direct messaging</span>: DM threads between users with full conversation and message APIs</li>
            <li><span className="text-black dark:text-white font-medium">Search</span>: ILIKE keyword search composable with category, status, and tag filters</li>
            <li><span className="text-black dark:text-white font-medium">Guest demo</span>: read-only access with seeded demo data, no registration required</li>
          </ul>
        </ModalSection>
        <ModalSection title="Security">
          <ul className="space-y-1 text-xs text-black/65 dark:text-white/60">
            <li><code className="text-[10px] bg-black/8 dark:bg-white/10 px-1 rounded">requireAuth</code> middleware on all write endpoints</li>
            <li>Parameterized SQL queries throughout: no string interpolation</li>
            <li>Session cookie: <code className="text-[10px] bg-black/8 dark:bg-white/10 px-1 rounded">httpOnly</code>, <code className="text-[10px] bg-black/8 dark:bg-white/10 px-1 rounded">sameSite: lax</code>, <code className="text-[10px] bg-black/8 dark:bg-white/10 px-1 rounded">secure</code> in production</li>
            <li>CORS restricted to frontend origin only</li>
          </ul>
        </ModalSection>
        <div className="flex flex-wrap gap-1.5">
          {["React 19", "Vite", "Node.js", "Express", "PostgreSQL", "Passport.js", "Render", "Neon"].map((s) => <Tag key={s}>{s}</Tag>)}
        </div>
      </div>
      <ModalLinks repo="https://github.com/rayymondf/Posting_Platform" demo="https://posting-platform.onrender.com/" />
    </ModalShell>
  );
}

function LingoModal({ onClose }: { onClose: () => void }) {
  return (
    <ModalShell onClose={onClose}>
      <h2 className="text-black dark:text-white font-semibold text-lg mb-1">Lingo: Chrome Translation Extension</h2>
      <p className="text-black/45 dark:text-white/45 text-xs mb-5">Chrome Extension · Manifest V3 · DeepL API · Published on Chrome Web Store</p>
      <div className="rounded-xl overflow-hidden border border-black/10 dark:border-white/10 mb-6">
        <Image src="/lingo-ext.png" alt="Lingo extension" width={800} height={500} className="w-full h-auto object-cover" />
      </div>
      <div className="space-y-4">
        <p className="text-sm text-black/70 dark:text-white/65 leading-relaxed">
          Lingo is a Chrome extension built on Manifest V3 that surfaces a full translation workspace inside Chrome&apos;s native Side Panel. No npm packages, no build step, no framework: Chrome loads it directly as an unpacked set of files and it is live on the Chrome Web Store.
        </p>
        <ModalSection title="How It Works">
          <div className="space-y-2">
            <ModalRow label="Entry point" value="manifest.json registers sidePanelServiceWorker.js as the background service worker with sidePanel and storage permissions." />
            <ModalRow label="Service worker" value="Registers the side panel on icon click via chrome.sidePanel.open(), keeping it persistent across navigation." />
            <ModalRow label="Panel UI" value="panel.html loads styles.css, languageSelector.js, and backendService.js. Vanilla JS handles all rendering and event binding." />
            <ModalRow label="Language loading" value="GET /v2/languages fetches DeepL target languages on open. Falls back to a built-in static list on failure." />
            <ModalRow label="Translation" value="POST /v2/translate sends user text and selected language to DeepL Free API. Result read from data.translations[0].text." />
            <ModalRow label="Persistence" value="Chrome Storage API saves draft text, last selected language, and recent translation history across sessions." />
          </div>
        </ModalSection>
        <div className="flex flex-wrap gap-1.5">
          {["JavaScript", "Manifest V3", "Chrome Side Panel API", "Chrome Storage API", "DeepL API"].map((s) => <Tag key={s}>{s}</Tag>)}
        </div>
      </div>
      <ModalLinks repo="https://github.com/rayymondf/Lingo_Seamless_Language_Translator" demo="https://chromewebstore.google.com/detail/lingo-language-translator/okfkakjgiocfbejhmlpfmlbgjgdkddbl" />
    </ModalShell>
  );
}

function TodoModal({ onClose }: { onClose: () => void }) {
  return (
    <ModalShell onClose={onClose}>
      <h2 className="text-black dark:text-white font-semibold text-lg mb-1">Todo: Calendar Task Manager</h2>
      <p className="text-black/45 dark:text-white/45 text-xs mb-5">Vanilla JavaScript · Zero Dependencies · Three-Layer Architecture</p>
      <div className="rounded-xl overflow-hidden border border-black/10 dark:border-white/10 mb-6">
        <Image src="/todo-app2.png" alt="Todo calendar view" width={800} height={500} className="w-full h-auto object-cover" />
      </div>
      <div className="space-y-4">
        <p className="text-sm text-black/70 dark:text-white/65 leading-relaxed">
          A browser-based task manager with zero dependencies. No framework, no npm, no build step. The project enforces a strict three-layer architecture that cleanly separates data logic, storage, and rendering.
        </p>
        <ModalSection title="Code Architecture">
          <div className="space-y-2">
            <ModalRow label="TodoModel" value="Pure data layer with no DOM access. Handles all CRUD, filtering, sorting, tag queries, calendar date lookups, and overdue detection." />
            <ModalRow label="Storage" value="Serializes and deserializes full state to localStorage under todo-app-v2. Normalizes on load to handle schema changes." />
            <ModalRow label="App" value="Connects model to DOM via event delegation. Manages calendar rendering, list rendering, and three modal types. Escape key closes modals." />
          </div>
        </ModalSection>
        <ModalSection title="Features">
          <ul className="space-y-1.5 text-xs text-black/65 dark:text-white/60">
            <li><span className="text-black dark:text-white font-medium">Calendar view</span>: 7-column monthly grid with todo chips plotted by due date; click any day to open a detail modal</li>
            <li><span className="text-black dark:text-white font-medium">List view</span>: filtered, sorted flat list with live search across title, description, and tags</li>
            <li><span className="text-black dark:text-white font-medium">Filters</span>: All / Active / Completed / Overdue, composable with tag filter</li>
            <li><span className="text-black dark:text-white font-medium">Sort modes</span>: Newest / Due date / Priority / A to Z</li>
            <li><span className="text-black dark:text-white font-medium">Accessibility</span>: ARIA roles, labels, keyboard navigation, and programmatic focus management</li>
          </ul>
        </ModalSection>
        <div className="flex flex-wrap gap-1.5">
          {["HTML5", "CSS3", "Vanilla JavaScript", "localStorage"].map((s) => <Tag key={s}>{s}</Tag>)}
        </div>
      </div>
      <ModalLinks repo="https://github.com/rayymondf/Todo-List-Project" demo="https://rayymondf.github.io/Todo-List-Project/" />
    </ModalShell>
  );
}

function PoolModal({ onClose }: { onClose: () => void }) {
  return (
    <ModalShell onClose={onClose}>
      <h2 className="text-black dark:text-white font-semibold text-lg mb-1">Java 8-Ball Pool Game</h2>
      <p className="text-black/45 dark:text-white/45 text-xs mb-5">Java Swing · Custom 2D Physics Engine · OOP Design</p>
      <div className="rounded-xl overflow-hidden border border-black/10 dark:border-white/10 mb-6">
        <Image src="/pool-game.png" alt="Pool game" width={800} height={500} className="w-full h-auto object-cover" />
      </div>
      <div className="space-y-4">
        <p className="text-sm text-black/70 dark:text-white/65 leading-relaxed">
          A two-player 8-ball billiards game in Java Swing with a fully custom physics engine. All collision detection, resolution, and movement dynamics are computed from scratch each tick on a Swing Timer game loop: no third-party physics library.
        </p>
        <ModalSection title="Physics Engine">
          <div className="space-y-2">
            <ModalRow label="Integration" value="Per-tick velocity integration. Ball positions updated by velocity × dt each frame. Friction decelerates multiplicatively until below a rest threshold." />
            <ModalRow label="Ball collisions" value="Elastic circle-circle overlap detection. Velocities resolved along the collision normal using conservation of momentum." />
            <ModalRow label="Cushion bounce" value="AABB boundary checks on all four rails. Normal velocity component reflected and scaled by an energy loss coefficient." />
            <ModalRow label="Sub-step CCD" value="At high speeds the physics step is subdivided to prevent any ball from passing through another ball or a rail within a single frame." />
          </div>
        </ModalSection>
        <div className="flex flex-wrap gap-1.5">
          {["Java", "Java Swing", "2D Physics", "OOP"].map((s) => <Tag key={s}>{s}</Tag>)}
        </div>
      </div>
      <ModalLinks repo="https://github.com/rayymondf/Java-Project-Billards-Game" demo={null} />
    </ModalShell>
  );
}

function PCBModal({ onClose }: { onClose: () => void }) {
  return (
    <ModalShell onClose={onClose}>
      <h2 className="text-black dark:text-white font-semibold text-lg mb-1">Low-Side Current Sensing PCB</h2>
      <p className="text-black/45 dark:text-white/45 text-xs mb-5">UW Orbital · Altium Designer · Analog Hardware Design</p>
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="rounded-xl overflow-hidden border border-black/10 dark:border-white/10 flex flex-col">
          <div className="relative w-full bg-white dark:bg-white/5" style={{ aspectRatio: "4/3" }}>
            <Image src="/pcb1.png" alt="PCB Layout" fill className="object-contain p-2" />
          </div>
          <p className="text-center text-[10px] text-black/40 dark:text-white/40 py-1.5">PCB Layout</p>
        </div>
        <div className="rounded-xl overflow-hidden border border-black/10 dark:border-white/10 flex flex-col">
          <div className="relative w-full bg-white dark:bg-white/5" style={{ aspectRatio: "4/3" }}>
            <Image src="/pcb2.png" alt="Schematic" fill className="object-contain p-2" />
          </div>
          <p className="text-center text-[10px] text-black/40 dark:text-white/40 py-1.5">Schematic</p>
        </div>
      </div>
      <div className="space-y-4">
        <p className="text-sm text-black/70 dark:text-white/65 leading-relaxed">
          A low-side current-sense breakout board designed for UW Orbital&apos;s Electrical Power System (EPS). Measures DC bus current on a 5V rail over a 0–200 mA range and outputs a proportional analog voltage readable by an MCU ADC.
        </p>
        <ModalSection title="Design Overview">
          <div className="space-y-2">
            <ModalRow label="Topology" value="Low-side sensing. Shunt placed between load return and ground. Both amplifier inputs operate near ground, avoiding high common-mode voltage." />
            <ModalRow label="Amplifier" value="INA180B3IDBVR (100 V/V gain). At 200 mA through a 10 mΩ shunt, the 2 mV differential signal is amplified to 200 mV — well within a 3.3V ADC range." />
            <ModalRow label="Tool" value="Altium Designer via UW Orbital's shared Altium 365 workspace. GND copper pour on both layers, stitched with vias." />
          </div>
        </ModalSection>
      </div>
    </ModalShell>
  );
}

function WATonomousModal({ onClose }: { onClose: () => void }) {
  return (
    <ModalShell onClose={onClose}>
      <h2 className="text-black dark:text-white font-semibold text-lg mb-1">Autonomous Robot Navigation Stack</h2>
      <p className="text-black/45 dark:text-white/45 text-xs mb-5">WATonomous ASD · ROS2 Humble · C++17 · Gazebo · Foxglove</p>
      <div className="rounded-xl overflow-hidden border border-black/10 dark:border-white/10 mb-6">
        <Image src="/wato-asd.png" alt="Foxglove visualization" width={800} height={500} className="w-full h-auto object-cover" />
        <p className="text-center text-[10px] text-black/40 dark:text-white/40 py-1.5">Foxglove: live costmap, inflated obstacles, and A* path overlaid on the occupancy grid</p>
      </div>
      <div className="space-y-4">
        <p className="text-sm text-black/70 dark:text-white/65 leading-relaxed">
          A full autonomous navigation stack built from scratch for a simulated differential-drive robot in Gazebo. Four tightly coupled ROS2 C++ nodes mirror the perception–world model–planning–control architecture used in production autonomous systems.
        </p>
        <ModalSection title="Node Architecture">
          <ul className="space-y-3 text-xs text-black/65 dark:text-white/60">
            <li><span className="text-black dark:text-white font-medium">Costmap</span>: Converts LiDAR polar scan to Cartesian grid, marks occupied cells, applies distance-weighted inflation kernel. Publishes <code className="text-[10px] bg-black/8 dark:bg-white/10 px-1 rounded">OccupancyGrid</code>.</li>
            <li><span className="text-black dark:text-white font-medium">Map Memory</span>: Fuses local costmaps into a persistent global map using odometry. Updates only beyond a displacement threshold.</li>
            <li><span className="text-black dark:text-white font-medium">Planner (A*)</span>: Runs A* with Euclidean heuristic. Implements idle/tracking state machine and replans on map updates. Publishes <code className="text-[10px] bg-black/8 dark:bg-white/10 px-1 rounded">nav_msgs::Path</code>.</li>
            <li><span className="text-black dark:text-white font-medium">Control (Pure Pursuit)</span>: Selects a lookahead waypoint, computes arc curvature, outputs <code className="text-[10px] bg-black/8 dark:bg-white/10 px-1 rounded">geometry_msgs::Twist</code> at 10 Hz.</li>
          </ul>
        </ModalSection>
        <div className="flex flex-wrap gap-1.5">
          {["ROS2 Humble", "C++17", "Gazebo", "Foxglove Studio", "A*", "Pure Pursuit", "Docker"].map((s) => <Tag key={s}>{s}</Tag>)}
        </div>
      </div>
      <ModalLinks repo={null} demo="https://youtu.be/jMNTflrencM" />
    </ModalShell>
  );
}

// ── Project Card ──────────────────────────────────────────────────────────────

function ProjectCard({ project, index, onLearnMore }: { project: Project; index: number; onLearnMore: () => void }) {
  return (
    <motion.div
      variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={index}
      className="border border-black/10 dark:border-white/12 rounded-xl overflow-hidden flex flex-col hover:border-black/25 dark:hover:border-white/25 transition-colors h-full"
    >
      <div className="relative w-full bg-black shrink-0" style={{ aspectRatio: "16/9" }}>
        <Image src={project.image} alt={project.name} fill className="object-cover" />
      </div>
      <div className="flex flex-col gap-2.5 p-4 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-black dark:text-white font-semibold text-base leading-snug">{project.name}</h3>
            {project.subtitle && <p className="text-black/45 dark:text-white/45 text-sm mt-0.5">{project.subtitle}</p>}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {project.repo && (
              <a href={project.repo} target="_blank" rel="noopener noreferrer" aria-label="Repository"
                className="text-black/35 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors">
                {GITHUB_SVG}
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" aria-label="Live demo"
                className="text-black/35 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors">
                <ExternalLink size={15} />
              </a>
            )}
          </div>
        </div>
        <p className="text-black/60 dark:text-white/60 text-sm leading-relaxed flex-1">{project.shortDesc}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((s) => <Tag key={s}>{s}</Tag>)}
        </div>
        <button onClick={onLearnMore}
          className="self-start mt-1 text-xs text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white border border-black/15 dark:border-white/15 hover:border-black/35 dark:hover:border-white/35 rounded-full px-3 py-1 transition-colors">
          Learn More
        </button>
      </div>
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

type ModalKey = "buildboard" | "lingo" | "todo" | "pool" | "pcb" | "wato" | null;

export default function Home() {
  const scrollTo = useCallback((id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);
  const [openModal, setOpenModal] = useState<ModalKey>(null);
  const closeModal = useCallback(() => setOpenModal(null), []);

  return (
    <>
      <Navbar />

      {/* ── Name / Status Header ────────────────────────────────────────────── */}
      <section id="hero" className="pt-32 pb-12 px-8 bg-[#f5f5f0] dark:bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto">
          <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={0}
            className="text-6xl md:text-7xl font-bold text-black dark:text-white tracking-tight leading-tight">
            Raymond Fang
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={1}
            className="text-base text-black/55 dark:text-white/55 mt-2">
            Electrical Engineering · University of Waterloo
          </motion.p>
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={2}
            className="flex items-center gap-3 mt-5">
            <a href="https://drive.google.com/drive/folders/1Yxby7jcXt58jyNnhvGHdMyLEBAqSAyhF?usp=sharing"
              target="_blank" rel="noopener noreferrer"
              className="text-sm border border-black/20 dark:border-white/25 text-black/60 dark:text-white/60 hover:border-black/40 dark:hover:border-white/50 hover:text-black dark:hover:text-white rounded-full px-5 py-2 transition-colors">
              Resume
            </a>
            <button onClick={() => scrollTo("#contact")}
              className="text-sm bg-black dark:bg-white text-white dark:text-black rounded-full px-5 py-2 hover:opacity-85 transition-opacity">
              Contact
            </button>
          </motion.div>
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={3}
            className="flex items-center gap-1.5 text-sm text-black/45 dark:text-white/45 mt-4">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
            Open to internships
          </motion.p>
        </div>
      </section>

      {/* ── Technical Skills ────────────────────────────────────────────────── */}
      <Section id="skills" title="Technical Skills">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {skills.map((group, i) => (
            <motion.div key={group.category}
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
              className="border border-black/10 dark:border-white/12 rounded-xl p-4 bg-black/[0.02] dark:bg-white/[0.02]"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-mono text-black/30 dark:text-white/30 w-5 text-center select-none">{group.icon}</span>
                <p className="text-[11px] font-semibold text-black/55 dark:text-white/55 uppercase tracking-widest">{group.category}</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((skill) => (
                  <span key={skill}
                    className="px-2.5 py-1 text-sm bg-black/5 dark:bg-white/8 border border-black/8 dark:border-white/10 rounded-md text-black/65 dark:text-white/65">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ── Education ───────────────────────────────────────────────────────── */}
      <Section id="education" title="Education">
        {education.map((e, i) => (
          <motion.div key={e.school} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
            className="border border-black/10 dark:border-white/12 rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-white border border-black/8 dark:border-white/10 flex items-center justify-center">
                <Image src={e.logo} alt={e.school} width={56} height={56} className="object-contain w-full h-full" />
              </div>
              <div className="flex-1 flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <h3 className="text-black dark:text-white font-semibold">{e.school}</h3>
                  <p className="text-black/60 dark:text-white/60 text-sm mt-0.5">{e.degree}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-black/45 dark:text-white/45 text-sm">{e.period}</p>
                  <p className="text-black/45 dark:text-white/45 text-sm mt-1">{e.location}</p>
                </div>
              </div>
            </div>
            {e.courses && e.courses.length > 0 && (
              <div className="mt-4 pt-4 border-t border-black/8 dark:border-white/8">
                <p className="text-[10px] font-semibold text-black/40 dark:text-white/40 uppercase tracking-widest mb-2">Relevant Courses</p>
                <div className="flex flex-wrap gap-1.5">
                  {e.courses.map((course) => (
                    <span key={course} className="px-2.5 py-1 text-xs bg-black/6 dark:bg-white/8 border border-black/10 dark:border-white/12 rounded-full text-black/65 dark:text-white/65">
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </Section>

      {/* ── Experience (Timeline) ───────────────────────────────────────────── */}
      <Section id="experience" title="Experience">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[27px] top-3 bottom-3 w-px bg-black/10 dark:bg-white/10" aria-hidden />

          <div className="space-y-0">
            {experience.map((e, i) => (
              <motion.div key={e.company}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                className="relative flex gap-6 pb-8 last:pb-0"
              >
                {/* Timeline dot + logo */}
                <div className="relative shrink-0 flex flex-col items-center" style={{ width: 56 }}>
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-white border border-black/8 dark:border-white/10 flex items-center justify-center z-10">
                    <Image src={e.logo} alt={e.company} width={56} height={56}
                      className={`object-contain w-full h-full${e.logo === "/robotics.webp" ? " scale-[1.25] object-cover" : ""}`} />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 border border-black/10 dark:border-white/12 rounded-xl p-5 bg-black/[0.01] dark:bg-white/[0.01]">
                  <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
                    <div>
                      <h3 className="text-black dark:text-white font-semibold text-base">{e.role}</h3>
                      <p className="text-black/55 dark:text-white/55 text-sm mt-0.5">{e.company}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-black/45 dark:text-white/45 text-sm">{e.period}</p>
                      <p className="text-black/45 dark:text-white/45 text-sm mt-0.5">{e.location}</p>
                    </div>
                  </div>
                  <p className="text-sm text-black/65 dark:text-white/60 leading-relaxed">{e.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Projects (3-col grid) ───────────────────────────────────────────── */}
      <Section id="projects" title="Projects">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.name}
              project={p}
              index={i}
              onLearnMore={() => setOpenModal(p.modalKey)}
            />
          ))}
        </div>
      </Section>

      <AnimatePresence>
        {openModal === "buildboard" && <BuildBoardModal onClose={closeModal} />}
        {openModal === "lingo" && <LingoModal onClose={closeModal} />}
        {openModal === "todo" && <TodoModal onClose={closeModal} />}
        {openModal === "pool" && <PoolModal onClose={closeModal} />}
        {openModal === "pcb" && <PCBModal onClose={closeModal} />}
        {openModal === "wato" && <WATonomousModal onClose={closeModal} />}
      </AnimatePresence>

      {/* ── Contact ─────────────────────────────────────────────────────────── */}
      <Section id="contact" title="Contact">
        <div className="grid gap-3 sm:grid-cols-2">
          {contacts.map(({ label, value, href, icon }, i) => (
            <motion.a key={label} href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
              whileHover={{ x: 4 }}
              className="flex items-center gap-4 border border-black/10 dark:border-white/12 rounded-xl p-4 hover:border-black/30 dark:hover:border-white/30 hover:bg-black/3 dark:hover:bg-white/5 transition-all group">
              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-black/6 dark:bg-white/10 text-black/50 dark:text-white/60 group-hover:text-black dark:group-hover:text-white group-hover:bg-black/10 dark:group-hover:bg-white/15 transition-colors shrink-0">
                {icon}
              </div>
              <div className="min-w-0">
                <p className="text-black/45 dark:text-white/45 text-sm mb-0.5">{label}</p>
                <p className="text-black/75 dark:text-white/80 text-base truncate font-medium group-hover:text-black dark:group-hover:text-white transition-colors">{value}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </Section>

      <footer className="py-10 px-6 border-t border-black/8 dark:border-white/8 bg-[#f5f5f0] dark:bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto text-center text-black/35 dark:text-white/35 text-sm">
          Raymond Fang · {CURRENT_YEAR}
        </div>
      </footer>
    </>
  );
}
