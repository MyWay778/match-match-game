import Helper from "../../common/helper";
import s from "./nav-menu.scss";

import aboutIcon from "../../../assets/icons/about.svg";
import scoreIcon from "../../../assets/icons/score.svg";
import settingIcon from "../../../assets/icons/settings.svg";

class NavMenu {
  element: HTMLElement;
  list: HTMLElement;
  currentActive: null | Element;

  constructor() {
    this.element = Helper.createElement('section', s.nav);
    this.list = Helper.createElement('ul', s.list);
    this.currentActive = null;

    const data = [
      {icon: aboutIcon, title: 'About Game', url: '#about'},
      {icon: scoreIcon, title: 'Best Score', url: '#score'},
      {icon: settingIcon, title: 'Game Settings', url: '#settings'},
    ]

    data.forEach(dataPart => {
      const item = Helper.createElement('li', s.item);
      item.innerHTML = `
      <a class="${s.link}" href="${dataPart.url}">
         <img class="${s.icon}" src="${dataPart.icon}" alt="${dataPart.title}">
        <span class="${s.title}">${dataPart.title}</span>
      </a>`

      this.list.append(item);
    })
    this.element.appendChild(this.list);
  }   

  makeActive(itemNumber: number) {
    const target = this.list.children[itemNumber];
    if (this.currentActive) {
      if (this.currentActive === target) {
        return;
      } else {
        this.currentActive.classList.remove(s.active); 
      }
    } 
    this.currentActive = target;
    target.classList.add(s.active);
  }
}

export default NavMenu;