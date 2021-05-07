import { TLogoClasses } from "../../../typing/types";
import Leaf from "../../common/Leaf";

import s from './Logo.scss';

class Logo extends Leaf {
  constructor(tag: string, className: string) {
    super(tag);
    super.addClass(className);
  }

  addTitle(title: string, classNames: TLogoClasses) {
    const firstLine = new Leaf('span');
    firstLine.addClass(classNames.firstLine);

    const secondLine = new Leaf('span');
    secondLine.addClass(classNames.secondLine);

    const text = document.createTextNode(title);

    firstLine.addChild(text.cloneNode());
    secondLine.addChild(text.cloneNode())

    this.addChild(firstLine.getElement());
    this.addChild(secondLine.getElement());
  }
}

const logo = new Logo('div', s.logo);
logo.addTitle('Match', {firstLine: s.firstLine, secondLine: s.secondLine});

export default logo;
