import logo from './components/Logo';
import s from './style.scss';
import { IComponent } from '../../typing/interfaces';

class Header {
  className: string;

  header: HTMLElement;

  constructor(className = 'header') {
    this.className = className;
    this.header = document.createElement('header');
    this.header.classList.add(this.className);
  }

  addContent(content: IComponent, containerClassName = 'container') {
    const contentElement = content.render();
    const headerContainer = document.createElement('div');
    headerContainer.classList.add(containerClassName);
    this.header.appendChild(headerContainer);
    headerContainer.appendChild(contentElement);
  }

  render() {
    return this.header;
  }
}
const header = new Header(s.header);
header.addContent(logo);

export default header;
