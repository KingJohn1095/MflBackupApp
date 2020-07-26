const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
	entry: "./src/index.tsx",
	devtool: "inline-source-map",
	devServer: {
		contentBase: "./dist",
	},
	mode: "development",
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: "Output Management",
			template: "index.html",
		}),
	],
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "babel-loader",
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
		modules: [path.resolve(__dirname, "src"), "node_modules"],
	},
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
	},
};
