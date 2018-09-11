// components/book/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    book:Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    bookId:null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onBookDetail: function(event) {
      let bookId = this.properties.book.id;
      console.log('bookid' + bookId)
      wx.navigateTo({
        url: '/pages/detail/detail?id=' + bookId,
      })
    }
  }
})