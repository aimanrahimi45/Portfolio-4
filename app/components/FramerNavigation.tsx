import { useState } from "react";

export default function FramerNavigation() {
  const [activeItem, setActiveItem] = useState("home");

  const navItems = [
    {
      id: "home",
      name: "Home",
      href: "#home",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      id: "about",
      name: "About",
      href: "#about",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: "projects",
      name: "Projects",
      href: "#projects",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      id: "contact",
      name: "Contact",
      href: "#contact",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  const scrollToSection = (href: string, id: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setActiveItem(id);
  };

  return (
    <nav 
      className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50"
      style={{
        backdropFilter: "blur(30px)",
        backgroundColor: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "80px",
        boxShadow: "rgba(0, 0, 0, 0.5) 0px 8px 24px 0px, rgba(255, 255, 255, 0.04) 0px -8px 24px 0px",
        padding: "8px",
      }}
    >
      <div className="flex items-center space-x-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.href, item.id)}
            className={`p-3 rounded-full transition-all duration-200 ${
              activeItem === item.id
                ? "bg-white/10 text-white"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
            style={{
              opacity: activeItem === item.id ? 1 : 0.5,
            }}
            title={item.name}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              {item.icon}
            </div>
          </button>
        ))}
      </div>
      
      {/* Backdrop effect */}
      <div 
        className="absolute inset-0 -z-10"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: "50%",
          transform: "translateY(-50%)",
          opacity: 0.2,
        }}
      />
    </nav>
  );
}