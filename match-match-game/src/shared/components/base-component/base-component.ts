class BaseComponent {
  element: HTMLElement;
  private parent: HTMLElement | null;

  constructor(tagName: keyof HTMLElementTagNameMap, className: string, parent?: HTMLElement) {
    this.element = document.createElement(tagName);
    this.element.classList.add(className);
    this.parent =  parent || null;
  }

  setParent(parent: HTMLElement) {
    if (parent) {
      this.parent = parent;
    }
  }
  
  checkParent() {
    return !!this.parent;
  }

  render() {
    if (this.parent) {
      this.parent.appendChild(this.element);
    }
  }
}

export default BaseComponent;
