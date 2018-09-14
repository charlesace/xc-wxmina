const templateModel = require('../../models/template.js')

// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
    data: {
        productID: '',
        productName: '',
        members: [],
        orderConfig: [],
        splitRuleID: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        let productID = options['productID']
        this.setData({
            productID: productID
        }, this.getTemplateDetail)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () { 
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    getTemplateDetail () {
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

            console.log(result)
            this.setData({
                productName: productName,
                orderConfig: orderConfig,
                members: members,
                splitRuleID: splitRuleID
            })

        })
    }
})