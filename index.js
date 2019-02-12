import css from './src/ui.less';
import _ from 'lodash';
import _style from './demo/style.css';
import _style2 from './demo/style.mod.css?module';
import myTransition, { vendor } from './demo/myTransition.js';
import ScrollReveal from 'scrollreveal';
import './demo/index.less';


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

    ScrollReveal().reveal('.scrollreveal__item');
}

document.body.appendChild(component());

console.log(new myTransition());
console.log(_style);
