import IBaseComponent from '../../../typing/interfaces/components/base-component';

class BaseComponent implements IBaseComponent {
  element: HTMLElement;
  private parent: HTMLElement | null;

  constructor(
    tagName: keyof HTMLElementTagNameMap,
    className: string,
    parent?: HTMLElement
  ) {
    this.element = document.createElement(tagName);
    this.element.classList.add(className);
    this.parent = parent || null;
  }

  setParent(parent: HTMLElement): void {
    if (parent) {
      this.parent = parent;
    }
  }

  checkParent(): boolean {
    return !!this.parent;
  }

  render(): void {
    if (this.parent) {
      this.parent.appendChild(this.element);
    }
  }
}

export default BaseComponent;
