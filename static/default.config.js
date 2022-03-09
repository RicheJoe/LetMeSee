const path = require("path");
const proxy = require(path.resolve(process.cwd(), "proxy.json"));

function resolve(dir) {
  return path.resolve(process.cwd(), dir);
}

module.exports = {
  productionSourceMap: false,
  devServer: {
    proxy
  },
  configureWebpack: {
    resolve: {
      alias: {
        axios: resolve("node_modules/axios")
      }
    }
  },
  chainWebpack(config) {
    config.resolve.symlinks(false);
  },
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false,
      analyzerMode: "static"
    }
  }
};
