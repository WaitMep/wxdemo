import {
  PromiseHttp,
} from '../../utils/http.js'
import {
  dataBase
} from '../../config.js'
const http = new PromiseHttp()
const latestUrl = dataBase + '/classic/latest';

Page({
  data: {
    classic: {},
    isLatest: 0,
    isFirst: 1
  },
  onLoad: function(options) {
    // jsop与回调函数
    var allFn
    function jsop(callback) {
      allFn = function (data) {
        callback(data)
      }
    }
    jsop(function(data) {
      console.log(data)
    })
    let timer = setTimeout(function() {
      allFn('555555555555555')
      if(timer) {
        clearTimeout(timer)
      }
    }, 2000)
    

    // 代码开始
    http.request({
      url: latestUrl
    }).then(res => {
      const classic = res.data

      this.setData({
        classic: classic,
        isLatest: classic.index
      })
      // 设置缓存
      wx.setStorageSync(`${classic.index}`, classic)
    })
  },
  onShow: function() {
    const storageData = wx.getStorageSync(`${this.data.classic.index}`)
    
    // 读取缓存
    if (storageData) {
      this.setData({
        classic: storageData
      })
    }
  },
  onLike: function(event) {
    const storageData = wx.getStorageSync(`${this.data.classic.index}`)
    if (storageData) {
      const likeStatus = !storageData.like_status
      storageData['like_status'] = likeStatus
      wx.setStorageSync(`${this.data.classic.index}`, storageData)
    }
    //点赞与取消点赞，并更新对应缓存
    const state = event.detail.state === 'like' ? '/like' : '/like/cancel'
    http.request({
      url: dataBase + state,
      method: 'POST',
      data: {
        art_id: this.data.classic.id,
        type: this.data.classic.type
      }
    }).then(res => {
      return http.request({
        url: `${dataBase}/classic/favor`
      })
    }).then(res => {
      // 更改喜欢页面的喜欢期刊缓存
      wx.setStorageSync('favor', res.data)
    })
  },
  onChange: function(event) {
    const direction = event.detail.direction
    const index = this.data.classic.index
    const key = direction === 'previous' ? index - 1 : index + 1
    const storageData = wx.getStorageSync(`${key}`)

    // 判断当前是否是最新一期或者第一期
    if ((this.data.isLatest === this.data.classic.index && direction === 'next') || (this.data.isFirst === this.data.classic.index && direction === 'previous')) {
      wx.showToast({
        title: '没内容了',
        image: "/images/error.png"
      })
      return
    }
    // 读取缓存
    if (storageData) {
      this.setData({
        classic: storageData
      })
      return
    }
    // 发送请求,请求数据
    http.request({
      url: dataBase + `/classic/${index}/` + direction,
    }).then(res => {
      const classic = res.data
      this.setData({
        classic: classic
      })
      wx.setStorageSync(`${classic.index}`, classic)
    })
  }
})