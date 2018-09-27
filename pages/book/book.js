// pages/book/book.js
import {
  PromiseHttp
} from '../../utils/http.js'
import {
  dataBase
} from '../../config.js'
const http = new PromiseHttp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    searching: false,
    more: null
  },
  onSearch(event) {
    this._showSearch()
  },

  onCloseSearch() {
    this._closeSearch()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    http.request({
      url: `${dataBase}/book/hot_list`
    }).then(res => {
      let data = res.data
      let books = []
      data.forEach(function(item) {
        let book = {}
        let title = item.title
        let author = item.author
        book = {
          title: title,
          image: item.image,
          author: [author],
          favourNum: item.fav_nums,
          id: item.id
        }
        books.push(book)
      })
      this.setData({
        books: books
      })
    })
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
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.setData({
      more: `${Math.random()}`.replace('.', '')
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /**
   * 私有方法
   */
  _showSearch() {
    this.setData({
      searching: true
    })
  },
  _closeSearch() {
    this.setData({
      searching: false
    })
  },
})