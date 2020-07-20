import { Menu } from './Menu';
import { Game } from './Game';
import { CasualBoard } from './CasualBoard';
import { Score } from './Score';

const app = document.getElementById('root')!;

const game = new Game(new CasualBoard(app), new Score(app));
const menu = new Menu(app, game);
menu.show();
