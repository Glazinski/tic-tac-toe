import { Menu } from './Menu';
import { Game } from './Game';
import { CasualBoard } from './CasualBoard';
import { Score } from './Score';
import { Animations } from './Animations';

const app = <HTMLElement>document.getElementById('root');

const game = new Game(
  new Menu(app),
  new CasualBoard(app),
  new Score(app),
  new Animations()
);

game.showStartMenu();
