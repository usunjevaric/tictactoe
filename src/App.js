import React from 'react';
import Board from './components/Board';

import ('./App.css');

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
            winns:{
              x:0,
              o:0
            },
            names:{
              playerX:'Player1',
              playerO:'Player2'
            }
        };
    }
    //click on square
    handleClick= i=> {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares).line.length>0||squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? "X" : "O";
        this.setState({
            squares:squares,
            xIsNext: !this.state.xIsNext
        });
    }
    //button restart
    handleRestart=lastWinner=>{
        let onPlay;
        if(lastWinner==="X"){
            onPlay=false
            this.setState({
              squares: Array(9).fill(null),
              xIsNext:onPlay,
              winns:{
                x:this.state.winns.x+1,
                o:this.state.winns.o
              }
          })
        }else if(lastWinner==='O'){
            onPlay=true
            this.setState({
              squares: Array(9).fill(null),
              xIsNext:onPlay,
              winns:{
                o:this.state.winns.o+1,
                x:this.state.winns.x
              }
          })
        }else if(lastWinner===null){
          onPlay=true
          this.setState({
            squares: Array(9).fill(null),
            xIsNext:onPlay,
            winns:{
              o:this.state.winns.o,
              x:this.state.winns.x
            }
        })
        }

    }
    //after draw button showed
    drawReset=lastGamePlayer=>{
      let onPlay;
      if(lastGamePlayer==="X"){
        onPlay=false
      }else{
        onPlay=true
      }
      this.setState({
        squares: Array(9).fill(null),
        xIsNext:onPlay,
        winns:{
          o:this.state.winns.o,
          x:this.state.winns.x
        }
    })
    }
    //start new game button
    handleNawGame=()=>{
      this.setState({
        squares: Array(9).fill(null),
        xIsNext: true,
        winns:{
          x:0,
          o:0
        }
      })
    }
    // change name of player x
    handleUpdatePlayerX=event=>{
      let playerName;
      if(event.target.value===''){
        playerName='Player1';
      }else{
        playerName=event.target.value;
      }
      this.setState({
        names:{
          playerX:playerName,
          playerO:this.state.names.playerO
        }
      })
    }
    // change name of player o
    handleUpdatePlayerO=event=>{
      let playerName;
      if(event.target.value===''){
        playerName='Player2';
      }else{
        playerName=event.target.value;
      }
      this.setState({
        names:{
          playerX:this.state.names.playerX,
          playerO:playerName
        }
      })
    }

    //Green result of better player
    CurrentBeter(pl1,pl2){
      if(pl1===pl2){
        return null
      }else if(pl1>pl2){
        return "green"
      }else{
        return "red"
      }
    }

    render() {
        let winner = calculateWinner(this.state.squares);
        let status;
        if (winner.line.length>0) {
              status=
              <div className='game-status animated tada'>
                Winner is: {winner.player}({winner.player==="X"?this.state.names.playerX:this.state.names.playerO})
              </div>
        }else {
            if(this.state.squares.includes(null)){
              status=
              <div className='game-status'>
                Next player:
                 <span className='player-result'>
                  {(this.state.xIsNext ? "X" : "O")}
                </span>
              </div>
            }else{
              status=
              <div className='game-status'>
                Draw, 
                <button className='draw swing' onClick={()=>this.drawReset((this.state.xIsNext ? "X" : "O"))}>
                  play again
                </button>
              </div>
            }
        }

        return (
            <div className="game">
              <div className='results'>
                <p>Results</p>
                <div className='players'>
                  <p>
                  {this.state.names.playerX}: <span className={'player-result '+(this.CurrentBeter(this.state.winns.x,this.state.winns.o))}>{this.state.winns.x}</span>
                  </p>
                  <p>
                  {this.state.names.playerO}: <span className={'player-result '+(this.CurrentBeter(this.state.winns.o,this.state.winns.x))}>{this.state.winns.o}</span>
                  </p>
                </div>
              </div>
              {status}
              <div className='player-names'>
                <form>
                  <label htmlFor='playerX'>Player X name</label>
                  <input type='text' id='playerX' name='playerX' placeholder='Enter name of player X' onChange={this.handleUpdatePlayerX} />
                  <label htmlFor='playerO'>Player O name</label>
                  <input type='text' id='playerO' name='playerO' placeholder='Enter name of player O' onChange={this.handleUpdatePlayerO} />
                </form>
              </div>
                <div className="game-board">
                    <Board
                        winningSquares={winner ? winner.line : []}
                        direction={winner?winner.direction:""}
                        squares={this.state.squares}
                        onClick={i => this.handleClick(i)}
                    />
                </div>
                    <button
                        className='btn game-reset'
                        onClick={()=>this.handleRestart(winner.line.length>0?winner.player:null)}>
                            Restart
                    </button> 
                    <button
                    className='btn new-game'
                    onClick={this.handleNawGame}
                    >
                      New game
                    </button>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
       const object= lines.reduce((acc,line,idx)=>{
          const[a,b,c]=line;

          let dir;
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            if(idx<=2){
              dir=1;
            }else if(idx<=5){
              dir=2;
            }else if(idx===6){
              dir=3
            }else if(idx===7){
              dir=4
            }
            acc.player=squares[a];
            acc.line=line;
            acc.direction=dir;  
          }
          return acc;
        },{
          player:'',
        line:[],
        direction:-1
      })
    return object;
   
}
export default App