import React from "react";

import { connect } from "react-redux";

function Scoreboard(props) {
  const { scores } = props;

  return (
    <div>
      <h4>Scoreboard</h4>
      <hr></hr>
      <table className="score">
        <thead>
          <tr>
            <th>Game #</th>
            <th>Winner</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => {
            const { gameNumber, winner } = score;

            return (
              <tr key={index}>
                <td>{gameNumber}</td>
                <td>{winner}</td>
                <td>N/A</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const mapStateToProps = state => {
  const { scores } = state.game;

  return {
    scores
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Scoreboard);
