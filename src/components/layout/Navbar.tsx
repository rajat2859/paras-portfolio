import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { CONTACT_PROFILE, NAV_ITEMS } from '../../data/experience';
import { useScrollState } from '../../hooks/useScrollState';

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isScrolled, activeSectionId } = useScrollState(SECTION_IDS);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 32,
    restDelta: 0.001,
  });

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileMenuOpen]);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-200 ${
        isScrolled || mobileMenuOpen
          ? 'border-b border-[var(--border)] bg-[var(--background)]/96 backdrop-blur-md'
          : 'border-b border-transparent bg-[var(--background)]/80 backdrop-blur-xs'
      }`}
    >
      <div className="mx-auto flex h-16 md:h-[72px] max-w-[1440px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
        {/* Left: Brand identity */}
        <a
          href="#home"
          onClick={handleNavClick}
          className="flex flex-col leading-none whitespace-nowrap shrink-0 group"
        >
          <span className="text-base font-bold tracking-[-0.01em] [font-stretch:110%] text-[var(--foreground)] transition-colors duration-150 group-hover:text-[var(--accent)]">
            Paras Verma
          </span>
          <span className="mt-0.5 text-xs text-[var(--muted-strong)]">
            {CONTACT_PROFILE.descriptor}
          </span>
        </a>

        {/* Center/Right: Desktop navigation */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-6 lg:gap-8"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSectionId === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                aria-current={isActive ? 'location' : undefined}
                className={`relative py-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 ${
                  isActive
                    ? 'text-[var(--foreground)]'
                    : 'text-[var(--muted-strong)] hover:text-[var(--foreground)]'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-0.5 h-[1.5px] bg-[var(--accent)] transition-transform duration-150 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Right: Availability indicator (desktop) + Mobile menu toggle */}
        <div className="flex items-center gap-4 shrink-0">
          <a
            href="#contact"
            className="hidden xl:inline-flex items-center gap-2 text-sm font-medium text-[var(--foreground)] whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[var(--accent)]"
          >
            <span
              className="h-2 w-2 rounded-full bg-[var(--accent)]"
              aria-hidden="true"
            />
            <span>Available for freelance projects</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex md:hidden h-11 w-11 items-center justify-center rounded-[6px] border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] transition-colors duration-150 hover:border-[var(--foreground)] cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* GPU-accelerated reading progress hairline */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX }}
        className="pointer-events-none h-[2px] w-full origin-left bg-[var(--accent)]/85"
      />

      {/* Mobile navigation drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden border-t border-[var(--border)] bg-[var(--background)] px-5 pb-6 pt-4 sm:px-8"
          >
            <ul className="divide-y divide-[var(--border)]">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSectionId === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      onClick={handleNavClick}
                      className={`flex min-h-[48px] items-center justify-between text-base font-medium transition-colors duration-150 ${
                        isActive
                          ? 'text-[var(--accent)]'
                          : 'text-[var(--foreground)] hover:text-[var(--accent)]'
                      }`}
                    >
                      <span>{item.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="mt-4 flex items-center gap-2 border-t border-[var(--border)] pt-4 text-xs font-medium text-[var(--muted-strong)]">
              <span
                className="h-2 w-2 rounded-full bg-[var(--accent)]"
                aria-hidden="true"
              />
              <span>Taking on freelance projects, based in {CONTACT_PROFILE.shortLocation}</span>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
