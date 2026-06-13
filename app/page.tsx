"use client";

import { useState } from "react";
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

const skills: Record<string, string[]> = {
  Languages: ["C", "C++", "Python", "JavaScript", "TypeScript", "Java", "SQL", "Ruby", "MATLAB", "Bash"],
  "Web & Backend": ["React", "Next.js", "Node.js", "Express", "FastAPI", "Tailwind CSS", "Vite", "REST APIs", "HTML5", "CSS3"],
  "Data & Cloud": ["PostgreSQL", "MySQL", "SQL Server", "pandas", "NumPy", "Git", "Docker", "Linux"],
  "Robotics & Simulation": ["ROS2", "Gazebo", "MuJoCo", "Isaac Sim", "IsaacLab", "Foxglove"],
  "ML & Control": ["Reinforcement Learning", "Inverse Kinematics", "Geometric Fabrics", "PCA", "Computer Vision", "OpenCV"],
  "Embedded & Hardware": ["STM32", "ESP32", "Arduino", "FPGA", "Verilog", "Altium", "KiCad", "CAN", "I2C", "SPI", "PWM", "UART"],
};

const education = [
  {
    school: "University of Waterloo",
    degree: "BASc, Electrical Engineering (Co-op) · GPA: 3.8/4.0",
    period: "Sept 2025 - Apr 2030",
    location: "Waterloo, ON",
    logo: "/uwaterloo.png",
  },
];

const experience = [
  {
    company: "WATonomous",
    role: "Robotics Engineer · Humanoid Team",
    period: "Jan 2026 - Present",
    location: "Waterloo, ON",
    logo: "/watonomous_logo.jpg",
    description:
      "WATonomous is a University of Waterloo design team building full-stack autonomous systems, including a custom-designed bipedal humanoid robot developed in collaboration with the UW Robotics Lab (UWRL). The Humanoid team designs the robot from scratch across mechanical, electrical, and software layers. Contributions include developing robotics software and control algorithms within the team's Dockerized ROS2 monorepo, implementing inverse kinematics solvers for the 6-DOF arm and 15-DOF hand using iterative Jacobian methods with damped least squares (DLS) in MuJoCo, and integrating PCA-based hand pose compression trained on real human motion data to reduce 15 finger joints to a 7-dimensional control space. Work spans simulation in Isaac Sim and MuJoCo and supports the team's broader goal of deploying autonomous locomotion and manipulation on physical hardware.",
  },
  {
    company: "Einfolab Inc.",
    role: "Data Engineer · Co-op",
    period: "Jan 2026 - Apr 2026",
    location: "Richmond Hill, ON",
    logo: "/einfolab.webp",
    description:
      "Einfolab is an IT solutions company delivering database and infrastructure services to healthcare and non-profit clients across Ontario. Work involved designing and maintaining SQL Server and MySQL databases for clinical, dental, and administrative record systems. Python and pandas pipelines were built to automate data cleaning, deduplication, and reconciliation across client datasets. Windows Server environments were configured and deployed for client onboarding, reducing manual setup time and improving cross-system reporting accuracy.",
  },
  {
    company: "University of Waterloo Formula Electric",
    role: "Electrical and Firmware Engineer",
    period: "Sept 2025 - Present",
    location: "Waterloo, ON",
    logo: "/waterlooformulaelectric_logo.jpg",
    description:
      "UWFE is a student design team that builds and competes with a formula-style electric vehicle at FSAE Michigan and Formula Hybrid+Electric. Responsibilities include developing C/C++ hardware-in-the-loop test utilities for the Battery Management Unit (BMU), Vehicle Control Unit (VCU), and Power Distribution Module (PDM), building CAN log parsing and analysis tooling to accelerate firmware debugging across subsystems, and implementing pre-HV startup sequencing logic to ensure system readiness before track integration.",
  },
  {
    company: "Robotics Team",
    role: "Hardware Systems Lead",
    period: "Oct 2023 - Jun 2025",
    location: "Markham, ON",
    logo: "/robotics.webp",
    description:
      "Led the hardware division of a competitive robotics team, designing and building an RC Mars rover from the ground up. Full ownership of the hardware stack: chassis mechanical design, ESP32-based motor control firmware in C++/Arduino, PWM drive and steering actuation mapping, and sensor integration including ultrasonic ranging, IMU, and an OpenCV camera pipeline for real-time obstacle detection and autonomous fail-safe logic.",
  },
];

// ── Project types ─────────────────────────────────────────────────────────────

type SoftwareProject = {
  kind: "software";
  name: string;
  image: string;
  stack: string[];
  shortDesc: string;
  modalKey: "buildboard" | "lingo" | "todo" | "pool";
  repo: string;
  demo: string | null;
};

type HardwareProject = {
  kind: "hardware";
  name: string;
  subtitle: string;
  image: string;
  stack: string[];
  shortDesc: string;
  modalKey: "pcb" | "wato";
  repo: string | null;
  demo: string | null;
};

type Project = SoftwareProject | HardwareProject;

const softwareProjects: SoftwareProject[] = [
  {
    kind: "software",
    name: "BuildBoard",
    image: "/buildboard.png",
    stack: ["React 19", "Vite", "Node.js", "Express", "PostgreSQL", "Passport.js", "Render", "Neon"],
    shortDesc:
      "Full-stack collaboration platform for student engineers. Users create project pages, post build logs, recruit teammates by skill tag, and message collaborators. Features role-based permissions, a ranked activity feed, and a guest demo account.",
    modalKey: "buildboard",
    repo: "https://github.com/rayymondf/Posting_Platform",
    demo: "https://posting-platform.onrender.com/",
  },
  {
    kind: "software",
    name: "Lingo: Chrome Translator",
    image: "/lingo-ext.png",
    stack: ["JavaScript", "Manifest V3", "Chrome Side Panel API", "Chrome Storage API", "DeepL API"],
    shortDesc:
      "Chrome extension (Manifest V3) that opens a persistent translation workspace inside Chrome's native Side Panel. Translates text via the DeepL Free API, persists draft text, language selection, and history using Chrome Storage. Published on the Chrome Web Store.",
    modalKey: "lingo",
    repo: "https://github.com/rayymondf/Lingo_Seamless_Language_Translator",
    demo: "https://chromewebstore.google.com/detail/lingo-language-translator/okfkakjgiocfbejhmlpfmlbgjgdkddbl",
  },
  {
    kind: "software",
    name: "Todo List App",
    image: "/todo-app.png",
    stack: ["HTML5", "CSS3", "Vanilla JavaScript", "localStorage"],
    shortDesc:
      "Zero-dependency browser task manager with a strict three-layer architecture (TodoModel, Storage, App). Features a monthly calendar view, live search, filter/sort, priority levels, tags, repeat intervals, and full ARIA accessibility.",
    modalKey: "todo",
    repo: "https://github.com/rayymondf/Todo-List-Project",
    demo: "https://rayymondf.github.io/Todo-List-Project/",
  },
  {
    kind: "software",
    name: "Java 8-Ball Pool Game",
    image: "/pool-game.png",
    stack: ["Java", "Java Swing", "2D Physics", "OOP"],
    shortDesc:
      "Two-player 8-ball billiards game in Java Swing with a fully custom physics engine: per-tick velocity integration, elastic ball collisions with overlap correction, friction, cushion bounce, and sub-step tunnelling prevention.",
    modalKey: "pool",
    repo: "https://github.com/rayymondf/Java-Project-Billards-Game",
    demo: null,
  },
];

const hardwareProjects: HardwareProject[] = [
  {
    kind: "hardware",
    name: "Low-Side Current Sensing PCB",
    subtitle: "UW Orbital",
    image: "/pcb1.png",
    stack: ["Altium Designer", "INA180B3IDBVR", "PCB Design", "Analog Electronics", "Altium 365", "UW Orbital"],
    shortDesc:
      "Current-sense breakout board for UW Orbital's EPS. Low-side topology with an INA180B3IDBVR (100 V/V gain) and a 10 mOhm shunt resistor outputs a voltage proportional to DC bus load current, readable by an MCU ADC.",
    modalKey: "pcb",
    repo: null,
    demo: null,
  },
  {
    kind: "hardware",
    name: "Autonomous Robot Navigation Stack",
    subtitle: "WATonomous ASD",
    image: "/wato-asd.png",
    stack: ["ROS2 Humble", "C++17", "Gazebo", "Foxglove", "A*", "Pure Pursuit", "Docker", "WATonomous"],
    shortDesc:
      "Full autonomous navigation stack for a simulated differential-drive robot in Gazebo. Four ROS2 C++ nodes: LiDAR Costmap, global Map Memory, A* Planner, and Pure Pursuit Controller. Visualized live in Foxglove Studio.",
    modalKey: "wato",
    repo: null,
    demo: "https://youtu.be/jMNTflrencM",
  },
];

const allProjects: Project[] = [...softwareProjects, ...hardwareProjects];

const contacts = [
  { label: "Personal Email", value: "rayymondf29@gmail.com", href: "mailto:rayymondf29@gmail.com", icon: <Mail size={16} /> },
  { label: "School Email", value: "r53fang@uwaterloo.ca", href: "mailto:r53fang@uwaterloo.ca", icon: <Mail size={16} /> },
  { label: "LinkedIn", value: "raymond-fang-214192331", href: "https://www.linkedin.com/in/raymond-fang-214192331", icon: LINKEDIN_SVG },
  { label: "GitHub", value: "rayymondf", href: "https://github.com/rayymondf", icon: GITHUB_SVG },
];

// ── Shared UI ─────────────────────────────────────────────────────────────────

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="py-14 px-6 bg-[#f5f5f0] dark:bg-[#0a0a0a]">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xs font-semibold tracking-widest text-black/40 dark:text-white/40 uppercase mb-6">{title}</h2>
        {children}
      </div>
    </section>
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

// ── Reusable modal sub-components ─────────────────────────────────────────────

function ModalTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-2 py-0.5 text-[10px] bg-black/5 dark:bg-white/8 border border-black/10 dark:border-white/12 rounded-full text-black/50 dark:text-white/50">
      {children}
    </span>
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
    <div className="flex gap-2 text-xs">
      <span className="text-black/40 dark:text-white/40 shrink-0 w-28">{label}</span>
      <span className="text-black/70 dark:text-white/65">{value}</span>
    </div>
  );
}

function ModalLinks({ repo, demo }: { repo: string | null; demo: string | null; demoLabel?: string }) {
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
  const p = softwareProjects[0];
  return (
    <ModalShell onClose={onClose}>
      <h2 className="text-black dark:text-white font-semibold text-lg mb-1">BuildBoard</h2>
      <p className="text-black/45 dark:text-white/45 text-xs mb-5">Full-Stack Web Application · React 19 · Node.js · PostgreSQL</p>
      <div className="rounded-xl overflow-hidden border border-black/10 dark:border-white/10 mb-6">
        <Image src={p.image} alt="BuildBoard" width={800} height={500} className="w-full h-auto object-cover" />
      </div>

      <div className="space-y-4">
        <p className="text-sm text-black/70 dark:text-white/65 leading-relaxed">
          BuildBoard is a full-stack collaboration platform built for student engineers, makers, and robotics teams to share technical projects, recruit teammates by skill, post build log updates, and message collaborators. The platform addresses the gap between generic social networks and purpose-built engineering collaboration tools.
        </p>

        <ModalSection title="Architecture">
          <div className="space-y-1.5">
            <ModalRow label="Frontend" value="React 19 SPA with Vite. SPA routing via Browser History API (no React Router). Responsive layout with sidebar nav on desktop and bottom tab bar on mobile." />
            <ModalRow label="Backend" value="Node.js + Express REST API. All routes under /api/*. Session-cookie auth via Passport.js LocalStrategy with bcrypt password hashing." />
            <ModalRow label="Database" value="PostgreSQL (Neon). connect-pg-simple for session storage. Parameterized queries throughout. UNIQUE constraints for duplicate-like prevention." />
            <ModalRow label="Hosting" value="Render (server + static). Neon serverless PostgreSQL. Tables created automatically on first startup." />
          </div>
        </ModalSection>

        <ModalSection title="Key Features">
          <ul className="space-y-1.5 text-xs text-black/65 dark:text-white/60">
            <li><span className="text-black dark:text-white font-medium">Project pages</span> - title, description, category, status, GitHub/demo links, skill tags</li>
            <li><span className="text-black dark:text-white font-medium">Build log updates</span> - milestone-tagged progress posts per project with comments and likes</li>
            <li><span className="text-black dark:text-white font-medium">Team recruitment</span> - open roles with skill areas, join requests, owner accept/reject workflow</li>
            <li><span className="text-black dark:text-white font-medium">Ranked activity feed</span> - score = likes &times; 2 + comments &times; 3 - age_in_hours &times; 0.05, computed as a SQL expression</li>
            <li><span className="text-black dark:text-white font-medium">Object-level authorization</span> - owner / admin / member permission model enforced at the route level</li>
            <li><span className="text-black dark:text-white font-medium">Direct messaging</span> - DM threads between users with full conversation and message APIs</li>
            <li><span className="text-black dark:text-white font-medium">Search</span> - ILIKE keyword search composable with category, status, and skill tag filters</li>
            <li><span className="text-black dark:text-white font-medium">Guest demo account</span> - read-only access with seeded demo data</li>
          </ul>
        </ModalSection>

        <ModalSection title="Security">
          <ul className="space-y-1 text-xs text-black/65 dark:text-white/60">
            <li>Route-level <code className="text-[10px] bg-black/8 dark:bg-white/10 px-1 rounded">requireAuth</code> middleware on all write endpoints</li>
            <li>Parameterized SQL queries throughout - no string interpolation</li>
            <li>Session cookie: <code className="text-[10px] bg-black/8 dark:bg-white/10 px-1 rounded">httpOnly</code>, <code className="text-[10px] bg-black/8 dark:bg-white/10 px-1 rounded">sameSite: lax</code>, <code className="text-[10px] bg-black/8 dark:bg-white/10 px-1 rounded">secure</code> in production</li>
            <li>CORS configured for frontend origin only</li>
          </ul>
        </ModalSection>

        <div className="flex flex-wrap gap-1.5">
          {p.stack.map((s) => <ModalTag key={s}>{s}</ModalTag>)}
        </div>
      </div>
      <ModalLinks repo={p.repo} demo={p.demo} />
    </ModalShell>
  );
}

function LingoModal({ onClose }: { onClose: () => void }) {
  const p = softwareProjects[1];
  return (
    <ModalShell onClose={onClose}>
      <h2 className="text-black dark:text-white font-semibold text-lg mb-1">Lingo: Chrome Translator</h2>
      <p className="text-black/45 dark:text-white/45 text-xs mb-5">Chrome Extension · Manifest V3 · DeepL API · Published on Chrome Web Store</p>
      <div className="rounded-xl overflow-hidden border border-black/10 dark:border-white/10 mb-6">
        <Image src={p.image} alt="Lingo" width={800} height={500} className="w-full h-auto object-cover" />
      </div>

      <div className="space-y-4">
        <p className="text-sm text-black/70 dark:text-white/65 leading-relaxed">
          Lingo is a Chrome extension built on Manifest V3 that surfaces a full translation workspace inside Chrome's native Side Panel. The extension requires no npm packages, no build step, and no framework - Chrome loads it directly as an unpacked set of files.
        </p>

        <ModalSection title="Extension Architecture">
          <div className="space-y-1.5">
            <ModalRow label="Entry point" value="manifest.json declares sidePanelServiceWorker.js as the background service worker and requests sidePanel and storage permissions." />
            <ModalRow label="Service worker" value="sidePanelServiceWorker.js registers the side panel on icon click via chrome.sidePanel.open(), keeping the panel persistent across navigation." />
            <ModalRow label="Panel UI" value="panel.html loads styles.css, languageSelector.js, and backendService.js. No framework - vanilla JS handles all rendering and event binding." />
            <ModalRow label="Language loading" value="GET /v2/languages fetches DeepL's supported target languages on panel open. Falls back to a built-in static list if the request fails." />
            <ModalRow label="Translation" value="POST /v2/translate sends user text and selected language to DeepL Free API. Result is read from data.translations[0].text." />
            <ModalRow label="Persistence" value="Chrome Storage API persists draft input text, last selected target language, and recent translation history across side panel sessions." />
          </div>
        </ModalSection>

        <ModalSection title="Permissions">
          <ul className="space-y-1 text-xs text-black/65 dark:text-white/60">
            <li><code className="text-[10px] bg-black/8 dark:bg-white/10 px-1 rounded">sidePanel</code> - opens the translator inside Chrome's native side panel UI</li>
            <li><code className="text-[10px] bg-black/8 dark:bg-white/10 px-1 rounded">storage</code> - persists draft text, language selection, and translation history locally</li>
            <li><code className="text-[10px] bg-black/8 dark:bg-white/10 px-1 rounded">https://api-free.deepl.com/*</code> - host permission for DeepL Free API calls</li>
          </ul>
        </ModalSection>

        <div className="flex flex-wrap gap-1.5">
          {p.stack.map((s) => <ModalTag key={s}>{s}</ModalTag>)}
        </div>
      </div>
      <ModalLinks repo={p.repo} demo={p.demo} />
    </ModalShell>
  );
}

function TodoModal({ onClose }: { onClose: () => void }) {
  const p = softwareProjects[2];
  return (
    <ModalShell onClose={onClose}>
      <h2 className="text-black dark:text-white font-semibold text-lg mb-1">Todo List App</h2>
      <p className="text-black/45 dark:text-white/45 text-xs mb-5">Vanilla JavaScript · Zero Dependencies · Strict MVC Architecture</p>
      <div className="rounded-xl overflow-hidden border border-black/10 dark:border-white/10 mb-6">
        <Image src={p.image} alt="Todo App" width={800} height={500} className="w-full h-auto object-cover" />
      </div>

      <div className="space-y-4">
        <p className="text-sm text-black/70 dark:text-white/65 leading-relaxed">
          A browser-based task manager built with zero dependencies - no framework, no npm, no build step. The project enforces a strict three-layer architecture that cleanly separates data logic from storage and rendering, making the codebase easy to test and extend despite the absence of a framework.
        </p>

        <ModalSection title="Code Architecture">
          <div className="space-y-1.5">
            <ModalRow label="TodoModel" value="Pure data layer with no DOM access. Handles createTodo, updateTodo, toggleTodo, deleteTodo, filterTodos, filterByTag, sortTodos, getTodosForDate, getAllTags, and isOverdue." />
            <ModalRow label="Storage" value="Serializes and deserializes the full state object to/from localStorage under the key todo-app-v2. Normalizes on load to handle schema changes." />
            <ModalRow label="App" value="Connects model to DOM via event delegation. Manages calendar rendering, list rendering, and three modal types (todo form, day view, delete confirm). Keyboard support via Escape-to-close." />
          </div>
        </ModalSection>

        <ModalSection title="Features">
          <ul className="space-y-1.5 text-xs text-black/65 dark:text-white/60">
            <li><span className="text-black dark:text-white font-medium">Calendar view</span> - 7-column monthly grid with todo chips plotted by due date. Clicking a day opens a day-detail modal.</li>
            <li><span className="text-black dark:text-white font-medium">List view</span> - filtered, sorted flat list with live search across title, description, and tags</li>
            <li><span className="text-black dark:text-white font-medium">Filter modes</span> - All / Active / Completed / Overdue, composable with tag filter</li>
            <li><span className="text-black dark:text-white font-medium">Sort modes</span> - Newest first / Due date / Priority / A to Z</li>
            <li><span className="text-black dark:text-white font-medium">Todo fields</span> - title, description, due date, priority (low/medium/high), comma-separated tags, repeat interval (none/daily/weekly/monthly)</li>
            <li><span className="text-black dark:text-white font-medium">Accessibility</span> - ARIA roles, labels, keyboard navigation, and programmatic focus management throughout</li>
          </ul>
        </ModalSection>

        <div className="flex flex-wrap gap-1.5">
          {p.stack.map((s) => <ModalTag key={s}>{s}</ModalTag>)}
        </div>
      </div>
      <ModalLinks repo={p.repo} demo={p.demo} />
    </ModalShell>
  );
}

function PoolModal({ onClose }: { onClose: () => void }) {
  const p = softwareProjects[3];
  return (
    <ModalShell onClose={onClose}>
      <h2 className="text-black dark:text-white font-semibold text-lg mb-1">Java 8-Ball Pool Game</h2>
      <p className="text-black/45 dark:text-white/45 text-xs mb-5">Java Swing · Custom 2D Physics Engine · OOP Design</p>
      <div className="rounded-xl overflow-hidden border border-black/10 dark:border-white/10 mb-6">
        <Image src={p.image} alt="Pool Game" width={800} height={500} className="w-full h-auto object-cover" />
      </div>

      <div className="space-y-4">
        <p className="text-sm text-black/70 dark:text-white/65 leading-relaxed">
          A two-player 8-ball billiards game implemented in Java Swing with a fully custom physics engine. The physics simulation runs on a Swing Timer game loop with no third-party physics library - all collision detection, resolution, and movement dynamics are computed from scratch each tick.
        </p>

        <ModalSection title="Physics Engine">
          <div className="space-y-1.5">
            <ModalRow label="Integration" value="Per-tick velocity integration. Each ball's position is updated by velocity * dt each frame. Friction decelerates balls multiplicatively until below a rest threshold." />
            <ModalRow label="Ball collisions" value="Elastic collision detection using circle-circle overlap. On contact, velocities are resolved along the collision normal using conservation of momentum. Overlap separation prevents tunnelling on the same tick." />
            <ModalRow label="Cushion bounce" value="AABB boundary checks for all four rails. Velocity component normal to the wall is reflected and scaled by an energy loss coefficient to simulate cushion damping." />
            <ModalRow label="Sub-step detection" value="Tunnelling prevention via sub-step CCD: at high speeds, the physics step is subdivided to ensure no ball passes through another or a rail within a single frame." />
            <ModalRow label="Pocket detection" value="Distance threshold check against each pocket center, evaluated before rail bounce so a ball entering a pocket doesn't incorrectly reflect off the rail first." />
          </div>
        </ModalSection>

        <ModalSection title="Rule Enforcement">
          <ul className="space-y-1 text-xs text-black/65 dark:text-white/60">
            <li>Open table at game start - solids/stripes assignment triggers on first legal pocket</li>
            <li>Scratch detection and ball-in-hand placement for the fouled player</li>
            <li>Win condition: all assigned balls pocketed, then 8-ball legally sunk</li>
            <li>Loss condition: 8-ball sunk early or on a scratch</li>
          </ul>
        </ModalSection>

        <div className="flex flex-wrap gap-1.5">
          {p.stack.map((s) => <ModalTag key={s}>{s}</ModalTag>)}
        </div>
      </div>
      <ModalLinks repo={p.repo} demo={p.demo} />
    </ModalShell>
  );
}

function PCBModal({ onClose }: { onClose: () => void }) {
  return (
    <ModalShell onClose={onClose}>
      <h2 className="text-black dark:text-white font-semibold text-lg mb-1">Low-Side Current Sensing PCB</h2>
      <p className="text-black/45 dark:text-white/45 text-xs mb-5">UW Orbital · Altium Designer · Analog Hardware Design</p>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="rounded-xl overflow-hidden border border-black/10 dark:border-white/10">
          <Image src="/pcb1.png" alt="PCB Layout" width={600} height={400} className="w-full h-auto object-cover" />
          <p className="text-center text-[10px] text-black/40 dark:text-white/40 py-1.5">PCB Layout</p>
        </div>
        <div className="rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-white dark:bg-white/5">
          <Image src="/pcb2.png" alt="Schematic" width={600} height={400} className="w-full h-auto object-cover" />
          <p className="text-center text-[10px] text-black/40 dark:text-white/40 py-1.5">Schematic</p>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-sm text-black/70 dark:text-white/65 leading-relaxed">
          A low-side current-sense breakout board designed for UW Orbital's Electrical Power System (EPS). The board measures DC bus current on a 5V rail over a 0-200 mA range and outputs a proportional analog voltage readable by a microcontroller ADC. The same sensing topology is used on Orbital's flight CubeSat hardware.
        </p>

        <ModalSection title="Design Overview">
          <div className="space-y-1.5">
            <ModalRow label="Topology" value="Low-side sensing. Shunt resistor placed between load return path and ground. Both amplifier inputs operate near ground potential, avoiding the high common-mode voltage of high-side configurations." />
            <ModalRow label="Why amplification" value="At 200 mA through a 10 mOhm shunt, the differential signal is only 2 mV - below the ~4 mV resolution of a typical 8-bit ADC. The INA180 amplifies this to 200 mV (100 V/V gain), well within a 3.3V ADC range." />
            <ModalRow label="Signal path" value="Load supply -> R1 (shunt) -> load return -> GND. INA180 IN+ and IN- connect across R1. V_OUT = Gain x I_LOAD x R_SENSE is routed to an MCU ADC pin." />
          </div>
        </ModalSection>

        <ModalSection title="Component Selection">
          <ul className="space-y-2 text-xs text-black/65 dark:text-white/60">
            <li>
              <span className="text-black dark:text-white font-medium">U1 - INA180B3IDBVR (Texas Instruments)</span>
              <br />Precision current-sense amplifier, SOT-23-5. Fixed gain: 100 V/V. Supply: 2.7-5.5V (operated at 3.3V). Common-mode range: -0.2V to +26V independent of VS. Gain error: +/-1% max. Bandwidth: 210 kHz. Temp range: -40C to +125C.
            </li>
            <li>
              <span className="text-black dark:text-white font-medium">R1 - WSL0603R0100FEA (Vishay)</span>
              <br />10 mOhm, 1W precision shunt resistor, 0603. Power dissipation at 200 mA: P = I^2 x R = 0.4 mW. Low resistance keeps insertion loss minimal while generating a signal the INA180 can amplify.
            </li>
            <li>
              <span className="text-black dark:text-white font-medium">C1 - C0603C104K8RACTU (KEMET)</span>
              <br />100 nF X7R bypass capacitor, 0603. Placed within 1 mm of the INA180 VS pin per the datasheet application circuit (Figure 9-3). Suppresses high-frequency supply noise that would corrupt the current reading.
            </li>
            <li>
              <span className="text-black dark:text-white font-medium">P1 - MTSW-104-07-T-S-170 (Mill-Max)</span>
              <br />4-pin 2.54 mm through-hole header. Exposes V_LOAD, 3V3, V_OUT, and GND for bench validation and MCU connection.
            </li>
          </ul>
        </ModalSection>

        <ModalSection title="Layout and Tools">
          <div className="space-y-1.5">
            <ModalRow label="Tool" value="Altium Designer via UW Orbital's shared Altium 365 workspace." />
            <ModalRow label="Bypass cap placement" value="C1 placed within 1 mm of VS pin to minimize supply trace inductance." />
            <ModalRow label="Ground plane" value="GND copper pour on both layers, stitched with vias to reduce ground impedance and provide a low-resistance return path." />
            <ModalRow label="Connector" value="P1 positioned at board edge for easy probing during bench validation." />
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
          A full autonomous navigation stack built from scratch for a simulated differential-drive robot in Gazebo, developed as part of WATonomous's Autonomous Software Division onboarding. The system enables point-to-point navigation with static obstacle avoidance using four tightly coupled ROS2 C++ nodes, mirroring the perception-world model-planning-control pipeline used in production autonomous systems.
        </p>

        <ModalSection title="Node Architecture">
          <ul className="space-y-3 text-xs text-black/65 dark:text-white/60">
            <li>
              <span className="text-black dark:text-white font-medium">Costmap Node</span>
              <br />Subscribes to <code className="text-[10px] bg-black/8 dark:bg-white/10 px-1 rounded">/lidar</code> (LaserScan). Converts polar scan data to Cartesian grid coordinates, marks occupied cells, then applies a distance-weighted inflation kernel to produce a cost gradient around obstacles. Publishes <code className="text-[10px] bg-black/8 dark:bg-white/10 px-1 rounded">nav_msgs::OccupancyGrid</code> to <code className="text-[10px] bg-black/8 dark:bg-white/10 px-1 rounded">/costmap</code>.
            </li>
            <li>
              <span className="text-black dark:text-white font-medium">Map Memory Node</span>
              <br />Fuses incoming local costmaps into a persistent global map using odometry from <code className="text-[10px] bg-black/8 dark:bg-white/10 px-1 rounded">/odom/filtered</code>. Transforms each costmap into the world frame via linear fusion. Updates only when the robot displaces beyond a distance threshold to avoid redundant writes.
            </li>
            <li>
              <span className="text-black dark:text-white font-medium">Planner Node (A*)</span>
              <br />Runs A* on the global occupancy grid with a Euclidean heuristic to compute a collision-free path to a <code className="text-[10px] bg-black/8 dark:bg-white/10 px-1 rounded">geometry_msgs::PointStamped</code> goal. Implements an idle/tracking state machine and replans automatically on map updates or timeout. Publishes <code className="text-[10px] bg-black/8 dark:bg-white/10 px-1 rounded">nav_msgs::Path</code>.
            </li>
            <li>
              <span className="text-black dark:text-white font-medium">Control Node (Pure Pursuit)</span>
              <br />Selects a lookahead waypoint on the planned path, computes the required arc curvature, and outputs <code className="text-[10px] bg-black/8 dark:bg-white/10 px-1 rounded">geometry_msgs::Twist</code> velocity commands to <code className="text-[10px] bg-black/8 dark:bg-white/10 px-1 rounded">/cmd_vel</code> at 10 Hz.
            </li>
          </ul>
        </ModalSection>

        <ModalSection title="Stack">
          <div className="space-y-1.5">
            <ModalRow label="Language" value="C++17 (rclcpp)" />
            <ModalRow label="Middleware" value="ROS2 Humble - DDS pub/sub, typed messages" />
            <ModalRow label="Simulation" value="Gazebo - differential-drive robot, laser scanner, camera" />
            <ModalRow label="Visualization" value="Foxglove Studio - WebSocket bridge, 3D + raw message panels" />
            <ModalRow label="Infrastructure" value="Docker Compose, WATonomous monorepo (watod CLI)" />
            <ModalRow label="Algorithms" value="A* (grid search, Euclidean heuristic), Pure Pursuit (geometric path tracking)" />
          </div>
        </ModalSection>
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
      {/* Fixed-ratio image */}
      <div className="relative w-full bg-black shrink-0" style={{ aspectRatio: "16/9" }}>
        <Image src={project.image} alt={project.name} fill className="object-cover" />
      </div>

      {/* Content - flex-1 so all cards stretch to same height in a row */}
      <div className="flex flex-col gap-2.5 p-4 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-black dark:text-white font-semibold text-sm leading-snug">{project.name}</h3>
            {project.kind === "hardware" && (
              <p className="text-black/45 dark:text-white/45 text-xs mt-0.5">{project.subtitle}</p>
            )}
          </div>
          {/* Top-level repo + demo links */}
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

        <p className="text-black/60 dark:text-white/60 text-xs leading-relaxed flex-1">{project.shortDesc}</p>

        {/* Stack tags - max 4 + overflow count */}
        <div className="flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((s) => (
            <span key={s} className="px-2 py-0.5 text-[10px] bg-black/5 dark:bg-white/8 border border-black/10 dark:border-white/12 rounded-full text-black/50 dark:text-white/50">
              {s}
            </span>
          ))}
          {project.stack.length > 4 && (
            <span className="px-2 py-0.5 text-[10px] bg-black/5 dark:bg-white/8 border border-black/10 dark:border-white/12 rounded-full text-black/40 dark:text-white/40">
              +{project.stack.length - 4}
            </span>
          )}
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
  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  const [openModal, setOpenModal] = useState<ModalKey>(null);

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section id="hero" className="relative min-h-screen px-6 pt-36 pb-14 bg-[#f5f5f0] dark:bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000006_1px,transparent_1px),linear-gradient(to_bottom,#00000006_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={0}
            className="text-sm text-black/40 dark:text-white/50 mb-3">Hi, I&apos;m</motion.p>

          <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1}
            className="text-5xl md:text-7xl font-bold text-black dark:text-white mb-5 leading-tight">
            Raymond Fang
          </motion.h1>

          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2}
            className="text-base md:text-lg text-black/70 dark:text-white/75 mb-3 max-w-2xl leading-relaxed">
            Electrical Engineering student at the University of Waterloo, working across embedded systems, robotics, hardware design, machine learning, and full-stack software. Focused on building practical systems that span from bare metal firmware to autonomous software pipelines.
          </motion.p>

          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={3}
            className="text-sm text-black/50 dark:text-white/50 mb-8 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
            Open to internships
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4}
            className="flex flex-wrap gap-3 mb-12">
            <button onClick={() => scrollTo("#contact")}
              className="px-5 py-2.5 bg-black dark:bg-white text-white dark:text-black text-sm font-medium rounded-full hover:opacity-85 transition-opacity">
              Get in touch
            </button>
            <button onClick={() => scrollTo("#projects")}
              className="px-5 py-2.5 border border-black/20 dark:border-white/25 text-black/70 dark:text-white/70 text-sm font-medium rounded-full hover:border-black/40 dark:hover:border-white/50 hover:text-black dark:hover:text-white transition-colors">
              View projects
            </button>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer"
              className="px-5 py-2.5 border border-black/20 dark:border-white/25 text-black/70 dark:text-white/70 text-sm font-medium rounded-full hover:border-black/40 dark:hover:border-white/50 hover:text-black dark:hover:text-white transition-colors">
              Resume
            </a>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={5} className="space-y-4">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category}>
                <p className="text-[10px] text-black/35 dark:text-white/35 uppercase tracking-widest mb-2">{category}</p>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((skill) => (
                    <span key={skill} className="px-2.5 py-1 text-xs bg-black/6 dark:bg-white/8 border border-black/10 dark:border-white/12 rounded-full text-black/65 dark:text-white/65">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Education */}
      <Section id="education" title="Education">
        {education.map((e, i) => (
          <motion.div key={e.school} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
            className="border border-black/10 dark:border-white/12 rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-white border border-black/8 dark:border-white/10 flex items-center justify-center">
                <Image src={e.logo} alt={e.school} width={80} height={80} className="object-contain w-full h-full" />
              </div>
              <div className="flex-1 flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <h3 className="text-black dark:text-white font-semibold">{e.school}</h3>
                  <p className="text-black/60 dark:text-white/60 text-sm mt-1">{e.degree}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-black/45 dark:text-white/45 text-xs">{e.period}</p>
                  <p className="text-black/45 dark:text-white/45 text-xs mt-1">{e.location}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </Section>

      {/* Experience */}
      <Section id="experience" title="Experience">
        <div className="space-y-4">
          {experience.map((e, i) => (
            <motion.div key={e.company} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
              className="border border-black/10 dark:border-white/12 rounded-xl p-6">
              <div className="flex items-center gap-5 mb-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-white border border-black/8 dark:border-white/10 flex items-center justify-center">
                  <Image src={e.logo} alt={e.company} width={80} height={80}
                    className={`object-contain w-full h-full${e.logo === "/robotics.webp" ? " scale-[1.25] object-cover" : ""}`} />
                </div>
                <div className="flex-1 flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <h3 className="text-black dark:text-white font-semibold">{e.role}</h3>
                    <p className="text-black/55 dark:text-white/55 text-sm mt-0.5">{e.company}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-black/45 dark:text-white/45 text-xs">{e.period}</p>
                    <p className="text-black/45 dark:text-white/45 text-xs mt-1">{e.location}</p>
                  </div>
                </div>
              </div>
              <p className="text-black/65 dark:text-white/65 text-sm leading-relaxed">{e.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Projects - uniform 2-per-row grid, equal card heights per row */}
      <Section id="projects" title="Projects">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
          {allProjects.map((p, i) => (
            <ProjectCard
              key={p.name}
              project={p}
              index={i}
              onLearnMore={() => setOpenModal(p.modalKey as ModalKey)}
            />
          ))}
        </div>
      </Section>

      <AnimatePresence>
        {openModal === "buildboard" && <BuildBoardModal onClose={() => setOpenModal(null)} />}
        {openModal === "lingo" && <LingoModal onClose={() => setOpenModal(null)} />}
        {openModal === "todo" && <TodoModal onClose={() => setOpenModal(null)} />}
        {openModal === "pool" && <PoolModal onClose={() => setOpenModal(null)} />}
        {openModal === "pcb" && <PCBModal onClose={() => setOpenModal(null)} />}
        {openModal === "wato" && <WATonomousModal onClose={() => setOpenModal(null)} />}
      </AnimatePresence>

      {/* Contact */}
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
                <p className="text-black/45 dark:text-white/45 text-xs mb-0.5">{label}</p>
                <p className="text-black/75 dark:text-white/80 text-sm truncate font-medium group-hover:text-black dark:group-hover:text-white transition-colors">{value}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </Section>

      <footer className="py-10 px-6 border-t border-black/8 dark:border-white/8 bg-[#f5f5f0] dark:bg-[#0a0a0a]">
        <div className="max-w-3xl mx-auto text-center text-black/35 dark:text-white/35 text-xs">
          Raymond Fang · {CURRENT_YEAR}
        </div>
      </footer>
    </>
  );
}
