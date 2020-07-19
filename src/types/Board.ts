export interface Board {
  generateBoard(callback: (event: Event) => void): void;
  gameBoard: string[][];
}
