// This file is not going through babel transformation.
// So, we write it in vanilla JS
// (But you could use ES2015 features supported by your Node.js version)
const webpack = require('webpack');

module.exports = {
    webpack: (config, { dev, vendor }) => {
        // Perform customizations to webpack config

        // Important: return the modified config
        return config;
    }
};
