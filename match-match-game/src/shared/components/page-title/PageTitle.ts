import BaseComponent from '../base-component/BaseComponent';
import style from './page-title.scss';

class PageTitle extends BaseComponent {
  constructor(titleText: string) {
    super('h2', style.h2) 
    this.element.textContent = titleText;
  }
}

export default PageTitle;