const util = require('../utils/util.js')
const api = require('../config/api.js')

function loginByXC (data) {
  let url = api.XCLogin

  // return Promise.resolve(true)
  return util.request(
    url,
    data,
    'post'
  )
}

module.exports = {
  loginByXC
}