import BaseComponent from '../base-component/base-component';
import style from './page-title.scss';

class PageTitle extends BaseComponent {
  constructor(titleText: string) {
    super('h2', style.h2) 
    this.element.textContent = titleText;
  }
}

export default PageTitle;