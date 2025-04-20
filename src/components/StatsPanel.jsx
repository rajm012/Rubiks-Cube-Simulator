import { useCube } from '../hooks/useCube';

const StatsPanel = () => {
  const { 
    moveCount, 
    isSolved, 
    timer,
    isTimerRunning
  } = useCube();

  // Format timer display (mm:ss.ms)
  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const ms = milliseconds % 1000;
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0').substring(0, 2)}`;
  };

  return (
    <div className="rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-3">Stats</h2>
      
      <div className="flex flex-col space-y-3">
        <div>
          <p className="text-sm text-gray-700 dark:text-gray-300">Time</p>
          <p className="text-2xl font-mono">{formatTime(timer)}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-700 dark:text-gray-300">Moves</p>
          <p className="text-2xl">{moveCount}</p>
        </div>
        
        {isSolved && !isTimerRunning && moveCount > 0 && (
          <div className="bg-green-100 dark:bg-green-900 p-3 rounded-md">
            <p className="text-green-800 dark:text-green-200 font-medium">Solved!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsPanel;
