import { Board } from './types';
import { DOMHelpers } from './DOMHelpers';
import gsap from 'gsap';

export class CasualBoard extends DOMHelpers implements Board {
  rootElement: HTMLElement;
  gameBoard: string[][];

  constructor(public parentElement: HTMLElement) {
    super();
    this.rootElement = this.createElement('div', 'board');
    this.gameBoard = this.generateEmptyBoard();
  }

  generateEmptyBoard = (): string[][] => [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  generateBoard = (callback: (event: Event) => void): void => {
    this.parentElement.appendChild(this.rootElement);

    let html = '';

    for (let i = 0; i < 3; i++) {
      html += `
        <div class="row row--${i + 1}" data-row="${i}">
          <button class="game-btn game-btn--1" data-col="0"></button>
          <button class="game-btn game-btn--2" data-col="1"></button>
          <button class="game-btn game-btn--3" data-col="2"></button>
        </div>
      `;
    }

    this.rootElement.innerHTML = html;
    gsap.fromTo(this.rootElement, 0.3, { scale: 0.2 }, { scale: 1 });
    const buttons = document.querySelectorAll('.game-btn');
    buttons.forEach((divEl): void => {
      divEl.addEventListener('click', callback);
    });
  };

  clearBoard = (): void => {
    this.gameBoard = this.generateEmptyBoard();
    this.removeNodesContent('.game-btn', 'unclickable');
  };
}
