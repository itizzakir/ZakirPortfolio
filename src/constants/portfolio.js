export const personal = {
  name: "Md Zakir Hussain",
  role: "Full Stack Java Developer",
  location: "Hyderabad, Telangana, India",
  phone: "+91-7494004494",
  email: "itizzakir@gmail.com",
  portfolio: "https://zakir-s-portfolio.vercel.app/",
  github: "https://github.com/itizzakir",
  linkedin: "https://linkedin.com/in/itizzakir",
  profileImage: "https://github.com/itizzakir.png?size=640",
  resumeUrl: "/resume-md-zakir-hussain.html",
  summary:
    "Full Stack Java Developer with hands-on experience building scalable web applications using React.js, Spring Boot, and MySQL. Proficient in REST API design, JWT-based authentication, and role-based access control (RBAC). Skilled at delivering end-to-end software solutions with a strong focus on clean code, secure API architecture, and responsive UI development.",
};

export const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const typingRoles = [
  "Java Developer",
  "Spring Boot Developer",
  "React Developer",
  "Full Stack Engineer",
];

export const metrics = [
  { value: 5, suffix: "+", label: "Major full-stack projects" },
  { value: 20, suffix: "+", label: "Core technologies" },
  { value: 4, suffix: "+", label: "Secure API modules shipped" },
  { value: 100, suffix: "%", label: "Responsive interfaces" },
];

export const education = [
  {
    school: "Bihar Engineering University",
    degree: "B.Tech in Computer Science and Engineering",
    period: "2019 - 2023",
    score: "CGPA: 7.83",
    location: "Patna, Bihar",
  },
  {
    school: "Bihar Board of Open Schooling & Examination",
    degree: "12th Grade - PCM",
    period: "2016 - 2018",
    score: "Percentage: 62.20%",
    location: "Patna, Bihar",
  },
];

export const techGroups = [
  {
    title: "Languages",
    items: ["Java", "C", "JavaScript", "SQL", "XML"],
  },
  {
    title: "Frameworks & Libraries",
    items: ["Spring Boot", "Spring Data JPA", "Spring Security", "React.js", "Redux", "Node.js", "Hibernate ORM", "Axios", "React Router DOM", "Lucide React"],
  },
  {
    title: "Web Technologies",
    items: ["HTML", "CSS", "Tailwind CSS", "Bootstrap", "REST APIs"],
  },
  {
    title: "Databases",
    items: ["MySQL"],
  },
  {
    title: "Developer Tools",
    items: ["VS Code", "IntelliJ IDEA Ultimate", "Spring Tool Suite (STS)", "Postman", "Git", "GitHub", "Vite"],
  },
];

export const experience = {
  company: "Aivariant",
  role: "Full Stack Java Developer Intern",
  duration: "Mar 2025 - Dec 2025",
  location: "Bengaluru, India",
  certificate:
    "https://drive.google.com/file/d/12jrZvvvBAygyqKZjEiDrwB3y_LcvLJZB/view?usp=sharing",
  responsibilities: [
    "Developed robust full-stack web applications using React.js, Java, and Spring Boot.",
    "Designed and managed RESTful APIs with MySQL and Hibernate ORM.",
    "Maintained code versioning using GitHub.",
    "Supported testing, debugging, and deployment processes.",
  ],
};

export const projects = [
  {
    name: "WorkBridge",
    title: "HR Management System",
    tech: ["React.js", "Spring Boot", "MySQL", "Tailwind CSS"],
    github: "https://github.com/itizzakir/HRManagementSystem",
    live: "https://hr-management-system-demo.vercel.app/",
    accent: "from-cyan-400 via-blue-500 to-violet-500",
    preview: {
      label: "HR suite",
      headline: "Payroll, attendance, performance",
      items: ["Employee CRUD", "Payroll rules", "Attendance logs", "RBAC access"],
    },
    description: [
      "Managed employee records, payroll, attendance, and performance modules.",
      "Implemented RBAC using JWT and Spring Security.",
      "Built responsive React frontend integrated with Spring Boot REST APIs.",
    ],
  },
  {
    name: "QuickEats",
    title: "Food Delivery Application",
    tech: ["Java", "Spring Boot", "React.js", "MySQL"],
    github: "https://github.com/ankulsingh221/Food-Delivery-App",
    live: "https://quick-eats-demo.vercel.app/",
    accent: "from-fuchsia-400 via-rose-500 to-orange-400",
    preview: {
      label: "Delivery flow",
      headline: "Menus, carts, orders",
      items: ["Food catalog", "Cart flow", "Order APIs", "Role access"],
    },
    description: [
      "Developed scalable food delivery application.",
      "Implemented JWT authentication and RBAC.",
      "Built responsive React, Axios, and Tailwind CSS frontend.",
    ],
  },
  {
    name: "WanderWise",
    title: "Travel Planner",
    tech: ["React.js", "Spring Boot", "MySQL", "Tailwind CSS"],
    github: "https://github.com/sharvari25-hash/Travel-Planner",
    live: "https://travel-planner-demo-beige.vercel.app/",
    accent: "from-emerald-300 via-cyan-400 to-indigo-500",
    preview: {
      label: "Trip planner",
      headline: "Bookings, itineraries, tracking",
      items: ["Trip boards", "Booking APIs", "JWT security", "Planner UI"],
    },
    description: [
      "Built travel planning platform.",
      "Implemented JWT authentication and Spring Security.",
      "Developed booking management and trip tracking REST APIs.",
    ],
  },
  {
    name: "EmPower",
    title: "Employee Management System",
    tech: ["React.js", "Spring Boot", "Spring Data JPA", "MySQL", "Tailwind CSS", "PDF Generation"],
    github: "https://github.com/itizzakir/EmployeeManagementSystem",
    live: "https://empower-demo.vercel.app/",
    accent: "from-sky-300 via-cyan-500 to-blue-600",
    preview: {
      label: "Employee ops",
      headline: "Finance, projects, dashboards",
      items: ["Admin panel", "Employee portal", "Payslip PDF", "Validation rules"],
    },
    description: [
      "Employee records, finance tracking, project management, and Admin/Employee dashboards.",
      "Secure JWT RBAC, backend validation, and safe employee data rules.",
      "Spring Boot, JPA, MySQL APIs with React/Vite/Tailwind dashboard and PDF payslips.",
    ],
  },
  {
    name: "Velora",
    title: "E-Commerce Platform",
    tech: ["React.js", "Spring Boot", "Spring Security", "JWT", "MySQL", "Tailwind CSS"],
    github: "https://github.com/itizzakir/ECommerceApplication",
    live: "https://e-commerce-application-demo-live.vercel.app/",
    accent: "from-rose-400 via-fuchsia-500 to-violet-600",
    preview: {
      label: "Commerce engine",
      headline: "Storefront, checkout, admin",
      items: ["Product CRUD", "Cart and wishlist", "Order tracking", "Review tools"],
    },
    description: [
      "Responsive storefront with search, cart, wishlist, ratings, checkout, and order tracking.",
      "JWT auth, Spring Security RBAC, protected routes, and secure Axios API handling.",
      "Admin product CRUD, categories, order processing, analytics, and review moderation.",
    ],
  },
];

export const certifications = [
  {
    title: "Full Stack Java Developer",
    issuer: "ExcelR EdTech",
    year: "2025",
    link: "https://drive.google.com/file/d/1lIP0J9VyJnsfbQVgsC-j89dF0zD_Y_SK/view?usp=sharing",
  },
  {
    title: "C++ Programming",
    issuer: "InternshipWala",
    year: "Certified",
  },
  {
    title: "Soft Skills",
    issuer: "NPTEL",
    year: "Certified",
  },
];

export const coursework = [
  "Database Management System",
  "Core Java",
  "OOPs",
  "Spring Boot",
  "Spring Data JPA",
  "RESTful APIs",
  "HTML",
  "CSS",
  "JavaScript",
  "React.js",
  "Bootstrap",
  "Full Stack Web Development",
];

export const commandActions = [
  { label: "Jump to Projects", href: "#projects", hint: "Projects" },
  { label: "Open GitHub", href: personal.github, external: true, hint: "Social" },
  { label: "Open LinkedIn", href: personal.linkedin, external: true, hint: "Social" },
  { label: "Email Zakir", href: `mailto:${personal.email}`, external: true, hint: "Contact" },
  { label: "Download Resume", href: personal.resumeUrl, external: true, hint: "Resume" },
];
