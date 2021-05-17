class BaseComponent {
  element: HTMLElement;
  private parent: HTMLElement | null;

  constructor(tagName: keyof HTMLElementTagNameMap, className: string) {
    this.element = document.createElement(tagName);
    this.element.classList.add(className);
    this.parent =  null;
  }

  setParent(parent: HTMLElement) {
    if (parent) {
      this.parent = parent;
    }
  }

  render() {
    if (this.parent) {
      this.parent.appendChild(this.element);
    }
  }
}

export default BaseComponent;
