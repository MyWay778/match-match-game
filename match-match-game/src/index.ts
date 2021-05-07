import header from './components/Header/Header';

class DomManager {
  static render(element: HTMLElement, rootElement: HTMLElement) {
    rootElement.appendChild(element);
  }
}

const root = document.getElementById('root');

if (root !== null) {
  DomManager.render(header.getElement(), root);
}
