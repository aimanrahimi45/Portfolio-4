import type { MetaFunction } from "@remix-run/node";
import { useState, useEffect } from "react";
import SmoothLoopSkills from "~/components/SmoothLoopSkills";
import PortfolioSection from "~/components/PortfolioSection";

export const meta: MetaFunction = () => {
  return [
    { title: "Aiman | Full Stack Developer" },
    { name: "description", content: "Professional portfolio showcasing modern web development projects and expertise in React, TypeScript, and cloud technologies." },
  ];
};

export default function Index() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative z-10 bg-black pt-16">
        <div className="text-center px-6 max-w-6xl mx-auto">
          {/* Looping Skills Animation */}
          <div className="mb-12 pt-8">
            <SmoothLoopSkills />
          </div>
          {/* Main headline with fade + blur effect */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-white leading-tight font-playfair">
            <span className={`transition-all duration-1000 ${mounted ? 'opacity-100 blur-0 translate-y-0' : 'opacity-0 blur-xl translate-y-8'}`}>
              I'm <span className="text-gray-400">Aiman</span>,
            </span>
            <br />
            <span className={`transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 blur-0 translate-y-0' : 'opacity-0 blur-xl translate-y-8'}`}>
              a Full Stack Developer
            </span>
          </h1>
          
          {/* Subtitle with fade + blur effect */}
          <div className="mb-8">
            <p className={`text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-500 ${
              mounted ? 'opacity-100 blur-0 translate-y-0' : 'opacity-0 blur-xl translate-y-8'
            }`}>
              Crafting digital experiences with modern technologies and clean code.
              Specializing in React, TypeScript, and cloud-native applications.
            </p>
          </div>

          {/* Stats with fade + blur effect */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-2xl mx-auto transition-all duration-1000 delay-700 ${
            mounted ? 'opacity-100 blur-0 translate-y-0' : 'opacity-0 blur-xl translate-y-8'
          }`}>
            <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="text-2xl font-bold text-white">50+</div>
              <div className="text-gray-400 text-sm">Projects</div>
            </div>
            <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="text-2xl font-bold text-white">5+</div>
              <div className="text-gray-400 text-sm">Years Experience</div>
            </div>
            <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="text-2xl font-bold text-white">100%</div>
              <div className="text-gray-400 text-sm">Client Satisfaction</div>
            </div>
          </div>

          {/* CTA Buttons with fade + blur effect */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-900 ${
            mounted ? 'opacity-100 blur-0 translate-y-0' : 'opacity-0 blur-xl translate-y-8'
          }`}>
            <button
              onClick={() => scrollToSection('projects')}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40"
            >
              View Portfolio
              <span className="absolute inset-0 bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>
            
            <button
              onClick={() => scrollToSection('contact')}
              className="group relative px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-lg hover:border-white/40 hover:bg-white/5 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
            >
              Get In Touch
              <span className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <PortfolioSection />
    </div>
  );
}