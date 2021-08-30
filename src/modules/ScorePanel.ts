/*
 * @Description: 计分板
 * @Author: WaynePeng
 * @Date: 2021-08-26 04:14:23
 * @LastEditTime: 2021-08-27 00:35:55
 * @LastEditors: WaynePeng
 */
class ScorePanel {
  score: number = 0
  level: number = 1
  maxLevel: number
  scoreElement: HTMLElement
  levelElement: HTMLElement
  constructor(maxLevel: number = 10) {
    this.maxLevel = maxLevel
    this.scoreElement = document.getElementById('score')!
    this.levelElement = document.getElementById('level')!
  }
  
  // 得分
  addScore() {
    this.score++
    // 每10分升一级
    if (this.score % 10 === 0) {
      this.levelUp()
    }
    this.scoreElement.innerText = String(this.score)
  }
  // 升级
  levelUp() {
    // 判断是否达到等级上限
    if (this.level < this.maxLevel) {
      this.level++
      this.levelElement.innerText = String(this.level)
    }
  }
}

export default ScorePanel
 