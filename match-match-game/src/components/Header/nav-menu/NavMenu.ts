import Helper from "../../common/Element";
import AboutIcon from "./about-icon/AboutIcon";
import s from "./nav-menu.scss";
import ScoreIcon from "./score-icon/ScoreIcon";
import SettingIcon from "./settings-icon/SettingsIcon";

class NavMenu {
    element: HTMLElement;
        
    constructor() {
        this.element = Helper.createElement('section', s.nav);
        
        const list = Helper.createElement('ul', s.list);


        const data = [
            {icon: new AboutIcon(), title: 'About Game', url: '#about'},
            {icon: new ScoreIcon(), title: 'Best Score', url: '#score'},
            {icon: new SettingIcon(), title: 'Game Settings', url: '#settings'},
        ]

        data.forEach(dataPart => {
            const item = Helper.createElement('li', s.item);

            const link = document.createElement('a');
            link.classList.add(s.link);
            link.href = dataPart.url;

            let icon = dataPart.icon.element;
            
            const title = Helper.createElement('span', s.title);
            title.innerText = dataPart.title;

            link.appendChild(icon);
            link.appendChild(title);
            item.appendChild(link);
            list.appendChild(item);
        })
        this.element.appendChild(list)
    }   
}

export default NavMenu;