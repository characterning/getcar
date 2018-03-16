// pages/tag/tag.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
     taglist:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
       var that = this;
       app.util.getCurrentPageUrl();
       this.tagList();
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
  //获取当前tag页面列表数据
  tagList: function () {
       var that = this;
       return new Promise((resolve, reject) => {
            app.util.tagList(function (data) {
                 if (data.errmsg) {
                      reject(data)
                 } else {
                      resolve(data);
                      that.setData({
                           taglist: data
                      })
                 }
            })
       })
  },
})