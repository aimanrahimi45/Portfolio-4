import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Parallax, Mousewheel } from 'swiper/modules';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface PortfolioItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  highlights: string[];
  icon: string;
}

interface PortfolioSectionProps {
  className?: string;
}

// Lazy loaded media component for both dotlottie and images
function LazyMedia({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {isVisible ? (
        src.endsWith('.lottie') ? (
          <DotLottieReact
            src={src}
            loop
            autoplay
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
        )
      ) : (
        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
          <div className="text-white text-sm">Loading...</div>
        </div>
      )}
    </div>
  );
}

export default function PortfolioSection({ className = '' }: PortfolioSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const portfolioItems: PortfolioItem[] = [
    // Card 1: Foundation - Industry Experience
    {
      id: 1,
      title: "Industry Experience Meets Technology",
      subtitle: "The Foundation",
      description: "My background in operational processes gives me unique insight into real-world business challenges. I understand workflows before I write code, ensuring solutions that actually work.",
      image: "/images/Man and robot with computers sitting together in workplace.lottie", // Collaboration and teamwork theme
      highlights: ["Deep operational understanding", "Real-world problem identification", "Process-first approach"],
      icon: "🏭"
    },
    // Card 2: Approach - Process Automation
    {
      id: 2,
      title: "Process Automation Specialist",
      subtitle: "The Approach",
      description: "I specialize in transforming manual workflows into efficient automated systems. My focus is on practical solutions that deliver measurable business impact and operational efficiency.",
      image: "/images/Marketing%20Campaign%20-%20Creative%203D%20Animation.lottie", // Marketing and creative automation theme
      highlights: ["Workflow transformation", "Measurable efficiency gains", "Practical automation solutions"],
      icon: "⚡"
    },
    // Card 3: Results - Business Impact
    {
      id: 3,
      title: "Tangible Business Impact",
      subtitle: "The Results",
      description: "Beyond technical implementation, I focus on delivering real value: time savings, error reduction, and improved compliance. Technology should serve business goals, not the other way around.",
      image: "/images/AI%20data.lottie", // AI and data analytics theme
      highlights: ["Time and cost savings", "Error prevention", "Compliance enhancement"],
      icon: "📈"
    }
  ];

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
        markers: false
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
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20">
        {/* Spotlight effect overlay */}
        <div
          className="absolute inset-0 bg-black/80 z-10"
          style={{
            mask: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)`,
            WebkitMask: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)`
          }}
        ></div>
      </div>

      {/* Content - Swiper Carousel */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
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

        {/* Swiper Carousel */}
        <div className="swiper-container-wrapper">
          <Swiper
            modules={[Navigation, Pagination, Parallax, Mousewheel]}
            direction="vertical"
            loop={false}
            speed={1000}
            parallax={true}
            mousewheel={{
              releaseOnEdges: true,
              eventsTarget: 'container',
              forceToAxis: true,
              sensitivity: 0.5,
              thresholdDelta: 10,
            }}
            pagination={{
              clickable: true,
              renderBullet: (index, className) => {
                return `<span class="${className} bg-white/40 hover:bg-white/80 transition-all duration-300"></span>`;
              }
            }}
            className="h-96 md:h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl"
          >
            {portfolioItems.map((item) => (
              <SwiperSlide key={item.id} className="bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                  {/* Image Side */}
                  <div className="relative overflow-hidden group">
                    <div className={`swiper-image-inner swiper-image-left ${item.id === 2 || item.id === 3 ? 'lottie-position-down lottie-scale-sm' : ''}`}>
                      <LazyMedia
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent group-hover:from-black/30 transition-all duration-500"></div>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="p-8 md:p-12 flex flex-col justify-center text-white">
                    <span className="text-blue-400 mb-2 text-sm uppercase tracking-wider font-semibold">
                      {item.subtitle}
                    </span>
                    
                    <h3 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Journey Highlights */}
                    <div className="mb-6">
                      <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-3">Key Insights</h4>
                      <div className="space-y-2">
                        {item.highlights.map((highlight, index) => (
                          <div
                            key={index}
                            className="flex items-center text-gray-300 text-sm"
                          >
                            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></span>
                            {highlight}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Icon Indicator */}
                    <div className="text-4xl opacity-60 mt-4">
                      {item.icon}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Custom styles for Swiper */}
      <style>{`
        .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          opacity: 0.4;
          transition: all 0.3s ease;
        }
        
        .swiper-pagination-bullet-active {
          opacity: 1;
          background: #fff;
          transform: scale(1.2);
        }
        
        .swiper-container-wrapper {
          position: relative;
        }
        
        .swiper-image-left {
          filter: sepia(100%);
          transition: all 1s ease;
        }
        
        .swiper-slide-active .swiper-image-left {
          filter: sepia(0%);
        }
        
        .lottie-position-down {
          padding-top: 5rem;
        }
        
        .lottie-scale-sm {
          transform: scale(1.2);
          transform-origin: center;
        }
      `}</style>
    </section>
  );
}
