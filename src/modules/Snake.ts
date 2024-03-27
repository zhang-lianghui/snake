import Food from "./Food";

export const oppositeDirection = {
    ArrowUp: "ArrowDown",
    ArrowDown: "ArrowUp",
    ArrowLeft: "ArrowRight",
    ArrowRight: "ArrowLeft"
}

export default class Snake {
  head: HTMLElement;
  bodies: HTMLCollection;
  length: number;
  snake: HTMLElement;
  food: Food;
  isLive = true;
  lastDirection = '' as keyof typeof oppositeDirection;
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
    // 检查是否出界
    if (this.x < 0 || this.x > 290) {
      this.isLive = false;
      this.x < 0 && (this.head.style.left = value + 10 + "px");
      this.x > 290 && (this.head.style.left = value - 10 + "px");
    }
  }
  public set y(value: number) {
    this.head.style.top = value + "px";
    // 检查是否出界
    if (this.y < 0 || this.y > 290) {
      this.isLive = false;
      this.y < 0 && (this.head.style.top = value + 10 + "px");
      this.y > 290 && (this.head.style.top = value - 10 + "px");
    }
  }
  addBody() {
    this.snake.insertAdjacentHTML("beforeend", "<div></div>");
  }

  move = (direction: keyof typeof oppositeDirection) => {
    //保存蛇头移动前的位置
    const preX = this.x;
    const preY = this.y;
    // 移动前的head
    let preHead = this.head.cloneNode(true) as HTMLElement;
    // 移动蛇头
    if (oppositeDirection[this.lastDirection] === direction){
        direction = this.lastDirection;
    }else{
        this.lastDirection  = direction;
    }
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
    // 如果吃到食物，插入元素为移动前的head；否则将蛇尾元素移动到head移动前的位置，并插入到head div后以保持顺序
    if (this.x === this.food.x && this.y === this.food.y) {
      this.length += 1;
      this.head.insertAdjacentElement("afterend", preHead);
    } else if (this.length > 1) {
      const lastElement = this.bodies[this.length - 1] as HTMLElement;
      lastElement.style.left = preX + "px";
      lastElement.style.top = preY + "px";
      this.head.insertAdjacentElement("afterend", lastElement);
    }
    this.checkCollision()
  };
  checkCollision = () => {
    for (let i = 1; i < this.length; i++) {
      const ele = this.bodies[i] as HTMLElement;
      if (ele.offsetLeft === this.x && ele.offsetTop === this.y) {
        this.isLive = false;
      }
    }
  };
}
