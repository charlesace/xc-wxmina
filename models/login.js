const util = require('../utils/util.js')
const api = require('../config/api.js')
const soaUrl = api.soa
const services = require('../config/soaService.js')

function getOpenID (params) {
  return util.request(
    soaUrl,
    params,
    'POST',
    services.getWechatOpenID
  )
}

function loginByXC (data) {
  // return Promise.resolve(true)
  return util.request(
    soaUrl,
    data,
    'POST',
    services.login
  )
}

function logoutByXC (data) {
  // return Promise.resolve(true)
  return util.request(
    soaUrl,
    data,
    'POST')
}

module.exports = {
  getOpenID,
  loginByXC,
  logoutByXC
}