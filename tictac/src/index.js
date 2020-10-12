import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SmallBoard from './SmallBoard';


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,    };
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
      <div  className="row">
        <SmallBoard
          value = {this.state.squares[i]}
          color={this.state.color}
          onClick={() => this.handleClick(i)}
        />
      </div>
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
      <div className="game">

      <div>
        <div className="rows">
          <div  className="row">
            <SmallBoard />
          </div>
          <div  className="row">
            <SmallBoard />
          </div>
          <div className="row">
            <SmallBoard />
          </div>
        </div>
        <div className=".board-row">
          <div  className="row">
            <SmallBoard />
          </div>
          <div  className="row">
            <SmallBoard />
          </div>
          <div className="row">
            <SmallBoard />
          </div>
        </div>
        <div className=".board-row">
          <div  className="row">
            <SmallBoard />
          </div>
          <div  className="row">
            <SmallBoard />
          </div>
          <div className="row">
            <SmallBoard />
          </div>
        </div>
      </div>
        <div className="game-info">
          <div>{/* status */}</div>
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
