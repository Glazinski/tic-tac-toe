import { Score } from './types/Score';
import { Board } from './types';
import { Players } from './types';

interface GameBtn extends EventTarget {
  dataset: DOMStringMap;
}

export class Game {
  score: Score;
  players: Players;
  currentPlayer: string;

  constructor(private parentElement: Element, private board: Board) {
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

  switchPlayer = (): void => {
    this.currentPlayer = this.currentPlayer === 'x' ? 'o' : 'x';
  };

  isGameWin = (): void => {};

  onButtonClick = (event: Event): void => {
    const { id } = (<GameBtn>event.currentTarget).dataset;
    const gameBtn = <Element>document.querySelector(`.game-btn-${id}`);
    gameBtn.innerHTML = this.players[this.currentPlayer];
    gameBtn.classList.add('unclickable');
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
