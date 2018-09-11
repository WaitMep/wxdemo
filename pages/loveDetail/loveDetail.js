import {
  PromiseHttp
} from '../../utils/http.js'
import {
  dataBase
} from '../../config.js'
const http = new PromiseHttp()

Page({
  data: {
    classic: {}
  },
  onLoad: function(options) {
    const type = options.type
    const id = options.id

    http.request({
      url: `${dataBase}/classic/${type}/${id}`
    }).then(res => {
      this.setData({
        classic: res.data
      })
    })
  },
  onLike: function(event) {
    const state = event.detail.state === 'like' ? '/like' : '/like/cancel'
    const storageData = wx.getStorageSync(`${this.data.classic.index}`)
    // 更改期刊缓存的点赞状态
    if (storageData) {
      const likeStatus = !storageData.like_status
      storageData['like_status'] = likeStatus
      wx.setStorageSync(`${this.data.classic.index}`, storageData)
    }

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
  }
})