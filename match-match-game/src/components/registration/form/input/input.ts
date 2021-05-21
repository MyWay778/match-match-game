import Helper from '../../../common/helper';
import './input.scss';

export interface IValidate {
  required?: boolean;
  pattern?: string;
  maxLength?: number;
}

class Input {
  element: HTMLElement;
  private input: HTMLInputElement;

  constructor(labelText = 'name', type = 'text', validate?: IValidate) {
    this.element = Helper.createElement('div', "register-input__container");

    const label = Helper.createElement('label', "register-input__label");
    label.innerText = labelText;

    this.input = document.createElement('input');
    this.input.classList.add("register-input");
    this.input.type = type;

    if (validate) {
      if (validate.required) {
        this.input.required = true;
      }

      if (validate.pattern) {
        this.input.pattern = validate.pattern;
      }
      if (validate.maxLength) {
        this.input.maxLength = validate.maxLength;
      }
    }

    const validMarker = Helper.createElement('figure', 'register-input__valid-marker');

    this.element.append(label, this.input, validMarker);
  }

  getValue(): string {
    return this.input.value;
  }
}

export default Input;
