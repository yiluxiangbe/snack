// 食物这个类

class Food {
  // 含有元素
  private element: HTMLElement
  constructor() {
    // 这里的感叹号表示一定不为空
    this.element = document.querySelector('#food')!
  }

  // 得到x,y轴相关的信息
  get x() {
    return this.element.offsetLeft
  }

  get y() {
    return this.element.offsetTop
  }

  // 位置改变
  change() {
    console.log('位置改变')

    // 随机生成x,y的坐标
    let left = Math.floor(Math.random() * 30) * 10
    let top = Math.floor(Math.random() * 30) * 10
    this.element.style.left = left + 'px'
    this.element.style.top = top + 'px'
  }
  // 打印信息
  print() {
    console.log(this.element.offsetTop)
    console.log(this.element.offsetLeft)
  }
}

export default Food
