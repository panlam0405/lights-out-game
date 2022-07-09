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

    // TODO: set initial state
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

  /** handle changing a cell: update board & determine if winner */

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
    // TODO: flip this cell and the cells around it
    flipCell(y, x);
    flipCell(y, x - 1);
    flipCell(y, x + 1);
    flipCell(y - 1, x);
    flipCell(y + 1, x);


    let msg = board.every(row => row.every(el => el === false));
    let hasWon = msg;

    this.setState({ board: board, hasWon: hasWon });
    // win when every cell is turned off
    // TODO: determine is the game has been won

    // this.setState({ board, hasWon });
  }


  /** Render game board or winning message. */

  render() {

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
