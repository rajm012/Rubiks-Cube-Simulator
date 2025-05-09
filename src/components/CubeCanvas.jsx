import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useCube } from '../hooks/useCube';

// Individual cube piece component
const CubePiece = ({ position, colors }) => {
    const meshRef = useRef();
    
    return (
        <mesh ref={meshRef} position={position}>
            <boxGeometry args={[0.95, 0.95, 0.95]} />
            <meshLambertMaterial attach="material-0" color={colors[0]} /> {/* Right */}
            <meshLambertMaterial attach="material-1" color={colors[1]} /> {/* Left */}
            <meshLambertMaterial attach="material-2" color={colors[2]} /> {/* Top */}
            <meshLambertMaterial attach="material-3" color={colors[3]} /> {/* Bottom */}
            <meshLambertMaterial attach="material-4" color={colors[4]} /> {/* Front */}
            <meshLambertMaterial attach="material-5" color={colors[5]} /> {/* Back */}
        </mesh>
    );
};

// Animation group component for face rotations
const RubiksCube = ({ autoRotate }) => {
    const { cubeState } = useCube();
    const cubeGroupRef = useRef();
    
    // Use frame loop for automatic rotation
    useFrame(() => {
        if (autoRotate && cubeGroupRef.current) {
            // Slow rotation around Y and X axes
            cubeGroupRef.current.rotation.y += 0.010;
            cubeGroupRef.current.rotation.x += 0.015;
        }
    });
    
    // Map state colors to actual THREE.js colors with vibrant colors
    const colorMap = {
        'W': '#FFFFFF', // White
        'Y': '#FFFF00', // Yellow
        'R': '#FF0000', // Red
        'O': '#FFA500', // Orange
        'G': '#00FF00', // Green
        'B': '#0000FF', // Blue
        'X': '#717171'  // Hidden/Internal (dark gray)
    };

    // Generate all 27 cube pieces based on cube state
    const renderCubePieces = () => {
        const pieces = [];
        const size = 3; // 3x3 cube
        
        // Create cube with 27 pieces (3x3x3)
        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                for (let z = 0; z < size; z++) {
                    // Calculate position (centered at origin)
                    const position = [
                        x - 1, // -1, 0, 1
                        y - 1, // -1, 0, 1
                        z - 1, // -1, 0, 1
                    ];
                    
                    // Determine colors for each face
                    // The default is internal color X (dark gray)
                    const colors = Array(6).fill(colorMap['X']);
                    
                    // Right face (positive X)
                    if (x === 2) colors[0] = colorMap[cubeState.right[y][z]];
                    // Left face (negative X)
                    if (x === 0) colors[1] = colorMap[cubeState.left[y][2 - z]];
                    // Top face (positive Y)
                    if (y === 2) colors[2] = colorMap[cubeState.up[z][x]];
                    // Bottom face (negative Y)
                    if (y === 0) colors[3] = colorMap[cubeState.down[2 - z][x]];
                    // Front face (positive Z)
                    if (z === 2) colors[4] = colorMap[cubeState.front[y][x]];
                    // Back face (negative Z)
                    if (z === 0) colors[5] = colorMap[cubeState.back[y][2 - x]];
                    
                    // Add the piece to our array
                    pieces.push(
                        <CubePiece 
                            key={`${x}-${y}-${z}`}
                            position={position}
                            colors={colors}
                        />
                    );
                }
            }
        }
        
        return pieces;
    };

    return (
        <group ref={cubeGroupRef}>
            {renderCubePieces()}
        </group>
    );
};

const CubeCanvas = () => {
    const { moveHistory } = useCube();
    const [autoRotate, setAutoRotate] = useState(true);
    const controlsRef = useRef();

    // Stop auto-rotation when user starts interacting with the cube
    useEffect(() => {
        if (moveHistory.length > 0) {
            setAutoRotate(false);
            
            // Reset camera position when stopping auto-rotation
            if (controlsRef.current) {
                controlsRef.current.reset();
            }
        }
    }, [moveHistory]);

    return (
        <Canvas
            camera={{ position: [3.5, 3.5, 3.5], fov: 60 }}
            style={{ width: '100%', height: '100%' }}
        >
            <ambientLight intensity={0.8} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <directionalLight position={[5, 5, 5]} intensity={0.7} />
            <directionalLight position={[-5, -5, -5]} intensity={0.3} />
            <RubiksCube autoRotate={autoRotate} />
            <OrbitControls 
                ref={controlsRef}
                enablePan={true}
                // Disable auto-rotation when the user interacts with controls
                onChange={() => {
                    if (autoRotate) setAutoRotate(false);
                }}
            />
        </Canvas>
    );
};

export default CubeCanvas;
