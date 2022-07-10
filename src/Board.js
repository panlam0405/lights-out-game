import React, { Component } from "react";
import Cell from "./Cell";
import './Board.css';

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncolumns: 5,
    chanceLightStartsOn: 0.05
  }
  constructor(props) {
    super(props);

    this.state = {
      hasWon: false,
      board: this.createBoard()
    }
    // this.flipCellsAround = this.flipCellsAround.bind(this);
  }

  createBoard() {
    let board = [];
    // TODO: create array-of-arrays of true/false values
    for (let r = 0; r < this.props.nrows; r++) {
      let row = [];
      for (let c = 0; c < this.props.ncolumns; c++) {
        row.push(Math.random() < this.props.chanceLightStartsOn)
      }
      board.push(row);
    }
    return board
  }

  flipCellsAround(coord) {
    console.log(coord);
    let { ncolumns, nrows } = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncolumns && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }
    flipCell(y, x);
    flipCell(y, x - 1);
    flipCell(y, x + 1);
    flipCell(y - 1, x);
    flipCell(y + 1, x);


    let msg = board.every(row => row.every(el => el === false));
    let hasWon = msg;

    this.setState({ board: board, hasWon: hasWon });

  }


  /** Render game board or winning message. */

  render() {
    // if (this.state.hasWon) {
    //   return (
    //     <h1> <span className="neon">You</span> <span className="flux">Win!!</span> </h1>
    //   )
    // }

    // if the game is won, just show a winning msg & render nothing else
    let tableBoard = [];
    for (let r = 0; r < this.props.nrows; r++) {
      let row = [];
      for (let c = 0; c < this.props.ncolumns; c++) {
        let coord = `${r}-${c}`
        row.push(<Cell key={coord} isLit={this.state.board[r][c]} flipCellsAroundMe={() => this.flipCellsAround(coord)} />);
      }
      tableBoard.push(<tr key={r}>{row}</tr>);
    }
    // TODO
    return (
      <div>
        <table className="Board">
          <tbody>
            {this.state.hasWon ? <h1> <span className="neon">You</span> <span className="flux">Win!!</span> </h1> :
              ''}
            {tableBoard}
          </tbody>
        </table>
      </div>
    )
    // make table board

    // TODO
  }
}


export default Board;
