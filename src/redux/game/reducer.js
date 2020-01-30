const initialState = {
  presentTurn: "X",
  values: Array(9).fill(null),
  moves: [],
  cursor: 0,
  isTimeTravelling: false,
  isGameOver: false,
  scores: [],
  gameNumber: 1
};

const gameReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "USER_CLICK": {
      const { user, square } = payload;
      const { values, presentTurn, isGameOver, isTimeTravelling } = state;

      let timeTravelling = isTimeTravelling;
      let updatedValues = values.slice();
      let updatedPresentTurn = presentTurn;
      if (!isGameOver) {
        if (updatedValues[square] === null) {
          timeTravelling = false;
          if (updatedPresentTurn === "X") {
            updatedPresentTurn = "O";
          } else {
            updatedPresentTurn = "X";
          }
          updatedValues[square] = user;
        }
      }

      return {
        ...state,
        values: updatedValues,
        presentTurn: updatedPresentTurn,
        isTimeTravelling: timeTravelling
      };
    }

    case "GAME_OVER": {
      return {
        ...state,
        isGameOver: true
      };
    }

    case "HISTORY_SAVE": {
      const { move } = payload;
      const { moves, cursor } = state;
      let newMoves = [...moves];
      let newCursor = cursor;
      let isSameMoves = compareMoves(moves[moves.length - 1], move);

      if (!isSameMoves) {
        if (newMoves[cursor]) {
          newMoves.splice(cursor);
          newMoves.push(move);
        } else {
          newMoves.push(move);
        }

        newCursor += 1;
      }

      return {
        ...state,
        moves: newMoves,
        cursor: newCursor
      };
    }

    case "HISTORY_NEXT": {
      const { cursor, moves } = state;
      let updatedCursor = cursor + 1;

      let isTimeTravelling = true;
      if (moves.length === updatedCursor - 1) {
        updatedCursor = cursor;
        isTimeTravelling = false;
      }

      let values = [...moves[updatedCursor - 1]];

      return {
        ...state,
        values,
        isTimeTravelling,
        cursor: updatedCursor
      };
    }

    case "HISTORY_PREVIOUS": {
      const { cursor, moves } = state;

      console.log(cursor, moves.length);

      let updatedCursor = cursor;
      if (cursor !== 0) {
        updatedCursor -= 1;
      }

      let timeTravelling = true;
      if (updatedCursor === moves.length) {
        timeTravelling = false;
      }

      let values = [...moves[updatedCursor - 1]];

      return {
        ...state,
        values,
        cursor: updatedCursor,
        isTimeTravelling: timeTravelling
      };
    }

    case "REPLAY": {
      const { gameNumber, scores } = state;
      return {
        ...initialState,
        gameNumber: gameNumber + 1,
        scores
      };
    }

    case "SAVE_SCORE": {
      const { winner } = payload;
      const { scores, gameNumber } = state;

      let updatedScores = [...scores];

      let win = {
        winner,
        gameNumber
      };

      updatedScores.push(win);
      return {
        ...state,
        scores: updatedScores
      };
    }

    default: {
      return state;
    }
  }
};

function compareMoves(m1, m2) {
  let lastMove = JSON.stringify(m1);
  let presentMove = JSON.stringify(m2);
  if (lastMove !== presentMove) {
    return false;
  }
  return true;
}

export { gameReducer };
