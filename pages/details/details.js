// pages/details/details.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    detailsContent: [],
    tabIndex: 0,
    title:'',
    img:'',
    NavBarIndex: 0,
    orderCount: {
      num: 0,
      money: 0
    }, // 统计商品数量和价格
    bottomFlag: false,
    // 提交的订单
    orders: true,

    NavBarMenus: [
      {
        id: 1,
        name: "点餐"
      },
      {
        id: 2,
        name: "评论"
      },
      {
        id: 3,
        name: "商家"
      }
    ],

    menus: [
      {
        id: 1,
        menu: "菜单一"
      },
      {
        id: 2,
        menu: "菜单二"
      },
      {
        id: 3,
        menu: "菜单三"
      }
    ],

    // 商品列表
    items: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 根据首页导航传输过来的值设置标题
    if (options.title) {
      wx.setNavigationBarTitle({
        title: options.title
      });
    }

    wx.request({
      url: "https://locally.uieee.com/shops/?id=" + this.options.cat + "", //后端接口
      data: {},
      success: res => {
        this.setData({
          detailsContent: res.data,
          items: item,
          title: options.title,
          img:options.img
        });
      }
    });

    var item = [];
    for (var i = 1; i <= 7; i++) {
      item.push({
        id: i,
        title: options.title + i,
        price: 10 + i,
        active: false,
        num: 0,
        img: options.img
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},

  // 导航切换事件
  NavBarMenu: function(event) {
    var index = event.target.dataset.index;
    this.setData({
      NavBarIndex: index
    });
  },

  // 点餐tab栏切换事件
  tabMenu: function(event) {
    var index = event.target.dataset.index;
    this.setData({
      tabIndex: index
    });
  },

  // 点击去结账
  card: function() {
    var that = this;
    // 判断是否有选中商品
    if (that.data.orderCount.num !== 0) {
      // 跳转到购物车订单也
      wx.navigateTo({
        url: "../order/order?title="+this.data.title+"&img="+that.data.img+""
      });
    }
  },

  // 添加 or 减少
  add: function(event) {
    var that = this;
    var id = event.target.dataset.id;
    var index = event.target.dataset.index;
    var param = this.data.items[index];
    var subOrders = []; // 购物单列表存储数据
    param.active = true;
    // 添加还是减少
    if (event.target.id == "add") {
      param.num++; // 每点一次增加1
    } else {
      if (param.num === 0) {
        return false;
      }
      param.num--; // 每点一次减少1
    }
    // 设置商品数量
    that.setData({
      items: this.data.items
    });
    // 将已经确定的商品添加到购物单列表
    this.data.items.forEach(item => {
      if (item.active) {
        subOrders.push(item);
        if (item.num === 0) {
          subOrders.pop(item);
        }
      }
    });
    //判断底部提交菜单显示隐藏
    if (subOrders.length == 0) {
      that.setData({
        bottomFlag: false
      });
    } else {
      that.setData({
        bottomFlag: true
      });
    }
    var money = 0;
    var num = 0;
    // 将已经确定总价格和数量求和
    this.data.items.forEach(item => {
      money += item.price * item.num;
      num += item.num;
    });
    var orderCount = {
      num,
      money
    };
    // 设置显示对应的总数和全部价钱
    this.setData({
      orderCount
    });

    wx.setStorage({
      key: "orders",
      data: subOrders
    });
  }
});
