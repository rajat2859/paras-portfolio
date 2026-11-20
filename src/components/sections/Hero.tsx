import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { CONTACT_PROFILE } from '../../data/experience';
import { PROJECTS } from '../../data/projects';
import type { ProjectItem } from '../../types/portfolio';
import { Button } from '../ui/Button';

interface HeroProps {
  onExpandScreen: (project: ProjectItem, screenIndex: number) => void;
}

const EASE = [0.16, 1, 0.3, 1] as const;

function ShotButton({
  project,
  onExpandScreen,
  className = '',
}: {
  project: ProjectItem;
  onExpandScreen: HeroProps['onExpandScreen'];
  className?: string;
}) {
  const screen = project.screens[0];
  return (
    <button
      type="button"
      onClick={() => onExpandScreen(project, 0)}
      aria-label={`View ${project.name} screenshots`}
      className={`group block w-full overflow-hidden rounded-[6px] border border-[var(--foreground)]/15 bg-[var(--dark)] shadow-[0_30px_60px_-30px_rgba(20,24,40,0.55)] cursor-pointer ${className}`}
    >
      <img
        src={screen.image}
        alt={screen.alt}
        className="block aspect-[16/10] w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
      />
    </button>
  );
}

export function Hero({ onExpandScreen }: HeroProps) {
  const [motionProject, loopdeskProject] = PROJECTS;

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative overflow-hidden pt-28 pb-12 sm:pt-36 sm:pb-16 lg:pt-40 lg:pb-16"
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:items-center lg:gap-10 lg:px-12">
        <div className="lg:col-span-6 xl:col-span-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="type-hero text-[var(--foreground)]"
          >
            Web apps built by someone who&apos;s worked the order desk.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
          >
            <p className="type-lead mt-7 max-w-[34rem] text-[var(--muted-strong)]">
              I&apos;m Paras, a frontend and full-stack developer in Gurgaon. I take web apps from
              first layout to live deployment with React, Next.js and TypeScript, and I sweat the
              details that make them feel solid: fast loads, layouts that hold up on every
              screen, and code that&apos;s easy to change later. Two years in e-commerce operations
              taught me what software has to survive on a busy day.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Button href="#work" variant="primary" size="lg">
                <span>See my work</span>
                <ArrowDown
                  className="h-4 w-4 transition-transform duration-150 group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
              </Button>

              <a
                href={`mailto:${CONTACT_PROFILE.email}`}
                className="text-[15px] font-medium text-[var(--foreground)] underline decoration-[var(--accent)] decoration-2 underline-offset-[6px] transition-colors duration-150 hover:text-[var(--accent)]"
              >
                {CONTACT_PROFILE.email}
              </a>
            </div>

            <p className="mt-10 flex items-center gap-2.5 text-sm text-[var(--muted-strong)]">
              <span
                className="h-2 w-2 rounded-full bg-[var(--accent)]"
                aria-hidden="true"
              />
              Taking on freelance projects now.
            </p>
          </motion.div>
        </div>

        {/* The work itself, up front: two live projects on a diagonal */}
        {motionProject && loopdeskProject && (
          <div className="relative lg:col-span-6 xl:col-span-6 lg:pl-4 xl:pl-8">
            <motion.figure
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
              className="relative z-0 w-[86%]"
            >
              <figcaption className="mb-3 text-sm">
                <span className="font-semibold text-[var(--foreground)]">{motionProject.name}</span>{' '}
                <span className="text-[var(--muted-strong)]">
                  {motionProject.subtitle}
                </span>
              </figcaption>
              <ShotButton project={motionProject} onExpandScreen={onExpandScreen} />
            </motion.figure>

            <motion.figure
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.32, ease: EASE }}
              className="relative z-10 -mt-[22%] ml-auto w-[72%]"
            >
              <ShotButton
                project={loopdeskProject}
                onExpandScreen={onExpandScreen}
                className="ring-[6px] ring-[var(--background)]"
              />
              <figcaption className="mt-3 text-right text-sm">
                <span className="font-semibold text-[var(--foreground)]">{loopdeskProject.name}</span>{' '}
                <span className="text-[var(--muted-strong)]">
                  {loopdeskProject.subtitle}
                </span>
              </figcaption>
            </motion.figure>
          </div>
        )}
      </div>
    </section>
  );
}
