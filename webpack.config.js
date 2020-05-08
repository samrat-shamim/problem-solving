module.exports = {
  entry: './src/index.js',
  output: {
    filename: './test.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      { test: /.tsx?$/, loader: 'ts-loader' }
    ]
  },
  optimization: {
    minimize: false
  },
  devtool: 'source-map',
  mode: 'development'
}