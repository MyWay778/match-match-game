interface IBaseComponent {
  element: HTMLElement;
  setParent: (parent: HTMLElement) => void;
  checkParent: () => void;
  render: () => void;
}

export default IBaseComponent;