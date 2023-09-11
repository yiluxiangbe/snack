// 记分牌的类

class Score {
  score = 0
  level = 1
  scoreEle: HTMLElement
  levelEle: HTMLElement
  // 最高等级
  levelMax: number
  // 多少分数增加一级
  levelUp: number
  constructor(levelMax: number = 10, levelUp: number = 10) {
    this.scoreEle = document.querySelector('#score')
    this.levelEle = document.querySelector('#level')
    this.levelMax = levelMax
    this.levelUp = levelUp
  }
  // 增加分数
  addScore() {
    this.score++
    this.scoreEle.innerHTML = this.score + ''
    // 分数增加,对应等级也增加
    if (this.score - 1 / this.levelUp !== this.level - 1) {
      this.addLevel()
    }
  }
  // 提高等级
  addLevel() {
    // 设置一个上限
    if (this.level < this.levelMax) {
      this.level++
      this.levelEle.innerHTML = this.level + ''
    }
  }
}

export default Score
