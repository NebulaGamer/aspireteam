import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Check } from "lucide-react";
import { z } from "zod";
import { useLanguage } from "@/i18n/LanguageProvider";
import {
  markSubmitted,
  rateLimitRemaining,
  type PartnershipEnquiry,
  type SubmitResult,
} from "@/lib/partnership";
import { submitPartnershipEnquiry } from "@/lib/partnership.functions";
import { Reveal } from "../Reveal";

type Errors = Partial<Record<keyof PartnershipEnquiry, string>>;

const EMPTY: PartnershipEnquiry = {
  company: "",
  person: "",
  email: "",
  phone: "",
  interest: "",
  message: "",
};

export function ContactSection() {
  const { t, lang } = useLanguage();
  const e = t.contact.form.errors;

  const [values, setValues] = useState<PartnershipEnquiry>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  // Honeypot: hidden from humans, irresistible to bots.
  const [honeypot, setHoneypot] = useState("");
  const submit = useServerFn(submitPartnershipEnquiry);

  const schema = z.object({
    company: z.string().trim().min(1, e.companyRequired).max(100, e.companyMax),
    person: z.string().trim().min(1, e.personRequired).max(100, e.personMax),
    email: z
      .string()
      .trim()
      .min(1, e.emailRequired)
      .max(255, e.emailInvalid)
      .email(e.emailInvalid),
    phone: z
      .string()
      .trim()
      .max(30, e.phoneInvalid)
      .refine((v) => v === "" || /^[+\d][\d\s()-]{5,}$/.test(v), e.phoneInvalid),
    interest: z.string().min(1, e.interestRequired),
    message: z.string().trim().min(1, e.messageRequired).max(1000, e.messageMax),
  });

  const set = (key: keyof PartnershipEnquiry, value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof PartnershipEnquiry;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    if (rateLimitRemaining() > 0) {
      setFormError(e.rateLimited);
      return;
    }

    setSubmitting(true);
    let result: SubmitResult;
    try {
      result = await submit({ data: { ...parsed.data, locale: lang, website: honeypot } });
    } catch {
      result = { ok: false, error: "failed" };
    }
    setSubmitting(false);

    if (result.ok) {
      markSubmitted();
      setDone(true);
      setValues(EMPTY);
      setHoneypot("");
      return;
    }
    // Keep the entered values so nothing the visitor typed is lost.
    setFormError(e.submitFailed);
  };

  const options = [
    { value: "sponsorship", label: t.contact.form.options.sponsorship },
    { value: "hospitality", label: t.contact.form.options.hospitality },
    { value: "teambuilding", label: t.contact.form.options.teambuilding },
    { value: "media", label: t.contact.form.options.media },
    { value: "other", label: t.contact.form.options.other },
  ];

  return (
    <section id="contact" className="section-dark section-abyss py-24 md:py-36">
      <div className="shell grid gap-16 lg:grid-cols-2 lg:gap-24">
        <Reveal>
          <p className="eyebrow">{t.contact.eyebrow}</p>
          <h2 className="mt-6 font-display text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.02] text-parchment">
            {t.contact.title}
          </h2>
          <div className="hairline mt-10 max-w-24" />
          <p className="mt-10 max-w-lg leading-relaxed text-silver">{t.contact.lead}</p>
          <ul className="mt-10 space-y-4">
            {t.contact.bullets.map((b) => (
              <li key={b} className="flex items-start gap-4 text-steel">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
                {b}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          {done ? (
            <div className="flex h-full flex-col justify-center border border-gold/40 p-10 text-center md:p-16">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold text-gold">
                <Check size={22} aria-hidden="true" />
              </span>
              <h3 className="mt-8 font-display text-3xl text-parchment">
                {t.contact.form.successTitle}
              </h3>
              <p className="mt-4 text-steel">{t.contact.form.successBody}</p>
              <button
                type="button"
                onClick={() => setDone(false)}
                className="mx-auto mt-10 border border-gold/60 px-6 py-3 text-[0.7rem] uppercase tracking-[0.22em] text-gold transition-colors hover:bg-gold hover:text-abyss"
              >
                {t.contact.form.successAgain}
              </button>
            </div>
          ) : (
            <form noValidate onSubmit={onSubmit} className="relative space-y-8">
              <Field
                id="company"
                label={t.contact.form.company}
                value={values.company}
                error={errors.company}
                onChange={(v) => set("company", v)}
              />
              <Field
                id="person"
                label={t.contact.form.person}
                value={values.person}
                error={errors.person}
                onChange={(v) => set("person", v)}
              />
              <div className="grid gap-8 sm:grid-cols-2">
                <Field
                  id="email"
                  type="email"
                  label={t.contact.form.email}
                  value={values.email}
                  error={errors.email}
                  onChange={(v) => set("email", v)}
                />
                <Field
                  id="phone"
                  type="tel"
                  label={t.contact.form.phone}
                  value={values.phone}
                  error={errors.phone}
                  onChange={(v) => set("phone", v)}
                />
              </div>

              <div>
                <label htmlFor="interest" className="eyebrow block">
                  {t.contact.form.interest}
                </label>
                <select
                  id="interest"
                  value={values.interest}
                  aria-invalid={Boolean(errors.interest)}
                  aria-describedby={errors.interest ? "interest-error" : undefined}
                  onChange={(ev) => set("interest", ev.target.value)}
                  className="mt-3 w-full appearance-none border-0 border-b border-input bg-transparent py-3 text-parchment outline-none transition-colors focus:border-gold"
                >
                  <option value="" className="bg-ocean">
                    {t.contact.form.interestPlaceholder}
                  </option>
                  {options.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-ocean">
                      {opt.label}
                    </option>
                  ))}
                </select>
                {errors.interest ? (
                  <p id="interest-error" role="alert" className="mt-2 text-xs text-destructive">
                    {errors.interest}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor="message" className="eyebrow block">
                  {t.contact.form.message}
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={values.message}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  onChange={(ev) => set("message", ev.target.value)}
                  className="mt-3 w-full resize-none border-0 border-b border-input bg-transparent py-3 text-parchment outline-none transition-colors focus:border-gold"
                />
                {errors.message ? (
                  <p id="message-error" role="alert" className="mt-2 text-xs text-destructive">
                    {errors.message}
                  </p>
                ) : null}
              </div>

              <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(ev) => setHoneypot(ev.target.value)}
                />
              </div>

              {formError ? (
                <p role="alert" className="text-sm text-destructive">
                  {formError}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={submitting}
                className="w-full border border-gold bg-gold px-8 py-4 text-[0.7rem] font-medium uppercase tracking-[0.24em] text-abyss transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-auto"
              >
                {submitting ? t.contact.form.submitting : t.contact.form.submit}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  value,
  error,
  onChange,
  type = "text",
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow block">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(ev) => onChange(ev.target.value)}
        className="mt-3 w-full border-0 border-b border-input bg-transparent py-3 text-parchment outline-none transition-colors focus:border-gold"
      />
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-2 text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
