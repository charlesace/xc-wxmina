/**
 * 订单模块
 */

const http = require('../utils/httpRequest.js')
const login = require('./login.js')

module.exports = {
    //  获取搜索列表
    getMemberSearchList: function (roleID, memberName, startIndex, pageSize) {

        return http.request(
            'employee.member.query', {
                app_id: login.appId,
                member_role:  roleID,
                member_name: memberName,
                start_index: startIndex,
                page_size: pageSize
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
    }
}