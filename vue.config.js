const path = require('path');

module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.join(__dirname, 'src'),
                '@@': path.join(__dirname, 'src/components'),
            }
        }
    }
}