/**
 * Rubik's Cube move notation helper functions
 * 
 * Standard notation:
 * - F: Front face clockwise
 * - F': Front face counter-clockwise
 * - B: Back face clockwise
 * - B': Back face counter-clockwise
 * - R: Right face clockwise
 * - R': Right face counter-clockwise
 * - L: Left face clockwise
 * - L': Left face counter-clockwise
 * - U: Up face clockwise
 * - U': Up face counter-clockwise
 * - D: Down face clockwise
 * - D': Down face counter-clockwise
 */

// Get the move name display text
export const getMoveDisplayName = (move) => {
    return move;
  };
  
  // Get a description of what a move does
  export const getMoveDescription = (move) => {
    const descriptions = {
      'F': 'Front face clockwise',
      'F\'': 'Front face counter-clockwise',
      'B': 'Back face clockwise',
      'B\'': 'Back face counter-clockwise',
      'R': 'Right face clockwise',
      'R\'': 'Right face counter-clockwise',
      'L': 'Left face clockwise',
      'L\'': 'Left face counter-clockwise',
      'U': 'Up face clockwise',
      'U\'': 'Up face counter-clockwise',
      'D': 'Down face clockwise',
      'D\'': 'Down face counter-clockwise',
    };
    
    return descriptions[move] || 'Unknown move';
  };
  
  // Get the opposite (inverse) move
  export const getOppositeMove = (move) => {
    if (move.includes('\'')) {
      // If it's a prime move, return the non-prime version
      return move.replace('\'', '');
    } else {
      // If it's a non-prime move, return the prime version
      return `${move}'`;
    }
  };
  
  // Get the keyboard key for a move
  export const getMoveKey = (move) => {
    const keyMap = {
      'F': 'f',
      'F\'': 'F',
      'B': 'b',
      'B\'': 'B',
      'R': 'r',
      'R\'': 'R',
      'L': 'l',
      'L\'': 'L',
      'U': 'u',
      'U\'': 'U',
      'D': 'd',
      'D\'': 'D',
    };
    
    return keyMap[move] || '';
  };
  
  // Get a move from a keyboard key
  export const getMoveFromKey = (key) => {
    const move = key.toUpperCase();
    
    // Check if it's a Shift + letter combination (for prime moves)
    if (key === move && move.length === 1) {
      return `${move}'`; // Prime move
    } else if (key !== move && move.length === 1) {
      return move; // Regular move
    }
    
    return null; // Not a valid move key
  };
  
  // Get a list of all valid moves
  export const getAllMoves = () => {
    return [
      'F', 'F\'', 
      'B', 'B\'', 
      'R', 'R\'', 
      'L', 'L\'', 
      'U', 'U\'', 
      'D', 'D\'',
    ];
  };
  
  // Check if a string is a valid move
  export const isValidMove = (move) => {
    return getAllMoves().includes(move);
  };
  