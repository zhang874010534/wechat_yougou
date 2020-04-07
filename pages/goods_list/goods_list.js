// pages/goods_list/goods_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        name: "综合"
      },
      {
        name: "销量"
      },
      {
        name: "价格"
      },
    ],
    tabIndex: 0,
    goodsList:[]
  },
  // 请求的参数
  queryParam: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  // 总数量
  total:0,
  changeTabIndex(e) {
    this.setData({
      tabIndex: e.currentTarget.dataset.index
    })
  },

  getGoodsList() {
    wx.showLoading();
    wx.request({
      url: getApp().baseUrl + 'goods/search',
      data: this.queryParam,
      success: (result) => {
        // 隐藏loading
        wx.hideLoading();
        // 停止下拉刷新动画
        wx.stopPullDownRefresh()
        this.total=result.data.message.total
        this.setData({
          goodsList:this.data.goodsList.concat(result.data.message.goods)
        })
      },
      fail: () => { },
      complete: () => { }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryParam.cid = options.cid
    this.getGoodsList()
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
    this.queryParam.pagenum=1
    this.data.goodsList=[]
    this.getGoodsList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let nowTotal=this.queryParam.pagenum*this.queryParam.pagesize
    if(nowTotal<this.total){
      
      this.queryParam.pagenum++
      this.getGoodsList()
    }else{
      wx.showToast({
        title: '没有下一页数据了',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false,
        success: (result)=>{
          
        },
        fail: ()=>{},
        complete: ()=>{}
      });
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})