import { useState, useEffect } from 'react';
import { useCube } from '../hooks/useCube';

const ConfettiParticle = ({ index }) => {
  // Generate random properties for each confetti particle
  const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080'];
  const shapes = ['circle', 'square', 'triangle'];
  
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
  const randomSize = Math.random() * 0.5 + 0.5; // Between 0.5 and 1
  const randomLeft = Math.random() * 100; // Position from left (0-100%)
  const randomDelay = Math.random() * 0.5; // Animation delay
  const randomDuration = Math.random() * 2 + 2; // Fall duration between 2-4s
  const randomRotation = Math.random() * 360; // Initial rotation
  const randomRotationSpeed = (Math.random() - 0.5) * 720; // Rotation speed (positive or negative)
  
  // Shape rendering based on type
  const renderShape = () => {
    switch (randomShape) {
      case 'circle':
        return <div className="w-full h-full rounded-full" style={{ backgroundColor: randomColor }}></div>;
      case 'square':
        return <div className="w-full h-full" style={{ backgroundColor: randomColor }}></div>;
      case 'triangle':
        return (
          <div className="w-full h-full overflow-hidden" style={{ 
            width: '0px',
            height: '0px',
            borderLeft: '10px solid transparent',
            borderRight: '10px solid transparent',
            borderBottom: `20px solid ${randomColor}`
          }}></div>
        );
      default:
        return <div className="w-full h-full rounded-full" style={{ backgroundColor: randomColor }}></div>;
    }
  };
  
  return (
    <div 
      className="absolute"
      style={{
        left: `${randomLeft}%`,
        top: '-20px',
        width: `${randomSize * 20}px`, 
        height: `${randomSize * 20}px`,
        animation: `
          fall ${randomDuration}s linear ${randomDelay}s forwards,
          sway ${randomDuration * 0.5}s ease-in-out ${randomDelay}s alternate infinite
        `,
        transform: `rotate(${randomRotation}deg)`,
        opacity: 0.9,
      }}
    >
      <div 
        className="w-full h-full"
        style={{
          animation: `spin ${Math.abs(3/randomRotationSpeed)}s linear infinite`,
          animationDirection: randomRotationSpeed > 0 ? 'normal' : 'reverse'
        }}
      >
        {renderShape()}
      </div>
    </div>
  );
};

const VictoryPopup = () => {
  const { 
    moveCount, 
    isSolved, 
    timer,
    isTimerRunning,
    resetCube
  } = useCube();
  
  const [show, setShow] = useState(false);
  const [solvedStats, setSolvedStats] = useState({ moves: 0, time: '00:00.00' });
  const confettiCount = 50; // Number of confetti particles

  // Format timer display (mm:ss.ms)
  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const ms = milliseconds % 1000;
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0').substring(0, 2)}`;
  };
  
  // Add styling for confetti animation
  useEffect(() => {
    // Add required CSS for animations if not already present
    if (!document.getElementById('confetti-styles')) {
      const styleEl = document.createElement('style');
      styleEl.id = 'confetti-styles';
      styleEl.textContent = `
        @keyframes fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        
        @keyframes sway {
          0% { transform: translateX(-20px); }
          100% { transform: translateX(20px); }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes popup {
          0% { transform: scale(0); }
          70% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        
        @keyframes bounce-in {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-30px); }
          60% { transform: translateY(-15px); }
        }
      `;
      document.head.appendChild(styleEl);
    }
  }, []);
  
  // Check if cube was just solved
  useEffect(() => {
    if (isSolved && !isTimerRunning && moveCount > 0) {
      setSolvedStats({
        moves: moveCount,
        time: formatTime(timer)
      });
      setShow(true);
    }
  }, [isSolved, isTimerRunning, moveCount, timer]);

  const handleClose = () => {
    setShow(false);
  };

  const handlePlayAgain = () => {
    setShow(false);
    resetCube();
  };
  
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40" onClick={handleClose}></div>
      
      {/* Confetti container */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(confettiCount)].map((_, i) => (
          <ConfettiParticle key={i} index={i} />
        ))}
      </div>
      
      {/* Popup message */}
      <div 
        className="relative bg-black bg-opacity-50 backdrop-blur-md rounded-2xl p-8 shadow-2xl border-2 border-yellow-400 max-w-md mx-4 z-10"
        style={{
          animation: 'popup 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
          transform: 'scale(0)'
        }}
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold text-yellow-400 mb-4">
            <span className="animate-pulse inline-block">🏆</span> 
            CONGRATULATIONS!
            <span className="animate-pulse inline-block">🏆</span>
          </h2>
          
          <div className="mb-6 text-white text-xl">
            You solved the cube!
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-black bg-opacity-50 rounded-lg p-4">
              <p className="text-yellow-400 font-semibold">Moves</p>
              <p className="text-white text-3xl font-bold">{solvedStats.moves}</p>
            </div>
            
            <div className="bg-black bg-opacity-50 rounded-lg p-4">
              <p className="text-yellow-400 font-semibold">Time</p>
              <p className="text-white text-3xl font-bold">{solvedStats.time}</p>
            </div>
          </div>
          
          <div className="flex justify-center space-x-4">
            <button 
              onClick={handlePlayAgain}
              className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full transition-colors"
            >
              Play Again
            </button>
            
            <button 
              onClick={handleClose}
              className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-full transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VictoryPopup;