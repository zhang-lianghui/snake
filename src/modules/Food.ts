export default class Food{
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