const InstructionsModal = ({ onClose }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">How to Play</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-4">
            <section>
              <h3 className="text-lg font-semibold mb-2">Controls</h3>
              <p className="mb-2">Use the buttons or keyboard shortcuts to rotate the cube faces:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><strong>F</strong> - Front face clockwise</li>
                <li><strong>F'</strong> - Front face counter-clockwise</li>
                <li><strong>B</strong> - Back face clockwise</li>
                <li><strong>B'</strong> - Back face counter-clockwise</li>
                <li><strong>R</strong> - Right face clockwise</li>
                <li><strong>R'</strong> - Right face counter-clockwise</li>
                <li><strong>L</strong> - Left face clockwise</li>
                <li><strong>L'</strong> - Left face counter-clockwise</li>
                <li><strong>U</strong> - Upper face clockwise</li>
                <li><strong>U'</strong> - Upper face counter-clockwise</li>
                <li><strong>D</strong> - Down face clockwise</li>
                <li><strong>D'</strong> - Down face counter-clockwise</li>
              </ul>
            </section>
            
            <section>
              <h3 className="text-lg font-semibold mb-2">Keyboard Shortcuts</h3>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Press the corresponding letter (<strong>F, B, R, L, U, D</strong>) for clockwise rotation</li>
                <li>Hold <strong>Shift</strong> + letter for counter-clockwise rotation</li>
              </ul>
            </section>
            
            <section>
              <h3 className="text-lg font-semibold mb-2">Camera Controls</h3>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><strong>Left Mouse Button</strong> - Rotate the camera around the cube</li>
                <li><strong>Mouse Scroll</strong> - Zoom in/out</li>
              </ul>
            </section>
            
            <section>
              <h3 className="text-lg font-semibold mb-2">Other Controls</h3>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><strong>Shuffle</strong> - Randomize the cube with a series of moves</li>
                <li><strong>Reset</strong> - Return the cube to its solved state</li>
              </ul>
            </section>
          </div>
          
          <button 
            onClick={onClose}
            className="mt-6 w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
          >
            Got it!
          </button>
        </div>
      </div>
    );
  };
  
  export default InstructionsModal;
  