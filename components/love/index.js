// components/like/index.js
Component({
  properties: {
    love: {
      type: Boolean,
      observer: function() {}
    },
    count: {
      type: Number,
      value: 0,
    },
    readOnly: {
      type: Boolean
    }
  },
  data: {
    loveSrc: '/images/love.png',
    noneLoveSrc: '/images/none-love.png'
  },
  methods: {
    onLove: function() {
      if(this.properties.readOnly) {
        return
      }
      const love = this.properties.love;
      let count = this.properties.count;

      this.setData({
        love: !love,
        count: love ? count - 1 : count + 1
      });

      const state = this.properties.love?'like':'cancel';
      this.triggerEvent('like', {
        state: state
      }, {});
    }
  }
})