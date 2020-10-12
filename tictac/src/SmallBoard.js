import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

export default class SmallBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      color:"",
      over:false,
      moves: 8, //moves remaining
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
    this.props.onClickBoard(i);
    const squares = this.state.squares.slice();
    console.log(this.props);
    if(squares[i])
      return;
    squares[i] = this.props.next;
    this.setState({squares: squares});
    if (this.calculateWinner(squares, squares[i]) || squares[i] || this.state.over) {
      return;
    }
  }

  renderSquare(i) {
    var name = "subsection section" + (i+1);
    return (
      <div  className={name}>
        <this.Square
          value={this.state.squares[i]}
          color={this.state.color}
          onClick={() => this.handleClick(i)}
        />
      </div>
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
      console.log("sada cu metod da pozovem " + this.props.number);
      this.props.onFinish(this.props.number);
      return true;
    }
  }
  this.setState({moves: this.state.moves-1});
  if(this.state.moves <= 0){
    console.log("draw");
    this.setState({color: "buttonDraw"});
  }
  return null;
}

  render() {
    var name = "section section"+this.props.number;
    return (
      <div className={name}>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
      </div>
    );
  }
}
