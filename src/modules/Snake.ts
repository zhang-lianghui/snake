import Food from "./Food";

export default class Snake {
  head: HTMLElement;
  bodies: HTMLCollection;
  length: number;
  snake: HTMLElement;
  food: Food;
  isLive = true;
  constructor(food: Food) {
    this.snake = document.getElementById("snake")!;
    this.head = document.querySelector("#snake > div") as HTMLElement;
    this.bodies = this.snake.getElementsByTagName("div");
    this.length = this.bodies.length;
    this.food = food;
  }

  public get x(): number {
    return this.head.offsetLeft;
  }
  public get y(): number {
    return this.head.offsetTop;
  }

  public set x(value: number) {
    this.head.style.left = value + "px";
    if (this.x < 0 || this.x > 290) {
      this.isLive = false;
      this.x < 0 && (this.head.style.left = value + 10 + "px");
      this.x > 290 && (this.head.style.left = value - 10 + "px");
    }
  }
  public set y(value: number) {
    this.head.style.top = value + "px";
    if (this.y < 0 || this.y > 290) {
      this.isLive = false;
      this.y < 0 && (this.head.style.top = value + 10 + "px");
      this.y > 290 && (this.head.style.top = value - 10 + "px");
    }
  }
  addBody() {
    this.snake.insertAdjacentHTML("beforeend", "<div></div>");
  }

  move = (direction: string) => {
    // 将蛇尾移动到第二个元素前，变成第二个元素

    //保存蛇头位置
    const preX = this.head.offsetLeft;
    const preY = this.head.offsetTop;
    // 移动蛇头
    switch (direction) {
      case "ArrowUp":
        this.y -= 10;
        break;
      case "ArrowDown":
        this.y += 10;
        break;
      case "ArrowLeft":
        this.x -= 10;
        break;
      case "ArrowRight":
        this.x += 10;
        break;
    }
    console.log(this.length);
    
    const lastElement = this.bodies[this.length - 1];
    if (this.length > 1) {
      (lastElement as HTMLElement).style.left = preX + "px";
      (lastElement as HTMLElement).style.top = preY + "px";
    }
    if (this.x === this.food.x && this.y === this.food.y) {
        this.length += 1
      const clonedLastElement = lastElement.cloneNode(true) as HTMLElement;
      this.head.insertAdjacentElement("afterend", clonedLastElement);
    } else {
      this.head.insertAdjacentElement("afterend", lastElement);
    }

    // setTimeout(() => {
    //     this.move(direction)
    // }, 1000);
  };
}
