import Snake from "./Snake";
import Food from "./Food";
import Panel from "./Panel";
import Arrows from './Arrows'

const wasd : { [key: string]: string } = {
  w: "up",
  s: "down",
  a: "left",
  d: "right",
};

const arrowKey : { [key: string]: string } = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
};


export default class GameControl {
  snake: Snake;
  food: Food;
  panel: Panel;
  arrows: Arrows;
  direction = "right";
  isPaused = true;
  shouldRestart = false;

  constructor() {
    this.food = new Food();
    this.snake = new Snake(this.food);
    this.panel = new Panel();
    this.arrows = new Arrows(this.setDirection)
  }

  start() {
    document.addEventListener("keydown", this.keydownHandler);
    document.getElementById("start")!.addEventListener('click', () => this.isPaused = false)
    document.getElementById("pause")!.addEventListener('click', () => this.isPaused = true)
    document.getElementById("restart")!.addEventListener('click', () => this.shouldRestart = true)
    setInterval(() => {
      if (!this.isPaused && this.snake.isLive) {
        this.snake.move(this.direction);
        this.checkEat();
      }
      if (this.shouldRestart) {
        this.restart()
      }
    }, Math.max(60, 200 - this.panel.level * 20));
  }

  keydownHandler = (event: KeyboardEvent) => {
    const key = event.key;

    if (key in arrowKey) {
      this.setDirection(arrowKey[key]);
    } else if (key in wasd) {
      this.setDirection(wasd[key])
    } else if (key.toLowerCase() === "p") {
      this.isPaused = true;
    } else if (key.toLowerCase() === 'r') {
      this.shouldRestart = true
    }
  };
  checkEat = () => {
    if (this.snake.x === this.food.x && this.snake.y === this.food.y) {
      this.panel.addScore();
      this.panel.levelUp();
      this.food.update();
    }
  };
  restart = () => {
    this.food.update()
    this.panel.restart()
    this.snake.restart()
    this.isPaused = true
    this.shouldRestart = false
    this.arrows.setColor('')
  }
  setDirection = (key:string) =>{
    this.direction = key
    this.isPaused = false
    this.arrows.setColor(key)
  }
}
