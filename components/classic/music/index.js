const backgroundAudioManager = wx.getBackgroundAudioManager()

Component({

  properties: {
    content: String,
    image: String,
    src:String
  },
  data: {
    playImg: '../images/play.png',
    pauseImg: '../images/pause.png',
    isPlaying: false
  },
  attached: function() {
    this._recoverMusicState()

    // 音乐播放，暂停，停止事件监控
    backgroundAudioManager.onPause(() => {
      this.setData({
        isPlaying: false
      })
    })
    backgroundAudioManager.onPlay(() => {
      this.setData({
        isPlaying: true
      })
    })
    backgroundAudioManager.onEnded(() => {
      this.setData({
        isPlaying: false
      })
    })
    backgroundAudioManager.onStop(() => {
      this.setData({
        isPlaying: false
      })
    })
  },
  methods: {
    onMusic: function(event) {
      if (this.data.isPlaying === false || backgroundAudioManager.src != this.properties.src) {
        // 播放音乐
        backgroundAudioManager.src = this.properties.src
      } else if (this.data.isPlaying === true){
        // 暂停音乐
        backgroundAudioManager.pause()
      }else{
        // 继续音乐
        backgroundAudioManager.play()
      }

      this.setData({
        isPlaying: !this.data.isPlaying
      })
    },
    _recoverMusicState: function() {
       if (backgroundAudioManager.paused === false) {
         if (backgroundAudioManager.src === this.properties.src) {
           this.setData({
             isPlaying: true
           })
         }
      }   
    }
  }
})
