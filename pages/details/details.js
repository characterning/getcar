// pages/details/details.js
var WxParse = require('../../wxParse/wxParse.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
       details:"",
       detailsList:[],
       position:"",
       id:"",
       selfTag:"",
       loadingText: "加载中...",
       loadingHidden: 'false',//默认隐藏更多
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
       var that = this;
       app.util.getCurrentPageUrl();
       this.details();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
       var that=this;
       if (that.data.loadingHidden) {
            that.setData({
                 loadingHidden: false,
            })
            that.detailListmore();
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
  //获取内容详情
    details: function () {
       var that = this;
       return new Promise((resolve, reject) => {
            app.apiGet(app.apiList.details, {
                 id:app.globalData.options.id
            }, function (data) {
                 if (data.errmsg) {
                      reject(data);
                 } else {
                      var detailcontent = data.data.content.content.detail.replace(/data-/g,"");
                      WxParse.wxParse('article', 'html', detailcontent,that,5)
                      that.setData({
                           details: data,
                           detailsList: data.data.relatedContents,
                           position: data.position,
                           id: data.data.content.content.id,
                           selfTag: data.data.selfTag
                      })
                      resolve(data);
                 }
            })
       })
  },
    //加载更多
    detailListmore: function () {
         var that = this;
         return new Promise((resolve, reject) => {
              app.apiGet(app.apiList.details, {
                   id: 3058896,
                   position: that.data.position,
              }, function (data) {
                   if (data.errmsg) {
                        reject(data);
                   } else {
                        that.setData({
                             position: data.position,
                             loadingHidden: true,
                             detailsList: that.data.detailsList.concat(data.data.relatedContents)
                        })
                        resolve(data);
                   }
              })
         })
    }
})