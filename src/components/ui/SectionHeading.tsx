import type { ReactNode } from 'react';

interface SectionHeadingProps {
  headingId?: string;
  heading: ReactNode;
  description?: string;
  dark?: boolean;
  className?: string;
}

export function SectionHeading({
  headingId,
  heading,
  description,
  dark = false,
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <h2
        id={headingId}
        className={`type-section ${dark ? 'text-[var(--dark-text)]' : 'text-[var(--foreground)]'}`}
      >
        {heading}
      </h2>

      {description && (
        <p
          className={`mt-4 max-w-xl text-[15px] md:text-base leading-relaxed ${
            dark ? 'text-[var(--dark-muted)]' : 'text-[var(--muted-strong)]'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
