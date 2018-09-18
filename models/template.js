/**
 * 模板相关服务
 */

const http = require('../utils/httpRequest.js')
const login = require('./login.js')
let orderModel = require('./order.js')

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
        // return http.request(
        //     'employee.split.template.query', {
        //         product_id: productId
        //     }
        // )
        return new Promise((resolve, reject) => {
            http.request(
                'employee.split.template.query', {
                    product_id: productId
                }
            ).then((result) => {
                let orderConfig = result['order_config']
                let members = result['members']
                let splitRuleID = result['split_rule_id']
                let isCreateMember = result['is_create_member']

                console.log(result)
                orderModel['members'] = members
                orderModel['orderParams'] = orderConfig
                resolve(result)
            }).catch((err) => {
                reject(err)
            })
        })
    }
}