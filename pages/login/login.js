const app = getApp()
const login = require('../../models/login.js')
const util = require('../../utils/util.js')

Page({
  data: {
    username: 'shou',
    password: '123456',
    code: '',
  },
  onGotUserInfo (userInfo) {

    util.login().then((res) => {
      let code = res.code

      this.setData({
        code: code
      })

      let username = this.data.username
      let password = this.data.password

      let appID = wx.getStorageSync('appID')

      login.loginByXC({
        login_account: username,
        password,
        app_id: '0'
      }).then((res) => {
        let appID = res['app_id']
        let mobile = res['mobile']
        let userName = res['name']
        let userType = res['type']

        wx.setStorageSync('userInfo', res)
        wx.setStorageSync('appID', appID)
        console.log('res', res)

        login.getOpenID({
          code_no: code,
          app_id: appID
        }).then((res) => {
          let wxOpenID = res['wx_openid']

          wx.setStorageSync('wxOpenID', wxOpenID)

          wx.switchTab({
              url: '../template_list/template_list'
          })
        })
      })

      

      // login.getOpenID({
      //     code_no: code
      //   }).then((openID) => {

      //   })

      // login.loginByXC({
      //   username,
      //   password
      // }).then((res) => {
      //   console.log('success', res)
      //   wx.switchTab({
      //     url: '../template_list/template_list'
      //   })

      // }).catch((err) => {
      //   console.log('error', err)
      // })
    })
  },
  bindinputUsername (event) {
    let username = event.detail.value

    this.setData({
      username: username
    })
  },
  bindinputPassword (event) {
    let password = event.detail.value

    this.setData({
      password: password
    })
  }
})