import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'dark-primary' | 'dark-secondary' | 'text';
type ButtonSize = 'sm' | 'md' | 'lg';

interface SharedProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
}

type ActionButtonProps = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type LinkButtonProps = SharedProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type ButtonProps = ActionButtonProps | LinkButtonProps;

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--foreground)] text-[var(--background)] border border-[var(--foreground)] hover:bg-[var(--accent)] hover:border-[var(--accent)] active:translate-y-px',
  secondary:
    'bg-transparent text-[var(--foreground)] border border-[var(--border)] hover:border-[var(--foreground)] hover:bg-[var(--surface)] active:translate-y-px',
  'dark-primary':
    'bg-[var(--dark-text)] text-[var(--dark)] border border-[var(--dark-text)] hover:bg-[var(--accent-on-dark)] hover:border-[var(--accent-on-dark)] active:translate-y-px',
  'dark-secondary':
    'bg-transparent text-[var(--dark-text)] border border-[var(--dark-border)] hover:border-[var(--dark-text)] hover:bg-[var(--dark-surface)] active:translate-y-px',
  text:
    'bg-transparent text-[var(--foreground)] border border-transparent hover:text-[var(--accent)] px-0 py-1',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-[13px] min-h-[40px]',
  md: 'px-5 py-2.5 text-sm min-h-[44px]',
  lg: 'px-6 py-3 text-sm min-h-[48px]',
};

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', children, className = '' } = props;

  const baseClasses = [
    'group inline-flex items-center justify-center gap-2 rounded-[6px] font-medium',
    'whitespace-nowrap shrink-0 transition-colors transition-transform duration-150 ease-out cursor-pointer',
    'disabled:opacity-50 disabled:pointer-events-none',
    VARIANT_CLASSES[variant],
    variant === 'text' ? '' : SIZE_CLASSES[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if ('href' in props && props.href !== undefined) {
    const {
      variant: _v,
      size: _s,
      children: _c,
      className: _cl,
      href,
      ...anchorRest
    } = props;
    return (
      <a href={href} className={baseClasses} {...anchorRest}>
        {children}
      </a>
    );
  }

  const {
    variant: _v,
    size: _s,
    children: _c,
    className: _cl,
    type = 'button',
    ...buttonRest
  } = props as ActionButtonProps;

  return (
    <button type={type} className={baseClasses} {...buttonRest}>
      {children}
    </button>
  );
}
