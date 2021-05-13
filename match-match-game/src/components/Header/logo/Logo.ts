import s from './Logo.scss';

class Logo {
  public element: HTMLElement
  
  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add(s.logo);

    const link = document.createElement('a');
    link.href = "#";
    link.classList.add(s.link)

    const firstLine = document.createElement('span');
    firstLine.classList.add(s.firstLine);
    firstLine.innerHTML = "Match";

    const secondLine =  document.createElement('span');
    secondLine.classList.add(s.secondLine);
    secondLine.innerHTML = "Match";

    link.appendChild(firstLine);
    link.appendChild(secondLine);
    this.element.appendChild(link);
  }
}


export default Logo;
