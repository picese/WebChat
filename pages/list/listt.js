// pages/list/listt.js
Page({

        /**
         * 页面的初始数据
         */
        data: {
                "contents": [],
                limit: 15, // 初始化数据的条数
                page: 0, // 初始化数据的页数
                catId: 1, // 初始化传输过来id的值
                hasMore: true,
                all: true
        },

        //自定义函数
        loadMore: function() {
                //判断是否还有数据 (如果不等于当前分类的数据的总数并且当前分类的数据的总数要大于0)
                if (!this.data.hasMore && this.data.contents.length > 0) return wx.showToast({
                        title: '到底了',
                        success() {
                                //导航加载关闭
                                wx.hideNavigationBarLoading()
                        }
                });
                // 后端交互
                wx.request({
                        url: "https://locally.uieee.com/categories/" + this.data.catId + "/shops", // 后端接口
                        data: { 
                        // 数据渲染到页面的条数和页数
                                _limit: this.data.limit,
                                _page: ++this.data.page,
                        },
                        success: (res) => { // 连接成功后渲染数据
                                var newList = this.data.contents.concat(res.data); // 把当前数据和加载后的数据拼接到一起
                                var count = res.header['X-Total-Count'] - 0;
                                var flag = this.data.page * this.data.limit < count;
                                wx.hideLoading() //隐藏 loading 提示框
                                this.setData({
                                        "contents": newList,
                                        hasMore: flag, // 把拼接到的数据输出到页面
                                        all: count
                                })
                        }
                });
                
        },
        /**
         * 生命周期函数--监听页面加载
         */
        onLoad: function(options) {
                wx.showLoading({ //显示 loading 提示框
                        title: '加载中'
                })
                // 根据首页导航传输过来的值设置标题
                if (options.title) {
                        wx.setNavigationBarTitle({
                                title: options.title,
                        });
                }

                // 根据首页导航传输过来id值赋值到初始值中
                this.setData({
                        catId: options.cat
                })
                this.loadMore();
        },

        /**
         * 生命周期函数--监听页面初次渲染完成
         */
        onReady: function() {

        },

        /**
         * 生命周期函数--监听页面显示
         */
        onShow: function() {

        },

        /**
         * 生命周期函数--监听页面隐藏
         */
        onHide: function() {

        },

        /**
         * 生命周期函数--监听页面卸载
         */
        onUnload: function() {

        },

        /**
         * 页面相关事件处理函数--监听用户下拉动作
         */
        onPullDownRefresh: function() {
                this.setData({
                        "contents": [],
                        page: 0,
                        hasMore: true,
                })

                this.loadMore();
                wx.stopPullDownRefresh(700)
        },

        /**
         * 页面上拉触底事件的处理函数
         */
        onReachBottom: function() {
                wx.showNavigationBarLoading() //在当前页面显示导航条加载动画
                wx.showLoading({ //显示 loading 提示框
                        title: '加载中'
                })
                setTimeout(function() {
                        wx.hideLoading() //隐藏 loading 提示框
                        wx.hideNavigationBarLoading() //在当前页面隐藏导航条加载动画
                }, 700)

                this.loadMore();
        },

        /**
         * 用户点击右上角分享
         */
        onShareAppMessage: function() {

        }
})