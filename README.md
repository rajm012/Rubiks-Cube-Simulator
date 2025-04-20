# 3D Rubik's Cube Simulator

A feature-rich, interactive 3D Rubik's Cube simulator built with React and Three.js. Practice your cubing skills with a beautiful interface, animated background, and comprehensive move tracking.

---

## ✨ Features

- **Interactive 3D Cube**: Fully manipulable Rubik's Cube with smooth animations
- **Dynamic Controls**: Perform standard cube rotations with intuitive controls
- **Move History**: Track and review your solving sequence
- **Stats Panel**: Monitor solve time, move count, and other statistics
- **Dark/Light Mode**: Choose your preferred visual theme
- **Animated Background**: Stunning particle-based interactive background
- **Mobile Responsive**: Works on all device sizes

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or newer)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rajm012/rubiks-cube-simulator.git
   cd rubiks-cube-simulator
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🎮 How to Use

1. **Rotate the Cube**: Click and drag on the cube to rotate the entire cube
2. **Make Moves**: Use the control buttons or keyboard shortcuts to make moves
3. **Track Progress**: View your move history and stats in the side panel
4. **Reset**: Click the reset button to scramble or reset the cube
5. **Toggle Theme**: Switch between light and dark mode with the toggle in the header

### Keyboard Shortcuts

- **F**: Front face clockwise
- **F'**: Front face counter-clockwise
- **B**: Back face clockwise
- **B'**: Back face counter-clockwise
- **R**: Right face clockwise
- **R'**: Right face counter-clockwise
- **L**: Left face clockwise
- **L'**: Left face counter-clockwise
- **U**: Upper face clockwise
- **U'**: Upper face counter-clockwise
- **D**: Down face clockwise
- **D'**: Down face counter-clockwise
- **Space**: Reset cube

---

## 🖌️ Customization

### Modifying the Background

The app features a customizable animated background. You can adjust the following properties in the `AnimatedBackground` component:

- **particleCount**: Number of floating particles
- **gridSize**: Size of the background grid
- **colorPalette**: Array of colors for particles
- **connection distance**: Maximum distance for particle connections

Example:
```jsx
// Adjust these values in AnimatedBackground.jsx
const gridSize = 40; // Smaller value = denser grid
const particleCount = 120; // More particles = more connections
```

### Theme Customization

The app uses Tailwind CSS for styling. You can customize:

- Dark/Light mode colors
- Component opacity and shadows
- Animations and transitions

---

## 🛠️ Tech Stack

- **React**: UI library
- **Three.js**: 3D rendering engine for the Rubik's Cube
- **HTML5 Canvas**: For the animated background
- **Tailwind CSS**: Styling

---

## 📝 Project Structure

```
rubiks-cube-simulator/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   └── assets/
│       └── textures/
├── src/
│   ├── components/
│   │   ├── CubeCanvas.jsx
│   │   ├── Controls.jsx
│   │   ├── MoveHistory.jsx
│   │   ├── StatsPanel.jsx
│   │   ├── InstructionsModal.jsx
│   │   └── ThemeToggle.jsx
│   ├── hooks/
│   │   ├── useCube.js
│   │   └── useTimer.js
│   ├── utils/
│   │   ├── cubeLogic.js
│   │   ├── moveNotation.js
│   │   └── shuffleAlgorithm.js
│   ├── App.jsx
│   ├── index.jsx
│   └── styles.css
├── package.json
├── tailwind.config.js
└── README.md
```

---

## 📚 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- [Three.js](https://threejs.org/) for 3D rendering capabilities
- [Tailwind CSS](https://tailwindcss.com/) for styling
- The Rubik's Cube community for inspiration

---
