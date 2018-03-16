//app.js
var util = require('./utils/util.js'); 
App({
     onLaunch: function () {//console.log('小程序运行开始')
          // 展示本地存储能力
          var logs = wx.getStorageSync('logs') || []
          logs.unshift(Date.now())
          wx.setStorageSync('logs', logs)

          // 登录
          wx.login({
               success: res => {
                    // 发送 res.code 到后台换取 openId, sessionKey, unionId
               }
          })
          // 获取用户信息
          wx.getSetting({
               success: res => {
                    if (res.authSetting['scope.userInfo']) {
                         // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                         wx.getUserInfo({
                              success: res => {
                                   // 可以将 res 发送给后台解码出 unionId
                                   this.globalData.userInfo = res.userInfo

                                   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                                   // 所以此处加入 callback 以防止这种情况
                                   if (this.userInfoReadyCallback) {
                                        this.userInfoReadyCallback(res)
                                   }
                              }
                         })
                    }
               }
          })
     },
     onShow: function () {
          //console.log("在此小程序中")
          var that=this;
          that.init();
     },
     onHide: function () {
          // console.log('不在此小程序中');
     },
     onError: function (msg) {
          console.log('有错误:' + msg);
     },
     config: {
          //接口host11
          host: 'https://www.17getfun.com',
          // host: 'https://sc.ecosports.cn',
          //app名称
          channel: '盖饭汽车'
     },
     globalData: {
          //设备信息
          systemInfo: null,
          //微信用户信息
          userInfo: null,
          //期刊id
          weeklyId:8,
          //页面参数对象
          options:{}
     },
     apiList: {
          //接口列表
          homePage: '/api/content/detailForWeekly',//获取首页数据
          columnList:'/api/content/detailForWeeklyLanmu',//获取栏目页数据
          columnListmore:'/api/content/detailForWeeklyLanmu',//栏目页加载更多
          details:'/discovery/detailForWeeklyDetail',//内容详情页
          tag:'/api/jinliWeekly/tagDetailForJinli', //周刊tag页
          wendacontent:'/api/jinliWeekly/getQuestion',//问题详情页
          questionCate:'/api/jinliWeekly/questionCate',//问题分类
          releasequestion:'api/jinliWeekly/newQuestion'//发布新问题
     },
     init:function(){
          var that = this;
          this.util.authorize();
     },
     apiGet: function (url, data, callback) {
          wx.request({
               url: this.config.host + url,
               data: data,
               method: 'GET',
               dataType: 'json',
               header: {
                    'content-type': 'application/json;charset=UTF-8'
               },
               success: function (res) {
                    callback && callback(res.data)
               },
               fail: function (res) {
                    console.log(url + "请求失败")
               },
               complete: function (res) {
                    // console.log(url + '请求完成');
               }
          })
     },
     apiPost: function (url, data, callback) {
          wx.request({
               url: this.config.host + url,
               data: data,
               method: 'POST',
               dataType: 'json',
               header: {
                    "content-type": "application/x-www-form-urlencoded"
               },
               success: function (res) {
                    callback && callback(res.data);
               },
               fail: function (res) {
               },
               complete: function (res) {
               }
          })
     },
     loading: function () {
          wx.showLoading({
               title: '加载中...',
               mask: true
          });
     },
     hideloading: function () {
          wx.hideLoading();
     },
     util
})