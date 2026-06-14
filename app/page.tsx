"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, ExternalLink, X, Home as HomeIcon, Briefcase, Code2, User, Send,
  ChevronRight,
} from "lucide-react";

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
import Image from "next/image";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";
import { Card } from "@/components/ui/card";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { Button } from "@/components/ui/button";

const CURRENT_YEAR = new Date().getFullYear();

// ── Animation ─────────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  show: (i = 0) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

// ── Data ──────────────────────────────────────────────────────────────────────

const skills = [
  { category: "Languages", icon: "{ }", items: ["C", "C++", "Python", "JavaScript", "TypeScript", "Java", "SQL", "Ruby", "MATLAB", "Bash"] },
  { category: "Web & Backend", icon: "⬡", items: ["React", "Next.js", "Node.js", "Express", "FastAPI", "Tailwind CSS", "Vite", "REST APIs", "HTML5", "CSS3"] },
  { category: "Data & ML", icon: "◈", items: ["PostgreSQL", "MySQL", "SQL Server", "pandas", "NumPy", "PyTorch", "scikit-learn", "Git", "Docker", "Linux"] },
  { category: "Robotics & Simulation", icon: "⊕", items: ["ROS2", "Gazebo", "MuJoCo", "Isaac Sim", "IsaacLab", "Foxglove", "OpenCV"] },
  { category: "Embedded & Hardware", icon: "⌁", items: ["STM32", "ESP32", "Arduino", "FPGA", "Verilog", "Altium", "KiCad", "CAN", "I2C", "SPI", "UART"] },
];

const experience = [
  {
    company: "WATonomous",
    role: "Robotics Software Engineer · Humanoid Team",
    period: "Oct 2025 – Present",
    location: "Waterloo, ON",
    logo: "/watonomous_logo.jpg",
    desc: "Worked on motion control software for a custom bipedal robot inside a Dockerized ROS2 monorepo, collaborating with the UW Robotics Lab. Implemented arm and hand control in MuJoCo using iterative Jacobian methods across 21 DOF, and trained a PCA model to compress 15 finger joint positions to 7 values for real-time hand control. The team focused on bridging simulation to hardware through rigorous testing pipelines and modular controller architectures.",
  },
  {
    company: "Einfolab Inc.",
    role: "Data Engineer · Co-op",
    period: "Jan 2026 – Apr 2026",
    location: "Richmond Hill, ON",
    logo: "/einfolab.webp",
    desc: "Designed and maintained SQL Server and MySQL databases for healthcare and non-profit clients across Ontario. Built Python/pandas ETL pipelines to automate data cleaning, deduplication, and cross-system reconciliation. Supported client onboarding by configuring Windows Server environments, and worked directly with stakeholders to model data schemas that satisfied both regulatory and operational requirements.",
  },
  {
    company: "University of Waterloo Formula Electric",
    role: "Electrical & Firmware Engineer",
    period: "Sept 2025 – Apr 2026",
    location: "Waterloo, ON",
    logo: "/waterlooformulaelectric_logo.jpg",
    desc: "Developed C/C++ hardware-in-the-loop test utilities for the Battery Management Unit, Vehicle Control Unit, and Power Distribution Module. Built CAN log parsing tooling to accelerate firmware debugging across subsystems, and implemented pre-HV startup sequencing logic to verify full system readiness before track integration. Worked within a safety-critical embedded environment with strict coding standards.",
  },
  {
    company: "Robotics Team",
    role: "Hardware Systems Lead",
    period: "Oct 2023 – Jun 2025",
    location: "Markham, ON",
    logo: "/robotics.webp",
    desc: "Led end-to-end design and build of a competitive RC Mars rover from chassis through embedded firmware. Wrote ESP32 motor control firmware in C++/Arduino with PWM drive and steering mapping, and integrated ultrasonic, IMU, and OpenCV camera modules for obstacle detection and autonomous fail-safe logic. Coordinated a small cross-functional team through multiple competitive seasons.",
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
    shortDesc: "Full-stack engineering collaboration platform. Students can create project pages, post build-log updates, open team recruitment roles, and message collaborators.",
    modalKey: "buildboard",
    repo: "https://github.com/rayymondf/Posting_Platform",
    demo: "https://posting-platform.onrender.com/",
  },
  {
    name: "Lingo: Chrome Translation Extension",
    image: "/lingo-ext.png",
    stack: ["JavaScript", "Manifest V3", "Chrome Side Panel API", "DeepL API"],
    shortDesc: "Manifest V3 Chrome extension that opens a full translation workspace in Chrome's native Side Panel. Live on the Chrome Web Store.",
    modalKey: "lingo",
    repo: "https://github.com/rayymondf/Lingo_Seamless_Language_Translator",
    demo: "https://chromewebstore.google.com/detail/lingo-language-translator/okfkakjgiocfbejhmlpfmlbgjgdkddbl",
  },
  {
    name: "Todo: Calendar Task Manager",
    image: "/todo-app2.png",
    stack: ["HTML5", "CSS3", "Vanilla JavaScript", "localStorage"],
    shortDesc: "Zero-dependency task manager in vanilla JS with three-layer architecture. Monthly calendar view, live search, filter and sort modes, priority levels, and full keyboard accessibility.",
    modalKey: "todo",
    repo: "https://github.com/rayymondf/Todo-List-Project",
    demo: "https://rayymondf.github.io/Todo-List-Project/",
  },
  {
    name: "Java 8-Ball Pool Game",
    image: "/pool-game.png",
    stack: ["Java", "Java Swing", "2D Physics", "OOP"],
    shortDesc: "Two-player 8-ball billiards in Java Swing with a custom physics engine: elastic collisions, friction, rail bounce, and sub-step CCD to prevent tunnelling.",
    modalKey: "pool",
    repo: "https://github.com/rayymondf/Java-Project-Billards-Game",
    demo: null,
  },
  {
    name: "Low-Side Current Sensing PCB",
    subtitle: "UW Orbital",
    image: "/pcb1.png",
    stack: ["Altium Designer", "INA180B3IDBVR", "PCB Design", "Analog Electronics"],
    shortDesc: "Current-sense breakout board for UW Orbital's EPS. Low-side topology with INA180B3IDBVR amplifying a 2 mV differential signal to 200 mV over 0–200 mA.",
    modalKey: "pcb",
    repo: null,
    demo: null,
  },
  {
    name: "Autonomous Robot Navigation Stack",
    subtitle: "WATonomous ASD",
    image: "/wato-asd.png",
    stack: ["ROS2 Humble", "C++17", "Gazebo", "A*", "Pure Pursuit", "Docker"],
    shortDesc: "Full autonomous nav stack for a simulated differential-drive robot. Four ROS2 C++ nodes implement the full perception–planning–control pipeline, visualized in Foxglove.",
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

// ── Shared Components ─────────────────────────────────────────────────────────

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-2.5 py-1 text-xs bg-white/5 border border-white/10 rounded-md text-white/50 whitespace-nowrap">
      {children}
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span className="text-[10px] font-semibold tracking-[0.2em] text-white/30 uppercase">{children}</span>
      <div className="flex-1 h-px bg-white/8" />
    </div>
  );
}

// ── Navbar ─────────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navTabs = [
    { title: "Home", icon: HomeIcon },
    { title: "Skills", icon: Code2 },
    { title: "Experience", icon: Briefcase },
    { title: "Projects", icon: User },
    { title: "Contact", icon: Send },
  ];

  const sectionIds = ["hero", "skills", "experience", "projects", "contact"];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className={`transition-all duration-300 ${scrolled ? "scale-95" : ""}`}
      >
        <ExpandableTabs
          tabs={navTabs}
          activeColor="text-white"
          onChange={(i) => {
            if (i !== null && sectionIds[i]) {
              document.getElementById(sectionIds[i])?.scrollIntoView({ behavior: "smooth" });
            }
          }}
        />
      </motion.div>
    </header>
  );
}

// ── Modal Components ──────────────────────────────────────────────────────────

function ModalShell({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.2 }}
        className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors">
          <X size={18} />
        </button>
        {children}
      </motion.div>
    </motion.div>
  );
}

function ModalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-white/8 rounded-xl p-4 bg-white/[0.02]">
      <p className="text-[10px] font-semibold text-white/35 uppercase tracking-widest mb-3">{title}</p>
      {children}
    </div>
  );
}

function ModalRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3 text-sm py-1">
      <span className="text-white/35 shrink-0 w-24">{label}</span>
      <span className="text-white/65">{value}</span>
    </div>
  );
}

function ModalLinks({ repo, demo }: { repo: string | null; demo: string | null }) {
  if (!repo && !demo) return null;
  return (
    <div className="flex gap-3 mt-6">
      {repo && (
        <a href={repo} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white border border-white/10 hover:border-white/30 rounded-full px-4 py-1.5 transition-all">
          <GithubIcon size={14} /> Repository
        </a>
      )}
      {demo && (
        <a href={demo} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white border border-white/10 hover:border-white/30 rounded-full px-4 py-1.5 transition-all">
          <ExternalLink size={14} /> {demo.includes("youtu") ? "Demo Video" : "Live Demo"}
        </a>
      )}
    </div>
  );
}

function BuildBoardModal({ onClose }: { onClose: () => void }) {
  return (
    <ModalShell onClose={onClose}>
      <h2 className="text-white font-semibold text-lg mb-1">BuildBoard</h2>
      <p className="text-white/40 text-sm mb-5">Full-Stack Web App · React 19 · Node.js · PostgreSQL · Deployed on Render</p>
      <div className="rounded-xl overflow-hidden border border-white/8 mb-6">
        <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
          <Image src="/buildboard-hero.png" alt="BuildBoard" fill className="object-cover" />
        </div>
      </div>
      <div className="space-y-4">
        <p className="text-sm text-white/60 leading-relaxed">
          BuildBoard is a full-stack collaboration platform for student engineers, makers, and robotics teams — purpose-built for sharing technical projects, recruiting teammates by skill, posting build logs, and messaging collaborators.
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
          <ul className="space-y-1.5 text-sm text-white/55">
            <li><span className="text-white font-medium">Project pages</span>: title, description, category, status, GitHub/demo links, skill tags</li>
            <li><span className="text-white font-medium">Build logs</span>: milestone-tagged progress posts with comments and likes</li>
            <li><span className="text-white font-medium">Recruitment</span>: open roles with skill areas, join requests, owner accept/reject workflow</li>
            <li><span className="text-white font-medium">Ranked feed</span>: score = likes × 2 + comments × 3 − age_in_hours × 0.05, computed in SQL</li>
            <li><span className="text-white font-medium">Guest demo</span>: read-only access with seeded data, no registration required</li>
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
      <h2 className="text-white font-semibold text-lg mb-1">Lingo: Chrome Translation Extension</h2>
      <p className="text-white/40 text-sm mb-5">Chrome Extension · Manifest V3 · DeepL API · Chrome Web Store</p>
      <div className="rounded-xl overflow-hidden border border-white/8 mb-6">
        <Image src="/lingo-ext.png" alt="Lingo" width={800} height={500} className="w-full h-auto" />
      </div>
      <div className="space-y-4">
        <p className="text-sm text-white/60 leading-relaxed">
          Manifest V3 Chrome extension surfacing a translation workspace inside Chrome&apos;s native Side Panel. No npm packages, no build step. Live on the Chrome Web Store.
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
      <h2 className="text-white font-semibold text-lg mb-1">Todo: Calendar Task Manager</h2>
      <p className="text-white/40 text-sm mb-5">Vanilla JavaScript · Zero Dependencies · Three-Layer Architecture</p>
      <div className="rounded-xl overflow-hidden border border-white/8 mb-6">
        <Image src="/todo-app2.png" alt="Todo" width={800} height={500} className="w-full h-auto" />
      </div>
      <div className="space-y-4">
        <p className="text-sm text-white/60 leading-relaxed">
          Zero-dependency task manager enforcing a strict three-layer architecture (TodoModel / Storage / App). Monthly calendar view, live search, filters, priority levels, tags, repeat intervals, and full keyboard accessibility.
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
      <h2 className="text-white font-semibold text-lg mb-1">Java 8-Ball Pool Game</h2>
      <p className="text-white/40 text-sm mb-5">Java Swing · Custom 2D Physics Engine · OOP Design</p>
      <div className="rounded-xl overflow-hidden border border-white/8 mb-6">
        <Image src="/pool-game.png" alt="Pool game" width={800} height={500} className="w-full h-auto" />
      </div>
      <div className="space-y-4">
        <p className="text-sm text-white/60 leading-relaxed">
          Two-player 8-ball billiards in Java Swing with a fully custom physics engine — all collision detection, resolution, and movement dynamics computed from scratch on a Swing Timer game loop.
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
      <h2 className="text-white font-semibold text-lg mb-1">Low-Side Current Sensing PCB</h2>
      <p className="text-white/40 text-sm mb-5">UW Orbital · Altium Designer · Analog Hardware Design</p>
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="rounded-xl overflow-hidden border border-white/8">
          <div className="relative w-full bg-white/5" style={{ aspectRatio: "4/3" }}>
            <Image src="/pcb1.png" alt="PCB Layout" fill className="object-contain p-2" />
          </div>
          <p className="text-center text-xs text-white/30 py-1.5">PCB Layout</p>
        </div>
        <div className="rounded-xl overflow-hidden border border-white/8">
          <div className="relative w-full bg-white/5" style={{ aspectRatio: "4/3" }}>
            <Image src="/pcb2.png" alt="Schematic" fill className="object-contain p-2" />
          </div>
          <p className="text-center text-xs text-white/30 py-1.5">Schematic</p>
        </div>
      </div>
      <div className="space-y-4">
        <p className="text-sm text-white/60 leading-relaxed">
          Low-side current-sense breakout board for UW Orbital&apos;s Electrical Power System. Measures DC bus current on a 5V rail over 0–200 mA and outputs an analog voltage readable by an MCU ADC.
        </p>
        <ModalSection title="Design Overview">
          <div className="space-y-1">
            <ModalRow label="Topology" value="Low-side sensing — shunt between load return and ground." />
            <ModalRow label="Amplifier" value="INA180B3IDBVR (100 V/V). 2 mV differential amplified to 200 mV at 200 mA." />
            <ModalRow label="Layout" value="Altium Designer on Orbital's shared Altium 365 workspace. GND copper pour both layers." />
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
      <h2 className="text-white font-semibold text-lg mb-1">Autonomous Robot Navigation Stack</h2>
      <p className="text-white/40 text-sm mb-5">WATonomous ASD · ROS2 Humble · C++17 · Gazebo · Foxglove</p>
      <div className="rounded-xl overflow-hidden border border-white/8 mb-6">
        <Image src="/wato-asd.png" alt="Foxglove" width={800} height={500} className="w-full h-auto" />
        <p className="text-center text-xs text-white/30 py-1.5">Live costmap, inflated obstacles, and A* path overlaid on occupancy grid</p>
      </div>
      <div className="space-y-4">
        <p className="text-sm text-white/60 leading-relaxed">
          Full autonomous navigation stack for a simulated differential-drive robot in Gazebo. Four ROS2 C++ nodes implement the full perception–world model–planning–control pipeline.
        </p>
        <ModalSection title="Node Architecture">
          <ul className="space-y-2 text-sm text-white/55">
            <li><span className="text-white font-medium">Costmap</span>: Converts LiDAR scan to Cartesian grid, marks occupied cells, applies inflation kernel.</li>
            <li><span className="text-white font-medium">Map Memory</span>: Fuses local costmaps into persistent global map via odometry.</li>
            <li><span className="text-white font-medium">Planner (A*)</span>: A* with Euclidean heuristic, replans on map updates.</li>
            <li><span className="text-white font-medium">Controller</span>: Pure Pursuit — selects lookahead waypoint, computes arc curvature, outputs Twist at 10 Hz.</li>
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
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden">
        {/* Spline + Spotlight Card */}
        <div className="flex-1 flex items-center justify-center pt-20">
          <Card className="w-full max-w-6xl mx-4 h-[85vh] relative overflow-hidden bg-black/95 border-white/10">
            <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

            <div className="flex h-full">
              {/* Left: intro text */}
              <div className="flex-1 p-10 md:p-16 relative z-10 flex flex-col justify-center">
                <AnimatedGroup preset="blur-slide" className="space-y-6">
                  {/* Status badge */}
                  <div className="flex items-center gap-2 w-fit">
                    <div>
                      <span className="flex items-center gap-2 text-xs border border-white/15 bg-white/5 rounded-full px-3 py-1.5 text-white/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Open to internships
                      </span>
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight leading-none text-white">
                      Raymond<br />
                      <span className="bg-gradient-to-r from-white via-white/80 to-white/40 bg-clip-text text-transparent">
                        Fang
                      </span>
                    </h1>
                  </div>

                  {/* Intro */}
                  <p className="text-white/55 text-base md:text-lg leading-relaxed max-w-md">
                    Electrical Engineering student at the{" "}
                    <span className="text-white/80">University of Waterloo</span>, building practical systems that shape how we interact with the world around us.
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    <Button
                      onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                      className="rounded-full px-6"
                    >
                      <ChevronRight size={16} className="mr-1" />
                      Projects
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                      className="rounded-full px-6"
                    >
                      <Mail size={16} className="mr-1" />
                      Get in Touch
                    </Button>
                  </div>

                  {/* Social links */}
                  <div className="flex items-center gap-3 pt-1">
                    <a href="https://github.com/rayymondf" target="_blank" rel="noopener noreferrer"
                      className="text-white/30 hover:text-white transition-colors">
                      <GithubIcon size={18} />
                    </a>
                    <a href="https://www.linkedin.com/in/raymond-fang-214192331" target="_blank" rel="noopener noreferrer"
                      className="text-white/30 hover:text-white transition-colors">
                      <LinkedinIcon size={18} />
                    </a>
                    <a href="mailto:rayymondf29@gmail.com" className="text-white/30 hover:text-white transition-colors">
                      <Mail size={18} />
                    </a>
                  </div>
                </AnimatedGroup>
              </div>

              {/* Right: 3D scene */}
              <div className="hidden md:flex flex-1 relative">
                <SplineScene
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="w-full h-full"
                />
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* ── Skills ────────────────────────────────────────────────────────── */}
      <section id="skills" className="py-24 px-6 max-w-6xl mx-auto">
        <SectionLabel>Technical Skills</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {skills.map((group, i) => (
            <motion.div
              key={group.category}
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
              className="border border-white/8 rounded-2xl p-5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/15 transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-mono text-white/20 w-5 text-center select-none">{group.icon}</span>
                <p className="text-[10px] font-semibold text-white/40 uppercase tracking-widest">{group.category}</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((skill) => <Tag key={skill}>{skill}</Tag>)}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Experience ────────────────────────────────────────────────────── */}
      <section id="experience" className="py-24 px-6 max-w-6xl mx-auto">
        <SectionLabel>Experience</SectionLabel>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[27px] top-3 bottom-3 w-px bg-white/8" aria-hidden />
          <div className="space-y-5">
            {experience.map((e, i) => (
              <motion.div
                key={e.company}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                className="relative flex gap-6"
              >
                <div className="shrink-0 z-10 w-14">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center">
                    <Image
                      src={e.logo} alt={e.company} width={56} height={56}
                      className={`object-contain w-full h-full${e.logo === "/robotics.webp" ? " scale-125 object-cover" : ""}`}
                    />
                  </div>
                </div>
                <div className="flex-1 border border-white/8 rounded-2xl p-5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/15 transition-all duration-300">
                  <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
                    <div>
                      <h3 className="text-white font-semibold text-base">{e.role}</h3>
                      <p className="text-white/45 text-sm mt-0.5">{e.company}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-white/35 text-sm">{e.period}</p>
                      <p className="text-white/35 text-sm mt-0.5">{e.location}</p>
                    </div>
                  </div>
                  <p className="text-sm text-white/50 leading-relaxed">{e.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects ──────────────────────────────────────────────────────── */}
      <section id="projects" className="py-24 px-6 max-w-6xl mx-auto">
        <SectionLabel>Projects</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p, i) => (
            <motion.div
              key={p.name}
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
              className="group border border-white/8 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500 hover:-translate-y-1 cursor-pointer bg-white/[0.02]"
            >
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
                <Image
                  src={p.image} alt={p.name} fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-5 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-white font-semibold text-base leading-snug">{p.name}</h3>
                    {p.subtitle && <p className="text-white/35 text-xs mt-0.5">{p.subtitle}</p>}
                  </div>
                  <div className="flex gap-2 shrink-0 pt-0.5">
                    {p.repo && (
                      <a href={p.repo} target="_blank" rel="noopener noreferrer"
                        className="text-white/25 hover:text-white transition-colors" onClick={(e) => e.stopPropagation()}>
                        <GithubIcon size={15} />
                      </a>
                    )}
                    {p.demo && (
                      <a href={p.demo} target="_blank" rel="noopener noreferrer"
                        className="text-white/25 hover:text-white transition-colors" onClick={(e) => e.stopPropagation()}>
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-white/50 text-sm leading-relaxed">{p.shortDesc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.slice(0, 4).map((s) => <Tag key={s}>{s}</Tag>)}
                  {p.stack.length > 4 && <Tag>+{p.stack.length - 4}</Tag>}
                </div>
                <button
                  onClick={() => setOpenModal(p.modalKey)}
                  className="self-start text-xs text-white/35 hover:text-white/70 border border-white/10 hover:border-white/25 rounded-full px-3 py-1 transition-all mt-1"
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Contact ───────────────────────────────────────────────────────── */}
      <section id="contact" className="py-24 px-6 max-w-6xl mx-auto">
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
              className="flex items-center gap-4 border border-white/8 rounded-2xl p-5 hover:border-white/20 hover:bg-white/[0.03] transition-all group"
            >
              <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 group-hover:text-white group-hover:border-white/20 transition-all shrink-0">
                {href.includes("linkedin") ? <LinkedinIcon size={16} /> :
                 href.includes("github") ? <GithubIcon size={16} /> :
                 <Mail size={16} />}
              </div>
              <div className="min-w-0">
                <p className="text-white/35 text-xs mb-0.5">{label}</p>
                <p className="text-white/75 text-sm font-medium truncate group-hover:text-white transition-colors">{value}</p>
              </div>
              <ChevronRight size={14} className="text-white/20 group-hover:text-white/50 ml-auto shrink-0 transition-all group-hover:translate-x-0.5" />
            </motion.a>
          ))}
        </div>
      </section>

      {/* Modals */}
      <AnimatePresence>
        {openModal === "buildboard" && <BuildBoardModal onClose={closeModal} />}
        {openModal === "lingo" && <LingoModal onClose={closeModal} />}
        {openModal === "todo" && <TodoModal onClose={closeModal} />}
        {openModal === "pool" && <PoolModal onClose={closeModal} />}
        {openModal === "pcb" && <PCBModal onClose={closeModal} />}
        {openModal === "wato" && <WATonomousModal onClose={closeModal} />}
      </AnimatePresence>

      <footer className="py-10 border-t border-white/8 text-center text-white/20 text-xs">
        Raymond Fang · {CURRENT_YEAR}
      </footer>
    </div>
  );
}
