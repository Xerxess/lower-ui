module.exports = {
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": [
    "plugin:react/recommended",
    "eslint:recommended"
  ],
  "globals": {
  },
  "parserOptions": {
    "parser": require.resolve('babel-eslint'),
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "settings": {
    "react": {
      "pragma": "h"
    }
  },
  "plugins": [
    "react"
  ],
  "rules": {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off', // console.log()
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off', // debugger
    'quotes': ["error", "single"],
    'semi':["error", "never"],
  }
};
