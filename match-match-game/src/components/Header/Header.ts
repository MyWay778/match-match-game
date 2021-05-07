import logo from './components/Logo';
import { IComponent } from '../../typing/interfaces';
import ContentLeaf from '../common/ContentLeaf';
import { THeaderClasses } from '../../typing/types';

import s from './Header.scss';

class Header extends ContentLeaf {
  constructor(tag: string, classNames: THeaderClasses) {
    super(tag);

    super.addClass(classNames.header);
    super.createContainer(classNames.container);
  }
}

const header = new Header('header', {header: s.header, container: s.container});
header.addContent(logo.getElement());

export default header;
