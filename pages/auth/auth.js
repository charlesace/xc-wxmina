// const templateModel = require('../../models/template.js')
const util = require('../../utils/util.js')

// pages/auth/auth.js
Page({
    data: {
        mchName: "",
        phone: "",
        code: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // console.log(options)
        // let productID = options['productID']
        // this.setData({
        //     productID: productID
        // }, this.getTemplateDetail)
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

    getTemplateDetail() {
        let productID = this.data.productID
        let params = {
            product_id: productID
        }

        console.log(params)

        templateModel.getTemplateDetail({
            product_id: productID
        }).then((result) => {
            let productName = result['product_name']
            let orderConfig = result['order_config']
            let members = result['members']
            let splitRuleID = result['split_rule_id']

            console.log(productName, orderConfig, members, splitRuleID)
            this.setData({
                productName: productName,
                orderConfig: orderConfig,
                members: members,
                splitRuleID: splitRuleID
            })

        })
    },

    testPhone () {
        if (!util.isPhoneNumber(this.data.phone)) {
            wx.showToast({ title: "请输入正确的手机号", icon: "none" })
            return false
        }
        return true
    },

    onSend () {
        if (this.testPhone()) {
            wx.showToast({ title: "OK", icon: "none" })
        }
    },

    onConfirm () {
        if (!this.testPhone()) {
            return
        }
    }
})