Page({

  /**
   * 主页的初始数据
   */
  data: {
          "sliderImgs": [{
                  "id": 1,
                  "url": "http://p1.meituan.net/codeman/826a5ed09dab49af658c34624d75491861404.jpg"
          },
          {
                  "id": 2,
                  "url": "http://p0.meituan.net/codeman/daa73310c9e57454dc97f0146640fd9f69772.jpg"
          },
          {
                  "id": 3,
                  "url": "http://p0.meituan.net/codeman/a97baf515235f4c5a2b1323a741e577185048.jpg"
          }],

        "contentLists":[],
        "shopLists":[],
        flag:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        wx.showLoading({ //显示 loading 提示框
                title: '加载中'
        })
        wx.request({
                url: "https://locally.uieee.com/categories",
                data: { _limit:8 },
                success: (res) => {
                        this.setData({
                                "contentLists": res.data,
                                flag:false
                        })
                        wx.hideLoading();
                },
        })

        this.onLoadShopList(); 
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

  onLoadShopList:function(){
        wx.request({
                url: "https://locally.uieee.com/shops",
                data: {
                        _limit: 10
                },
                success: (res) => {
                        this.setData({
                                "shopLists": res.data
                        })
                },
        })
    }
})