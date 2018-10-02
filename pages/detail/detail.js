import {
  PromiseHttp,
} from '../../utils/http.js'
import {
  dataBase
} from '../../config.js'
const http = new PromiseHttp()

Page({
  data: {
    book: {},
    comments: [],
    showInput: false,
    bid: 0,
    love: false,
    count: 0,
    focus: true
  },
  onLoad(options) {
    const id = options.id

    http.request({
        url: `${dataBase}/book/${id}/favor`
      })
      .then(res => {
        this.setData({
          love: res.data.like_status,
          count: res.data.fav_nums
        })
      })

    // 发送请求，请求短评
    http.request({
        url: `${dataBase}/book/${id}/short_comment`
      })
      .then(res => {
        const array = res.data.comments

        this.setData({
          comments: array,
          bid: id
        })
      })

    // 请求书籍详情数据并做数据绑定
    http.request({
        url: `${dataBase}/book/${id}/detail`
      })
      .then(res => {
        this.setData({
          book: res.data
        })
      })
  },

  posting(event) {
    this.setData({
      showInput: true
    })
  },

  cancel(event) {
    this.setData({
      showInput: false
    })
  },

  postComment(event) {
    const text = event.detail.content || event.detail.value

    if (text.length > 12) {
      wx.showToast({
        title: '多于12个字符',
        icon: 'none'
      })
      this.setData({
        focus: true
      })
      return
    }

    const tempArray = this.data.comments
    tempArray.unshift({
      content: text,
      nums: 1
    })

    wx.showToast({
      title: '+1',
      icon: 'none'
    })
    this.setData({
      comments: tempArray,
      showInput: false
    })

    // 发送请求，向服务器新增短评
    http.request({
        url: `${dataBase}/book/add/short_comment`,
        method: 'POST',
        data: {
          book_id: this.data.bid,
          content: text
        }
      })
      .then(res => {
        console.log(res.data.msg)
      })
  },

  onLike(event) {
    const url = event.detail.state === 'like' ? '/like' : '/like/cancel'
    let count = event.detail.state === 'like' ? this.data.count + 1 : this.data.count - 1

    http.request({
        url: `${dataBase}${url}`,
        method: 'POST',
        data: {
          art_id: this.data.bid,
          type: 400
        }
      })
      .then(res => {
        this.setData({
          love: !this.data.love,
          count: count
        })
      })
  }
})