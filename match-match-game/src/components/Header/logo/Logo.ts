import './logo.scss';

class Logo {
  public element: HTMLElement;

  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('logo');

    const link = document.createElement('a');
    link.href = '#';
    link.classList.add('logo__link');

    const firstLine = document.createElement('span');
    firstLine.classList.add('logo__first-line');
    firstLine.innerHTML = 'Match';

    const secondLine = document.createElement('span');
    secondLine.classList.add('logo__second-line');
    secondLine.innerHTML = 'Match';

    link.appendChild(firstLine);
    link.appendChild(secondLine);
    this.element.appendChild(link);
  }
}

export default Logo;
