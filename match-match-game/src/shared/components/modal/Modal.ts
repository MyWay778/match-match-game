import Helper from '../../../components/common/helper';
import BaseComponent from '../base-component/base-component';
import './modal.scss';

class Modal extends BaseComponent {
  modal: HTMLElement;
  constructor() {
    super('aside', 'modal-component');

    const background = Helper.createElement(
      'div',
      'modal-component__background'
    );
    this.modal = Helper.createElement('section', 'modal-component__modal');
    this.element.append(background, this.modal);
  }

  addContent(message: HTMLElement, button: HTMLElement): void {
    this.modal.append(message, button);
  }

  show(): void {
    this.element.classList.add('modal-component__modal_visible');
  }

  hide(): void {
    this.element.classList.remove('modal-component__modal_visible');
  }
}

export default Modal;
