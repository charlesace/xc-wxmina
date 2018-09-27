// pages/order/waitingForPayment.js
let orderModel = require('../../models/order')
const util = require('../../utils/util.js')
const constant = require('../../config/constant')


Page({

    /**
     * 页面的初始数据
     */
    data: {
        code: '1234444',
        amountNumber: '200.00',
        orderID: '',
        interval: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let code = orderModel.payCode
        let amountNumber = (orderModel.orderAmountPoint / 100).toFixed(2)
        let orderID = orderModel.orderID

        this.setData({
            code: code,
            amountNumber: amountNumber,
            orderID: orderID
        })

        this.pollingOrderStatus()
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
        this.clearOrderInterval()
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

    pollingOrderStatus: function () {
        let interval = util.interval(this.queryOrderStatus, 2000)

        this.setData({
            interval: interval
        })
    },

    queryOrderStatus: function () {
        return orderModel.pollingOrderDetail(this.data.orderID).then((result) => {
            let ORDER_STATUS = constant['ORDER_STATUS']
            let orderStatus = result['order_status']

            if (orderStatus === ORDER_STATUS['PAID']) {
                this.clearOrderInterval()
                wx.navigateTo({
                    url: './orderDetail'
                })
            }
            // if (orderStatus === ORDER_STATUS['WAIT_FOR_PAYMENT']) {
            //     this.clearOrderInterval()
            //     wx.navigateTo({
            //         url: './orderDetail'
            //     })
            // }
        })
    },

    clearOrderInterval: function () {
        clearInterval(this.data.interval)
        this.setData({
            interval: null
        })
    }
})