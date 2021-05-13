import './styles/global.scss';
// import App from './App';
import Header from './components/header/Header';



// const app = new App();
const header = new Header();

const {body} = document;
body.appendChild(header.element);


