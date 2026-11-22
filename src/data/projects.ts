// Project case studies. "Professional" projects are client websites originally delivered during
// employment and rebuilt independently for this portfolio (no client code or data). "Independent"
// projects were created from scratch to practise and demonstrate skills.

export type Snippet = { title: string; lang: 'csharp' | 'sql' | 'ts' | 'js'; file: string; code: string };
export type Project = {
  slug: string;
  title: string;
  kind: 'Professional project · rebuilt' | 'Independent project';
  tagline: string;
  origin: string;
  problem: string;
  approach: string[];
  features: string[];
  architecture: string[];
  stack: string[];
  snippets: Snippet[];
  testing: string[];
  deliverables: string[];
  limitations: string[];
  images: { src: string; alt: string }[];
  live?: string;
  repo: string;
  facts: { label: string; value: string }[];
};

const GH = 'https://github.com/Rohithmohan123';
const PAGES = 'https://rohithmohan123.github.io';

export const projects: Project[] = [
  {
    slug: 'asides-interior-design-web-app',
    title: 'ASIDES.in – Interior Design Web Application',
    kind: 'Professional project · rebuilt',
    tagline: 'Single-page interior design site with project categories, listings, detail pages, enquiries and a CMS-style admin area.',
    origin: 'Original background: I developed an interior design single-page web application. This public version is an independent rebuild with fictional content; it contains no client code or data.',
    problem: 'An interior design studio needed a fast portfolio site that shows its work by category, lets visitors send enquiries, and lets staff manage projects without touching code.',
    approach: [
      'Single-page app with routes for home, projects, project detail, services, contact and admin.',
      'REST API with validation and a relational database (categories → projects, enquiries).',
      'CMS-oriented admin: sign-in, project and category CRUD, image library, enquiry inbox with status tracking.',
      'Static live demo: the same app runs on GitHub Pages using an in-browser version of the API.'
    ],
    features: ['Responsive interface and photo-led design', 'Category filter, search and sort', 'Project detail pages with gallery', 'Enquiry form with validation', 'Admin CMS with authentication', 'Database schema with foreign keys and indexes'],
    architecture: ['TypeScript SPA (Angular)', 'REST API (Node.js / Express)', 'SQLite database', 'Static demo build for GitHub Pages'],
    stack: ['TypeScript', 'Angular', 'HTML5', 'CSS3', 'Node.js', 'Express', 'SQLite', 'REST', 'Playwright'],
    snippets: [
      {
        title: 'Server-side validation and REST status codes', lang: 'js', file: 'backend/src/app.js (condensed)',
        code: `function saveProject(req, res, id) {
  const { value, errors } = validateProject(req.body);
  if (hasErrors(errors)) return res.status(422).json({ error: 'Validation failed', fields: errors });
  if (!db.prepare('SELECT 1 FROM categories WHERE id = ?').get(value.category_id)) {
    return res.status(422).json({ error: 'Validation failed', fields: { category_id: 'Category does not exist.' } });
  }
  const clash = db.prepare('SELECT id FROM projects WHERE slug = ?').get(value.slug);
  if (clash && clash.id !== id) return res.status(409).json({ error: 'Validation failed', fields: { slug: 'Another project already uses this slug.' } });
  // … INSERT (201 Created) or UPDATE (404 when the id does not exist)
}`
      }
    ],
    testing: ['API tests for public and admin endpoints', 'Frontend unit tests', 'End-to-end browser test covering browsing, enquiry and admin CRUD'],
    deliverables: ['Responsive SPA', 'REST API and database', 'Admin CMS', 'Live demo'],
    limitations: ['Live demo resets on reload (no server on GitHub Pages)', 'Fictional projects; photos from Unsplash'],
    images: [
      { src: '/images/asides-interior-design-web-application/home.jpg', alt: 'ASIDES home page' },
      { src: '/images/asides-interior-design-web-application/spaces.jpg', alt: 'ASIDES spaces by category' },
      { src: '/images/asides-interior-design-web-application/featured.jpg', alt: 'ASIDES featured projects' }
    ],
    live: `${PAGES}/asides-interior-design-web-application/`,
    repo: `${GH}/asides-interior-design-web-application`,
    facts: [{ label: 'Type', value: 'SPA + API + CMS' }, { label: 'Pages', value: '6 public + admin' }, { label: 'Live demo', value: 'Yes' }, { label: 'Tests', value: 'API, unit, E2E' }]
  },

  {
    slug: 'gomato-travel-booking-website',
    title: 'Gomato Travel – Travel Booking Website',
    kind: 'Professional project · rebuilt',
    tagline: 'Travel booking front end with destination listings, search, filters, package details and a booking enquiry flow.',
    origin: 'Original background: client website delivered at Elif Consultancy & Services. This public version is an independent rebuild with sample packages and prices.',
    problem: 'A travel agency needed a fast, mobile-friendly site where visitors can find a package, compare options and send a booking enquiry without calling.',
    approach: [
      'Plain HTML, CSS and JavaScript (ES modules) with hash routing, so it hosts anywhere.',
      'Search and filter logic kept in a separate, unit-tested module.',
      'Booking form with live, itemised price estimate and client-side validation.',
      'Inline SVG icon set and responsive navigation.'
    ],
    features: ['Destination listings with photos', 'Search by place, month and region; trip-type and price filters; sorting', 'Package detail pages with itinerary and tiers', 'Booking enquiry with validation and price estimate', 'Responsive navigation and SVG icons'],
    architecture: ['index.html shell', 'js/data.js (catalogue)', 'js/logic.js (search, filters, pricing)', 'js/app.js (views and routing)', 'css/styles.css'],
    stack: ['HTML5', 'CSS3', 'JavaScript (ES modules)', 'SVG icons', 'Node test runner', 'Playwright'],
    snippets: [
      {
        title: 'Itemised price estimate (unit-tested)', lang: 'js', file: 'js/logic.js',
        code: `export function estimatePrice(destination, { adults = 1, children = 0, tier = 'standard', startDate = '' } = {}) {
  const t = PACKAGE_TIERS.find((x) => x.id === tier) ?? PACKAGE_TIERS[0];
  const perAdult = destination.priceFrom * t.multiplier;
  const lines = [{ label: \`\${adults} adult\${adults === 1 ? '' : 's'} × \${formatINR(perAdult)}\`, amount: adults * perAdult }];
  if (children > 0) lines.push({ label: \`\${children} child\${children === 1 ? '' : 'ren'} × \${formatINR(perAdult * CHILD_RATE)}\`, amount: children * perAdult * CHILD_RATE });
  if (adults === 1 && children === 0) lines.push({ label: 'Single room supplement (30%)', amount: perAdult * SINGLE_ROOM_SUPPLEMENT });
  const base = lines.reduce((s, l) => s + l.amount, 0);
  if (isPeakDate(startDate)) lines.push({ label: 'Peak season surcharge (12%)', amount: base * PEAK_SURCHARGE });
  const subtotal = lines.reduce((s, l) => s + l.amount, 0);
  lines.push({ label: 'GST (5%)', amount: subtotal * GST_RATE });
  const rounded = lines.map((l) => ({ ...l, amount: Math.round(l.amount) }));
  return { lines: rounded, total: rounded.reduce((s, l) => s + l.amount, 0), tier: t };
}`
      }
    ],
    testing: ['Unit tests for search, filters and price estimation', 'Browser test of the full search → detail → enquiry journey, including mobile'],
    deliverables: ['Responsive website', 'Booking enquiry flow', 'Live site on GitHub Pages'],
    limitations: ['Sample packages and prices; no payment or booking provider'],
    images: [
      { src: '/images/gomato-travel-booking-website/home.jpg', alt: 'Gomato home page' },
      { src: '/images/gomato-travel-booking-website/destination.jpg', alt: 'Gomato destination detail' },
      { src: '/images/gomato-travel-booking-website/booking.jpg', alt: 'Gomato booking form' }
    ],
    live: `${PAGES}/gomato-travel-booking-website/`,
    repo: `${GH}/gomato-travel-booking-website`,
    facts: [{ label: 'Type', value: 'Static website' }, { label: 'Destinations', value: '12' }, { label: 'Live site', value: 'Yes' }, { label: 'Tests', value: 'Unit + E2E' }]
  },

  {
    slug: 'snapcart-food-grocery-website',
    title: 'Snapcart – Food & Grocery Website',
    kind: 'Professional project · rebuilt',
    tagline: 'Online grocery store with a product catalogue, categories, search and filters, cart with quantities, coupon and checkout.',
    origin: 'Original background: client website delivered at Elif Consultancy & Services. This public version is an independent rebuild with sample products and prices.',
    problem: 'A local grocery business needed an easy online catalogue where customers can find products quickly, manage a cart and place an order for a delivery slot.',
    approach: [
      'Cart logic written as pure, unit-tested functions (totals, savings, coupon, delivery fee).',
      'Cart drawer and quantity steppers with stock limits; cart saved in the browser.',
      'Checkout with address, delivery slot and payment-on-delivery choice, fully validated.'
    ],
    features: ['Product catalogue with photos', 'Categories, search, filters and sorting', 'Shopping cart with quantity management', 'Coupon and free-delivery threshold', 'Checkout demonstration with validation', 'Responsive layout'],
    architecture: ['index.html shell', 'js/data.js (catalogue)', 'js/cart.js (pure cart logic)', 'js/app.js (views)', 'css/styles.css'],
    stack: ['HTML5', 'CSS3', 'JavaScript (ES modules)', 'localStorage', 'Node test runner', 'Playwright'],
    snippets: [
      {
        title: 'Pure, testable cart totals', lang: 'js', file: 'js/cart.js (condensed)',
        code: `export function totals(cart, catalogue) {
  const byId = new Map(catalogue.map((p) => [p.id, p]));
  const lines = Object.entries(cart.items)
    .map(([id, qty]) => ({ product: byId.get(id), qty }))
    .filter((l) => l.product)
    .map((l) => ({ ...l, lineTotal: l.product.price * l.qty }));
  const subtotal = lines.reduce((s, l) => s + l.lineTotal, 0);
  const coupon = cart.coupon ? COUPONS[cart.coupon] : null;
  const couponValid = Boolean(coupon && subtotal >= coupon.min);
  const discount = couponValid ? Math.round(subtotal * coupon.value / 100) : 0;
  const delivery = subtotal === 0 || subtotal - discount >= FREE_DELIVERY_MIN ? 0 : DELIVERY_FEE;
  return { lines, subtotal, discount, delivery, total: subtotal - discount + delivery, couponValid };
}`
      }
    ],
    testing: ['Unit tests for cart maths, coupon rules, stock limits', 'Browser test of browse → cart → checkout → order, including mobile'],
    deliverables: ['Responsive store front', 'Cart and checkout', 'Live site on GitHub Pages'],
    limitations: ['Sample products; no real payments or deliveries'],
    images: [
      { src: '/images/snapcart-food-grocery-website/home.jpg', alt: 'Snapcart home page' },
      { src: '/images/snapcart-food-grocery-website/products.jpg', alt: 'Snapcart product grid' },
      { src: '/images/snapcart-food-grocery-website/cart.jpg', alt: 'Snapcart cart drawer' }
    ],
    live: `${PAGES}/snapcart-food-grocery-website/`,
    repo: `${GH}/snapcart-food-grocery-website`,
    facts: [{ label: 'Type', value: 'Static web store' }, { label: 'Products', value: '40' }, { label: 'Live site', value: 'Yes' }, { label: 'Tests', value: 'Unit + E2E' }]
  },

  {
    slug: 'employee-management-api',
    title: 'Employee Management API',
    kind: 'Independent project',
    tagline: 'REST API for departments, employees and project assignments, built with ASP.NET Core 8, Entity Framework Core and SQL Server.',
    origin: 'Independent learning project, not previous employment work.',
    problem: 'HR teams need a reliable back end to keep employee, department and project data consistent: no duplicate staff records, no orphaned assignments, and clear errors when a request breaks a business rule.',
    approach: [
      'Designed the relational model first: departments → employees (one-to-many), a self-referencing manager relationship, and a many-to-many employee ↔ project join entity with role and allocation.',
      'Implemented it with EF Core: Fluent API configuration, unique indexes, check constraints, restricted and cascading deletes, seed data and migrations.',
      'Kept controllers thin; business rules live in services that throw typed exceptions (not found, conflict, business rule).',
      'Added a global exception handler that maps every error to an RFC 7807 problem-details response.',
      'Covered the API with xUnit integration tests over HTTP and a Postman collection that CI runs against SQL Server.'
    ],
    features: [
      'CRUD for employees and departments; project assignment and removal',
      'Search, filters, sorting and paging on the employee list',
      'Validation: data annotations plus IValidatableObject for cross-field rules (400 with field errors)',
      'Business rules: unique email (409), department/manager must exist (422), allocation ≤ 100% (422), managers with reports and non-empty departments cannot be deleted (409)',
      'Swagger UI, /health endpoint with a database check, JSON enums as strings'
    ],
    architecture: ['Controllers (HTTP, status codes)', 'DTOs with validation attributes', 'Services (business rules)', 'AppDbContext (EF Core Fluent API)', 'SQL Server', 'GlobalExceptionHandler → problem details'],
    stack: ['C# 12', '.NET 8', 'ASP.NET Core Web API', 'Entity Framework Core 8', 'SQL Server', 'xUnit', 'Postman / Newman', 'Swagger', 'GitHub Actions'],
    snippets: [
      {
        title: 'Business rules in the service layer', lang: 'csharp', file: 'Services/EmployeeService.cs',
        code: `public async Task<EmployeeDto> AssignAsync(int id, AssignmentRequest r, CancellationToken ct)
{
    if (!await db.Employees.AnyAsync(e => e.Id == id, ct)) throw new NotFoundException("Employee", id);
    if (!await db.Projects.AnyAsync(p => p.Id == r.ProjectId, ct))
        throw new BusinessRuleException($"Project {r.ProjectId} does not exist.");
    if (await db.ProjectAssignments.AnyAsync(a => a.EmployeeId == id && a.ProjectId == r.ProjectId, ct))
        throw new ConflictException("The employee is already assigned to this project.");

    var allocated = await db.ProjectAssignments.Where(a => a.EmployeeId == id)
        .SumAsync(a => (int?)a.AllocationPercent, ct) ?? 0;
    if (allocated + r.AllocationPercent > 100)
        throw new BusinessRuleException($"Total allocation would be {allocated + r.AllocationPercent}%. The maximum is 100%.");

    db.ProjectAssignments.Add(new ProjectAssignment
        { EmployeeId = id, ProjectId = r.ProjectId, Role = r.Role.Trim(), AllocationPercent = r.AllocationPercent });
    await db.SaveChangesAsync(ct);
    return await GetAsync(id, ct);
}`
      },
      {
        title: 'Relationships and constraints with the Fluent API', lang: 'csharp', file: 'Data/AppDbContext.cs (condensed)',
        code: `b.Entity<Employee>(e =>
{
    e.Property(x => x.MonthlySalary).HasPrecision(10, 2);
    e.Property(x => x.Status).HasConversion<string>().HasMaxLength(12);
    e.HasIndex(x => x.Email).IsUnique();

    e.HasOne(x => x.Department).WithMany(d => d.Employees)
     .HasForeignKey(x => x.DepartmentId).OnDelete(DeleteBehavior.Restrict);
    e.HasOne(x => x.Manager).WithMany(m => m.DirectReports)
     .HasForeignKey(x => x.ManagerId).OnDelete(DeleteBehavior.Restrict);
    e.ToTable(t => t.HasCheckConstraint("CK_Employees_NotOwnManager", "[ManagerId] IS NULL OR [ManagerId] <> [Id]"));
});

b.Entity<ProjectAssignment>(e =>
{
    e.HasKey(x => new { x.EmployeeId, x.ProjectId });          // many-to-many join entity
    e.ToTable(t => t.HasCheckConstraint("CK_ProjectAssignments_Allocation", "[AllocationPercent] BETWEEN 1 AND 100"));
});`
      },
      {
        title: 'Consistent errors with problem details', lang: 'csharp', file: 'Errors/GlobalExceptionHandler.cs (condensed)',
        code: `var (status, title, detail) = exception switch
{
    AppException app => (app.StatusCode, app.Title, app.Message),
    DbUpdateException => (409, "Database conflict", "The change conflicts with existing data."),
    _ => (500, "Unexpected error", "An unexpected error occurred. Please try again later.")
};
if (status >= 500) logger.LogError(exception, "Unhandled exception for {Method} {Path}", http.Request.Method, http.Request.Path);

http.Response.StatusCode = status;
return await problems.TryWriteAsync(new ProblemDetailsContext
{
    HttpContext = http,
    ProblemDetails = new ProblemDetails { Status = status, Title = title, Detail = detail, Instance = http.Request.Path }
});`
      }
    ],
    testing: [
      'xUnit integration tests start the real API with WebApplicationFactory and an in-memory SQLite database',
      'Tests cover paging, filters, 404 problem details, create → update → delete, validation (400), duplicate email (409), unknown department (422), delete rules and assignment rules',
      'Postman collection with 18 requests and assertions; CI runs it with Newman against the API on SQL Server 2022 after EF Core migrations are applied'
    ],
    deliverables: ['Source code with layered structure', 'EF Core migrations and seed data', 'Postman collection', 'Setup guide (Docker SQL Server, user secrets)', 'CI pipeline'],
    limitations: ['No authentication yet (JWT and role policies are the next step)', 'Demonstration data only'],
    images: [],
    repo: `${GH}/employee-management-api-dotnet`,
    facts: [{ label: 'Type', value: 'REST API' }, { label: 'Endpoints', value: '13' }, { label: 'Entities', value: '4' }, { label: 'Postman tests', value: '18 requests' }]
  },

  {
    slug: 'sql-server-hr-database',
    title: 'SQL Server HR Database',
    kind: 'Independent project',
    tagline: 'Normalised HR database with keys, constraints, joins, views, stored procedures, documented queries and automated tests.',
    origin: 'Independent learning project, not previous employment work. All data is fictional.',
    problem: 'Show that I can design a relational database properly and write production-style T-SQL: data that cannot become inconsistent, reusable read models, and procedures that enforce business rules safely.',
    approach: [
      'Modelled seven tables (departments, job titles with salary bands, employees with a self-referencing manager, projects, assignments, salary history, leave requests).',
      'Enforced integrity in the database: primary and foreign keys, unique and check constraints, cascade rules and supporting indexes.',
      'Built views for the employee directory, department headcount and project staffing.',
      'Wrote stored procedures for CRUD and business rules with THROW errors, transactions and savepoints.',
      'Documented ten example queries and wrote a 13-check test script that CI runs on SQL Server 2022.'
    ],
    features: [
      'Re-runnable scripts: schema, seed data, views, procedures, queries',
      'Joins: inner, left (anti-join), self-join; GROUP BY / HAVING; window functions; recursive CTE (org chart)',
      'Paged search with OFFSET/FETCH and COUNT(*) OVER () total',
      'Salary changes and deletes run all-or-nothing; leave can only be decided by the employee’s manager'
    ],
    architecture: ['01_schema.sql', '02_seed.sql', '03_views.sql', '04_procedures.sql', '05_queries.sql', 'tests/run_tests.sql'],
    stack: ['SQL Server 2022', 'T-SQL', 'sqlcmd', 'GitHub Actions (SQL Server container)'],
    snippets: [
      {
        title: 'Salary change in a transaction (savepoint-safe)', lang: 'sql', file: 'sql/04_procedures.sql',
        code: `IF @NewSalary NOT BETWEEN @Min AND @Max THROW 50003, 'Salary is outside the band for this job title.', 1;

DECLARE @outer INT = @@TRANCOUNT;
BEGIN TRY
    IF @outer = 0 BEGIN TRANSACTION; ELSE SAVE TRANSACTION SalaryChange;
    UPDATE dbo.Employees SET MonthlySalary = @NewSalary, UpdatedAt = SYSUTCDATETIME() WHERE EmployeeId = @EmployeeId;
    INSERT INTO dbo.SalaryHistory (EmployeeId, OldSalary, NewSalary, EffectiveDate, Reason)
    VALUES (@EmployeeId, @Old, @NewSalary, @EffectiveDate, @Reason);
    IF @outer = 0 COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    IF XACT_STATE() = -1 ROLLBACK TRANSACTION;
    ELSE IF XACT_STATE() = 1 BEGIN IF @outer = 0 ROLLBACK TRANSACTION; ELSE ROLLBACK TRANSACTION SalaryChange; END;
    THROW;
END CATCH;`
      },
      {
        title: 'Recursive CTE: reporting chain', lang: 'sql', file: 'sql/05_queries.sql',
        code: `WITH OrgChart AS
(
    SELECT EmployeeId, ManagerId, CAST(CONCAT(FirstName, ' ', LastName) AS NVARCHAR(400)) AS Path, 0 AS Level
    FROM dbo.Employees
    WHERE EmployeeId = 1000
    UNION ALL
    SELECT e.EmployeeId, e.ManagerId, CAST(CONCAT(o.Path, N' > ', e.FirstName, N' ', e.LastName) AS NVARCHAR(400)), o.Level + 1
    FROM dbo.Employees AS e
    JOIN OrgChart AS o ON e.ManagerId = o.EmployeeId
)
SELECT EmployeeId, Level, Path FROM OrgChart ORDER BY Level, Path;`
      },
      {
        title: 'View with a self-join', lang: 'sql', file: 'sql/03_views.sql (condensed)',
        code: `CREATE OR ALTER VIEW dbo.vw_EmployeeDirectory
AS
SELECT e.EmployeeId,
       CONCAT(e.FirstName, N' ', e.LastName)  AS FullName,
       d.Name                                AS Department,
       j.Title                               AS JobTitle,
       CONCAT(m.FirstName, N' ', m.LastName) AS ManagerName,
       e.MonthlySalary, e.Status
FROM dbo.Employees      AS e
JOIN dbo.Departments    AS d ON d.DepartmentId = e.DepartmentId
JOIN dbo.JobTitles      AS j ON j.JobTitleId   = e.JobTitleId
LEFT JOIN dbo.Employees AS m ON m.EmployeeId   = e.ManagerId;`
      }
    ],
    testing: [
      'tests/run_tests.sql: 13 checks (create, duplicate email, salary band, check constraints, update, salary history, delete rules, leave approval, cascades, views, paging); everything is rolled back afterwards',
      'GitHub Actions starts SQL Server 2022, runs every script and the tests, then runs the build a second time to prove the scripts are re-runnable'
    ],
    deliverables: ['Schema and seed scripts', 'Views and stored procedures', 'Documented example queries', 'ER diagram', 'Automated tests and CI'],
    limitations: ['Learning project: no auditing triggers, temporal tables or row-level security'],
    images: [{ src: '/images/sql/er-diagram.svg', alt: 'Entity relationship diagram of the HR database' }],
    repo: `${GH}/sql-server-hr-database-demo`,
    facts: [{ label: 'Tables', value: '7' }, { label: 'Views', value: '3' }, { label: 'Procedures', value: '8' }, { label: 'Test checks', value: '13' }]
  }
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
