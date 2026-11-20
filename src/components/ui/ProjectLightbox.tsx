import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { ProjectItem } from '../../types/portfolio';
import { Button } from './Button';

interface ProjectLightboxProps {
  project: ProjectItem | null;
  screenIndex: number;
  onChangeIndex: (index: number) => void;
  onClose: () => void;
}

export function ProjectLightbox({
  project,
  screenIndex,
  onChangeIndex,
  onClose,
}: ProjectLightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowRight') {
        onChangeIndex((screenIndex + 1) % project.screens.length);
      } else if (event.key === 'ArrowLeft') {
        onChangeIndex((screenIndex - 1 + project.screens.length) % project.screens.length);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, screenIndex, onChangeIndex, onClose]);

  const activeScreen = project ? project.screens[screenIndex] ?? project.screens[0] : null;

  return (
    <AnimatePresence>
      {project && activeScreen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
          role="presentation"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0E1220]/92 p-4 sm:p-8 backdrop-blur-xs"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} screenshot viewer`}
            initial={{ opacity: 0, scale: 0.985, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[94dvh] w-full max-w-6xl flex-col overflow-hidden rounded-[10px] border border-[#2A3147] bg-[#171C2E] text-[var(--dark-text)] shadow-2xl"
          >
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#2A3147] px-5 py-3.5 sm:px-6">
              <div className="min-w-0">
                <p className="text-sm text-[var(--dark-muted)]">
                  <span className="font-medium text-[var(--dark-text)]">{project.name}</span>
                  <span className="ml-2">{activeScreen.label}</span>
                  <span className="ml-3 tabular-nums">
                    {screenIndex + 1} of {project.screens.length}
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <Button
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="dark-primary"
                  size="sm"
                >
                  <span>Visit live site</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Button>

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close fullscreen preview"
                  className="flex h-10 w-10 items-center justify-center rounded-[6px] border border-[#2A3147] text-[var(--dark-text)] transition-colors duration-150 hover:border-[var(--dark-text)] hover:bg-[#222842] cursor-pointer"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Main image viewport */}
            <div className="relative flex-1 overflow-auto bg-[#0E1220] p-3 sm:p-6">
              <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[8px] border border-[#2A3147]">
                <img
                  src={activeScreen.image}
                  alt={activeScreen.alt}
                  className="block w-full h-auto"
                />
              </div>
            </div>

            {/* Footer controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#2A3147] px-5 py-3.5 sm:px-6">
              <p className="text-xs text-[var(--dark-muted)] max-w-xl">
                {activeScreen.caption}
              </p>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    onChangeIndex(
                      (screenIndex - 1 + project.screens.length) % project.screens.length
                    )
                  }
                  aria-label="Previous screen"
                  className="inline-flex h-9 items-center gap-1 rounded-[6px] border border-[#2A3147] px-3 text-xs font-medium text-[var(--dark-text)] transition-colors duration-150 hover:border-[var(--dark-text)] hover:bg-[#222842] cursor-pointer"
                >
                  <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Prev</span>
                </button>
                <button
                  type="button"
                  onClick={() => onChangeIndex((screenIndex + 1) % project.screens.length)}
                  aria-label="Next screen"
                  className="inline-flex h-9 items-center gap-1 rounded-[6px] border border-[#2A3147] px-3 text-xs font-medium text-[var(--dark-text)] transition-colors duration-150 hover:border-[var(--dark-text)] hover:bg-[#222842] cursor-pointer"
                >
                  <span>Next</span>
                  <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
