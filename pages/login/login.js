/**
 * 登录界面
 */
const login = require('../../models/login.js')

Page({
    data: {
        username: '',
        password: '',
        pwdFocus: false
    },

    onLoad: function(options) {
        if (login.xcUserInfo && login.xcUserInfo.name) {
            this.setData({
                username: login.xcUserInfo.name
            })
        }
    },

    onAccountConfirm() {
        this.setData({
            pwdFocus: true
        })
    },

    onGotUserInfo(result) {
        if (!result || !result.detail || !result.detail.userInfo) {
            return
        }
        if (!this.data.username) {
            wx.showToast({
                title: '请输入登录账号',
                icon: 'none'
            })
            return
        }
        if (!this.data.password) {
            wx.showToast({
                title: '请输入登录密码',
                icon: 'none'
            })
            return
        }
        login.setUserInfo(result.detail.userInfo)
        login.login(this.data.username, this.data.password)
    },

    bindinputUsername(event) {
        let username = event.detail.value
        this.setData({
            username: username
        })
    },

    bindinputPassword(event) {
        let password = event.detail.value
        this.setData({
            password: password
        })
    }
})