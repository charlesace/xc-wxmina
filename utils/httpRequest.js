/**
 * 封装微信 request
 */

const api = require('../config/api.js')
const md5 = require('../lib/md5.js')
const signConfig = require('../config/sign.js')

module.exports = {
    request: function(data = {}, service, poll) {
        let url = api.soa
        let method = 'POST'
        let isPoll = poll

        return new Promise((resolve, reject) => {
            let timestamp = parseInt(new Date().getTime() / 1000, 10)
            let appID = '0'
            let version = signConfig.version
            let MD5Key = signConfig.MD5Key
            let token = signConfig.token

            if (data['app_id']) {
                appID = data['app_id']
            } else {
                appID = wx.getStorageSync('appID') || '0'
            }

            let strMD5 = appID + timestamp + version + service + JSON.stringify(data) + MD5Key

            let sign = md5(strMD5)

            let newData = {
                app_id: appID,
                timestamp: timestamp,
                version: version,
                sign: sign,
                service: service,
                token: token,
                params: JSON.stringify(data)
            }

            if (!isPoll) {
                wx.showLoading({
                    mask: true
                })
            }
            wx.request({
                url: url,
                data: newData,
                method: method,
                header: {
                    'Content-Type': 'application/json'
                },
                success(res) {
                    let {
                        data,
                        errMsg,
                        statusCode,
                        header
                    } = res
                    // console.log('success')
                    // console.log(res)

                    if (statusCode === 200) {
                        //  http请求成功
                        // let response = JSON.parse(data.response)
                        let response = data.response
                        let {
                            status,
                            message,
                            error_code,
                            result
                        } = response

                        if (status === 'OK') {
                            // 请求成功
                            wx.hideLoading()
                            resolve(result)
                        } else if (status === 'error') {
                            // 请求失败
                            wx.hideLoading()
                            if (!isPoll) {
                                wx.showToast({
                                    title: message + 'code: ' + error_code,
                                    icon: 'none'
                                })
                            }
                            reject(response)
                        }
                    } else {
                        wx.hideLoading()
                        wx.showToast({
                            title: 'statusCode:' + statusCode + ',' + errMsg,
                            icon: 'none'
                        })
                        reject(res.errMsg)
                    }
                },
                fail(err) {
                    reject(err)
                    wx.hideLoading()
                    wx.showToast({
                        title: '服务器故障或没有网络连接！',
                        icon: 'none',
                        duration: 2500,
                        // mask: true,
                        success() {},
                        fail() {},
                        complete() {}
                    })
                },
                complete() {
                    // wx.hideLoading()
                }
            })
        })
    },


    /**
     * 调用微信登录
     */
    login: function() {
        return new Promise((resolve, reject) => {
            wx.login({
                success(res) {
                    if (res.code) {
                        // 登录远程服务器
                        console.log(res)
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
    }
}