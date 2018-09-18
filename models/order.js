/**
 * 订单模块
 */

const http = require('../utils/httpRequest.js')
const login = require('./login.js')

module.exports = {
    //  获取搜索列表
    getMemberSearchList: function (roleID, memberName) {

        return http.request(
            'employee.member.query', {
                app_id: login.appId,
                member_role: roleID,
                member_name: memberName,
                start_index: 0,
                page_size: 100
            }
        )
    },

    getAllMemberList: function (roleID) {
        return http.request(
            'employee.member.query', {
                app_id: login.appId,
                member_role: roleID,
                member_name: '',
                start_index: 0,
                page_size: 100
            }
        )
    },

    // 获取买家临时唯一编码
    getMemberAuthNo: function() {
        return http.request('member.authno.get')
    },

    // 获取买家认证状态
    getMemberAuthStatus: function(authNo) {
        return http.request(
            'member.authno.query', {
                xc_auth_no: authNo
            },
            true
        )
    },

    //  创建订单
    createOrder: function (orderAmount, productID, xcAuthNO, orderConfig, members) {

        return http.request(
            'employee.order.crate',
            {
                pay_info: {
                    order_amount: orderAmount,
                    xc_auth_no: xcAuthNO,
                    product_id: productID,
                    employee_id: login['xcUserInfo']['employeeId'],
                    employee_name: login['xcUserInfo']['name'],
                    order_config: orderConfig,
                    members: members
                }
            }
        )
    },

    getOrderDetail: function (orderID) {
        return http.request(
            'employee.order.detail.query',
            {
                order_id: orderID
            }
        )
    }
}