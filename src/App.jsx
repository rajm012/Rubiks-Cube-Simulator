import { useState, useEffect } from 'react';
import CubeCanvas from './components/CubeCanvas';
import Controls from './components/Controls';
import MoveHistory from './components/MoveHistory';
import StatsPanel from './components/StatsPanel';
import InstructionsModal from './components/InstructionsModal';
import Header from './components/Header';
import Footer from './components/Footer';
import { CubeProvider } from './hooks/useCube';
import VictoryPopup from './components/VictoryComponent';
import './index.css';

function AnimatedBackground({ darkMode }) {
  useEffect(() => {
    const canvas = document.getElementById('gaming-background');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas to full screen and ensure it's visible
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Grid properties
    const gridSize = 40;
    const particleCount = 200; // Increased particle count for better visibility
    const particles = [];
    
    // Enhanced vibrant color palette with better visibility in dark mode
    const colorPalette = darkMode ? [
      'rgba(255, 70, 70, ', // Bright Red
      'rgba(255, 180, 30, ', // Bright Orange
      'rgba(255, 255, 70, ', // Bright Yellow
      'rgba(70, 255, 70, ', // Bright Green
      'rgba(70, 255, 255, ', // Bright Cyan
      'rgba(100, 100, 255, ', // Bright Blue
      'rgba(255, 70, 255, ', // Bright Magenta
      'rgba(255, 120, 200, ', // Bright Pink
      'rgba(180, 90, 255, ', // Bright Purple
      'rgba(100, 255, 100, ', // Bright Lime
    ] : [
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
    
    // Grid color with better visibility in dark mode
    const gridColor = darkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)';
    
    // Create particles with enhanced visibility for dark mode
    for (let i = 0; i < particleCount; i++) {
      const randomColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      // Higher opacity in dark mode
      const opacity = darkMode ? Math.random() * 0.5 + 0.5 : Math.random() * 0.9 + 0.8;
      
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: darkMode ? Math.random() * 3.5 + 2 : Math.random() * 3.5 + 1.5,
        speedX: (Math.random() - 0.5) * 1.2,
        speedY: (Math.random() - 0.5) * 1.2,
        color: `${randomColor}${opacity})`,
        baseColor: randomColor
      });
    }
    
    // Animation function
    function animate() {
      if (!canvas) return;
      
      // Create a subtle background gradient in dark mode
      if (darkMode) {
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, 'rgba(20, 20, 40, 0.4)');
        gradient.addColorStop(1, 'rgba(40, 10, 60, 0.4)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      
      // Draw grid
      ctx.beginPath();
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = darkMode ? 1.5 : 1.1;
      
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
        
        // Draw particle with glow effect in dark mode
        ctx.beginPath();
        if (darkMode) {
          // Add glow effect for dark mode
          ctx.shadowBlur = 15;
          ctx.shadowColor = particle.color.replace('rgba', 'rgb').replace(/, [0-9.]+\)/, ')');
        }

        if (!darkMode) {
          ctx.shadowBlur = 15;
        }

        ctx.fillStyle = particle.color;
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow
        
        // Draw connections between nearby particles
        particles.forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Create connections between nearby particles
          if (distance < 50 && distance > 0) {
            // Create a gradient connection
            const gradient = ctx.createLinearGradient(
              particle.x, particle.y, otherParticle.x, otherParticle.y
            );
            
            // Higher opacity for connections in dark mode
            const opacity = darkMode ? 0.3 : 0.2;
            const lineOpacity = opacity * (1 - distance / 100);
            
            gradient.addColorStop(0, `${particle.baseColor}${lineOpacity})`);
            gradient.addColorStop(1, `${otherParticle.baseColor}${lineOpacity})`);
            
            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.lineWidth = darkMode ? 1.5 : 1.2;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });
      
      requestAnimationFrame(animate);
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
      style={{ 
        zIndex: -1,
        opacity: 1,
        position: 'fixed'
      }}
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
      // Remove any explicit background that might be applied
      document.body.style.background = 'transparent';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.background = 'transparent';
    }
  }, [darkMode]);
  
  return (
    <CubeProvider>
      {/* Apply bg-transparent to allow the canvas to show through */}
      <div className={`min-h-screen transition-colors duration-300 bg-transparent ${darkMode ? 'dark' : ''}`}>
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
        <VictoryPopup />
        <Footer />
      </div>
    </CubeProvider>
  );
}

export default App;
