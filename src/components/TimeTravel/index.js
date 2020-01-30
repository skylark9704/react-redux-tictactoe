import React from "react";

import { connect } from "react-redux";
import { historyNext, historyPrevious } from "../../redux/game/actions";

function TimeTravel(props) {
  const { cursor, moves, historyNext, historyPrevious } = props;

  const next = () => {
    historyNext();
  };

  const previous = () => {
    historyPrevious();
  };

  return (
    <div className="time-travel">
      <button className="nav" disabled={cursor === 1 ? true : false} onClick={() => previous()}>{"<"}</button>
      <button className="moves">
        Moves : {cursor - 1}/{moves.length - 1}
      </button>
      <button className="nav" disabled={cursor === moves.length} onClick={() => next()}>{">"}</button>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    cursor: state.game.cursor,
    moves: state.game.moves
  };
};

const mapDispatchToProps = dispatch => {
  return {
    historyNext: () => dispatch(historyNext()),
    historyPrevious: () => dispatch(historyPrevious())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TimeTravel);
