import Snake from "./Snake";
import Food from "./Food";
import Panel from "./Panel";
import { oppositeDirection } from "./Snake";

const wasd : { [key: string]: string } = {
  w: "ArrowUp",
  s: "ArrowDown",
  a: "ArrowLeft",
  d: "ArrowRight",
};

export default class GameControl {
  snake: Snake;
  food: Food;
  panel: Panel;
  direction = "ArrowRight";
  isPaused = true;
  shouldRestart = false;

  constructor() {
    this.food = new Food();
    this.snake = new Snake(this.food);
    this.panel = new Panel();
  }

  start() {
    document.addEventListener("keydown", this.keydownHandler);
    document.getElementById("start")!.addEventListener('click', () => this.isPaused = false)
    document.getElementById("pause")!.addEventListener('click', () => this.isPaused = true)
    document.getElementById("restart")!.addEventListener('click', () => this.shouldRestart = true)
    setInterval(() => {
      if (!this.isPaused && this.snake.isLive) {
        this.snake.move(this.direction as keyof typeof oppositeDirection);
        this.checkEat();
      }
      if (this.shouldRestart) {
        this.restart()
      }
    }, Math.max(60, 200 - this.panel.level * 20));
  }

  keydownHandler = (event: KeyboardEvent) => {
    const key = event.key;

    if (key in oppositeDirection) {
      this.direction = key;
      this.isPaused = false
    } else if (key in wasd) {
      this.direction = wasd[key] as keyof typeof oppositeDirection
      this.isPaused = false
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
  }
}
