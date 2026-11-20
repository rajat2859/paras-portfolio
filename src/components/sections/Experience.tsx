import { EXPERIENCE_ENTRIES } from '../../data/experience';
import { SectionHeading } from '../ui/SectionHeading';

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="border-t border-[var(--border)] bg-[var(--surface)] py-16 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <SectionHeading
              headingId="experience-heading"
              heading="Experience"
              description="Independent web development alongside hands-on e-commerce operations and CRM work."
            />
          </div>

          <div className="lg:col-span-8">
            <ol className="relative border-l border-[var(--border)] pl-6 sm:pl-9">
              {EXPERIENCE_ENTRIES.map((entry, idx) => (
                <li
                  key={entry.id}
                  className={`relative ${
                    idx !== EXPERIENCE_ENTRIES.length - 1
                      ? 'mb-8 border-b border-[var(--border)] pb-8 sm:mb-9 sm:pb-9'
                      : ''
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute -left-[29px] sm:-left-[41px] top-2 h-2.5 w-2.5 rounded-full border-2 ${
                      entry.current
                        ? 'border-[var(--accent)] bg-[var(--accent)]'
                        : 'border-[var(--muted)] bg-[var(--surface)]'
                    }`}
                  />

                  <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-[var(--foreground)]">
                        {entry.role}
                      </h3>
                      <p className="mt-0.5 text-sm font-medium text-[var(--muted-strong)]">
                        {entry.organization}
                      </p>
                    </div>

                    <p className="shrink-0 whitespace-nowrap text-sm tabular-nums text-[var(--muted-strong)]">
                      {entry.period}
                    </p>
                  </div>

                  <ul className="mt-4 space-y-2 text-sm sm:text-[15px] leading-relaxed text-[var(--muted-strong)]">
                    {entry.responsibilities.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span
                          className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[var(--muted)]"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
