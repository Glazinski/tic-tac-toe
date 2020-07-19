import { Board } from './types';

export class CasualBoard implements Board {
  private rootElement: HTMLElement;
  gameBoard: string[][];

  constructor(private parentElement: HTMLElement) {
    this.rootElement = document.createElement('div');
    this.gameBoard = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
  }

  generateBoard = (callback: (event: Event) => void): void => {
    this.rootElement.classList.add('board');
    this.parentElement.appendChild(this.rootElement);

    let html = '';

    for (let i = 0; i < 3; i++) {
      // html += `<button class="game-btn game-btn-${i}" data-id="${i}"></button>`;
      html += `
        <div class="row" data-row="${i}">
          <button class="game-btn game-btn-${i}" data-col="0"></button>
          <button class="game-btn game-btn-${i}" data-col="1"></button>
          <button class="game-btn game-btn-${i}" data-col="2"></button>
        </div>
      `;
    }

    this.rootElement.innerHTML = html;
    const buttons = document.querySelectorAll('.game-btn');
    buttons.forEach((divEl): void => {
      divEl.addEventListener('click', callback);
    });
  };
}
