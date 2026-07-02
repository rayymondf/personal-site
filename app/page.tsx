"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, ExternalLink, X, Home as HomeIcon, Briefcase, Code2, FolderOpen, Send,
  ChevronRight, Sun, Moon,
} from "lucide-react";
import Image from "next/image";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";
import { useTheme } from "@/components/ThemeProvider";

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const CURRENT_YEAR = new Date().getFullYear();

const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  show: (i = 0) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

// ── Data ──────────────────────────────────────────────────────────────────────

const skills = [
  { category: "Languages", icon: "{ }", items: ["C", "C++", "Python", "TypeScript", "JavaScript", "Java", "SQL", "MATLAB", "Verilog", "Bash"] },
  { category: "Web & Backend", icon: "⬡", items: ["React", "Next.js", "Node.js", "Express", "FastAPI", "WebSocket", "GraphQL", "REST APIs", "Tailwind CSS", "Vite"] },
  { category: "Data & ML", icon: "◈", items: ["PyTorch", "scikit-learn", "Hugging Face", "pandas", "NumPy", "PostgreSQL", "MySQL", "SQL Server", "TimescaleDB", "Docker"] },
  { category: "Robotics & Simulation", icon: "⊕", items: ["ROS2", "IsaacLab", "Isaac Sim", "Gazebo", "Foxglove", "micro-ROS", "rosbag2", "OpenCV", "Imitation Learning", "FOC"] },
  { category: "Embedded & Hardware", icon: "⌁", items: ["STM32", "FreeRTOS", "CAN/CAN-FD", "I2C", "SPI", "UART", "DMA", "Altium Designer", "KiCad", "LTspice"] },
];

const experience = [
  {
    company: "WATonomous",
    role: "Robotics & ML Engineer · Humanoid Autonomy",
    period: "Oct 2025 – Present",
    location: "Waterloo, ON",
    logo: "/watonomous_logo.jpg",
    desc: "WATonomous is the University of Waterloo's flagship autonomy design team, building full-stack systems for autonomous vehicles and humanoid robots. On the ML side, trained ACT and Diffusion Policy imitation-learning models in PyTorch using Hugging Face LeRobot, scaled training with NVIDIA Isaac Lab GPU-parallel simulation, and fine-tuned an open-source VLA model on annotated trajectories for spoken-language task instructions. On the firmware side, programmed FOC motor control on an STM32G4 with a FreeRTOS control loop, fusing IMU and encoder data through a Kalman filter for joint-state estimation, and bridged the embedded stack to ROS 2 over a CAN-FD bus using micro-ROS.",
  },
  {
    company: "Einfolab Inc.",
    role: "Data Engineer · Co-op",
    period: "Jan 2026 – Apr 2026",
    location: "Richmond Hill, ON",
    logo: "/einfolab.webp",
    desc: "Einfolab is an IT solutions and consulting firm delivering data management and back-office services to health sector clients across Ontario. Built a Dockerized Airflow ETL pipeline to orchestrate ingestion, SQL validation, and reconciliation of patient records across clinical, dental-imaging, finance, and administrative domains, with automated retries, failure alerting, and pytest CI integration. Engineered a scikit-learn Isolation Forest to catch anomalous records that bypassed rule-based SQL checks, and developed a FastAPI service backed by an LLM with structured outputs to auto-classify flagged data errors by type, reducing manual review overhead.",
  },
  {
    company: "UW Formula Electric",
    role: "Software & Firmware Engineer",
    period: "Sept 2025 – Apr 2026",
    location: "Waterloo, ON",
    logo: "/waterlooformulaelectric_logo.jpg",
    desc: "UW Formula Electric is a student design team that designs, builds, and competes with an open-wheel electric racecar in FSAE and Formula Hybrid competitions. On the firmware side, developed C/C++ firmware for the Battery Management Unit, Vehicle Control Unit, and Power Distribution Module, implementing CAN message handling, ADC sampling, and fail-safe logic for the high-voltage powertrain, and built a HIL testing framework in C++ and Python with CMake and pytest to catch integration bugs before on-vehicle testing. On the software side, built a real-time telemetry dashboard in React and TypeScript backed by FastAPI, streaming CAN data over WebSocket for live vehicle monitoring, trained a scikit-learn anomaly-detection model to flag voltage and thermal outliers in battery telemetry, and built a Python pipeline to ingest and store CAN logs in TimescaleDB for automated post-test analysis.",
  },
  {
    company: "Robotics Team",
    role: "Hardware Systems Lead",
    period: "Oct 2023 – Jun 2025",
    location: "Markham, ON",
    logo: "/robotics.webp",
    desc: "A competitive high school robotics team focused on designing and building autonomous and RC vehicles for regional engineering competitions. Led the full design and build of a Mars rover from the mechanical chassis through the embedded firmware stack. Wrote ESP32 motor control firmware in C++ with PWM drive and steering mapping, and integrated ultrasonic, IMU, and OpenCV camera modules to enable real-time obstacle detection and autonomous fail-safe behavior.",
  },
];

type ModalKey = "buildboard" | "lingo" | "todo" | "pool" | "pcb" | "wato";

type Project = {
  name: string;
  subtitle?: string;
  image: string;
  stack: string[];
  shortDesc: string;
  modalKey: ModalKey;
  repo: string | null;
  demo: string | null;
};

const projects: Project[] = [
  {
    name: "BuildBoard",
    image: "/buildboard-hero.png",
    stack: ["React 19", "Node.js", "Express", "PostgreSQL", "Passport.js", "Vite"],
    shortDesc: "A full-stack platform for student engineers to share projects, post build updates, recruit teammates by skill, and message collaborators.",
    modalKey: "buildboard",
    repo: "https://github.com/rayymondf/Posting_Platform",
    demo: "https://posting-platform.onrender.com/",
  },
  {
    name: "Lingo: Chrome Translation Extension",
    image: "/lingo-ext.png",
    stack: ["JavaScript", "Manifest V3", "Chrome Side Panel API", "DeepL API"],
    shortDesc: "A Chrome extension that opens a full translation workspace in the browser's native Side Panel using the DeepL API. Published on the Chrome Web Store.",
    modalKey: "lingo",
    repo: "https://github.com/rayymondf/Lingo_Seamless_Language_Translator",
    demo: "https://chromewebstore.google.com/detail/lingo-language-translator/okfkakjgiocfbejhmlpfmlbgjgdkddbl",
  },
  {
    name: "Todo: Calendar Task Manager",
    image: "/todo-app2.png",
    stack: ["HTML5", "CSS3", "Vanilla JavaScript", "localStorage"],
    shortDesc: "A task manager built in vanilla JavaScript with no dependencies. Includes a monthly calendar view, live search, filters, priority levels, and full keyboard accessibility.",
    modalKey: "todo",
    repo: "https://github.com/rayymondf/Todo-List-Project",
    demo: "https://rayymondf.github.io/Todo-List-Project/",
  },
  {
    name: "Java 8-Ball Pool Game",
    image: "/pool-game.png",
    stack: ["Java", "Java Swing", "2D Physics", "OOP"],
    shortDesc: "A two-player 8-ball pool game in Java Swing with a physics engine written from scratch. Handles elastic collisions, friction, rail bounces, and prevents balls from tunnelling at high speeds.",
    modalKey: "pool",
    repo: "https://github.com/rayymondf/Java-Project-Billards-Game",
    demo: null,
  },
  {
    name: "Low-Side Current Sensing PCB",
    subtitle: "UW Orbital",
    image: "/pcb1.png",
    stack: ["Altium Designer", "INA180B3IDBVR", "PCB Design", "Analog Electronics"],
    shortDesc: "A current-sense breakout board for UW Orbital's power system. Amplifies a 2 mV signal across a shunt resistor to a readable 200 mV output for an MCU ADC.",
    modalKey: "pcb",
    repo: null,
    demo: null,
  },
  {
    name: "Autonomous Robot Navigation Stack",
    subtitle: "WATonomous ASD",
    image: "/wato-asd.png",
    stack: ["ROS2 Humble", "C++17", "Gazebo", "A*", "Pure Pursuit", "Docker"],
    shortDesc: "An autonomous navigation stack for a simulated robot in Gazebo. Four ROS2 nodes handle LiDAR mapping, global map building, A* path planning, and Pure Pursuit control.",
    modalKey: "wato",
    repo: null,
    demo: "https://youtu.be/jMNTflrencM",
  },
];

const contacts = [
  { label: "Personal Email", value: "rayymondf29@gmail.com", href: "mailto:rayymondf29@gmail.com" },
  { label: "School Email", value: "r53fang@uwaterloo.ca", href: "mailto:r53fang@uwaterloo.ca" },
  { label: "LinkedIn", value: "linkedin.com/in/raymond-fang", href: "https://www.linkedin.com/in/raymond-fang-214192331" },
  { label: "GitHub", value: "github.com/rayymondf", href: "https://github.com/rayymondf" },
];

// ── Shared UI ─────────────────────────────────────────────────────────────────

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-2.5 py-1 text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-md text-black/50 dark:text-white/50 whitespace-nowrap">
      {children}
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span className="text-[10px] font-semibold tracking-[0.2em] text-black/30 dark:text-white/30 uppercase">{children}</span>
      <div className="flex-1 h-px bg-black/10 dark:bg-white/10" />
    </div>
  );
}

// ── Navbar ─────────────────────────────────────────────────────────────────────

function Navbar() {
  const { dark, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navTabs = [
    { title: "Home", icon: HomeIcon },
    { title: "Skills", icon: Code2 },
    { title: "Experience", icon: Briefcase },
    { title: "Projects", icon: FolderOpen },
    { title: "Contact", icon: Send },
  ];

  const sectionIds = ["hero", "skills", "experience", "projects", "contact"];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center pt-4 px-4 gap-2">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className={`flex items-center gap-2 transition-all duration-300 ${scrolled ? "scale-95" : ""}`}
      >
        <ExpandableTabs
          tabs={navTabs}
          activeColor="text-black dark:text-white"
          onChange={(i) => {
            if (i !== null && sectionIds[i]) {
              document.getElementById(sectionIds[i])?.scrollIntoView({ behavior: "smooth" });
            }
          }}
        />
        <button
          onClick={toggle}
          aria-label="Toggle theme"
          className="w-9 h-9 flex items-center justify-center rounded-xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/60 backdrop-blur-md text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
        >
          {dark ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      </motion.div>
    </header>
  );
}

// ── Modals ────────────────────────────────────────────────────────────────────

function ModalShell({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.2 }}
        className="relative bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-black/30 dark:text-white/30 hover:text-black dark:hover:text-white transition-colors">
          <X size={18} />
        </button>
        {children}
      </motion.div>
    </motion.div>
  );
}

function ModalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-black/8 dark:border-white/8 rounded-xl p-4 bg-black/[0.02] dark:bg-white/[0.02]">
      <p className="text-[10px] font-semibold text-black/35 dark:text-white/35 uppercase tracking-widest mb-3">{title}</p>
      {children}
    </div>
  );
}

function ModalRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3 text-sm py-1">
      <span className="text-black/35 dark:text-white/35 shrink-0 w-24">{label}</span>
      <span className="text-black/65 dark:text-white/65">{value}</span>
    </div>
  );
}

function ModalLinks({ repo, demo }: { repo: string | null; demo: string | null }) {
  if (!repo && !demo) return null;
  return (
    <div className="flex gap-3 mt-6">
      {repo && (
        <a href={repo} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 rounded-full px-4 py-1.5 transition-all">
          <GithubIcon size={14} /> Repository
        </a>
      )}
      {demo && (
        <a href={demo} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 rounded-full px-4 py-1.5 transition-all">
          <ExternalLink size={14} /> {demo.includes("youtu") ? "Demo Video" : "Live Demo"}
        </a>
      )}
    </div>
  );
}

function BuildBoardModal({ onClose }: { onClose: () => void }) {
  return (
    <ModalShell onClose={onClose}>
      <h2 className="text-black dark:text-white font-semibold text-lg mb-1">BuildBoard</h2>
      <p className="text-black/40 dark:text-white/40 text-sm mb-5">Full-Stack Web App · React 19 · Node.js · PostgreSQL · Deployed on Render</p>
      <div className="rounded-xl overflow-hidden border border-black/8 dark:border-white/8 mb-6">
        <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
          <Image src="/buildboard-hero.png" alt="BuildBoard" fill className="object-cover" />
        </div>
      </div>
      <div className="space-y-4">
        <p className="text-sm text-black/60 dark:text-white/60 leading-relaxed">
          BuildBoard is a collaboration platform built for student engineers, makers, and robotics teams. It gives teams a dedicated place to share their technical work, recruit members by skill set, post progress updates, and message each other directly.
        </p>
        <ModalSection title="Architecture">
          <div className="space-y-1">
            <ModalRow label="Frontend" value="React 19 SPA with Vite. Browser History routing. Responsive sidebar nav on desktop, bottom tab bar on mobile." />
            <ModalRow label="Backend" value="Node.js + Express REST API. Session-cookie auth via Passport.js with bcrypt password hashing." />
            <ModalRow label="Database" value="PostgreSQL on Neon. Parameterized queries. UNIQUE constraints prevent duplicate likes." />
            <ModalRow label="Hosting" value="Render (server + static). Neon serverless PostgreSQL." />
          </div>
        </ModalSection>
        <ModalSection title="Key Features">
          <ul className="space-y-1.5 text-sm text-black/55 dark:text-white/55">
            <li><span className="text-black dark:text-white font-medium">Project pages</span>: title, description, category, status, GitHub/demo links, skill tags</li>
            <li><span className="text-black dark:text-white font-medium">Build logs</span>: milestone-tagged progress posts with comments and likes</li>
            <li><span className="text-black dark:text-white font-medium">Recruitment</span>: open roles with skill areas, join requests, owner accept/reject workflow</li>
            <li><span className="text-black dark:text-white font-medium">Ranked feed</span>: score = likes × 2 + comments × 3 − age_in_hours × 0.05, computed in SQL</li>
            <li><span className="text-black dark:text-white font-medium">Guest demo</span>: read-only access with seeded data, no registration required</li>
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
      <p className="text-black/40 dark:text-white/40 text-sm mb-5">Chrome Extension · Manifest V3 · DeepL API · Chrome Web Store</p>
      <div className="rounded-xl overflow-hidden border border-black/8 dark:border-white/8 mb-6">
        <Image src="/lingo-ext.png" alt="Lingo" width={800} height={500} className="w-full h-auto" />
      </div>
      <div className="space-y-4">
        <p className="text-sm text-black/60 dark:text-white/60 leading-relaxed">
          A Manifest V3 Chrome extension that opens a translation workspace inside the browser's native Side Panel. It has no npm dependencies and no build step, so Chrome loads it directly as a set of static files. Published on the Chrome Web Store.
        </p>
        <ModalSection title="How It Works">
          <div className="space-y-1">
            <ModalRow label="Service worker" value="Opens side panel on icon click via chrome.sidePanel.open(), persistent across navigation." />
            <ModalRow label="Translation" value="POST /v2/translate to DeepL Free API. Language list fetched from /v2/languages." />
            <ModalRow label="Persistence" value="Chrome Storage API saves draft text, last selected language, and translation history." />
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
      <p className="text-black/40 dark:text-white/40 text-sm mb-5">Vanilla JavaScript · Zero Dependencies · Three-Layer Architecture</p>
      <div className="rounded-xl overflow-hidden border border-black/8 dark:border-white/8 mb-6">
        <Image src="/todo-app2.png" alt="Todo" width={800} height={500} className="w-full h-auto" />
      </div>
      <div className="space-y-4">
        <p className="text-sm text-black/60 dark:text-white/60 leading-relaxed">
          A task manager built in vanilla JavaScript with no frameworks or dependencies. The code is split into three clear layers: a data model that handles all task logic, a storage layer that reads and writes to localStorage, and a UI layer that connects the two via event delegation.
        </p>
        <ModalSection title="Architecture">
          <div className="space-y-1">
            <ModalRow label="TodoModel" value="Pure data layer. All CRUD, filtering, sorting, and calendar date lookups." />
            <ModalRow label="Storage" value="Serializes to localStorage under todo-app-v2. Normalizes on load." />
            <ModalRow label="App" value="Connects model to DOM via event delegation. Escape key closes modals." />
          </div>
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
      <p className="text-black/40 dark:text-white/40 text-sm mb-5">Java Swing · Custom 2D Physics Engine · OOP Design</p>
      <div className="rounded-xl overflow-hidden border border-black/8 dark:border-white/8 mb-6">
        <Image src="/pool-game.png" alt="Pool game" width={800} height={500} className="w-full h-auto" />
      </div>
      <div className="space-y-4">
        <p className="text-sm text-black/60 dark:text-white/60 leading-relaxed">
          A two-player 8-ball pool game built in Java Swing. All physics are written from scratch on a Swing Timer game loop with no third-party libraries. The engine handles ball-to-ball collisions, friction, cushion bounces, and uses continuous collision detection to prevent fast-moving balls from passing through each other.
        </p>
        <ModalSection title="Physics Engine">
          <div className="space-y-1">
            <ModalRow label="Integration" value="Per-tick velocity integration. Friction decelerates multiplicatively until rest threshold." />
            <ModalRow label="Collisions" value="Elastic circle-circle overlap detection. Velocities resolved along collision normal." />
            <ModalRow label="CCD" value="Physics step subdivided at high speeds to prevent tunnelling." />
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
      <p className="text-black/40 dark:text-white/40 text-sm mb-5">UW Orbital · Altium Designer · Analog Hardware Design</p>
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="rounded-xl overflow-hidden border border-black/8 dark:border-white/8">
          <div className="relative w-full bg-black/5 dark:bg-white/5" style={{ aspectRatio: "4/3" }}>
            <Image src="/pcb1.png" alt="PCB Layout" fill className="object-contain p-2" />
          </div>
          <p className="text-center text-xs text-black/30 dark:text-white/30 py-1.5">PCB Layout</p>
        </div>
        <div className="rounded-xl overflow-hidden border border-black/8 dark:border-white/8">
          <div className="relative w-full bg-black/5 dark:bg-white/5" style={{ aspectRatio: "4/3" }}>
            <Image src="/pcb2.png" alt="Schematic" fill className="object-contain p-2" />
          </div>
          <p className="text-center text-xs text-black/30 dark:text-white/30 py-1.5">Schematic</p>
        </div>
      </div>
      <div className="space-y-4">
        <p className="text-sm text-black/60 dark:text-white/60 leading-relaxed">
          A current sensing breakout board designed for UW Orbital's Electrical Power System. It measures how much current the satellite bus is drawing on a 5V rail (up to 200 mA) and outputs a proportional voltage that a microcontroller ADC can read directly.
        </p>
        <ModalSection title="Design Overview">
          <div className="space-y-1">
            <ModalRow label="Topology" value="Low-side sensing places the shunt resistor between the load return path and ground, so both amplifier inputs stay near ground and avoid high common-mode voltage issues." />
            <ModalRow label="Amplifier" value="INA180B3IDBVR with a fixed 100 V/V gain. At 200 mA through a 10 milliohm shunt, the 2 mV differential gets amplified to 200 mV, well within a 3.3V ADC range." />
            <ModalRow label="Layout" value="Designed in Altium Designer on Orbital's shared Altium 365 workspace. Ground copper pour on both layers stitched with vias for a solid return path." />
          </div>
        </ModalSection>
        <div className="flex flex-wrap gap-1.5">
          {["Altium Designer", "INA180B3IDBVR", "PCB Design", "Analog Electronics"].map((s) => <Tag key={s}>{s}</Tag>)}
        </div>
      </div>
    </ModalShell>
  );
}

function WATonomousModal({ onClose }: { onClose: () => void }) {
  return (
    <ModalShell onClose={onClose}>
      <h2 className="text-black dark:text-white font-semibold text-lg mb-1">Autonomous Robot Navigation Stack</h2>
      <p className="text-black/40 dark:text-white/40 text-sm mb-5">WATonomous ASD · ROS2 Humble · C++17 · Gazebo · Foxglove</p>
      <div className="rounded-xl overflow-hidden border border-black/8 dark:border-white/8 mb-2">
        <Image src="/wato-asd.png" alt="Foxglove" width={800} height={500} className="w-full h-auto" />
      </div>
      <p className="text-center text-xs text-black/30 dark:text-white/30 mb-5">Live costmap, inflated obstacles, and A* path overlaid on occupancy grid</p>
      <div className="space-y-4">
        <p className="text-sm text-black/60 dark:text-white/60 leading-relaxed">
          An autonomous navigation stack for a simulated differential-drive robot in Gazebo. Four ROS2 C++ nodes work together to take raw sensor data and turn it into robot movement: the robot builds a map from LiDAR scans, plans a path using A*, and follows it using a Pure Pursuit controller.
        </p>
        <ModalSection title="Node Architecture">
          <ul className="space-y-2 text-sm text-black/55 dark:text-white/55">
            <li><span className="text-black dark:text-white font-medium">Costmap:</span> Converts incoming LiDAR scans into a 2D occupancy grid and inflates obstacles so the planner keeps a safe clearance distance.</li>
            <li><span className="text-black dark:text-white font-medium">Map Memory:</span> Merges successive local costmaps into a persistent global map using odometry to track the robot's position over time.</li>
            <li><span className="text-black dark:text-white font-medium">Planner (A*):</span> Finds the shortest path to the goal using A* with a Euclidean heuristic. Replans automatically when the map changes.</li>
            <li><span className="text-black dark:text-white font-medium">Controller (Pure Pursuit):</span> Picks a lookahead point on the planned path, computes the turning radius needed to reach it, and publishes wheel velocity commands at 10 Hz.</li>
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

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Home() {
  const [openModal, setOpenModal] = useState<ModalKey | null>(null);
  const closeModal = useCallback(() => setOpenModal(null), []);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section id="hero" className="flex items-center px-6">
        <div className="max-w-6xl mx-auto w-full pt-28 pb-10">
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
            <span className="inline-flex items-center gap-2 text-xs border border-black/15 dark:border-white/15 bg-black/5 dark:bg-white/5 rounded-full px-3 py-1.5 text-black/50 dark:text-white/50 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Open to internships
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp} initial="hidden" animate="show" custom={1}
            className="text-6xl md:text-7xl xl:text-8xl font-bold tracking-tight leading-none mb-6"
          >
            Raymond Fang
          </motion.h1>

          <motion.p
            variants={fadeUp} initial="hidden" animate="show" custom={2}
            className="text-black/55 dark:text-white/55 text-lg md:text-xl leading-relaxed max-w-xl mb-10"
          >
            Electrical Engineering student at the University of Waterloo, building practical systems that shape how we interact with the world around us.
          </motion.p>

          <motion.div
            variants={fadeUp} initial="hidden" animate="show" custom={3}
            className="flex flex-wrap gap-3 mb-10"
          >
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-1.5 rounded-full px-6 h-10 text-sm font-medium bg-black dark:bg-white text-white dark:text-black hover:opacity-75 transition-opacity"
            >
              <ChevronRight size={16} /> Projects
            </button>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-1.5 rounded-full px-6 h-10 text-sm font-medium border border-black/20 dark:border-white/20 text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              <Mail size={16} /> Get in Touch
            </button>
          </motion.div>

          <motion.div
            variants={fadeUp} initial="hidden" animate="show" custom={4}
            className="flex items-center gap-4"
          >
            <a href="https://github.com/rayymondf" target="_blank" rel="noopener noreferrer"
              className="text-black/30 dark:text-white/30 hover:text-black dark:hover:text-white transition-colors">
              <GithubIcon size={18} />
            </a>
            <a href="https://www.linkedin.com/in/raymond-fang-214192331" target="_blank" rel="noopener noreferrer"
              className="text-black/30 dark:text-white/30 hover:text-black dark:hover:text-white transition-colors">
              <LinkedinIcon size={18} />
            </a>
            <a href="mailto:rayymondf29@gmail.com"
              className="text-black/30 dark:text-white/30 hover:text-black dark:hover:text-white transition-colors">
              <Mail size={18} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Skills ────────────────────────────────────────────────────────── */}
      <section id="skills" className="py-12 px-6 max-w-6xl mx-auto">
        <SectionLabel>Technical Skills</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {skills.map((group, i) => (
            <motion.div
              key={group.category}
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
              className="border border-black/8 dark:border-white/8 rounded-2xl p-5 bg-black/[0.02] dark:bg-white/[0.02] hover:border-black/15 dark:hover:border-white/15 transition-colors"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-mono text-black/20 dark:text-white/20 w-5 text-center select-none">{group.icon}</span>
                <p className="text-[10px] font-semibold text-black/40 dark:text-white/40 uppercase tracking-widest">{group.category}</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((skill) => <Tag key={skill}>{skill}</Tag>)}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Experience ────────────────────────────────────────────────────── */}
      <section id="experience" className="py-12 px-6 max-w-6xl mx-auto">
        <SectionLabel>Experience</SectionLabel>
        <div className="relative">
          <div className="absolute left-[27px] top-3 bottom-3 w-0.5 bg-black/15 dark:bg-white/20" aria-hidden />
          <div className="space-y-5">
            {experience.map((e, i) => (
              <motion.div
                key={e.company}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                className="relative flex gap-6"
              >
                <div className="shrink-0 z-10 w-14">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/20 flex items-center justify-center">
                    <Image
                      src={e.logo} alt={e.company} width={56} height={56}
                      className={`object-contain w-full h-full${e.logo === "/robotics.webp" ? " scale-125 object-cover" : ""}`}
                    />
                  </div>
                </div>
                <div className="flex-1 border border-black/8 dark:border-white/15 rounded-2xl p-5 bg-black/[0.02] dark:bg-white/[0.04] hover:border-black/15 dark:hover:border-white/25 transition-colors">
                  <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
                    <div>
                      <h3 className="text-black dark:text-white font-semibold text-base">{e.role}</h3>
                      <p className="text-black/55 dark:text-white/60 text-sm mt-0.5">{e.company}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-black/40 dark:text-white/50 text-sm">{e.period}</p>
                      <p className="text-black/40 dark:text-white/50 text-sm mt-0.5">{e.location}</p>
                    </div>
                  </div>
                  <p className="text-sm text-black/60 dark:text-white/65 leading-relaxed">{e.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects ──────────────────────────────────────────────────────── */}
      <section id="projects" className="py-12 px-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3 flex-1">
            <span className="text-[10px] font-semibold tracking-[0.2em] text-black/30 dark:text-white/30 uppercase">Projects</span>
            <div className="flex-1 h-px bg-black/10 dark:bg-white/10" />
          </div>
          <a
            href="https://drive.google.com/drive/folders/1Yxby7jcXt58jyNnhvGHdMyLEBAqSAyhF?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 shrink-0 inline-flex items-center gap-1.5 rounded-full px-4 h-8 text-xs font-medium border border-black/15 dark:border-white/15 text-black/55 dark:text-white/55 hover:border-black/30 dark:hover:border-white/30 hover:text-black dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.05] transition-all"
          >
            <ExternalLink size={12} /> Resume
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p, i) => (
            <motion.div
              key={p.name}
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
              className="group border border-black/8 dark:border-white/8 rounded-2xl overflow-hidden hover:border-black/20 dark:hover:border-white/20 transition-all duration-300 hover:-translate-y-1 bg-black/[0.01] dark:bg-white/[0.02]"
            >
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
                <Image
                  src={p.image} alt={p.name} fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-5 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-black dark:text-white font-semibold text-base leading-snug">{p.name}</h3>
                    {p.subtitle && <p className="text-black/35 dark:text-white/35 text-xs mt-0.5">{p.subtitle}</p>}
                  </div>
                  <div className="flex gap-2 shrink-0 pt-0.5">
                    {p.repo && (
                      <a href={p.repo} target="_blank" rel="noopener noreferrer"
                        className="text-black/25 dark:text-white/25 hover:text-black dark:hover:text-white transition-colors" onClick={(e) => e.stopPropagation()}>
                        <GithubIcon size={15} />
                      </a>
                    )}
                    {p.demo && (
                      <a href={p.demo} target="_blank" rel="noopener noreferrer"
                        className="text-black/25 dark:text-white/25 hover:text-black dark:hover:text-white transition-colors" onClick={(e) => e.stopPropagation()}>
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-black/50 dark:text-white/50 text-sm leading-relaxed">{p.shortDesc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.map((s) => <Tag key={s}>{s}</Tag>)}
                </div>
                <button
                  onClick={() => setOpenModal(p.modalKey)}
                  className="self-start text-xs text-black/35 dark:text-white/35 hover:text-black dark:hover:text-white/70 border border-black/10 dark:border-white/10 hover:border-black/25 dark:hover:border-white/25 rounded-full px-3 py-1 transition-all mt-1"
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Contact ───────────────────────────────────────────────────────── */}
      <section id="contact" className="py-12 px-6 max-w-6xl mx-auto">
        <SectionLabel>Contact</SectionLabel>
        <div className="grid sm:grid-cols-2 gap-3">
          {contacts.map(({ label, value, href }, i) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
              whileHover={{ x: 4 }}
              className="flex items-center gap-4 border border-black/8 dark:border-white/8 rounded-2xl p-5 hover:border-black/20 dark:hover:border-white/20 hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition-all group"
            >
              <div className="w-9 h-9 rounded-xl bg-black/5 dark:bg-white/5 border border-black/8 dark:border-white/10 flex items-center justify-center text-black/40 dark:text-white/40 group-hover:text-black dark:group-hover:text-white transition-all shrink-0">
                {href.includes("linkedin") ? <LinkedinIcon size={16} /> :
                 href.includes("github") ? <GithubIcon size={16} /> :
                 <Mail size={16} />}
              </div>
              <div className="min-w-0">
                <p className="text-black/35 dark:text-white/35 text-xs mb-0.5">{label}</p>
                <p className="text-black/75 dark:text-white/75 text-sm font-medium truncate group-hover:text-black dark:group-hover:text-white transition-colors">{value}</p>
              </div>
              <ChevronRight size={14} className="text-black/20 dark:text-white/20 group-hover:text-black/50 dark:group-hover:text-white/50 ml-auto shrink-0 transition-all group-hover:translate-x-0.5" />
            </motion.a>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {openModal === "buildboard" && <BuildBoardModal onClose={closeModal} />}
        {openModal === "lingo" && <LingoModal onClose={closeModal} />}
        {openModal === "todo" && <TodoModal onClose={closeModal} />}
        {openModal === "pool" && <PoolModal onClose={closeModal} />}
        {openModal === "pcb" && <PCBModal onClose={closeModal} />}
        {openModal === "wato" && <WATonomousModal onClose={closeModal} />}
      </AnimatePresence>

      <footer className="py-10 border-t border-black/8 dark:border-white/8 text-center text-black/25 dark:text-white/25 text-xs">
        Raymond Fang · {CURRENT_YEAR}
      </footer>
    </div>
  );
}
