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
  private readonly errorLabel: HTMLLabelElement;
  private readonly validMarker: HTMLElement;

  constructor(labelText = 'name', type = 'text', validate?: IValidate) {
    this.element = Helper.createElement('div', 'register-input__container');

    const label = Helper.createElement('label', 'register-input__label');
    label.innerText = labelText;

    this.input = document.createElement('input');
    this.input.classList.add('register-input');
    this.input.type = type;

    this.errorLabel = document.createElement('label');
    this.errorLabel.classList.add('register-input__errorLabel');

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

    this.validMarker = Helper.createElement(
      'figure',
      'register-input__valid-marker'
    );

    this.element.append(label, this.input, this.validMarker, this.errorLabel);
  }

  getValue(): string {
    return this.input.value;
  }

  invalid(errorMessage?: string): void {
    this.validMarker.classList.add('register-input__valid-marker_invalid');
    this.errorLabel.textContent = errorMessage || 'Incorrect input';
  }

  valid(): void {
    this.validMarker.classList.remove('register-input__valid-marker_invalid');
    this.validMarker.classList.add('register-input__valid-marker_valid');
    this.errorLabel.textContent = '';
  }

  onblur = (callback: (value: string) => void): void => {
    this.input.onblur = () => {
      callback(this.input.value);
    };
  };

  oninput = (callback: (value: string) => void): void => {
    this.input.oninput = () => {
      callback(this.input.value);
    };
  };

  setValue = (value: string): void => {
    this.input.value = value;
  };

  checkValid = (): boolean => this.validMarker.classList.contains('register-input__valid-marker_valid');
}

export default Input;
