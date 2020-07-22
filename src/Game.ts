import { Board, PlayersScore, Players, Directions } from './types';
import { Score } from './Score';
import { Animations } from './Animations';
import { DOMHelpers } from './DOMHelpers';
import { Menu } from './Menu';
import gsap from 'gsap';

interface GameBtn extends HTMLElement {
  dataset: DOMStringMap;
}

export class Game extends DOMHelpers {
  private playersScore: PlayersScore;
  private players: Players;
  private currentPlayer: string;

  constructor(
    private menu: Menu,
    private board: Board,
    private score: Score,
    private animations: Animations
  ) {
    super();
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

  private isGameWon = (row: number, col: number): boolean => {
    // Horizontal win
    let isWin = false;

    const boardSelector = '.board';
    if (
      this.gameBoard[row][0] === this.currentPlayer &&
      this.gameBoard[row][1] === this.currentPlayer &&
      this.gameBoard[row][2] === this.currentPlayer
    ) {
      this.animations.animateLine(
        boardSelector,
        `.row--${row + 1}`,
        Directions.Horizontal
      );
      isWin = true;
    }
    // Vertical win
    else if (
      this.gameBoard[0][col] === this.currentPlayer &&
      this.gameBoard[1][col] === this.currentPlayer &&
      this.gameBoard[2][col] === this.currentPlayer
    ) {
      this.animations.animateLine(
        boardSelector,
        `.game-btn--${col + 1}`,
        Directions.Vertical
      );
      isWin = true;
      // return true;
    }
    // Diagonal win left bottom corner to right upper corner
    else if (
      this.gameBoard[0][0] === this.currentPlayer &&
      this.gameBoard[1][1] === this.currentPlayer &&
      this.gameBoard[2][2] === this.currentPlayer
    ) {
      this.animations.animateLine(
        boardSelector,
        boardSelector,
        Directions.LeftDiagonal
      );
      isWin = true;
      // return true;
    }
    // Diagonal win left upper corner to right bottom corner
    else if (
      this.gameBoard[2][0] === this.currentPlayer &&
      this.gameBoard[1][1] === this.currentPlayer &&
      this.gameBoard[0][2] === this.currentPlayer
    ) {
      this.animations.animateLine(
        boardSelector,
        boardSelector,
        Directions.RightDiagonal
      );
      isWin = true;
      // return true;
    } else if (this.isDraw()) {
      // this.printMessage('Draw');
      this.animations.printAnimatedMessage('Draw');
      setTimeout(() => {
        this.startNextRound();
      }, 1000);
    }
    if (isWin) {
      this.board.rootElement.style.pointerEvents = 'none';
      return true;
    }

    return false;
  };

  private switchPlayer = (): void => {
    this.currentPlayer = this.currentPlayer === 'x' ? 'o' : 'x';
  };

  private increaseScore = (): void => {
    this.playersScore[this.currentPlayer] += 1;
    this.score.updateTableScore(
      this.currentPlayer,
      this.playersScore[this.currentPlayer]
    );
  };

  private startNextRound = (): void => {
    this.board.clearBoard();
    this.board.rootElement.style.pointerEvents = 'auto';
  };

  onCellButtonClick = (event: Event): void => {
    // In this case el stands for cell in board
    const element = <GameBtn>event.currentTarget;
    const { col } = element.dataset;
    const { row } = (<GameBtn>element.parentNode).dataset;
    let c = +col!;
    let r = +row!;
    element.innerHTML = this.players[this.currentPlayer];
    element.classList.add('unclickable');
    gsap.fromTo(element.childNodes[0], 0.2, { scale: 0.2 }, { scale: 1 });
    this.gameBoard[r][c] = this.currentPlayer;
    if (this.isGameWon(r, c)) {
      this.increaseScore();
      setTimeout(() => {
        this.startNextRound();
      }, 1000);
    } else {
      this.switchPlayer();
    }
  };

  resetScores = (): void => {
    this.playersScore = {
      x: 0,
      o: 0,
    };
  };

  onResetButtonClick = (): void => {
    this.score.clearTableScore();
    this.board.clearBoard();
    this.resetScores();
    this.removeElement('.board');
    this.removeElement('.score');
    this.showStartMenu();
  };

  onStartButtonClick = (currentPlayer: string): void => {
    this.menu.hide();
    this.startGame(currentPlayer);
  };

  showStartMenu = (): void => {
    this.menu.show(this.onStartButtonClick);
  };

  isDraw = (): boolean => {
    const { length } = this.gameBoard;

    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        if (this.gameBoard[i][j].length === 0) {
          return false;
        }
      }
    }

    return true;
  };

  startGame = (currPlayer: string): void => {
    this.currentPlayer = currPlayer;
    // I pass reference to onButtonClick function
    // so it can be attach as event listener to each cell
    this.board.generateBoard(this.onCellButtonClick);
    // P1 stands for player 1 and it is always going to be
    // choosed team by player, so it can be cross or circle
    const p1 = this.currentPlayer;
    const p2 = this.currentPlayer === 'x' ? 'o' : 'x';
    this.score.generateTableScore(p1, p2, this.onResetButtonClick);
  };
}
