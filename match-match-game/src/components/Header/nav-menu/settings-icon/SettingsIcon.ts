import s from './settings-icon.scss';
import icon from '../../../../assets/images/settings.svg';

class SettingIcon {
   element: HTMLImageElement;

    constructor() {
        this.element = document.createElement('img');
        this.element.classList.add(s.icon);
        this.element.src = icon;
    }
}
    

export default SettingIcon;