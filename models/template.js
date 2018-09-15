/**
 * 模板相关服务
 */

const http = require('../utils/httpRequest.js')

module.exports = {
    // 获取支付模板列表
    getTemplateList: function(data) {
        return http.request(
            data,
            'employee.pay.template.list.query'
        )
    },

    getTemplateDetail: function(data) {
        return http.request(
            data,
            'employee.split.template.query'
        )
    }
}