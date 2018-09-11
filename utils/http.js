class HTTP {
  //URL /data /method / callBack /appkey
  request(self, url, data, callBack, method = 'GET') {
    wx.request({
      url: url,
      data: data,
      header: {
        appkey: 'WCCBUiYsenBlgrs5'
      },
      method: method,
      success: function(res) {
        callBack.call(self, res.data);
      }
    })
  }
}


// 使用promise来优化HTTP类
class PromiseHttp {
  request({url, method = "GET", data = {}}) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, method, data);
    })
  }

  _request(url, resolve, reject, method, data) {
    wx.request({
      url: url,
      data: data,
      header: {
        appkey: 'WCCBUiYsenBlgrs5'
      },
      method: method,
      success: res =>　{
        resolve(res);
      },
      fail: error => {
        reject()
      },
    })
  }
}


export {
  HTTP,
  PromiseHttp
}