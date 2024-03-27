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

  constructor() {
    this.food = new Food();
    this.snake = new Snake(this.food);
    this.panel = new Panel();
  }

  init() {
    document.addEventListener("keydown", this.keydownHandler);
    setInterval(() => {
      if (!this.isPaused) {
        this.snake.isLive &&
          this.snake.move(this.direction as keyof typeof oppositeDirection);
        this.checkEat();
      }
    }, Math.max(100, 200 - this.panel.level * 20));
  }

  keydownHandler = (event: KeyboardEvent) => {
    const key = event.key;

    if (key in oppositeDirection) {
      !this.isPaused && (this.direction = key);
    } else if (key in wasd) {
      !this.isPaused && (this.direction = wasd[key] as keyof typeof oppositeDirection);
    } else if (key === " ") {
      this.isPaused = false;
    } else if (key.toLowerCase() === "p") {
      this.isPaused = true;
    }
  };
  checkEat = () => {
    if (this.snake.x === this.food.x && this.snake.y === this.food.y) {
      this.panel.addScore();
      this.panel.levelUp();
      this.food.update();
    }
  };
}
