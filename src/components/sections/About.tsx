import { ABOUT_FACTS } from '../../data/experience';
import { SectionHeading } from '../ui/SectionHeading';

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="border-t border-[var(--border)] bg-[var(--surface)] py-16 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHeading headingId="about-heading" heading="How I work" />
            <p className="mt-6 max-w-md text-base leading-relaxed text-[var(--foreground)]">
              I&apos;m Paras Verma, a B.Tech graduate in Information Technology from Chitkara
              University.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="max-w-2xl space-y-5 text-[15px] sm:text-base leading-[1.7] text-[var(--muted-strong)]">
              <p className="text-[var(--foreground)]">
                I enjoy building web applications that balance functionality, usability, and
                visual quality.
              </p>
              <p>
                My development workflow combines modern JavaScript technologies with AI-assisted
                development tools such as Claude, Codex, and Antigravity.
              </p>
              <p>
                I use these tools to accelerate development, explore solutions, and improve
                productivity while maintaining attention to implementation quality and working
                functionality.
              </p>
            </div>

            <dl className="mt-10 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
              {ABOUT_FACTS.map((fact) => (
                <div key={fact.label} className="border-t border-[var(--border)] py-4">
                  <dt className="text-sm text-[var(--muted-strong)]">{fact.label}</dt>
                  <dd className="mt-1 text-[15px] font-medium text-[var(--foreground)]">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
