import { Menu } from './Menu';
import { Game } from './Game';
import { CasualBoard } from './CasualBoard';

const app = document.getElementById('root')!;

const game = new Game(app, new CasualBoard(app));
const menu = new Menu(app, game);
menu.show();
