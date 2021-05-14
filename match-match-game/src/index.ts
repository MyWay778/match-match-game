import './styles/global.scss';
// import App from './App';
import Header from './components/header/Header';
import Game from './components/game/Game';
import About from './components/about/About';



// const app = new App();
const header = new Header();
const game = new Game();
const about = new About();

const {body} = document;
body.appendChild(header.element);
body.appendChild(game.element);


