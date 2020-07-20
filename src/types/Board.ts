export interface Board {
  generateBoard(callback: (event: Event) => void): void;
  clearBoard(): void;
  gameBoard: string[][];
}
