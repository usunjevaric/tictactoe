import React from 'react';
import Board from './components/Board';
import Menu from './components/Menu';
import {connect} from 'react-redux';
import {toggleMenu,switchTheme} from "./redux/actions/showMenuActions";
import {updatePlayerO,updatePlayerX} from "./redux/actions/playersActions";
import {clickOnSquare,resetGame,newGame,incrementWinn} from "./redux/actions/gameActions";
import {calculateWinner} from "./calculateWinner";

class App extends React.Component {
    //click on square
    handleClick= i=> {
        const squares = this.props.squares.slice();
        if (calculateWinner(squares).line.length>0||squares[i]) {
            return;
        }
        squares[i] = this.props.xIsNext ? "X" : "O";
        const obj={
            squares:squares,
            xIsNext:!this.props.xIsNext
        };
        this.props.onSquareClick(obj);
        //if side menu opened close it after click on square
        if(this.props.showMenu===true){
            this.props.onMenuToggleClick();
        }
    };
    //button restart
    handleRestart=lastWinner=> {
        if (lastWinner==="X"){
            this.props.incrementWinner("x");
        }
        if (lastWinner==="O"){
            this.props.incrementWinner("o")
        }
        this.props.onResetGame();
    };
    //after draw button showed
    drawReset=lastGamePlayer=>{
      let onPlay;
      lastGamePlayer==="X"?onPlay=false:onPlay=true;
        const obj={
            winns:{
                x:this.props.winns.x,
                o:this.props.winns.o,
            },
            xIsNext:onPlay
        };
        this.props.onResetGame(obj);
    };
    //start new game button
    handleNawGame=()=>{
        this.props.onNewGame();
    };
    // change name of player x
    handleUpdatePlayerX=event=>{
      let playerName;
      if(event.target.value===''){
        playerName='Player1';
      }else{
        playerName=event.target.value;
      }
      this.props.onPlayerXChange(playerName);
    };
    // change name of player o
    handleUpdatePlayerO=event=>{
      let playerName;
      if(event.target.value===''){
        playerName='Player2';
      }else{
        playerName=event.target.value;
      }
      this.props.onPlayerOChange(playerName);
    };
    //toggle side menu on click
    handleMenu=()=>{
       this.props.onMenuToggleClick();
    };
    //Green result of better player
    CurrentBeter(pl1,pl2){
        if(pl1===pl2){
            return null
        }else if(pl1>pl2){
            return "green"
        }else{
            return "red"
        }
    };

    render() {
        const {showMenu,playerX,playerO,squares,xIsNext,winns,darkTheme}=this.props;
        let winner = calculateWinner(squares);
        let status;

        if (winner.line.length>0) {
              status=
              <div className='game-status animated tada'>
                Winner is: {winner.player}({winner.player==="X"?playerX:playerO})
              </div>
        }else {
            if(squares.includes(null)){
              status=
              <div className='game-status'>
                Next player:
                 <span className='indieFont'>
                  {(xIsNext ? "X" : "O")}
                </span>
              </div>
            }else{
              status=
              <div className='game-status'>
                Draw, 
                <button className='draw swing' onClick={()=>this.drawReset((xIsNext ? "X" : "O"))}>
                  play again
                </button>
              </div>
            }
        }
        return (
            <React.Fragment>
                {
                    showMenu &&
                        <Menu
                            handleUpdatePlayerX={this.handleUpdatePlayerX}
                            handleUpdatePlayerO={this.handleUpdatePlayerO}
                            handleMenu={this.handleMenu}
                            darkTheme={darkTheme}
                            switchTheme={this.props.switchTheme}
                        />
                }
            <div className="game">
                {/*side menu btn and menu*/}
                <div className={'menuBtn ' +(showMenu?'closeMenu':'showMenu')}>
                    <button onClick={this.handleMenu}>
                        {showMenu?'X':<i className='fa fa-bars'/>}
                    </button>
                </div>
                {/*results*/}
                  <div className='results'>
                    <p>Results</p>
                    <div className='players'>
                      <p>
                      {playerX}: <span className={'player-result '+(this.CurrentBeter(winns.x,winns.o))}>{winns.x}</span>
                      </p>
                      <p>
                      {playerO}: <span className={'player-result '+(this.CurrentBeter(winns.o,winns.x))}>{winns.o}</span>
                      </p>
                    </div>
                  </div>
                  {status}

                    <div className="game-board">
                        <Board
                            winningSquares={winner ? winner.line : []}
                            direction={winner?winner.direction:""}
                            squares={squares}
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
            </React.Fragment>
        );
    }
}

const mapStateToProps=state=>{
    return{
        darkTheme:state.toggleMenu.darkTheme,
        showMenu:state.toggleMenu.showMenu,
        playerX:state.players.playerX,
        playerO:state.players.playerO,
        squares:state.game.squares,
        xIsNext:state.game.xIsNext,
        winns:state.game.winns,
    }
};

const mapDispatchToProps=(dispatch)=>{
  return{
      onMenuToggleClick:()=>{
          dispatch(toggleMenu())
      },
      onPlayerXChange:(playerName)=>{
          dispatch(updatePlayerX(playerName))
      },
      onPlayerOChange:(playerName)=>{
          dispatch(updatePlayerO(playerName))
      },
      onSquareClick:(obj)=>{
          dispatch(clickOnSquare(obj))
      },
      onResetGame:()=>{
          dispatch(resetGame())
      },
      onNewGame:()=>{
          dispatch(newGame())
      },
      incrementWinner:(winner)=>{
          dispatch(incrementWinn(winner))
      },
      switchTheme:()=>{
          dispatch(switchTheme())
      }
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(App)