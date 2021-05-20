import BaseComponent from '../../shared/components/base-component/base-component';
import ConnectorComponent from '../../shared/components/base-component/connector-component';
import Container from '../../shared/components/container/container';
import PageTitle from '../../shared/components/page-title/page-title';
import { IScoreConnector } from '../../typing/interfaces';
import Helper from '../common/helper';
import ScoreItem from './score-item/score-item';
import style from './score.scss';

class Score extends ConnectorComponent {
  playerList: HTMLElement;
  connector: null | IScoreConnector = null;
  placeholder: HTMLElement;

  constructor(parent: HTMLElement) {
    super('main', style.score, parent);
    const container = new Container();

    const title = new PageTitle('Best players');
    title.setParent(container.element);
    title.render();

    this.playerList = Helper.createElement('ul', style.playerList);
    this.placeholder = Helper.createElement('p', style.placeholder);

    container.addContent(this.playerList);
    container.setParent(this.element);
    container.render();
  }

  connect = (connector: IScoreConnector) => {
    this.connector = connector;
    this.connector.connect(this);
  };

  setData(data: any) {
    console.log(data);
    if (!data.length) {
      this.playerList.replaceWith(
        Helper.createTextElement(
          'p',
          style.placeholder,
          'There are no best score yet, please register and start the game.'
        )
      );
      return;
    }

    data.forEach((userData: any) => {
      const item = new ScoreItem(
        userData.user?.firstName + ' ' + userData.user?.lastName,
        userData.user?.email,
        userData?.score
      );
      this.playerList.append(item.element);
    });
  }
}

export default Score;
