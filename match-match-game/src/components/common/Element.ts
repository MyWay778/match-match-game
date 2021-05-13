class Helper {
    static createElement(tag: keyof HTMLElementTagNameMap, className: string) {
        const element = document.createElement(tag);
        element.classList.add(className);

        return element
    }
}

export default Helper;