import { EDUCATION_ENTRIES } from '../../data/experience';
import { SectionHeading } from '../ui/SectionHeading';

export function Education() {
  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="border-t border-[var(--border)] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <SectionHeading headingId="education-heading" heading="Education" />
          </div>

          <div className="lg:col-span-8">
            <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
              {EDUCATION_ENTRIES.map((entry) => (
                <div
                  key={entry.id}
                  className="flex flex-col justify-between gap-2 py-6 sm:flex-row sm:items-baseline"
                >
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold tracking-tight text-[var(--foreground)]">
                      {entry.degree}
                    </h3>
                    <p className="mt-1 text-sm text-[var(--muted-strong)]">
                      {entry.institution}
                    </p>
                  </div>

                  <p className="shrink-0 whitespace-nowrap text-sm tabular-nums text-[var(--muted-strong)]">
                    {entry.year}
                    {entry.detail && (
                      <span className="ml-3 font-medium text-[var(--foreground)]">
                        {entry.detail}
                      </span>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
