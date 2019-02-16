import css from './src/ui.less';
import _ from 'lodash';
import _style from './demo/style.css';
import _style2 from './demo/style.mod.css?module';
import myTransition, { vendor } from './demo/myTransition.js';
import ScrollReveal from 'scrollreveal';
import { Swiper, Navigation, Pagination, Scrollbar } from 'swiper/dist/js/swiper.esm.js';
import 'swiper/dist/css/swiper.css';
import './demo/index.less';

Swiper.use([Navigation, Pagination, Scrollbar]);

function component() {
    var element = document.createElement('div');

    // lodash 是由当前 script 脚本 import 导入进来的
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    //element.classList.add('hello');

    return element;
}

window.onload = function () {

    var start = window.performance.now()
    var end = window.performance.now()
    console.log(start.toFixed(3)) // the number of milliseconds the current node process is running
    console.log((start - end).toFixed(3)) // ~ 0.002 on my system
    console.log(window.performance.now());

    ScrollReveal({ reset: true }).reveal('.scrollreveal__item');
    var swiper = new Swiper('.swiper-container', {
        speed: 500,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        // ...
    });
}

document.body.appendChild(component());

console.log(new myTransition());
console.log(_style);


//普通
function add(x, y) {
    return (x + y)
}

//柯里化
function curriedAdd(x) {
    return function (y) {
        return x + y
    }
}

//通过递归来将 currying 的返回的函数也自动 Currying 化
function trueCurrying(fn, ...args) {
    if (args.length >= fn.length) {
        return fn(...args)
    }
    return function (...args2) {
        return trueCurrying(fn, ...args, ...args2)
    }
}
var increment = trueCurrying(add, 1);
console.log(increment(1));

// add(1)(2) // 3 
// add(1, 2, 3)(10) // 16 
// add(1)(2)(3)(4)(5) // 15

var addd = function (...args) {
    return function () {

    }
}