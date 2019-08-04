// @flow

import raf from 'raf' // requestAnimationFrame polyfill
import 'classlist-polyfill'

/**
 * 下一帧执行
 * @param {*} back
 */
const nextFrame = function (back): void {
  raf(function () {
    back && back.call(window)
  })
}

// 获取浏览专属前缀
const vendor = (function (): any {
  var transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }
  for (var key in transformNames)
  {
    const body = document.body
    if (body && body.style[transformNames[key]] !== undefined)
    {
      return key
    }
  }
  return false
})()

/**
 * 设置带前缀的属性
 * @param style css3兼容属性
 * @returns {*}
 */
const prefixStyle = function (style: string): any {
  if (vendor === false)
  {
    return false
  }
  if (vendor === 'standard')
  {
    return style
  }
  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}

/**
 * 合并className带自定义前缀classVendor
 * @param {String} classVendor 前缀
 * @param {Stirng} className
 */
const mergeClassName = function (classVendor, className) {
  let line = ''
  if (classVendor)
  {
    line = '-'
  }
  return classVendor + line + className
}

/**
 *
 *
 * @class myTransition
 */
class transition {
  target: any

  OriginalOption: any

  className: string

  transitionClass: string

  time: number

  delay: number

  entryBeforeCall: Function

  leaveBeforeCall: Function

  entryCall: Function

  leaveCall: Function

  entryBackCall: Function

  leaveBackCall: Function

  classVendor: string | ''

  clearTransition: any

  transitionClass: any

  /**
   * Creates an instance of transition.
   * @param {Object} Option 配制对象
   * @memberof transition
   */
  constructor(Option: any): any {
    this.className = ''
    this.time = Option.time || 0 // 过渡时间(s)
    this.delay = Option.time || 0// 延迟时间(s)
    this.target = Option.target || null// 过渡元素

    this.entryBeforeCall = null// 过渡前执行
    this.leaveBeforeCall = null// 离开前执行
    this.entryCall = null
    this.leaveCall = null
    this.entryBackCall = null// 过渡后执行
    this.leaveBackCall = null// 离开后执行
    this.classVendor = 'lowerui'// 过渡类前缀
    this.clearTransition = null// setTimeOut处理transitionEnd过渡兼容问题
    this.transitionClass = {
      enter: 'enter', // 过渡的开始状态
      enterActive: 'enter-active', // 进入过渡生效时的状态
      enterTo: 'enter-to', // 过渡的结束状态
      leave: 'leave', // 离开过渡的开始状态
      leaveActive: 'leave-active', // 离开过渡生效时的状态
      leaveTo: 'leave-to'// 离开过渡的结束状态
    }// 过渡中的类名

    this.init();
  }

  /**
   *
   *
   * @memberof transition
   */
  init () {
    if (!this.target instanceof window.HTMLElement)
    {
      throw Error('error 过渡元素不存在!');
    }
  }

  entryBefore () {
    const that = this
    this.target.classList.add(mergeClassName(this.classVendor, this.transitionClass.enter))
    nextFrame(() => {
      that.target.classList.remove(mergeClassName(this.classVendor, this.transitionClass.enter));
      that.target.classList.add(mergeClassName(this.classVendor, this.transitionClass.enterActive))
      that.target.classList.add(mergeClassName(this.classVendor, this.transitionClass.enterTo))
      that.target.addEventListener('transitionend', () => {
        that.target.classList.remove(mergeClassName(this.classVendor, this.transitionClass.enterActive));
        that.target.classList.remove(mergeClassName(this.classVendor, this.transitionClass.enterTo));
      });
      that.entry()
    })
  }

  entry () {
    alert('abc');

    // this.target.classList.add(mergeClassName(this.transitionClass, this.className))
  }

  start () {
    const test_dd = 'd'
    console.log(test_dd);
    this.entryBefore();
  }

  enterActive () { }

  enterTo () { }

  leave () { }

  leaveActive () { }

  leaveTo () { }
}

export default transition
