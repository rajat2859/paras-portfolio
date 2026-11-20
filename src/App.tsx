import { useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { SelectedWork } from './components/sections/SelectedWork';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Experience } from './components/sections/Experience';
import { Education } from './components/sections/Education';
import { Contact } from './components/sections/Contact';
import { ProjectDetailModal } from './components/ui/ProjectDetailModal';
import { ProjectLightbox } from './components/ui/ProjectLightbox';
import type { ProjectItem } from './types/portfolio';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [requestedAction, setRequestedAction] = useState<'overview' | 'live' | 'source'>(
    'overview'
  );
  const [lightboxState, setLightboxState] = useState<{
    project: ProjectItem | null;
    screenIndex: number;
  }>({ project: null, screenIndex: 0 });

  const handleSelectProject = (
    project: ProjectItem,
    action: 'overview' | 'live' | 'source'
  ) => {
    setSelectedProject(project);
    setRequestedAction(action);
  };

  const handleExpandScreen = (project: ProjectItem, screenIndex: number) => {
    setLightboxState({ project, screenIndex });
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-[6px] focus:bg-[var(--foreground)] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[var(--background)]"
        >
          Skip to main content
        </a>

        <Navbar />

        <main id="main-content">
          <Hero onExpandScreen={handleExpandScreen} />
          <SelectedWork
            onSelectProject={handleSelectProject}
            onExpandScreen={handleExpandScreen}
          />
          <About />
          <Skills />
          <Experience />
          <Education />
          <Contact />
        </main>

        <Footer />

        <ProjectDetailModal
          project={selectedProject}
          requestedAction={requestedAction}
          onClose={() => setSelectedProject(null)}
        />

        <ProjectLightbox
          project={lightboxState.project}
          screenIndex={lightboxState.screenIndex}
          onChangeIndex={(screenIndex) =>
            setLightboxState((prev) => ({ ...prev, screenIndex }))
          }
          onClose={() => setLightboxState({ project: null, screenIndex: 0 })}
        />
      </div>
    </MotionConfig>
  );
}
