const templateModel = require('../../models/template.js')
const util = require('../../utils/util.js')

// pages/auth/auth.js
Page({
    data: {
        productId: "",
        productName: "",
        needBindCard: false,
        phone: "",
        code: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options)
        let productId = options.p
        this.setData({
            productId: productId
        })
        this.getTemplateDetail(productId)
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
        templateModel.getTemplateDetail(productId).then((result) => {
            console.log(result)
            this.setData({
                productName: result['product_name'],
                needBindCard: false/**TODO/ */
            })
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

    onSend() {
        if (this.testPhone()) {
            wx.showToast({
                title: "OK",
                icon: "none"
            })
        }
    },

    onConfirm() {
        if (!this.data.code) {
            wx.showToast({
                title: "xxxxx",
                icon: "none"
            })
        }
        // if (!this.testPhone()) {
        //     return
        // }
    }
})