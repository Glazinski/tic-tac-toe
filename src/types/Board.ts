export interface Board {
  rootElement: HTMLElement;
  generateBoard(callback: (event: Event) => void): void;
  clearBoard(): void;
  gameBoard: string[][];
}
