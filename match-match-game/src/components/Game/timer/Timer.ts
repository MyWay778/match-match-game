import Helper from "../../common/Helper";
import s from './timer.scss';

class Timer {
  element:HTMLElement
  private secondsElement:HTMLElement
  private minutesElement:HTMLElement
  private seconds:number
  private minutes:number

  private interval:number
  private callback: null | ( () => void )

  constructor(countdown: number = 30) {
    this.element = Helper.createElement('section', s.timer);
    this.interval = 0;
    this.callback = null;
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

  countdown(seconds:number = 30, callback?: ()=> void) {
    this.seconds = seconds;

    if (callback) {
      this.callback = callback;
    }

    this.interval = window.setInterval(this.reverseTick, 1000);
  }

  private stopInterval() {
    window.clearInterval(this.interval);
    if (this.callback) {
      this.callback();
    }
  }

  private reverseTick = () => {
    if (this.seconds === 0) {
      this.stopInterval();
    }else {
      this.seconds -= 1;
    }
    this.passValue();
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