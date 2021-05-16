import Helper from '../../../common/Helper';
import s from './input.scss';


export interface IValidate {
  required?:boolean
  pattern?:string
}

class Input {
  element: HTMLElement
  private input: HTMLInputElement

  constructor(labelText = 'name', type = 'text', validate?: IValidate) {
    
    this.element = Helper.createElement('div', s.inputContainer);

    const label = Helper.createElement('label', s.label);
    label.innerText = labelText;

    this.input = document.createElement('input');
    this.input.classList.add(s.input);
    this.input.type = type;

    if (validate) {
      if(validate.required) {
        this.input.required = true;
      }
      
      if(validate.pattern) {
        this.input.pattern = validate.pattern;
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