import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface SmoothLoopSkillsProps {
  skills?: string[];
  speed?: number;
  direction?: 'left' | 'right';
  gap?: number;
  pauseOnHover?: boolean;
  className?: string;
}

const ANIMATION_CONFIG = {
  SMOOTH_TAU: 0.25,
  MIN_COPIES: 2,
  COPY_HEADROOM: 2
} as const;

export default function SmoothLoopSkills({
  skills = [
    "Web Design", "Backend Development", "API Integration", "React.js", 
    "Node.js", "TypeScript", "Cloud Native", "UI/UX Design",
    "Database Design", "DevOps", "Microservices", "Responsive Design"
  ],
  speed = 30,
  direction = 'left',
  gap = 32,
  pauseOnHover = true,
  className = ''
}: SmoothLoopSkillsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const seqRef = useRef<HTMLDivElement>(null);

  const [seqWidth, setSeqWidth] = useState<number>(0);
  const [copyCount, setCopyCount] = useState<number>(ANIMATION_CONFIG.MIN_COPIES);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);
  
  // Animation state refs to persist across renders
  const rafRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);
  const prevSeqWidthRef = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const targetVelocity = useMemo(() => {
    const magnitude = Math.abs(speed);
    const directionMultiplier = direction === 'left' ? 1 : -1;
    return magnitude * directionMultiplier;
  }, [speed, direction]);

  const updateDimensions = useCallback(() => {
    const containerWidth = containerRef.current?.clientWidth ?? 0;
    const sequenceWidth = seqRef.current?.getBoundingClientRect?.()?.width ?? 0;

    if (sequenceWidth > 0) {
      setSeqWidth(Math.ceil(sequenceWidth));
      const copiesNeeded = Math.ceil(containerWidth / sequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM;
      setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
    }
  }, []);

  // Resize observer
  useEffect(() => {
    const handleResize = () => updateDimensions();
    window.addEventListener('resize', handleResize);
    updateDimensions();
    return () => window.removeEventListener('resize', handleResize);
  }, [updateDimensions]);

  // Animation loop
  // Animation loop - use refs to persist animation state across renders
  useEffect(() => {
    const track = trackRef.current;
    if (!track || seqWidth === 0) return;

    // Reset animation state when sequence width changes significantly
    if (seqWidth !== prevSeqWidthRef.current) {
      offsetRef.current = 0;
      velocityRef.current = targetVelocity;
      prevSeqWidthRef.current = seqWidth;
      track.style.transform = `translate3d(0, 0, 0)`;
    }

    const animate = (timestamp: number) => {
      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp;
      }

      const deltaTime = Math.max(0, timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      const target = pauseOnHover && isHovered ? 0 : targetVelocity;

      // Smooth easing with proper physics - use a slightly slower easing for smoother transitions
      const easingFactor = 1 - Math.exp(-deltaTime / (ANIMATION_CONFIG.SMOOTH_TAU * 1.5));
      velocityRef.current += (target - velocityRef.current) * easingFactor;

      // Only update if velocity is significant to avoid jitter
      if (Math.abs(velocityRef.current) > 0.1) {
        let nextOffset = offsetRef.current + velocityRef.current * deltaTime;
        nextOffset = ((nextOffset % seqWidth) + seqWidth) % seqWidth;
        offsetRef.current = nextOffset;
        track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      lastTimestampRef.current = null;
    };
  }, [targetVelocity, seqWidth, isHovered, pauseOnHover]);
  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setIsHovered(true);
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) setIsHovered(false);
  }, [pauseOnHover]);

  const renderSkill = useCallback((skill: string, index: number) => (
    <div
      key={index}
      className="flex-shrink-0 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-gray-300 text-sm font-medium transition-all duration-300 hover:bg-white/10 hover:text-white hover:scale-105"
      style={{ marginRight: `${gap}px` }}
    >
      {skill}
    </div>
  ), [gap]);

  const skillLists = useMemo(() => 
    Array.from({ length: copyCount }, (_, copyIndex) => (
      <div
        key={`copy-${copyIndex}`}
        className="flex"
        ref={copyIndex === 0 ? seqRef : undefined}
      >
        {skills.map((skill, index) => renderSkill(skill, index))}
      </div>
    )),
  [copyCount, skills, renderSkill]);

  return (
    <div 
      className={`relative w-full overflow-hidden py-4 transition-all duration-1000 delay-400 ${
        mounted ? 'opacity-100 blur-0' : 'opacity-0 blur-xl'
      } ${className}`}
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="flex w-max will-change-transform"
        ref={trackRef}
      >
        {skillLists}
      </div>

      {/* Gradient fade effects */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
    </div>
  );
}