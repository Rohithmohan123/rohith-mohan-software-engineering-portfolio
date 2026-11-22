import type { Snippet } from '@/data/projects';

// Tiny, dependency-free highlighter: comments, strings, numbers, keywords and types. Good enough for
// short, readable snippets; the full source is always one click away on GitHub.
const KEYWORDS: Record<Snippet['lang'], string[]> = {
  csharp: ['public', 'private', 'async', 'await', 'var', 'new', 'return', 'if', 'else', 'throw', 'class', 'record', 'switch', 'static', 'readonly', 'null', 'true', 'false', 'int', 'string', 'decimal', 'bool', 'void', 'using', 'namespace', 'this'],
  sql: ['SELECT', 'FROM', 'WHERE', 'JOIN', 'LEFT', 'INNER', 'ON', 'AS', 'WITH', 'UNION', 'ALL', 'ORDER', 'BY', 'GROUP', 'IF', 'ELSE', 'BEGIN', 'END', 'TRY', 'CATCH', 'TRANSACTION', 'COMMIT', 'ROLLBACK', 'SAVE', 'DECLARE', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'THROW', 'NOT', 'BETWEEN', 'AND', 'OR', 'IS', 'NULL', 'CREATE', 'ALTER', 'VIEW', 'CAST', 'CONCAT'],
  ts: ['const', 'let', 'function', 'return', 'if', 'else', 'export', 'import', 'from', 'new', 'async', 'await', 'true', 'false', 'null', 'type'],
  js: ['const', 'let', 'function', 'return', 'if', 'else', 'export', 'import', 'from', 'new', 'async', 'await', 'true', 'false', 'null']
};

function highlight(code: string, lang: Snippet['lang']) {
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const kw = KEYWORDS[lang];
  const comment = lang === 'sql' ? String.raw`--[^\n]*|\/\*[\s\S]*?\*\/` : String.raw`\/\/[^\n]*|\/\*[\s\S]*?\*\/`;
  const re = new RegExp(`(${comment})|('(?:[^'\\\\]|\\\\.)*'|"(?:[^"\\\\]|\\\\.)*"|\`(?:[^\`\\\\]|\\\\.)*\`)|(\\b\\d+(?:\\.\\d+)?\\b)|(\\b[A-Za-z_][A-Za-z0-9_]*\\b)`, 'g');
  let out = '', last = 0;
  for (const m of code.matchAll(re)) {
    out += esc(code.slice(last, m.index));
    const [t, c, s, n, w] = m;
    if (c) out += `<span class="tok-c">${esc(c)}</span>`;
    else if (s) out += `<span class="tok-s">${esc(s)}</span>`;
    else if (n) out += `<span class="tok-n">${n}</span>`;
    else if (w && (lang === 'sql' ? kw.includes(w.toUpperCase()) && w === w.toUpperCase() : kw.includes(w))) out += `<span class="tok-k">${w}</span>`;
    else if (w && /^[A-Z][a-z]/.test(w) && lang !== 'sql') out += `<span class="tok-t">${w}</span>`;
    else out += esc(t);
    last = (m.index ?? 0) + t.length;
  }
  return out + esc(code.slice(last));
}

export function Code({ s }: { s: Snippet }) {
  return (
    <figure className="overflow-hidden rounded-xl border border-line">
      <figcaption className="flex items-center justify-between gap-3 border-b border-white/10 bg-[#111a2c] px-4 py-2.5 font-mono text-xs text-slate-300">
        <span className="flex items-center gap-2"><span className="flex gap-1.5" aria-hidden><span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" /><span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" /><span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" /></span>{s.file}</span>
        <span className="text-slate-400">{s.lang === 'csharp' ? 'C#' : s.lang === 'sql' ? 'T-SQL' : s.lang.toUpperCase()}</span>
      </figcaption>
      <pre className="code overflow-x-auto p-4 font-mono text-[13px] leading-relaxed"><code dangerouslySetInnerHTML={{ __html: highlight(s.code, s.lang) }} /></pre>
    </figure>
  );
}
