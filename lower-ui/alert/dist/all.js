"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.name = void 0;

var _preact = require("preact");

var name = 'snrkthh';
exports.name = name;
var basket = {
  count: 1,
  onSale: 'test'
};
var str = "\n  There are <b>".concat(basket.count, "</b> items\n   in your basket, <em>").concat(basket.onSale, "</em>\n  are on sale!\n");
console.log(str);
var promise = new Promise(function (resolve, reject) {
  resolve('');
});
promise.then(function () {
  console.log('test');
});
(0, _preact.render)(h("div", {
  id: "foo"
}, h("span", null, "Hello, world!"), h("button", {
  onClick: function onClick(e) {
    return alert('hi!');
  }
}, "Click Me")), document.body);