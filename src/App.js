import "./App.css";
import { useEffect, useState } from "react";

const MousePosition = ({ render }) => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMousePositionChange = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMousePositionChange);

    return () => {
      window.removeEventListener("mousemove", handleMousePositionChange);
    };
  }, []);

  // Return the result of the render prop function with the current mousePosition
  return render(mousePosition);
};

// PanelMouseLogger now uses MousePosition render prop
const PanelMouseLogger = () => {
  return (
    <div className="BasicTracker">
      <p>Mouse position:</p>
      <MousePosition
        render={(mousePosition) => (
          <div className="Row">
            <span>x: {mousePosition.x}</span>
            <span>y: {mousePosition.y}</span>
          </div>
        )}
      />
    </div>
  );
};

// PointMouseLogger now uses MousePosition render prop
const PointMouseLogger = () => {
  return (
    <MousePosition
      render={(mousePosition) =>
        mousePosition ? (
          <p>
            ({mousePosition.x}, {mousePosition.y})
          </p>
        ) : null
      }
    />
  );
};

function App() {
  return (
    <div className="App">
      <header className="Header">Cursor Tracker in React.js 🖱️</header>
      <PanelMouseLogger />
      <PointMouseLogger />
    </div>
  );
}

export default App;
