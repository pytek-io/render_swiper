const path = require("path");

module.exports = (env, argv) => {
  const production = argv.mode === "production";
  return {
    watch: !production,
    mode : production ? "production" : "development",
    entry: { index: path.resolve(__dirname, "src", "index.jsx") },
    output: {
      publicPath: "/js_files/",
      filename: '../../js/index.js',
      chunkFilename: "../../js/[contenthash].[name].js",
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", "scss", "css"],
    },
    externals: {
      "react": "React",
      "react-dom": "ReactDOM",
      "render": "render",
    },
    module: {
      rules: [
        {
          test: /\.less$/i,
          use: [
            {
              loader: "style-loader",
            },
            {
              loader: "css-loader",
            },
            {
              loader: "less-loader",
              options: {
                lessOptions: {
                  javascriptEnabled: true,
                },
              },
            },
          ],
        },
        {
          test: /\.tsx?$/,
          use: "babel-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.ts?$/,
          use: "babel-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.scss$/,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.jsx/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
      ],
    },
  };
};
