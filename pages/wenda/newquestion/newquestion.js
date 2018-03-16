// pages/wenda/newquestion/newquestion.js
const app=getApp();
Page({

     /**
      * 页面的初始数据
      */
     data: {
          questionCate:[],
          index:"0",
          placeholder: "请输入问题(最多30字）",
          describeplaceholder: "请输入问题描述",
          title: '',
          describe: ''
     },

     /**
      * 生命周期函数--监听页面加载
      */
     onLoad: function (options) {
     var that=this;
     that.questionCate()
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
     questionCate:function(){
     var that=this;
     return new Promise((resolve, reject) => {
          app.apiGet(app.apiList.questionCate, {}, function (data) {
               if (data.errmsg) {
                    reject(data);
               } else {
                    var array = ["请输入问题分类"];
                    for(var i in data.data){
                         array.push(data.data[i].name)
                    }
                    that.setData({
                         questionCate: array
                    })
                    resolve(data);
               }
          })
     })
     },
     bindPickerChange: function (e) {
          console.log(e.detail.value)
          this.setData({
               index: e.detail.value
          })
     },
     bindTextAreaBlur: function (e) {
          var that = this;
          that.setData({
               title: e.detail.value
          })
     },
     describeAreaBlur: function (e) {
          var that = this;
          that.setData({
               describe: e.detail.value
          })
     },
     release: function () {
          var that = this;
          if (that.data.index != "0" && that.data.title != "" && that.data.describe != "") {
               console.log("提交成功")
               app.apiGet(app.apiList.releasequestion, {}, function (data) {
                    if (data.errmsg) {
                         reject(data);
                    } else {
                         resolve(data);
                         wx.showToast({
                              title: '提问成功',
                              icon: 'success',
                              duration: 1500
                         })
                    }
               })
          }else{
               wx.showToast({
                    title: '问题不完整',
                    icon: 'none',
                    duration: 1500
               })
          }
     }
})