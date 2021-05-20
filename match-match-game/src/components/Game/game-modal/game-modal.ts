import Button from "../../../shared/components/button-t1/button";
import Modal from "../../../shared/components/modal/modal";
import Helper from "../../common/helper";
import style from "./game-modal.scss";

class GameModal extends Modal {
  private readonly button: Button;

  constructor(time: number, mistakes: number, private readonly callback: () => void) {
    super(); 
    const message = Helper.createElement('p', style.message);
    message.textContent = `Congratulations! You successfully found all matches on ${time} seconds and made ${mistakes} mistakes.`;

    const buttonContainer = Helper.createElement('div', style.buttonContainer);
    this.button = new Button('Ok', this.close);
    buttonContainer.append(this.button.element);

    this.addContent(message, buttonContainer);
  }

  close = () => {
    super.hide()
    this.callback();
  }
}

export default GameModal;