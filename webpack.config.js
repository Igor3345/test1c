const path = require('path');
const fs = require('fs');
const merge = require('webpack-merge');
const baseConfig = require('./webpack-base.config');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const ip = require('ip');
const PAGES_DIR = path.join(__dirname, './src/views/');
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'));

const commonConfig = {

	output: {
		filename: 'js/[name].js',
		path: path.resolve(__dirname, 'dist')
	},

	module: {
		rules: [
			{
				test: /\.pug$/,
				loader: 'pug-loader',
				options: {
					pretty: '\t'
				}
			}
		]
	},

	plugins: [
		new CopyWebpackPlugin([

			// add another local fonts here ..

			{ from: 'src/assets/images', to: 'images' }
		]),


		...PAGES.map(page => new HtmlWebpackPlugin({
			template: `${PAGES_DIR}/${page}`,
			filename: `./${page.replace(/\.pug/, '.html')}`,
			inject: true,
			minify: false
		})),
	]
};

const productionConfig = {

	plugins: [
		new CleanWebpackPlugin(),

		new FaviconsWebpackPlugin({
			logo: './src/assets/favicon.png',
			prefix: 'favicon/'
		})
	]
};

const developmentConfig = {
	devServer: {
		host: ip.address(),
		port: 3007,
		disableHostCheck: true,
		stats: 'errors-only',
		overlay: true,
		open: true
	},
};

module.exports = mode => {

	if (mode === 'production') {
		return merge(commonConfig, productionConfig,baseConfig(mode), { mode })
	}

	return merge(commonConfig, developmentConfig,baseConfig(mode), { mode })
};
