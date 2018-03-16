
//index.js
//获取应用实例
const app = getApp();
Page({
     data: {
          homePageArray:[],
          indicatorDots: true,// 是否显示面板指示点
          autoplay:true, //是否自动切换
          circular:true,//是否衔接滑动
          interval:2000,//自动切换时间间隔
          duration: 200 //滑动动画时长
     },
     onLoad: function () {
    var that=this;
    this.homePage();
     },
     //获取首页数据
     homePage: function () {
          var that = this;
          return new Promise((resolve, reject) => {
               app.util.homePage(function (data) {
                    if (data.errmsg) {
                         reject(data)
                    } else {
                         resolve(data);
                         that.setData({
                              homePageArray:data
                         })
                    }
               })
          })
     }
})
