import './styles/global.scss';
import header from './components/Header/Header';
import App from './App';
import CardField from './components/Game/CardField/CardField';

import image0 from './assets/images/animal/0.jpg'
import image1 from './assets/images/animal/1.jpg'
import image2 from './assets/images/animal/2.jpg'
import image3 from './assets/images/animal/3.jpg'
import image4 from './assets/images/animal/4.jpg'
import image5 from './assets/images/animal/5.jpg'

const app = new App('#app');

app.render(header.getElement());


// const imagesPath = './assets/images/';
// const imagesTheme = 'animal';

const images = [image0, image1, image2, image3, image4, image5];


const cardField = new CardField(images);

console.log(cardField.getElement());

const main = document.createElement('main');
main.appendChild(cardField.getElement());

app.render(main);
