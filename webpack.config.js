/* eslint-disable no-bitwise */
const path = require('path')
const webpack = require('webpack')

const port = process.env.port | 3000

module.exports = {
	entry: ['./src/index.js'],
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				options: { presets: ['@babel/env'] }
			},
			{ test: /\.png$/, use: 'url-loader?mimetype=image/png' },

			{
				test: /\.(s*)css$/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			},
			{
				test: /\.(jpe?g|gif)$/i,
				use: [{ loader: 'file-loader' }]
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'fonts/'
						}
					}
				]
			}
		]
	},
	resolve: {
		extensions: ['*', '.js', '.jsx'],
		alias: {
			'@utils': path.resolve(__dirname, 'src/utils'),
			'@home': path.resolve(__dirname, 'src/components/home'),
			'@store': path.resolve(__dirname, 'src/store'),
			'@api': path.resolve(__dirname, 'src/api'),
			'@widgets': path.resolve(__dirname, 'src/components/widgets'),
			'@assets': path.resolve(__dirname, 'src/assets'),
			'react-dom': '@hot-loader/react-dom'
		},
		modules: [path.resolve('./src/'), 'node_modules']
	},
	output: {
		path: path.resolve(__dirname, 'dist/'),
		publicPath: '/dist/',
		filename: 'bundle.js'
	},
	devServer: {
		historyApiFallback: true,
		contentBase: path.join(__dirname, 'public/'),
		port,
		publicPath: `http://localhost:${port}/dist/`,
		hotOnly: true
	},
	plugins: [new webpack.HotModuleReplacementPlugin()]
}
