const path = require('path')

module.exports = {
  mode: 'none',
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js'
  }
}