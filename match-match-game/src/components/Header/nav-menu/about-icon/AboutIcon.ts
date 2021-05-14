import Helper from "../../../common/Helper";
import s from "./about-icon.scss";

class AboutIcon {
  element: HTMLElement;

  constructor() {
    this.element = Helper.createElement('span', s.icon);
    this.element.innerText = '?'; 
  }
}

export default AboutIcon;