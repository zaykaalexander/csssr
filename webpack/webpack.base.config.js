const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');

const { SOURCE_DIR, BUNDLE_DIR } = require('../utils/config');

module.exports = {
	entry: [
		path.resolve(SOURCE_DIR, 'index.tsx'),
	],
	output: {
		path: BUNDLE_DIR,
		publicPath: '/',
	},
	resolve: {
		extensions: [ '.tsx', '.ts', '.jsx', '.js', '.json' ],
		alias: {
			'~': path.resolve(SOURCE_DIR, 'core'),
			'@': path.resolve(SOURCE_DIR, 'pages'),
			'^': path.resolve(SOURCE_DIR, 'models'),
		},
	},
	module: {
		rules: [
			{
				test: /\.(tsx?|jsx?)$/,
				use: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.(png|jpe?g|svg|gif)/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]',
							outputPath: 'assets'
						}
					}
				],
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new HtmlPlugin({
			template: path.resolve(SOURCE_DIR, 'index.html'),
		}),
	],
};
