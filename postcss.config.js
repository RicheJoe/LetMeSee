module.exports = {
    // plugins : {
    //     autoprefixer:{},
    //     "post-px-to-viewer":{
    //         viewportWidth:375,//视窗的宽度，对应的是我们设计稿的宽度
    //         viewportHight:667,//视窗的高度，对应的是我们设计稿的高度 也可不配置
    //         unitPrecision:5,//指定px转化为视窗单位值的小数位数，因为很多时候无法整除
    //         viewportUnit:'vw',//指定需要转化成的视窗单位，建议使用vw
    //         selectorBlackList:['ignore','tab-bar','tab-bar-item'],//指定不需要转换的类
    //         minPixeValue:1,//小于或等于1px不转换
    //         mediaQuery:false //允许在媒体查询中转化px
    //     },
    // }
    plugins: {
        autoprefixer: {}
      }
}