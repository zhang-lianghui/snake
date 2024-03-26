import './style/index.less'

class Food{
    element:HTMLElement;
    constructor(){
        this.element = document.getElementById('food')!;
    }

    get x(){
        return this.element.offsetLeft
    }
    get y(){
        return this.element.offsetTop
    }

    update(){
        let top = Math.floor(Math.random() * 30) * 10;
        let left = Math.floor(Math.random() * 30) * 10;
        this.element.style.top = top + 'px'
        this.element.style.left = left + 'px';
    }
}

class Panel{
    score = 0;
    level = 1;
    scoreEle: HTMLElement;
    levelEle: HTMLElement;
    constructor(){
        this.scoreEle = document.getElementById('score')!;
        this.levelEle = document.getElementById('level')!;
    }

    addScore(){
        this.scoreEle.innerHTML = ++this.score + '';
    }

    levelUp(){
        if(this.level < 10){
            this.scoreEle.innerHTML = ++this.score + '';
        }
    }
}

const food = new Food();
food.update()
console.log(food.x, food.y);

