import BaseComponent from "../../shared/components/base-component/BaseComponent";
import Container from "../../shared/components/container/Container";
import PageTitle from "../../shared/components/page-title/PageTitle";
import Helper from "../common/Helper";
import ScoreItem from "./score-item/ScoreItem";
import style from './score.scss';

class Score extends BaseComponent{
  playerList: HTMLElement

  constructor(private readonly connector: any) {
    super('main', style.score);
    const container = new Container();

    const title = new PageTitle('Best players');
    title.setParent(container.element);
    title.render();

    this.playerList = Helper.createElement('ul', style.playerList);

    container.addContent(this.playerList);
    container.setParent(this.element);
    container.render();
  }

  getData() {
    this.connector.getData().then((data:any) => {
      console.log(data);
      data.forEach((userData:any) => {
        const item = new ScoreItem(userData.user.firstName, userData.user.email, userData.score);
        this.playerList.append(item.element);
      })
    });
  }
}

export default Score;