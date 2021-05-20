import BaseComponent from "../base-component/base-component";
import style from './button.scss';

class Button extends BaseComponent {
  constructor(title: string, callback: (e: MouseEvent) => void) {
    super('button', style.button);
    this.element.textContent = title;
    this.element.addEventListener('click', callback);
  }
}

export default Button;