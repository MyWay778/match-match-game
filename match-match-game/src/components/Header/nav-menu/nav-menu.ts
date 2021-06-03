import Helper from '../../common/helper';
import './nav-menu.scss';

import aboutIcon from '../../../assets/icons/about.svg';
import scoreIcon from '../../../assets/icons/score.svg';
import settingIcon from '../../../assets/icons/settings.svg';

class NavMenu {
  element: HTMLElement;
  list: HTMLElement;
  currentActive: null | Element;

  constructor() {
    this.element = Helper.createElement('section', 'nav-menu');
    this.list = Helper.createElement('ul', 'nav-list');
    this.currentActive = null;

    const data = [
      { icon: aboutIcon, title: 'About Game', url: '#about' },
      { icon: scoreIcon, title: 'Best Score', url: '#score' },
      { icon: settingIcon, title: 'Game Settings', url: '#settings' },
    ];

    data.forEach((dataPart) => {
      const item = Helper.createElement('li', 'nav-list__item');
      item.innerHTML = `
      <a class="${'nav-list__link'}" href="${dataPart.url}">
         <img class="${'nav-list__icon'}" src="${dataPart.icon}" alt="${
        dataPart.title
      }">
        <span class="${'nav-list__title'}">${dataPart.title}</span>
      </a>`;

      this.list.append(item);
    });
    this.element.appendChild(this.list);
  }

  makeActive(itemNumber: number): void {
    const target = this.list.children[itemNumber];
    if (this.currentActive) {
      if (this.currentActive === target) {
        return;
      }
      this.currentActive.classList.remove('nav-list__item_active');
    }
    this.currentActive = target;
    target.classList.add('nav-list__item_active');
  }
}

export default NavMenu;
