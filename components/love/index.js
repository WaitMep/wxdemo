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
    }
  },
  data: {
    loveSrc: '/images/love.png',
    noneLoveSrc: '/images/none-love.png'
  },
  methods: {
    onLove: function() {
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