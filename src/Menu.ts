import { Game } from './Game';
import { DOMHelpers } from './DOMHelpers';

export class Menu extends DOMHelpers {
  private circleBtn!: HTMLElement;
  private crossBtn!: HTMLElement;
  private rootElement: HTMLElement;

  constructor(private parentElement: HTMLElement) {
    super();
    this.rootElement = this.createElement('div', 'menu');
  }

  hide = (): void => {
    this.rootElement.remove();
  };

  show = (callback: (currentPlayer: string) => void): void => {
    this.parentElement.appendChild(this.rootElement);

    const html = `
      <h1 class="start-title">Play as</h1>
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

    this.circleBtn.addEventListener('click', () => callback('o'));
    this.crossBtn.addEventListener('click', () => callback('x'));
  };
}
