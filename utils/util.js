//获取用户信息授权
function authorize() {
     var app = getApp();
     wx.getSetting({
          success(res) {
               console.log(res)
               if (!res.authSetting['scope.userInfo']) {
                    wx.authorize({
                         scope: 'scope.userInfo',
                         success(data) {
                              wx.getUserInfo({
                                   success: function (res) {
                                        wx.setStorageSync('userInfo', res.userInfo);
                                        console.log(res.userInfo)
                                        isAuthorization(res.userInfo);
                                   }
                              })
                         }
                    })
               }
          }
     })
}
//获取首页数据
function homePage(callBack){
 var app=getApp();
 if(wx.getStorageSync('homePage')==""){
  app.loading();
  app.apiGet(app.apiList.homePage,{id:8},function(data){
   if(data.errmsg){
    homePage();
   }else{
     wx.setStorageSync('homePage', data);
     app.hideloading();
     callBack && callBack(data);   
   }
  })
 }else{
      callBack && callBack(wx.getStorageSync('homePage')) 
 }
}

//获取列表页数据
function columnList(callBack) {
     var app = getApp();
     if (wx.getStorageSync('columnList') == "") {
          app.loading();
          app.apiGet(app.apiList.columnList, { weeklyId: app.globalData.weeklyId,lanmuId:869891,size:6}, function (data) {
               if (data.errmsg) {
                    columnList();
               } else {
                    wx.setStorageSync('columnList', data);
                    app.hideloading();
                    callBack && callBack(data);
               }
          })
     } else {
          callBack && callBack(wx.getStorageSync('columnList'))
     }
}
//获取标签列表页数据
function tagList(callBack) {
     var app = getApp();
     if (wx.getStorageSync('taglist') == "") {
          app.loading();
          app.apiGet(app.apiList.tag, { tagId: app.globalData.options.id,size:4}, function (data) {
               if (data.errmsg) {
                    tagList();
               } else {
                    wx.setStorageSync('taglist', data);
                    app.hideloading();
                    callBack && callBack(data);
               }
          })
     } else {
          callBack && callBack(wx.getStorageSync('taglist'))
     }
}
//问题列表
function wendaList(callBack) {
     var app = getApp();
     if (wx.getStorageSync('wenda') == "") {
          app.loading();
          app.apiGet(app.apiList.columnList, { weeklyId: app.globalData.weeklyId, lanmuId: 869871, size: 6 }, function (data) {
               if (data.errmsg) {
                    wendaList();
               } else {
                    wx.setStorageSync('wenda', data);
                    app.hideloading();
                    callBack && callBack(data);
               }
          })
     } else {
          callBack && callBack(wx.getStorageSync('wenda'))
     }
}
//获取当前页面URL参数
function getCurrentPageUrl() {
     var app = getApp();
     var pages = getCurrentPages()    //获取加载的页面
     var currentPage = pages[pages.length - 1]    //获取当前页面的对象
     var options = currentPage.options    //当前页面url参数
     app.globalData.options = options
}
module.exports = {
  authorize:authorize,
  homePage:homePage,
  columnList:columnList,
  tagList: tagList,
  wendaList: wendaList,
  getCurrentPageUrl: getCurrentPageUrl
}
