"use client";

import { motion } from "framer-motion";
import { Mail, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────

const skills = {
  Languages: ["C", "C++", "Python", "JavaScript", "TypeScript", "Java", "SQL", "Ruby", "MATLAB"],
  "Frontend & Backend": ["React", "Next.js", "Node.js", "Express", "FastAPI", "Tailwind CSS", "Vite"],
  Databases: ["PostgreSQL", "MySQL", "SQL Server"],
  "Embedded & Hardware": ["STM32", "ESP32", "Arduino", "FPGA", "Verilog", "Altium", "KiCad", "CAN", "I2C", "SPI"],
};

const education = [
  {
    school: "University of Waterloo",
    degree: "BASc, Electrical Engineering (Co-op) · GPA: 3.8/4.0",
    period: "Sept 2025 — Apr 2030",
    location: "Waterloo, ON",
  },
];

// Bold keywords wrapped in <b> tags — rendered via dangerouslySetInnerHTML
const experience = [
  {
    company: "University of Waterloo Formula Electric",
    role: "Electrical & Firmware Engineer",
    period: "Sept 2025 — Present",
    location: "Waterloo, ON",
    bullets: [
      "Developed C/C++ HIL test utilities for BMU, VCU, and PDU firmware, simulating sensor inputs, ADC readings, fault states, and CAN messages across 3 vehicle control modules.",
      "Implemented pre-HV startup firmware logic for brake/throttle inputs, sensor monitoring, CAN validation, and fault handling, improving low-voltage readiness before vehicle integration.",
      "Built CAN log analysis tools to parse vehicle data, visualize signal trends, and export CSVs for firmware debugging, reducing manual log review time by 30%.",
    ],
  },
  {
    company: "Einfolab Inc.",
    role: "Data Engineer · Co-op",
    period: "Jan 2026 — Apr 2026",
    location: "Richmond Hill, ON",
    bullets: [
      "Developed SQL Server and MySQL databases for clinical, dental imaging, finance, and administrative systems by writing queries, views, validation scripts, and data fixes, improving reporting accuracy to 98%.",
      "Configured Windows Server and workstation environments for healthcare clients, including RDP access, ODBC connections, mapped drives, RAID/NAS backups, and user permissions, reducing setup time by 35%.",
      "Automated healthcare data cleaning and reconciliation workflows with Python, pandas, and scheduled scripts, reducing recurring verification tasks from 2 hours to under 30 minutes.",
    ],
  },
  {
    company: "Middlefield Collegiate Institute — Robotics Club",
    role: "Hardware Systems Lead",
    period: "Oct 2023 — Jun 2025",
    location: "Markham, ON",
    bullets: [
      "Designed an RC Mars rover with a six-wheel drivetrain, ESP32 motor controller, camera stream, and custom chassis, enabling reliable traversal over uneven terrain.",
      "Programmed embedded motor-control firmware in C++/Arduino to map joystick input to PWM drive and steering signals, improving steering repeatability by 40%.",
      "Integrated ultrasonic sensors, IMU telemetry, and OpenCV-based camera feedback to detect obstacles, stabilize driving, and trigger fail-safe stops during demos.",
    ],
  },
];

const projects = [
  {
    name: "Social Posting Dashboard",
    stack: ["React", "Vite", "Node.js", "Express", "PostgreSQL", "Passport.js"],
    description: "Full-stack social app with user registration, login, profile pages, posts, likes, and comments. REST API routes via Express, session-based auth with Passport.js and bcrypt, backed by PostgreSQL on Neon and deployed on Render.",
    repo: "https://github.com/rayymondf/Posting_Dashboard_Project",
    demo: "https://posting-dashboard-project.onrender.com/",
  },
  {
    name: "Lingo — Chrome Translator",
    stack: ["JavaScript", "Manifest V3", "DeepL API", "Chrome APIs"],
    description: "Chrome extension for in-browser translation with saved history and language preferences. Integrated the DeepL API with async Fetch, input validation, rate-limit handling, and Chrome localStorage for persistence. Published on the Chrome Web Store.",
    repo: "https://github.com/rayymondf/Lingo_Seamless_Language_Translator",
    demo: "https://chromewebstore.google.com/detail/lingo-language-translator/okfkakjgiocfbejhmlpfmlbgjgdkddbl",
  },
  {
    name: "Todo List App",
    stack: ["HTML", "CSS", "Vanilla JavaScript", "LocalStorage"],
    description: "Browser-based task manager with project organisation, priority/due-date sorting, and full localStorage persistence — built with vanilla JavaScript, no framework.",
    repo: "https://github.com/rayymondf/Todo-List-Project",
    demo: "https://rayymondf.github.io/Todo-List-Project/",
  },
  {
    name: "Java 8-Ball Pool Game",
    stack: ["Java", "Java Swing", "2D Physics", "OOP"],
    description: "Two-player pool game built with Java Swing, featuring a custom game loop, mouse controls, and 2D physics — velocity, friction, cushion bounces, pocket detection, and ball-to-ball collisions. Full rule enforcement for solids/stripes, scratches, and fouls.",
    repo: "https://github.com/rayymondf/Java-Project-Billards-Game",
    demo: null,
  },
];

// ─── Section wrapper ──────────────────────────────────────────────────────────

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="py-14 px-6 bg-[#f5f5f0] dark:bg-[#0a0a0a]">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="text-xs font-semibold tracking-widest text-black/40 dark:text-white/40 uppercase mb-6"
        >
          {title}
        </motion.h2>
        {children}
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <section id="hero" className="relative min-h-screen px-6 pt-36 pb-24 bg-[#f5f5f0] dark:bg-[#0a0a0a]">
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

          {/* About paragraph in hero */}
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2}
            className="text-base md:text-lg text-black/70 dark:text-white/75 mb-3 max-w-2xl leading-relaxed">
            Electrical Engineering student at the University of Waterloo with interests in software development, embedded systems, and hardware. I enjoy building practical, reliable solutions that connect technical ideas with real-world applications.
          </motion.p>

          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={3}
            className="text-sm text-black/50 dark:text-white/50 mb-8 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
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
              Resume ↗
            </a>
          </motion.div>

          {/* Skills */}
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

      {/* ── Education ── */}
      <Section id="education" title="Education">
        {education.map((e, i) => (
          <motion.div key={e.school} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
            className="border border-black/10 dark:border-white/12 rounded-xl p-6">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h3 className="text-black dark:text-white font-semibold">{e.school}</h3>
                <p className="text-black/60 dark:text-white/60 text-sm mt-1">{e.degree}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-black/45 dark:text-white/45 text-xs">{e.period}</p>
                <p className="text-black/45 dark:text-white/45 text-xs mt-1">{e.location}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </Section>

      {/* ── Experience ── */}
      <Section id="experience" title="Experience">
        <div className="space-y-4">
          {experience.map((e, i) => (
            <motion.div key={e.company} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
              className="border border-black/10 dark:border-white/12 rounded-xl p-6">
              <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
                <div>
                  <h3 className="text-black dark:text-white font-semibold">{e.company}</h3>
                  <p className="text-black/60 dark:text-white/60 text-sm mt-1">{e.role}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-black/45 dark:text-white/45 text-xs">{e.period}</p>
                  <p className="text-black/45 dark:text-white/45 text-xs mt-1">{e.location}</p>
                </div>
              </div>
              <ul className="space-y-2">
                {e.bullets.map((b, j) => (
                  <li key={j} className="text-black/65 dark:text-white/65 text-sm flex gap-2">
                    <span className="text-black/30 dark:text-white/30 mt-1.5 shrink-0">—</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ── Projects ── */}
      <Section id="projects" title="Projects">
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((p, i) => (
            <motion.div key={p.name} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
              className="border border-black/10 dark:border-white/12 rounded-xl p-5 flex flex-col gap-3 hover:border-black/25 dark:hover:border-white/25 transition-colors">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-black dark:text-white font-semibold text-sm leading-snug">{p.name}</h3>
                <div className="flex gap-2 shrink-0">
                  <a href={p.repo} target="_blank" rel="noopener noreferrer" aria-label="Repository"
                    className="text-black/35 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors">
                    <GithubIcon size={15} />
                  </a>
                  {p.demo && (
                    <a href={p.demo} target="_blank" rel="noopener noreferrer" aria-label="Live demo"
                      className="text-black/35 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors">
                      <ExternalLink size={15} />
                    </a>
                  )}
                </div>
              </div>
              <p className="text-black/60 dark:text-white/60 text-xs leading-relaxed flex-1">{p.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <span key={s} className="px-2 py-0.5 text-[10px] bg-black/5 dark:bg-white/8 border border-black/10 dark:border-white/12 rounded-full text-black/50 dark:text-white/50">
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ── Contact ── */}
      <Section id="contact" title="Contact">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { label: "Personal Email", value: "rayymondf29@gmail.com", href: "mailto:rayymondf29@gmail.com", icon: <Mail size={16} /> },
            { label: "School Email", value: "r53fang@uwaterloo.ca", href: "mailto:r53fang@uwaterloo.ca", icon: <Mail size={16} /> },
            { label: "LinkedIn", value: "raymond-fang-214192331", href: "https://www.linkedin.com/in/raymond-fang-214192331", icon: <LinkedinIcon size={16} /> },
            { label: "GitHub", value: "rayymondf", href: "https://github.com/rayymondf", icon: <GithubIcon size={16} /> },
          ].map(({ label, value, href, icon }, i) => (
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
          Raymond Fang · {new Date().getFullYear()}
        </div>
      </footer>
    </>
  );
}
