// components/loveItem/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: Object,
    type:String
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoveItem: function(event) {
      let id = this.properties.item.id
      let type = this.properties.item.type
      wx.navigateTo({
        url: `/pages/loveDetail/loveDetail?id=${id}&type=${type}`
      })
    }
  }
})