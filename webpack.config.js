const path = require("path");

module.exports = {
    entry: {
        background_scripts: "./src/main.js",
        options: "./src/options.js"
    },
    output: {
        path: path.resolve(__dirname, "addon"),
        filename: "[name]/index.js"
    }
};
