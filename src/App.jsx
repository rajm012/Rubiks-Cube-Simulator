import { useState, useEffect } from 'react';
import CubeCanvas from './components/CubeCanvas';
import Controls from './components/Controls';
import MoveHistory from './components/MoveHistory';
import StatsPanel from './components/StatsPanel';
import InstructionsModal from './components/InstructionsModal';
import Header from './components/Header';
import Footer from './components/Footer';
import { CubeProvider } from './hooks/useCube';
import './index.css';

function App() {
  const [showInstructions, setShowInstructions] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  // Apply dark mode to the document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  
  return (
    <CubeProvider>
      <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100'} transition-colors duration-300`}>
        <Header 
          setShowInstructions={setShowInstructions} 
          darkMode={darkMode} 
          setDarkMode={setDarkMode} 
        />
        
        <main className="container mx-auto px-4 py-6 flex flex-col md:flex-row">
          <div className="flex-1 flex flex-col items-center">
            {/* Main Cube Canvas */}
            <div className="w-full h-[500px] mb-6">
              <CubeCanvas />
            </div>
            
            {/* Controls */}
            <Controls />
          </div>
          
          <div className="w-full md:w-64 mt-6 md:mt-0 md:ml-6">
            <StatsPanel />
            <MoveHistory />
          </div>
        </main>
        
        {showInstructions && (
          <InstructionsModal onClose={() => setShowInstructions(false)} />
        )}
        <Footer />
      </div>
    </CubeProvider>
  );
}

export default App;