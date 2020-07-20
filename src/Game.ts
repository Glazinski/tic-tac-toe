import { Board, PlayersScore, Players } from './types';
import { Score } from './Score';

interface GameBtn extends HTMLElement {
  dataset: DOMStringMap;
}

export class Game {
  private playersScore: PlayersScore;
  private players: Players;
  private currentPlayer: string;

  constructor(private board: Board, private score: Score) {
    this.playersScore = {
      x: 0,
      o: 0,
    };
    this.players = {
      x: '<i class="icon fas fa-times"></i>',
      o: '<i class="icon far fa-circle"></i>',
    };
    this.currentPlayer = '';
  }

  // Reference for 2D string board array
  private get gameBoard() {
    return this.board.gameBoard;
  }

  private switchPlayer = (): void => {
    this.currentPlayer = this.currentPlayer === 'x' ? 'o' : 'x';
  };

  private isGameWon = (row: number, col: number): boolean => {
    // Horizontal win
    if (
      this.gameBoard[row][0] === this.currentPlayer &&
      this.gameBoard[row][1] === this.currentPlayer &&
      this.gameBoard[row][2] === this.currentPlayer
    ) {
      console.log('Horizontal win', row);
      return true;
    }
    // Vertical win
    else if (
      this.gameBoard[0][col] === this.currentPlayer &&
      this.gameBoard[1][col] === this.currentPlayer &&
      this.gameBoard[2][col] === this.currentPlayer
    ) {
      console.log('Verticacl win', col);
      return true;
    }
    // Diagonal win left bottom corner to right upper corner
    else if (
      this.gameBoard[0][0] === this.currentPlayer &&
      this.gameBoard[1][1] === this.currentPlayer &&
      this.gameBoard[2][2] === this.currentPlayer
    ) {
      console.log('Diagonal win left upper corner to right bottom corner');
      return true;
    }
    // Diagonal win left upper corner to right bottom corner
    else if (
      this.gameBoard[2][0] === this.currentPlayer &&
      this.gameBoard[1][1] === this.currentPlayer &&
      this.gameBoard[0][2] === this.currentPlayer
    ) {
      console.log('Diagonal win left bottom corner to right upper corner');
      return true;
    }
    return false;
  };

  private increaseScore = (): void => {
    let score = this.playersScore[this.currentPlayer];
    score += 1;
    this.score.updateTableScore(this.currentPlayer, score);
  };

  private startNextRound = (): void => {
    this.board.clearBoard();
  };

  onButtonClick = (event: Event): void => {
    // In this case el stands for cell in board
    const element = <GameBtn>event.currentTarget;
    const { col } = element.dataset;
    const { row } = (<GameBtn>element.parentNode).dataset;
    let c = +col!;
    let r = +row!;
    element.innerHTML = this.players[this.currentPlayer];
    element.classList.add('unclickable');
    this.gameBoard[r][c] = this.currentPlayer;
    if (this.isGameWon(r, c)) {
      this.increaseScore();
    }
    this.switchPlayer();
  };

  startGame = (currPlayer: string): void => {
    this.currentPlayer = currPlayer;
    // TODO: DELETE IT LATER
    window.addEventListener('click', () => {
      console.log(this);
    });
    // I pass reference to onButtonClick function
    // so it can be attach as event listener to each cell
    this.board.generateBoard(this.onButtonClick);
    // P1 stands for player 1 and it is always going to be
    // choosed team by player, so it can be cross or circle
    const p1 = this.currentPlayer;
    const p2 = this.currentPlayer === 'x' ? 'o' : 'x';
    this.score.generateTableScore(p1, p2);
  };
}
