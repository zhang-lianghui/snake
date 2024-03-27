import './style/index.less'
import GameControl from './modules/GameControl'

let game = new GameControl();
game.init()
setInterval(()=>{
    // console.log(game.direction);
}, 1000)