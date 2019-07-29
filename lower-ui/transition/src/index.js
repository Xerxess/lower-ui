
// @flow

import raf from 'raf'; //requestAnimationFrame polyfill
import 'classlist-polyfill';


/**
 * 下一帧执行
 * @param {*} back 
 */
const nextFrame = function (back): void {
  raf(function () {
    back && back.call(window);
  });
}


//获取浏览专属前缀
const vendor = (function (): any {

  var transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  };
  for (var key in transformNames)
  {
    const body = document.body;
    if (body && body.style[transformNames[key]] !== undefined)
    {
      return key;
    }
  }
  return false;
})();

/**
 * 设置带前缀的属性
 * @param style css3兼容属性
 * @returns {*}
 */
const prefixStyle = function (style): any {
  if (vendor === false)
  {
    return false;
  }
  if (vendor === 'standard')
  {
    return style;
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}


/**
 * 合并className带自定义前缀classVendor
 * @param {String} classVendor 前缀
 * @param {Stirng} className 
 */
const mergeClassName = function (classVendor, className) {
  let line = '';
  if (classVendor)
  {
    line = '-'
  }
  return classVendor + line + className;
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
  time: Number
  delay: Number
  entryBeforeCall: Function
  leaveBeforeCall: Function
  entryCall: Function
  leaveCall: Function
  entryBackCall: Function
  leaveBackCall: Function
  classVendor: String | ''
  clearTransition: any
  transitionClass: Object
  /**
   * Creates an instance of transition.
   * @param {Object} Option 配制对象
   * @memberof transition
   */
  constructor(Option: any): any {
    this.OriginalOption = Option;//配制
    this.className = 'lowerui';
    this.target = {};
    this.time;//过渡时间(s)
    this.delay;//延迟时间(s)
    this.target;//过渡元素
    this.entryBeforeCall;//过渡前执行
    this.leaveBeforeCall;//离开前执行
    this.entryCall;
    this.leaveCall;
    this.entryBackCall;//过渡后执行
    this.leaveBackCall;//离开后执行
    this.classVendor = '';//过渡类前缀
    this.clearTransition;//setTimeOut处理transitionEnd过渡兼容问题
    this.transitionClass = {
      entry: 'entry',//过渡的开始状态
      enter_active: 'enter-active',//进入过渡生效时的状态
      enter_to: 'enter-to',//过渡的结束状态
      leave: 'leave',//离开过渡的开始状态
      leave_active: 'leave-active',//离开过渡生效时的状态
      leave_to: 'leave-to'//离开过渡的结束状态
    };//过渡中的类名
  }

  /**
   *
   *
   * @memberof transition
   */
  init () {

  }
  entryBefore () {
    const that = this;
    this.target.classlist.add(mergeClassName(this.transitionClass, this.className));
    nextFrame(function () {
      that.entry();
    });
  }
  entry () {
    this.target.classlist.add(mergeClassName(this.transitionClass, this.className));
  }
  enterActive () { }
  enterTo () { }
  leave () { }
  leaveActive () { }
  leaveTo () { }
}


export default transition