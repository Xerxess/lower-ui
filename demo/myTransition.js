
//requestAnimationFrame兼容
(function () {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function () {
            callback(currTime + timeToCall);
            lastTime = currTime + timeToCall;
        }, timeToCall);
        return id;
    };
    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {
        clearTimeout(id);
    };
})();

/**
 * 下一帧执行
 * @param back
 */
var nextFrame = function (back) {
    window.requestAnimationFrame(function () {
        back && back.call(window);
    });
}

//获取浏览专属前缀
var vendor = (function () {
    var transformNames = {
        webkit: 'webkitTransform',
        Moz: 'MozTransform',
        O: 'OTransform',
        ms: 'msTransform',
        standard: 'transform'
    };
    for (var key in transformNames) {
        if (document.body.style[transformNames[key]] !== undefined) {
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
function prefixStyle(style) {
    if (vendor === false) {
        return false;
    }
    if (vendor === 'standard') {
        return style;
    }

    return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}

/**
 * 过渡类
 */
var myTransition = function () {
    this.time;//过渡时间
    this.target;//过渡元素
    this.entryBeforeCall;//过渡前执行
    this.leaveBeforeCall;//离开前执行
    this.entryBackCall;//过渡后执行
    this.leaveBackCall;//离开后执行
    this.classVendor;//过渡类前缀
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

export default myTransition;

export {
    vendor
};