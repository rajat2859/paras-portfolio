import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Code2, ExternalLink, X } from 'lucide-react';
import type { ProjectItem } from '../../types/portfolio';
import { resolveProjectLink } from '../../lib/portfolio';
import { Button } from './Button';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  requestedAction: 'overview' | 'live' | 'source';
  onClose: () => void;
}

export function ProjectDetailModal({
  project,
  requestedAction,
  onClose,
}: ProjectDetailModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  const liveLink = project ? resolveProjectLink(project.liveUrl, 'liveUrl') : null;
  const sourceLink = project ? resolveProjectLink(project.sourceUrl, 'sourceUrl') : null;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-[#161B2C]/70 p-3 backdrop-blur-[2px] sm:items-center sm:p-6"
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, y: 14, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.99 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90dvh] w-full max-w-2xl overflow-y-auto rounded-[10px] border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] shadow-xl"
          >
            <div className="flex items-start justify-between gap-4 border-b border-[var(--border)] px-5 py-5 sm:px-8">
              <div>
                <h3
                  id="project-modal-title"
                  className="type-project text-[var(--foreground)]"
                >
                  {project.name}
                </h3>
                <p className="mt-1 text-sm text-[var(--muted-strong)]">{project.subtitle}</p>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[6px] border border-[var(--border)] text-[var(--foreground)] transition-colors duration-150 hover:border-[var(--foreground)] hover:bg-[var(--surface)] cursor-pointer"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="space-y-6 px-5 py-6 sm:px-8">
              <p className="text-[15px] leading-relaxed text-[var(--foreground)]">
                {project.description}
              </p>

              <div className="rounded-[8px] border border-[var(--border)] bg-[var(--surface)]/75 p-4 text-sm leading-relaxed text-[var(--foreground)]">
                <p className="mb-1.5 font-semibold">
                  How it&apos;s built
                </p>
                <p>{project.architectureNote}</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold">
                  What it does
                </h4>
                <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-[var(--foreground)]">
                  {project.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        className="mt-[9px] h-1 w-3 shrink-0 bg-[var(--accent)]"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-[var(--border)] pt-5">
                <p className="mb-2 text-sm font-semibold">
                  Built with
                </p>
                <p className="text-sm leading-relaxed text-[var(--foreground)]">
                  {project.technologies.join(', ')}
                </p>
              </div>

              {/* Show repository configuration note only when sourceUrl is still an editable placeholder */}
              {(requestedAction === 'source' || !sourceLink?.isConfigured) && (
                <div className="rounded-[8px] border border-[var(--border)] bg-[var(--surface)] p-4 text-xs leading-relaxed text-[var(--muted-strong)]">
                  <p className="font-semibold text-[var(--foreground)]">
                    The code is private
                  </p>
                  <p className="mt-1">
                    The live site is public. If you&apos;d like to see how it&apos;s built, ask me
                    for a code walkthrough.
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border)] bg-[var(--surface)]/50 px-5 py-4 sm:px-8">
              <div className="flex flex-wrap items-center gap-3">
                {liveLink?.isConfigured && liveLink.href && (
                  <Button
                    href={liveLink.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="primary"
                    size="sm"
                  >
                    <span>Visit live project</span>
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </Button>
                )}
                {sourceLink?.isConfigured && sourceLink.href && (
                  <Button
                    href={sourceLink.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                    size="sm"
                  >
                    <span>Open source</span>
                    <Code2 className="h-3.5 w-3.5" aria-hidden="true" />
                  </Button>
                )}
                <Button href="#contact" variant="secondary" size="sm" onClick={onClose}>
                  <span>Request walkthrough</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Button>
              </div>

              <Button variant="secondary" size="sm" onClick={onClose}>
                Close
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
