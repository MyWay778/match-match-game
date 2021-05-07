import { IComponent } from './typing/interfaces';
import header from './components/Header/Header';

import './styles/global.scss';

class DomManager {
  static render(element: IComponent, rootElement: HTMLElement) {
    const htmlElement = element.render();
    console.log(htmlElement);
    rootElement.appendChild(htmlElement);
  }
}

const root = document.getElementById('root');

DomManager.render(header, root!);
