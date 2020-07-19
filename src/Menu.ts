import { Game } from './Game';

export class Menu {
  private circleBtn!: Element;
  private crossBtn!: Element;
  private rootElement: Element;
  currentPlayer: string;

  constructor(private parentElement: HTMLElement, private game: Game) {
    this.rootElement = document.createElement('div');
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
    this.rootElement.classList.add('menu');
    this.parentElement.appendChild(this.rootElement);

    const html = `
      <h1>Play as</h1>
      <div>
        <button class="menu-btn circle-btn" data-team="o">
          <i class="icon far fa-circle"></i>
        </button>
        <button class="menu-btn cross-btn" data-team="x">
          <i class="icon fas fa-times"></i>
        </button>
      </div>
    `;

    this.rootElement.innerHTML = html;

    this.circleBtn = <Element>document.querySelector('.circle-btn');
    this.crossBtn = <Element>document.querySelector('.cross-btn');

    this.circleBtn.addEventListener('click', this.onButtonClick);
    this.crossBtn.addEventListener('click', this.onButtonClick);
  };
}
