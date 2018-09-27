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
    more:{
      type:String,
      observer: '_loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    searched: false,
    books: [],
    hotSearch: [],
    historySearch: [],
    value: '',
    hasMore: true,
    loading: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onDelete() {
      this._initData()
      this._showSearch()
      this._emptyInput()
      this._updataTag()
    },
    onConfirm(event) {
      const q = event.detail.value || event.detail.content
      if (q == false) {
        return
      }
      this._showResult()
      wx.showLoading({
        title: 'loading...',
      })
      this._searchBook(q, 1, 0).then(res => {
        this.setData({
          books: res.data.books,
          value: q
        })
        if (res.data.books.length){
          this._setStorage(q)
        }
        wx.hideLoading()
      })
    },
    onCancel(event) {
      this.triggerEvent('cancel', {}, {})
    },
    /**
     * 组件私有方法
     */
    _lock(){
      this.data.loading = true
    },
    _unlock(){
      this.data.loading = false
    },
    _isLocking(){
      return this.data.loading
    },
    _loadMore(){
      if (this.data.searched && this.data.hasMore){
        const length = this.data.books.length
        if(this._isLocking()){
          return
        }

        wx.showLoading({
          title: 'loading...'
        })

        console.log('load more')
        this._lock()
        this._searchBook(this.data.value, 1, length).then(res => {
          // 结果是为空
          if (!res.data.books.length){
            this.setData({
              hasMore: false
            })
            this._unlock()
            wx.hideLoading()
            return
          }

          // 结果不为空
          let tempArray = this.data.books
          tempArray = tempArray.concat(res.data.books)
          this.setData({
            books: tempArray
          })
          this._unlock()
          wx.hideLoading()
        }, error => {
          // 断网或出现错误时解锁
          this._unlock()
          wx.hideLoading()
        })
      }
    },
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
      }
      
      wx.setStorageSync('q', tempArray)
    },
    _showResult() {
      this.setData({
        searched: true
      })
    },
    _searchBook(q, summary,start = 0) {
      return http.request({
        url: `${dataBase}/book/search`,
        data: {
          start: start,
          summary: summary,
          q: q
        }
      })
    },
    _initData() {
      this.setData({
        books: [],
        hasMore: true
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