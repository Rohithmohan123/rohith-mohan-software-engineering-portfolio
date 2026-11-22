'use client';
import { useState } from 'react';
import { Copy, Send } from 'lucide-react';

type Errors = Partial<Record<'name' | 'email' | 'message', string>>;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Static site: there is no server to send mail. With an email configured the form opens the visitor's
// email app with a pre-filled message; otherwise it copies the message and links to LinkedIn.
export function ContactForm({ email, linkedin }: { email: string; linkedin: string }) {
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState<'' | 'mail' | 'copied' | 'copy-failed'>('');
  const [body, setBody] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = Object.fromEntries(['name', 'email', 'company', 'role', 'message'].map((k) => [k, String(f.get(k) ?? '').trim()]));
    const errs: Errors = {};
    if (v.name.length < 2) errs.name = 'Please enter your name.';
    if (!EMAIL.test(v.email)) errs.email = 'Please enter a valid email address.';
    if (v.message.length < 10) errs.message = 'Please write a short message (at least 10 characters).';
    setErrors(errs);
    if (Object.keys(errs).length) {
      (e.currentTarget.querySelector('[aria-invalid="true"]') as HTMLElement | null)?.focus();
      return;
    }
    const text = `Hi Rohith,\n\n${v.message}\n\n${v.name}${v.role ? `, ${v.role}` : ''}${v.company ? ` · ${v.company}` : ''}\n${v.email}`;
    setBody(text);
    if (email) {
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(`Enquiry from ${v.name}${v.company ? ` (${v.company})` : ''}`)}&body=${encodeURIComponent(text)}`;
      setDone('mail');
    } else {
      try { await navigator.clipboard.writeText(text); setDone('copied'); } catch { setDone('copy-failed'); }
    }
  }

  const field = 'mt-1.5 block w-full rounded-lg border border-line bg-bg px-3.5 py-3 text-base outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/20 aria-[invalid=true]:border-red-500';
  return (
    <form onSubmit={onSubmit} noValidate className="card p-6 sm:p-8" aria-describedby="form-help">
      <h2 className="text-xl font-bold">Send a message</h2>
      <p id="form-help" className="mt-1 text-sm text-muted">{email ? 'This opens your email app with the message ready to send.' : 'Your message will be copied so you can paste it into a LinkedIn message.'}</p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-semibold">Name *<input name="name" autoComplete="name" className={field} aria-invalid={!!errors.name} aria-describedby="e-name" /><span id="e-name" className="mt-1 block text-sm font-medium text-red-500">{errors.name}</span></label>
        <label className="block text-sm font-semibold">Email *<input name="email" type="email" autoComplete="email" className={field} aria-invalid={!!errors.email} aria-describedby="e-email" /><span id="e-email" className="mt-1 block text-sm font-medium text-red-500">{errors.email}</span></label>
        <label className="block text-sm font-semibold">Company<input name="company" autoComplete="organization" className={field} /></label>
        <label className="block text-sm font-semibold">Role you are hiring for<input name="role" className={field} /></label>
      </div>
      <label className="mt-5 block text-sm font-semibold">Message *<textarea name="message" rows={5} className={field} aria-invalid={!!errors.message} aria-describedby="e-message" /><span id="e-message" className="mt-1 block text-sm font-medium text-red-500">{errors.message}</span></label>
      <button type="submit" className="btn btn-primary mt-4 w-full sm:w-auto"><Send size={17} aria-hidden /> {email ? 'Write email' : 'Copy message'}</button>
      <div aria-live="polite">
        {done === 'mail' && <p className="mt-4 rounded-lg bg-accent-soft p-3 text-sm text-fg">Your email app should open with the message. If it doesn’t, email {email} directly.</p>}
        {done === 'copied' && <p className="mt-4 rounded-lg bg-accent-soft p-3 text-sm text-fg">Message copied. <a href={linkedin} target="_blank" rel="noreferrer" className="font-semibold underline">Open LinkedIn</a> and paste it into a message to Rohith.</p>}
        {done === 'copy-failed' && (
          <div className="mt-4 rounded-lg bg-panel-2 p-3 text-sm text-fg">
            <p className="flex items-center gap-1.5"><Copy size={14} aria-hidden /> Copy the message below, then <a href={linkedin} target="_blank" rel="noreferrer" className="font-semibold underline">open LinkedIn</a>.</p>
            <textarea readOnly value={body} rows={6} className="mt-2 w-full rounded border border-line bg-bg p-2 text-sm" aria-label="Message to copy" />
          </div>
        )}
      </div>
    </form>
  );
}
