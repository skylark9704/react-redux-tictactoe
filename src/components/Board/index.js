import React from "react";
import { connect } from "react-redux";

import {
  userClick,
  gameOver,
  saveScore,
  historySave
} from "../../redux/game/actions";

import Square from "../Square";
import TimeTravel from "../TimeTravel";
import Replay from "../Replay";

function Board(props) {
  const { userClick, historySave, saveScore, gameOver } = props; // Redux Actions
  const { values, isGameOver, isTimeTravelling, presentTurn } = props; // State Properties

  const squareClick = square => {
    userClick(presentTurn, square);
  };

  let winner = calculateWinner(values);
  let status;
  
  !isTimeTravelling && historySave(values);
  
  if (winner) {
    gameOver();
    status = "Winner : " + winner;
  } else {
    status = `${presentTurn}'s Turn`;
  }

  (isGameOver && winner) && saveScore(winner);
  
  if(!values.includes(null)){
    gameOver()
    status = 'Try Again'
  }

  return (
    <div className="board">
      <h4>{status}</h4>
      <hr></hr>
      <br></br>
      <div className="square-container">
        {values.map((_, index) => {
          return (
            <Square key={index} square={index} onSquareClick={squareClick} />
          );
        })}
      </div>

      <hr />
      {isGameOver ? <Replay /> : <TimeTravel />}
    </div>
  );
}

function calculateWinner(values) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (values[a] && values[a] === values[b] && values[a] === values[c]) {
      return values[a];
    }
  }

  return null;
}

const mapStateToProps = state => {
  const { values, presentTurn, isTimeTravelling, isGameOver } = state.game;
  return {
    values,
    presentTurn,
    isTimeTravelling,
    isGameOver
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userClick: (user, square) => dispatch(userClick(user, square)),
    gameOver: () => dispatch(gameOver()),
    historySave: move => dispatch(historySave(move)),
    saveScore: winner => dispatch(saveScore(winner))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
