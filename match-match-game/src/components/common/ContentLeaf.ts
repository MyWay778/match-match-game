import { IContentLeaf } from "../../typing/interfaces";
import Leaf from "./Leaf";

class ContentLeaf extends Leaf implements IContentLeaf {
    container: null | HTMLElement;

    constructor(tag: string) {
        super(tag);
        this.container = null;
    }

    createContainer(className: string = 'container') {
        const container = document.createElement('div');
        container.classList.add(className);
        this.container = container;
        this.element.appendChild(container);
    }

    addContent(content: HTMLElement) {
        this.container?.appendChild(content);
    }
}

export default ContentLeaf;