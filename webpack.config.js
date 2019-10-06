const path = require("path");

module.exports = {
    entry: {
        main: "./src/main.js",
        options: "./src/options.js"
    },
    output: {
        path: path.resolve(__dirname, "addon"),
        filename: "scripts/[name].js"
    }
};
