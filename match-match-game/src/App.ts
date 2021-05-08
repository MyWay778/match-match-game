class App {
    appRoot: Element;

    constructor(appRootSelector: string) {
        const appRoot = document.querySelector(appRootSelector);
        if (!appRoot) {
            throw "app root is not found";
        }
        this.appRoot = appRoot;
    }

    render(component: Element) {
        this.appRoot.appendChild(component);
    }
}

export default App;
