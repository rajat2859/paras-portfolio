import { useEffect, useState } from 'react';
import { getActiveSectionId, type SectionOffset } from '../lib/portfolio';

export function useScrollState(sectionIds: string[]) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string>(sectionIds[0] ?? 'home');

  useEffect(() => {
    const updateScrollState = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 24);

      const offsets: SectionOffset[] = sectionIds
        .map((id) => {
          const el = document.getElementById(id);
          if (!el) return null;
          return {
            id,
            top: el.getBoundingClientRect().top + scrollY,
          };
        })
        .filter((entry): entry is SectionOffset => entry !== null);

      if (offsets.length > 0) {
        // If near the very bottom of the document, highlight the final section (contact)
        const nearBottom =
          window.innerHeight + scrollY >= document.documentElement.scrollHeight - 48;
        if (nearBottom) {
          setActiveSectionId(offsets[offsets.length - 1].id);
        } else {
          setActiveSectionId(getActiveSectionId(scrollY, offsets, 180));
        }
      }
    };

    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [sectionIds]);

  return { isScrolled, activeSectionId };
}
