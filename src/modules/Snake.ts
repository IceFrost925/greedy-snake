/*
 * @Description: 蛇
 * @Author: WaynePeng
 * @Date: 2021-08-26 23:14:20
 * @LastEditTime: 2021-08-31 02:16:14
 * @LastEditors: WaynePeng
 */
class Snake {
  head: HTMLElement // 蛇头
  body: HTMLCollection // 蛇身-包括蛇头
  element: HTMLElement // 蛇容器
  isLive: Boolean = true // 是否存活
  constructor() {
    this.element = document.getElementById('snake')! // // 不加！可以改为as HTMLElement
    this.head = document.querySelector('#snake > div')!
    this.body = this.element.getElementsByTagName('div')!
  }
  // 获取/设置 蛇头坐标
  get X() {
    return this.head.offsetLeft
  }
  set X(value: number) {
    this.head.style.left = `${value}px`
  }
  get Y() {
    return this.head.offsetTop
  }
  set Y(value: number) {
    this.head.style.top = `${value}px`
  }

  // 蛇吃食物的
  eat() {
    this.element.insertAdjacentHTML('beforeend', '<div></div>')
  }

  // 是否在合法范围内 （0 ～ 400）
  isRange(x: number, y: number): boolean {
    if (x >= 0 && x <= 400 && y >= 0 && y <= 400) {
      return true
    } else {
      return false
    }
  }
  // 移动身体位置，从后往前移动否者会丢失前面位置的信息
  moveBody() {
    // i === 0 为头部
    for (let i = this.body.length - 1; i > 0; i--) {
      // 获取前一节身体位置
      const X = (this.body[i - 1] as HTMLElement).offsetLeft
      const Y = (this.body[i - 1] as HTMLElement).offsetTop
      // 设置当前节点位置
      ;(this.body[i] as HTMLElement).style.top = `${Y}px`
      ;(this.body[i] as HTMLElement).style.left = `${X}px`
    }
  }

  // 头部与身体是否重叠
  isOverlap(x: number, y: number): boolean {
    let result: boolean = false
    for (let i = 1; i < this.body.length; i++) {
      const element = this.body[i]
      if (
        (element as HTMLElement).offsetLeft === x &&
        (element as HTMLElement).offsetTop === y
      ) {
        result = true
        break
      }
    }
    return result
  }
}

export default Snake
