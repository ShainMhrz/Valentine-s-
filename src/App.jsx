import { useState, useEffect } from "react";
import "./App.css";
import YesPage from "./YesPage";
import axios from "axios";

function App() {
  const [yesCount, setYesCount] = useState(0);
  const [noCount, setNoCount] = useState(0);
  const [noLogs, setNoLogs] = useState([]);
  const [showYesSection, setShowYesSection] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const noMessages = [
    " ",
    "Are you sure? 💔",
    "Think again... 😢",
    "HEY HEYY HEYYYY... 🥲",
    "Still no? 😭",
    "This is making me nervous... 💣",
    "Why are you like this? 💔",
    "Come on, please... 🥺",
    "You're really testing me... 😞",
    "You're breaking my heart... 😩",
    "Last chance! Click YES! 🔥",
    "HEHE just click YES...❤️✨", // Last message, index 11
  ];

  const handleNoClick = () => {
    const newCount = noCount + 1;
    const newLog = { count: newCount, time: new Date().toLocaleTimeString() };
    setNoCount(newCount);
    setNoLogs([...noLogs, newLog]);

    // Ensure currentPage does not exceed the last index
    setCurrentPage((prevPage) =>
      prevPage < noMessages.length - 1 ? prevPage + 1 : prevPage
    );

    // axios POST request to log data to Sheet
    // axios
    //   .post(
    //     "https://api.sheetbest.com/sheets/56fa24fa-23c7-4156-9e3e-b3746ad5a265",
    //     newLog
    //   )
    //   .then((response) => console.log(response))
    //   .catch((error) => console.error("Error logging data:", error));
  };

  if (showYesSection) {
    return <YesPage />;
  }

  return (
    <>
      <h1>Will you be my valentine?</h1>
      {/* Ensure last GIF stays the same when noMessages stops updating */}
      <img
        src={`src/assets/gif/${Math.min(
          currentPage + 1,
          noMessages.length
        )}.gif`}
        alt="love ya"
      />
      <p>{noMessages[currentPage]}</p>
      {noCount === 10 && (
        <p style={{ color: "red" }}>This is the last chance! Click YES! 🔥</p>
      )}
      <div className="card-main">
        <button
          id="yes-btn"
          onClick={() => setShowYesSection(true)}
          style={{
            fontSize: `${16 + noCount * 2}px`,
            padding: `${10 + noCount}px`,
          }}
        >
          Yes {yesCount}
        </button>
        <button id="no-btn" onClick={handleNoClick}>
          NO {noCount}
        </button>
      </div>
    </>
  );
}

export default App;
