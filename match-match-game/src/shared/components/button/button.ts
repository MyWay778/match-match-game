import BaseComponent from "../base-component/base-component";
import './button.scss';

class Button extends BaseComponent {
  constructor(title: string, callback: (e: MouseEvent) => void) {
    super('button', "button-component");
    this.element.textContent = title;
    this.element.addEventListener('click', callback);
  }
}

export default Button;