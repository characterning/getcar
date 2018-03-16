// pages/wenda/wencontent/wencontent.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
       wendacontent:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
       var that = this;
       app.util.getCurrentPageUrl();
       this.wendacontent();
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  wendacontent:function(){
       var that = this;
       return new Promise((resolve, reject) => {
            app.apiGet(app.apiList.wendacontent, {
                 id: app.globalData.options.id
            }, function (data) {
                 if (data.errmsg) {
                      reject(data);
                 } else {
                      that.setData({
                           wendacontent: data,
                      })
                      resolve(data);
                 }
            })
       })
  }
})