import Helper from "../../common/Element";
import s from './user-panel.scss'

class UserPanel {
  element: HTMLElement;

  private registerLink: HTMLAnchorElement;

  isRegistration: boolean;

  constructor(){
    this.element = Helper.createElement('section', s.user_panel);
    this.isRegistration = true;

    this.registerLink = document.createElement('a');
    this.registerLink.innerText = "Register new player";
    this.registerLink.classList.add(s.register_link);
    this.registerLink.href="#registration";

    this.element.appendChild(this.registerLink);
  }
}

export default UserPanel;