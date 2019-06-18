const merge = require('webpack-merge');

const { BUNDLE_DIR, PORT, HOSTNAME } = require('../utils/config');

module.exports = merge({
	mode: 'development',
	output: {
		filename: 'bundle.js',
	},
	devtool: 'eval-source-map',
	devServer: {
		contentBase: BUNDLE_DIR,
		host: HOSTNAME,
		port: PORT,
		historyApiFallback: true,
		noInfo: true,
		inline: true,
		hot: true,
		progress: true,
	},
}, require('./webpack.base.config'));