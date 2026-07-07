// all site content lives here. sections render this data.

export const cyclingPhrases = [
  "pick things up",
  "walk in sim",
  "not catch fire",
  "talk to hardware",
  "grasp at 90%",
];

export const skills = [
  "python",
  "typescript",
  "javascript",
  "c/c++",
  "sql",
  "react",
  "next.js",
  "node.js",
  "express",
  "fastapi",
  "rest apis",
  "pytorch",
  "scikit-learn",
  "hugging face",
  "pandas",
  "numpy",
  "mlflow",
  "weights & biases",
  "ros 2",
  "isaac lab",
  "gazebo",
  "opencv",
  "micro-ros",
  "foxglove",
  "stm32",
  "freertos",
  "can-fd",
  "altium",
  "docker",
  "kubernetes",
  "aws",
  "github actions",
  "postgres",
];

export type ExperienceEntry = {
  company: string;
  role: string;
  period: string;
  logo: string;
  logoClass?: string;
  bullets: string[];
};

export const experience: ExperienceEntry[] = [
  {
    company: "watonomous",
    role: "robotics & ml · humanoid autonomy · design team",
    period: "oct 2025 – now",
    logo: "/watonomous_logo.jpg",
    bullets: [
      "trained rl + imitation-learning policies in Isaac Lab + PyTorch, 60+ runs tracked in Weights & Biases; reward-shaping sweeps cut convergence time 40%",
      "validated the top policies on the physical humanoid: sim → real hardware, not just sim numbers",
      "wrote the firmware underneath: STM32 FOC motor control + Kalman-filtered IMU/encoder fusion for joint-angle tracking, wired into the ROS 2 control stack",
      "PCA + inverse-kinematics pipeline on a 21-DOF hand: 15 finger-joint commands → 7 synergy controls, shrinking the policy's action space and giving operators a low-dim teleop interface",
    ],
  },
  {
    company: "einfolab",
    role: "data engineering co-op",
    period: "jan 2026 – apr 2026",
    logo: "/einfolab.webp",
    bullets: [
      "dockerized python pipeline (pandas + NumPy) ingesting, validating, and reconciling 10k+ records/month across 4 domains (medical, dental, financial, admin), with retries, alerting, and pytest CI",
      "caught what sql rules missed: scikit-learn Isolation Forest, 92% precision on a labeled validation set",
      "FastAPI + LLM (structured outputs) auto-classifying flagged errors by type: manual review 2h → 30min at 91% accuracy",
      "shipped versioned FastAPI endpoints exposing run status, error logs, and record-level audit trails, real-time data-quality visibility for stakeholders",
    ],
  },
  {
    company: "uw formula electric",
    role: "software & firmware · design team",
    period: "sep 2025 – apr 2026",
    logo: "/waterlooformulaelectric_logo.jpg",
    bullets: [
      "live telemetry dashboard (React + Next.js + TypeScript + Tailwind) on Kubernetes with GitHub Actions CI/CD, 5000+ CAN frames per test over WebSocket",
      "python pipeline (pandas + NumPy) parsing + storing CAN telemetry in TimescaleDB across 30+ tests: post-test analysis hours → minutes",
      "scikit-learn anomaly model on battery cell telemetry: 94% precision flagging voltage + thermal outliers",
      "embedded c/c++ firmware for the battery, vehicle control, and power distribution units (BMU / VCU / PDU)",
      "HIL test rig in c++/python with pytest: simulate sensor faults + CAN dropouts, catch integration bugs before on-vehicle testing",
    ],
  },
  {
    company: "robotics team",
    role: "embedded systems lead",
    period: "oct 2023 – jun 2025",
    logo: "/robotics.webp",
    logoClass: "scale-125 object-cover",
    bullets: [
      "designed a six-wheel RC mars rover: ESP32 motor controller, custom chassis, live camera stream over wi-fi",
      "c++/arduino firmware mapping joystick input to PWM drive + steering signals; 40% improvement in steering repeatability",
      "fused ultrasonic + IMU + OpenCV for obstacle detection, driving stabilization, and automatic fail-safe stops",
    ],
  },
];

export type ModalSection = {
  title: string;
  // paragraphs, bullet items with optional bold lead, or label/value rows
  items: { lead?: string; text: string }[];
  kind: "bullets" | "rows";
};

export type Project = {
  slug: string;
  name: string;
  subtitle?: string;
  image: string;
  imageAlt: string;
  oneLiner: string;
  chips: string[];
  repo: string | null;
  demo: string | null;
  modal: {
    tagline: string;
    intro: string;
    images?: { src: string; caption: string }[];
    imageCaption?: string;
    sections: ModalSection[];
    tags: string[];
  };
};

export const projects: Project[] = [
  {
    slug: "buildboard",
    name: "buildboard",
    image: "/buildboard-hero.png",
    imageAlt: "BuildBoard project feed",
    oneLiner:
      "a place for student engineers to post builds, recruit teammates, and argue about stacks. react 19 + express + postgres, live on render.",
    chips: ["react 19", "express", "postgres", "passport.js"],
    repo: "https://github.com/rayymondf/Posting_Platform",
    demo: "https://posting-platform.onrender.com/",
    modal: {
      tagline: "full-stack web app · react 19 · node.js · postgresql · live on render",
      intro:
        "buildboard is a collaboration platform for student engineers, makers, and robotics teams. github is too code-focused, social media is too generic, so this combines project showcasing, structured build logs, skill-based recruitment, and dms into one product for technical builders.",
      sections: [
        {
          title: "how it works",
          kind: "bullets",
          items: [
            { lead: "project pages:", text: "each project gets a page with description, category, status, skill tags, and links. anyone can browse; only authenticated owners can edit." },
            { lead: "build logs:", text: "team members post milestone-tagged progress updates. others can comment and like individual updates." },
            { lead: "team recruitment:", text: "owners post open roles with required skills. users submit join requests; owners accept or reject in-platform." },
            { lead: "ranked feed:", text: "a sql-computed score (likes ×2 + comments ×3, decayed by age) surfaces the most active projects first." },
            { lead: "direct messaging:", text: "per-conversation dm threads between users." },
            { lead: "guest demo:", text: "a read-only demo account with seeded data lets anyone explore without registering." },
          ],
        },
        {
          title: "technical architecture",
          kind: "rows",
          items: [
            { lead: "frontend", text: "react 19 spa built with vite. browser history api for routing, no react router. sidebar on desktop, bottom tab bar on mobile." },
            { lead: "backend", text: "node.js + express rest api, 30+ routes. session-cookie auth with passport.js local strategy and bcrypt." },
            { lead: "authorization", text: "object-level permissions: owners get full control, admins manage members, members post updates, public reads only." },
            { lead: "database", text: "postgresql, 12 tables: projects, members, roles, join requests, updates, comments, likes, conversations, messages. parameterized queries throughout. hosted on neon." },
            { lead: "hosting", text: "server + static files on render, postgres on neon serverless." },
          ],
        },
      ],
      tags: ["react 19", "vite", "node.js", "express", "postgresql", "passport.js", "render", "neon"],
    },
  },
  {
    slug: "nav-stack",
    name: "autonomous robot nav stack",
    subtitle: "watonomous asd",
    image: "/wato-asd.png",
    imageAlt: "Foxglove visualization of costmap and planned path",
    oneLiner:
      "lidar → occupancy grid → a* → pure pursuit. four ros 2 nodes in c++17, simulated in gazebo, watched in foxglove.",
    chips: ["ros 2 humble", "c++17", "gazebo", "a*"],
    repo: "https://github.com/rayymondf/autonomous_robot",
    demo: "https://youtu.be/jMNTflrencM",
    modal: {
      tagline: "watonomous asd · ros 2 humble · c++17 · gazebo · docker",
      intro:
        "a modular navigation stack for a differential-drive robot in gazebo. four ros 2 nodes in c++17, each owning one stage of the pipeline: build a map from sensors, merge it into a persistent world model, plan a path, follow it with a feedback controller. everything runs in docker for reproducible sims.",
      imageCaption:
        "foxglove: live costmap, inflated obstacles, and a* planned path over the occupancy grid",
      sections: [
        {
          title: "how the pipeline works",
          kind: "bullets",
          items: [
            { lead: "1. costmap node:", text: "converts each incoming lidar scan into a 2d occupancy grid: free, occupied, or unknown. obstacles get inflated by a configurable radius so the planner keeps a safe distance automatically." },
            { lead: "2. map memory node:", text: "fuses successive local costmaps into one persistent global map, using wheel odometry to place new observations in the global frame as the robot moves." },
            { lead: "3. planner node (a*):", text: "searches the global map for the shortest collision-free path with a euclidean heuristic. replans when the goal changes or new obstacles block the route." },
            { lead: "4. controller node (pure pursuit):", text: "picks a lookahead point on the path, computes the turning radius to reach it, and publishes wheel velocities at 10 hz. lookahead distance is tunable, trading tracking accuracy for smoothness." },
          ],
        },
        {
          title: "infrastructure",
          kind: "rows",
          items: [
            { lead: "simulation", text: "gazebo simulates lidar, odometry, and physics. the robot publishes the same ros 2 topic types real hardware would, so the stack runs identically in sim and on a robot." },
            { lead: "visualization", text: "foxglove studio renders the raw scan, local costmap, global map, planned path, and pose estimate live." },
            { lead: "containerization", text: "runs in docker via watonomous's watod tooling, giving reproducible multi-container ros 2 environments across machines." },
          ],
        },
      ],
      tags: ["ros 2 humble", "c++17", "gazebo", "foxglove", "a*", "pure pursuit", "docker"],
    },
  },
  {
    slug: "lingo",
    name: "lingo",
    image: "/lingo-ext.png",
    imageAlt: "Lingo translation side panel",
    oneLiner:
      "translation in chrome's side panel so you never leave the page. manifest v3 + deepl, live on the chrome web store.",
    chips: ["javascript", "manifest v3", "deepl api"],
    repo: "https://github.com/rayymondf/Lingo_Seamless_Language_Translator",
    demo: "https://chromewebstore.google.com/detail/lingo-language-translator/okfkakjgiocfbejhmlpfmlbgjgdkddbl",
    modal: {
      tagline: "chrome extension · manifest v3 · deepl api · on the chrome web store",
      intro:
        "lingo puts a full translation workspace inside chrome's native side panel, no new tab, no leaving the page. published on the chrome web store. zero npm dependencies, zero build step: chrome loads it as static files.",
      sections: [
        {
          title: "how it works",
          kind: "bullets",
          items: [
            { lead: "side panel activation:", text: "a background service worker listens for the icon click and calls chrome.sidePanel.open(). the panel persists across page navigation." },
            { lead: "translation:", text: "on submit, a post request hits the deepl free api with the text and target language. if the language list fails to load, a built-in fallback keeps the dropdown usable." },
            { lead: "local persistence:", text: "chrome storage saves the current draft, last language, and recent translation history, all local to the browser." },
          ],
        },
        {
          title: "extension architecture",
          kind: "rows",
          items: [
            { lead: "manifest.json", text: "manifest v3 config: sidePanel + storage permissions, host permission for the deepl domain." },
            { lead: "service worker", text: "listens for the extension icon click and opens the side panel." },
            { lead: "panel.html + css", text: "the ui: input area, language dropdown, output, recent history." },
            { lead: "backendService.js", text: "all deepl api calls; restores drafts and history from chrome storage; saves each successful translation." },
            { lead: "languageSelector.js", text: "fetches supported languages from deepl, falls back to a hardcoded list if the request fails." },
          ],
        },
      ],
      tags: ["javascript", "manifest v3", "chrome side panel api", "chrome storage api", "deepl api"],
    },
  },
  {
    slug: "pcb",
    name: "current sensing pcb",
    subtitle: "uw orbital",
    image: "/pcb1.png",
    imageAlt: "Current sensing PCB layout",
    oneLiner:
      "turns a 2mV whisper across a shunt into something an adc can actually hear. altium, kelvin routing, uw orbital.",
    chips: ["altium", "ina180", "analog"],
    repo: null,
    demo: null,
    modal: {
      tagline: "uw orbital · altium designer · analog hardware",
      intro:
        "a current-sense breakout board for uw orbital's electrical power system. it measures current through a 5v rail by converting a tiny voltage drop across a shunt resistor into an output an mcu adc can sample directly.",
      images: [
        { src: "/pcb1.png", caption: "pcb layout" },
        { src: "/pcb2.png", caption: "schematic" },
      ],
      sections: [
        {
          title: "design overview",
          kind: "bullets",
          items: [
            { lead: "why low-side sensing:", text: "the shunt sits between the load's return path and ground, keeping both amplifier inputs near ground potential, avoiding high common-mode voltage headaches. simpler and more reliable for a low-voltage satellite rail." },
            { lead: "amplifier (INA180B3):", text: "fixed gain of 100 v/v. 200 mA through a 10 mΩ shunt is 2 mV differential, amplified to 200 mV, comfortably inside a 3.3v adc range." },
            { lead: "pcb layout:", text: "designed in altium on uw orbital's altium 365 workspace. via-stitched ground pours on both layers, bypass caps tight against the amplifier supply pins." },
          ],
        },
        {
          title: "specifications",
          kind: "rows",
          items: [
            { lead: "topology", text: "low-side, single-ended output" },
            { lead: "shunt", text: "10 mΩ" },
            { lead: "gain", text: "100 v/v (INA180B3IDBVR)" },
            { lead: "output range", text: "0–200 mV for 0–200 mA" },
            { lead: "supply", text: "3.3v, stm32 adc compatible" },
          ],
        },
      ],
      tags: ["altium designer", "INA180B3IDBVR", "pcb design", "analog electronics"],
    },
  },
  {
    slug: "todo",
    name: "todo calendar",
    image: "/todo-app2.png",
    imageAlt: "Todo calendar app",
    oneLiner:
      "a task manager with zero dependencies and zero build step. vanilla js and localstorage, that's it.",
    chips: ["vanilla js", "localstorage"],
    repo: "https://github.com/rayymondf/Todo-List-Project",
    demo: "https://rayymondf.github.io/Todo-List-Project/",
    modal: {
      tagline: "vanilla javascript · zero dependencies · no build step",
      intro:
        "a full task manager in plain html, css, and javascript, no frameworks, no npm, no build. open one html file in any browser. still manages a monthly calendar view, priorities, tags, filters, repeating tasks, overdue detection, and full keyboard accessibility.",
      sections: [
        {
          title: "features",
          kind: "bullets",
          items: [
            { lead: "calendar view:", text: "a 7-column monthly grid where each day shows chips for its tasks. clicking a day opens a modal listing everything due." },
            { lead: "list view:", text: "flat list with live search, sort by date or priority, filter by status or tag." },
            { lead: "task fields:", text: "title, description, due date, priority, comma-separated tags, and repeat interval (daily / weekly / monthly)." },
            { lead: "overdue detection:", text: "incomplete tasks past their due date get highlighted automatically." },
            { lead: "accessibility:", text: "aria roles, full keyboard navigation, focus management across all modals." },
          ],
        },
        {
          title: "code architecture",
          kind: "rows",
          items: [
            { lead: "TodoModel", text: "pure data layer, no dom access. all task crud, filtering, sorting, tag lookups, overdue checks." },
            { lead: "Storage", text: "localstorage under todo-app-v2, with normalization on load to survive schema changes." },
            { lead: "App", text: "connects model to dom with event delegation. renders calendar, list, and all three modal types. escape closes any open modal." },
          ],
        },
      ],
      tags: ["html5", "css3", "vanilla javascript", "localstorage"],
    },
  },
  {
    slug: "pool",
    name: "8-ball pool",
    image: "/pool-game.png",
    imageAlt: "Java 8-ball pool game",
    oneLiner:
      "two-player pool in java swing with hand-rolled physics: elastic collisions, friction, and balls that don't tunnel through each other.",
    chips: ["java", "swing", "2d physics"],
    repo: "https://github.com/rayymondf/Java-Project-Billards-Game",
    demo: null,
    modal: {
      tagline: "java swing · custom 2d physics engine · zero libraries",
      intro:
        "a two-player 8-ball game built entirely in java swing with a physics engine written from scratch. a swing timer drives the game loop; collisions, friction, rail bounces, and pocket detection are all 2d vector math computed every tick.",
      sections: [
        {
          title: "physics engine",
          kind: "bullets",
          items: [
            { lead: "ball-to-ball collisions:", text: "every pair checked per tick via center distance vs combined radii. on hit, velocities exchange along the collision normal (elastic collision math) and balls are separated so they don't stick." },
            { lead: "friction:", text: "velocity multiplied by a coefficient just under 1.0 each tick, giving smooth deceleration to a rest threshold." },
            { lead: "rail bounces:", text: "perpendicular velocity component reverses at the boundary with a small energy loss." },
            { lead: "continuous collision detection:", text: "at high speeds the physics step subdivides into sub-steps so fast balls can't pass through each other between frames." },
            { lead: "pocket detection:", text: "pocket checks run before rail checks, so balls near pockets fall in naturally instead of bouncing off the edge." },
          ],
        },
        {
          title: "game rules implemented",
          kind: "rows",
          items: [
            { lead: "open table", text: "groups unassigned at the start; the first legal pocket assigns solids vs stripes." },
            { lead: "turn system", text: "legal pocket continues the turn; miss or foul passes play." },
            { lead: "foul detection", text: "scratches, wrong-group-first contact, and no-rail shots all count." },
            { lead: "ball-in-hand", text: "after a foul, the opponent places the cue ball anywhere." },
            { lead: "8-ball rules", text: "pocket the 8 early and you lose; pocket it legally after clearing your group and you win." },
          ],
        },
      ],
      tags: ["java", "java swing", "2d physics", "oop"],
    },
  },
];

export const links = {
  github: "https://github.com/rayymondf",
  linkedin: "https://www.linkedin.com/in/raymond-fang-214192331",
  email: "mailto:rayymondf29@gmail.com",
  emailSchool: "mailto:r53fang@uwaterloo.ca",
  resume: "https://drive.google.com/file/d/1uauy1bFa25CLPNCLs2YwKsGFzsSqyO9H/view?usp=sharing",
};
