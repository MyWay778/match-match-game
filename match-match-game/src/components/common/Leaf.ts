import { ILeaf } from '../../typing/interfaces';

class Leaf implements ILeaf {
  element: HTMLElement;

  constructor(tag: string = 'div') {
    this.element = document.createElement(tag);
  }

  addClass(className: string) {
    this.element.classList.add(className);
  }

  removeClass(className: string) {
    this.element.classList.remove(className);
  }

  addChild(element: HTMLElement | Node) {
    this.element.appendChild(element);
  }

  getElement() {
    return this.element;
  }
}

export default Leaf;
