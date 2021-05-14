abstract class Helper {
  static createElement(tag: keyof HTMLElementTagNameMap, className: string = '') {
    const element = document.createElement(tag);
    if (className) {
      element.classList.add(className);
    }
    return element;
  }

  static createTextElement(tag: keyof HTMLElementTagNameMap, className: string, text: string) {
    const element = this.createElement(tag, className);
    element.innerText = text;
    return element;
  }
}

export default Helper;