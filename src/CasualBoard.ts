import { Board } from './types';
import { DOMHelpers } from './DOMHelpers';

export class CasualBoard extends DOMHelpers implements Board {
  private rootElement: HTMLElement;
  gameBoard: string[][];

  constructor(private parentElement: HTMLElement) {
    super();
    this.rootElement = this.createElement('div', 'board');
    this.gameBoard = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
  }

  generateBoard = (callback: (event: Event) => void): void => {
    // this.rootElement.classList.add('board');
    this.parentElement.appendChild(this.rootElement);

    let html = '';

    for (let i = 0; i < 3; i++) {
      html += `
        <div class="row" data-row="${i}">
          <button class="game-btn game-btn--1" data-col="0"></button>
          <button class="game-btn game-btn--2" data-col="1"></button>
          <button class="game-btn game-btn--3" data-col="2"></button>
        </div>
      `;
    }

    this.rootElement.innerHTML = html;
    const buttons = document.querySelectorAll('.game-btn');
    buttons.forEach((divEl): void => {
      divEl.addEventListener('click', callback);
    });
  };

  clearBoard = (): void => {};
}
