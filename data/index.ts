export const navItems = [
    { name: "About", link: "#about" },
    { name: "Skills", link: "#skills" },
    { name: "Projects", link: "#projects" },
    { name: "Experience", link: "#experience" },
    { name: "GitHub", link: "#github" },
    { name: "Contact", link: "#contact" },
  ];

  export const githubConfig = {
    username: "lhaase3",
    displayName: "Logan Haase",
    showPrivateContributions: false,
    featuredRepos: [
      "Greek_List",
      "satmon",
      "GET_server", 
      "caching_proxy",
      "rubiks-cube-AI"
    ]
  };
  
  export const gridItems = [
    {
      id: 1,
      title: "I am a software engineer with a passion for artificial intelligence, network systems and web development. I enjoy building scalable applications and solving complex problems.",
      description: "About",
      className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
      imgClassName: "w-full h-full",
      titleClassName: "justify-end",
      img: "prof-bg.jpg",
      spareImg: "",
    },
    /* majoring in comp sci at boulder*/
    {
      id: 2,
      title: "I am currently a Senior studying Computer Science at CU Boulder.",
      description: "Education",
      className: "lg:col-span-2 md:col-span-3 md:row-span-2",
      imgClassName: "",
      titleClassName: "justify-start",
      img: "",
      spareImg: "",
    },
    /* hobbies */
    {
      id: 3,
      // title: "I am constantly trying to improve.",
      description: "My Tech Stack",
      className: "lg:col-span-2 md:col-span-3 md:row-span-2",
      imgClassName: "",
      titleClassName: "justify-center",
      img: "",
      spareImg: "",
    },
    /* Leadership */
    {
      id: 4,
      title: "I am very active and enjoy hiking, surfing, and skiing.",
      description: "Personal Life",
      className: "lg:col-span-2 md:col-span-3 md:row-span-1",
      imgClassName: "",
      titleClassName: "justify-start",
      img: "grid.svg",
      spareImg: "prof-surf.png",
    },
    /* future goals */
    {
      id: 5,
      title: "I am looking for a full-time software engineering position in the Summer of 2026.",
      description: "The Inside Scoop",
      className: "md:col-span-3 md:row-span-2",
      imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
      titleClassName: "justify-center md:justify-start lg:justify-center",
      img: "b5.svg",
      spareImg: "grid.svg",
    },
    // {
    //   id: 6,
    //   title: "Do you want to start a project together?",
    //   description: "",
    //   className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    //   imgClassName: "",
    //   titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    //   img: "",
    //   spareImg: "",
    // },
  ];
  
  export const projects = [
    {
      id: 1,
      title: "Greek List: Web App for Fraternity Rush",
      des: "A platform connecting fraternities and potential new members, streamlining rush and recruitment management.",
      img: "greeklist-home.png",
      iconLists: ["next.svg", "tail.svg", "firebase.svg", "python.svg"],
      link: "https://greeklist.net",
      architecture: {
        description: "Full-stack web application built with Next.js and Firebase, deployed on Google Cloud Run and Vercel, designed for scalable fraternity recruitment management.",
        techStack: [
          { name: "Next.js 14", purpose: "Frontend framework with server-side rendering and client components" },
          { name: "Tailwind CSS", purpose: "Utility-first CSS framework for responsive UI design" },
          { name: "Flask (Python)", purpose: "Backend API handling business logic and integrations" },
          { name: "Firebase Firestore", purpose: "NoSQL database storing user, fraternity, and event data" },
          { name: "Firebase Auth", purpose: "User authentication, admin code management, and access control" },
          { name: "Firebase Storage", purpose: "Headshot and photo storage" },
          { name: "Google Cloud Run", purpose: "Serverless hosting for backend services" },
          { name: "Vercel", purpose: "Deployment platform for the Next.js frontend" },
          { name: "PayPal API", purpose: "Payment processing for rush registration fees" },
          { name: "SendGrid", purpose: "Transactional and mass email notifications" },
        ],
        features: [
          "Seamless rush registration with PayPal integration",
          "Fraternity and IFC admin dashboards",
          "Automated email communication (confirmation, invites, reminders)",
          "QR code event check-in and attendance tracking",
          "Pre-bid and bid management system",
          "Editable fraternity profile pages",
          "Mobile-friendly design for students on the go"
        ],
        challenges: [
          "Designing a Firestore schema to handle thousands of users, fraternities, and events",
          "Ensuring secure one-time use and multi-use admin codes",
          "Implementing real-time updates for user and fraternity dashboards",
          "Coordinating multiple external integrations (PayPal, SendGrid, Google APIs)",
          "Handling large-scale rush sign-ups and payments reliably"
        ]
      }
    },
    {
      id: 2,
      title: "SatMon: Satellite Telemetry & Anomaly Detection",
      des: "Backend-first platform that ingests satellite telemetry, stores it in Postgres, and flags anomalies with statistical and ML detectors. 🚀 Currently in active development.",
      img: "satmon.png",
      iconLists: ["python.svg", "fastapi.svg", "postgresql.svg", "dock.svg"],
      link: "https://github.com/lhaase3/satmon",
      architecture: {
        description: "Service-oriented backend that normalizes telemetry into PostgreSQL and exposes queryable APIs for channels, time windows, and anomaly windows. Detectors (rolling z-score, Isolation Forest) run over recent data and persist results for downstream dashboards and alerts. Currently expanding with real-time streaming capabilities and enhanced ML models.",
        techStack: [
          { name: "FastAPI", purpose: "REST API for /channels, /timeseries, /anomalies" },
          { name: "PostgreSQL", purpose: "Time-series storage for normalized telemetry" },
          { name: "SQLAlchemy", purpose: "ORM models and schema management" },
          { name: "Uvicorn", purpose: "ASGI server with hot reload for local dev" },
          { name: "Pandas", purpose: "Feature engineering and rolling stats" },
          { name: "scikit-learn", purpose: "Isolation Forest anomaly detection" },
          { name: "Docker", purpose: "Local Postgres container; future worker services" },
          { name: "Alembic (planned)", purpose: "Database migrations as schema evolves" },
          { name: "Telemanom / SatNOGS / CelesTrak (planned)", purpose: "Real mission/labeled feeds for ingest" }
        ],
        features: [
          "Normalized channel & telemetry tables (per-mission, per-sensor)",
          "CSV and mission-loader ingestion pipelines",
          "Anomaly detectors: rolling z-score + Isolation Forest with window grouping",
          "Query APIs for channels, time series, and anomaly windows (with method filter)",
          "Swagger docs for easy exploration",
          "Dockerized Postgres for consistent local setup",
          "🔧 In Development: Real-time streaming ingest and enhanced ML models"
        ],
        challenges: [
          "Designing a schema that scales across missions and thousands of channels",
          "Robust ingestion from heterogeneous sources and formats",
          "Tuning sensitivity vs. false positives per channel",
          "Efficient querying/windowing over long time ranges",
          "Future: streaming ingest, alert debouncing, and per-channel thresholds",
          "🚀 Current Focus: Implementing Kafka streaming and advanced anomaly detection"
        ]
      }
    },
    {
      id: 3,
      title: "Multithreaded Server Client",
      des: "This multithreaded server handles multiple clients making GET requests. It serves files with headers detailing file type, size, and status codes (e.g., 200, 404, 400).",
      img: "sc_hs.jpg",
      iconLists: ["c.svg"],
      link: "https://github.com/lhaase3/GET_server",
      architecture: {
        description: "High-performance HTTP server implementation in C using POSIX threads for concurrent client handling.",
        techStack: [
          { name: "C Programming", purpose: "Core server implementation for performance" },
          { name: "POSIX Threads", purpose: "Concurrent client request handling" },
          { name: "Socket Programming", purpose: "Network communication layer" },
          { name: "HTTP Protocol", purpose: "Standard web communication protocol" }
        ],
        features: [
          "Thread pool for efficient resource management",
          "HTTP 1.1 protocol compliance",
          "MIME type detection and proper headers",
          "Robust error handling (404, 400, 500)",
          "Configurable thread pool size",
          "Request logging and monitoring"
        ],
        challenges: [
          "Managing thread synchronization and avoiding race conditions",
          "Implementing efficient memory management",
          "Handling edge cases in HTTP parsing"
        ]
      }
    },
    {
      id: 4,
      title: "Mulithreaded HTTP Caching Proxy",
      des: "This proxy server caches files from a web server, reducing latency and bandwidth usage. It handles multiple clients and serves cached files efficiently.",
      img: "caching_prox.jpg",
      iconLists: ["c.svg"],
      link: "https://github.com/lhaase3/caching_proxy/tree/main",
      architecture: {
        description: "High-performance caching proxy server built in C that sits between clients and origin servers to optimize performance.",
        techStack: [
          { name: "C Programming", purpose: "Low-level performance optimization" },
          { name: "TCP/HTTP Sockets", purpose: "Client-server communication" },
          { name: "Hash Tables", purpose: "Efficient cache storage and retrieval" },
          { name: "LRU Algorithm", purpose: "Cache eviction strategy" }
        ],
        features: [
          "In-memory cache with configurable size limits",
          "LRU (Least Recently Used) eviction policy",
          "Cache hit/miss statistics tracking",
          "Concurrent client handling with threading",
          "HTTP request/response parsing",
          "Performance monitoring and logging"
        ],
        challenges: [
          "Implementing efficient cache eviction policies",
          "Managing memory constraints and preventing leaks",
          "Ensuring thread-safe cache operations",
          "Handling HTTP protocol complexities"
        ]
      }
    },
    {
      id: 5,
      title: "Rubiks Cube Solver",
      des: "This program allows the user to input 6 photos, or take 6 photos, of each side of a Rubiks Cube and solves it using a custom algorithm.",
      img: "rubiks-photo.png",
      iconLists: ["python-5.svg", "next.svg"],
      link: "https://github.com/lhaase3/rubiks-cube-AI",
      architecture: {
        description: "Computer vision and AI-powered Rubik's Cube solver that processes photos to detect cube state and generates optimal solving sequence.",
        techStack: [
          { name: "Python", purpose: "Core algorithm development and image processing" },
          { name: "OpenCV", purpose: "Computer vision and image analysis" },
          { name: "NumPy", purpose: "Numerical computations and array operations" },
          { name: "Next.js", purpose: "Web interface for photo upload and visualization" },
          { name: "Machine Learning", purpose: "Color detection and cube state recognition" }
        ],
        features: [
          "Photo-based cube state detection",
          "Custom solving algorithm implementation",
          "Real-time cube visualization",
          "Step-by-step solution display",
          "Camera integration for live capture",
          "Error handling for invalid cube states"
        ],
        challenges: [
          "Accurate color detection under varying lighting conditions",
          "Developing efficient cube-solving algorithms",
          "Handling edge cases in cube state recognition",
          "Creating intuitive user interface for photo input"
        ]
      }
    },
  ];
  
  export const skills = [
    {
      category: "Frontend",
      technologies: [
        { name: "Next.js", proficiency: 90, icon: "next.svg" },
        { name: "React", proficiency: 85, icon: "re.svg" },
        { name: "TypeScript", proficiency: 80, icon: "ts.svg" },
        { name: "Tailwind CSS", proficiency: 75, icon: "tail.svg" },
        { name: "JavaScript", proficiency: 90, icon: "javascript.svg" },
        { name: "HTML/CSS", proficiency: 85, icon: "html.svg" }
      ]
    },
    {
      category: "Backend",
      technologies: [
        { name: "Python", proficiency: 90, icon: "python-5.svg" },
        { name: "C/C++", proficiency: 80, icon: "c.svg" },
        { name: "Node.js", proficiency: 75, icon: "nodejs.svg" },
        { name: "Flask", proficiency: 85, icon: "flask.svg" },
        { name: "Django", proficiency: 65, icon: "django.svg" },
        { name: "FastAPI", proficiency: 70, icon: "fastapi.svg" }
      ]
    },
    {
      category: "Database & Cloud",
      technologies: [
        { name: "Firebase", proficiency: 85, icon: "firebase.svg" },
        { name: "PostgreSQL", proficiency: 70, icon: "postgresql.svg" },
        { name: "AWS S3", proficiency: 65, icon: "aws.svg" },
        { name: "MongoDB", proficiency: 65, icon: "mongodb.svg" }
      ]
    },
    {
      category: "Tools & Others",
      technologies: [
        { name: "Git", proficiency: 90, icon: "git.svg" },
        { name: "Docker", proficiency: 65, icon: "dock.svg" },
        { name: "OpenCV", proficiency: 75, icon: "opencv.svg" },
        { name: "Linux", proficiency: 80, icon: "linux.svg" }
      ]
    }
  ];
  
  
  export const workExperience = [
    {
      id: 1,
      title: "Software Engineer Intern - Polaris-Electro Optics",
      desc: " Independently built a full-stack chemical compound database (Next.js, Flask, Firebase, RDKit) with interactive features for research data management, and consolidated silicon-photonics GDSFactory libraries into unified, parameterized modules for reusable waveguide, phase shifter, and electrode design with automated validation.",
      className: "md:col-span-2", // change to md:col-span-2
      thumbnail: "polaris-icon.png",
    },
    {
      id: 2,
      title: "Software Engineer Intern - Consensus Technology Group",
      desc: "Developed secure login, registration, and 2FA pages using Supabase for enterprise-grade data center infrastructure management.",
      className: "md:col-span-2",
      thumbnail: "exp1.svg",
    },
    {
      id: 3,
      title: "Software Development Intern - Modern Prairie",
      desc: " Built JavaScript APIs to automate newsletters, sign-ups, product views, and abandoned cart emails Integrated third-party email services for behavior-triggered communications.",
      className: "md:col-span-2", // change to md:col-span-2
      thumbnail: "exp2.svg",
    },
    {
      id: 4,
      title: "Sales Associate - Jack's Surfboarfs",
      desc: " Assisted customers with product selection, including clothes, wetsuits, and surfboards to suit them best.",
      className: "md:col-span-2", // change to md:col-span-2
      thumbnail: "bag3.png",
    },
  ];
  
  export const socialMedia = [
    {
      id: 1,
      img: "git.svg",
      link: "https://github.com/lhaase3",
    },
    {
      id: 2,
      img: "link.svg",
      link: "https://www.linkedin.com/public-profile/settings?trk=d_flagship3_profile_self_view_public_profile",
    },
  ];