const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
  entry: './src/index.jsx', // Entry point of our application
  output: {
    path: path.resolve(__dirname, "dist"), // Output compiled files into dist directory
    filename: 'app.bundle.js' // Bundle all ffiles to app.bundle.js
  },
  resolve: {
    extensions: ['.js', '.jsx'] // Automatically resolve this extensions
  },
  mode: 'development',
  devtool: "sourcemap", // Generate source maps for our compiled files so it's easier to debug in the browser
  module: {
    rules: [
      {
        test: /\.jsx?$/, // For all jsx files ...
        exclude: /node_modules/, // excluding the ones inside node_modules ...
        include: [
          path.resolve(__dirname, 'src') // and including all inside the src directory ...
        ],
        use: {
          loader: "babel-loader", // use the bable loader ...
          options: {
            presets: [ // that will ...
              "@babel/react", // compile react ...
              "@babel/preset-env" // and use the latest JavaScript ...
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties', // also unclude the class properties future JavaScript
            ]
          }
        },
      },
      {
        test: /\.css$/, // For all css files use given loaders
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.html$/, // For all html files use given loaders
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebPackPlugin({ // use the html plugin when building the application to 
      template: "./index.html", // use the index html file (located in the main folder)
      filename: "index.html", // and outout another index html insude the dev folder with the bundles generated form webpack included
    })
  ]
};
