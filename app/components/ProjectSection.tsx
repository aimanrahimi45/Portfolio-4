import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';

gsap.registerPlugin(ScrollTrigger);

interface ProjectSectionProps {
  className?: string;
}

export default function ProjectSection({ className = '' }: ProjectSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current) return;

    // Initial state - hide the title
    gsap.set(titleRef.current, {
      opacity: 0,
      y: 50,
      scale: 0.8,
    });

    // Create scroll trigger animation that triggers after portfolio section is completely off screen
    const st = ScrollTrigger.create({
      trigger: titleRef.current, // Use the title element as the trigger
      start: 'top center', // Start when the top of the title hits the center of the viewport
      onEnter: () => {
        // Animate the title when it comes into the middle of the viewport
        gsap.to(titleRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
        });
      },
      onLeaveBack: () => {
        // Reset the animation when scrolling back up
        gsap.to(titleRef.current, {
          opacity: 0,
          y: 50,
          scale: 0.8,
          duration: 0.5,
          ease: 'power3.in',
        });
      },
      // markers: true, // Uncomment for debugging
    });

    // Clean up on unmount
    return () => {
      st.kill();
      ScrollTrigger.getAll().forEach((trigger: ScrollTrigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`min-h-screen flex items-center justify-center relative bg-black ${className}`}
      style={{ marginTop: '15vh' }} // Reduce the distance between sections
    >
      {/* Content - Only title */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <div ref={titleRef} className="mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-playfair" style={{ lineHeight: '1.2' }}>
            My <span className="text-gray-400">Projects</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed" style={{ letterSpacing: '0.5px' }}>
            A showcase of my development work and technical expertise
          </p>
        </div>
      </div>
    </section>
  );
}