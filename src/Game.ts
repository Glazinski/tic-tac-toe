import { Score } from './types/Score';
import { Board } from './types';
import { Players } from './types';

interface GameBtn extends HTMLElement {
  dataset: DOMStringMap;
}

export class Game {
  score: Score;
  players: Players;
  currentPlayer: string;

  constructor(private board: Board) {
    this.score = {
      x: 0,
      o: 0,
    };
    this.players = {
      x: '<i class="icon fas fa-times"></i>',
      o: '<i class="icon far fa-circle"></i>',
    };
    this.currentPlayer = '';
  }

  get gameBoard() {
    return this.board.gameBoard;
  }

  switchPlayer = (): void => {
    this.currentPlayer = this.currentPlayer === 'x' ? 'o' : 'x';
  };

  isGameWon = (row: number, col: number): boolean => {
    if (
      // Horizontal win
      (this.gameBoard[row][0] === this.currentPlayer &&
        this.gameBoard[row][1] === this.currentPlayer &&
        this.gameBoard[row][2] === this.currentPlayer) ||
      // Vertical win
      (this.gameBoard[0][col] === this.currentPlayer &&
        this.gameBoard[1][col] === this.currentPlayer &&
        this.gameBoard[2][col] === this.currentPlayer) ||
      // Diagonal win
      (this.gameBoard[0][0] === this.currentPlayer &&
        this.gameBoard[1][1] === this.currentPlayer &&
        this.gameBoard[2][2] === this.currentPlayer) ||
      (this.gameBoard[2][0] === this.currentPlayer &&
        this.gameBoard[1][1] === this.currentPlayer &&
        this.gameBoard[0][2] === this.currentPlayer)
    )
      return true;
    return false;
  };

  onButtonClick = (event: Event): void => {
    const el = <GameBtn>event.currentTarget;
    const { col } = el.dataset;
    const { row } = (<GameBtn>el.parentNode).dataset;
    let c = +col!;
    let r = +row!;
    el.innerHTML = this.players[this.currentPlayer];
    el.classList.add('unclickable');
    this.gameBoard[r][c] = this.currentPlayer;
    console.log(this.isGameWon(r, c));
    this.switchPlayer();
  };

  startGame = (currPlayer: string): void => {
    this.currentPlayer = currPlayer;
    window.addEventListener('click', () => {
      console.log(this);
    });
    this.board.generateBoard(this.onButtonClick);
  };
}
