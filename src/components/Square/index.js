import React from "react";
import { connect } from "react-redux";

function Square(props) {
  const { onSquareClick, values, square } = props;
  const styles = {
    red: {
      color: "red"
    },
    blue: {
      color: "blue"
    }
  };

  const click = square => onSquareClick(square);

  return (
    <div
      className="square"
      style={values[square] === "X" ? styles.red : styles.blue}
      onClick={() => click(square)}
    >
      {values[square]}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    values: state.game.values
  };
};

export default connect(mapStateToProps, null)(Square);
