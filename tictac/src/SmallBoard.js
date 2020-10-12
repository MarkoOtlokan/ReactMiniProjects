import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

export default class SmallBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      color:"",
      xIsNext: true,
      over:false,
      };
  }

  Square(props) {
    return (
      <button  className={props.color} onClick={props.onClick}>
        {props.value}
      </button>
    );
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if(squares[i])
      return;
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({      squares: squares,      xIsNext: !this.state.xIsNext,    });
    if (this.calculateWinner(squares, squares[i]) || squares[i] || this.state.over) {
      return;
    }
  }

  renderSquare(i) {
    return (
      <this.Square
        value={this.state.squares[i]}
        color={this.state.color}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  calculateWinner(squares,xoro) {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && !this.state.over) {
      if(xoro === 'X'){
        console.log(xoro);
        this.setState({color: "buttonWiner1"});
      }
      else{
        console.log("drugi"+xoro)
        this.setState({color: "buttonWiner2"});
      }
      this.setState({over:true});
      this.render();
    }
  }
  return null;
}

  render() {
    return (
      <span className="smallBoard">
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </span>
    );
  }
}
