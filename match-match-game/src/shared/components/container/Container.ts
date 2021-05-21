import BaseComponent from '../base-component/base-component';
import './container.scss';

class Container extends BaseComponent {
  constructor() {
    super('div', 'container-component');
  }

  addContent(content: HTMLElement | HTMLElement[]): void {
    if (content instanceof Array) {
      this.element.append(...content);
    } else {
      this.element.append(content);
    }
  }
}

export default Container;
