import {
  months
} from '../../config.js'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    year: 0,
    month: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
  },
  attached: function() {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()

    this.setData({
      year: year,
      month: months[month]
    })
  }
})