// 蛇这个类

class Snack {
  // 蛇的盒子元素
  private snackBox: HTMLElement
  // 蛇头
  private head: HTMLElement
  // 蛇身体 ,这里是一个包含元素的集合，如果文档一旦发生改变那么这个也会响应式的发生变化
  private body: HTMLAllCollection

  // 控制蛇的移动方向,ArrowUp上，ArrowDown下，ArrowLeft左，ArrowRight右
  // 初始状态是向右走
  private direction: string = 'ArrowRight'
  // 蛇运动的定时器
  private time: NodeJS.Timeout | null
  // 蛇是否存活的状态
  private isLive: boolean = true

  // 这里是控制蛇速度的变量
  // 蛇在移动过程中速度会改变就需要score传递过来，所以我们也要设置默认值
  private snackSpeed: number
  constructor() {
    // 这里的感叹号表示一定不为空
    // 子元素有多个的时候，默认找到第一个
    this.head = document.querySelector('#snack > div')!
    // 加上断言，因为HTMLAllCollection和我们通过dom拿到的元素类型HTMLCollectionOf 是不一样的，我们必须要进行断言来告诉typescript这种转换是安全的
    this.body = document.querySelector('#snack')!.getElementsByTagName('div')! as unknown as HTMLAllCollection
    // 这里再加一个关于蛇运动时候的定时器，为了方便我们在全局对这个定时器进行清除等操作
    this.time = null
    this.snackSpeed = 700
    this.snackBox = document.querySelector('#snack')
  }

  // 得到蛇头轴相关的信息
  get x() {
    return this.head.offsetLeft
  }

  get y() {
    return this.head.offsetTop
  }

  // 位置改变
  change() {
    // 随机生成x,y的坐标
    let left = Math.floor(Math.random() * 30) * 10
    let top = Math.floor(Math.random() * 30) * 10
    this.head.style.left = left + 'px'
    this.head.style.top = top + 'px'
  }

  // 触发键盘按钮事件来控制蛇上下左右移动
  keyDowm(food, score) {
    // 监听键盘按下，并且传递一个函数，并且将这个函数的this指向一起传递给要调用的那个函数
    // 。bind函数用于传递this

    addEventListener('keydown', (event) => {
      this.run(food, score, event.code) // 在这里调用 run 方法，并传递 food 参数
    })
  }

  // 蛇移动的函数
  run(food, score, code) {
    // 使用抛出异常来实现处理游戏结束
    console.log('蛇在移动')

    // 这里判断蛇是否迟到食物
    this.isSnackAndFood(food, score)
    try {
      // 每次调用的时候清除定时器
      clearTimeout(this.time)
      // 获取蛇头位置信息
      let topBefore = this.head.style.top.replace(/[^0-9.-]/g, '') // 去除非数字字符，得到 '100'
      let top = Number(topBefore) // 将 '100' 转换为数字 100
      let leftBefore = this.head.style.left.replace(/[^0-9.-]/g, '') // 去除非数字字符，得到 '100'
      let left = Number(leftBefore) // 将 '100' 转换为数字 100
      // 得到键盘上下左右键
      this.direction = code
      console.log(this.direction)

      // 蛇头位置移动
      switch (this.direction) {
        // 向上移动
        case 'ArrowUp':
          top = top - 10
          // 判断是否超出边界
          if (top < 0) {
            top = top + 10
            throw new Error('游戏结束')
          }
          console.log(this.body[1] as HTMLElement)

          if (this.body[1]) {
            if (this.head.offsetLeft === (this.body[1] as HTMLElement).offsetLeft && this.head.offsetTop - 10 === (this.body[1] as HTMLElement).offsetTop) {
              top = top + 20
            }
          }
          // 一定要在蛇头位置改变之前移动蛇身体
          this.snackBodyRun()
          this.head.style.top = top + 'px'
          break
        // 向下移动
        case 'ArrowDown':
          top = top + 10
          // 判断是否超出边界
          if (top > 290) {
            top = top - 10
            throw new Error('游戏结束')
          }
          if (this.body[1]) {
            if (this.head.offsetLeft === (this.body[1] as HTMLElement).offsetLeft && this.head.offsetTop + 10 === (this.body[1] as HTMLElement).offsetTop) {
              top = top - 20
            }
          }
          // 一定要在蛇头位置改变之前移动蛇身体
          this.snackBodyRun()
          this.head.style.top = top + 'px'
          break
        // 左
        case 'ArrowLeft':
          left = left - 10
          // 判断是否超出边界
          if (left < 0) {
            left = left + 10
            throw new Error('游戏结束')
          }
          if (this.body[1]) {
            if (this.head.offsetLeft - 10 === (this.body[1] as HTMLElement).offsetLeft && this.head.offsetTop === (this.body[1] as HTMLElement).offsetTop) {
              left = left + 20
            }
          }
          // 一定要在蛇头位置改变之前移动蛇身体
          this.snackBodyRun()
          this.head.style.left = left + 'px'
          break
        // 右
        case 'ArrowRight':
          left = left + 10
          // 判断是否超出边界
          if (left > 290) {
            left = left - 10
            throw new Error('游戏结束')
          }
          if (this.body[1]) {
            if (this.head.offsetLeft + 10 === (this.body[1] as HTMLElement).offsetLeft && this.head.offsetTop === (this.body[1] as HTMLElement).offsetTop) {
              console.log(1111)

              left = left - 20
            }
          }
          // 一定要在蛇头位置改变之前移动蛇身体
          this.snackBodyRun()
          this.head.style.left = left + 'px'
          break
      }
      // 回调函数，继续使蛇移动,但是不推荐，会造成栈溢出
      // 建议使用定时器,但是使用完了之后要清除掉定时器，不然会出现斜着走的情况
      // this.isLive && this.run(beforethis)

      // 蛇头动完检查是否和自己的身体发生碰撞
      this.isSnackCrush()

      this.time = setTimeout(() => {
        this.isLive && this.run(food, score, code)
      }, this.snackSpeed - 10 * score.level)
    } catch (error) {
      alert('游戏结束')
    }
  }
  // 判断蛇是否吃到食物
  isSnackAndFood(food, score) {
    if (food.x === this.x && food.y === this.y) {
      food.change()
      score.addScore()
      // 蛇吃到食物需要将蛇身子扩大
      this.snackMoreLang()
    }
  }
  // 蛇身体变长的函数
  snackMoreLang() {
    // 创建一个新元素

    const newElement = document.createElement('div')

    // 将新元素添加到父元素的子节点中
    this.snackBox.appendChild(newElement)
  }
  // 蛇的身体移动的函数
  snackBodyRun() {
    // 思路，位置重置，后一个跟上前一个
    // 转换为数组

    const elementsArray = Array.from(this.body)
    for (let i = elementsArray.length - 1; i--; i > 0) {
      const currentElement = elementsArray[i + 1] as HTMLElement
      const prevElement = elementsArray[i] as HTMLElement

      // 获取前一个部分的位置
      const prevTop = prevElement.style.top
      const prevLeft = prevElement.style.left

      // 设置当前部分的位置为前一个部分的位置
      currentElement.style.top = prevTop
      currentElement.style.left = prevLeft
    }
  }
  // 判断蛇是否发生撞击自己身体的行为，如果发生游戏失败
  isSnackCrush() {
    // 循环遍历，this.body如果发现头部和其他身体部分是一样的坐标就发生撞击
    for (let i = 2; i < this.body.length; i++) {
      if ((this.body[0] as HTMLElement).offsetLeft === (this.body[i] as HTMLElement).offsetLeft && (this.body[0] as HTMLElement).offsetTop === (this.body[i] as HTMLElement).offsetTop) {
        throw new Error('游戏结束')
      }
    }
  }
  // 打印信息
  print() {
    console.log(this.head.offsetTop)
    console.log(this.head.offsetLeft)
  }
}

export default Snack
