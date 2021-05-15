import './styles/global.scss';
// import App from './App';
import Header from './components/header/Header';
import Game from './components/game/Game';
import About from './components/about/About';
import Registration from './components/registration/Registration';



// const app = new App();
const header = new Header();
const game = new Game();
const about = new About();
const registration = new Registration();

const {body} = document;
body.appendChild(header.element);
body.appendChild(game.element);

// game.element.after(registration.element);

