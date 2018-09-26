// components/search/index.js
import {
  PromiseHttp
} from '../../utils/http.js'
import {
  dataBase
} from '../../config.js'
const http = new PromiseHttp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    searched: false,
    books: [],
    hotSearch: [],
    historySearch: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onDelete() {
      this._initBooks()
      this._showSearch()
      this._emptyInput()
      this._updataTag()
    },
    onConfirm(event) {
      const q = event.detail.value || event.detail.content
      if (q == false) {
        return
      }
      this._searchBook(q).then(res => {
        this.setData({
          books: res.data.books,
          value: q
        })
        if (res.data.books.length >= 1){
          this._setStorage(q)
          console.log('set')
        }
        this._showResult()
      })
    },
    onCancel(event) {
      this.triggerEvent('cancel', {}, {})
    },
    /**
     * 组件私有方法
     */
    _updataTag(){
      this.setData({
        historySearch: wx.getStorageSync('q')
      })
    },
    _setStorage(q) {
      const tempArray = wx.getStorageSync('q') || []
      if (!tempArray.includes(q)){
        tempArray.push(q)
      }
      if (tempArray.length > 10) {
        tempArray.shift()
        console.log('shift')
      }
      
      wx.setStorageSync('q', tempArray)
    },
    _showResult() {
      this.setData({
        searched: true
      })
    },
    _searchBook(q) {
      return http.request({
        url: `${dataBase}/book/search`,
        data: {
          start: 0,
          summary: 1,
          q: q
        }
      })
    },
    _initBooks() {
      this.setData({
        books: []
      })
    },
    _showSearch() {
      this.setData({
        searched: false
      })
    },
    _emptyInput() {
      this.setData({
        value: ''
      })
    }
  },
  attached() {
    this.setData({
      historySearch: wx.getStorageSync('q')
    })
    http.request({
      url: `${dataBase}/book/hot_keyword`
    }).then(res => {
      this.setData({
        hotSearch: res.data.hot
      })
    })
  }
})