const bundle = require('@lower-ui/bundle');
const packageJson = require('./package.json');

(async () => {
  let name = await packageJson.name;
  bundle.bundle({
    input: './src/index.js',
    file: `${name}.js`,
    name: bundle.lowerui
  });
})()
