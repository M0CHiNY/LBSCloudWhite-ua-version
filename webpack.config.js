/**
 * Webpack main configuration file
 */

const path = require("path");
const fs = require("fs");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const pages = [
  "blog",
  "info",
  "customization",
  "crm",
  "integrations",
  "human-resources",
  "project-manager",
  "contact-center",
  "website-builder",
  "finance",
  "prices",
  "production",
  "warehouse",
  "point-of-sale",
  "single-blog-1",
  "single-blog-2",
  "single-blog-3",
  "single-blog-4",
  "single-blog-5",
  "single-blog-6",
  "single-blog-7",
]; 
// list pages
const environment = require("./configuration/environment");

const templateFiles = fs
  .readdirSync(environment.paths.source)
  .filter((file) =>
    [".html", ".ejs"].includes(path.extname(file).toLowerCase())
  )
  .map((filename) => ({
    input: filename,
    output: filename.replace(/\.ejs$/, ".html"),
  }));

const htmlPluginEntries = templateFiles.map(
  (template) =>
    new HTMLWebpackPlugin({
      inject: true,
      hash: false,
      filename: template.output,
      template: path.resolve(environment.paths.source, template.input),
      favicon: path.resolve(environment.paths.source, "images", "favicon.ico"),
    })
);

module.exports = {
  entry: {
    app: path.resolve(environment.paths.source, "js", "app.js"),
  },
  output: {
    filename: "js/[name].js",
    path: environment.paths.output,
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.((c|sa|sc)ss)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(png|gif|jpe?g|svg)$/i,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: environment.limits.images,
          },
        },
        generator: {
          filename: "images/design/[name].[hash:6][ext]",
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: environment.limits.images,
          },
        },
        generator: {
          filename: "images/fonts/[name].[hash:6][ext]",
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      "...",
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            // Lossless optimization with custom option
            // Feel free to experiment with options for better result for you
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              // Svgo configuration here https://github.com/svg/svgo#configuration
              [
                "svgo",
                {
                  plugins: [
                    {
                      name: "removeViewBox",
                      active: false,
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],
  },

  plugins: [
    pages.forEach(
      (page) =>
        new HTMLWebpackPlugin({
          template: path.resolve(__dirname, "src", `${page}.html`), // Використовуємо змінну "page" для підбору файлу
          filename: `${page}.html`, // Генеруємо ім'я файлу на основі сторінки
          inject: "body",
        })
    ),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
    new CleanWebpackPlugin({
      verbose: true,
      cleanOnceBeforeBuildPatterns: ["**/*", "!stats.json"],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(environment.paths.source, "images", "content"),
          to: path.resolve(environment.paths.output, "images", "content"),
          toType: "dir",
          globOptions: {
            ignore: ["*.DS_Store", "Thumbs.db"],
          },
        },
        {
          from: path.resolve(environment.paths.source, "videos"),
          to: path.resolve(environment.paths.output, "videos"),
          toType: "dir",
          globOptions: {
            ignore: ["*.DS_Store", "Thumbs.db"],
          },
        },
      ],
    }),
  ].concat(htmlPluginEntries),
  target: "web",
};
