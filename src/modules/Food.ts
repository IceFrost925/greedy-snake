/*
 * @Description: 食物
 * @Author: WaynePeng
 * @Date: 2021-08-26 04:13:03
 * @LastEditTime: 2021-08-31 02:05:00
 * @LastEditors: WaynePeng
 */
class Food {
  element: HTMLElement
  constructor() {
    this.element = document.getElementById('food')!
  }

  get X() {
    return this.element.offsetLeft
  }
  get Y() {
    return this.element.offsetTop
  }

  // 修改食物位置
  change() {
    let top = Math.floor(Math.random() * 16) * 25 // 随机生成400之间的25倍数位置
    let left = Math.floor(Math.random() * 16) * 25 // 随机生成400之间的25倍数位置
    this.element.style.top = `${top}px`
    this.element.style.left = `${left}px`
  }
}

export default Food
