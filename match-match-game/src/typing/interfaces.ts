export interface IComponent {
  render: () => HTMLElement;
}

export interface ILeaf {
  element: HTMLElement;

  addClass(className: string): void;
  removeClass(className: string): void;
  getElement(): HTMLElement;
  addChild(element: HTMLElement | Node): void;
}

export interface IContentLeaf extends ILeaf {
  createContainer(className: string): void;
  addContent(content: HTMLElement):void
}