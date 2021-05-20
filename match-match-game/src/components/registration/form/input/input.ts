import Helper from '../../../common/helper';
import s from './input.scss';

export interface IValidate {
  required?: boolean;
  pattern?: string;
  maxLength?: number;
}

class Input {
  element: HTMLElement;
  private input: HTMLInputElement;

  constructor(labelText = 'name', type = 'text', validate?: IValidate) {
    this.element = Helper.createElement('div', s.inputContainer);

    const label = Helper.createElement('label', s.label);
    label.innerText = labelText;

    this.input = document.createElement('input');
    this.input.classList.add(s.input);
    this.input.type = type;

    if (validate) {
      if (validate.required) {
        this.input.required = true;
      }

      if (validate.pattern) {
        this.input.pattern = validate.pattern;
      }
      if (validate.maxLength){
        this.input.maxLength = validate.maxLength;
      } 
    }

    const validMarker = Helper.createElement('figure', s.validMarker);

    this.element.append(label, this.input, validMarker);
  }

  getValue(): string {
    return this.input.value;
  }
}

export default Input;
