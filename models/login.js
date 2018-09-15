/**
 * 登录模块
 */

const http = require('../utils/httpRequest.js')

module.exports = {
    getOpenID: function(params) {
        return http.request(
            params,
            'employee.wx.openid.get'
        )
    },

    loginByXC: function(data) {
        return http.request(
            data,
            'employee.login'
        )
    },

    logoutByXC: function(data) {
        return http.request(
            data,
            'employee.login.out'
        )
    }
}