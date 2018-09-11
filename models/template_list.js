/**
 * 用户相关服务
 */

const util = require('../utils/util.js')
const api = require('../config/api.js')
const app = getApp()

/**
 * 获取支付模板列表
 */
function getTemplateList (data) {
  let url = api.getTemplateList

  return util.request(
    url,
    data,
    'POST'
  )
}

module.exports = {
  getTemplateList
}