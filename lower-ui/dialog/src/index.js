import { render, h } from 'preact'
import './sass/main.scss'
// import './sass/main1.css'

// console.log(m);
// import img from './img/WX20190611-235613@2x.png'
// import img2 from './img/WX20190616-201345@2x.png'

let name1 = 'snrkthh'
const basket = {
  count: 1,
  onSale: 'test'
}
let str = `
  There are <b>${basket.count}</b> items
   in your basket, <em>${basket.onSale}</em>
  are on sale!
`
console.log(str)

const promise = new Promise(function (resolve, reject) {
  resolve('')
})
promise.then(() => {
  console.log('test')
})

render((
  <div id="foo">
    <img src={img}></img>
    <img src={img2}></img>
    <span>Hello, world!</span>
    <button onClick={e => alert('hi!')}>Click Me</button>
  </div>
), document.body)

const name = function(){}

export default name
