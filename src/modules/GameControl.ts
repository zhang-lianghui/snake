import Snake from "./Snake";
import Food from "./Food";
import Panel from "./Panel";

export default class GameControl {
  snake: Snake;
  food: Food;
  panel: Panel;
  direction: string = "";

  constructor() {
    this.food = new Food();    
    this.snake = new Snake(this.food);
    this.panel = new Panel();
  }

//   if (this.checkEat()) {
//     console.log('eated');
//   }

  init() {
    document.addEventListener("keydown", this.keydownHandler);
    setInterval(() => {
      this.snake.isLive && this.snake.move(this.direction);
      this.checkEat()
      
    }, Math.max(50, 500 - this.panel.level * 50));
  }

  keydownHandler = (event: KeyboardEvent) => {
    this.direction = event.key;
  };

  checkEat = () => {
    if (this.snake.x === this.food.x && this.snake.y === this.food.y) {
        this.panel.addScore()
        this.panel.levelUp()
        this.food.update()
    }
  }
}
