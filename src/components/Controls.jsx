import { useEffect } from 'react';
import { useCube } from '../hooks/useCube';

const Controls = () => {
  const { 
    performMove, 
    resetCube, 
    shuffleCube,
    timer,
    startTimer,
    stopTimer,
    isTimerRunning
  } = useCube();

  // Define move buttons with their labels and corresponding moves
  const moveButtons = [
    { label: 'F', move: 'F', color: 'bg-red-500 dark:bg-red-600' },
    { label: 'F\'', move: 'F\'', color: 'bg-red-500 dark:bg-red-600' },
    { label: 'B', move: 'B', color: 'bg-orange-500 dark:bg-orange-600' },
    { label: 'B\'', move: 'B\'', color: 'bg-orange-500 dark:bg-orange-600' },
    { label: 'R', move: 'R', color: 'bg-blue-500 dark:bg-blue-600' },
    { label: 'R\'', move: 'R\'', color: 'bg-blue-500 dark:bg-blue-600' },
    { label: 'L', move: 'L', color: 'bg-green-500 dark:bg-green-600' },
    { label: 'L\'', move: 'L\'', color: 'bg-green-500 dark:bg-green-600' },
    { label: 'U', move: 'U', color: 'bg-yellow-500 dark:bg-yellow-600' },
    { label: 'U\'', move: 'U\'', color: 'bg-yellow-500 dark:bg-yellow-600' },
    { label: 'D', move: 'D', color: 'bg-white text-gray-800 dark:bg-gray-300 dark:text-gray-800' },
    { label: 'D\'', move: 'D\'', color: 'bg-white text-gray-800 dark:bg-gray-300 dark:text-gray-800' },
  ];

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();
      
      // Map keys to moves
      const keyMoves = {
        'F': 'F',
        'B': 'B',
        'R': 'R',
        'L': 'L',
        'U': 'U',
        'D': 'D',
      };
      
      // If shift is pressed, it's a prime move
      if (e.shiftKey && keyMoves[key]) {
        performMove(`${keyMoves[key]}'`);
        return;
      }
      
      // Regular moves
      if (keyMoves[key]) {
        performMove(keyMoves[key]);
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [performMove]);

  const handleMove = (move) => {
    if (!isTimerRunning) {
      startTimer();
    }
    performMove(move);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
      {/* Timer Display */}
      <div className="mb-6 text-center">
        <div className="text-3xl font-mono font-bold text-gray-800 dark:text-white">
          {timer}
        </div>
        <div className="flex justify-center space-x-4 mt-2">
          <button
            onClick={isTimerRunning ? stopTimer : startTimer}
            className={`px-4 py-2 rounded-md font-medium ${
              isTimerRunning 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {isTimerRunning ? 'Stop Timer' : 'Start Timer'}
          </button>
        </div>
      </div>
      
      {/* Move Buttons */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Cube Controls</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mb-4">
          {moveButtons.map((button) => (
            <button
              key={button.move}
              onClick={() => handleMove(button.move)}
              className={`py-2 rounded-md font-bold transition-colors ${button.color} hover:opacity-90 shadow-sm`}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
        <button
          onClick={shuffleCube}
          className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-md shadow-sm transition-colors"
        >
          Shuffle Cube
        </button>
        <button
          onClick={resetCube}
          className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md shadow-sm transition-colors"
        >
          Reset Cube
        </button>
      </div>
      
      {/* Keyboard Help */}
      <div className="mt-6 text-sm text-gray-600 dark:text-gray-300 text-center">
        <p>Use keyboard keys (F, B, R, L, U, D) for moves. Hold Shift for counter-clockwise.</p>
      </div>
    </div>
  );
};

export default Controls;