import React from 'react';

const Header = ({ setShowInstructions, darkMode, setDarkMode }) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-900 dark:to-purple-900 text-white py-4 px-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          {/* Animated cube icon */}
          <div className="mr-3 relative w-10 h-10 animate-spin-slow">
            <div className="absolute w-full h-full bg-white rounded-md transform rotate-45 opacity-80"></div>
            <div className="absolute w-full h-full bg-blue-300 rounded-md transform rotate-12 opacity-60"></div>
            <div className="absolute w-full h-full bg-purple-300 rounded-md transform -rotate-12 opacity-60"></div>
          </div>
          
          {/* Title with special styling */}
          <h1 className="text-2xl font-extrabold tracking-tight">
            <span className="text-yellow-300">Rubik's</span> 
            <span className="text-white"> Cube </span>
            <span className="bg-white text-blue-600 px-2 rounded">3×3</span>
            <span className="text-white"> Simulator</span>
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowInstructions(true)}
            className="bg-white text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-md transition-colors duration-200 font-medium"
          >
            Instructions
          </button>
          
          {/* Theme toggle button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;