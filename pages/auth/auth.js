const template = require('../../models/template.js')
const auth = require('../../models/auth.js')
const util = require('../../utils/util.js')

// pages/auth/auth.js
Page({
    data: {
        productId: '',
        productName: '',
        needBindCard: false,
        phone: '',
        code: '',
        coolDown: false,
        coolDownTime: 0,
        sendText: '发送验证码',
        interval: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options)

        auth.authId = options.i
        this.setData({
            productId: options.p
        })
        this.getTemplateDetail(this.data.productId)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {
        this.endCoolDown()
    },

    bindInputPhone(event) {
        let phone = event.detail.value
        this.setData({
            phone: phone
        })
    },

    bindInputCode(event) {
        let code = event.detail.value
        this.setData({
            code: code
        })
    },

    getTemplateDetail(productId) {
        template.getTemplateDetail(productId).then((result) => {
            this.setData({
                productName: result['product_name']
            })
            auth.needBindCard = true /**TODO/ */
        })
    },

    testPhone() {
        if (!util.isPhoneNumber(this.data.phone)) {
            wx.showToast({
                title: '请输入正确的手机号',
                icon: 'none'
            })
            return false
        }
        return true
    },

    startCoolDown() {
        this.data.coolDownTime = 30
        this.setData({
            coolDown: true,
            sendText: '重发 (' + this.data.coolDownTime + ')'
        })

        let interval = util.interval(this.updateCoolDown, 1000)
        this.setData({
            interval: interval
        })
    },

    updateCoolDown() {
        let timeLeft = this.data.coolDownTime - 1
        if (timeLeft <= 0) {
            this.endCoolDown()
        } else {
            this.data.coolDownTime = timeLeft
            this.setData({
                sendText: '重发 (' + this.data.coolDownTime + ')'
            })
        }
    },

    endCoolDown() {
        this.data.coolDownTime = 0
        this.setData({
            coolDown: false,
            sendText: '发送验证码'
        })
        if (this.data.interval) {
            clearInterval(this.data.interval)
            this.data.interval = null
        }
    },

    onSend() {
        if (!this.testPhone()) {
            return
        }
        // loading
        this.startCoolDown()
        auth.requestCreateMember(this.data.phone).then(() => {
            wx.showToast({
                title: '验证码已发送',
                icon: 'none'
            })
        })
    },

    onConfirm() {
        if (!this.testPhone()) {
            return
        }
        if (!auth.memberId) {
            wx.showToast({
                title: '请先申请验证码',
                icon: 'none'
            })
            return
        }
        if (!this.data.code) {
            wx.showToast({
                title: '请填写验证码',
                icon: 'none'
            })
            return
        }

        auth.requestVerifyMember(this.data.code)
    }
})