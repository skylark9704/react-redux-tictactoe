import {
  USER_CLICK,
  GAME_OVER,
  HISTORY_SAVE,
  HISTORY_NEXT,
  HISTORY_PREVIOUS,
  REPLAY,
  SAVE_SCORE
} from "./actionTypes";

const userClick = (user, square) => {
  return {
    type: USER_CLICK,
    payload: {
      user,
      square
    }
  };
};

const gameOver = () => {
  return {
    type: GAME_OVER,
    payload: {
      gameOver: true
    }
  };
};

const historySave = move => {
  return {
    type: HISTORY_SAVE,
    payload: {
      move
    }
  };
};

const historyNext = () => {
  return {
    type: HISTORY_NEXT,
    payload: {}
  };
};

const historyPrevious = () => {
  return {
    type: HISTORY_PREVIOUS,
    payload: {}
  };
};

const replay = () => {
  return {
    type: REPLAY,
    payload: {}
  };
};

const saveScore = winner => {
  return {
    type: SAVE_SCORE,
    payload: { winner }
  };
};

export {
  userClick,
  gameOver,
  historySave,
  historyNext,
  historyPrevious,
  replay,
  saveScore
};
