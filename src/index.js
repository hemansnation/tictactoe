import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';


// function square - function component
function Square(props){
  return (
    <button onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}

// calculate the winner
function CalculateWinner(squares){
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],    
  ];

  for(let i = 0; i<lines.length ; i++ ){
    const [a,b,c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
}


// board component
class Board extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  // reset
  reset(){
    this.setState({
      squares: this.state.squares.map(x => null),
      xIsNext: true,
    })
  }

  // handle click
  handleClick(i){
    const square = this.state.squares.slice();
    if(square[i] || CalculateWinner(square)){
      return;
    }
    square[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: square,
      xIsNext: !this.state.xIsNext,
    });
  }

  // render square 

  renderSquare(i){
    return (
      <Square value={this.state.squares[i]} 
        onClick = {() => this.handleClick(i)}
      />
    );
  }

  // render
  render(){

    const winner = CalculateWinner(this.state.squares);

    let status;
    if(winner){
      status = `Winner: ${winner}`;
    }else{
      status = `Next Player: ${this.state.xIsNext? 'X': 'O'}`;
    }

    return (
      <div>
        <div>{status}</div>

        <button onClick={() => this.reset()}>Reset</button>

        <div>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>

        <div>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>

        <div>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>

      </div>
    );
  }

}


// game component
class Game extends React.Component{
  render(){
    return (
      <div>
        <div>
          <Board />
        </div>
        <div>
          <div>{}</div>
        </div>
      </div>
    );
  }
}








ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
