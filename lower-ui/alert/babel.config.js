module.exports = function () {
    const presets = [
        ["@babel/preset-env"]
    ];
    // const presets = [
    //     ["@babel/preset-env", {
    //         useBuiltIns: "usage"
    //     }]
    // ];
    const plugins = []

    return {
        presets,
        plugins
    };
}();