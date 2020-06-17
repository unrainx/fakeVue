const path = require('path')

module.exports = {
    mode: 'development', // 调试模式
    entry: './src/index.ts',	// 项目入口
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },

    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },

    devServer: {
        contentBase: './dist',
    }
}