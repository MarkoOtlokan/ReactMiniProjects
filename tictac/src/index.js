import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SmallBoard from './SmallBoard';


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      color:"",
      xIsNext: true,
      over:false,   };
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  renderSquare(i) {
    return (
        <SmallBoard
          value = {this.state.squares[i]}
          color={this.state.color}
          onClick={() => this.handleClick(i)}
          number = {i}
        />
    );
  }

  render() {
    const winner = this.calculateWinner(this.state.squares);
    let status;
    if (winner) {
       status = 'Winner: ' + winner;
    }
    else {
       status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div>

      <div className="board">
              {this.renderSquare(1)}
              {this.renderSquare(2)}
              {this.renderSquare(3)}
              {this.renderSquare(4)}
              {this.renderSquare(5)}
              {this.renderSquare(6)}
              {this.renderSquare(7)}
              {this.renderSquare(8)}
              {this.renderSquare(9)}
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
