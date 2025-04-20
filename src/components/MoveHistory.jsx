import { useCube } from '../hooks/useCube';

const MoveHistory = () => {
  const { moveHistory } = useCube();

  return (
    <div className="rounded-lg shadow p-4 mt-6">
      <h2 className="text-lg font-semibold mb-2">Move History</h2>
      
      {moveHistory.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm">No moves yet. Start playing!</p>
      ) : (
        <div className="h-48 overflow-y-auto">
          <div className="flex flex-wrap">
            {moveHistory.map((move, index) => (
              <span 
                key={index} 
                className={`move-history-item move-${move}`}
              >
                {move}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MoveHistory;
