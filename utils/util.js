const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 封装微信 request

function request(url, data = {}, method = "GET") {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': 'application/json'  
      },
      success(res) {
        console.log('success')
        console.log(res)

        if (res.statusCode === 200) {

          if (res.data.errorno === 401) {

          }
        }
      }
    })
  })
}
/**
 * 检查微信会话是否过期
 */
function checkSession () {
  return new Promise((resolve, reject) => {
    wx.checkSession({
      success () {
        resolve(true)
      },
      fail () {
        reject(false)
      }
    })
  })
}

/**
 * 调用微信登录
 */
function login () {
  return new Promise((resolve, reject) => {
    wx.login({
      success (res) {
        if (res.code) {
          // 登录远程服务器
          console.log(res)
          resolve(res)
        } else {
          reject(res)
        }
      },
      fail (err) {
        reject(err)
      }
    })
  })
}


module.exports = {
  formatTime: formatTime
}
