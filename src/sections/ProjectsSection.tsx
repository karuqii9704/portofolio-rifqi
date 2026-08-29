import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import LiveProjectButton from '../components/LiveProjectButton';
import WorkTile from '../components/WorkTile';
import { PROJECTS } from '../data/content';
import type { Project, ProjectSlot } from '../data/content';

const RADIUS = 'rounded-[40px] sm:rounded-[50px] md:rounded-[60px]';

function Slot({ slot, height }: { slot: ProjectSlot; height?: string }) {
  if (slot.kind === 'image') {
    return (
      <img
        src={slot.src}
        alt={slot.alt}
        loading="lazy"
        decoding="async"
        className={`w-full object-cover ${RADIUS}`}
        style={{ height }}
      />
    );
  }

  return (
    <div className="w-full" style={{ height }}>
      <WorkTile
        name={slot.name}
        meta={slot.meta}
        tech={slot.tech}
        tone={slot.tone}
        radiusClassName={RADIUS}
      />
    </div>
  );
}

function ProjectCard({
  project,
  index,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);

  return (
    <div className="flex h-[85vh] items-start justify-center">
      <motion.article
        className={`sticky top-24 w-full origin-top border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:top-32 md:p-8 ${RADIUS}`}
        style={{ scale, top: `${index * 28}px` }}
      >
        <div className="flex flex-wrap items-center justify-between gap-4 px-2 pb-4 sm:pb-6 md:pb-8">
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
            <span
              className="font-black leading-none text-[#D7E2EA]"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 100px)' }}
            >
              {project.number}
            </span>
            <div className="flex flex-col gap-1">
              <p className="text-[0.6rem] font-light uppercase tracking-[0.22em] text-[#D7E2EA]/60 sm:text-xs">
                {project.category}
              </p>
              <h3
                className="font-medium uppercase leading-tight tracking-tight text-[#D7E2EA]"
                style={{ fontSize: 'clamp(1.1rem, 2.6vw, 2.1rem)' }}
              >
                {project.name}
              </h3>
            </div>
          </div>

          <LiveProjectButton href={project.href} label={project.linkLabel} />
        </div>

        <div className="flex gap-3 sm:gap-4 md:gap-5">
          <div className="flex w-[40%] flex-col gap-3 sm:gap-4 md:gap-5">
            <Slot slot={project.col1[0]} height="clamp(130px, 16vw, 230px)" />
            <Slot slot={project.col1[1]} height="clamp(160px, 22vw, 340px)" />
          </div>
          <div className="w-[60%]">
            <Slot slot={project.col2} height="clamp(306px, 38.6vw, 590px)" />
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 pb-20 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 md:-mt-14 md:rounded-t-[60px] md:px-10"
      style={{ overflowX: 'clip' }}
    >
      <FadeIn
        as="h2"
        delay={0}
        y={40}
        className="hero-heading mb-10 text-center font-black uppercase leading-none tracking-tight sm:mb-14 md:mb-20"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Project
      </FadeIn>

      <div ref={containerRef} className="mx-auto max-w-6xl">
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={index}
            total={PROJECTS.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}
