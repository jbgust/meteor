const ObsoleteWebpackPlugin = require('obsolete-webpack-plugin')

module.exports = {
    transpileDependencies: ['vuetify'],
    configureWebpack: {
        externals:
        {
            xlsx: 'xlsx'
        },
        plugins: [
            new ObsoleteWebpackPlugin({
                promptOnNonTargetBrowser: true,
                template: '<div style="border-radius: 15px;font-family: Roboto sans-serif;background-color: #3f51b5;color: white;padding:30px;position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);"><h1>Your browser is not supported by METEOR, please update your browser.</h1></div>'
            })
        ]
    }
}
