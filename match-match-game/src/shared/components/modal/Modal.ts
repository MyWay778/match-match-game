import Helper from "../../../components/common/Helper";
import BaseComponent from "../base-component/BaseComponent";
import style from './modal.scss';

class Modal extends BaseComponent {
  modal: HTMLElement;
  constructor () {
    super('aside', style.modalComponent);

    const background = Helper.createElement('div', style.background);
    this.modal = Helper.createElement('section', style.modal);
    this.element.append(background, this.modal);
  }

  addContent(message: HTMLElement, button: HTMLElement) {
    this.modal.append(message, button);
  }

  show() {
    this.element.classList.add(style.visible);
  }

  hide() {
    this.element.classList.remove(style.visible);
  }
}

export default Modal;

