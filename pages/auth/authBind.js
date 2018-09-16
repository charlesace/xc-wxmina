const template = require('../../models/template.js')
const auth = require('../../models/auth.js')
const util = require('../../utils/util.js')

// pages/auth/authBind.js
Page({
    data: {
        productName: '',
        name: '',
        idNo: '',
        cardNo: '',
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
        this.setData({
            productName: auth.productName
        })
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {
        this.endCoolDown()
    },

    bindInputName(event) {
        this.setData({
            name: event.detail.value
        })
    },

    bindInputID(event) {
        this.setData({
            idNo: event.detail.value
        })
    },

    bindInputCard(event) {
        this.setData({
            cardNo: event.detail.value
        })
    },

    bindInputPhone(event) {
        this.setData({
            phone: event.detail.value
        })
    },

    bindInputCode(event) {
        this.setData({
            code: event.detail.value
        })
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

    checkInput() {
        if (!this.data.name) {
            wx.showToast({
                title: '请填写姓名',
                icon: 'none'
            })
            return false
        }
        // if (!this.data.idNo) {
        //     wx.showToast({
        //         title: '请填写身份证号',
        //         icon: 'none'
        //     })
        //     return false
        // }
        if (!auth.isIdNumber(this.data.idNo)) {
            return false
        }
        if (!this.data.cardNo) {
            wx.showToast({
                title: '请填写银行卡号',
                icon: 'none'
            })
            return false
        }
        if (!auth.testPhone(this.data.phone)) {
            return false
        }
        return true
    },

    onSend() {
        if (!this.checkInput()) {
            return
        }
        this.startCoolDown()
        auth.requestBindCard(this.data.name, this.data.cardNo, this.data.idNo, this.data.phone).then(() => {
            wx.showToast({
                title: '验证码已发送',
                icon: 'none'
            })
        })
    },

    onConfirm() {
        if (!this.checkInput()) {
            return
        }
        if (!auth.bankCardId) {
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

        auth.requestConfirmBind(this.data.code)
    }
})