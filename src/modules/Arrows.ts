export default class Arrows {
  arrows: {[key:string]:HTMLElement} = {};
  setDirection: Function;
  constructor(cb: Function) {
    this.arrows.left = document.getElementById("left")!;
    this.arrows.right = document.getElementById("right")!;
    this.arrows.up = document.getElementById("up")!;
    this.arrows.down = document.getElementById("down")!;
    this.setDirection = cb;
    this.initListener();
  }

  initListener = () => {
    this.arrows.left.addEventListener("click", () => {
      this.setDirection("left");
      this.setColor('left')
    });
    this.arrows.right.addEventListener("click", () => {
      this.setDirection("right");
      this.setColor('right')
    });
    this.arrows.up.addEventListener("click", () => {
      this.setDirection("up");
      this.setColor('up')
    });
    this.arrows.down.addEventListener("click", () => {
      this.setDirection("down");
      this.setColor('down')
    });
  };

  setColor = (key: string) => {
    Object.keys(this.arrows).forEach(key => {
      this.arrows[key].style.backgroundColor = 'aliceblue'
    })
    this.arrows[key].style.backgroundColor = '#2aad52'
  }

}
