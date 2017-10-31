// pages/vote/vote.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radioItems: [
      { name: 'cell standard', value: '0', checked: 'true'},
      { name: 'cell standard', value: '1' }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: app.globalData.host + 'api/get-vote-info/',
      success:function(res){
        console.log(res.data)
        that.setData({radioItems:res.data})
      }
    })
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
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
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i]['checked'] = radioItems[i].pk == e.detail.value;
      console.log(radioItems);
    }
    this.setData({
      radioItems: radioItems
    });
  },
  voteSubmit: function (e) {
    debugger;
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var formData = e.detail.value;
    wx.request({
      url: app.globalData.host + "api/vote-submit/",
      data: formData,
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'session': wx.getStorageSync('wxapp_session')
      },
      success: function (res) {
        console.log(res)
        if (res.data.status==200) {
          wx.redirectTo({
            url: "../detail/detail?pk=" + e.detail.value.pk,
          })
        }
      }
    })
  }
})