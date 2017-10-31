//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    url: 'detail/detail',
    weui_icon: '/images/common/weui.png',
    vote_list:{}
  },
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.globalData.host + 'api/vote-list/',
      data: { 'wxapp_session': wx.getStorageSync('wxapp_session') },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log(res)
        that.setData({ vote_list: res.data })
      },
      fail: function () {
        console.log("获取列表失败！")
      }
    })
  },
  onReady: function(){

  },
  onShow: function() {

  }
})
