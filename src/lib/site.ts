// Personal details for the software engineering portfolio. Only confirmed facts are used.

export const site = {
  name: 'Rohith Mohan',
  title: 'Junior Software Engineer',
  positioning: 'Junior Software Engineer | .NET / C# Developer | Frontend & Web Developer',
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
  'Junior .NET Developer', 'Junior C# Developer', 'Junior Software Engineer', 'Frontend Developer', 'Web Developer',
  'Junior Full-Stack Developer', 'Software Developer', 'Application Developer', 'Web Application Developer',
  'Software Support Engineer', 'Application Support Analyst', 'Junior SQL Developer', 'CMS Developer', 'Junior QA / Software Testing Engineer'
];

/** Skills are split by where they were used, so the evidence behind each claim is clear. */
export const stack = [
  {
    group: 'Backend & data',
    items: [
      { name: 'C#', where: 'project' }, { name: '.NET 8 / ASP.NET Core Web API', where: 'project' },
      { name: 'Entity Framework Core', where: 'project' }, { name: 'SQL Server & T-SQL', where: 'project' },
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
      { name: 'Postman (API testing)', where: 'work' }, { name: 'Git & GitHub', where: 'work' }, { name: 'xUnit integration tests', where: 'project' },
      { name: 'Playwright browser tests', where: 'project' }, { name: 'GitHub Actions CI', where: 'project' }, { name: 'CMS-style admin panels', where: 'both' }
    ]
  }
] as const;

export const experience = [
  {
    role: 'Junior Software Engineer Trainee',
    org: 'Ezses Company',
    place: 'Kochi, India',
    period: 'Aug 2023 – Jun 2024',
    points: [
      'Delivered client web projects end-to-end (Gomato Travel, Snapcart, ASIDES.in) in a cross-functional team of designers and backend developers',
      'Designed entity-relationship models and relational database schemas in MySQL to keep data consistent across CRUD operations',
      'Validated REST APIs in Postman (GET, POST, PUT, DELETE), checking CRUD behaviour and JSON responses before frontend integration',
      'Integrated frontend interfaces with backend REST APIs in collaboration with backend developers'
    ],
    note: 'Client projects were associated with Elif Consultancy & Services.'
  },
  {
    role: 'Market Intelligence & Business Insights',
    org: 'The Digital Tantra',
    place: 'Remote (Bengaluru, India)',
    period: 'Oct 2024 – Oct 2026',
    points: ['Research and data analysis role: survey analysis, reporting and dashboards in Excel and Power BI'],
    note: ''
  },
  {
    role: 'Data Analyst Intern',
    org: 'Quest Innovative Solutions',
    place: 'India',
    period: '',
    points: [],
    note: ''
  }
];

export const education = [
  { degree: 'Master of Computer Applications (MCA)', school: 'CMS College of Science and Commerce', period: '2022 – 2024', grade: 'GPA 8.7' },
  { degree: 'BSc Computer Science', school: 'Prajyothi Niketan College', period: '2019 – 2022', grade: 'GPA 6.6' }
];

export const certifications = [
  { name: 'Java Programming Features', issuer: 'Infosys' },
  { name: 'Advanced Diploma in Data Analytics & Business Intelligence', issuer: 'Quest Innovative Solutions' },
  { name: 'Project Management Fundamentals', issuer: 'IBM' },
  { name: 'Google Analytics', issuer: 'Google Skillshop' }
];
