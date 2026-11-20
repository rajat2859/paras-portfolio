export type ProjectPreviewKind = 'automotive-showcase' | 'operations-showcase';

export interface ProjectScreen {
  id: string;
  label: string;
  caption: string;
  image: string;
  alt: string;
}

export interface ProjectItem {
  id: string;
  index: string;
  name: string;
  subtitle: string;
  title: string;
  category: string;
  year: string;
  description: string;
  role: string;
  technologies: string[];
  highlights: string[];
  previewKind: ProjectPreviewKind;
  screens: ProjectScreen[];
  liveDisplayHost: string;
  /**
   * Editable URL configuration.
   * Real production URLs navigate directly; placeholder strings open the
   * project overview dialog until replaced.
   */
  liveUrl: string;
  sourceUrl: string;
  architectureNote: string;
}

export interface SkillGroup {
  id: string;
  index: string;
  title: string;
  summary: string;
  items: string[];
}

export interface ExperienceEntry {
  id: string;
  index: string;
  role: string;
  organization: string;
  period: string;
  current: boolean;
  responsibilities: string[];
}

export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  year: string;
  detail?: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface ContactProfile {
  name: string;
  descriptor: string;
  availability: string;
  email: string;
  phone: string;
  location: string;
  shortLocation: string;
  coordinates: string;
}
