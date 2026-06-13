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

// Data

const skills: Record<string, string[]> = {
  Languages: ["C", "C++", "Python", "JavaScript", "TypeScript", "Java", "SQL", "Ruby", "MATLAB", "Bash"],
  "Frontend & Backend": ["React", "Next.js", "Node.js", "Express", "FastAPI", "Tailwind CSS", "Vite", "REST APIs"],
  "Databases & Tools": ["PostgreSQL", "MySQL", "SQL Server", "Git", "Docker", "Linux", "ROS2", "Gazebo"],
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
    company: "WATonomous ASD",
    role: "Autonomous Systems Developer",
    period: "Jan 2026 - Present",
    location: "Waterloo, ON",
    logo: "/wato-asd.png",
    description:
      "WATonomous is a student engineering team building full-stack autonomous driving software. I developed a complete autonomous navigation stack for a simulated differential-drive robot in Gazebo using ROS2 and C++17. The system includes four tightly coupled nodes covering perception (LiDAR to occupancy grid), global map fusion, A* path planning, and Pure Pursuit control. Visualized live in Foxglove Studio over a WebSocket bridge.",
  },
  {
    company: "Einfolab Inc.",
    role: "Data Engineer · Co-op",
    period: "Jan 2026 - Apr 2026",
    location: "Richmond Hill, ON",
    logo: "/einfolab.webp",
    description:
      "Einfolab is an IT solutions provider serving healthcare and non-profit clients across Ontario. Designed and maintained SQL Server and MySQL databases for clinical, dental, and administrative systems. Automated data cleaning and reconciliation pipelines using Python and pandas. Configured Windows Server environments for client deployments, improving reporting accuracy and reducing manual setup overhead.",
  },
  {
    company: "University of Waterloo Formula Electric",
    role: "Electrical and Firmware Engineer",
    period: "Sept 2025 - Present",
    location: "Waterloo, ON",
    logo: "/waterlooformulaelectric_logo.jpg",
    description:
      "UWFE builds and races a formula-style electric vehicle at FSAE Michigan and Formula Hybrid+Electric competitions. I develop C/C++ hardware-in-the-loop test utilities for the Battery Management Unit, Vehicle Control Unit, and Power Distribution Unit. I also build CAN log analysis tooling to accelerate firmware debugging and implement pre-HV startup logic to improve vehicle readiness before track integration.",
  },
  {
    company: "Robotics Team",
    role: "Hardware Systems Lead",
    period: "Oct 2023 - Jun 2025",
    location: "Markham, ON",
    logo: "/robotics.webp",
    description:
      "Led the hardware division of a competitive robotics team, designing and building an RC Mars rover from the ground up. Owned the full hardware stack: chassis design, ESP32-based motor control firmware in C++/Arduino, PWM drive and steering mapping, and sensor integration including ultrasonic, IMU, and OpenCV camera feedback for real-time obstacle detection and autonomous fail-safes.",
  },
];

// Project types

type SoftwareProject = {
  kind: "software";
  name: string;
  image: string;
  stack: string[];
  shortDesc: string;
  longDesc: string;
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
      "Collaboration platform for student engineers. Create project pages, post build logs, recruit teammates by skill, and message collaborators. Includes ranked feed, role-based permissions, and a guest demo account.",
    longDesc:
      "Full-stack engineering collaboration platform with a React 19/Vite SPA and an Express REST API. Session auth uses Passport.js local strategy with bcrypt and PostgreSQL-backed session storage. Features include a ranked activity feed (likes, comments, recency scoring), project pages with build log updates, open-role recruitment with accept/reject workflow, skill-based search with ILIKE filters, direct messaging threads, and object-level authorization (owner/admin/member). SPA routing is implemented with the Browser History API. Deployed on Render with a Neon PostgreSQL database.",
    repo: "https://github.com/rayymondf/Posting_Platform",
    demo: "https://posting-platform.onrender.com/",
  },
  {
    kind: "software",
    name: "Lingo: Chrome Translator",
    image: "/lingo-ext.png",
    stack: ["JavaScript", "Manifest V3", "Chrome Side Panel API", "Chrome Storage API", "DeepL API"],
    shortDesc:
      "Chrome extension that opens a translation workspace in the native Side Panel. Translates via DeepL, supports a dynamic language list, and persists draft text, language selection, and history with Chrome Storage.",
    longDesc:
      "Chrome extension built with Manifest V3 that surfaces a translation workspace in Chrome's native Side Panel. A background service worker registers the panel on icon click. Translation is handled via the DeepL Free API (POST /v2/translate), with a dynamic language list fetched from /v2/languages and a built-in fallback if the request fails. Draft text, the last selected language, and recent translation history are persisted with the Chrome Storage API. No build step or npm dependencies. Published on the Chrome Web Store.",
    repo: "https://github.com/rayymondf/Lingo_Seamless_Language_Translator",
    demo: "https://chromewebstore.google.com/detail/lingo-language-translator/okfkakjgiocfbejhmlpfmlbgjgdkddbl",
  },
  {
    kind: "software",
    name: "Todo List App",
    image: "/todo-app.png",
    stack: ["HTML5", "CSS3", "Vanilla JavaScript", "localStorage"],
    shortDesc:
      "Browser-based task manager with a strict three-layer architecture, monthly calendar view, live search and filters, and full accessibility support. No framework or build step.",
    longDesc:
      "Browser-based task manager with no framework or build step. Implements a strict three-layer architecture: a pure TodoModel layer (no DOM access) handling all CRUD and query logic, a Storage module for localStorage serialization, and an App layer managing rendering and event delegation. Features a monthly calendar view that plots todos by due date alongside a flat list view with live search, filter (all/active/completed/overdue), and sort (date, priority, A-Z). Todos support title, description, due date, priority, comma-separated tags, and repeat intervals. Fully accessible with ARIA roles, keyboard navigation, and focus management.",
    repo: "https://github.com/rayymondf/Todo-List-Project",
    demo: "https://rayymondf.github.io/Todo-List-Project/",
  },
  {
    kind: "software",
    name: "Java 8-Ball Pool Game",
    image: "/pool-game.png",
    stack: ["Java", "Java Swing", "2D Physics", "OOP"],
    shortDesc:
      "Two-player 8-ball billiards game in Java Swing with custom physics: per-tick velocity integration, elastic collisions, friction, cushion bounce, pocket detection, and full rule enforcement.",
    longDesc:
      "Two-player 8-ball billiards game in Java Swing with a custom Swing Timer game loop. Physics built from scratch: per-tick velocity integration, friction, elastic ball-ball collision with overlap separation, cushion bounce with energy loss, and sub-step detection to prevent tunnelling. Pocket detection uses a distance threshold checked before rail bounce. Full rule enforcement: open-table start, automatic solids/stripes assignment, scratch detection, ball-in-hand, and win/loss conditions.",
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
    stack: ["Altium Designer", "INA180", "PCB Design", "Analog Electronics", "Embedded Systems", "UW Orbital"],
    shortDesc:
      "Current-sense breakout board for UW Orbital's EPS. Low-side topology with an INA180B3IDBVR (100 V/V gain) and 10mO shunt resistor outputs a voltage proportional to load current, readable by an MCU ADC.",
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
      "Full autonomous navigation stack for a simulated differential-drive robot. Four ROS2 C++ nodes: LiDAR Costmap, global Map Memory, A* Planner, and Pure Pursuit Controller, visualized live in Foxglove Studio.",
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

// Section wrapper

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="py-14 px-6 bg-[#f5f5f0] dark:bg-[#0a0a0a]">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xs font-semibold tracking-widest text-black/40 dark:text-white/40 uppercase mb-6">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

// Modal Shell

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

// Software Project Modal

function SoftwareProjectModal({ project, onClose }: { project: SoftwareProject; onClose: () => void }) {
  return (
    <ModalShell onClose={onClose}>
      <h2 className="text-black dark:text-white font-semibold text-lg mb-4">{project.name}</h2>
      <div className="rounded-xl overflow-hidden border border-black/10 dark:border-white/10 mb-6">
        <Image src={project.image} alt={project.name} width={800} height={500} className="w-full h-auto object-cover" />
      </div>
      <p className="text-sm text-black/70 dark:text-white/65 leading-relaxed mb-5">{project.longDesc}</p>
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.stack.map((s) => (
          <span key={s} className="px-2 py-0.5 text-[10px] bg-black/5 dark:bg-white/8 border border-black/10 dark:border-white/12 rounded-full text-black/50 dark:text-white/50">
            {s}
          </span>
        ))}
      </div>
      <div className="flex gap-3">
        <a href={project.repo} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white border border-black/15 dark:border-white/15 hover:border-black/35 dark:hover:border-white/35 rounded-full px-3 py-1.5 transition-colors">
          {GITHUB_SVG} Repository
        </a>
        {project.demo && (
          <a href={project.demo} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white border border-black/15 dark:border-white/15 hover:border-black/35 dark:hover:border-white/35 rounded-full px-3 py-1.5 transition-colors">
            <ExternalLink size={13} /> Live Demo
          </a>
        )}
      </div>
    </ModalShell>
  );
}

// PCB Modal

function PCBModal({ onClose }: { onClose: () => void }) {
  return (
    <ModalShell onClose={onClose}>
      <h2 className="text-black dark:text-white font-semibold text-lg mb-1">Low-Side Current Sensing PCB</h2>
      <p className="text-black/45 dark:text-white/45 text-xs mb-5">UW Orbital · Altium Designer · Hardware Design</p>

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

      <div className="space-y-4 text-sm text-black/70 dark:text-white/65 leading-relaxed">
        <p>
          A low-side current-sense breakout board designed for UW Orbital&apos;s Electrical Power System (EPS). The board measures DC bus current on a 5V rail over a 0-200mA range and outputs a proportional analog voltage readable by a microcontroller ADC. The same sensing topology is used on Orbital&apos;s flight CubeSat hardware.
        </p>
        <p>
          Microcontrollers read voltage through an ADC, not current directly. To measure current, a small <span className="text-black dark:text-white font-medium">shunt resistor</span> is placed in series with the load and Ohm&apos;s Law (V = IR) is applied to infer current from the measured voltage drop. The challenge is signal amplitude: at 200mA through a 10mO shunt, the differential voltage is only 2mV, which falls below the ~4mV resolution of a typical 8-bit ADC. A current-sense amplifier is required to bring the signal into a usable range before digitisation.
        </p>
        <p>
          This board uses a <span className="text-black dark:text-white font-medium">low-side sensing topology</span>, where the shunt resistor is placed between the load return path and ground. Both amplifier inputs operate near ground potential, which avoids the high common-mode voltage present in high-side configurations and simplifies the amplifier requirements. The trade-off is a small ground offset under load, which is acceptable for this application.
        </p>
        <div className="border border-black/8 dark:border-white/10 rounded-xl p-4 bg-black/3 dark:bg-white/4 space-y-3">
          <p className="text-[11px] font-semibold text-black/50 dark:text-white/50 uppercase tracking-widest">Signal Path</p>
          <p className="text-xs text-black/60 dark:text-white/60 leading-relaxed">
            Load supply &rarr; R1 (shunt) &rarr; load return &rarr; GND. The INA180&apos;s IN+ and IN- pins connect across R1, measuring the differential voltage. The amplified output V_OUT = Gain x I_LOAD x R_SENSE is fed to an MCU ADC. C1 (100nF) decouples the VS supply pin. P1 breaks out V_LOAD, 3V3, V_OUT, and GND for external connection.
          </p>
        </div>
        <p>
          The amplifier IC is the <span className="text-black dark:text-white font-medium">INA180B3IDBVR</span> (Texas Instruments), a precision single-channel current-sense amplifier in a SOT-23-5 package. Key specifications:
        </p>
        <ul className="text-xs text-black/60 dark:text-white/60 space-y-1 pl-4 list-disc">
          <li>Fixed gain: <span className="text-black dark:text-white font-medium">100 V/V</span> (A3 variant), amplifies the 2mV shunt signal at 200mA to 200mV</li>
          <li>Supply voltage (VS): <span className="text-black dark:text-white font-medium">2.7V to 5.5V</span>, operated at 3.3V on this board</li>
          <li>Common-mode input range: <span className="text-black dark:text-white font-medium">-0.2V to +26V</span>, independent of VS</li>
          <li>Gain error: plus or minus 1% max; bandwidth: 210kHz; quiescent current: 260uA max</li>
          <li>Operating temperature: -40C to +125C</li>
        </ul>
        <p>
          The shunt resistor is a <span className="text-black dark:text-white font-medium">WSL0603R0100FEA</span> (Vishay), 10mO, 1W in an 0603 package. The bypass capacitor is a <span className="text-black dark:text-white font-medium">C0603C104K8RACTU</span> (KEMET), 100nF X7R ceramic placed close to the INA180 VS pin. The connector is a <span className="text-black dark:text-white font-medium">MTSW-104-07-T-S-170</span> (Mill-Max), a 4-pin 2.54mm through-hole header exposing V_LOAD, 3V3, V_OUT, and GND.
        </p>
        <p>
          Schematic and PCB layout completed in <span className="text-black dark:text-white font-medium">Altium Designer</span> via UW Orbital&apos;s shared Altium 365 workspace. C1 placed within 1mm of the VS pin to minimise supply inductance, and a GND copper pour on both layers is stitched with vias.
        </p>
        <div className="border border-black/8 dark:border-white/10 rounded-xl p-4 bg-black/3 dark:bg-white/4">
          <p className="text-[11px] font-semibold text-black/50 dark:text-white/50 uppercase tracking-widest mb-2">Bill of Materials</p>
          <ul className="space-y-1 text-xs text-black/60 dark:text-white/60">
            <li><span className="text-black dark:text-white font-medium">U1</span>: INA180B3IDBVR, 100 V/V current-sense amplifier, SOT-23-5 (Texas Instruments)</li>
            <li><span className="text-black dark:text-white font-medium">R1</span>: WSL0603R0100FEA, 10mO 1W shunt resistor, 0603 (Vishay)</li>
            <li><span className="text-black dark:text-white font-medium">C1</span>: C0603C104K8RACTU, 100nF X7R bypass capacitor, 0603 (KEMET)</li>
            <li><span className="text-black dark:text-white font-medium">P1</span>: MTSW-104-07-T-S-170, 4-pin 2.54mm through-hole header (Mill-Max)</li>
          </ul>
        </div>
      </div>
    </ModalShell>
  );
}

// WATonomous Modal

function WATonomousModal({ onClose }: { onClose: () => void }) {
  return (
    <ModalShell onClose={onClose}>
      <h2 className="text-black dark:text-white font-semibold text-lg mb-1">Autonomous Robot Navigation Stack</h2>
      <p className="text-black/45 dark:text-white/45 text-xs mb-5">WATonomous ASD · ROS2 · C++ · Gazebo · Foxglove</p>

      <div className="rounded-xl overflow-hidden border border-black/10 dark:border-white/10 mb-6">
        <Image src="/wato-asd.png" alt="Foxglove visualization of autonomous navigation" width={800} height={500} className="w-full h-auto object-cover" />
        <p className="text-center text-[10px] text-black/40 dark:text-white/40 py-1.5">Foxglove: live costmap, inflated obstacles, and A* path overlaid on the occupancy grid</p>
      </div>

      <div className="space-y-4 text-sm text-black/70 dark:text-white/65 leading-relaxed">
        <p>
          Built a full autonomous navigation stack for a simulated differential-drive robot in <span className="text-black dark:text-white font-medium">Gazebo</span> for WATonomous&apos;s Autonomous Software Division. The system enables the robot to navigate to arbitrary goal points while avoiding static obstacles, written entirely from scratch in <span className="text-black dark:text-white font-medium">C++ with ROS2 Humble</span>.
        </p>
        <div className="border border-black/8 dark:border-white/10 rounded-xl p-4 bg-black/3 dark:bg-white/4 space-y-3">
          <p className="text-[11px] font-semibold text-black/50 dark:text-white/50 uppercase tracking-widest">Node Architecture</p>
          <ul className="space-y-2 text-xs text-black/60 dark:text-white/60">
            <li><span className="text-black dark:text-white font-medium">Costmap:</span> Subscribes to /lidar (LaserScan). Converts polar scan data to Cartesian grid coordinates, marks occupied cells, and applies a distance-weighted inflation kernel. Publishes nav_msgs::OccupancyGrid to /costmap.</li>
            <li><span className="text-black dark:text-white font-medium">Map Memory:</span> Fuses incoming local costmaps into a persistent global map using odometry from /odom/filtered. Transforms each costmap into the world frame and merges via linear fusion, updating only when the robot has displaced beyond a distance threshold.</li>
            <li><span className="text-black dark:text-white font-medium">Planner:</span> Runs <span className="text-black dark:text-white font-medium">A*</span> on the global occupancy grid to compute a collision-free path to a user-specified goal. Implements a two-state machine (idle/tracking) and replans on map updates or timeout. Publishes nav_msgs::Path.</li>
            <li><span className="text-black dark:text-white font-medium">Control:</span> Implements <span className="text-black dark:text-white font-medium">Pure Pursuit</span> to track the planned path. Selects a lookahead waypoint, computes arc curvature, and outputs geometry_msgs::Twist velocity commands to /cmd_vel at 10 Hz.</li>
          </ul>
        </div>
        <p>
          The entire stack runs inside <span className="text-black dark:text-white font-medium">Docker</span> via WATonomous&apos;s monorepo infrastructure. Real-time state was visualized in <span className="text-black dark:text-white font-medium">Foxglove Studio</span> over a WebSocket bridge, rendering the live occupancy grid, inflated obstacle halos, and A* path as a polyline.
        </p>
        <div className="border border-black/8 dark:border-white/10 rounded-xl p-4 bg-black/3 dark:bg-white/4">
          <p className="text-[11px] font-semibold text-black/50 dark:text-white/50 uppercase tracking-widest mb-2">Stack</p>
          <ul className="space-y-1 text-xs text-black/60 dark:text-white/60">
            <li><span className="text-black dark:text-white font-medium">Language:</span> C++17 (rclcpp)</li>
            <li><span className="text-black dark:text-white font-medium">Middleware:</span> ROS2 Humble (DDS pub/sub, typed messages)</li>
            <li><span className="text-black dark:text-white font-medium">Simulation:</span> Gazebo (differential-drive robot, laser scanner, camera)</li>
            <li><span className="text-black dark:text-white font-medium">Visualization:</span> Foxglove Studio (WebSocket, 3D + raw message panels)</li>
            <li><span className="text-black dark:text-white font-medium">Infrastructure:</span> Docker Compose, WATonomous monorepo (watod CLI)</li>
            <li><span className="text-black dark:text-white font-medium">Algorithms:</span> A* (grid search, Euclidean heuristic), Pure Pursuit (geometric path tracking)</li>
          </ul>
        </div>
      </div>

      <div className="mt-6">
        <a href="https://youtu.be/jMNTflrencM" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white border border-black/15 dark:border-white/15 hover:border-black/35 dark:hover:border-white/35 rounded-full px-3 py-1.5 transition-colors w-fit">
          <ExternalLink size={13} /> Demo Video
        </a>
      </div>
    </ModalShell>
  );
}

// Shared card link buttons

function CardLinks({ repo, demo }: { repo: string | null; demo: string | null }) {
  return (
    <div className="flex items-center gap-2">
      {repo && (
        <a href={repo} target="_blank" rel="noopener noreferrer" aria-label="Repository"
          className="text-black/35 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors">
          {GITHUB_SVG}
        </a>
      )}
      {demo && (
        <a href={demo} target="_blank" rel="noopener noreferrer" aria-label="Live demo"
          className="text-black/35 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors">
          <ExternalLink size={15} />
        </a>
      )}
    </div>
  );
}

// Project Card (grid cell)

function ProjectCard({
  project,
  index,
  onLearnMore,
}: {
  project: Project;
  index: number;
  onLearnMore: () => void;
}) {
  const isHardware = project.kind === "hardware";
  return (
    <motion.div
      variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={index}
      className="border border-black/10 dark:border-white/12 rounded-xl overflow-hidden flex flex-col hover:border-black/25 dark:hover:border-white/25 transition-colors"
    >
      {/* Image */}
      <div className="relative w-full bg-black" style={{ aspectRatio: "16/9" }}>
        <Image
          src={project.image}
          alt={project.name}
          fill
          className={`object-cover${isHardware && project.image === "/wato-asd.png" ? "" : ""}`}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2.5 p-4 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-black dark:text-white font-semibold text-sm leading-snug">{project.name}</h3>
            {isHardware && (
              <p className="text-black/45 dark:text-white/45 text-xs mt-0.5">{(project as HardwareProject).subtitle}</p>
            )}
          </div>
          <CardLinks repo={project.repo} demo={project.demo} />
        </div>

        <p className="text-black/60 dark:text-white/60 text-xs leading-relaxed flex-1">{project.shortDesc}</p>

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

        <button
          onClick={onLearnMore}
          className="self-start text-xs text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white border border-black/15 dark:border-white/15 hover:border-black/35 dark:hover:border-white/35 rounded-full px-3 py-1 transition-colors mt-1"
        >
          Learn More
        </button>
      </div>
    </motion.div>
  );
}

// Page

export default function Home() {
  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  const [pcbModalOpen, setPcbModalOpen] = useState(false);
  const [watoModalOpen, setWatoModalOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<SoftwareProject | null>(null);

  const allProjects: Project[] = [...softwareProjects, ...hardwareProjects];

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section id="hero" className="relative min-h-screen px-6 pt-36 pb-14 bg-[#f5f5f0] dark:bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000006_1px,transparent_1px),linear-gradient(to_bottom,#00000006_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:32px_32px]" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={0}
            className="text-sm text-black/40 dark:text-white/50 mb-3">
            Hi, I&apos;m
          </motion.p>

          <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1}
            className="text-5xl md:text-7xl font-bold text-black dark:text-white mb-5 leading-tight">
            Raymond Fang
          </motion.h1>

          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2}
            className="text-base md:text-lg text-black/70 dark:text-white/75 mb-3 max-w-2xl leading-relaxed">
            Electrical Engineering student at the University of Waterloo with interests in embedded systems, autonomous systems, and full-stack software development. I build practical, reliable solutions across hardware and software.
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
                    <span key={skill}
                      className="px-2.5 py-1 text-xs bg-black/6 dark:bg-white/8 border border-black/10 dark:border-white/12 rounded-full text-black/65 dark:text-white/65">
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
                  <Image
                    src={e.logo}
                    alt={e.company}
                    width={80}
                    height={80}
                    className={`object-contain w-full h-full${e.logo === "/robotics.webp" ? " scale-[1.25] object-cover" : ""}`}
                  />
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

      {/* Projects - 2-per-row grid */}
      <Section id="projects" title="Projects">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {allProjects.map((p, i) => (
            <ProjectCard
              key={p.name}
              project={p}
              index={i}
              onLearnMore={() => {
                if (p.kind === "software") {
                  setActiveProject(p as SoftwareProject);
                } else if ((p as HardwareProject).modalKey === "pcb") {
                  setPcbModalOpen(true);
                } else {
                  setWatoModalOpen(true);
                }
              }}
            />
          ))}
        </div>
      </Section>

      <AnimatePresence>
        {activeProject && <SoftwareProjectModal project={activeProject} onClose={() => setActiveProject(null)} />}
        {pcbModalOpen && <PCBModal onClose={() => setPcbModalOpen(false)} />}
        {watoModalOpen && <WATonomousModal onClose={() => setWatoModalOpen(false)} />}
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
