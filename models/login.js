/**
 * 登录模块
 */

const http = require('../utils/httpRequest.js')
const config = require('../config/config.js')

module.exports = {
    openId: '',
    appId: '',
    wxUserInfo: {},
    xcUserInfo: {},

    // 用户登录入口
    tryLogin: function() {
        this.loadStorage()

        if (this.openId) {
            this.autoLogin()
            return
        }
        this.gotoLoginPage()
    },

    // 自动登录
    autoLogin: function() {
        this.loginServer('', '', this.openId).then((res) => {
                this.onLoginSuccess(res)
            })
            .catch(() => {
                this.gotoLoginPage()
            })
    },

    // 跳转登录页
    gotoLoginPage: function() {
        wx.redirectTo({
            url: '../../pages/login/login'
        })
    },

    // 跳转首页
    gotoHomePage: function() {
        wx.switchTab({
            url: '../template_list/template_list'
        })
    },

    // 账密登录
    // login: function(account, password) {
    //     this.wxLogin().then((res) => {
    //         if (!res.code) {
    //             wx.showToast({
    //                 title: '登录失败，请重新尝试',
    //                 icon: 'none'
    //             })
    //             return;
    //         }
    //         let code = res.code
    //         this.getOpenID(code, config.wxAppId).then((res) => {
    //             this.openId = res['wx_openid']
    //             this.loginServer(account, password, this.openId).then((res) => {
    //                 this.onLoginSuccess(res)
    //             })
    //         })
    //     })
    // },

    // 错误登录逻辑，待删除
    login: function(account, password) {
        this.wxLogin().then((res) => {
            if (!res.code) {
                wx.showToast({
                    title: '登录失败，请重新尝试',
                    icon: 'none'
                })
                return;
            }
            let code = res.code
            this.loginServer(account, password, '').then((res) => {
                this.appId = res['app_id']
                this.xcUserInfo = {
                    employeeId: res['employee_id'],
                    mobile: res['mobile'],
                    name: res['name'],
                    type: res['type']
                }

                this.getOpenID(code, this.appId).then((res) => {
                    this.openId = res['wx_openid']
                    this.onLoginSuccess()
                })
            })
        })
    },

    // 调用微信登录
    wxLogin: function() {
        return new Promise((resolve, reject) => {
            wx.login({
                success(res) {
                    if (res.code) {
                        // 登录远程服务器
                        resolve(res)
                    } else {
                        reject(res)
                    }
                },
                fail(err) {
                    reject(err)
                }
            })
        })
    },

    // 获取微信openid
    getOpenID: function(code, wxAppId) {
        return http.request(
            'employee.wx.openid.get', {
                code_no: code,
                app_id: wxAppId
            }
        )
    },

    // 登录小冲服务器
    loginServer: function(account, password, openId) {
        let params = {
            wx_openid: openId
        }
        if (account && password) {
            params = {
                login_account: account,
                password: password,
                wx_openid: openId
            }
        }
        return http.request(
            'employee.login', params
        )
    },

    // 登录成功
    onLoginSuccess: function(res) {
        if (res) {
            this.appId = res['app_id']
            this.xcUserInfo = {
                employeeId: res['employee_id'],
                mobile: res['mobile'],
                name: res['name'],
                type: res['type']
            }
        }

        this.saveStorage()
        this.gotoHomePage()
    },

    // 保存用户微信信息
    setUserInfo: function(info) {
        this.wxUserInfo = info
    },

    // 保存本地信息
    saveStorage: function() {
        wx.clearStorageSync()
        wx.setStorageSync('openId', this.openId)
        wx.setStorageSync('appId', this.appId)
        wx.setStorageSync('wxUserInfo', this.wxUserInfo)
    },

    // 加载本地信息
    loadStorage: function() {
        let openId = wx.getStorageSync('openId')
        if (!openId) {
            return
        }

        this.openId = openId
        this.appId = wx.getStorageSync('appId')
        this.wxUserInfo = wx.getStorageSync('wxUserInfo')
    },

    // 登出
    logoutServer: function() {
        http.request(
            'employee.login.out', {
                employee_id: this.xcUserInfo.employeeId
            }
        ).then(() => {
            this.clearLoginInfo()
            this.gotoLoginPage()
        })
    },

    // 清除所有登录信息
    clearLoginInfo: function() {
        this.openId = ''
        this.appId = ''
        this.wxUserInfo = {}
        this.xcUserInfo = {}
        wx.clearStorageSync()
    }
}