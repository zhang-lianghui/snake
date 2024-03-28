export default class Panel {
  score = 0;
  level = 1;
  scoreEle: HTMLElement;
  levelEle: HTMLElement;
  bestScoreEle:HTMLElement;
  maxLevel: number = 10;
  bestScore:number= 0;
  constructor(maxLevel: number = 10) {
    this.scoreEle = document.getElementById("score")!;
    this.levelEle = document.getElementById("level")!;
    this.bestScore = +localStorage.getItem('bestScore')!
    this.bestScoreEle = document.getElementById("best-score")!;
    this.bestScoreEle.innerText = this.bestScore + '';
    this.maxLevel = maxLevel;
  }

  addScore() {
    this.scoreEle.innerHTML = ++this.score + "";
    if (this.bestScore < this.score) {
      this.bestScore = this.score
      localStorage.setItem('bestScore', this.bestScore + '');
      this.bestScoreEle.innerText = this.bestScore + ""
    }
  }

  levelUp() {
    if (this.score % 10 === 0 && this.level < this.maxLevel) {
      this.levelEle.innerText = ++this.level + "";
    }
  }

  restart = () => {
    this.score = 0
    this.level = 1
    this.scoreEle.innerText = this.score + ""
    this.levelEle.innerText = this.level + ""
  }

}
