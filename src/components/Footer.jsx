import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-900 dark:to-purple-900 text-white py-6 mt-auto">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left side - branding and copyright with animated logo */}
          <div className="mb-4 md:mb-0">
            <div className="flex items-center mb-2">
              {/* Animated cube logo */}
              <div className="mr-2 relative w-6 h-6 animate-spin-slow">
                <div className="absolute w-full h-full bg-white rounded-sm transform rotate-45 opacity-80"></div>
                <div className="absolute w-full h-full bg-blue-300 rounded-sm transform rotate-12 opacity-60"></div>
                <div className="absolute w-full h-full bg-purple-300 rounded-sm transform -rotate-12 opacity-60"></div>
              </div>
              <p className="font-bold">Rubik's Cube Simulator</p>
            </div>
            <p className="text-sm text-white/70">© {currentYear} All rights reserved</p>
          </div>
          
          {/* Middle - cube facts */}
          <div className="hidden md:block text-center text-sm">
            <p className="italic text-white/90">
              "The Rubik's Cube has over 43 quintillion possible configurations"
            </p>
          </div>
          
          {/* Right side - links */}
          <div className="flex space-x-6">
            <FooterLink icon={<KeyboardIcon />} text="Keyboard Controls" />
            <FooterLink icon={<InfoIcon />} text="About" />
            <FooterLink icon={<GithubIcon />} text="Source" />
          </div>
        </div>
        
        {/* Bottom decorative cubes */}
        <div className="flex justify-center mt-6">
          {[...Array(7)].map((_, i) => (
            <div 
              key={i}
              className={`w-3 h-3 mx-1 rounded-sm bg-white/30 hover:bg-white/80 cursor-pointer transition-colors duration-300 transform hover:scale-110 hover:rotate-12`}
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>
    </footer>
  );
};

// Icon components
const KeyboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm2 1h10v1H5V6zm10 3H5v1h10V9zm0 3H5v1h10v-1z" clipRule="evenodd" />
  </svg>
);

const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
  </svg>
);

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

// Link component for the footer
const FooterLink = ({ icon, text }) => (
  <a 
    href="https://github.com/rajm012" 
    className="flex items-center text-white/80 hover:text-white transition-colors group"
  >
    <span className="mr-1 group-hover:transform group-hover:scale-110 transition-transform">
      {icon}
    </span>
    <span className="text-sm">{text}</span>
  </a>
);

export default Footer;
