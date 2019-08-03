const bundle = require('@lower-ui/bundle')
const packageJson = require('./package.json');

(async () => {
  let name = await packageJson.name
  name = name.split('/')[1]
  bundle.bundle({
    input: './src/index.js',
    file: `${bundle.lowerui}-${name}.js`,
    name: `${bundle.lowerUI}.${name}`
  })
})()
