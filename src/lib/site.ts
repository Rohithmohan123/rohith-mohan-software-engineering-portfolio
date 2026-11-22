// Personal details for the software engineering portfolio. Only confirmed facts are used.

export const site = {
  name: 'Rohith Mohan',
  title: 'Junior Software Engineer',
  positioning: 'Junior Software Engineer | Frontend & Web Developer | Angular · TypeScript · SQL',
  location: 'Open to roles in Dubai, Abu Dhabi and Sharjah, UAE',
  availability: 'Available to start immediately',
  email: 'rohithmohan450@gmail.com',
  linkedin: 'https://www.linkedin.com/in/rohith-mohan-analyst',
  github: 'https://github.com/Rohithmohan123',
  cv: '/cv/Rohith-Mohan-Software-Engineer-CV.pdf',
  url: 'https://rohithmohan123.github.io/rohith-mohan-software-engineering-portfolio'
};

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
export const asset = (path: string) => `${basePath}${path}`;

export const targetRoles = [
  'Junior Software Engineer', 'Frontend Developer', 'Web Developer',
  'Junior Full-Stack Developer', 'Software Developer', 'Application Developer', 'Web Application Developer',
  'Software Support Engineer', 'Application Support Analyst', 'Junior SQL Developer', 'CMS Developer', 'Junior QA / Software Testing Engineer'
];

/** Skills are split by where they were used, so the evidence behind each claim is clear. */
export const stack = [
  {
    group: 'Backend & data',
    items: [
      { name: 'SQL', where: 'work' }, { name: 'SQL Server & T-SQL', where: 'project' },
      { name: 'REST API design', where: 'both' }, { name: 'Database design (ER modelling)', where: 'work' },
      { name: 'MySQL', where: 'work' }, { name: 'Node.js / Express', where: 'project' }
    ]
  },
  {
    group: 'Frontend',
    items: [
      { name: 'HTML5', where: 'work' }, { name: 'CSS3 / SCSS', where: 'work' }, { name: 'JavaScript', where: 'work' },
      { name: 'TypeScript', where: 'work' }, { name: 'Responsive web design', where: 'work' }, { name: 'Angular', where: 'work' },
      { name: 'React / Next.js', where: 'project' }, { name: 'Tailwind CSS', where: 'project' }
    ]
  },
  {
    group: 'Testing & tools',
    items: [
      { name: 'Postman (API testing)', where: 'work' }, { name: 'Git & GitHub', where: 'work' }, { name: 'Playwright browser tests', where: 'project' }, { name: 'GitHub Actions CI', where: 'project' }, { name: 'CMS-style admin panels', where: 'both' }
    ]
  }
] as const;

export const experience = [
  {
    role: 'Junior Software Engineer',
    org: 'Elif Consultancy & Services',
    place: 'Kochi, India · Full-time',
    period: 'Aug 2023 – May 2024',
    points: [
      'Worked in a cross-functional team of designers and backend developers to deliver three client websites: Gomato Travel, Snapcart and ASIDES.in',
      'Built responsive page layouts and reusable UI components in Angular and TypeScript, using PrimeNG and PrimeFlex on ASIDES.in',
      'Implemented data binding to display dynamic content, and designed custom SVG icons in Inkscape for Gomato Travel',
      'Integrated frontend screens with backend REST APIs together with the backend developers',
      'Tested REST endpoints in Postman (GET, POST, PUT, DELETE), checking CRUD behaviour and JSON responses before integration',
      'Designed ER models and MySQL database schemas to keep data consistent across CRUD operations'
    ],
    note: ''
  },
  {
    role: 'Market Research Analyst',
    org: 'The Digital Tantra',
    place: 'Remote (Bengaluru, India)',
    period: 'Oct 2024 – Oct 2026',
    points: ['Market, competitor and customer experience research: survey analysis, NPS, reporting and Power BI dashboards'],
    note: ''
  }
];

export const education = [
  { degree: 'Master of Computer Applications (MCA)', school: 'CMS College of Science and Commerce (Bharathiar University)', period: '2022 – 2024', grade: 'GPA 8.7' },
  { degree: 'BSc Computer Science', school: 'Prajyoti Niketan College, Pudukad', period: '2019 – 2022', grade: '' }
];

export const certifications = [
  { name: 'Java Programming Features', issuer: 'Infosys' },
  { name: 'Advanced Diploma in Data Analytics & Business Intelligence', issuer: 'Quest Innovative Solutions' },
  { name: 'Project Management Fundamentals', issuer: 'IBM' },
  { name: 'Google Analytics', issuer: 'Google Skillshop' }
];
