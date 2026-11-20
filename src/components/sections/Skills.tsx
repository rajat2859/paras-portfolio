import { SKILL_GROUPS } from '../../data/skills';
import { SectionHeading } from '../ui/SectionHeading';

export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="border-t border-[var(--border)] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          headingId="skills-heading"
          heading="What I work with"
          description="A modern web stack, plus AI-assisted tools I use to move faster without cutting corners."
        />

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
          {SKILL_GROUPS.map((group) => (
            <div key={group.id} className="border-t-2 border-[var(--foreground)] pt-5">
              <h3 className="text-lg font-semibold tracking-tight text-[var(--foreground)]">
                {group.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted-strong)]">
                {group.summary}
              </p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-[4px] border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 text-sm font-medium text-[var(--foreground)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
