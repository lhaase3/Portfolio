export const navItems = [
    { name: "About", link: "#about" },
    { name: "Projects", link: "#projects" },
    { name: "Contact", link: "#contact" },
  ];
  
  export const gridItems = [
    {
      id: 1,
      title: "I am a software engineer with a passion for network systems and web development. I enjoy building scalable applications and solving complex problems.",
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
      des: "A seamless connection between fraternities and new members across the country",
      img: "greeklist-home.png",
      iconLists: ["next.svg", "tail.svg", "python-5.svg"],
      link: "https://greeklist.net",
    },
    {
      id: 2,
      title: "Multithreaded Server Client",
      des: "This multithreaded server handles multiple clients making GET requests. It serves files with headers detailing file type, size, and status codes (e.g., 200, 404, 400).",
      img: "sc_hs.jpg",
      iconLists: ["c.svg"],
      link: "https://github.com/lhaase3/GET_server",
    },
    {
      id: 3,
      title: "Mulithreaded HTTP Caching Proxy",
      des: "This proxy server caches files from a web server, reducing latency and bandwidth usage. It handles multiple clients and serves cached files efficiently.",
      img: "caching_prox.jpg",
      iconLists: ["c.svg"],
      link: "https://github.com/lhaase3/caching_proxy/tree/main"
    },
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