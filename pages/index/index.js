//index.js
// 应用总入口 —— 路由分发
const config = require('../../config/config.js')
const login = require('../../models/login.js')

Page({
    data: {},

    onLoad: function(query) {
        // 二维码跳转流程
        if (query.q) {
            let url = decodeURIComponent(query.q)
            // let url = 'https://cloud.xc-fintech.com/static/mp/auth?i=6446554885075902464&p=16'
            this.routeByUrl(url)
            return
        }

        login.tryLogin()
    },

    // 二维码路由
    routeByUrl: function(url) {
        let prefix = config.apiUrl + config.filePath
        let suffix = '?'
        let start = url.indexOf(prefix) < 0 ? 0 : prefix.length
        let end = url.indexOf(suffix) < 0 ? url.length : url.indexOf(suffix)
        let service = url.substring(start, end)

        let paramStr = url.substring(end)
        this.routeByService(service, paramStr)
    },

    routeByService: function(service, paramStr) {
        if (service == 'auth') {
            wx.redirectTo({
                url: '../../pages/auth/auth' + paramStr
            })
        }
    }

})