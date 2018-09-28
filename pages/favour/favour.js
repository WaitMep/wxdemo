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
    classics: [],
    favourBookCount: 0,
    userImg: '',
    userNickname: '',
    authorized: false

  },
  onGetUserInfo(event) {
    if (typeof event.detail.userInfo !== 'undefined') {
      this._showUserInfo()
    }
  },
  onLoad: function(options) {
    this._showUserInfo()
    http.request({
      url: `${dataBase}/classic/favor`
    }).then(res => {
      this.setData({
        classics: res.data
      })

      // 设置缓存
      wx.setStorageSync('favor', res.data)
    })
    this._setFavourBookCount()
  },
  onReady: function() {},
  onShow: function() {
    this._setFavourBookCount()
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
  /**
   * 私有方法
   */
  _showUserInfo() {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.setData({
                userImg: res.userInfo.avatarUrl,
                userNickname: res.userInfo.nickName,
                authorized: true
              })
            }
          })
        }
      }
    })
  },
  _setFavourBookCount() {
    http.request({
      url: `${dataBase}/book/favor/count`
    }).then(res => {
      this.setData({
        favourBookCount: res.data.count
      })
    })
  }
})