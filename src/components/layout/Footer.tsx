import { ArrowUp } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[var(--dark-border)] bg-[var(--dark)] text-[var(--dark-text)]">
      <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-3 px-5 py-7 sm:px-8 md:flex-row md:items-center lg:px-12">
        <p className="text-sm font-medium">Paras Verma © {new Date().getFullYear()}</p>

        <p className="text-sm text-[var(--dark-muted)]">Built with React and Tailwind CSS.</p>

        <button
          type="button"
          onClick={scrollToTop}
          className="inline-flex min-h-[40px] shrink-0 items-center gap-1.5 whitespace-nowrap text-sm font-medium text-[var(--dark-text)] transition-colors duration-150 hover:text-[var(--accent-on-dark)] cursor-pointer"
        >
          <span>Back to top</span>
          <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
    </footer>
  );
}
