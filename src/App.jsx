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

function AnimatedBackground({ darkMode }) {
  useEffect(() => {
    const canvas = document.getElementById('gaming-background');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Grid properties
    const gridSize = 40;
    const particleCount = 100;
    const particles = [];
    
    // Vibrant color palette that works on both dark and light backgrounds
    const colorPalette = [
      'rgba(255, 0, 0, ', // Red
      'rgba(255, 165, 0, ', // Orange
      'rgba(255, 255, 0, ', // Yellow
      'rgba(0, 255, 0, ', // Green
      'rgba(0, 255, 255, ', // Cyan
      'rgba(0, 0, 255, ', // Blue
      'rgba(255, 0, 255, ', // Magenta
      'rgba(255, 105, 180, ', // Hot Pink
      'rgba(138, 43, 226, ', // BlueViolet
      'rgba(50, 205, 50, ', // Lime Green
    ];
    
    // Set grid color based on dark mode
    const gridColor = darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.1)';
    
    // Create particles with random colors from the palette
    for (let i = 0; i < particleCount; i++) {
      const randomColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      const opacity = darkMode ? Math.random() * 0.8 + 0.3 : Math.random() * 0.6 + 0.4;
      
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5 + 1,
        speedX: (Math.random() - 0.5) * 0.9,
        speedY: (Math.random() - 0.5) * 0.9,
        color: `${randomColor}${opacity})`,
        baseColor: randomColor
      });
    }
    
    // Animation function
    function animate() {
      if (!canvas) return;
      
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid
      ctx.beginPath();
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = darkMode ? 0.5 : 1;
      
      // Draw vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
      }
      
      // Draw horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
      }
      
      ctx.stroke();
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.fillStyle = particle.color;
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw connections between nearby particles
        particles.forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Create connections between nearby particles
          if (distance < 120 && distance > 0) {
            // Create a gradient connection using both particles' colors
            const gradient = ctx.createLinearGradient(
              particle.x, particle.y, otherParticle.x, otherParticle.y
            );
            
            const opacity = darkMode ? 0.15 : 0.08;
            const lineOpacity = opacity * (1 - distance / 120);
            
            gradient.addColorStop(0, `${particle.baseColor}${lineOpacity})`);
            gradient.addColorStop(1, `${otherParticle.baseColor}${lineOpacity})`);
            
            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.lineWidth = darkMode ? 0.8 : 0.6;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });
    }
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [darkMode]);
  
  return (
    <canvas 
      id="gaming-background" 
      className="fixed top-0 left-0 w-full h-full" 
      style={{ zIndex: -1 }}
    />
  );
}

function App() {
  const [showInstructions, setShowInstructions] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  
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
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
        {/* The colorful background animation */}
        <AnimatedBackground darkMode={darkMode} />
        
        {/* App content */}
        <Header
          setShowInstructions={setShowInstructions}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
        
        <main className="container mx-auto px-4 py-6 flex flex-col md:flex-row">
          <div className="flex-1 flex flex-col items-center">
            {/* Main Cube Canvas */}
            <div className="w-full h-[500px] mb-6 bg-white bg-opacity-80 dark:bg-black dark:bg-opacity-40 rounded-lg shadow-lg backdrop-blur-sm">
              <CubeCanvas />
            </div>
            
            {/* Controls */}
            <div className="w-full bg-white bg-opacity-80 dark:bg-black dark:bg-opacity-40 p-4 rounded-lg shadow-lg backdrop-blur-sm">
              <Controls />
            </div>
          </div>
          
          <div className="w-full md:w-64 mt-6 md:mt-0 md:ml-6 space-y-4">
            <div className="bg-white bg-opacity-80 dark:bg-black dark:bg-opacity-40 p-4 rounded-lg shadow-lg backdrop-blur-sm">
              <StatsPanel />
            </div>
            <div className="bg-white bg-opacity-80 dark:bg-black dark:bg-opacity-40 p-4 rounded-lg shadow-lg backdrop-blur-sm">
              <MoveHistory />
            </div>
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
