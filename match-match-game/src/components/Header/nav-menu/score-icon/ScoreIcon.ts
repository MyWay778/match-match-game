import s from "./score-icon.scss";
import icon from "../../../../assets/images/score.svg";

class ScoreIcon {
    element: HTMLImageElement;

    constructor() {
        this.element = document.createElement('img');
        this.element.classList.add(s.icon);
        this.element.src = icon;
    }
}

export default ScoreIcon;