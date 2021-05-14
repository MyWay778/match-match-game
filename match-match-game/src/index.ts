import './styles/global.scss';
// import App from './App';
import Header from './components/header/Header';
import Game from './components/game/Game';



// const app = new App();
const header = new Header();
const game = new Game();

const {body} = document;
body.appendChild(header.element);
body.appendChild(game.element);


