module.exports = function () {
    const presets = [
        ["@babel/preset-env", {
            useBuiltIns: "usage"
        }]
    ];
    const plugins = [
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
      ]

    return {
        presets,
        plugins
    };
}();