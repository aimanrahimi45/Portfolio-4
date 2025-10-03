import React, { useRef, useState, useEffect } from 'react';
import ScrollRevealImage from './ScrollRevealImage';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';

interface PortfolioSectionProps {
  className?: string;
}

export default function PortfolioSection({ className = '' }: PortfolioSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Ensure elements are visible initially
    gsap.set(titleRef.current, { opacity: 1, y: 0 });
    gsap.set(descriptionRef.current, { opacity: 1, y: 0 });

    // Create a timeline for smoother sequencing
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 20%',
        end: 'bottom 20%',
        scrub: true,
        markers: true
      }
    });

    // Title animation - stays visible longer
    tl.fromTo(titleRef.current,
      { opacity: 1, y: 0 },
      { opacity: 1, y: 0, duration: 0.5 },
      "start"
    )
    // Description animation - stays visible longer
    .fromTo(descriptionRef.current,
      { opacity: 1, y: 0 },
      { opacity: 1, y: 0, duration: 0.4 },
      "start+=0.1"
    )
    // Title/description fade out gradually as user scrolls deeper
    .to([titleRef.current, descriptionRef.current],
      { opacity: 0, y: -50, duration: 0.6 },
      "start+=0.5"
    );

    // Keep title/description visible when scrolling back up
    const reverseTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 20%',
        end: 'bottom 20%',
        scrub: true,
        toggleActions: "play reverse play reverse"
      }
    });

    reverseTl
      .to([titleRef.current, descriptionRef.current], { opacity: 1, y: 0, duration: 0.5 });

    return () => {
      tl.scrollTrigger?.kill();
      reverseTl.scrollTrigger?.kill();
    };
  }, []);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
  };

  return (
    <section
      id="portfolio"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`min-h-screen flex items-center justify-center relative overflow-hidden ${className}`}
    >
      {/* Background with simple image display */}
      <div className="absolute inset-0 z-0">
        {/* Background overlay to match the page background with spotlight effect */}
        <div
          className="absolute inset-0 bg-black/80 z-10"
          style={{
            mask: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)`,
            WebkitMask: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)`
          }}
        ></div>
        <div className="absolute inset-0">
          {/* Grayscale image with scroll reveal effect */}
          <ScrollRevealImage
            baseOpacity={0}
            enableBlur={true}
            baseRotation={5}
            blurStrength={10}
            containerClassName="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <img
              src="/images/portfolio-image1.png"
              alt="Portfolio"
              className="max-w-[100vw] max-h-[140vh] object-contain grayscale"
            />
          </ScrollRevealImage>
          
          {/* Original image with spotlight effect */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              mask: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)`,
              WebkitMask: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)`
            }}
          >
            <ScrollRevealImage
              baseOpacity={0}
              enableBlur={true}
              baseRotation={5}
              blurStrength={10}
              containerClassName="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <img
                src="/images/portfolio-image1.png"
                alt="Portfolio"
                className="max-w-[100vw] max-h-[140vh] object-contain"
              />
            </ScrollRevealImage>
          </div>
        </div>
      </div>

      {/* Content - Minimalist focus on the image */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-center px-6 max-w-6xl" style={{ marginTop: '4vh', marginBottom: '4vh' }}>
        <div className="mb-16" style={{ paddingTop: '32rem', paddingBottom: '2rem' }}>
          <h2
            ref={titleRef}
            className="text-4xl md:text-6xl font-bold text-white mb-6 font-playfair"
            style={{ lineHeight: '1.2', opacity: 1 }}
          >
            My <span className="text-gray-400">Portfolio</span>
          </h2>
          <p
            ref={descriptionRef}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            style={{ letterSpacing: '0.5px', opacity: 1 }}
          >
            A visual showcase of my creative work and professional journey
          </p>
        </div>
      </div>
    </section>
  );
}
