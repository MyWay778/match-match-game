import './styles/global.scss';
import header from './components/Header/Header';
import App from './App';

const app = new App('#app');

app.render(header.getElement());

