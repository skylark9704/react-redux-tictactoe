import React from "react";
import Board from "./components/Board";
import "./App.css";
import Scoreboard from "./components/Scoreboard";

function App() {
  return (
    <div className="game">
      <div>
        <Board />
      </div>

      <div>
        <Scoreboard />
      </div>
    </div>
  );
}

export default App;
