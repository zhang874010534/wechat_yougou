// pages/goods_detail/goods_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailObj: {}
  },
  getDetailData(id) {
    wx.request({
      url: getApp().baseUrl + 'goods/detail',
      data: { goods_id: id },
      success: (result) => {
        this.setData({
          detailObj: result.data.message
        })
      },
      fail: () => { },
      complete: () => { }
    });
  },

  previewImage(e) {
    let urls = this.data.detailObj.pics.map(v => v.pics_mid)
    wx.previewImage({
      current: e.currentTarget.dataset.current,
      urls: urls,
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });
  },
  // 加入购物车
  addCart() {
    let cart = wx.getStorageSync('cart') || [];
    let index = cart.findIndex(v => v.goods_id === this.data.detailObj.goods_id)
    if (index === -1) {
      this.data.detailObj.num=1
      cart.push(this.data.detailObj)
    } else {
      cart[index].num++
    }
    wx.setStorageSync("cart", cart);
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      duration: 1500,
      mask: true,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDetailData(options.id)
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