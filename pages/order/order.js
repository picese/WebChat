//index.js
//获取应用实例
const app = getApp()

Page({
        data: {
                txtcode: '',
                name: "",
                img: '',
                // 统计商品数量和价格
                count: {
                        num: 0,
                        money: 0
                },
                bottomFlag: false,
                // 提交的订单
                orders: true,
                items: [],
        },

        // 点击结账按钮
        pay: function () {
                var that = this;
                var str = '选中' + that.data.count.num + '件商品，共' + that.data.count.money + '元，是否要支付？'
                wx.showModal({
                        title: '提示',
                        content: str,
                        success: function (res) {
                                // 至少选中一个商品才能支付
                                if (res.confirm) {
                                        // 打开扫码功能
                                        wx.scanCode({
                                                onlyFromCamera: true,
                                                success: (res) => {
                                                        wx.redirectTo({
                                                                url: '../pay/pay'
                                                        });
                                                }
                                        });
                                } else if (res.cancel) {
                                        console.log('用户点击取消')
                                }
                        }
                })
        },
        onLoad: function (options) {
                var that = this;
                // 取出订单传过来的数据
                wx.getStorage({
                        key: 'orders',
                        success: function (res) {
                                that.setData({
                                        items: res.data,
                                        name: options.title,
                                        img: options.img
                                });
                                // 价格统计汇总
                                var money = 0;
                                var num = res.data.length;
                                res.data.forEach(item => {
                                        money += (item.price * item.num); // 总价格求和
                                });
                                var count = {
                                        num,
                                        money
                                }
                                // 设置显示对应的总数和全部价钱
                                that.setData({
                                        count
                                });
                        }
                })
        },
        getcode: function (event) {
                this.setData({
                        txtcode: event.detail.value
                });
        }
})