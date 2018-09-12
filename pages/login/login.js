const app = getApp()
const login = require('../../models/login.js')
const util = require('../../utils/util.js')

Page({
  data: {
    username: '',
    password: '',
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

      login.getOpenID({
          code_no: code
        }).then((openID) => {
          
        })

      login.loginByXC({
        username,
        password
      }).then((res) => {
        console.log('success', res)
        wx.switchTab({
          url: '../template_list/template_list'
        })

      }).catch((err) => {
        console.log('error', err)
      })
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