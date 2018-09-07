//app.js
const util = require('./utils/util.js')
const api = require('./config/api.js')
const user = require('./models/user.js')

App({
  onLaunch (options) {
    let {
      scene
    } = options
    console.log('onAppLaunch', options)
    console.log('scene', scene)

    user.checkLogin().then(res => {
      console.log('app login')
      this.globalData.userInfo = wx.getStorageInfoSync('userInfo')
    }).catch(err => {
      console.log('login fail')
    })
  },
  globalData: {
    userInfo: {
      nickname: '游客',
      username: 'login'
    }
  }
})