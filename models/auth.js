/**
 * 用户授权相关服务
 */

const http = require('../utils/httpRequest.js')

module.exports = {
    getTemplateList: function(data) {

        return http.request(
            data,
            'xxx'
        )
    }

}