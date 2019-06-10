module.exports = function () {
  const presets = [
    ["@babel/preset-env"]
  ];
  // const presets = [
  //     ["@babel/preset-env", {
  //         useBuiltIns: "usage"
  //     }]
  // ];
  const plugins = [["@babel/plugin-transform-react-jsx", {
    "pragma": "h"
  }]]

  return {
    presets,
    plugins
  };
}();