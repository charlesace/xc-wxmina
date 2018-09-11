const util = require('../utils/util.js')
const api = require('../config/api.js')

function loginByXC (data) {
  let url = api.XCLogin

  return Promise.resolve(true)
  return util.request(
    url,
    data,
    'POST'
  )
}

function logoutByXC (data) {
  let url = api.XCLogout

  return Promise.resolve(true)
  return util.request(url,
    data,
    'POST')
}

module.exports = {
  loginByXC,
  logoutByXC
}