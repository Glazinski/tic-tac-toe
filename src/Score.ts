import { DOMHelpers } from './DOMHelpers';
import { Players } from './types';

export class Score extends DOMHelpers {
  private rootElement: HTMLElement;
  players: Players;

  constructor(private parentElement: HTMLElement) {
    super();
    this.rootElement = this.createElement('div', 'score');
    this.players = {
      x: '<i class="icon fas fa-times"></i>',
      o: '<i class="icon far fa-circle"></i>',
    };
  }

  generateTableScore = (
    p1: string,
    p2: string,
    callback: (event: Event) => void
  ): void => {
    const html = `
      <div class="score__players">
        <div class="score__player">
          <span class="player-icon">
            ${this.players[p1]}
          </span>:
          <div class="player" id="player-${p1}">
            0
          </div> 
        </div>
        <div class="score__player">
          <span class="player-icon">
            ${this.players[p2]}
          </span>:
          <div class="player" id="player-${p2}">
            0
          </div>
        </div>
      </div>
      <button class="score__restart-btn">RESTART GAME</button>
    `;

    this.rootElement.innerHTML = html;
    this.parentElement.appendChild(this.rootElement);

    const resetButton = this.getElement('.score__restart-btn');
    resetButton.addEventListener('click', callback);
  };

  updateTableScore = (player: string, score: number): void => {
    const elRef = <HTMLElement>document.getElementById(`player-${player}`);
    elRef.innerHTML = score.toString();
  };

  clearTableScore = (): void => {
    this.removeNodesContent('.player');
  };
}
