import {
  dataBase
} from '../../config.js'
import {
  PromiseHttp
} from '../../utils/http.js'
const http = new PromiseHttp()
console.log(dataBase)
Page({
  data: {
    classics: []
  },
  onLoad: function(options) {
    http.request({
      url: `${dataBase}/classic/favor`
    }).then(res => {
      this.setData({
        classics: res.data
      })

      // 设置缓存
      wx.setStorageSync('favor', res.data)
    })
  },
  onReady: function() {},
  onShow: function() {
    const storageData = wx.getStorageSync('favor')

    if (storageData) {
      this.setData({
        classics: storageData
      })
      return
    }

    http.request({
      url: `${dataBase}/classic/favor`
    }).then(res => {
      this.setData({
        classics: res.data
      })
    })
  },
  onHide: function() {},
  onUnload: function() {},
})