import BaseComponent from '../base-component/base-component';
import './page-title.scss';

class PageTitle extends BaseComponent {
  constructor(titleText: string) {
    super('h2', 'page-title-component');
    this.element.textContent = titleText;
  }
}

export default PageTitle;
