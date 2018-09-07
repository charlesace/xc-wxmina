//app.js
const util = require('./utils/util.js')
const api = require('./config/api.js')
const user = require('./models/user.js')

App({
  onLaunch (options) {
    let {
      scene
    } = options
    
    this.globalData.scene = scene

    util.checkSession().then(
      //  login Status : login
      res => {
      }
    ).catch((error) => {
      // login Status : session timeout , relogin
      util.login()
    })
  },
  globalData: {
    userInfo: {
      nickname: '游客',
      username: 'login'
    },
    scene: ''
  }
})