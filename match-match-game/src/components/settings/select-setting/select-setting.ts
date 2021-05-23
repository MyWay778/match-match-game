import { TSettings } from '../../../typing/types';
import BaseComponent from '../../../shared/components/base-component/base-component';
import './select-setting.scss';

class SelectSetting extends BaseComponent {
  titleElement: HTMLLabelElement;
  selectorElement: HTMLSelectElement;

  constructor(title: string, id: string) {
    super('div', 'game-setting-selector');

    this.titleElement = document.createElement('label');
    this.titleElement.classList.add('game-setting-selector__title');
    this.titleElement.textContent = title;
    this.titleElement.htmlFor = id;

    this.selectorElement = document.createElement('select');
    this.selectorElement.classList.add('game-setting-selector__selector');
    this.selectorElement.id = id;

    this.element.append(this.titleElement, this.selectorElement);
  }

  addItem(title: string, value: string): void {
    const optionElement = document.createElement('option');
    optionElement.classList.add('game-setting-selector__option');
    optionElement.textContent = title;
    optionElement.value = value;
    this.selectorElement.append(optionElement);
  }

  getValue<T extends TSettings>(callback: (value: T) => void): void {
    this.selectorElement.oninput = () => {
      const { value } = this.selectorElement;
      callback(value as T);
    };
  }

  select(value: string): void {
    const optionElements = this.selectorElement.children;
    for (let i = 0; i < optionElements.length; i++) {
      const element = optionElements[i] as HTMLOptionElement;
      if (element.value === value) {
        element.selected = true;
      }
    }
  }
}

export default SelectSetting;
