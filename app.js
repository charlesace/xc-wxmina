//app.js
const util = require('./utils/util.js')
const api = require('./config/api.js')

App({
    onLaunch(options) {
        let {
            scene
        } = options

        this.globalData.scene = scene
    },

    globalData: {
        userInfo: {
            nickname: '游客',
            username: 'login'
        },
        scene: ''
    }
})