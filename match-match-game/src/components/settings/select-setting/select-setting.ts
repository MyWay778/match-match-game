import BaseComponent from '../../../shared/components/base-component/base-component';
import './select-setting.scss';

class SelectSetting extends BaseComponent {
  titleElement: HTMLLabelElement;
  selectorElement: HTMLSelectElement;

  constructor(title: string,  id: string) {
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


}

export default SelectSetting;
