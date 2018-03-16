// pages/wendalist/wendalist.js
const app = getApp();
Page({

     /**
      * 页面的初始数据
      */
     data: {
          wenda:"",
          wendaList: [],
          position: "",
          loadingText: "加载中...",
          loadingHidden: 'false',//默认隐藏更多
          lanmuId:""
     },

     /**
      * 生命周期函数--监听页面加载
      */
     onLoad: function (options) {
          var that = this;
          this.wendaList();
     },

     /**
      * 生命周期函数--监听页面初次渲染完成
      */
     onReady: function () {

     },
     /**
      * 页面上拉触底事件的处理函数
      */
     onReachBottom: function () {
          var that = this;
          if (that.data.loadingHidden) {
               that.setData({
                    loadingHidden: false,
               })
               that.wendaListmore();
               that.setData({
                    loadingHidden: false,
               })
          }
     },
     /**
      * 用户点击右上角分享
      */
     onShareAppMessage: function () {

     },
       //获取当前页面列表数据
   wendaList: function () {
          var that = this;
          return new Promise((resolve, reject) => {
               app.util.wendaList(function (data) {
                    if (data.errmsg) {
                         reject(data)
                    } else {
                         resolve(data);
                         that.setData({
                              wenda: data,
                              wendaList: data.data.contents,
                              position: data.position,
                              lanmuId: data.data.tagId
                         })
                    }
               })
          })
     },
     //加载更多
   wendaListmore:function(){
        var that = this;
        return new Promise((resolve, reject) => {
             app.apiGet(app.apiList.columnListmore, {
                  weeklyId: app.globalData.weeklyId,
                  lanmuId: that.data.lanmuId,
                  position: that.data.position,
             }, function (data) {
                  if (data.errmsg) {
                       reject(data);
                  } else {
                       that.setData({
                            position: data.position,
                            loadingHidden: true,
                            wendaList: that.data.wendaList.concat(data.data.contents)
                       })
                       resolve(data);
                  }
             })
        })
   }
})