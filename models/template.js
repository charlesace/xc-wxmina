/**
 * 模板相关服务
 */

const http = require('../utils/httpRequest.js')
const login = require('./login.js')
let orderModel = require('./order.js')

module.exports = {
    catalogList: [],


    // 获取支付模板列表
    getTemplateList: function() {
        return new Promise((resolve, reject) => {
            http.request(
                'employee.pay.template.list.query', {
                    app_id: login.appId
                }
            ).then((res) => {
                this.catalogList = res['catalog_list'] || []
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
        })
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

                let membersFiltered = members.filter((item) => {
                    // return true
                    return item['is_member_show'] === true
                })

                orderModel['members'] = membersFiltered
                orderModel['membersRaw'] = members
                orderModel['orderParams'] = orderConfig
                resolve(result)
            }).catch((err) => {
                reject(err)
            })
        })
    },

    getProduct: function(id) {
        for (let i = 0; i < this.catalogList.length; ++i) {
            let catalog = this.catalogList[i]
            for (let j = 0; j < catalog.product_list.length; ++j) {
                let product = catalog.product_list[j]
                if (product.product_id == id){
                    return product
                }
            }
        }
        return null
    }
}