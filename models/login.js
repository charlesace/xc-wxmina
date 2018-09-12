const util = require('../utils/util.js')
const api = require('../config/api.js')
const soaUrl = api.soa
const services = require('../config/soaService.js')

function getOpenID (params) {
  return util.request(
    soaUrl,
    params,
    'GET',
    services.getWechatOpenID
  )
}

function loginByXC (data) {
  // return Promise.resolve(true)
  return util.request(
    soaUrl,
    data,
    'GET'
  )
}

function logoutByXC (data) {
  // return Promise.resolve(true)
  return util.request(
    soaUrl,
    data,
    'GET')
}

module.exports = {
  getOpenID,
  loginByXC,
  logoutByXC
}