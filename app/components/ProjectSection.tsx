import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Project {
  id: number;
  title: string;
  tagline: string;
  description: string;
  image: string;
  liveUrl?: string;
  githubUrl?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    tagline: "Full Stack Development",
    description: "A modern e-commerce platform built with React, TypeScript, and Node.js featuring real-time inventory management and secure payment processing.",
    image: "/images/portfolio-image1.png",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 2,
    title: "AI Dashboard",
    tagline: "Machine Learning",
    description: "Interactive dashboard for AI model monitoring and analytics with real-time data visualization and predictive analytics capabilities.",
    image: "/images/portfolio-image1.png",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 3,
    title: "Mobile App",
    tagline: "React Native",
    description: "Cross-platform mobile application with offline capabilities, push notifications, and seamless user experience across iOS and Android.",
    image: "/images/portfolio-image1.png",
    liveUrl: "#",
    githubUrl: "#"
  }
];

export default function ProjectSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const titlesRef = useRef<HTMLHeadingElement[]>([]);
  const descriptionsRef = useRef<HTMLParagraphElement[]>([]);
  const headerTitleRef = useRef<HTMLHeadingElement>(null);
  const headerDescriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const cards = cardsRef.current;
    const titles = titlesRef.current;
    const descriptions = descriptionsRef.current;
    const lastCardIndex = cards.length - 1;

    // Animate header elements
    if (headerTitleRef.current) {
      gsap.fromTo(headerTitleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headerTitleRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: true,
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    if (headerDescriptionRef.current) {
      gsap.fromTo(headerDescriptionRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headerDescriptionRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: true,
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    if (!cards.length) return;

    // Create ScrollTriggers for first and last card
    const firstCardST = ScrollTrigger.create({
      trigger: cards[1] || cards[0],
      start: "center center"
    });

    const lastCardST = ScrollTrigger.create({
      trigger: cards[lastCardIndex],
      start: "center center"
    });

    // Initialize GSAP animations for cards
    cards.forEach((card, index) => {
      const scale = index === lastCardIndex ? 1 : 0.5;
      const scaleDown = gsap.to(card, {
        scale: scale,
      });

      ScrollTrigger.create({
        trigger: card,
        start: "top top",
        end: () => lastCardST.start,
        pin: true,
        pinSpacing: false,
        scrub: 0.5,
        ease: "none",
        animation: scaleDown,
        toggleActions: "restart none none reverse"
      });
    });

    // Initialize GSAP animations for titles and descriptions
    titles.forEach((title, index) => {
      if (title) {
        gsap.fromTo(title,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: title,
              start: "top 80%",
              end: "top 20%",
              scrub: true,
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });

    descriptions.forEach((description, index) => {
      if (description) {
        gsap.fromTo(description,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: description,
              start: "top 80%",
              end: "top 20%",
              scrub: true,
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
    };
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  const addToTitleRefs = (el: HTMLHeadingElement | null, index: number) => {
    if (el) {
      titlesRef.current[index] = el;
    }
  };

  const addToDescriptionRefs = (el: HTMLParagraphElement | null, index: number) => {
    if (el) {
      descriptionsRef.current[index] = el;
    }
  };

  return (
    <section id="projects" ref={sectionRef} className="min-h-screen bg-black relative overflow-hidden py-20">
      {/* Section Header */}
      <div className="container mx-auto px-6 text-center mb-16">
        <h2
          ref={headerTitleRef}
          className="text-4xl md:text-6xl font-bold text-white mb-6 font-playfair"
        >
          Featured <span className="text-gray-400">Projects</span>
        </h2>
        <p
          ref={headerDescriptionRef}
          className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
        >
          Showcase of innovative web applications and digital experiences
        </p>
      </div>

      {/* GSAP Stack Cards */}
      <div className="l-cards">
        {projects.map((project, index) => (
          <div
            key={project.id}
            ref={addToRefs}
            className="c-card bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden transform-gpu"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '40px',
              marginTop: '40px',
              width: '100%',
              height: '80vh',
              minHeight: '500px',
              transformOrigin: 'center center'
            }}
          >
            {/* Project Description */}
            <div 
              className="c-card__description text-white"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '60px'
              }}
            >
              <span className="c-card__tagline text-blue-400 mb-4 text-sm uppercase tracking-wider">
                {project.tagline}
              </span>
              <h3 
                ref={(el) => addToTitleRefs(el, index)}
                className="c-card__title text-3xl md:text-4xl font-bold mb-6 font-playfair"
              >
                {project.title}
              </h3>
              <p 
                ref={(el) => addToDescriptionRefs(el, index)}
                className="c-card__excerpt text-gray-300 mb-8 leading-relaxed"
              >
                {project.description}
              </p>
              <div className="c-card__cta">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    className="border border-white/20 text-white px-6 py-3 rounded-lg hover:border-white/40 hover:bg-white/5 transition-all duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>

            {/* Project Image */}
            <div 
              className="c-card__figure"
              style={{
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <img
                src={project.image}
                alt={project.title}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Spacer */}
      <div className="spacer" style={{ width: '100%', height: '100vh' }}></div>

      {/* Mobile styles */}
      <style>{`
        @media (max-width: 768px) {
          .c-card {
            grid-template-columns: 1fr !important;
            height: auto !important;
            min-height: auto !important;
          }
          
          .c-card__description {
            padding: 40px 20px !important;
          }
          
          .c-card__figure {
            height: 300px !important;
          }
        }
      `}</style>
    </section>
  );
}