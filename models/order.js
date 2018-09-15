/**
 * 订单模块
 */

const http = require('../utils/httpRequest.js')

module.exports = {
    // 获取买家临时唯一编码
    getMemberAuthno: function(data) {
        return http.request(
            data,
            'member.authno.get'
        )
    },

    getMemberAuthStatus: function(data) {
        return http.request(
            data,
            'member.authno.query',
            true
        )
    }
}