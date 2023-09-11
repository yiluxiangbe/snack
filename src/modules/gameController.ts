// 导入游戏里面的各种类
import Food from './food'
import Snack from './snack'
import Score from './score'

class GameController {
  food: Food
  snack: Snack
  score: Score
  // 定时器来实现蛇的移动
  time: NodeJS.Timeout
  constructor() {
    this.food = new Food()
    this.score = new Score()
    this.snack = new Snack()
    this.time = null
  }
  // 游戏开始，分数提高，对应等级提高
  controller() {
    // 记录食物的位置
    let x = this.food.x
    let y = this.food.y
    // 蛇run起来
    // 将食物的信息这个实例传递过去
    // 这里做一个定时器，来实现蛇的移动,传递食物这个实例用来判断蛇吃食
    // 传递分数这个实来加分数
    this.snack.keyDowm(this.food, this.score)
    console.log(this.snack.x + ':' + this.food.x)
    console.log(this.snack.y + ':' + this.food.y)
  }
}

export default GameController
