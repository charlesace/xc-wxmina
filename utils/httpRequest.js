/**
 * 封装微信 request
 */

const config = require('../config/config.js')
const md5 = require('../lib/md5.js')

module.exports = {
    request: function(service, data = {}, poll = false) {
        let url = config.apiUrl + config.soaPath
        let method = 'POST'

        return new Promise((resolve, reject) => {
            let timestamp = parseInt(new Date().getTime() / 1000, 10)
            let MD5Key = config.md5Key
            let token = config.token
            let version = data['version'] || '1.0'
            let appID = data['app_id'] || wx.getStorageSync('appId') || '0'
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

            if (!poll) {
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
                            if (!poll) {
                                wx.showToast({
                                    title: message,
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
    }
}