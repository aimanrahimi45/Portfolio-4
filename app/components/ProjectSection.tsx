import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';

interface ProjectSectionProps {
  className?: string;
}

export default function ProjectSection({ className = '' }: ProjectSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const projectsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Ensure elements are visible initially
    gsap.set(titleRef.current, { opacity: 1, scale: 1, y: 0 });
    gsap.set(descriptionRef.current, { opacity: 1, y: 0 });
    gsap.set(projectsContainerRef.current, { opacity: 0, y: 100 });

    // Create separate scroll triggers for better control
    const titleTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 10%',
      end: 'top 10%',
      scrub: true,
      onEnter: () => {
        gsap.to(titleRef.current, { opacity: 1, scale: 1, y: 0, duration: 0.5 });
      },
      onLeaveBack: () => {
        gsap.to(titleRef.current, { opacity: 0, scale: 0.8, y: 50, duration: 0.5 });
      },
      markers: true
    });

    const descriptionTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 10%',
      end: 'top 10%',
      scrub: true,
      onEnter: () => {
        gsap.to(descriptionRef.current, { opacity: 1, y: 0, duration: 0.4 });
      },
      onLeaveBack: () => {
        gsap.to(descriptionRef.current, { opacity: 0, y: 30, duration: 0.4 });
      },
      markers: true
    });

    const projectsTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'center center',
      end: 'bottom 20%',
      scrub: true,
      onEnter: () => {
        gsap.to(projectsContainerRef.current, { opacity: 1, y: 0, duration: 0.5 });
        gsap.to([titleRef.current, descriptionRef.current], { opacity: 0, scale: 0.9, duration: 0.5 });
      },
      onLeaveBack: () => {
        gsap.to(projectsContainerRef.current, { opacity: 0, y: 100, duration: 0.5 });
        gsap.to([titleRef.current, descriptionRef.current], { opacity: 1, scale: 1, duration: 0.5 });
      },
      markers: true
    });

    return () => {
      [titleTrigger, descriptionTrigger, projectsTrigger].forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className={`min-h-screen flex items-center justify-center relative overflow-hidden bg-black py-20 ${className}`}
    >
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Title Section */}
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-4xl md:text-6xl font-bold text-white mb-6 font-playfair"
            style={{ opacity: 1 }} // Ensure title is initially visible
          >
            My <span className="text-gray-400">Projects</span>
          </h2>
          <p
            ref={descriptionRef}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            style={{ opacity: 1 }} // Ensure description is initially visible
          >
            A showcase of my recent work and technical expertise
          </p>
        </div>

        {/* Projects Container - Initially hidden */}
        <div
          ref={projectsContainerRef}
          className="opacity-0"
        >
          <div className="text-center">
            <p className="text-gray-400 text-lg">Project boxes will appear here</p>
          </div>
        </div>
      </div>
    </section>
  );
}
