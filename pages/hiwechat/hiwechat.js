Page({

  /**
   * 页面的初始数据
   */
  data: {
    names: [
      { name: "a" },
      { name: "b" },
      { name: "c" },
    ],

    defaultSize: 'mini',
    primarySize: 'mini',
    warnSize: 'default',
    disabled: false,
    plain: false,
    loading: false
  },

  clickStart(e) {
    console.log("start:", e);
    // https://piachh.cn/sd?act=start
    wx.request({
      url: "https://www.piachh.cn/sd?act=start",
      method: "GET",
      data: {},
      header: {
        'Content-Type': "json"
      },
      success: function (res) {
        console.log(res)
      }
    });
  },

  clickStop(e) {
    console.log("stop:", e);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.trace()
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
    
  }
})