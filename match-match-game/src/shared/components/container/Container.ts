import { container } from 'webpack';
import BaseComponent from '../base-component/base-component';
import style from './container.scss';

class Container extends BaseComponent {
  constructor() {
    super('div', style.container);
  }
  addContent(content: HTMLElement | HTMLElement[]) {
    if (content instanceof Array) {
      this.element.append(...content);

    } else {
      this.element.append(content);
    }
  }
}

export default Container;