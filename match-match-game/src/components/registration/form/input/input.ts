import Helper from '../../../common/Helper';
import s from './input.scss';

class Input {
  element: HTMLElement
  private input: HTMLInputElement

  constructor(labelText: string = 'name', type: string = 'text') {
    
    this.element = Helper.createElement('div', s.inputContainer);

    const label = Helper.createElement('label', s.label);
    label.innerText = labelText;

    this.input = document.createElement('input');
    this.input.classList.add(s.input);
    this.input.type = type;

    const validMarker = Helper.createElement('figure', s.validMarker);
    
    this.element.append(label, this.input, validMarker);
  }
}

export default Input;