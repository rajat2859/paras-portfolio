import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowUpRight,
  ExternalLink,
  Image as ImageIcon,
  Layers,
  Maximize2,
  Play,
  RotateCw,
} from 'lucide-react';
import type { ProjectItem } from '../../types/portfolio';

interface ProjectPreviewProps {
  project: ProjectItem;
  onExpandScreen: (project: ProjectItem, screenIndex: number) => void;
}

export function ProjectPreview({ project, onExpandScreen }: ProjectPreviewProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mode, setMode] = useState<'gallery' | 'live'>('gallery');
  const [iframeKey, setIframeKey] = useState(0);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const isDark = project.previewKind === 'automotive-showcase';
  const activeScreen = project.screens[activeIndex] ?? project.screens[0];

  const handleEnterLive = () => {
    setIframeLoaded(false);
    setMode('live');
  };

  const handleReloadLive = () => {
    setIframeLoaded(false);
    setIframeKey((k) => k + 1);
  };

  return (
    <div className="space-y-4">
      {/* Main architectural viewport frame */}
      <div
        className={`overflow-hidden rounded-[10px] border ${
          isDark
            ? 'border-[#2A3147] bg-[#0E1220] shadow-[0_24px_60px_-28px_rgba(0,0,0,0.75)]'
            : 'border-[var(--border)] bg-[var(--background)] shadow-[0_20px_50px_-26px_rgba(20,24,40,0.18)]'
        }`}
      >
        {/* Minimal browser / exhibition chrome */}
        <div
          className={`flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-b px-3 py-2.5 sm:px-4 ${
            isDark
              ? 'border-[#2A3147] bg-[#171C2E] text-[var(--dark-text)]'
              : 'border-[var(--border)] bg-[var(--surface)]/75 text-[var(--foreground)]'
          }`}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
              <span
                className={`h-2 w-2 rounded-[2px] ${
                  isDark ? 'bg-[#3A4260]' : 'bg-[#C9CCD3]'
                }`}
              />
              <span
                className={`h-2 w-2 rounded-[2px] ${
                  isDark ? 'bg-[#3A4260]' : 'bg-[#C9CCD3]'
                }`}
              />
              <span className="h-2 w-2 rounded-[2px] bg-[var(--accent)]" />
            </div>

            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 truncate text-xs font-medium transition-colors duration-150 ${
                isDark
                  ? 'text-[var(--dark-muted)] hover:text-[var(--dark-text)]'
                  : 'text-[var(--muted-strong)] hover:text-[var(--foreground)]'
              }`}
            >
              <span className="truncate">{project.liveDisplayHost}</span>
              <ExternalLink className="h-3 w-3 shrink-0" aria-hidden="true" />
            </a>
          </div>

          {/* Mode switcher + Expand / Reload controls */}
          <div className="flex items-center gap-1.5 shrink-0">
            <div
              role="group"
              aria-label={`${project.name} preview mode`}
              className={`inline-flex items-center rounded-[6px] p-0.5 border ${
                isDark
                  ? 'border-[#2A3147] bg-[#0E1220]'
                  : 'border-[var(--border)] bg-[var(--background)]'
              }`}
            >
              <button
                type="button"
                onClick={() => setMode('gallery')}
                aria-pressed={mode === 'gallery'}
                className={`inline-flex items-center gap-1.5 rounded-[4px] px-2.5 py-1 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer ${
                  mode === 'gallery'
                    ? isDark
                      ? 'bg-[#222842] text-[var(--dark-text)]'
                      : 'bg-[var(--foreground)] text-[var(--background)]'
                    : isDark
                      ? 'text-[var(--dark-muted)] hover:text-[var(--dark-text)]'
                      : 'text-[var(--muted-strong)] hover:text-[var(--foreground)]'
                }`}
              >
                <ImageIcon className="hidden h-3 w-3 sm:block" aria-hidden="true" />
                <span>Screens</span>
              </button>

              <button
                type="button"
                onClick={handleEnterLive}
                aria-pressed={mode === 'live'}
                className={`inline-flex items-center gap-1.5 rounded-[4px] px-2.5 py-1 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer ${
                  mode === 'live'
                    ? 'bg-[var(--accent)] text-[var(--dark-text)]'
                    : isDark
                      ? 'text-[var(--dark-muted)] hover:text-[var(--dark-text)]'
                      : 'text-[var(--muted-strong)] hover:text-[var(--foreground)]'
                }`}
              >
                <Play className="hidden h-3 w-3 sm:block" aria-hidden="true" />
                <span className="sm:hidden">Live</span>
                <span className="hidden sm:inline">Live preview</span>
              </button>
            </div>

            {mode === 'live' ? (
              <button
                type="button"
                onClick={handleReloadLive}
                aria-label={`Reload ${project.name} live preview`}
                className={`inline-flex h-7 w-7 items-center justify-center rounded-[5px] border transition-colors duration-150 cursor-pointer ${
                  isDark
                    ? 'border-[#2A3147] text-[var(--dark-muted)] hover:border-[#5A6385] hover:text-[var(--dark-text)]'
                    : 'border-[var(--border)] text-[var(--muted-strong)] hover:border-[var(--foreground)] hover:text-[var(--foreground)]'
                }`}
              >
                <RotateCw className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onExpandScreen(project, activeIndex)}
                aria-label={`Expand ${project.name} ${activeScreen.label} screenshot`}
                className={`inline-flex h-7 w-7 items-center justify-center rounded-[5px] border transition-colors duration-150 cursor-pointer ${
                  isDark
                    ? 'border-[#2A3147] text-[var(--dark-muted)] hover:border-[#5A6385] hover:text-[var(--dark-text)]'
                    : 'border-[var(--border)] text-[var(--muted-strong)] hover:border-[var(--foreground)] hover:text-[var(--foreground)]'
                }`}
              >
                <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {/* Viewport stage */}
        {mode === 'gallery' ? (
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0E1220]">
            <AnimatePresence mode="wait">
              <motion.button
                key={activeScreen.id}
                type="button"
                onClick={() => onExpandScreen(project, activeIndex)}
                aria-label={`Open ${project.name} ${activeScreen.label} full screen`}
                initial={{ opacity: 0, scale: 1.01 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="group relative block h-full w-full text-left cursor-pointer focus-visible:outline-offset-[-3px]"
              >
                {!failedImages[activeScreen.id] ? (
                  <img
                    src={activeScreen.image}
                    alt={activeScreen.alt}
                    onError={() =>
                      setFailedImages((prev) => ({ ...prev, [activeScreen.id]: true }))
                    }
                    className="h-full w-full object-cover object-top transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.015]"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#222842] to-[#0E1220] px-6 text-center text-[var(--dark-text)]">
                    <Layers className="mb-3 h-7 w-7 text-[var(--accent-on-dark)]" aria-hidden="true" />
                    <p className="text-2xl font-semibold">{project.name}</p>
                    <p className="mt-1 text-xs text-[var(--dark-muted)]">{activeScreen.label}</p>
                  </div>
                )}

                {/* Hover expand cue */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-4 bottom-4 inline-flex items-center gap-1.5 rounded-[6px] border border-white/15 bg-[#171C2E]/85 px-3 py-1.5 text-xs font-medium text-[var(--dark-text)] opacity-0 backdrop-blur-xs transition-opacity duration-150 group-hover:opacity-100"
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                  <span>Expand screen</span>
                </span>
              </motion.button>
            </AnimatePresence>
          </div>
        ) : (
          <div className="relative aspect-[16/10] w-full bg-[#0E1220]">
            {!iframeLoaded && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-[#171C2E] text-[var(--dark-text)]">
                <p className="text-sm text-[var(--dark-muted)]">
                  Loading {project.liveDisplayHost}…
                </p>
              </div>
            )}
            <iframe
              key={`${project.id}-${iframeKey}`}
              src={project.liveUrl}
              title={`${project.title} live interactive preview`}
              onLoad={() => setIframeLoaded(true)}
              className="h-full w-full border-0 bg-white"
            />
          </div>
        )}

        {/* Caption bar */}
        <div
          className={`flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 border-t px-3 py-3 text-xs sm:px-4 ${
            isDark
              ? 'border-[#2A3147] bg-[#171C2E] text-[var(--dark-muted)]'
              : 'border-[var(--border)] bg-[var(--background)] text-[var(--muted-strong)]'
          }`}
        >
          <div className="flex items-baseline gap-2.5 min-w-0">
            <span
              className={`font-medium shrink-0 ${
                isDark ? 'text-[var(--dark-text)]' : 'text-[var(--foreground)]'
              }`}
            >
              {mode === 'live' ? 'Live site' : activeScreen.label}
            </span>
            <span className="hidden sm:inline truncate">
              {mode === 'live' ? 'Click around, or open the full site in a new tab.' : activeScreen.caption}
            </span>
          </div>

          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1 font-medium whitespace-nowrap shrink-0 transition-colors duration-150 ${
              isDark
                ? 'text-[var(--dark-text)] hover:text-[var(--accent-on-dark)]'
                : 'text-[var(--foreground)] hover:text-[var(--accent)]'
            }`}
          >
            <span>Open full site</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Multi-screen filmstrip selector */}
      <div
        role="tablist"
        aria-label={`${project.name} screen gallery`}
        className="grid grid-cols-3 gap-2 sm:gap-3"
      >
        {project.screens.map((screen, index) => {
          const isSelected = mode === 'gallery' && activeIndex === index;
          return (
            <button
              key={screen.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => {
                setActiveIndex(index);
                setMode('gallery');
              }}
              className={`group overflow-hidden rounded-[8px] border text-left transition-all duration-150 cursor-pointer ${
                isSelected
                  ? isDark
                    ? 'border-[var(--accent-on-dark)] ring-1 ring-[var(--accent-on-dark)]/40'
                    : 'border-[var(--accent)] ring-1 ring-[var(--accent)]/40'
                  : isDark
                    ? 'border-[#2A3147] bg-[#171C2E] hover:border-[#5A6385]'
                    : 'border-[var(--border)] bg-[var(--background)] hover:border-[var(--foreground)]/50'
              }`}
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#171C2E]">
                <img
                  src={screen.image}
                  alt=""
                  aria-hidden="true"
                  className={`h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03] ${
                    isSelected ? 'opacity-100' : 'opacity-75 group-hover:opacity-100'
                  }`}
                />
              </div>
              <div
                className={`flex items-center gap-1.5 px-2 py-1.5 text-[11px] sm:gap-2 sm:px-2.5 sm:py-2 sm:text-xs ${
                  isDark
                    ? 'bg-[#171C2E] text-[var(--dark-text)]'
                    : 'bg-[var(--background)] text-[var(--foreground)]'
                }`}
              >
                <span className="truncate font-medium">{screen.label}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
