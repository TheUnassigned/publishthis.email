import nodeExternals from 'webpack-node-externals'

const config = {
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  entry: './express/server.js',
  output: {
    libraryTarget: 'commonjs',
    filename: 'express/server.build.js'
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.json']
  },
  externals: [nodeExternals()],
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
  }
}

export default config
