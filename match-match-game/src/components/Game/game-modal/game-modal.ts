import Button from '../../../shared/components/button/button';
import Modal from '../../../shared/components/modal/modal';
import Helper from '../../common/helper';
import './game-modal.scss';

class GameModal extends Modal {
  private readonly button: Button;

  constructor(
    time: number,
    mistakes: number,
    private readonly callback: () => void
  ) {
    super();
    const message = Helper.createElement('p', 'modal-game__message');
    // eslint-disable-next-line max-len
    message.textContent = `Congratulations! You successfully found all matches on ${time} seconds and made ${mistakes} mistakes.`;

    const buttonContainer = Helper.createElement(
      'div',
      'modal-game__button-container'
    );
    this.button = new Button('Ok', this.close);
    buttonContainer.append(this.button.element);

    this.addContent(message, buttonContainer);
  }

  close = (): void => {
    super.hide();
    this.callback();
  };
}

export default GameModal;
