// pages/book/book.js
var appkey = 'WCCBUiYsenBlgrs5';
var app = getApp();
var dataUrl = app.globalData.dataBase + '/classic/latest' + appkey;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    searching:false,
  },
  onSearch(event){
    this._showSearch()
  },
  
  onCloseSearch(){
    this._closeSearch()
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    wx.request({
      url: app.globalData.dataBase + '/book/hot_list',
      header: {
        appkey: appkey
      },
      method: 'GET',
      success: function(res) {
        let data = res.data;
        let books = [];
        data.forEach(function(item) {
          let book = {};
          let title = item.title;
          let author = item.author;
          book = {
            title: title.length >= 12 ? title.substr(0, 9) + '...' : title,
            image: item.image,
            author: author.length >= 11 ? author.substr(0, 11) + '...' : author,
            favourNum: item.fav_nums,
            id: item.id
          }
          books.push(book);
        })
        that.setData({
          books: books
        });
      }
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