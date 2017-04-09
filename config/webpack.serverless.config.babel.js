import webpack from 'webpack'

const config = {
  target: 'node',
  entry: './handler.source.js',
  output: {
    libraryTarget: 'commonjs',
    filename: 'serverless/handler.js'
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.json']
  },
  externals: ['aws-sdk'],
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.dot$/,
        use: 'raw-loader'
      }
    ]
  },
  /*plugins: [
    new webpack.NormalModuleReplacementPlugin(/\/iconv-loader$/, 'node-noop')
  ]*/
}

export default config
