/**
 * util工具类
 */

module.exports = {
    // 格式化时间
    formatTime: function(date) {
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const hour = date.getHours()
        const minute = date.getMinutes()
        const second = date.getSeconds()

        return [year, month, day].map(formatNumber).join('/')
            + ' ' + [hour, minute, second].map(formatNumber).join(':')
    },

    // 格式化数字
    formatNumber: function(n) {
        n = n.toString()
        return n[1] ? n : '0' + n
    },

    // 轮循调用
    interval: function(callback, timeout, param) {
        let args = Array.prototype.splice.call(arguments, 2)
        var _cb = function() {
            callback.apply(null, args)
        }
        return setInterval(_cb, timeout)
    },

    // 是否为合法手机号
    isPhoneNumber: function(str) {
        return (/^1(3|4|5|6|7|8|9)\d{9}$/.test(str))
    },

    // 是否为合法身份证号
    isIdNumber: function (str) {
        if (/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(str)) {
            return true
        }
        return (/^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/.test(str))
    }
}