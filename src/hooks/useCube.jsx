import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { createSolvedCube, performCubeMove, isCubeSolved, getRandomMove } from '../utils/cubeLogic';

// Create context
const CubeContext = createContext();

// Custom hook to use the cube context
export const useCube = () => {
  const context = useContext(CubeContext);
  if (!context) {
    throw new Error('useCube must be used within a CubeProvider');
  }
  return context;
};

// Provider component
export const CubeProvider = ({ children }) => {
  // Cube state (face configurations)
  const [cubeState, setCubeState] = useState(() => createSolvedCube());
  
  // Move history
  const [moveHistory, setMoveHistory] = useState([]);
  
  // Move count
  const [moveCount, setMoveCount] = useState(0);
  
  // Timer state
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  
  // Track if cube is solved
  const [isSolved, setIsSolved] = useState(true);
  
  // Current rotation animation (if any)
  const [currentRotation, setCurrentRotation] = useState(null);

  // Timer logic
  useEffect(() => {
    let intervalId;
    
    if (isTimerRunning) {
      intervalId = setInterval(() => {
        setTimer(prevTime => prevTime + 10); // Update every 10ms
      }, 10);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isTimerRunning]);

  // Start the timer
  const startTimer = useCallback(() => {
    setIsTimerRunning(true);
  }, []);
  
  // Stop the timer
  const stopTimer = useCallback(() => {
    setIsTimerRunning(false);
  }, []);
  
  // Reset the timer
  const resetTimer = useCallback(() => {
    stopTimer();
    setTimer(0);
  }, [stopTimer]);

  // Check if cube is solved after each move
  useEffect(() => {
    const solved = isCubeSolved(cubeState);
    setIsSolved(solved);
    
    if (solved && isTimerRunning && moveCount > 0) {
      stopTimer();
    }
  }, [cubeState, isTimerRunning, moveCount, stopTimer]);

  // Perform a move on the cube
  const performMove = useCallback((move) => {
    setCubeState(prevState => {
      const newState = performCubeMove(prevState, move);
      return newState;
    });
    
    // Update move history
    setMoveHistory(prev => [...prev, move]);
    
    // Increment move count
    setMoveCount(prev => prev + 1);
    
    // Set current rotation for animation
    setCurrentRotation(move);
    
    // Clear rotation after animation completes
    setTimeout(() => {
      setCurrentRotation(null);
    }, 300);
  }, []);

  // Reset cube to solved state
  const resetCube = useCallback(() => {
    setCubeState(createSolvedCube());
    setMoveHistory([]);
    setMoveCount(0);
    resetTimer();
    setIsSolved(true);
  }, [resetTimer]);

  // Shuffle the cube with random moves
  const shuffleCube = useCallback(() => {
    // Reset any existing state
    setCubeState(createSolvedCube());
    setMoveHistory([]);
    setMoveCount(0);
    resetTimer();
    
    // Number of random moves for shuffling
    const numMoves = 20;
    let newState = createSolvedCube();
    const shuffleMoves = [];
    
    // Apply random moves
    for (let i = 0; i < numMoves; i++) {
      const move = getRandomMove();
      newState = performCubeMove(newState, move);
      shuffleMoves.push(move);
    }
    
    // Update state with shuffled cube
    setCubeState(newState);
    setMoveHistory(shuffleMoves);
    setMoveCount(0); // Reset move count after shuffle
    setIsSolved(false);
  }, [resetTimer]);

  // The value to be provided to consumers
  const value = {
    cubeState,
    moveHistory,
    moveCount,
    timer,
    isTimerRunning,
    isSolved,
    currentRotation,
    performMove,
    resetCube,
    shuffleCube,
    startTimer,
    stopTimer,
    resetTimer
  };

  return (
    <CubeContext.Provider value={value}>
      {children}
    </CubeContext.Provider>
  );
};
