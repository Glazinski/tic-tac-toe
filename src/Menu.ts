import { Game } from './Game';
import { DOMHelpers } from './DOMHelpers';

export class Menu extends DOMHelpers {
  private circleBtn!: HTMLElement;
  private crossBtn!: HTMLElement;
  private rootElement: HTMLElement;
  private currentPlayer: string;

  constructor(private parentElement: HTMLElement, private game: Game) {
    super();
    this.rootElement = this.createElement('div', 'menu');
    this.currentPlayer = '';
  }

  onButtonClick = (event: Event): void => {
    const {
      dataset: { team },
    } = <HTMLButtonElement>event.currentTarget;
    this.currentPlayer = team!;
    this.hide();
  };

  hide = (): void => {
    this.rootElement.classList.add('hidden');
    // This function takes as an argument
    // choosed team and starts game
    this.game.startGame(this.currentPlayer);
  };

  show = (): void => {
    // this.game.startGame('x');
    this.parentElement.appendChild(this.rootElement);

    const html = `
      <h1>Play as</h1>
      <div>
        <button class="menu--btn circle-btn" data-team="o">
          <i class="icon far fa-circle"></i>
        </button>
        <button class="menu--btn cross-btn" data-team="x">
          <i class="icon fas fa-times"></i>
        </button>
      </div>
    `;

    this.rootElement.innerHTML = html;

    this.circleBtn = this.getElement('.circle-btn');
    this.crossBtn = this.getElement('.cross-btn');

    this.circleBtn.addEventListener('click', this.onButtonClick);
    this.crossBtn.addEventListener('click', this.onButtonClick);
  };
}
