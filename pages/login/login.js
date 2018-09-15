/**
 * 登录界面
 */
const login = require('../../models/login.js')

Page({
    data: {
        username: 'shou',
        password: '123456',
        pwdFocus: false
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