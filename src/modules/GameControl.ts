/*
 * @Description: 游戏控制器
 * @Author: WaynePeng
 * @Date: 2021-08-26 23:37:14
 * @LastEditTime: 2021-08-31 02:14:47
 * @LastEditors: WaynePeng
 */
import Snake from './Snake'
import Food from './Food'
import ScorePanel from './ScorePanel'

// 蛇可以移动的方向对应的按键code
const directionList: [string, string, string, string] = [
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight'
]

// 方向转换
enum directionTransformation {
  ArrowUp = 'ArrowDown',
  ArrowDown = 'ArrowUp',
  ArrowLeft = 'ArrowRight',
  ArrowRight = 'ArrowLeft'
}

class GameControl {
  snake: Snake
  food: Food
  scorePanel: ScorePanel
  direction: string = '' // 移动方向
  causeDeath: string = '' // 死亡原因
  constructor() {
    this.snake = new Snake()
    this.food = new Food()
    this.scorePanel = new ScorePanel()
  }

  // 初始化游戏
  init() {
    document.addEventListener('keydown', this.keyDown.bind(this))
    this.food.change()
    this.move()
  }

  // keydown响应函数
  keyDown(event: KeyboardEvent) {
    // 点击方向键且不能调头
    if (
      directionList.includes(event.code) &&
      directionTransformation[event.code as directionTransformation] !== this.direction
    ) {
      this.direction = event.code
    }
  }

  // 蛇移动控制
  move() {
    let { X, Y } = this.snake
    switch (this.direction) {
      case 'ArrowUp':
        Y -= 25
        break
      case 'ArrowDown':
        Y += 25
        break
      case 'ArrowLeft':
        X -= 25
        break
      case 'ArrowRight':
        X += 25
        break
    }
    // 检测蛇头坐标是否在范围有效内
    if (this.snake.isRange(X, Y)) {
      // 头部与身体发生了碰撞
      if (this.snake.body.length > 4 && this.snake.isOverlap(X, Y)) {
        this.causeDeath = '你吃掉了自己～'
        this.snake.isLive = false
      } else {
        // 先吃食物，否则会在下一次移动才会移动新加的身体位置
        this.checkEat(X, Y)
        // 先移动身体，不然会丢失头部坐标
        this.snake.moveBody()
        this.snake.Y = Y
        this.snake.X = X
      }
    } else {
      this.causeDeath = '你撞墙了～'
      this.snake.isLive = false
    }
    // 判断游戏是否结束
    if (this.snake.isLive) {
      setTimeout(this.move.bind(this), 400 - (this.scorePanel.level - 1) * 10)
    } else {
      alert(this.causeDeath + '游戏结束')
    }
  }

  // 检查是否吃到食物
  checkEat(x: number, y: number) {
    if (x === this.food.X && y === this.food.Y) {
      this.snake.eat()
      this.scorePanel.addScore()
      this.food.change()
    }
  }
}

export default GameControl
