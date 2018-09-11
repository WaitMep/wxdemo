// components/button/index.js
Component({
  properties: {
    title:String
  },
  data: {
  },
  methods: {
    onNext: function(){
      this.triggerEvent('change', {
        direction:'next'
      }, {});
    },
    onPrevious: function() {
      this.triggerEvent('change', {
        direction: 'previous'
      }, {});
    }
  }
})