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

    startdisable: false,
    stopdisable: true,

    switchBg: "../images/start.png",

    listData: [],

    defaultSize: 'mini',
    primarySize: 'mini',
    warnSize: 'default',
    disabled: false,
    plain: true,
    loading: false
  },

  updatelistData(res) {
    console.log("updatelistData", res.data)

    var today = new Date()//.setHours(0, 0, 0, 0)
    today.setHours(0, 0, 0, 0)
    for (var i in res.data) {
      res.data[i].CostSeconds = this.formatSeconds(res.data[i].CostSeconds)

      var time = res.data[i].StartTime
      time = time.replace(/-/g, ':').replace(' ', ':');
      time = time.split(':');
      var t = new Date(time[0], (time[1] - 1), time[2], time[3], time[4], time[5]);
      //console.log("today:", today.toString(), "t:", t.toString())
      if (today > t) {
        res.data[i].State = 99 // 非今日数据
      }
    }

    this.setData({
      ['listData']: res.data
    })

    this.refreshButton()
  },

  formatSeconds(value) {
    var secondTime = parseInt(value);// 秒
    var minuteTime = 0;// 分
    var hourTime = 0;// 小时
    if(secondTime > 60) {
        minuteTime = parseInt(secondTime / 60);
        secondTime = parseInt(secondTime % 60);
        if (minuteTime > 60) {
          hourTime = parseInt(minuteTime / 60);
          minuteTime = parseInt(minuteTime % 60);
        }
      }
      var result = "" + parseInt(secondTime) + "秒";

      if (minuteTime > 0) {
        result = "" + parseInt(minuteTime) + "分" + result;
      }
      if (hourTime > 0) {
        result = "" + parseInt(hourTime) + "小时" + result;
      }
      return result;
  },

  refreshButton() {
    if (this.data.listData[0]['State'] > 0) {
      console.log("refreshButton:", 1);
      this.setData({
        ['startdisable']: false,
        ['stopdisable']: true,
        ['switchBg']: "../images/start.png"
      })
    } else {
      console.log("refreshButton:", 0);
      this.setData({
        ['startdisable']: true,
        ['stopdisable']: false,
        ['switchBg']: "../images/stop.png"
      })
    }
  },

  clickMore(e) {
    console.log("clickMore:", e);
    wx.request({
      url: "https://www.piachh.cn/sd?act=statist",
      method: "GET",
      data: {},
      header: {
        'Content-Type': "json"
      },
      success: function (ret) {

        wx.showModal({
          title: 'ヾ(；ﾟ(OO)ﾟ)ﾉ',
          content: ret.data,
          showCancel: false,
          success: function (res) {
            if (res.confirm) {//这里是点击了确定以后
              console.log('用户点击确定')
            } else {//这里是点击了取消以后
              console.log('用户点击取消')
            }
          }
        })
      }
    });


  },

  clickStart(e) {
    this.setData({
      ['listData']: []
    })
    console.log("start:", e);
    // https://piachh.cn/sd?act=start
    // idinfolist = []
    wx.request({
      url: "https://www.piachh.cn/sd?act=start",
      method: "GET",
      data: {},
      header: {
        'Content-Type': "json"
      },
      success: this.updatelistData
    });
  },

  clickStop(e) {
    this.setData({
      ['listData']: []
    })
    console.log("stop:", e);
    wx.request({
      url: "https://www.piachh.cn/sd?act=stop",
      method: "GET",
      data: {},
      header: {
        'Content-Type': "json"
      },
      success: this.updatelistData
    });
  },

  clickSwitch(e) {
    console.log("clickSwitch:", this.data.startdisable, e);
    if (this.data.startdisable) {
      // stop
      this.clickStop(e)
    } else {
      this.clickStart(e)
    }
  },

  getData() {
    // this.setData({
    //   ['listData']: []
    // })
    console.log("getData");
    wx.request({
      url: "https://www.piachh.cn/sd?act=get",
      method: "GET",
      data: {},
      header: {
        'Content-Type': "json"
      },
      success: this.updatelistData
    });
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
    this.getData()
    setInterval(this.getData, 6000);
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