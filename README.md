# My-Ui

具体思路：
组件拆分：每个组件可单独使用，也可整包使用
支持模块：umd

插件：
gulp 构建工具
rollup 打包工具
lerna 分包工具


命令：
lerna publish
lerna bootstrap
lerna clean
lerna add dd dd/d --div

问题：
采用babel 7.4

* @babel/polyfill 不可用

```js
// 无效配置
npm install @babel/preset-env -D;
const presets = [
  ["@babel/preset-env", {
    targets: {
      browsers: ['last 5 versions', 'ie >= 9'],
    },
    modules: false,
    useBuiltIns: "usage"
  },]
];

// 改为：
npm install core-js@3;
npm install regenerator-runtime;

const presets = [
  ["@babel/preset-env", {
    targets: {
      browsers: ['last 5 versions', 'ie >= 9'],
    },
    modules: false,
    useBuiltIns: "usage",
    corejs: 3
  },]
];

```

* babel 不无染全局环境调整为

```js
npm install --save-dev @babel/plugin-transform-runtime
npm install --save @babel/runtime
npm install --save @babel/runtime-corejs3

const plugins = [[
  "@babel/plugin-transform-runtime",
  {
    "absoluteRuntime": false,
    "corejs": 3,
    "helpers": true,
    "regenerator": true,
    "useESModules": true
  }
]]
```

# 问题

postcss 无法正常工作