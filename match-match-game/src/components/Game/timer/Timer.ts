import Helper from "../../common/Helper";
import s from './timer.scss';

class Timer {
  element: HTMLElement
  private secondsElement: HTMLElement
  private minutesElement: HTMLElement
  private seconds: number
  private minutes: number

  constructor() {
    this.element = Helper.createElement('section', s.timer);
    this.minutes = 0;
    this.seconds = 0;

    this.minutesElement = Helper.createTextElement('span', s.number, '00');
    this.secondsElement = Helper.createTextElement('span', s.number, '00');
  

    const colon = document.createTextNode(':');
    this.element.append(this.minutesElement, colon, this.secondsElement);

    this.tick = this.tick.bind(this);
  }

  start(): void {
    setInterval(this.tick, 1000);
  }

  private tick(): void {
    this.seconds += 1;
    if (this.seconds >= 60) {
      this.seconds = 0;
      this.minutes += 1;
    }
    this.passValue();
  }

  private passValue(): void {
    this.secondsElement.innerText = this.seconds < 10 ? `0${this.seconds}`: `${this.seconds}`;
    this.minutesElement.innerText = this.minutes < 10 ? `0${this.minutes}`: `${this.minutes}`;
  }
}

export default Timer;