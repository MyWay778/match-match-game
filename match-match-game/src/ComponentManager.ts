import About from "./components/about/About";
import Header from "./components/header/Header";

class ComponentManager {
  header:Header;
  about:About;
  renderList:any;

  constructor(private root:HTMLElement) {
    this.header = new Header();
    this.about = new About();

    this.renderList = [this.header.element, this.about.element];
  }

  render() {
    this.root.append(...this.renderList);
  }

}

export default ComponentManager;