//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: function(res) {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res)
        if (res.code){
        wx.request({
          url: "http://127.0.0.1:5000/api/login/",
          method: 'GET',
          header: {
            'content-type': 'application/json' // 默认值
          },
          data: {'code': res.code},
          success: function(res){
            console.log(res)
          },
          fail: function(){
            console.log("启用wx.login登陆失败！");
          },
          complete: function(){
            console.log("启用wx.login登陆成功！");
          }
        })
        } else {
          console.log('获取登陆状态失败！' + res.errMsg)
        }
      }
    })
    // 获取用户信息
    // wx.getSetting({
    //   success: function(res){
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: function(res) {
    //           console.log(res)
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //     if (res.authSetting['scope.userLocation']){
    //       wx.getLocation({
    //         success: function(res) {
    //           console.log(res.latitude)

    //         }
    //       })
    //     }
    //   }
    // })
  },
  globalData: {
    userInfo: null
  }
})