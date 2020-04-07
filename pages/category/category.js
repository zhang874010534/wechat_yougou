// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧数据
    leftData: [],
    // 右侧数据
    rightData: [],
    currentIndex: 0,
    scrollTop: 0
  },

  // 接口返回的数据
  Cates: [],
  getCate() {
    wx.request({
      url: getApp().baseUrl + 'categories',
      success: (result) => {
        this.Cates = result.data.message
        this.setData({
          leftData: this.Cates.map(val => val.cat_name),
          rightData: this.Cates[0].children
        })
        wx.setStorageSync("cates", { date: Date.now(), data: this.Cates });
      },
      fail: () => { },
      complete: () => { }
    });
  },
  // 点击左侧菜单item
  changeIndex(e) {
    let { index } = e.currentTarget.dataset
    this.setData({
      currentIndex: index,
      rightData: this.Cates[index].children,
      scrollTop: 0
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let cates = wx.getStorageSync("cates")
    if (!cates) {
      this.getCate()
    } else {
      if (Date.now() - cates.date > 1000 * 5) {
        this.getCate()
      } else {
        // 使用本地数据
        this.Cates = wx.getStorageSync("cates").data;
        this.setData({
          leftData: this.Cates.map(val => val.cat_name),
          rightData: this.Cates[0].children
        })
      }

    }
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