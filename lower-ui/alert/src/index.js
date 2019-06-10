import { render } from 'preact'

let name = 'snrkthh'
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
    <span>Hello, world!</span>
    <button onClick={e => alert('hi!')}>Click Me</button>
  </div>
), document.body)

export { name }
