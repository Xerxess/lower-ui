import css from './src/input.less';
import _ from 'lodash';
let s = 'hello world';
import './style.css';
import {default as myTransition,vendor} from './demo/myTransition.js';

function component() {
    var element = document.createElement('div');

    // lodash 是由当前 script 脚本 import 导入进来的
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');

    return element;
}

document.body.appendChild(component());
console.log(css);
console.log(new myTransition());
console.log(vendor);
