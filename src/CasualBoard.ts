export class CasualBoard {
  private rootElement: Element;
  board: string[][] = [];

  constructor(private parentElement: Element) {
    this.rootElement = document.createElement('div');
  }

  generateBoard = (callback: (event: Event) => void): void => {
    this.rootElement.classList.add('board');
    this.parentElement.appendChild(this.rootElement);

    let html = '';

    for (let i = 0; i < 9; i++) {
      html += `<button class="game-btn game-btn-${i}" data-id="${i}"></button>`;
    }

    this.rootElement.innerHTML = html;
    const buttons = document.querySelectorAll('.game-btn');
    buttons.forEach((divEl): void => {
      divEl.addEventListener('click', callback);
    });
  };
}
