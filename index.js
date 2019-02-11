import css from './src/ui.less';
import _ from 'lodash';
import _style from './demo/style.css';
import _style2 from './demo/style.mod.css?module';
import myTransition, { vendor } from './demo/myTransition.js';

function component() {
    var element = document.createElement('div');

    // lodash 是由当前 script 脚本 import 导入进来的
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    //element.classList.add('hello');

    return element;
}

document.body.appendChild(component());

console.log(new myTransition());
console.log(_style);
