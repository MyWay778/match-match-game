class GeneralComponent {
  element: HTMLElement;

  constructor(tag: keyof HTMLElementTagNameMap) {
    this.element = document.createElement(tag);
  }

  addClassName(className: string) {
    this.element.classList.add(className);
  }

  getElement() {
    return this.element;
  }
}

export default GeneralComponent;