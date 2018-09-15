const util = require('../utils/util.js')
const api = require('../config/api.js')
const soaUrl = api.soa
const services = require('../config/soaService.js')

/**
 * 获取买家临时唯一编码
 */
function getMemberAuthno (data) {
    return util.request(
        soaUrl,
        data,
        'POST',
        services.memberAuthnoGet
    )
}

function getMemberAuthStatus (data) {
    return util.request(
        soaUrl,
        data,
        'POST',
        services.memberAuthStatusGet,
        true
    )
}

module.exports = {
    getMemberAuthno,
    getMemberAuthStatus
}