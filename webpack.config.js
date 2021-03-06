const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const { PUBLIC_URL, TITLE } = require("./Config");
const publicURLRoot = "/" + PUBLIC_URL;
const SPATitle = TITLE;

module.exports = (_, { mode = "production" }) => {
  const isProduction = mode === "production";
  const isDevelopment = !isProduction;
  process.env.NODE_ENV = mode;
  process.env.BABEL_ENV = mode;
  const commonCSSLoaders = [
    isProduction ? MiniCssExtractPlugin.loader : "style-loader",
    "css-loader",
    {
      loader: "postcss-loader",
      options: {
        ident: "postcss",
        plugins: [require("postcss-preset-env")]
      }
    }
  ];
  const config = {
    mode,
    entry: "./src/js/index.tsx",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "js/[name].[hash:10].js",
      publicPath: publicURLRoot.replace(/\/+/g, "/")
    },
    module: {
      rules: [
        {
          test: /\.(t|j)sx?$/i,
          exclude: /node_modules/,
          loader: "eslint-loader",
          enforce: "pre"
        },
        {
          oneOf: [
            {
              test: /\.css$/i,
              use: [...commonCSSLoaders]
            },
            {
              test: /\.less$/i,
              use: [...commonCSSLoaders, "less-loader"]
            },
            {
              test: /\.scss$/i,
              use: [
                ...commonCSSLoaders,
                "sass-loader",
                {
                  loader: "sass-resources-loader",
                  options: {
                    resources: ["src/css/global.scss"]
                  }
                }
              ]
            },
            {
              test: /\.(jpe?g|png|gif|svg)$/i,
              loader: "url-loader",
              options: {
                limit: 8 * 1024,
                name: "[contenthash:10].[ext]",
                outputPath: "imgs",
                publicPath: `${publicURLRoot}/imgs`.replace(/\/+/g, "/")
              }
            },
            {
              test: /\.jsx?$/i,
              exclude: /node_modules/,
              loader: "babel-loader"
            },
            {
              test: /\.tsx?$/i,
              exclude: /node_modules/,
              use: [
                "babel-loader",
                { loader: "ts-loader", options: { transpileOnly: true } }
              ]
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      alias: {
        Config: path.resolve(__dirname, "Config.js")
      }
    },
    optimization: {
      splitChunks: {
        chunks: "all"
      }
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin({
        async: false,
        memoryLimit: 4096
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        filename: "index.html",
        title: SPATitle,
        minify: {
          removeComments: isProduction,
          collapseWhitespace: isProduction
        },
        favicon: "public/favicon.ico"
      }),
      isProduction &&
        new MiniCssExtractPlugin({ filename: "css/main.[contenthash:10].css" }),
      isProduction && new OptimizeCssAssetsPlugin(),
      isProduction &&
        new webpack.DllReferencePlugin({
          manifest: path.resolve(__dirname, "dll/manifest.json")
        }),
      isProduction &&
        new AddAssetHtmlPlugin({
          filepath: path.resolve(__dirname, "dll/react.js"),
          hash: true,
          outputPath: "js",
          publicPath: `${publicURLRoot}/js`.replace(/\/+/g, "/")
        }),
      isProduction && new CopyPlugin(["public/404.html"])
    ].filter(Boolean),
    devServer: {
      compress: true,
      hot: true,
      contentBase: path.resolve(__dirname, "public"),
      contentBasePublicPath: publicURLRoot.replace(/\/+/g, "/"),
      historyApiFallback: {
        rewrites: [{ from: "/./", to: publicURLRoot.replace(/\/+/g, "/") }]
      }
    },
    performance: {
      assetFilter(assetFilename) {
        return assetFilename.endsWith(".js");
      }
    },
    devtool: isProduction ? "source-map" : "eval-cheap-module-source-map"
  };
  return config;
};
