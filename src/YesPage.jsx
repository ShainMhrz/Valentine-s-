import React, { useEffect, useState } from "react";
import Draggy from "./Draggy"; // Import Draggy component
import "./YesPage.css";

function YesPage() {
  const [showDraggy, setShowDraggy] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    // Show Draggy after a delay
    const timer = setTimeout(() => {
      setShowDraggy(true);
      setTimeout(() => {
        setFadeIn(true); // Trigger fade-in effect after Draggy is loaded
      }, 100); // Small delay to ensure smooth transition
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="yes-section">
      {showDraggy ? (
        <div className={`draggy-container ${fadeIn ? "fade-in" : ""}`}>
          <Draggy />
        </div>
      ) : (
        <div className="container">
          <div className="valentines">
            <div className="envelope"></div>
            <div className="front"></div>
            <div className="card">
              <div className="text">
                Happy <br /> Valentine's <br />
                Day in Advance
              </div>
              <div className="heart"></div>
            </div>
            <div className="hearts">
              <div className="one"></div>
              <div className="two"></div>
              <div className="three"></div>
              <div className="four"></div>
              <div className="five"></div>
            </div>
          </div>
        </div>
      )}

      {/* Only show shadow if YesPage content is visible */}
      {!showDraggy && <div className="shadow"></div>}
    </div>
  );
}

export default YesPage;
