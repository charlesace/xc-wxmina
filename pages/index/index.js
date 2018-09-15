//index.js
// 应用总入口 —— 路由分发
const login = require('../../models/login.js')

Page({
    data: {},
    
    onLoad: function(query) {
        // console.log('index router')
        // console.log(query)

        login.tryLogin()
    }
})