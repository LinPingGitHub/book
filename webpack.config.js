// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
//   .BundleAnalyzerPlugin;

// if(process.env.NODE_ENV === "production"){
//     module.exports = {
//         plugins:[new BundleAnalyzerPlugin()],
//     }
// }else{
//     module.exports = {
        
//     }
// }


const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

if (process.env.NODE_ENV === "production") {
  module.exports = {
    devtool: "none",//去掉源码地图
    plugins: [new BundleAnalyzerPlugin()],
    externals: {//告诉webpack不要对公共库进行打包
      vue: "Vue",//不要对vue进行打包，到时候会提供一个全局变量Vue
      vuex: "Vuex",
      "vue-router": "VueRouter",
      axios: "axios",
    },
  };
} else {
  module.exports = {};
}
