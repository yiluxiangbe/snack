// 引入样式
import './style/index.less'
// 导入游戏控制类
import GameController from './modules/gameController'

const gameController = new GameController()

gameController.controller()
