// Builds public/cv/Rohith-Mohan-Software-Engineer-CV.pdf from src/lib/site.ts and src/data/projects.ts.
// Usage: npm run pdfs   (needs Chrome/Chromium; set CHROME_PATH if it is not found)
import { existsSync, mkdirSync } from 'node:fs';
import { chromium } from 'playwright-core';
import { site, experience, education, certifications } from '../src/lib/site.ts';
import { projects } from '../src/data/projects.ts';

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const contact = [site.location.replace('Open to roles in ', ''), site.email, site.github.replace('https://', ''), site.linkedin.replace('https://www.', ''), site.url.replace('https://', '')].filter(Boolean);
const skills = {
  'Frontend': ['Angular', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3 / SCSS', 'PrimeNG', 'Responsive web design'],
  'Data': ['SQL', 'MySQL', 'Database design (ER modelling)', 'CRUD operations', 'SQL Server (independent project)'],
  'APIs & testing': ['REST APIs', 'Postman (API testing)'],
  'Tools': ['Git & GitHub', 'Inkscape (SVG icons)', 'CMS-style admin panels']
};
const html = `<!doctype html><html><head><meta charset="utf-8"><title>${site.name} – CV</title><style>
  @page { size: A4; margin: 15mm 16mm 17mm; }
  body { font: 10.4pt/1.42 'Helvetica Neue', Arial, sans-serif; color: #0d1321; margin: 0; }
  h1 { font-size: 22pt; margin: 0; } h2 { font-size: 10.5pt; text-transform: uppercase; letter-spacing: .06em; color: #0369a1; border-bottom: 1.5px solid #0369a1; padding-bottom: 3px; margin: 14px 0 7px; }
  h3 { font-size: 10.8pt; margin: 0; } p { margin: 0 0 5px; } ul { margin: 3px 0 0; padding-left: 16px; } li { margin-bottom: 2px; }
  .muted { color: #5f6b80; } .row { display: flex; justify-content: space-between; gap: 12px; } .job { margin-bottom: 9px; }
  .head { border-bottom: 3px solid #0d1321; padding-bottom: 9px; } .title { font-size: 12pt; color: #0369a1; font-weight: 600; margin-top: 2px; }
  .contact { margin-top: 5px; font-size: 9.3pt; color: #39445a; } table { width: 100%; border-collapse: collapse; } td { padding: 2px 0; vertical-align: top; } td:first-child { width: 27%; font-weight: 600; }
  .tag { font-size: 8.5pt; color: #047857; font-weight: 600; }
</style></head><body>
  <div class="head"><h1>${esc(site.name)}</h1><div class="title">${esc(site.positioning)}</div><div class="contact">${contact.map(esc).join(' &nbsp;|&nbsp; ')}</div></div>
  <h2>Profile</h2>
  <p>Junior Software Engineer with full-time experience at Elif Consultancy & Services (Aug 2023 – May 2024), delivering three client websites with designers and backend developers: building responsive Angular and TypeScript front ends, integrating REST APIs, testing endpoints in Postman and designing MySQL database schemas. MCA (GPA 8.7). Available immediately for roles in Dubai, Abu Dhabi and Sharjah.</p>
  <h2>Technical skills</h2>
  <table>${Object.entries(skills).map(([k, v]) => `<tr><td>${esc(k)}</td><td>${v.map(esc).join(', ')}</td></tr>`).join('')}</table>
  <h2>Professional experience</h2>
  ${experience.map((e) => `<div class="job"><div class="row"><h3>${esc(e.role)} · ${esc(e.org)}</h3><span class="muted">${esc(e.period || 'Internship')}</span></div><div class="muted">${esc(e.place)}</div>${e.points.length ? `<ul>${e.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>` : ''}${e.note ? `<p class="muted" style="margin-top:3px">${esc(e.note)}</p>` : ''}</div>`).join('')}
  <h2>Projects</h2>
  <ul>${projects.map((p) => `<li><b>${esc(p.title)}</b> <span class="tag">[${esc(p.kind)}]</span> – ${esc(p.tagline)} <span class="muted">${esc(p.stack.slice(0, 5).join(', '))}</span></li>`).join('')}</ul>
  <p class="muted" style="margin-top:5px">Code and case studies: ${esc(site.url.replace('https://', ''))} · ${esc(site.github.replace('https://', ''))}</p>
  <h2>Education</h2>
  ${education.map((ed) => `<div class="row"><span><b>${esc(ed.degree)}</b>, ${esc(ed.school)}${ed.grade ? ' – ' + esc(ed.grade) : ''}</span><span class="muted">${esc(ed.period)}</span></div>`).join('')}
  <h2>Certifications</h2>
  <ul>${certifications.map((c) => `<li>${esc(c.name)} – ${esc(c.issuer)}</li>`).join('')}</ul>
</body></html>`;

const chrome = [process.env.CHROME_PATH, '/usr/bin/google-chrome', '/usr/bin/chromium', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', 'C:/Program Files/Google/Chrome/Application/chrome.exe'].filter(Boolean).find(existsSync);
const browser = await chromium.launch({ executablePath: chrome, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setContent(html, { waitUntil: 'load' });
mkdirSync(new URL('../public/cv/', import.meta.url), { recursive: true });
await page.pdf({ path: new URL('../public/cv/Rohith-Mohan-Software-Engineer-CV.pdf', import.meta.url).pathname, format: 'A4', printBackground: true, displayHeaderFooter: true, headerTemplate: '<span></span>',
  footerTemplate: `<div style="font:8px Arial;color:#5f6b80;width:100%;padding:0 16mm;display:flex;justify-content:space-between"><span>${site.name} · CV</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`,
  margin: { top: '15mm', bottom: '17mm', left: '16mm', right: '16mm' } });
await browser.close();
console.log('wrote public/cv/Rohith-Mohan-Software-Engineer-CV.pdf');
