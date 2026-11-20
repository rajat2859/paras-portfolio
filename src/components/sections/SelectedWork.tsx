import { ArrowUpRight, BookOpen, Code2 } from 'lucide-react';
import { PROJECTS } from '../../data/projects';
import { resolveProjectLink } from '../../lib/portfolio';
import type { ProjectItem } from '../../types/portfolio';
import { Button } from '../ui/Button';
import { ProjectPreview } from '../ui/ProjectPreview';
import { SectionHeading } from '../ui/SectionHeading';

interface SelectedWorkProps {
  onSelectProject: (project: ProjectItem, action: 'overview' | 'live' | 'source') => void;
  onExpandScreen: (project: ProjectItem, screenIndex: number) => void;
}

function ProjectActions({
  project,
  dark = false,
  onSelectProject,
}: {
  project: ProjectItem;
  dark?: boolean;
  onSelectProject: SelectedWorkProps['onSelectProject'];
}) {
  const live = resolveProjectLink(project.liveUrl, 'liveUrl');
  const source = resolveProjectLink(project.sourceUrl, 'sourceUrl');

  return (
    <div className="flex flex-wrap items-center gap-3">
      {live.isConfigured && live.href ? (
        <Button
          href={live.href}
          target="_blank"
          rel="noopener noreferrer"
          variant={dark ? 'dark-primary' : 'primary'}
          size="md"
        >
          <span>View Project</span>
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </Button>
      ) : (
        <Button
          variant={dark ? 'dark-primary' : 'primary'}
          size="md"
          onClick={() => onSelectProject(project, 'live')}
        >
          <span>View Project</span>
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      )}

      <Button
        variant={dark ? 'dark-secondary' : 'secondary'}
        size="md"
        onClick={() => onSelectProject(project, 'overview')}
      >
        <BookOpen className="h-4 w-4" aria-hidden="true" />
        <span>Case Study</span>
      </Button>

      {source.isConfigured && source.href ? (
        <Button
          href={source.href}
          target="_blank"
          rel="noopener noreferrer"
          variant={dark ? 'dark-secondary' : 'secondary'}
          size="md"
        >
          <Code2 className="h-4 w-4" aria-hidden="true" />
          <span>View Source</span>
        </Button>
      ) : (
        <Button
          variant={dark ? 'dark-secondary' : 'secondary'}
          size="md"
          onClick={() => onSelectProject(project, 'source')}
        >
          <Code2 className="h-4 w-4" aria-hidden="true" />
          <span>View Source</span>
        </Button>
      )}
    </div>
  );
}

export function SelectedWork({
  onSelectProject,
  onExpandScreen,
}: SelectedWorkProps) {
  const [motionProject, loopdeskProject] = PROJECTS;

  return (
    <section
      id="work"
      aria-labelledby="selected-work-heading"
      className="py-16 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          headingId="selected-work-heading"
          heading="Selected work"
          description="Two products I designed and built, both live. Flip through the screens here, or open the real thing and click around."
        />

        {motionProject && (
          <article className="mt-10 overflow-hidden rounded-[10px] bg-[var(--dark)] p-4 text-[var(--dark-text)] sm:mt-14 sm:p-8 lg:p-12">
            <div className="flex flex-col justify-between gap-6 border-b border-[var(--dark-border)] pb-8 lg:flex-row lg:items-end">
              <div>
                <h3 className="type-project text-[var(--dark-text)]">{motionProject.name}</h3>
                <p className="mt-1.5 text-base text-[var(--dark-muted)]">
                  {motionProject.subtitle}
                </p>
              </div>

              <ProjectActions project={motionProject} dark onSelectProject={onSelectProject} />
            </div>

            <div className="mt-8">
              <ProjectPreview project={motionProject} onExpandScreen={onExpandScreen} />
            </div>

            <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-5">
                <p className="text-[15px] sm:text-base leading-relaxed text-[#DCDFE6]">
                  {motionProject.description}
                </p>
                <TechList items={motionProject.technologies} dark />
              </div>

              <div className="lg:col-span-7">
                <h4 className="text-sm font-semibold text-[var(--dark-text)]">What it does</h4>
                <ul className="mt-3 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                  {motionProject.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-[var(--dark-muted)]"
                    >
                      <span
                        className="mt-[9px] h-1 w-3 shrink-0 bg-[var(--accent-on-dark)]"
                        aria-hidden="true"
                      />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        )}

        {loopdeskProject && (
          <article className="mt-8 overflow-hidden rounded-[10px] border border-[var(--border)] bg-[var(--surface)] p-4 sm:mt-12 sm:p-8 lg:p-12">
            <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-5">
                <h3 className="type-project text-[var(--foreground)]">{loopdeskProject.name}</h3>
                <p className="mt-1.5 text-base text-[var(--muted-strong)]">
                  {loopdeskProject.subtitle}
                </p>

                <p className="mt-6 text-[15px] sm:text-base leading-relaxed text-[var(--muted-strong)]">
                  {loopdeskProject.description}
                </p>

                <h4 className="mt-6 text-sm font-semibold text-[var(--foreground)]">What it does</h4>
                <ul className="mt-3 space-y-2.5">
                  {loopdeskProject.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-[var(--foreground)]"
                    >
                      <span
                        className="mt-[9px] h-1 w-3 shrink-0 bg-[var(--accent)]"
                        aria-hidden="true"
                      />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <TechList items={loopdeskProject.technologies} />

                <div className="mt-8">
                  <ProjectActions project={loopdeskProject} onSelectProject={onSelectProject} />
                </div>
              </div>

              <div className="lg:col-span-7">
                <ProjectPreview project={loopdeskProject} onExpandScreen={onExpandScreen} />
              </div>
            </div>
          </article>
        )}
      </div>
    </section>
  );
}

function TechList({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return (
    <div className="mt-6">
      <h4 className={`text-sm font-semibold ${dark ? 'text-[var(--dark-text)]' : 'text-[var(--foreground)]'}`}>
        Built with
      </h4>
      <ul className="mt-2.5 flex flex-wrap gap-1.5">
        {items.map((item) => (
          <li
            key={item}
            className={`rounded-[4px] px-2 py-0.5 text-[13px] font-medium ${
              dark
                ? 'bg-[var(--dark-surface)] text-[var(--dark-text)]'
                : 'bg-[var(--background)] text-[var(--foreground)]'
            }`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
