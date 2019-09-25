//app.js
App({
  onLaunch:function(){
          code:null;
          var that = this;
          wx.login({
                  success(res) {
                          if (res.code) {
                               that.code = res.code   
                          } else {
                                  console.log('登录失败！' + res.errMsg)
                          }
                  }
          })
  }
})