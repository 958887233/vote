var sliderWidth = 100; // 需要设置slider的宽度，用于计算中间位置

Page({
    data: {
        tabs: ["我发起的", "我参与的"],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0,
        weui_icon: '/images/common/weui.png'
    },
    onLoad: function () {
        var that = this;
        wx.getSystemInfo({
            success: function(res) {

              console.log(res);

                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                    sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
                });
            }
        });
    },
    tabClick: function (e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
    }
});