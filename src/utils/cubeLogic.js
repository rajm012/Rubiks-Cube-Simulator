/**
 * Core logic for managing a Rubik's Cube
 * 
 * The cube state is represented as 6 2D arrays, one for each face:
 * - front, back, right, left, up, down
 * 
 * Each face is a 3x3 2D array with color values:
 * - 'R' (red - front)
 * - 'O' (orange - back)
 * - 'B' (blue - right)
 * - 'G' (green - left)
 * - 'W' (white - up)
 * - 'Y' (yellow - down)
 */

// Create a solved cube state
export const createSolvedCube = () => {
    // Initialize each face with its color
    const front = Array(3).fill().map(() => Array(3).fill('R')); // Red
    const back = Array(3).fill().map(() => Array(3).fill('O'));  // Orange
    const right = Array(3).fill().map(() => Array(3).fill('B')); // Blue
    const left = Array(3).fill().map(() => Array(3).fill('G'));  // Green
    const up = Array(3).fill().map(() => Array(3).fill('W'));    // White
    const down = Array(3).fill().map(() => Array(3).fill('Y'));  // Yellow
  
    return { front, back, right, left, up, down };
  };
  
  // Deep clone the cube state to avoid mutation
  export const cloneCubeState = (state) => {
    return {
      front: state.front.map(row => [...row]),
      back: state.back.map(row => [...row]),
      right: state.right.map(row => [...row]),
      left: state.left.map(row => [...row]),
      up: state.up.map(row => [...row]),
      down: state.down.map(row => [...row]),
    };
  };
  
  // Rotate a face clockwise
  export const rotateFaceClockwise = (face) => {
    const newFace = Array(3).fill().map(() => Array(3).fill(null));
    
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        newFace[j][2 - i] = face[i][j];
      }
    }
    
    return newFace;
  };
  
  // Rotate a face counter-clockwise
  export const rotateFaceCounterClockwise = (face) => {
    const newFace = Array(3).fill().map(() => Array(3).fill(null));
    
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        newFace[2 - j][i] = face[i][j];
      }
    }
    
    return newFace;
  };
  
  // Move F: Front face clockwise
  export const moveF = (state) => {
    const newState = cloneCubeState(state);
    
    // 1. Rotate front face clockwise
    newState.front = rotateFaceClockwise(state.front);
    
    // 2. Update affected edges
    // We need to save the old values before updating
    const upBottom = [...state.up[2]];     // Bottom row of up face
    const rightLeft = [state.right[0][0], state.right[1][0], state.right[2][0]]; // Left column of right face
    const downTop = [...state.down[0]];    // Top row of down face
    const leftRight = [state.left[0][2], state.left[1][2], state.left[2][2]];    // Right column of left face
    
    // Update in clockwise order: up -> right -> down -> left
    // up bottom row -> right left column (inverted)
    for (let i = 0; i < 3; i++) {
      newState.right[i][0] = upBottom[2 - i];
    }
    
    // right left column -> down top row
    for (let i = 0; i < 3; i++) {
      newState.down[0][i] = rightLeft[i];
    }
    
    // down top row -> left right column (inverted)
    for (let i = 0; i < 3; i++) {
      newState.left[i][2] = downTop[2 - i];
    }
    
    // left right column -> up bottom row
    for (let i = 0; i < 3; i++) {
      newState.up[2][i] = leftRight[i];
    }
    
    return newState;
  };
  
  // Move F': Front face counter-clockwise
  export const moveFPrime = (state) => {
    const newState = cloneCubeState(state);
    
    // 1. Rotate front face counter-clockwise
    newState.front = rotateFaceCounterClockwise(state.front);
    
    // 2. Update affected edges
    const upBottom = [...state.up[2]];     // Bottom row of up face
    const rightLeft = [state.right[0][0], state.right[1][0], state.right[2][0]]; // Left column of right face
    const downTop = [...state.down[0]];    // Top row of down face
    const leftRight = [state.left[0][2], state.left[1][2], state.left[2][2]];    // Right column of left face
    
    // Update in counter-clockwise order: up -> left -> down -> right
    // up bottom row -> left right column
    for (let i = 0; i < 3; i++) {
      newState.left[i][2] = upBottom[i];
    }
    
    // left right column -> down top row (inverted)
    for (let i = 0; i < 3; i++) {
      newState.down[0][i] = leftRight[2 - i];
    }
    
    // down top row -> right left column
    for (let i = 0; i < 3; i++) {
      newState.right[i][0] = downTop[i];
    }
    
    // right left column -> up bottom row (inverted)
    for (let i = 0; i < 3; i++) {
      newState.up[2][i] = rightLeft[2 - i];
    }
    
    return newState;
  };
  
  // Move B: Back face clockwise
  export const moveB = (state) => {
    const newState = cloneCubeState(state);
    
    // 1. Rotate back face clockwise
    newState.back = rotateFaceClockwise(state.back);
    
    // 2. Update affected edges
    const upTop = [...state.up[0]];       // Top row of up face
    const leftLeft = [state.left[0][0], state.left[1][0], state.left[2][0]]; // Left column of left face
    const downBottom = [...state.down[2]]; // Bottom row of down face
    const rightRight = [state.right[0][2], state.right[1][2], state.right[2][2]]; // Right column of right face
    
    // Update in clockwise order: up -> left -> down -> right
    // up top row -> left left column
    for (let i = 0; i < 3; i++) {
      newState.left[i][0] = upTop[i];
    }
    
    // left left column -> down bottom row (inverted)
    for (let i = 0; i < 3; i++) {
      newState.down[2][i] = leftLeft[2 - i];
    }
    
    // down bottom row -> right right column
    for (let i = 0; i < 3; i++) {
      newState.right[i][2] = downBottom[i];
    }
    
    // right right column -> up top row (inverted)
    for (let i = 0; i < 3; i++) {
      newState.up[0][i] = rightRight[2 - i];
    }
    
    return newState;
  };
  
  // Move B': Back face counter-clockwise
  export const moveBPrime = (state) => {
    const newState = cloneCubeState(state);
    
    // 1. Rotate back face counter-clockwise
    newState.back = rotateFaceCounterClockwise(state.back);
    
    // 2. Update affected edges
    const upTop = [...state.up[0]];       // Top row of up face
    const leftLeft = [state.left[0][0], state.left[1][0], state.left[2][0]]; // Left column of left face
    const downBottom = [...state.down[2]]; // Bottom row of down face
    const rightRight = [state.right[0][2], state.right[1][2], state.right[2][2]]; // Right column of right face
    
    // Update in counter-clockwise order: up -> right -> down -> left
    // up top row -> right right column (inverted)
    for (let i = 0; i < 3; i++) {
      newState.right[i][2] = upTop[2 - i];
    }
    
    // right right column -> down bottom row
    for (let i = 0; i < 3; i++) {
      newState.down[2][i] = rightRight[i];
    }
    
    // down bottom row -> left left column (inverted)
    for (let i = 0; i < 3; i++) {
      newState.left[i][0] = downBottom[2 - i];
    }
    
    // left left column -> up top row
    for (let i = 0; i < 3; i++) {
      newState.up[0][i] = leftLeft[i];
    }
    
    return newState;
  };
  
  // Move R: Right face clockwise
  export const moveR = (state) => {
    const newState = cloneCubeState(state);
    
    // 1. Rotate right face clockwise
    newState.right = rotateFaceClockwise(state.right);
    
    // 2. Update affected edges
    const upRight = [state.up[0][2], state.up[1][2], state.up[2][2]]; // Right column of up face
    const backLeft = [state.back[0][0], state.back[1][0], state.back[2][0]]; // Left column of back face
    const downRight = [state.down[0][2], state.down[1][2], state.down[2][2]]; // Right column of down face
    const frontRight = [state.front[0][2], state.front[1][2], state.front[2][2]]; // Right column of front face
    
    // Update in clockwise order: up -> back -> down -> front
    // up right column -> back left column (inverted)
    for (let i = 0; i < 3; i++) {
      newState.back[i][0] = upRight[2 - i];
    }
    
    // back left column -> down right column (inverted)
    for (let i = 0; i < 3; i++) {
      newState.down[i][2] = backLeft[2 - i];
    }
    
    // down right column -> front right column
    for (let i = 0; i < 3; i++) {
      newState.front[i][2] = downRight[i];
    }
    
    // front right column -> up right column
    for (let i = 0; i < 3; i++) {
      newState.up[i][2] = frontRight[i];
    }
    
    return newState;
  };
  
  // Move R': Right face counter-clockwise
  export const moveRPrime = (state) => {
    const newState = cloneCubeState(state);
    
    // 1. Rotate right face counter-clockwise
    newState.right = rotateFaceCounterClockwise(state.right);
    
    // 2. Update affected edges
    const upRight = [state.up[0][2], state.up[1][2], state.up[2][2]]; // Right column of up face
    const backLeft = [state.back[0][0], state.back[1][0], state.back[2][0]]; // Left column of back face
    const downRight = [state.down[0][2], state.down[1][2], state.down[2][2]]; // Right column of down face
    const frontRight = [state.front[0][2], state.front[1][2], state.front[2][2]]; // Right column of front face
    
    // Update in counter-clockwise order: up -> front -> down -> back
    // up right column -> front right column
    for (let i = 0; i < 3; i++) {
      newState.front[i][2] = upRight[i];
    }
    
    // front right column -> down right column
    for (let i = 0; i < 3; i++) {
      newState.down[i][2] = frontRight[i];
    }
    
    // down right column -> back left column (inverted)
    for (let i = 0; i < 3; i++) {
      newState.back[i][0] = downRight[2 - i];
    }
    
    // back left column -> up right column (inverted)
    for (let i = 0; i < 3; i++) {
      newState.up[i][2] = backLeft[2 - i];
    }
    
    return newState;
  };
  
  // Move L: Left face clockwise
  export const moveL = (state) => {
    const newState = cloneCubeState(state);
    
    // 1. Rotate left face clockwise
    newState.left = rotateFaceClockwise(state.left);
    
    // 2. Update affected edges
    const upLeft = [state.up[0][0], state.up[1][0], state.up[2][0]]; // Left column of up face
    const frontLeft = [state.front[0][0], state.front[1][0], state.front[2][0]]; // Left column of front face
    const downLeft = [state.down[0][0], state.down[1][0], state.down[2][0]]; // Left column of down face
    const backRight = [state.back[0][2], state.back[1][2], state.back[2][2]]; // Right column of back face
    
    // Update in clockwise order: up -> front -> down -> back
    // up left column -> front left column
    for (let i = 0; i < 3; i++) {
      newState.front[i][0] = upLeft[i];
    }
    
    // front left column -> down left column
    for (let i = 0; i < 3; i++) {
      newState.down[i][0] = frontLeft[i];
    }
    
    // down left column -> back right column (inverted)
    for (let i = 0; i < 3; i++) {
      newState.back[i][2] = downLeft[2 - i];
    }
    
    // back right column -> up left column (inverted)
    for (let i = 0; i < 3; i++) {
      newState.up[i][0] = backRight[2 - i];
    }
    
    return newState;
  };
  
  // Move L': Left face counter-clockwise
  export const moveLPrime = (state) => {
    const newState = cloneCubeState(state);
    
    // 1. Rotate left face counter-clockwise
    newState.left = rotateFaceCounterClockwise(state.left);
    
    // 2. Update affected edges
    const upLeft = [state.up[0][0], state.up[1][0], state.up[2][0]]; // Left column of up face
    const frontLeft = [state.front[0][0], state.front[1][0], state.front[2][0]]; // Left column of front face
    const downLeft = [state.down[0][0], state.down[1][0], state.down[2][0]]; // Left column of down face
    const backRight = [state.back[0][2], state.back[1][2], state.back[2][2]]; // Right column of back face
    
    // Update in counter-clockwise order: up -> back -> down -> front
    // up left column -> back right column (inverted)
    for (let i = 0; i < 3; i++) {
      newState.back[i][2] = upLeft[2 - i];
    }
    
    // back right column -> down left column (inverted)
    for (let i = 0; i < 3; i++) {
      newState.down[i][0] = backRight[2 - i];
    }
    
    // down left column -> front left column
    for (let i = 0; i < 3; i++) {
      newState.front[i][0] = downLeft[i];
    }
    
    // front left column -> up left column
    for (let i = 0; i < 3; i++) {
      newState.up[i][0] = frontLeft[i];
    }
    
    return newState;
  };
  
  // Move U: Up face clockwise
  export const moveU = (state) => {
    const newState = cloneCubeState(state);
    
    // 1. Rotate up face clockwise
    newState.up = rotateFaceClockwise(state.up);
    
    // 2. Update affected edges
    const frontTop = [...state.front[0]]; // Top row of front face
    const rightTop = [...state.right[0]]; // Top row of right face
    const backTop = [...state.back[0]];   // Top row of back face
    const leftTop = [...state.left[0]];   // Top row of left face
    
    // Update in clockwise order: front -> right -> back -> left
    newState.right[0] = frontTop;
    newState.back[0] = rightTop;
    newState.left[0] = backTop;
    newState.front[0] = leftTop;
    
    return newState;
  };
  
  // Move U': Up face counter-clockwise
  export const moveUPrime = (state) => {
    const newState = cloneCubeState(state);
    
    // 1. Rotate up face counter-clockwise
    newState.up = rotateFaceCounterClockwise(state.up);
    
    // 2. Update affected edges
    const frontTop = [...state.front[0]]; // Top row of front face
    const rightTop = [...state.right[0]]; // Top row of right face
    const backTop = [...state.back[0]];   // Top row of back face
    const leftTop = [...state.left[0]];   // Top row of left face
    
    // Update in counter-clockwise order: front -> left -> back -> right
    newState.left[0] = frontTop;
    newState.back[0] = leftTop;
    newState.right[0] = backTop;
    newState.front[0] = rightTop;
    
    return newState;
  };
  
  // Move D: Down face clockwise
  export const moveD = (state) => {
    const newState = cloneCubeState(state);
    
    // 1. Rotate down face clockwise
    newState.down = rotateFaceClockwise(state.down);
    
    // 2. Update affected edges
    const frontBottom = [...state.front[2]]; // Bottom row of front face
    const rightBottom = [...state.right[2]]; // Bottom row of right face
    const backBottom = [...state.back[2]];   // Bottom row of back face
    const leftBottom = [...state.left[2]];   // Bottom row of left face
    
    // Update in clockwise order: front -> left -> back -> right
    newState.left[2] = frontBottom;
    newState.back[2] = leftBottom;
    newState.right[2] = backBottom;
    newState.front[2] = rightBottom;
    
    return newState;
  };
  
  // Move D': Down face counter-clockwise
  export const moveDPrime = (state) => {
    const newState = cloneCubeState(state);
    
    // 1. Rotate down face counter-clockwise
    newState.down = rotateFaceCounterClockwise(state.down);
    
    // 2. Update affected edges
    const frontBottom = [...state.front[2]]; // Bottom row of front face
    const rightBottom = [...state.right[2]]; // Bottom row of right face
    const backBottom = [...state.back[2]];   // Bottom row of back face
    const leftBottom = [...state.left[2]];   // Bottom row of left face
    
    // Update in counter-clockwise order: front -> right -> back -> left
    newState.right[2] = frontBottom;
    newState.back[2] = rightBottom;
    newState.left[2] = backBottom;
    newState.front[2] = leftBottom;
    
    return newState;
  };
  
  // Perform a cube move based on notation
  export const performCubeMove = (state, move) => {
    switch (move) {
      case 'F': return moveF(state);
      case 'F\'': return moveFPrime(state);
      case 'B': return moveB(state);
      case 'B\'': return moveBPrime(state);
      case 'R': return moveR(state);
      case 'R\'': return moveRPrime(state);
      case 'L': return moveL(state);
      case 'L\'': return moveLPrime(state);
      case 'U': return moveU(state);
      case 'U\'': return moveUPrime(state);
      case 'D': return moveD(state);
      case 'D\'': return moveDPrime(state);
      default: return state; // Return unchanged state for unknown moves
    }
  };
  
  // Check if the cube is solved
  export const isCubeSolved = (state) => {
    // Check each face to see if all stickers are the same color
    const checkFace = (face) => {
      const color = face[0][0];
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (face[i][j] !== color) {
            return false;
          }
        }
      }
      return true;
    };
    
    return (
      checkFace(state.front) &&
      checkFace(state.back) &&
      checkFace(state.right) &&
      checkFace(state.left) &&
      checkFace(state.up) &&
      checkFace(state.down)
    );
  };
  
  // Get a random move for shuffling
  export const getRandomMove = () => {
    const moves = [
      'F', 'F\'', 
      'B', 'B\'', 
      'R', 'R\'', 
      'L', 'L\'', 
      'U', 'U\'', 
      'D', 'D\''
    ];
    
    const randomIndex = Math.floor(Math.random() * moves.length);
    return moves[randomIndex];
  };
  