class Logo {
  title: string;

  constructor() {
    this.title = 'Match';
  }

  render() {
    const element = document.createElement('div');
    element.classList.add('logo');

    const text = document.createTextNode(this.title);

    const firstLine = document.createElement('span');
    firstLine.classList.add('logo__firstLine');
    firstLine.appendChild(text.cloneNode());

    const secondLine = document.createElement('span');
    secondLine.classList.add('logo__secondLine');
    secondLine.appendChild(text.cloneNode());

    element.appendChild(firstLine);
    element.appendChild(secondLine);

    return element;
  }
}

const logo = new Logo();

export default logo;
