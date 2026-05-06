export type ProfileLinks = {
  github: string;
  linkedin: string;
  resume: string;
  twitter?: string;
};

export type Profile = {
  name: string;
  initials: string;
  tagline: string;
  bio: string;
  available: boolean;
  email: string;
  skills: readonly string[];
  links: ProfileLinks;
};

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  description: string;
  current?: boolean;
};

export type Project = {
  title: string;
  description: string;
  tags: readonly string[];
  repo: string;
  /** Optional URL to a live demo. When present, a demo icon is shown alongside the GitHub icon. */
  demo?: string;
  featured?: boolean;
};

export type Labels = {
  navHome: string;
  navAbout: string;
  navExperience: string;
  navProjects: string;
  availableBadge: string;
  experienceTitle: string;
  projectsTitle: string;
  projectsSearchPlaceholder: string;
  projectsEmptyState: string;
  footerTagline: string;
  consoleGreeting: string;
  consoleSubtext: string;
};

export type Content = {
  profile: Profile;
  experience: readonly ExperienceItem[];
  projects: readonly Project[];
  labels: Labels;
};
