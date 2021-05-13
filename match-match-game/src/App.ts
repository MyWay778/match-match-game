class App {
  private element: HTMLElement;

  constructor() {
    this.element = document.createElement('div');
    this.element.innerHTML= "hello";
  }

  render() {
    return this.element;
  }
}

export default App;
