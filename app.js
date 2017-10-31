//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that =this;

// 登录
wx.login({
  success: function (res_login) {
    // 发送 res.code 到后台换取 openId, sessionKey, unionId
    console.log(res_login)
    if (res_login.code) {
      wx.getUserInfo({
        success: function (res_user) {
          console.log(res_user)
          wx.request({
            url: that.globalData.host + 'api/login/',
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            data: {
              code: res_login.code,
              nickname: res_user.userInfo.nickName,
              // encryptedData: res_user.encryptedData,
              // iv: res_user.iv
            },
            success: function (res_session) {
              console.log(res_session)
              wx.setStorageSync('wxapp_session', res_session.data.wxapp_session)
            },
            fail: function () {
              console.log("启用wx.login登陆失败！");
            }
          })
          // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          // 所以此处加入 callback 以防止这种情况
          if (this.userInfoReadyCallback) {
            this.userInfoReadyCallback(res)
          }
        }
      })  
    } else {
      console.log('获取登陆状态失败！' + res.errMsg)
    }
  }
})
},
  onShow: function () {

  },
  globalData: {
    userInfo: null,
    host: "http://192.168.2.79:5000/"
  }
})