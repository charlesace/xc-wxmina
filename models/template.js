/**
 * 模板相关服务
 */

const http = require('../utils/httpRequest.js')
const login = require('./login.js')

module.exports = {
    // 获取支付模板列表
    getTemplateList: function() {
        return http.request(
            'employee.pay.template.list.query', {
                app_id: login.appId
            }
        )
    },

    // 获取支付模板详情
    getTemplateDetail: function(productId) {
        return http.request(
            'employee.split.template.query', {
                product_id: productId
            }
        )
    }
}