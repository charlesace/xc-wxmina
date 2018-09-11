const api = require('../config/api.js')

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
          resolve(res)

          // let code = null
          // return login().then((res) => {
          //   code = res.code
          //   return getUserInfo()
          // }).then((userInfo) => {
          //   //  登录远程服务器
          //   request(api.AuthLoginByWeixin,
          //     {
          //       code: code,
          //       userInfo: userInfo
          //     },
          //     'POST').then((res) => {
          //       if (res.errorno === 0) {
          //         //  存储用户信息
          //         wx.setStorageSync('userInfo', res.data.userInfo)

          //         resolve(res)
          //       } else {
          //         reject(res)
          //       }
          //     }).catch((err) => {
          //       reject(err)
          //     })
          // }).catch((err) => {
          //   reject(err)
          // })
        } else {
          reject(res.errMsg)
        }
      },
      fail(err) {
        reject(err)
        console.log('failed')
        wx.hideLoading()
        wx.showToast({
          title: '服务器故障或没有网络连接！',
          icon: 'none',
          duration: 2500,
          mask: true,
          success () {},
          fail () {},
          complete () {}
        })
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
          wx.showModal({
            title: 'code',
            content: res.code
          })
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

/**
 * 获取用户信息
 */
function getUserInfo () {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      widthCredentials: true,
      success (res) {
        resolve(res)
      },
      fail (error) {
        reject(error)
      }
    })
  })
}


module.exports = {
  formatTime: formatTime,
  request,
  checkSession,
  login,
  getUserInfo
}
