const api = require('../config/api.js')
const md5 = require('../lib/md5.js')
const signConfig = require('../config/sign.js')

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

// function makeSign (obj) {
//   if (!obj) { 
//     console.log('需要加密的数组对象为空')
//     let str = ''
//     let arr = Object.keys(obj)

//     for (let i in arr) {
//       str += arr[i] + obj[arr[i]]
//     }

//     str += signConfig.md5Key

//     let enctrypted = md5(str)

//     return encrypted
//   }
// }

// 封装微信 request

function request(url, data = {}, method = "GET", service) {
  return new Promise((resolve, reject) => {
    let timestamp = new Date().getTime()
    let appID = wx.getStorageSync('appID') || '0'
    let version = signConfig.version
    let MD5Key = signConfig.MD5Key
    let token = signConfig.token

    let strMD5 = appID + timestamp + version + service + JSON.stringify(data) + MD5Key

    let sign = md5(strMD5)

    let newData = {
      app_id: appID,
      timestamp: timestamp,
      version: version,
      sign: sign,
      service: service,
      token: token,
      params: data
    }

    wx.request({
      url: url,
      data: newData,
      method: method,
      header: {
        'Content-Type': 'application/json'  
      },
      success(res) {
        let {
          data,
          errMsg,
          statusCode,
          header
        } = res
        console.log('success')
        console.log(res)

        if (statusCode === 200) {
          //  http请求成功
          let response = JSON.parse(data.response)
          let {
            status,
            message,
            error_code,
            result
          } = response

          if (status === 'OK') {
            // 请求成功
          } else if (status === 'error') {
            // 请求失败
            reject(response)
          }

          

          // resolve(res)

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
        // wx.showToast({
        //   title: '服务器故障或没有网络连接！',
        //   icon: 'none',
        //   duration: 2500,
        //   mask: true,
        //   success () {},
        //   fail () {},
        //   complete () {}
        // })
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
