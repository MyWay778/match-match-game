import ConnectorComponent from '../../shared/components/base-component/connector-component';
import Container from '../../shared/components/container/container';
import PageTitle from '../../shared/components/page-title/page-title';
import IScore from '../../typing/interfaces/components/score';
import IScoreConnector from '../../typing/interfaces/connectors/score-connector';
import IScoreData from '../../typing/interfaces/score-data';
import Helper from '../common/helper';
import ScoreItem from './score-item/score-item';
import './score.scss';

class Score extends ConnectorComponent<IScoreConnector> implements IScore {
  private readonly playerList: HTMLElement;
  connector: null | IScoreConnector = null;
  private readonly placeholder: HTMLElement;

  constructor(parent: HTMLElement) {
    super('main', 'score', parent);
    const container = new Container();

    const title = new PageTitle('Best players');
    title.setParent(container.element);
    title.render();

    this.playerList = Helper.createElement('ul', 'score__player-list');
    this.placeholder = Helper.createElement('p', 'score__placeholder');

    container.addContent(this.playerList);
    container.setParent(this.element);
    container.render();
  }

  connect = (connector: IScoreConnector): void => {
    this.connector = connector;
    this.connector.connect(this);
  };

  setData(data: IScoreData[]): void {
    if (!data.length) {
      this.playerList.replaceWith(
        Helper.createTextElement(
          'p',
          'score__placeholder',
          'There are no best score yet, please register and start the game.'
        )
      );
      return;
    }
    
    data.forEach((userData: IScoreData) => {
      const item = new ScoreItem(
        userData.name,
        userData.email,
        userData.score,
        userData.image
      );
      this.playerList.append(item.element);
    });
  }
}

export default Score;
