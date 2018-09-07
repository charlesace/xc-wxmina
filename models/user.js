/**
 * 用户相关服务
 */

const util = require('../utils/util.js')
const api = require('../config/api.js')
const app = getApp()

/**
 * 调用微信登录
 */
function loginByWeixin () {
  let code = null
  return new Promise((resolve, reject) => {
    return util.login().then((res) => {
      code = res.code
      return util.getUserInfo()
    }).then((userInfo) => {
      //  登录远程服务器
      request(api.AuthLoginByWeixin,
        {
          code: code,
          userInfo: userInfo
        },
        'POST').then((res) => {
          if (res.errorno === 0) {
            //  存储用户信息
            wx.setStorageSync('userInfo', res.data.userInfo)

            resolve(res)
          } else {
            reject(res)
          }
        }).catch((err) => {
          reject(err)
        })
      }).catch((err) => {
        reject(err)
      })
  })
}

/**
 * 判断用户是否登录
 */
function checkLogin() {
  return new Promise((resolve, reject, resule) => {
    if (wx.getStorageSync('userInfo')) {
      util.checkSession().then((res) => {
        resolve(true);
        console.log('session_Key未过期')
        // resule = true
        // return true
      }).catch(() => {
        reject(false);
        console.log('session_Key过期')
        // return false
      });

    } else {
      console.log('no userInfo')
      reject(false);
    }
  });
}


module.exports = {
  loginByWeixin,
  checkLogin
};
