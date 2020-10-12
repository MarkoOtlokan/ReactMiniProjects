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
    this.child = React.createRef();
    this.handleClickBoard = this.handleClickBoard.bind(this);
  }

  handleFinish(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    console.log("gotova igra broj " + i);
    this.setState({      squares: squares,      xIsNext: !this.state.xIsNext,    });
    if (this.calculateWinner(squares, squares[i]) || squares[i] || this.state.over) {
      return;
    }
  }

  handleClickBoard(i){
    this.setState({xIsNext: !this.state.xIsNext});
    console.log(this.state.xIsNext);
    this.render();
  }

  calculateWinner(squares, xoro) {
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
      console.log(squares);
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        if(xoro === 'X'){
          console.log("totalni pobednik X");
          this.setState({color: "1"});
        }
        else{
          console.log("totalni pobednik O");
          this.setState({color: "2"});
        }
        this.setState({over:true});
        this.render();
      }
      else{
        console.log("jos nema pobednika");
      }
    }
    return null;
  }

  renderSquare(i) {
    var sledeca = 'X';
    if(!this.state.xIsNext)
      sledeca = 'O';
    console.log(sledeca)
    return (
        <SmallBoard
          value = {this.state.squares[i]}
          color={this.state.color}
          onFinish={(i) => this.handleFinish}
          number = {i}
          onClickBoard = {this.handleClickBoard}
          next = {sledeca}
          key={i}
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
    var name = "board"+this.state.color;
    return (
      <div>

      <div className={name}>
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
