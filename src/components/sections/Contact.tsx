import { useState } from 'react';
import { ArrowUpRight, Check, Copy, Mail, MapPin, Phone } from 'lucide-react';
import { CONTACT_PROFILE } from '../../data/experience';
import { buildMailtoHref, buildTelHref, formatDisplayPhone } from '../../lib/portfolio';
import { Button } from '../ui/Button';

export function Contact() {
  const [copied, setCopied] = useState(false);

  const primaryMailto = buildMailtoHref(
    CONTACT_PROFILE.email,
    'Project Inquiry — Paras Verma'
  );
  const plainMailto = buildMailtoHref(CONTACT_PROFILE.email);
  const telHref = buildTelHref(CONTACT_PROFILE.phone);
  const formattedPhone = formatDisplayPhone(CONTACT_PROFILE.phone);

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(CONTACT_PROFILE.email);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-[var(--dark)] py-16 text-[var(--dark-text)] sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div
          className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14"
        >
          {/* Left closing conversion statement */}
          <div className="lg:col-span-7">
            <h2
              id="contact-heading"
              className="type-hero text-[var(--dark-text)]"
            >
              Have a project in mind? Tell me about it.
            </h2>

            <p className="type-lead mt-6 max-w-xl text-[var(--dark-muted)]">
              A new website, a fix for one that isn&apos;t working, or an extra developer on your
              team. Email is the quickest way to reach me.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button href={primaryMailto} variant="dark-primary" size="lg">
                <span>Email me</span>
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </Button>

              <Button href={telHref} variant="dark-secondary" size="lg">
                <span>Call {formattedPhone}</span>
              </Button>
            </div>
          </div>

          {/* Right direct contact ledger */}
          <div className="flex flex-col justify-end lg:col-span-5">
            <dl className="divide-y divide-[var(--dark-border)] border-t border-b border-[var(--dark-border)]">
              <div className="py-5">
                <dt className="flex items-center gap-2 text-sm text-[var(--dark-muted)]">
                  <Mail className="h-3.5 w-3.5 text-[var(--accent-on-dark)]" aria-hidden="true" />
                  <span>Email</span>
                </dt>
                <dd className="mt-2 flex flex-wrap items-center justify-between gap-3">
                  <a
                    href={plainMailto}
                    className="text-base sm:text-lg font-medium text-[var(--dark-text)] transition-colors duration-150 hover:text-[var(--accent-on-dark)] break-words"
                  >
                    {CONTACT_PROFILE.email}
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label={copied ? 'Email address copied' : 'Copy email address'}
                    className="inline-flex min-h-[36px] items-center gap-1.5 rounded-[6px] border border-[var(--dark-border)] px-3 py-1.5 text-xs font-medium text-[var(--dark-text)] whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-[var(--dark-text)] hover:bg-[var(--dark-surface)] cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[var(--accent-on-dark)]" aria-hidden="true" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </dd>
              </div>

              <div className="py-5">
                <dt className="flex items-center gap-2 text-sm text-[var(--dark-muted)]">
                  <Phone className="h-3.5 w-3.5 text-[var(--accent-on-dark)]" aria-hidden="true" />
                  <span>Phone</span>
                </dt>
                <dd className="mt-2">
                  <a
                    href={telHref}
                    className="text-base sm:text-lg font-medium tabular-nums text-[var(--dark-text)] transition-colors duration-150 hover:text-[var(--accent-on-dark)]"
                  >
                    {formattedPhone}
                  </a>
                </dd>
              </div>

              <div className="py-5">
                <dt className="flex items-center gap-2 text-sm text-[var(--dark-muted)]">
                  <MapPin className="h-3.5 w-3.5 text-[var(--accent-on-dark)]" aria-hidden="true" />
                  <span>Location</span>
                </dt>
                <dd className="mt-2 text-base sm:text-lg font-medium text-[var(--dark-text)]">
                  {CONTACT_PROFILE.location}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
