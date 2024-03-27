export default class Panel {
  score = 0;
  level = 1;
  scoreEle: HTMLElement;
  levelEle: HTMLElement;
  maxLevel: number = 10;
  constructor(maxLevel: number = 10) {
    this.scoreEle = document.getElementById("score")!;
    this.levelEle = document.getElementById("level")!;
    this.maxLevel = maxLevel;
  }

  addScore() {
    this.scoreEle.innerHTML = ++this.score + "";
  }

  levelUp() {
    if (this.score % 10 === 0 && this.level < this.maxLevel) {
      this.levelEle.innerHTML = ++this.level + "";
    }
  }
}
