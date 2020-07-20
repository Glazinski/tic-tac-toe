import { DOMHelpers } from './DOMHelpers';

export class Score extends DOMHelpers {
  private rootElement: HTMLElement;
  private player1: string = '';
  private player2: string = '';

  constructor(private parentElement: HTMLElement) {
    super();
    this.rootElement = this.createElement('div', 'score');
  }

  generateTableScore = (p1: string, p2: string): void => {
    console.log(p1, p2);
    this.player1 = p1;
    this.player2 = p2;
    const html = `
      P1:<div id="player-${p1}">0</div>
      <button class="restart-btn">RESTART GAME</button>
      P2: <div id="player-${p2}">0</div>
    `;

    this.rootElement.innerHTML = html;
    this.parentElement.appendChild(this.rootElement);
  };

  updateTableScore = (player: string, score: number): void => {
    const elRef = <HTMLElement>document.getElementById(`player-${player}`);
    elRef.innerHTML = score.toString();
  };
}
