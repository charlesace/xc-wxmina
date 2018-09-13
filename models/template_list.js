/**
 * 用户相关服务
 */

const util = require('../utils/util.js')
const api = require('../config/api.js')
const soaUrl = api.soa
const services = require('../config/soaService.js')
const app = getApp()

/**
 * 获取支付模板列表
 */
function getTemplateList (data) {

    return util.request(
        soaUrl,
        data,
        'GET',
        services.getTemplateList
    )
}

module.exports = {
  getTemplateList
}