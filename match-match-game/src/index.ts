import './styles/global.scss';
import Header from './components/header/Header';
import Game from './components/game/Game';
import About from './components/about/About';
import Registration from './components/registration/Registration';
import App from './App';


const {body} = document;
const app = new App(body);
app.launch();

// // const app = new App();
// const header = new Header();
// const game = new Game();
// const about = new About();
// const registration = new Registration();


// body.appendChild(header.element);
// body.appendChild(game.element);

// game.element.after(registration.element);

