// pages/order/waitingForPayment.js
let orderModel = require('../../models/order')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        code: '1234444',
        amountNumber: '200.00',
        interval: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let code = orderModel.payCode
        let amountNumber = parseFloat(orderModel.orderAmount).toFixed(2)

        this.setData({
            code: code,
            amountNumber: amountNumber
        })
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

    }
})