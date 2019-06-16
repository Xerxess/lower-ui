import { render, h } from 'preact'

render((
  <div id="foo">
    <span>Hello, world!</span>
    <button onClick={e => alert('hi!')}>Click Me</button>
  </div>
), document.body)
const promise = new Promise(function (resolve, reject) {
  resolve('')
})
promise.then(() => {
  console.log('test')
})

console.log('abc');

export default {
  d:'abc'
}