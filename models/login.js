/**
 * 登录模块
 */

const http = require('../utils/httpRequest.js')

module.exports = {
    openId: '',
    appId: '',
    wxUserInfo: {},
    xcUserInfo: {},

    /**
     * 判断用户是否登录
     */
    checkLogin: function() {
        return new Promise((resolve, reject, resule) => {
            if (wx.getStorageSync('userInfo')) {
                util.checkSession().then((res) => {
                    resolve(true)
                    console.log('session_Key未过期')
                    // resule = true
                    // return true
                }).catch(() => {
                    reject(false)
                    console.log('session_Key过期')
                    // return false
                });

            } else {
                console.log('no userInfo')
                reject(false)
            }
        });
    },

    // 保存用户微信信息
    setUserInfo: function(info) {
        this.wxUserInfo = info
    },

    // 账密登录
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
            this.loginServer(account, password).then((res) => {
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
    getOpenID: function(code, appId) {
        return http.request(
            'employee.wx.openid.get', {
                code_no: code,
                app_id: appId
            }
        )
    },

    // 登录小冲服务器
    loginServer: function(account, password) {
        return http.request(
            'employee.login', {
                login_account: account,
                password: password
            }
        )
    },

    // 登录成功
    onLoginSuccess: function() {
        this.saveStorage()

        wx.switchTab({
            url: '../template_list/template_list'
        })
    },

    // 保存本地信息
    saveStorage: function() {
        wx.clearStorageSync()
        wx.setStorageSync('openId', this.openId)
        wx.setStorageSync('appId', this.appId)
        wx.setStorageSync('wxUserInfo', this.wxUserInfo)
    },

    logoutByXC: function(data) {
        return http.request(
            'employee.login.out',
            data
        )
    }
}