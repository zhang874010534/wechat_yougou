// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    // 总价
    totalPrice: 0,
    // 结算后面的数量
    num: 0,
    // 全选checkbox
    checkAll: false
  },
  // 封装一下
  wxChooseAddress() {
    wx.chooseAddress({
      success: (result) => {
        wx.setStorageSync("address", result);
      },
    });
  },
  getReceiveAddress() {
    wx.getSetting({
      success: (result) => {
        let scopeAddress = result.authSetting["scope.address"]
        // 如果点过了取消 那么打开设置页面 没有就直接获取
        if (scopeAddress === false) {
          // 打开授权设置页面
          wx.openSetting({
            success: (result) => {
              this.wxChooseAddress()
            }
          });
        } else {
          this.wxChooseAddress()
        }
      }
    });
  },
  // 单选框
  handleCheckData(e) {
    this.data.cart.some((val) => {
      if (val.goods_id === e.currentTarget.dataset.id) {
        val.checked = !val.checked
        return true
      }
    })
    this.handleCart()
    wx.setStorageSync("cart", this.data.cart);
  },
  handleCart() {
    let sum = 0, num = 0, check = true;
    this.data.cart.forEach((val) => {
      if (val.checked) {
        sum += val.goods_price * val.num
        num += val.num
      } else {
        check = false
      }
    })
    this.setData({
      totalPrice: sum,
      num,
      checkAll: check
    })
  },

  // 全选checkbox
  allChooseCheck() {
    let { checkAll, cart } = this.data
    checkAll = !checkAll
    cart.forEach((v) => {
      v.checked = checkAll
    })
    this.setData({
      cart,
      checkAll
    })
  },
  // 商品加减
  handleNum(e) {
    let { id, num } = e.currentTarget.dataset
    let { cart } = this.data
    cart.some((v) => {
      if (v.goods_id === id) {
        // 数量不能小于1
        if (v.num === -num) {
          wx.showToast({
            title: '无法更少啦',
            icon: 'none',
            duration: 1500,
            mask: true,
          });
          return;
        }
        v.num += num
      }
    })
    wx.setStorageSync("cart", cart);
    this.setData({
      cart
    })
    // 结算和全选的计算
    this.handleCart()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    let address = wx.getStorageSync("address");
    // 获取购物车列表
    let cart = wx.getStorageSync("cart");
    this.setData({
      address,
      cart
    })
    this.handleCart()
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