import React from "react";
import { connect } from "react-redux";

import { replay } from "../../redux/game/actions";

function Replay(props) {
  const resetBoard = () => {
    const { replay } = props;
    replay();
  };

  return <button className="replay" onClick={() => resetBoard()}>Replay</button>;
}

const mapDispatchToProps = dispatch => {
  return {
    replay: () => dispatch(replay())
  };
};

export default connect(null, mapDispatchToProps)(Replay);
