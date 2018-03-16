// pages/column/column.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
       column:"",
       columnList:[],
       position:"",
       loadingText:"加载中...",
       loadingHidden:'false' ,//默认隐藏更多
       lazyload:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
       var that = this;
       this.columnList();
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
            that.columnListmore();
            that.setData({
                 loadingHidden: false,
            })
       }
  },
  //获取当前页面列表数据
  columnList: function () {
       var that = this;
       return new Promise((resolve, reject) => {
            app.util.columnList(function (data) {
                 if (data.errmsg) {
                      reject(data)
                 } else {
                      resolve(data);
                      that.setData({
                           column:data,
                           columnList:data.data.contents,
                           position:data.position,
                           lanmuId:data.data.tagId
                      })
                 }
            })
       })
  },
  //加载更多
columnListmore:function() {
     var that = this;
     return new Promise((resolve, reject) => {
          app.apiGet(app.apiList.columnListmore, {
               weeklyId: app.globalData.weeklyId,
               lanmuId:that.data.lanmuId,
               position:that.data.position,
          }, function (data) {
               if (data.errmsg) {
                    reject(data);
               } else {
                    that.setData({
                         position:data.position,
                         loadingHidden: true,
                         columnList: that.data.columnList.concat(data.data.contents)
                    })
                    resolve(data);
               }
          })
     })
     }
})